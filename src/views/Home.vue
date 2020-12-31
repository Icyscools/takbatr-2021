<template>
  <div class="home">
    <h1 class="title-header">ตักบาตรออนไลน์</h1>
    <div v-if="canBinthbat" class="text-left">
      <div class="container mb-2">
        <label for="name">ชื่อ</label>
        <b-form-input id="name" v-model="data.name" :disabled="isAnonymous" />
        <b-form-checkbox v-model="isAnonymous" class="mt-2">
          หรือไม่ระบุตัวตน
        </b-form-checkbox>
      </div>

      <div class="container mb-2">
        <label for="food">อาหารที่จะนำมาใส่บาตร</label>
        <b-form-select
          id="food"
          placeholder="กรุณาเลือกอาหารที่จะนำมาใส่บาตร"
          :options="foodList"
          v-model="data.food"
        ></b-form-select>
      </div>
      <div class="container">
        <label for="wish">ขอพรสิ</label>
        <b-form-textarea id="wish" v-model="data.wish" rows="3" max-rows="6" />
      </div>

      <h6 class="text-center my-3">
        ตั้งจิตภาวนา ท่องนะโม 3 จบ แล้วกดปุ่มใส่บาตร
      </h6>
      <b-button class="d-flex mx-auto" @click="submitWish">ใส่บาตร</b-button>

      <div class="container">
        <b-row class="d-flex flex-col justify-around">
          <b-col
            cols="12"
            md="6"
            lg="4"
            v-for="wish in wishes"
            :key="wish.wish"
          >
            <WishCard :data="wish"></WishCard>
          </b-col>
        </b-row>
      </div>
    </div>

    <div v-else class="container">
      <h2>ไม่ได้อยู่ในช่วงที่พระรับบิณบาตร</h2>
      <h3>ไว้มาใหม่ด้วยใจศรัทธาในช่วงตี 5 ถึง 9 โมงเช้านะ</h3>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import db from "@/firebase.js";
import WishCard from "@/components/WishCard.vue";

export default {
  name: "Home",
  components: {
    WishCard,
  },
  data() {
    return {
      canBinthbat: false,
      isAnonymous: false,
      foodList: [
        ..."🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🥑 🍆 🌶 🥒 🥬 🥦 🧄 🧅 🌽 🥕 🥗 🥔 🍠 🥜 🍯 🍞 🥐 🥖 🥨 🥯 🥞 🧇 🧀 🍗 🍖 🥩 🍤 🥚 🍳 🥓 🍔 🍟 🌭 🍕 🍝 🥪 🌮 🌯 🥙 🧆 🍜 🥘 🍲 🥫 🧂 🧈 🍥 🍣 🍱 🍛 🍙 🍚 🍘 🥟 🍢 🍡 🍧 🍨 🍦 🍰 🎂 🧁 🥧 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🥠 🥮 ☕ 🍵 🥣 🍼 🥤 🧃 🧉 🥛 🥡".split(
          " "
        ),
      ],
      data: {
        name: "",
        food: "",
        wish: "",
      },
      wishes: [
        // { name: "test", food: "🍐", wish: "we wish you marry christmas" },
        // { name: "test 2", food: "🍇", wish: "we wish you marry christmas" },
        // { food: "🥜", wish: "we wish you marry christmas" },
      ],
      isLoading: false,
    };
  },
  methods: {
    submitWish() {
      if (!this.isLoading) {
        this.isLoading = true;
        let wish;
        if (this.isAnonymous) {
          // eslint-disable-next-line no-unused-vars
          const { name, ...data } = this.data;
          wish = data;
        } else {
          wish = this.data;
        }

        this.data = {
          name: "",
          food: "",
          wish: "",
        };

        // this.wishes.push(wish);
        db.collection("takbatr-2021")
          .add(wish)
          .then((result) => {
            console.log(result);
            this.$bvModal.msgBoxOk(
              "ตักบาตรเรียบร้อยแล้ว จงอุทิศแพร่เมตตาให้กับสรรพสัตว์ทั้งหลายด้วยจิตเมตตา เทอญฯ",
              {
                title: "ตักบาตรเรียบร้อย",
                size: "md",
                buttonSize: "md",
                okVariant: "success",
                okTitle: "สาธุ สาธุ สาธุ",
                headerClass: "p-2 border-bottom-0",
                footerClass: "p-2 border-top-0",
                centered: true,
              }
            );
          })
          .catch((err) => {
            console.log(err);
            this.$bvModal.msgBoxOk(
              "เหมือนตักบาตรไม่ลงบาตร กรุณาลองใส่อีกครั้ง",
              {
                title: "Confirmation",
                size: "sm",
                buttonSize: "md",
                okVariant: "danger",
                okTitle: "ลองใหม่อีกครั้งดู",
                headerClass: "p-2 border-bottom-0",
                footerClass: "p-2 border-top-0",
                centered: true,
              }
            );
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    async readWishesFromDB() {
      db.collection("takbatr-2021")
        .get()
        .then((snapshot) => {
          this.wishes = [...snapshot.docs.map((snap) => snap.data())];
        })
        .catch((err) => console.error(err));
    },
  },
  mounted() {
    this.canBinthbat = false;
    const datetime = new Date();
    if (datetime.getHours() >= 5 && datetime.getHours() < 9) {
      this.canBinthbat = true;
    } else {
      // alert("ไม่ได้อยู่ในช่วงที่พระรับบิณบาตร");
    }

    this.readWishesFromDB();
  },
};
</script>

<style lang="scss">
.title-header {
  font-weight: 700;
  font-size: 2.5rem;
}
</style>

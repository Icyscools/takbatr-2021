<template>
  <div class="wishcard w-100 border rounded py-3 px-2 shadow my-3 mx-2">
    <h1 class="text-center">{{ data.food }}</h1>
    <p class="my-4">" {{ data.wish }} "</p>
    <h6 class="text-right">{{ data.name || "ไม่ระบุตัวตน" }}</h6>
  </div>
</template>

<script>
export default {
  name: "WishCard",
  props: {
    data: {
      name: String || false,
      food: String,
      wish: String,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wishcard {
  width: 100%;
  background: #fafafa;
}
</style>

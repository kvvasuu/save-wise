<template>
  <div class="avatar">
    <img :src="passPhotoUrl" alt="" draggable="false" />
  </div>
</template>

<script>
import avatar from "../../assets/images/avatar-placeholder.png";
export default {
  computed: {
    passPhotoUrl() {
      return this.$store.getters.getPhotoUrl ?? avatar;
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 10rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  img {
    height: 100%;
    object-fit: cover;
  }
}
</style>

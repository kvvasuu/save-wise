<template>
  <div class="content">
    <div class="picture">
      <div class="avatar-wrapper"><user-avatar></user-avatar></div>
    </div>
    <div class="form">dsaddsa</div>
  </div>
</template>

<script>
import UserAvatar from "@/components/misc/UserAvatar.vue";
export default {
  components: {
    UserAvatar,
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .picture {
    width: 10rem;
    height: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
    .avatar-wrapper {
      height: 8rem;
      width: 8rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .form {
    width: calc(100% - 10rem);
    height: 100%;
  }
}
</style>

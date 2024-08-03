<template>
  <div class="content">
    <div class="picture">
      <div class="avatar-wrapper">
        <user-avatar></user-avatar
        ><button><i class="fa-solid fa-pencil"></i></button>
      </div>
    </div>
    <div class="form">
      <div class="column">
        <div class="inputs">
          <div class="group">
            <label for="firstName">First Name</label>
            <input type="text" class="input" id="firstName" />
          </div>
          <div class="group">
            <label for="email">Email</label>
            <input
              type="email"
              class="input"
              id="email"
              value="test111@test.com"
              disabled
            />
          </div>
          <div class="group">
            <label for="city">City</label>
            <input type="text" class="input" id="city" />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="inputs">
          <div class="group">
            <label for="lastName">Last Name</label>
            <input type="text" class="input" id="lastName" />
          </div>
          <div class="group">
            <label for="password">Password</label>
            <input
              type="password"
              class="input"
              id="password"
              value="21321312"
              disabled
            />
          </div>
          <div class="group">
            <label for="country">Country</label>
            <input type="text" class="input" id="country" />
          </div>
        </div>
        <div class="button"><basic-button>Save</basic-button></div>
      </div>
    </div>
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
  padding: 3rem 2rem;
  .picture {
    width: 10rem;
    height: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
    .avatar-wrapper {
      position: relative;
      height: 10rem;
      width: 10rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10rem;
      box-shadow: 0.3rem 0.4rem 0.6rem rgba(128, 128, 128, 0.2);
      button {
        position: absolute;
        bottom: 0.5rem;
        right: 0.5rem;
        background-color: #6485ff;
        border-radius: 2rem;
        border: none;
        cursor: pointer;
        padding: 0.6rem;
        i {
          font-size: 1rem;
          color: #ffffff;
        }
      }
    }
  }
  .form {
    width: calc(100% - 10rem);
    height: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
    .column {
      width: 50%;
      margin: 1rem;
      .button {
        width: 100%;
        display: flex;
        justify-content: end;
      }
    }
    .inputs {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      .group {
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        font-family: Montserrat;
        font-weight: 600;
        font-size: 0.9rem;
        color: #1e2438;
        margin: 0 0 1rem 0;
        .input {
          width: 100%;
          height: 3rem;
          padding: 0 1rem;
          border: 1px solid #eeeeee;
          border-radius: 0.8rem;
          outline: none;
          background-color: #fdfdff;
          color: #828a9e;
          margin: 0.4rem 0;
          box-sizing: border-box;

          &:focus {
            outline: 2px solid #6485ff;
          }
        }
      }
    }
  }
}
</style>

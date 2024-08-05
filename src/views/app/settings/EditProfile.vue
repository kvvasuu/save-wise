<template>
  <div class="content">
    <notification-container ref="notification">
      <span>Saved</span>
      <i class="fa-solid fa-check"></i>
    </notification-container>
    <modal-container
      v-if="imageModal"
      class="modal-container"
      @close="toggleImageModal"
    >
      <template #title>Change profile image</template>
      <div class="avatar-wrapper">
        <div class="avatar">
          <img :src="passPhotoUrl" alt="" draggable="false" />
        </div>
      </div>
      <span class="input-error" v-if="showImageError"
        >Something went wrong. Try again.</span
      >
      <input
        type="file"
        id="profilePicInput"
        accept="image/*"
        @change="previewImage"
      />

      <div class="button">
        <basic-button @click="setProfileImage">Save</basic-button>
      </div>
    </modal-container>
    <div class="picture">
      <div class="avatar-wrapper">
        <user-avatar></user-avatar>
        <button @click="toggleImageModal">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>
    <div class="form">
      <form>
        <div class="group">
          <label for="firstName">First Name</label>
          <input type="text" class="input" id="firstName" v-model="firstName" />
        </div>
        <div class="group">
          <label for="lastName">Last Name</label>
          <input type="text" class="input" id="lastName" v-model="lastName" />
        </div>
        <div class="group">
          <label for="email">Email</label>
          <input
            type="email"
            class="input"
            id="email"
            value=""
            disabled
            v-model="email"
          />
        </div>
        <div class="group">
          <label for="password">Password</label>
          <input
            type="password"
            class="input"
            id="password"
            value="********"
            disabled
          />
        </div>
        <div class="group">
          <label for="city">City</label>
          <input type="text" class="input" id="city" v-model="city" />
        </div>
        <div class="group">
          <label for="country">Country</label>
          <input type="text" class="input" id="country" v-model="country" />
        </div>
      </form>
      <div class="button">
        <basic-button @click="saveUserInformation">Save</basic-button>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/misc/UserAvatar.vue";
import avatar from "../../../assets/images/avatar-placeholder.png";
export default {
  components: {
    UserAvatar,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      country: "",
      imageModal: false,
      imageFile: null,
      imageFileUrl: null,
      showImageError: false,
    };
  },
  methods: {
    saveUserInformation() {
      this.$store
        .dispatch("setProfileInformation", {
          firstname: this.firstName,
          lastname: this.lastName,
          city: this.city,
          country: this.country,
        })
        .then(() => this.$refs.notification.show());
    },
    setProfileImage() {
      this.$store
        .dispatch("setPhotoURL", { file: this.imageFile })
        .then(() => {
          this.$refs.notification.show();
          this.imageModal = false;
          this.imageFile = null;
          this.imageFileUrl = null;
        })
        .catch(() => {
          this.showImageError = true;
        });
    },
    toggleImageModal() {
      this.imageModal = !this.imageModal;
      this.imageFile = null;
      this.imageFileUrl = null;
      this.showImageError = false;
    },
    previewImage(event) {
      this.imageFile = event.target.files[0];
      this.imageFileUrl = URL.createObjectURL(this.imageFile);
      console.log(this.imageFile);
      this.showImageError = false;
    },
  },
  computed: {
    passPhotoUrl() {
      return !!this.imageFileUrl
        ? this.imageFileUrl
        : this.$store.getters.getPhotoUrl ?? avatar;
    },
  },
  created() {
    const user = this.$store.getters.getUserDatabase;
    this.firstName = user.firstname;
    this.lastName = user.lastname;
    this.email = user.email;
    this.city = user.city;
    this.country = user.country;
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 3rem 2rem 0 2rem;
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
        height: 2.4rem;
        width: 2.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #6485ff;
        border-radius: 2rem;
        border: none;
        cursor: pointer;
        padding: 0.6rem;
        box-sizing: border-box;
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
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      flex-wrap: wrap;
      max-width: 50rem;
    }
    .group {
      display: flex;
      align-items: start;
      justify-content: center;
      flex-direction: column;
      position: relative;
      box-sizing: border-box;
      font-family: Montserrat;
      font-weight: 600;
      font-size: 0.9rem;
      color: #1e2438;
      margin: 0 1rem 0.6rem 1rem;
      width: 20rem;
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

  .button {
    width: 12rem;
    display: flex;
    justify-content: center;
  }
  .modal-container {
    .avatar-wrapper {
      width: 16rem;
      height: 16rem;
      margin: 1rem 0 4rem 0;
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
          aspect-ratio: auto;
        }
      }
    }
  }
  .input-error {
    font-size: 0.8rem;
    font-weight: 700;
    color: rgb(255, 41, 41);
    font-family: "Montserrat";
    display: inline-block;
    margin: 1rem 0;
  }
}

@media (max-width: 1216px) {
  .content {
    .form {
      .group {
        width: 16rem;
      }
    }
  }
}

@media (max-width: 900px) {
  .content {
    flex-direction: column;
    align-items: center;
    padding: 3rem 0 0 0;
    .picture {
      width: 16rem;
      height: 16rem;
      .avatar-wrapper {
        width: 16rem;
        height: 16rem;
        button {
          bottom: 0.6rem;
          right: 0.6rem;
          padding: 1rem;
          i {
            font-size: 1.6rem;
          }
        }
      }
    }
    .form {
      margin: 2rem 0 0 0;
    }
  }
}
</style>

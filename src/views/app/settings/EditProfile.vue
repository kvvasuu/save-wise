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
        ref="fileInput"
      />

      <div class="button">
        <basic-button
          v-if="!loading"
          @click="setProfileImage"
          :disabled="!isFileProvided"
          >Save</basic-button
        >
        <basic-spinner v-else></basic-spinner>
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
          <input
            type="text"
            class="input"
            id="firstName"
            v-model="firstName"
            @keyup="validateUserInformation"
          />
        </div>
        <div class="group">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            class="input"
            id="lastName"
            v-model="lastName"
            @keyup="validateUserInformation"
          />
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
          <input
            type="text"
            class="input"
            id="city"
            v-model="city"
            @keyup="validateUserInformation"
          />
        </div>
        <div class="group">
          <label for="country">Country</label>
          <country-select
            v-model="country"
            :country="country"
            :usei18n="false"
            removePlaceholder
            className="select"
            @change="validateUserInformation"
            id="country"
            countryName
          />
        </div>
      </form>
      <div class="button">
        <basic-button @click="saveUserInformation" :disabled="!isFormValid"
          >Save</basic-button
        >
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
      loading: false,
      isFileProvided: false,
      isFormValid: false,
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
    validateUserInformation() {
      const user = this.$store.getters.getUserDatabase;
      if (
        user.firstname != this.firstName ||
        user.lastname != this.lastName ||
        user.city != this.city ||
        user.country != this.country
      ) {
        this.isFormValid = true;
      } else this.isFormValid = false;
    },
    setProfileImage() {
      if (!!this.imageFile) {
        this.loading = true;
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
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.showImageError = true;
      }
    },
    toggleImageModal() {
      this.imageModal = !this.imageModal;
      this.imageFile = null;
      this.imageFileUrl = null;
      this.showImageError = false;
    },
    previewImage(event) {
      this.imageFile = event.target.files[0];
      if (this.imageFile) {
        this.isFileProvided = true;
        this.imageFileUrl = URL.createObjectURL(this.imageFile);
        this.showImageError = false;
      } else {
        this.isFileProvided = false;
      }
    },
  },
  computed: {
    passPhotoUrl() {
      return !!this.imageFileUrl
        ? this.imageFileUrl
        : this.$store.getters.getPhotoUrl ?? avatar;
    },
  },
  mounted() {
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
        height: 2.6rem;
        width: 2.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $primary-color;
        border-radius: 2rem;
        border: none;
        cursor: pointer;
        padding: 0.6rem;
        box-sizing: border-box;
        background: linear-gradient(
          130deg,
          $primary-color 0%,
          $primary-color-dark 70%
        );
        background-position: 0 0;
        background-size: 30rem 3rem;
        transition: all 0.3s ease-out;
        i {
          font-size: 1rem;
          color: $background-color;
        }
        &:hover {
          background-position: 50% 50%;
          transform: scale(1.04);
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
      color: $font-color-dark;
      margin: 0 1rem 0.6rem 1rem;
      width: 20rem;
      .input {
        width: 100%;
        height: 3rem;
        padding: 0 1rem;
        border: 1px solid #eeeeee;
        border-radius: 0.8rem;
        outline: none;
        background-color: $background-color-blue;
        color: $font-color-light;
        margin: 0.4rem 0;
        box-sizing: border-box;
        &:focus {
          outline: 2px solid $primary-color;
        }
      }
      .select {
        appearance: none;
        outline: 0;
        font-size: 0.9rem;
        color: #828a9e;
        width: 100%;
        height: 3rem;
        padding: 0.5rem 4rem 0.5rem 1rem;
        background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg)
            no-repeat right 0.8em center / 1.4em,
          linear-gradient(
            to left,
            $primary-color 3em,
            $background-color-blue 3em
          );
        border: none;
        border-right: 2px solid $primary-color;
        border-radius: 0.8rem;
        margin: 0.4rem 0;
        cursor: pointer;
        &::-ms-expand {
          display: none;
        }
        &:focus {
          border: 2px solid $primary-color;
        }
        option {
          color: inherit;
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
    color: $error-color;
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

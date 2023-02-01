<template>
  <div>
    <div class="text-center">
      <NuxtLink class="navbar-brand" to="/"><img id="logo" src="../assets/logo/logo.png"></NuxtLink>
    </div>

    <div class="container mt-5">

      <div class="col-7 border mx-auto">
        <h3 class="text-center">パスワード再設定</h3>
        <div class="text-center">
          <p>Crearenに登録したメールアドレスを入力してください。</p>
          <p>入力されたメールアドレスにパスワード再設定URLを送信します。</p>
        </div>

        <label class="ml-5">メールアドレス</label>
        <input type="email" v-model="email" class="form-control mx-auto col-10" placeholder="example@xxx.xx">

        <p></p>

        <p class="text-center"><button @click="resetPassEmail()" class="btn btn-success" id="nextBtn">送信</button></p>

      </div>

    </div>
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default {
  head() {
    return {
      title: "パスワード再設定",
      // script: [
      //   {
      //     src: "https://unpkg.com/swiper/swiper-bundle.min.js"
      //   },
      // ],
      // link: [
      //   {
      //     rel: "stylesheet",
      //     href: "https://unpkg.com/swiper/swiper-bundle.min.css"
      //   },
      // ],
    }
  },
  data() {
    return {
      email: "",
    }
  },
  mounted() {
  },
  methods: {
    // パスワードリセットメールを送るメソッド
    resetPassEmail() {
      const auth = getAuth(this.$app);
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          // Password reset email sent!
          alert('パスワード再設定メールを送りました')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
        this.email = "";
    }
  }
}
</script>

<style>
#logo {
  width: 9em;
}

#nextBtn {
  color: white;
}

</style>
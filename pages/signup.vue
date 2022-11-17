<template>
  <div>
    <div class="text-center">
      <NuxtLink class="navbar-brand" to="/"> <img style="width: 9em;" src="~/assets/logo/logo.png"></NuxtLink>
    </div>

    <div class="container mt-5">

      <div class="col-7 border mx-auto">
        <h3 class="text-center">アカウントの作成</h3>
        <label for="username" class="ml-5">ユーザー名</label>
        <input type=”text” class="form-control mx-auto col-10" name=”userName” required="required" placeholder="紅亜　連"
          v-model="username">

        <label for="email" class="ml-5">メールアドレス</label>
        <input type=”email” class="form-control mx-auto col-10" name=”email” required="required"
          placeholder="example@aaa.com" v-model="email">

        <label for="exampleInputPassword1" class="ml-5">パスワード (英数6文字以上)</label>
        <input type=”password” class="form-control mx-auto col-10" name=”passWord” required="required"
          v-model="password">

        <label for="exampleInputPassword1" class="ml-5">パスワード再確認</label>
        <input type=”password” class="form-control mx-auto col-10" name=”passWordCheck” required="required"
          v-model="passwordcheck">

        <p class="mt-2 text-center"><a class="ml-5" href="./terms.html" target="_blank">利用規約</a>に同意しました。<input
            type="checkbox"></p>

        <p class="text-center"><a type="button" class="btn btn-success" style="color: white;">確認画面へ進む</a></p>

      </div>

    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordcheck: "",
    }
  },
  methods: {
    signup() {
      const auth = getAuth(this.$app);
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // 登録が成功したらログイン
          location.href = 'http://localhost:3000/index_test';
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode + "," + errorMessage);
        });
    }
  }
}
</script>

<style>

</style>
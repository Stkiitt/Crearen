<template>
  <div>
    <section>
      <input type=”email” name=”email”  required="required" placeholder="E-mail" v-model="email">
      <input type=”password” name=”passWord” required="required" placeholder="PassWord" v-model="password">
      <button @click="signup()">登録</button>
    </section>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  data () {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    signup () {
      const auth = getAuth(this.$app);
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // 登録が成功したらログイン
          location.href = 'http://localhost:3000/index_test';
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode+","+errorMessage);
        });
    }
  }
}
</script>

<style>
</style>
<template>
  <div>
      <input type=”email” name=”email”  required="required" placeholder="E-mail" v-model="email">
      <input type=”password” name=”password” placeholder="password" v-model="password">
      <button @click="login()" value="ログイン">ログイン</button>
  </div>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  data () {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login(){
      const auth = getAuth(this.$app);
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // ログイン
          location.href = 'http://localhost:3000/taskadmin';
        })
        .catch((error) => {
          // ログイン失敗
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode+","+errorMessage);
        });
    },
  },
}
</script>
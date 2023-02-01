<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-warning bg-warning mb-3">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4"
        aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <NuxtLink class="navbar-brand" to="/"><img id="logo" src="~/assets/logo/logo.png"></NuxtLink>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item">
            <NuxtLink to="/manual" target="_blank" rel="noopener noreferrer"><button type="button"
                class="btn btn-dark">使い方</button></NuxtLink>
          </li>
          <li class="nav-item ml-3">
            <button @click="logout()" type="button" class="btn btn-dark">ログアウト</button>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container mt-5">
      <div style="display: flex;">
        <h2>タスク管理画面</h2>
        <HistoryButtonPopup />
      </div>
      <div class="row">
        <ToDoTask @changeComp="changeComp" />
        <ProfileTaskadmin :compParent="compParent" />
      </div>
    </div>
    <FooterCopyright />
  </div>
</template>

<script>
import HistoryButtonPopup from "~/components/HistoryButtonPopup.vue";
import ToDoTask from "~/components/ToDoTask.vue";
import ProfileTaskadmin from "~/components/ProfileTaskadmin.vue";
import FooterCopyright from "~/components/FooterCopyright.vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  components: {
    HistoryButtonPopup,
    ToDoTask,
    ProfileTaskadmin,
    FooterCopyright,
  },
  head() {
    return {
      title: "タスク管理画面",
      script: [
        {
          type: "text/javascript",
          src: "//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"
        },
        {
          src: "https://unpkg.com/swiper/swiper-bundle.min.js"
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://unpkg.com/swiper/swiper-bundle.min.css"
        },
      ],
    }
  },
  data() {
    return {
      uid: "",
      compParent: "",
    }
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    // 子コンポーネント内の書き換えを検知する
    changeComp(newVal){
      this.compParent = newVal;
    },
    // ログインの確認
    checkLogin() {
      const auth = getAuth(this.$app);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.uid = user.uid;
        } else {
          this.$router.push('/');
        }
      });
    },
    // ログアウト
    logout() {
      const auth = getAuth(this.$app);
      signOut(auth).then(() => {
        this.$router.push('/');
      }).catch((error) => {
        console.log(error);
      });
    },
  }
}
</script>

<style>
:focus {
  outline: none;
}

#logo {
  width: 9em;
}

/* 以下ボタンスタイル */
button {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #282828;
  border-radius: 2px;
  cursor: pointer;
}
</style>


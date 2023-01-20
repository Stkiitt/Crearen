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
        <ToDoTask />
        <ProfileTaskadmin />
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
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
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
    }
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    // ログインの確認
    checkLogin() {
      const auth = getAuth(this.$app);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.uid = user.uid;
          this.countDailyLogin();
        } else {
          location.href = 'http://localhost:3000';
        }
      });
    },
    // ログアウト
    logout() {
      const auth = getAuth(this.$app);
      signOut(auth).then(() => {
        location.href = 'http://localhost:3000';
      }).catch((error) => {
        console.log(error);
      });
    },
    // 今日のYYYYMMDDを取得（日まで）
    getToday() {
      const todayData = new Date();
      const year = todayData.getFullYear();
      const month = todayData.getMonth() + 1;
      const date = todayData.getDate();
      const today = year * 10000 + month * 100 + date;
      return today;
    },
    // ログイン日数のカウント
    async countDailyLogin() {
      const db = getFirestore(this.$app);
      const docSnap = await getDoc(doc(db, "user", this.uid));
      let ad;
      if (docSnap.exists()) ad = docSnap.data();
      const today = this.getToday();
      if (ad.last_login != today) {  // 最終ログインが今日より前か
        ad.daily_login++;
        await updateDoc(doc(db, "user", this.uid), {
          last_login: today,
          daily_login: ad.daily_login,
        });
        const check_l = [1, 7, 30, 100, 300].indexOf(ad.daily_login) + 1;  // ログイン合計が区切り目か
        if (check_l != 0) {
          alert("アバターと称号を獲得しました。\nアバター：\n称号：");
          await updateDoc(doc(db, "user", this.uid), {
            daily_login_step: check_l,
          });
          ad.achievement++;
          const check_achi = [1, 5, 10, 15, 30].indexOf(ad.achievement) + 1;  // 実績達成数の更新
          if (check_achi != 0) {
            alert("アバターと称号を獲得しました。\nアバター：\n称号：");
            await updateDoc(doc(db, "user", this.uid), {
              achievement_step: check_achi,
            });
          }
        }
      }
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


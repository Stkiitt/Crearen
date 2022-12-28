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
        <button @click="openHistoryPopup()" class="button-history">タスク履歴</button>
        <!-- 履歴ポップアップここから -->
        <section id="taskHistory" class="modalArea">
          <div @click="closeHistoryPopup()" class="modalBg"></div>
          <div class="modalWrapper">
            <div v-for="comptask in comptasks" :key="comptask.tid">
              <div class="historyContents">
                <div class="history-title">
                  <span class="history-name">名前：{{ comptask.name }}</span>
                  <span class="history-compdate">完了日時：{{ changeTimetype(comptask.time) }}</span>
                </div>
                <div class="history-content-group">
                  <p>優先度：{{ comptask.priority }}</p>
                  <p>期限：{{ comptask.deadline }}</p>
                </div>
              </div>
            </div>

            <div v-if="!comptasks.length">
              <p>完了したタスクがありません</p>
            </div>

            <div @click="closeHistoryPopup()" class="closeModal">
              ☓
            </div>
          </div>
        </section>
        <!-- 履歴ポップアップここまで -->
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
import ToDoTask from "~/components/ToDoTask.vue";
import ProfileTaskadmin from "~/components/ProfileTaskadmin.vue";
import FooterCopyright from "~/components/FooterCopyright.vue";
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, where, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  components: {
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
      comptasks: [],
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
    // task_completedからデータの取得
    async getCompleteTasks() {
      const db = getFirestore(this.$app);
      const q = query(collection(db, "task_completed"), where("uid", "==", this.uid));
      const querySnapshot = await getDocs(q);
      this.comptasks = [];
      querySnapshot.forEach((doc) => {
        const comptask = doc.data();
        comptask["tid"] = doc.id;
        this.comptasks.push(comptask);
      });
    },
    changeTimetype(time) {
      let change_time = String(time);
      let year_type = change_time.slice(0,4);
      let month_type = change_time.slice(4,6);
      let day_type = change_time.slice(6,8);
      const time_changed = year_type + "-" + month_type + "-" + day_type;
      return time_changed;
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
      if (ad.last_login != today) {
        ad.daily_login++;
        await updateDoc(doc(db, "user", this.uid), {
          last_login: today,
          daily_login: ad.daily_login,
        });
      }
    },
    // 履歴ポップアップを開く
    openHistoryPopup() {
      this.getCompleteTasks();
      $('#taskHistory').fadeIn();
    },
    // 履歴ポップアップを閉じる
    closeHistoryPopup() {
      $('#taskHistory').fadeOut();
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

.button-history {
  margin-left: 30px;
  padding: 0 20px;
  height: 2.5em;
  border-radius: 3em;
  background-color: #ffdd44;
  border: none;
  box-shadow: 1px 2px 1px #777777;
}

/* モーダルCSS */
.modalArea {
  display: none;
  position: fixed;
  z-index: 10;
  /*サイトによってここの数値は調整 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modalBg {
  width: 100%;
  height: 100%;
  background-color: rgba(30, 30, 30, 0.9);
}

.modalWrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  max-width: 500px;
  padding: 10px 30px;
  background-color: #fff;
}

.closeModal {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  cursor: pointer;
}


/* 履歴ポップアップ内 */
#taskHistory .modalWrapper {
  padding: 2em;
}

.historyContents {
  border: 1px solid black;
  margin: 1em;
}

.history-title {
  display: flex;
  padding: 2px 0;
}

.history-name {
  margin-left: 0.5m;
  margin-right: 2em;
}

.history-compdate {
  font-size: 0.9em;
  color: gray;
  padding-bottom: 0;
  margin-bottom: 0;
  bottom: 0;
}

.history-content-group {
  font-size: 0.8em;
  color: gray;
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


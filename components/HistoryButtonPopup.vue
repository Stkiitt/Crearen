<template>
  <div>
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
</template>

<script>
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, where, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  data () {
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
        }
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
.button-history {
  margin-left: 30px;
  padding: 0 20px;
  height: 2.5em;
  border-radius: 3em;
  background-color: #ffdd44;
  border: none;
  box-shadow: 1px 2px 1px #777777;
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
</style>
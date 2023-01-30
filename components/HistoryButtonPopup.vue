<template>
  <div>
    <button @click="openHistoryPopup()" class="button-history">タスク履歴</button>
    <!-- 履歴ポップアップここから -->
    <section id="taskHistory" class="modalArea">
      <div @click="closeHistoryPopup()" class="modalBg"></div>
      <div id="modalWrapperHistory">
        <span id="historyTitle">タスク履歴</span>
        <span id="historyAnno">>>最新20件までの履歴を表示します</span>
        <div id="historyList">
          <div v-for="comptask in comptasks" :key="comptask.tid">
            <div class="historyContents">
              <div class="history-title">
                <span>名前：{{ comptask.name }}</span>
              </div>
              <div class="history-content-group">
                <span v-if="comptask.deadline">期限：{{ comptask.deadline }}</span>
                <span>完了日時：{{ changeTimetype(comptask.time) }}</span>
                <span>優先度：{{ comptask.priority }}</span>
              </div>
            </div>
          </div>
          <div v-if="!comptasks.length" id="noCompTasks">
            <p>完了したタスクがありません</p>
          </div>
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
import { getDocs, collection, query, orderBy, limit, where, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
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
        }
      });
    },
    // task_completedからデータの取得
    async getCompleteTasks() {
      const db = getFirestore(this.$app);
      const q = query(collection(db, "task_completed"), where("uid", "==", this.uid),
        orderBy("time", "desc"), limit(20));
      const querySnapshot = await getDocs(q);
      this.comptasks = [];
      querySnapshot.forEach((doc) => {
        const comptask = doc.data();
        comptask["tid"] = doc.id;
        this.comptasks.push(comptask);
      })
      this.comptasks.sort((a, b) => {
        return b.time - a.time;
      });
    },
    changeTimetype(time) {
      let change_time = String(time);
      let year_type = change_time.slice(0, 4);
      let month_type = change_time.slice(4, 6);
      let day_type = change_time.slice(6, 8);
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
#taskHistory .modalWrapperHistory {
  padding: 2em;
}

.historyContents {
  border: 1px solid black;
  margin: 1em;
}

.history-title {
  font-size: 1.2em;
  bottom: 0;
  left: 0;
  margin: auto 0.5em 0 0.5em;
  padding-bottom: 5px;
  border-bottom: black solid 1px;
}

.history-content-group {
  margin: auto 0.5em;
  padding: 5px;
  color: gray;
}

.history-content-group span {
  display: block;
  padding: 2px auto;
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

#modalWrapperHistory {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  padding: 10px 30px;
  background-color: #fff;
}

.closeModal {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  cursor: pointer;
}

#historyHead {
  display: flex;
}

#historyTitle {
  font-size: 2em;
}

#historyAnno {
  height: 1em;
  color: gray;
  margin-left: 1em;
  padding-bottom: 0;
}


/* 完了済タスク表示枠 */
#historyList {
  height: 35em;
  box-shadow: 0px 0px 5px black;
  overflow-y: scroll;
  border-radius: 10px;
}

/* タスク履歴なし表示 */
#noCompTasks {
  font-size: 1.5em;
  text-align: center;
  margin-top: 45%;
  margin-bottom: auto;
}
</style>
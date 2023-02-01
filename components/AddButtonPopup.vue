<template>
  <div style="display: inline;">
    <button @click="openAddPopup()" class="button-add">追加</button>
    <!-- 追加ポップアップここから -->
    <section id="addTask" class="modalArea">
      <div @click="closeAddPopup()" class="modalBg"></div>
      <div class="modalWrapperAdd">
        <div class="addContents">
          <h1>タスクの追加</h1>
          <p class="required">タスク名</p>
          <input type="text" v-model="name" class="addInput">
          <p class="err">{{ taskerr }}</p>
          <p>メモ</p>
          <p>
            <textarea v-model="memo" class="addInput"></textarea>
          </p>
          <p>優先度</p>
          <p>
            <select v-model="priority" class="addInput">
              <option value="高">高</option>
              <option value="中" selected>中</option>
              <option value="低">低</option>
            </select>
          </p>
          <p>期限</p>
          <input type="date" v-model="deadline" class="addInput">
          <p class="err">{{ dateerr }}</p>
          <p>
            <button @click="addData()" class="btn btn-success">タスクを追加する</button>
          </p>
        </div>
        <div @click="closeAddPopup()" class="closeModal">
          ☓
        </div>
      </div>
    </section>
    <!-- 追加ポップアップここまで -->
  </div>
</template>

<script>
import { getDocs, addDoc, collection, query, where, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  computed: {
    tasksChild:{
      get(){
        return [];
      },
      set(newVal){
        this.$emit("changeTasks", newVal);
      }
    },
  },
  data () {
    return {
      uid: "",
      name: "",
      memo: "",
      priority: "中",
      deadline: "",
      taskerr: "",
      dateerr: "",
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
    // 複数データの取得
    async getTasks() {
      const db = getFirestore(this.$app);
      const q = query(collection(db, "task"), where("uid", "==", this.uid));
      const querySnapshot = await getDocs(q);
      const tasks = [];
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        task["tid"] = doc.id;
        tasks.push(task);
        tasks.sort((a, b) => {
          return b.time - a.time;
        });
      });
      return tasks;
    },
    async addData() {
      const db = getFirestore(this.$app);
      // データの追加
      // 入力された文字列のチェック
      const nameJudge = this.dataCheck(0);
      const dateJudge = this.dataCheck(1);
      if (nameJudge && dateJudge) {
        // ユーザidをログイン中のユーザのものにする
        await addDoc(collection(db, "task"), {
          deadline: this.deadline,
          memo: this.memo,
          name: this.name,
          priority: this.priority,
          uid: this.uid,
          time: this.getNow(),
        });
        this.tasksChild = await this.getTasks();
        this.closeAddPopup();
        this.deadline = "";
        this.memo = "";
        this.name = "";
        this.priority = "中";
      }
    },
    dataCheck(num) {
      //0はタスク名用、1は期限用
      if (num == 0) {
        const nameLength = (this.name).length;
        if (nameLength <= 20 && nameLength >= 1) {
          this.taskerr = "";
          return true;
        } else {
          this.taskerr = "※タスク名の文字数が不適切です。"
          return false;
        }
      } else if (num == 1) {
        const today = this.getToday();
        const deadlineChecked = Number((this.deadline).replace(/-/g, ''));
        if ((today <= deadlineChecked && (today + 200000) >= deadlineChecked) || (deadlineChecked == "")) {
          this.dateerr = "";
          return true;
        } else {
          this.dateerr = "※期限が不適切です。"
          return false;
        }
      }
    },
    //現在時刻の取得(秒単位まで)
    getNow() {
      const todayData = new Date();
      const year = (todayData.getFullYear()) * 1000000000;
      const month = (todayData.getMonth() + 1) * 10000000;
      const date = todayData.getDate() * 100000;
      const hours = todayData.getHours() * 3600;
      const minutes = todayData.getMinutes() * 60;
      const seconds = todayData.getSeconds();
      const now = year + month + date + hours + minutes + seconds;
      return now;
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
    // 追加ポップアップを開く
    openAddPopup() {
      $('#addTask').fadeIn();
    },
    // 追加ポップアップを閉じる
    closeAddPopup() {
      $('#addTask').fadeOut();
      this.taskerr = "";
      this.dateerr = "";
    },
  }
}
</script>

<style>
.button-add {
  float: right;
  margin-left: 20px;
  padding: 0 20px;
  height: 2.5em;
  border-radius: 3em;
  background-color: greenyellow;
  color: black;
  border: none;
  box-shadow: 1px 2px 1px #777777;
}

.required:after {
  content: " *";
  color: red;
}

.err {
  color: red;
  font-size: small;
}

/* 追加ポップアップ内 */
.addContents {
  padding: 2em;
}

.addInput {
  border: 1px solid gray;
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

.modalWrapperAdd {
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
</style>
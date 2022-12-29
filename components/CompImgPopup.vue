<template>
  <div>
    <span class="task-comp">
      <img @click="openCompPopup()"
        id="complete" src="../assets/check/check.png">
    </span>
    <!-- タスク完了ポップアップここから -->
    <section id="CompTask" class="modalArea">
      <div @click="closeCompPopup()" class="modalBg"></div>
      <div class="modalWrapper">
        <div class="compContents">
          <p>タスクを完了しますか？</p>
          <p>
            <button @click="completeButton(taskid)" class="btn btn-warning">はい</button>
            <button @click="closeCompPopup()" class="btn btn-danger">いいえ</button>
          </p>
        </div>
      </div>
    </section>
    <!-- タスク完了ポップアップここまで -->
  </div>
</template>

<script>
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, where, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  props: {
    task: {
      type: Object,
    },
  },
  computed: {
    tasksChild:{
      get(){
        return [];
      },
      set(newVal){
        this.$emit("changeTasks", newVal)
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
      taskid: "",
      time_created: 0,
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
    // タスク完了ボタン
    async completeButton(taskid) {
      const db = getFirestore(this.$app);
      await addDoc(collection(db, "task_completed"), {
        time: this.getNow(),
        deadline: this.deadline,
        memo: this.memo,
        name: this.name,
        priority: this.priority,
        uid: this.uid,
      });
      await this.countCompAchievement();
      await deleteDoc(doc(db, "task", taskid));
      this.tasksChild = await this.getTasks();
      this.closeCompPopup();
    },
    // タスク完了時の実績カウント
    async countCompAchievement() {
      const db = getFirestore(this.$app);
      const docSnap = await getDoc(doc(db, "user", this.uid));
      let ad;
      if (docSnap.exists()) ad = docSnap.data();
      const today = this.getToday();
      const timeDiff = this.getNow() - this.time_created;  // 作成してすぐに完了していないか確認（不正してないか）
      if (timeDiff < 300) ad.completed_quick++;
      ad.completed_all++;  // タスク完了の合計カウントを増やす
      if (this.priority == "高") ad.completed_high++;  // 難易度ごとのカウントを増やす
      else if (this.priority == "中") ad.completed_middle++;
      else if (this.priority == "低") ad.completed_low++;
      const deadlineChecked = Number(this.deadline.replace(/-/g, ''));  // 期限を過ぎていないか確認
      if (deadlineChecked >= today || deadlineChecked == "") ad.task_success++;
      else ad.task_failure++;
      await updateDoc(doc(db, "user", this.uid), {
        completed_all: ad.completed_all,
        completed_high: ad.completed_high,
        completed_low: ad.completed_low,
        completed_middle: ad.completed_middle,
        completed_quick: ad.completed_quick,
        task_failure: ad.task_failure,
        task_success: ad.task_success,
      });
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
    //タスク完了ポップアップを開く
    openCompPopup() {
      this.name = this.task["name"];
      this.memo = this.task["memo"];
      this.priority = this.task["priority"];
      this.deadline = this.task["deadline"];
      this.taskid = this.task["tid"];
      this.time_created = this.task["time"];
      $('#CompTask').fadeIn();
    },
    // タスク完了ポップアップを閉じる
    closeCompPopup() {
      $('#CompTask').fadeOut();
      this.name = "";
      this.memo = "";
      this.priority = "中";
      this.deadline = "";
      this.taskid = "";
      this.time_created = 0;
    },
  }
}
</script>

<style>
#complete {
  height: 2em;
}

#complete:hover {
  transform: scale(1.4, 1.4);
  filter: opacity(30%);
  ;
}

.task-comp {
  padding-left: 1em;
  margin: auto 1em auto auto;
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

/* 完了ポップアップ */
#CompTask .modalWrapper {
  max-width: 250px;
}

.compContents {
  padding: 5px;
  text-align: center;
}
</style>
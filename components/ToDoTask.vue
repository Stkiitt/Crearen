<template>
  <div class="col-lg-8 order-lg-1 col-12 order-2">
    <div class="m-2 px-4 border" id="ToDoBlock">
      <div id="taskList">
        <h2 class="my-4" id="ToDo">ToDo</h2>
        <AddButtonPopup @changeTasks="changeTasks" />
        <select @change="sortTasks(Number($event.target.value))" class="sort_select">
          <option value="0">新しい順</option>
          <option value="1">古い順</option>
          <option value="2">優先度順</option>
          <option value="3">期限が近い順</option>
        </select>
      </div>

      <!-- 繰り返しここから -->
      <section v-for="task in tasks" :key="task.tid">
        <!-- タスク表示ここから -->
        <div :class="changeBorderColor(task.priority)" class="task">
          <div @click="openEditPopup(task.name, task.memo, task.priority, task.deadline, task.tid)"
            class="task-content-group">
            <h4 class="task-title">{{ task.name }}</h4>
            <span v-if="task.deadline" :class="changeDeadlineColor(task.deadline)" class="task-content">
              期限：{{ task.deadline }}</span>
            <span class="task-content">優先度：{{ task.priority }}</span>
          </div>
          <span class="task-comp">
            <img @click="openCompPopup(task.name, task.memo, task.priority, task.deadline, task.tid, task.time)"
              id="complete" src="../assets/check/check.png">
          </span>
        </div>
        <!-- タスク表示ここまで -->

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

        <!-- 編集ポップアップ内容ここから -->
        <section id="editTask" class="modalArea">
          <div @click="closeEditPopup()" class="modalBg"></div>
          <div class="modalWrapper">
            <div class="editContents">
              <h1>タスクの編集</h1>
              <p>タスク名</p>
              <input type="text" v-model="name" class="editInput">
              <p class="err">{{ taskerr }}</p>
              <p>メモ</p>
              <p>
                <textarea v-model="memo" class="editInput"></textarea>
              </p>
              <p>優先度</p>
              <p>
                <select v-model="priority" class="editInput">
                  <option value="高">高</option>
                  <option value="中" selected>中</option>
                  <option value="低">低</option>
                </select>
              </p>
              <p>期限</p>
              <input type="date" v-model="deadline" class="editInput">
              <p class="err">{{ dateerr }}</p>
              <p>
                <button @click="updateData(taskid)" class="btn btn-warning">編集を保存する</button>
                <button @click="deleteData(taskid)" class="btn btn-danger">削除</button>
              </p>
            </div>
            <div @click="closeEditPopup()" class="closeModal">
              ☓
            </div>
          </div>
        </section>
        <!-- 編集ポップアップここまで -->
      </section>
      <!-- 繰り返しここまで -->
      <!-- this.tasksが空ならタスクがありませんを表示 -->
      <div v-if="!tasks.length">
        <p id="noTasks">タスクがありません</p>
      </div>
    </div>
  </div>
</template>

<script>
import AddButtonPopup from "~/components/AddButtonPopup.vue";
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, where, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  components: {
    AddButtonPopup,
  },
  data () {
    return {
      uid: "",
      tasks: [],
      name: "",
      memo: "",
      priority: "中",
      deadline: "",
      taskid: "",
      time_created: 0,
      taskerr: "",
      dateerr: "",
    }
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    // 子コンポーネント内のtasksの書き換えを検知する
    changeTasks(newVal){
      this.tasks = newVal
    },
    // ログインの確認
    checkLogin() {
      const auth = getAuth(this.$app);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.uid = user.uid;
          this.getTasks();
        }
      });
    },
    // 複数データの取得
    async getTasks() {
      const db = getFirestore(this.$app);
      const q = query(collection(db, "task"), where("uid", "==", this.uid));
      const querySnapshot = await getDocs(q);
      this.tasks = [];
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        task["tid"] = doc.id;
        this.tasks.push(task);
        this.sortTasks(0);
      });
    },
    // タスクソート機能（mode 0:新しい順、1:古い順、2:優先度が高い順、3:期限の近い順）
    sortTasks(mode) {
      switch (mode) {
        case 0:
          this.tasks.sort((a, b) => {
            return b.time - a.time;
          });
          break;
        case 1:
          this.tasks.sort((a, b) => {
            return a.time - b.time;
          });
          break;
        case 2:
          this.tasks.sort((a, b) => {
            const ac = this.getPriorityNum(a.priority);
            const bc = this.getPriorityNum(b.priority);
            return bc - ac;
          });
          break;
        case 3:
          this.tasks.sort((a, b) => {
            const ac = Number(a.deadline.replace(/-/g, ''));
            const bc = Number(b.deadline.replace(/-/g, ''));
            if (ac == bc) return 0;
            else if (ac == 0) return 1;
            else if (bc == 0) return -1;
            else return ac - bc;
          });
          break;
      }
    },
    // 優先度順のソートで使用
    getPriorityNum(priority) {
      if(priority == "高") {
        return 2;
      } else if(priority == "中") {
        return 1;
      } else if(priority == "低") {
        return 0;
      }
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
    // タスク削除時の実績カウント
    async countDeleteAchievement() {
      const db = getFirestore(this.$app);
      const docSnap = await getDoc(doc(db, "user", this.uid));
      let ad;
      if (docSnap.exists()) ad = docSnap.data();
      ad.task_delete++;
      await updateDoc(doc(db, "user", this.uid), {
        task_delete: ad.task_delete,
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
    // データの上書き（編集ポップアップ用）
    async updateData(taskid) {
      const nameJudge = this.dataCheck(0);
      const dateJudge = this.dataCheck(1);
      if (nameJudge && dateJudge) {
        const db = getFirestore(this.$app);
        await updateDoc(doc(db, "task", taskid), {
          deadline: this.deadline,
          memo: this.memo,
          name: this.name,
          priority: this.priority,
          uid: this.uid,
        });
        this.getTasks();
        this.closeEditPopup();
      }
    },
    // データの削除（編集ポップアップ用）
    async deleteData(taskid) {
      const db = getFirestore(this.$app);
      await deleteDoc(doc(db, "task", taskid));
      this.countDeleteAchievement();
      this.getTasks();
      this.closeEditPopup();
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
      this.getTasks();
      this.closeCompPopup();
    },
    // 編集ポップアップを開く
    openEditPopup(name, memo, priority, deadline, taskid) {
      this.name = name;
      this.memo = memo;
      this.priority = priority;
      this.deadline = deadline;
      this.taskid = taskid;
      $('#editTask').fadeIn();
    },
    // 編集ポップアップを閉じる
    closeEditPopup() {
      $('#editTask').fadeOut();
      this.name = "";
      this.memo = "";
      this.priority = "中";
      this.deadline = "";
      this.taskid = "";
      this.taskerr = "";
      this.dateerr = "";
    },
    //タスク完了ポップアップを開く
    openCompPopup(name, memo, priority, deadline, taskid, time_created) {
      this.name = name;
      this.memo = memo;
      this.priority = priority;
      this.deadline = deadline;
      this.taskid = taskid;
      this.time_created = time_created;
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
    //タスクの枠の色
    changeBorderColor(priority) {
      if (priority == "高") {
        return "border border-danger high-p my-3";
      } else if (priority == "中") {
        return "border border-warning middle-p my-3";
      } else {
        return "border low-p my-3";
      }
    },
    // 期限の色
    changeDeadlineColor(deadline) {
      const deadlineChecked = Number(deadline.replace(/-/g, ''));
      const today = this.getToday();
      if (deadlineChecked < today) {
        return "task-content deadline-red";
      } else {
        return "task-content";
      }
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

#ToDo {
  display: inline;
}

#taskList {
  position: sticky;
  top: 0;
  background-color: white;
  padding: 10px;
  z-index: 5;
}

#noTasks {
  margin: 10% 0 10% 34%;
  font-size: large;
  font-weight: bold;
}

.sort_select {
  float: right;
  margin: 3px 5px 0;
  padding: 2px 10px;
  border-radius: 7px;
  border: 3px solid #ffdd44;
  color: black;
  box-shadow: 1px 1px 2px #777777;
}

.task {
  position: relative;
  cursor: pointer;
  display: flex;
  padding-top: 1em;
  padding-bottom: 1em;
}

.task-content-group {
  display: flex;
  width: 90%;
}

.task-title {
  position: block;
  left: 0;
  margin: auto 1em auto 0;
  padding-left: 1em;
  display: block;
  width: 50%;
}

.task-content {
  position: relative;
  display: block;
  right: 0;
  margin: auto 2em auto auto;
}

.task-content:last-child {
  margin-right: 1em;
}

.task-comp {
  padding-left: 1em;
  margin: auto 1em auto auto;
}

#ToDoBlock {
  height: 35em;
  box-shadow: 0px 0px 5px black;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #ee5e1c #ccc;
  border-radius: 10px;
}

#ToDoBlock::-webkit-scrollbar {
  width: 10px;
}

#ToDoBlock::-webkit-scrollbar-track {
  background-color: #ccc;
  border-radius: 5px;
}

#ToDoBlock::-webkit-scrollbar-thumb {
  background-color: #ee5e1c;
  border: 2px outset #dc5b1f;
  border-radius: 10px;
}

.err {
  color: red;
  font-size: small;
}

/* タスク表示 */
.high-p {
  border: 1px solid red;
  background-color: rgba(255, 0, 0, 0.1);
}

.middle-p {
  border: 1px solid yellow;
  background-color: rgba(255, 250, 0, 0.1);
}

/* .low-p {
} */

.deadline-red {
  color: red;
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

/* 編集ポップアップ内 */
.editContents {
  padding: 2em;
}

.editInput {
  border: 1px solid gray;
}
</style>
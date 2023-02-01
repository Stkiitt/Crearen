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
          <CompImgPopup :task="task" @changeTasks="changeTasks" @changeComp="changeComp" />
        </div>
        <!-- タスク表示ここまで -->

        <!-- 編集ポップアップ内容ここから -->
        <section id="editTask" class="modalArea">
          <div @click="closeEditPopup()" class="modalBg"></div>
          <div class="modalWrapperEdit">
            <div class="editContents">
              <h1>タスクの編集</h1>
              <p class="required">タスク名</p>
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
import AddButtonPopup from "./AddButtonPopup.vue";
import CompImgPopup from "./CompImgPopup.vue";
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, where, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  components: {
    CompImgPopup,
    AddButtonPopup,
  },
  computed: {
    compChild:{
      get(){
        return "";
      },
      set(newVal){
        this.$emit("changeComp", newVal);
      }
    },
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
      taskerr: "",
      dateerr: "",
    }
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    // 子コンポーネント内の書き換えを検知する
    changeTasks(newVal){
      this.tasks = newVal;
    },
    changeComp(newVal){
      this.compChild = newVal;
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
    // タスク削除時の実績カウント
    async countDeleteAchievement() {
      const avatar_degree = {
        achievement: {
          avatar: [["mahoutsukai_white_man", "mahoutsukai_white_woman"],["ningyohime"],["fantasy_ryuukishi"],["character_hakase"],["fantasy_dark_elf"],],
          degree: [["新人", "魔法使い"],["魅惑", "マーメイド"],["最強", "ドラゴンナイト"],["ものしり", "博士"],["憧れ", "タスクマスター"],]
        },
        task_delete: {
          avatar: [["shinigami"],],
          degree: [["タスク界", "死神"],]
        }
      };
      const db = getFirestore(this.$app);
      const docSnap = await getDoc(doc(db, "user", this.uid));
      let ad;
      if (docSnap.exists()) ad = docSnap.data();
      ad.task_delete++;
      await updateDoc(doc(db, "user", this.uid), {
        task_delete: ad.task_delete,
      });
      const check_d = [30].indexOf(ad.task_delete) + 1;  // 削除回数が区切り目か
      if (check_d != 0) {
        alert("「タスク削除数」\nミッションを達成しました。");
        ad.achievement++;
        await updateDoc(doc(db, "user", this.uid), {
          achievement: ad.achievement,
          task_delete_step: check_d,
        });
        this.addAvatarDegree(db, avatar_degree, "task_delete", check_d);
        this.updateAchievement(db, avatar_degree, ad.achievement);
      }
    },
    // 実績達成数の更新
    async updateAchievement(db, a_d, achievement) {
      const check_achi = [1, 5, 10, 15, 30].indexOf(achievement) + 1;
      if (check_achi != 0) {
        alert("「実績解除数」\nミッションを達成しました。");
        await updateDoc(doc(db, "user", this.uid), {
          achievement_step: check_achi,
        });
        this.addAvatarDegree(db, a_d, "achievement", check_achi);
      }
    },
    // アバター画像と称号の登録（db、avatar_degree、どの種類か、何番目をクリアしたか）
    async addAvatarDegree(db, a_d, type, num) {
      a_d[type]["avatar"][num-1].forEach(async (img_name) => {
        await addDoc(collection(db, "user", this.uid, "Avatar"), {
          img_name: img_name,
        });
      });
      a_d[type]["degree"][num-1].forEach(async (name) => {
        await addDoc(collection(db, "user", this.uid, "Degree"), {
          name: name,
        });
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
    //タスクの枠の色
    changeBorderColor(priority) {
      if (priority == "高") {
        return "high-p my-3";
      } else if (priority == "中") {
        return "middle-p my-3";
      } else {
        return "low-p my-3";
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

.required:after {
  content: " *";
  color: red;
}

/* タスク表示 */
.high-p {
  border: 1px solid rgb(255, 0, 0);
  border-radius: 10px;
  background-color: rgba(255, 0, 0, 0.1);
  box-shadow: 1px 1px 2px #777777;
}

.middle-p {
  border: 1px solid rgb(210, 210, 0);
  border-radius: 10px;
  background-color: rgba(255, 250, 0, 0.1);
  box-shadow: 1px 1px 2px #777777;
}

.low-p {
  border: 1px solid rgb(199, 199, 199);
  border-radius: 10px;
  box-shadow: 1px 1px 2px #777777;
}

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

.modalWrapperEdit {
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

/* 編集ポップアップ内 */
.editContents {
  padding: 2em;
}

.editInput {
  border: 1px solid gray;
}
</style>
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
      <h2>タスク管理画面</h2>
      <div class="row">
        <div class="col-8">
          <div class="m-2 p-3 border">
            <h2 class="my-4" id="ToDo">ToDo</h2>
            <button @click="openAddPopup()" class="button-add">＋追加</button>
            <!-- 追加ポップアップここから -->
            <section id="addTask" class="modalArea">
              <div @click="closeAddPopup()" class="modalBg"></div>
              <div class="modalWrapper">
                <div class="addContents">
                  <h1>タスクの追加</h1>
                    <p>タスク名</p>
                    <p>
                      <input type=”text” name=”name” v-model="name" class="addInput">
                    </p>
                    <p>メモ</p>
                    <p>
                      <textarea name="memo" v-model="memo" class="addInput"></textarea>
                    </p>
                    <p>優先度</p>
                    <p>
                      <select name="priority" v-model="priority" class="addInput">
                        <option value="2">高</option>
                        <option value="1" selected>中</option>
                        <option value="0">低</option>
                      </select>
                    </p>
                    <p>期限</p>
                    <p>
                      <input type="date" name=”deadline” v-model="deadline" class="addInput">
                    </p>
                    <p>
                      <button @click="addData()" class="btn btn-success">保存</button>
                    </p>
                </div>
                <div @click="closeAddPopup()" class="closeModal">
                  ×
                </div>
              </div>
            </section>
            <!-- 追加ポップアップここまで -->

            <!-- id属性が必要か検討！！！！！！！！！！！！！！！！！！ -->

            <!-- 繰り返しここから -->
            <section v-for="task in tasks" :key="task.tid">
              <!-- タスク表示ここから -->
              <div @click="openEditPopup(task.name, task.memo, task.priority, task.deadline, task.tid)"
                v-bind:class="changeBorderColor(task.priority)" class="cursorPointer">
                <h4 class="task-title">{{ task.name }}</h4>
                <span class="task-content">期限：　{{ task.deadline }}</span>
                <span class="task-content">優先度：　{{ priorityToStr(task.priority) }}</span>
              </div>
              <!-- タスク表示ここまで -->

              <!-- 編集ポップアップ内容ここから -->
              <section id="editTask" class="modalArea">
                <div @click="closeEditPopup()" class="modalBg"></div>
                <div class="modalWrapper">
                  <div class="editContents">
                    <h1>タスクの編集</h1>
                    <p>タスク名</p>
                    <p>
                      <input type=”text” name=”name” v-model="name" class="editInput">
                    </p>
                    <p>メモ</p>
                    <p>
                      <textarea name="memo" v-model="memo" class="editInput"></textarea>
                    </p>
                    <p>優先度</p>
                    <p>
                      <select name="priority" v-model="priority" class="editInput">
                        <option value="2">高</option>
                        <option value="1" selected>中</option>
                        <option value="0">低</option>
                      </select>
                    </p>
                    <p>期限</p>
                    <p>
                      <input type="date" name=”deadline” v-model="deadline" class="editInput">
                    </p>
                    <p>
                      <button @click="updateData(taskid)" class="btn btn-warning">保存</button>
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

          </div>
        </div>

        <div class="col-4">
          <div class="m-2 p-3 border">
            <h2 class="my-4">遊び要素</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="text-center text-lg-start bg-light text-muted mt-4">
      <!-- Section: Links  -->
      <section class="border-top">
        <div class="container mt-5">
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-3 mx-auto mb-4">
              <!-- Content -->
              <h6 class="fw-bold mb-4">
                <a href="#">お問い合わせ</a>
              </h6>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-3 mx-auto mb-4">
              <!-- Links -->
              <h6 class="fw-bold mb-4">
                <NuxtLink to="/terms" target="_blank" rel="noopener noreferrer">利用規約・プライバシーポリシー</NuxtLink>
              </h6>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-3 mx-auto mb-4">
              <!-- Links -->
              <h6 class="fw-bold mb-4">
                <NuxtLink to="/help" target="_blank" rel="noopener noreferrer">ヘルプ</NuxtLink>
              </h6>
            </div>
            <!-- Grid column -->

          </div>
          <!-- Grid row -->
        </div>
      </section>
      <!-- Section: Links  -->

      <!-- Copyright -->
      <div class="text-center p-4" id="copyright">
        © 2022 Copyright:
        <a class="text-reset fw-bold" href="#">卒業制作を頑張る会</a>
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
</template>

<script>
import { doc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, where, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  head() {
    return {
      title: "タスク管理画面",
      script: [
        {
          type: "text/javascript",
          src: "//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"
        },
      ],
    }
  },
  data() {
    return {
      uid: "",
      tasks: [],
      name: "",
      memo: "",
      priority: 1,
      deadline: "",
      taskid: "",
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
          this.getTasks();
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
      });
    },

    async addData() {
      const db = getFirestore(this.$app);
      // データの追加
      // ユーザidをログイン中のユーザのものにする
      await addDoc(collection(db, "task"), {
        deadline: this.deadline,
        memo: this.memo,
        name: this.name,
        priority: Number(this.priority),
        uid: this.uid,
      });
      this.getTasks();
      this.closeAddPopup();
      this.deadline = "";
      this.memo = "";
      this.name = "";
      this.priority = 1;
    },

    // データの上書き（編集ポップアップ用）
    async updateData(taskid) {
      const db = getFirestore(this.$app);
      await updateDoc(doc(db, "task", taskid), {
        deadline: this.deadline,
        memo: this.memo,
        name: this.name,
        priority: Number(this.priority),
        uid: this.uid,
      });
      this.getTasks();
      this.closeEditPopup();
    },
    // データの削除（編集ポップアップ用）
    async deleteData(taskid) {
      const db = getFirestore(this.$app);
      await deleteDoc(doc(db, "task", taskid));
      this.getTasks();
      this.closeEditPopup();
    },
    // 追加ポップアップを開く
    openAddPopup() {
      $('#addTask').fadeIn();
    },
    // 追加ポップアップを閉じる
    closeAddPopup() {
      $('#addTask').fadeOut();
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
      this.priority = 1;
      this.deadline = "";
      this.taskid = "";
    },
    // タスクの枠の色
    changeBorderColor(priority) {
      if (priority == 2) {
        return "border border-danger my-3";
      } else if (priority == 1) {
        return "border border-warning my-3";
      } else {
        return "border my-3";
      };
    },
    // priorityを文字に変換
    priorityToStr(priority) {
      if (priority == 2) {
        return "高";
      } else if (priority == 1) {
        return "中";
      } else {
        return "低";
      };
    },
  }
}
</script>

<style>
#logo {
  width: 9em;
}

#copyright {
  background-color: rgba(0, 0, 0, 0.05);
}

#ToDo {
  display: inline;
}

.button-add {
  float: right;
  width: 6em;
  height: 2.5em;
  border-radius: 3em;
  background-color: greenyellow;
  color: black;
  border: none;
}

.task {
  height: 3em;
}

.task-title {
  line-height: 2.5em;
  margin: 0;
  padding-left: 1em;
  display: inline;
}

.task-content {
  float: right;
  margin-right: 3em;
  line-height: 4em;
}

.cursorPointer {
  cursor: pointer
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

/* 追加ポップアップ内 */
.addContents {
  padding: 2em;
}
.addInput {
  border: 1px solid gray;
}

/* 編集ポップアップ内 */
.editContents {
  padding: 2em;
}

.editInput {
  border: 1px solid gray;
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


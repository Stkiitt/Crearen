<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-warning bg-warning mb-3">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4"
        aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="./index.html"> <img style="width: 9em;" id="logo" src="~/assets/logo/logo.png"></a>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button type="button" class="btn btn-dark">使い方</button>
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
            <button id="openAddTask" class="button-add" @click="pop_open()">＋追加</button>
            <!--追加ポップアップここから-->
            <section id="addTask" class="modalArea d-none">
              <div id="addTaskBg" class="modalBg"></div>
              <div class="modalWrapper">
                <div class="addContents">
                  <h1>追加用ポップアップ</h1>
                  <p>
                    タスク名
                    <input type=”text” name=”name” v-model="name">
                  </p>
                  <p>
                    優先度
                    <select name="priority" v-model="priority">
                      <option value="0">低</option>
                      <option value="1" selected>中</option>
                      <option value="2">高</option>
                    </select>
                  </p>
                  <p>
                    メモ
                    <textarea name="memo" v-model="memo"></textarea>
                  </p>
                  <p>
                    期限
                    <input type=”text” name=”deadline” placeholder="yyyy/mm/dd" v-model="deadline">
                  </p>
                  <p>
                    <button @click="addData()">追加</button>
                  </p>
                  <!-- タスクの表示、編集、削除 -->
                  <div v-for="task in tasks" :key="task.id" class="border">
                    <p>{{ task.id }}</p>
                    <p>{{ task.name }}</p>
                    <p>{{ task.priority }}</p>
                    <p>{{ task.deadline }}</p>
                    <p>{{ task.memo }}</p>
                  </div>
                </div>
                <div id="closeAddTask" class="closeModal"  @click="pop_close()">
                  ×
                </div>
              </div>
            </section>
            <!--追加ポップアップここまで-->

            <!-- phpで繰り返す -->
            <div class="border my-3" id="openEditTask">
              <h4 class="task-title">課題をやる</h4>
              <span class="task-content">期限</span>
              <span class="task-content">優先度</span>
            </div>
            <div class="border my-3">
              <h4 class="task-title">飲み物を飲む</h4>
            </div>

            <!--編集ポップアップここから-->
            <section id="editTask" class="modalArea d-none">
              <div id="editTaskBg" class="modalBg"></div>
              <div class="modalWrapper">
                <div class="editContents">
                  <h1>編集用ポップアップです</h1>
                  <p>編集をしたいならさっさと編集しろ</p>
                </div>
                <div id="closeEditTask" class="closeModal">
                  ×
                </div>
              </div>
            </section>
            <!--編集ポップアップここまで-->

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
                <a href="#">利用規約・プライバシーポリシー</a>
              </h6>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-3 mx-auto mb-4">
              <!-- Links -->
              <h6 class="fw-bold mb-4">
                <a href="#">ヘルプ</a>
              </h6>
            </div>
            <!-- Grid column -->

          </div>
          <!-- Grid row -->
        </div>
      </section>
      <!-- Section: Links  -->

      <!-- Copyright -->
      <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
        © 2021 Copyright:
        <a class="text-reset fw-bold" href="#">卒業制作を頑張る会</a>
      </div>
      <!-- Copyright -->
    </footer>
  </div>
</template>

<script>
import { doc, getDocs, addDoc, setDoc, deleteDoc, collection, query, where, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  data() {
    return {
      uid: "",
      tasks: [],
      deadline: "",
      memo: "",
      name: "",
      priority: 1,
    }
  },
  mounted() {
    this.checkLogin();
  },
  methods: {

    // やること：編集前後の処理を考える

    // ログインの保持のデフォルトを調べる、永久ログインでもいいかも
    checkLogin() {
      const auth = getAuth(this.$app);
      onAuthStateChanged(auth, async (user) => {
        // ログイン中
        if (user) {
          this.uid = user.uid;
          // ログインしていない
        } else {
          location.href = 'http://localhost:3000/login';
        }
      });
    },

    // popupを開く関数

    // ▼ popupを閉じる関数に入れる（入力のチェック、保存、編集用変数を初期化、popupを閉じる）
    async addData() {
      const db = getFirestore(this.$app);
      // データの追加
      // ユーザidをログイン中のユーザのものにする
      const docRef = await addDoc(collection(db, "task"), {
        deadline: this.deadline,
        memo: this.memo,
        name: this.name,
        priority: Number(this.priority),
        uid: this.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      this.deadline = "";
      this.memo = "";
      this.name = "";
      this.priority = 1;
    },

    async getTasks() {
      const db = getFirestore(this.$app);
      // 複数データの取得
      const q = query(collection(db, "task"), where("uid", "==", this.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.tasks.push(doc.data());
      });
    },

    // popupを開く関数の引数にタスクごとの情報を入れて、開く際に編集用変数に入れる

    // タスクのドキュメントIDを引数にして判別する、データは引数じゃなくて変数に入れとく？
    // ▼ popupを閉じる関数に入れる（入力のチェック、保存、編集用変数を初期化、popupを閉じる）
    async updateData() {
      const db = getFirestore(this.$app);
      // データの上書き
      await setDoc(doc(db, "task", "taskID"), {
        deadline: this.deadline,
        memo: this.memo,
        name: this.name,
        priority: Number(this.priority),
        uid: this.uid,
      });

    },
    async deleteData() {
      const db = getFirestore(this.$app);
      // データの削除
      await deleteDoc(doc(db, "task", "taskID"));
    },

    pop_open() {
      var popup = document.getElementById("addTask");
      popup.classList.remove("d-none");
    },

    pop_close() {
      var popup = document.getElementById("addTask");
      popup.classList.add("d-none");
    }

  }
}
</script>

<style>
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

#openEditTask {
  cursor: pointer
}

/* モーダルCSS */
.modalArea {
  /*display: none; */
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


/* 以下ボタンスタイル */
button {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #282828;
  border-radius: 2px;
  cursor: pointer;
}
</style>


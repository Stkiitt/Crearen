<template>
  <div>
    <!-- タスクの追加 -->
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
    <p>
      <button @click="getTasks()">複数データの取得</button>
    </p>
    <!-- タスクの削除 -->
    <p>
      <button @click="deleteData()">データの削除</button>
    </p>
  </div>
</template>

<script>
import { doc, getDocs, addDoc, setDoc, deleteDoc, collection, query, where, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  data () {
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
      onAuthStateChanged(auth, (user) => {
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
    }
  }
}
</script>

<style>
  .border {
    border: 1px solid black;
  }
</style>
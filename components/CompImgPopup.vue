<template>
  <div>
    <span class="task-comp">
      <img @click="openCompPopup()"
        id="complete" src="../assets/check/check.png">
    </span>
    <!-- タスク完了ポップアップここから -->
    <section :id="'CompTask'+task['tid']" class="modalArea">
      <div @click="closeCompPopup()" class="modalBg"></div>
      <div class="modalWrapper_comp">
        <div class="compContents">
          <p>タスクを完了しますか？</p>
          <p>
            <button @click="completeButton()" class="btn btn-warning">はい</button>
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
    async completeButton() {
      const db = getFirestore(this.$app);
      console.log("完了name："+this.task["name"]); /////////////////
      console.log("完了taskid："+this.taskid); /////////////////
      await addDoc(collection(db, "task_completed"), {
        time: this.getNow(),
        deadline: this.deadline,
        memo: this.memo,
        name: this.name,
        priority: this.priority,
        uid: this.uid,
      });
      console.log("完了taskid："+this.taskid); /////////////////
      await this.countCompAchievement();
      console.log("完了taskid："+this.taskid); /////////////////
      await deleteDoc(doc(db, "task", this.taskid));  ///////// この処理ができない、2つ以上登録して一番下を削除するとthis.に代入されてない
      this.tasksChild = await this.getTasks();
      this.closeCompPopup();
    },
    // タスク完了時の実績カウント
    async countCompAchievement() {
      const avatar_degree = {
        achievement: {
          avatar: [["mahoutsukai_white_man", "mahoutsukai_white_woman"],["ningyohime"],["fantasy_ryuukishi"],["character_hakase"],["fantasy_dark_elf"],],
          degree: [["新人", "魔法使い"],["魅惑", "マーメイド"],["最強", "ドラゴンナイト"],["ものしり", "博士"],["憧れ", "タスクマスター"],]
        },
        completed_quick: {
          avatar: [["fantasy_berserker"],],
          degree: [["タスクキラー"],]
        },
        completed_all: {
          avatar: [["kugakusei"],["busy_man"],["syoninkyu_man"],["mahoutsukai_water"],["mahoutsukai_wind"],],
          degree: [["働く", "学生"],["忙しい", "社員"],["少ない", "初任給"],["計画的", "実行"],["塵", "積もれば山となる"],]
        },
        completed_high: {
          avatar: [["chibikko_gang"],["alien_grey"],["mahoutsukai_thunder"],["royal_king_gyokuza", "royal_queen_gyokuza"],["kamisama"],],
          degree: [["生意気", "ギャング", "ベイビー"],["かわいい", "宇宙人"],["ビリビリ", "達人"],["やさしい", "王様"],["最高", "神"],]
        },
        completed_middle: {
          avatar: [["kintarou"],["fantasy_elf2"],["knight"],["mahoutsukai_necromancer"],["fantasy_maou_devil"],],
          degree: [["元気", "金太郎"],["幻", "エルフ"],["敏腕", "ナイト"],["上手", "玄人"],["最悪", "魔王"],]
        },
        completed_low: {
          avatar: [["yuusya_game"],["mahoutsukai_fire"],["fantasy_dracula2"],["ninja_shinobiashi"],["tantei_boy", "tantei_girl"],],
          degree: [["駆け出し", "勇者"],["メラメラ", "努力家"],["強力", "ドラキュラ"],["一人前", "忍者"],["すごい", "名探偵"],]
        },
        task_success: {
          avatar: [["tabibito"],["monogatari_robinhood"],["saiyuki_songoku_kintoun"],["fantasy_dragon"],["unchi_character"],],
          degree: [["さすらい", "旅人"],["百発百中", "アーチャー"],["伝説", "孫悟空"],["恐ろしい", "タスクモンスター"],["嵐を呼ぶ", "しり"],]
        },
        task_failure: {
          avatar: [["character_shimekiri"],["businessman_cry_man"],["speed_slow_turtle"],],
          degree: [["油断大敵"],["鶴", "千年"],["亀", "万年"],]
        },
      };
      const db = getFirestore(this.$app);
      const docSnap = await getDoc(doc(db, "user", this.uid));
      let ad;
      if (docSnap.exists()) ad = docSnap.data();
      const today = this.getToday();
      const timeDiff = this.getNow() - this.time_created;  // 作成してすぐに完了していないか確認（不正してないか）
      if (timeDiff < 300) {
        ad.completed_quick++; 
        const check_q = [10].indexOf(ad.completed_quick) + 1;
        if (check_q != 0) {
          alert("「?」\nミッションを達成しました。");
          ad.achievement++;
          await updateDoc(doc(db, "user", this.uid), {
            completed_quick_step: check_q,
          });
          this.addAvatarDegree(db, avatar_degree, "completed_quick", check_q);
          this.updateAchievement(db, avatar_degree, ad.achievement);
        }
      }
      ad.completed_all++;  // タスク完了の合計カウントを増やす
      const check_all = [30, 50, 100, 200, 300].indexOf(ad.completed_all) + 1;
      if (check_all != 0) {
        alert("「タスク完了の合計数」\nミッションを達成しました。");
        ad.achievement++;
        await updateDoc(doc(db, "user", this.uid), {
          completed_all_step: check_all,
        });
        this.addAvatarDegree(db, avatar_degree, "completed_all", check_all);
        this.updateAchievement(db, avatar_degree, ad.achievement);
      }
      if (this.priority == "高") {  // 高のカウントを増やす
        ad.completed_high++;
        const check_h = [1, 5, 10, 50, 100].indexOf(ad.completed_high) + 1;
        if (check_h != 0) {
          alert("「優先度：高」\nミッションを達成しました。");
          ad.achievement++;
          await updateDoc(doc(db, "user", this.uid), {
            completed_high_step: check_h,
          });
          this.addAvatarDegree(db, avatar_degree, "completed_high", check_h);
          this.updateAchievement(db, avatar_degree, ad.achievement);
        }
      } else if (this.priority == "中") {  // 中のカウントを増やす
        ad.completed_middle++;
        const check_m = [1, 5, 10, 50, 100].indexOf(ad.completed_middle) + 1;
        if (check_m != 0) {
          alert("「優先度：中」\nミッションを達成しました。");
          ad.achievement++;
          await updateDoc(doc(db, "user", this.uid), {
            completed_middle_step: check_m,
          });
          this.addAvatarDegree(db, avatar_degree, "completed_middle", check_m);
          this.updateAchievement(db, avatar_degree, ad.achievement);
        }
      } else if (this.priority == "低") {  // 低のカウントを増やす
        ad.completed_low++;
        const check_l = [1, 5, 10, 50, 100].indexOf(ad.completed_low) + 1;
        if (check_l != 0) {
          alert("「優先度：低」\nミッションを達成しました。");
          ad.achievement++;
          await updateDoc(doc(db, "user", this.uid), {
            completed_low_step: check_l,
          });
          this.addAvatarDegree(db, avatar_degree, "completed_low", check_l);
          this.updateAchievement(db, avatar_degree, ad.achievement);
        }
      }
      const deadlineChecked = Number(this.deadline.replace(/-/g, ''));  // 期限を過ぎていないか確認
      if (deadlineChecked >= today || deadlineChecked == "") {
        ad.task_success++;
        const check_s = [30, 50, 100, 200, 300].indexOf(ad.task_success) + 1;
        if (check_s != 0) {
          alert("「期限内にタスクを完了する」\nミッションを達成しました。");
          ad.achievement++;
          await updateDoc(doc(db, "user", this.uid), {
            task_success_step: check_s,
          });
          this.addAvatarDegree(db, avatar_degree, "task_success", check_s);
          this.updateAchievement(db, avatar_degree, ad.achievement);
        }
      } else {
        ad.task_failure++;
        const check_f = [10, 20, 30].indexOf(ad.task_failure) + 1;
        if (check_f != 0) {
          alert("「期限を過ぎてタスクを完了する」\nミッションを達成しました。");
          ad.achievement++;
          await updateDoc(doc(db, "user", this.uid), {
            task_failure_step: check_f,
          });
          this.addAvatarDegree(db, avatar_degree, "task_failure", check_f);
          this.updateAchievement(db, avatar_degree, ad.achievement);
        }
      }
      await updateDoc(doc(db, "user", this.uid), {
        achievement: ad.achievement,
        completed_all: ad.completed_all,
        completed_high: ad.completed_high,
        completed_low: ad.completed_low,
        completed_middle: ad.completed_middle,
        completed_quick: ad.completed_quick,
        task_failure: ad.task_failure,
        task_success: ad.task_success,
      });
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
      console.log("開くname："+this.task["name"]); /////////////////
      console.log("開くtaskid："+this.taskid); /////////////////
      this.name = this.task["name"];
      this.memo = this.task["memo"];
      this.priority = this.task["priority"];
      this.deadline = this.task["deadline"];
      this.taskid = this.task["tid"];
      this.time_created = this.task["time"];
      $('#CompTask'+this.task["tid"]).fadeIn();
      console.log("開くtaskid："+this.taskid); /////////////////
    },
    // タスク完了ポップアップを閉じる
    closeCompPopup() {
      console.log("閉じるname："+this.task["name"]); /////////////////
      console.log("閉じるtaskid："+this.taskid); /////////////////
      $('#CompTask'+this.task["tid"]).fadeOut();
      this.name = "";
      this.memo = "";
      this.priority = "中";
      this.deadline = "";
      this.taskid = "";
      this.time_created = 0;
      console.log("閉じるtaskid："+this.taskid); /////////////////
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

.modalWrapper_comp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  max-width: 250px;
  padding: 10px 30px;
  background-color: #fff;
}

.closeModal {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  cursor: pointer;
}

.compContents {
  padding: 5px;
  text-align: center;
}
</style>
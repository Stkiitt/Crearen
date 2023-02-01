<template>
  <div id="body">
    <nav class="navbar navbar-expand-sm navbar-warning bg-warning mb-3">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4"
        aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <NuxtLink class="navbar-brand" to="/"><img id="logo" src="../assets/logo/logo.png"></NuxtLink>
    </nav>
    <h1 class="title mt-5"> 進行中のミッション<span class="title_username"> {{ username }} さん</span></h1>
    <div class="container mt-2 mission">
      <div v-for="achievement in achievements" :key="achievement[2]">
        <div :style="changeAchievementBGC(achievement[5])" id="achievement">
          <div class="row missionBox">
            <h4 id="taskTitle">
              <span>{{ achievement[2] }}</span>
            </h4>
            <h4 id="progress">
              <span v-if="!achievement[5]">{{ achievement[1] }}/{{ achievement[0] }}</span>
              <span v-if="achievement[5]" class="complete">{{ achievement[5] }}</span>
              <img :src="changeTrophyImg([achievement[4]])" class="trophyImg">
            </h4>
          </div>
          <h4 id="taskStarProgBar">
            {{ achievement[3] }}
            <span class="progBar">
              <span class="bar" :style="changeProgressBar(achievement[0], achievement[1])"></span>
            </span>
          </h4>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button type="button" class="btn btn-danger mt-3 mb-3" onclick="window.close();">閉じる</button>
    </div>

  </div>
</template>

<script>
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  head() {
    return {
      title: "ミッション進捗",
      script: [
        {
          src: "https://unpkg.com/swiper/swiper-bundle.min.js"
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://unpkg.com/swiper/swiper-bundle.min.css"
        },
      ],
    }
  },
  data() {
    return {
      uid: "",
      username: "ーーー",
      achievements: [],
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
          this.getAchievementData();
        } else {
          this.$router.push('/');
        }
      });
    },
    // 実績データの取得
    async getAchievementData() {
      let ad;
      const db = getFirestore(this.$app);
      const docSnap = await getDoc(doc(db, "user", this.uid));
      if (docSnap.exists()) ad = docSnap.data();
      this.username = ad.user_name;
      this.achievements = [];
      const al = [
        [
          [30, ad.completed_all, "タスクを30回達成する", "☆☆☆☆☆"],
          [50, ad.completed_all, "タスクを50回達成する", "★☆☆☆☆"],
          [100, ad.completed_all, "タスクを100回達成する", "★★☆☆☆"],
          [200, ad.completed_all, "タスクを200回達成する", "★★★☆☆", 1],
          [300, ad.completed_all, "タスクを300回達成する", "★★★★☆", 2],
          [300, ad.completed_all, "タスクを300回以上達成！", "★★★★★", 3, "Complete !!"]
        ],
        [
          [1, ad.achievement, "ミッションを1個達成する", "☆☆☆☆☆"],
          [5, ad.achievement, "ミッションを5個達成する", "★☆☆☆☆"],
          [10, ad.achievement, "ミッションを10個達成する", "★★☆☆☆"],
          [15, ad.achievement, "ミッションを15個達成する", "★★★☆☆", 1],
          [30, ad.achievement, "ミッションを30個達成する", "★★★★☆", 2],
          [30, ad.achievement, "ミッションを30個以上達成！", "★★★★★", 3, "Complete !!"]
        ],
        [
          [1, ad.completed_low, "難易度「低」のタスクを1回達成する", "☆☆☆☆☆"],
          [5, ad.completed_low, "難易度「低」のタスクを5回達成する", "★☆☆☆☆"],
          [10, ad.completed_low, "難易度「低」のタスクを10回達成する", "★★☆☆☆"],
          [50, ad.completed_low, "難易度「低」のタスクを50回達成する", "★★★☆☆", 1],
          [100, ad.completed_low, "難易度「低」のタスクを100回達成する", "★★★★☆", 2],
          [100, ad.completed_low, "難易度「低」のタスクを100回以上達成！", "★★★★★", 3, "Complete !!"]
        ],
        [
          [1, ad.completed_middle, "難易度「中」のタスクを1回達成する", "☆☆☆☆☆"],
          [5, ad.completed_middle, "難易度「中」のタスクを5回達成する", "★☆☆☆☆"],
          [10, ad.completed_middle, "難易度「中」のタスクを10回達成する", "★★☆☆☆"],
          [50, ad.completed_middle, "難易度「中」のタスクを50回達成する", "★★★☆☆", 1],
          [100, ad.completed_middle, "難易度「中」のタスクを100回達成する", "★★★★☆", 2],
          [100, ad.completed_middle, "難易度「中」のタスクを100回以上達成！", "★★★★★", 3, "Complete !!"]
        ],
        [
          [1, ad.completed_high, "難易度「高」のタスクを1回達成する", "☆☆☆☆☆"],
          [5, ad.completed_high, "難易度「高」のタスクを5回達成する", "★☆☆☆☆"],
          [10, ad.completed_high, "難易度「高」のタスクを10回達成する", "★★☆☆☆"],
          [50, ad.completed_high, "難易度「高」のタスクを50回達成する", "★★★☆☆", 1],
          [100, ad.completed_high, "難易度「高」のタスクを100回達成する", "★★★★☆", 2],
          [100, ad.completed_high, "難易度「高」のタスクを100回以上達成！", "★★★★★", 3, "Complete !!"]
        ],
        [
          [30, ad.task_success, "期限前にタスクを30回完了する", "☆☆☆☆☆"],
          [50, ad.task_success, "期限前にタスクを50回完了する", "★☆☆☆☆"],
          [100, ad.task_success, "期限前にタスクを100回完了する", "★★☆☆☆"],
          [150, ad.task_success, "期限前にタスクを150回完了する", "★★★☆☆", 1],
          [300, ad.task_success, "期限前にタスクを300回完了する", "★★★★☆", 2],
          [300, ad.task_success, "期限前にタスクを300回以上完了！", "★★★★★", 3, "Complete !!"]
        ],
        [
          [1, ad.daily_login, "ログイン日数：1日", "☆☆☆☆☆"],
          [7, ad.daily_login, "ログイン日数：7日", "★☆☆☆☆"],
          [30, ad.daily_login, "ログイン日数：30日", "★★☆☆☆"],
          [100, ad.daily_login, "ログイン日数：100日", "★★★☆☆", 1],
          [300, ad.daily_login, "ログイン日数：300日", "★★★★☆", 2],
          [300, ad.daily_login, "ログイン日数：300日以上達成！", "★★★★★", 3, "Complete !!"]
        ],
        [
          [10, ad.task_failure, "タスクを10回失敗する", "☆☆☆"],
          [20, ad.task_failure, "タスクを20回失敗する", "★☆☆", 1],
          [30, ad.task_failure, "タスクを30回失敗する", "★★☆", 2],
          [30, ad.task_failure, "タスクを30回以上失敗しました。", "★★★", 3, "Complete !!"]
        ],
        [
          [30, ad.task_delete, "タスクを30回削除する", "☆"],
          [30, ad.task_delete, "タスクを30回以上削除しました。", "★", 3, "Complete !!"],
        ],
        [
          [10, ad.completed_quick, "？", "☆"],
          [10, ad.completed_quick, "タスクを作成してから5分以内に完了：10回", "★", 3, "Complete !!"],
        ]
      ];
      for (let i = 0; i < al.length; i++) {
        const alLength = al[i].length;
        if (al[i][0][1] < al[i][0][0]) this.achievements.push(al[i][0]);
        else if (al[i][1][1] < al[i][1][0]) this.achievements.push(al[i][1]);
        else if (alLength > 2 && al[i][2][1] < al[i][2][0]) this.achievements.push(al[i][2]);
        else if (alLength > 3 && al[i][3][1] < al[i][3][0]) this.achievements.push(al[i][3]);
        else if (alLength > 4 && al[i][4][1] < al[i][4][0]) this.achievements.push(al[i][4]);
        else this.achievements.push(al[i][alLength - 1]);
      }
    },
    // プログレスバーの長さ変更
    changeProgressBar(target, now) {
      let returnStyle = "";
      if (target > now) {
        const percent = now / target * 100;
        returnStyle = "width: " + percent + "%;";
      } else {
        returnStyle = "width: 100%;";
      }
      return returnStyle;
    },
    // トロフィーの変更
    changeTrophyImg(img) {
      if(img == 1) {
        return require("../assets/trophy/銅.png");
      }else if(img == 2) {
        return require("../assets/trophy/銀.png");
      }else if(img == 3) {
        return require("../assets/trophy/金.png");
      }
    },
    // 実績の背景色変更
    changeAchievementBGC(comp) {
      if(comp) return "background-color: rgba(255, 246, 115, 0.6);";
      else return "";
    },
  }
}
</script>

<style>
#logo {
  width: 9em;
}

#body {
  background-color: blanchedalmond;
}

.container {
  position: relative;

}

.title {
  max-width: 800px;
  margin: 0 auto;
  display: block;
}

.title_username {
  font-size: 25px;
  margin-left: 2em;
}

.mission {
  max-width: 800px;
  height: 400px;
  border: 1px solid black;
  background-color: bisque;
  overflow: auto;
  padding: 0 30px;
  scrollbar-width: thin;
  scrollbar-color: #f174c1 #ccc;
}

#achievement {
  background-color: white;
  border: 1px solid black;
  margin-top: 2em;
  margin-bottom: 2em;
  box-shadow: 5px 3px 5px rgb(130, 130, 130);
}

.mission::-webkit-scrollbar {
  width: 10px;
}

.mission::-webkit-scrollbar-track {
  background-color: #ccc;
  border-radius: 5px;
}

.mission::-webkit-scrollbar-thumb {
  background-color: #ee5e1c;
  border: 2px outset #dc5b1f;
  border-radius: 10px;
}

#taskTitle {
  margin-top: 0.5em;
  margin-left: 1.2em;
  display: block;
}

.trophyImg {
  width: 25px;
  margin-left: 0.7em;
}

#taskStarProgBar {
  margin-left: 0.5em;
  display: block;
}

.progBar {
  position: relative;
  width: 300px;
  height: 10px;
  float: right;
  margin: 14px 20px;
  background-color: lightgray;
  border-radius: 5px;
}

.progBar .bar {
  position: absolute;
  height: 100%;
  background-color: #FFCA28;
  border-radius: 5px;
}

.complete {
  color: rgb(255, 174, 0);
  margin-left: 1em;
}

#progress {
  margin: 0.5em 0 0 auto;
  right: 0em;
  display: block;
}

.missionBox {
  width: 99%;
}
</style>
  
  
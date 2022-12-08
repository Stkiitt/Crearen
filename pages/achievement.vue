<template>
  <div id="body">
    <nav class="navbar navbar-expand-sm navbar-warning bg-warning mb-3">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4"
        aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <NuxtLink class="navbar-brand" to="/"><img id="logo" src="~/assets/logo/logo.png"></NuxtLink>
    </nav>
    <h1 class="title mt-5"> 進行中のミッション</h1>
    <div class="container mt-2 mission">
      <div v-for="achievement in achievements" id="achievement">
        <div class="row">
          <h4 id="taskTitle">{{ achievement[2] }}<span class="complete">{{ achievement[5] }}</span></h4>
          <h4 id="progress">{{ achievement[1] }}/{{ achievement[0] }}<img :src="changeTrophyImg([achievement[4]])" class="trophyImg"></h4>
        </div>
        <h4 id="taskStarProgBar">{{ achievement[3] }}
          <span class="progBar">
            <span class="bar" :style="changeProgressBar(achievement[0], achievement[1])"></span>
          </span>
        </h4>
      </div>
    </div>
    <div class="text-center">
      <button type="button" class="btn btn-danger mt-3 mb-3" onclick="window.close();">閉じる</button>
    </div>

  </div>
</template>

<script>
import { doc, getDoc, getFirestore } from "firebase/firestore";
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
          location.href = 'http://localhost:3000';
        }
      });
    },
    // 実績データの取得
    async getAchievementData() {
      const db = getFirestore(this.$app);
      const docSnap = await getDoc(doc(db, "user", "てすと"));
      if (docSnap.exists()) {
        const ad = docSnap.data();
        this.achievements = [];
        const test = [
          [
            [10, ad.completed_all, "タスクを10回達成する", "★☆☆☆☆"],
            [20, ad.completed_all, "タスクを20回達成する", "★★☆☆☆"],
            [30, ad.completed_all, "タスクを30回達成する", "★★★☆☆"],
            [40, ad.completed_all, "タスクを40回達成する", "★★★★☆", 1],
            [50, ad.completed_all, "タスクを50回達成する", "★★★★★", 2],
            [50, ad.completed_all, "タスクを50回以上達成！", "★★★★★", 3, "Complete !!"]     ////////////////////////// 相談
          ],
          [
            [10, ad.completed_low, "難易度「低」のタスクを10回達成する", "★☆☆☆☆"],
            [20, ad.completed_low, "難易度「低」のタスクを20回達成する", "★★☆☆☆"],
            [30, ad.completed_low, "難易度「低」のタスクを30回達成する", "★★★☆☆"],
            [40, ad.completed_low, "難易度「低」のタスクを40回達成する", "★★★★☆", 1],
            [50, ad.completed_low, "難易度「低」のタスクを50回達成する", "★★★★★", 2],
            [50, ad.completed_low, "難易度「低」のタスクを50回以上達成！", "★★★★★", 3, "Complete !!"]     ////////////////////////// 相談
          ],
          [
            [10, ad.completed_middle, "難易度「中」のタスクを10回達成する", "★☆☆☆☆"],
            [20, ad.completed_middle, "難易度「中」のタスクを20回達成する", "★★☆☆☆"],
            [30, ad.completed_middle, "難易度「中」のタスクを30回達成する", "★★★☆☆"],
            [40, ad.completed_middle, "難易度「中」のタスクを40回達成する", "★★★★☆", 1],
            [50, ad.completed_middle, "難易度「中」のタスクを50回達成する", "★★★★★", 2],
            [50, ad.completed_middle, "難易度「中」のタスクを50回以上達成！", "★★★★★", 3, "Complete !!"]     ////////////////////////// 相談
          ],
          [
            [10, ad.completed_high, "難易度「高」のタスクを10回達成する", "★☆☆☆☆"],
            [20, ad.completed_high, "難易度「高」のタスクを20回達成する", "★★☆☆☆"],
            [30, ad.completed_high, "難易度「高」のタスクを30回達成する", "★★★☆☆"],
            [40, ad.completed_high, "難易度「高」のタスクを40回達成する", "★★★★☆", 1],
            [50, ad.completed_high, "難易度「高」のタスクを50回達成する", "★★★★★", 2],
            [50, ad.completed_high, "難易度「高」のタスクを50回以上達成！", "★★★★★", 3, "Complete !!"]     ////////////////////////// 相談
          ],
          [
            [10, ad.daily_login, "ログイン日数：10日", "★☆☆☆☆"],
            [20, ad.daily_login, "ログイン日数：20日", "★★☆☆☆"],
            [30, ad.daily_login, "ログイン日数：30日", "★★★☆☆"],
            [40, ad.daily_login, "ログイン日数：40日", "★★★★☆", 1],
            [50, ad.daily_login, "ログイン日数：50日", "★★★★★", 2],
            [50, ad.daily_login, "ログイン日数50日以上達成！", "★★★★★", 3, "Complete !!"]     ////////////////////////// 相談
          ],
          [
            [10, ad.task_success, "期限前にタスクを10回完了する", "★☆☆☆☆"],
            [20, ad.task_success, "期限前にタスクを20回完了する", "★★☆☆☆"],
            [30, ad.task_success, "期限前にタスクを30回完了する", "★★★☆☆"],
            [40, ad.task_success, "期限前にタスクを40回完了する", "★★★★☆", 1],
            [50, ad.task_success, "期限前にタスクを50回完了する", "★★★★★", 2],
            [50, ad.task_success, "期限前にタスクを50回以上完了！", "★★★★★", 3, "Complete !!"]     ////////////////////////// 相談
          ],
          [
            [10, ad.task_failure, "タスクを10回失敗する", "★☆☆"],
            [20, ad.task_failure, "タスクを20回失敗する", "★★☆", 1],
            [30, ad.task_failure, "タスクを30回失敗する", "★★★", 2],
            [30, ad.task_failure, "タスクを30回以上失敗失敗しました！", "★★★", 3, "Complete !!"]     ////////////////////////// 相談
          ],
        ];
        for (let i = 0; i < test.length; i++) {
          const testLength = test[i].length;
          if (test[i][0][1] < test[i][0][0]) this.achievements.push(test[i][0]);
          else if (testLength > 1 && test[i][1][1] < test[i][1][0]) this.achievements.push(test[i][1]);
          else if (testLength > 2 && test[i][2][1] < test[i][2][0]) this.achievements.push(test[i][2]);
          else if (testLength > 3 && test[i][3][1] < test[i][3][0]) this.achievements.push(test[i][3]);
          else if (testLength > 4 && test[i][4][1] < test[i][4][0]) this.achievements.push(test[i][4]);
          else this.achievements.push(test[i][testLength - 1]);
        }
      } else {
        console.log("No such document.");
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
        return require("~/assets/trophy/銅.png");
      }else if(img == 2) {
        return require("~/assets/trophy/銀.png");
      }else if(img == 3) {
        return require("~/assets/trophy/金.png");
      }
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

.mission {
  max-width: 800px;
  height: 400px;
  border: 1px solid black;
  background-color: bisque;
  overflow: auto;
  padding: 0 30px;
}

#achievement {
  background-color: white;
  border: 1px solid black;
  margin-top: 2em;
  margin-bottom: 2em;
  box-shadow: 5px 3px 5px rgb(130, 130, 130);
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
  background-color: #ececec;
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

.row {
  width: 99%;
}
</style>
  
  
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
      <div id="achievement">
        <div class="row">
          <h4 id="taskTitle">タスクを{{achievement[0][0]}}回達成する</h4>
          <h4 id="progress">{{achievement[0][1]}}/{{achievement[0][0]}}</h4>
        </div>
        <h4 id="taskStar">{{achievement[0][2]}}</h4>
      </div>
      <div id="achievement">
        <div class="row">
          <h4 id="taskTitle">難易度「低」のタスクを{{achievement[1][0]}}回達成する</h4>
          <h4 id="progress">{{achievement[1][1]}}/{{achievement[1][0]}}</h4>
        </div>
        <h4 id="taskStar">{{achievement[1][2]}}</h4>
      </div>
      <div id="achievement">
        <div class="row">
          <h4 id="taskTitle">難易度「中」のタスクを{{achievement[2][0]}}回達成する</h4>
          <h4 id="progress">{{achievement[2][1]}}/{{achievement[2][0]}}</h4>
        </div>
        <h4 id="taskStar">{{achievement[2][2]}}</h4>
      </div>
      <div id="achievement">
        <div class="row">
          <h4 id="taskTitle">難易度「高」のタスクを{{achievement[3][0]}}回達成する</h4>
          <h4 id="progress">{{achievement[3][1]}}/{{achievement[3][0]}}</h4>
        </div>
        <h4 id="taskStar">{{achievement[3][2]}}</h4>
      </div>
      <div id="achievement">
        <div class="row">
          <h4 id="taskTitle">ログイン日数</h4>
          <h4 id="progress">{{achievement[4][1]}}/{{achievement[4][0]}}</h4>
        </div>
        <h4 id="taskStar">{{achievement[4][2]}}</h4>
      </div> 
      <div id="achievement">
        <div class="row">
          <h4 id="taskTitle">期限前にタスクを完了する</h4>
          <h4 id="progress">{{achievement[5][1]}}/{{achievement[5][0]}}</h4>
        </div>
        <h4 id="taskStar">{{achievement[5][2]}}</h4>
      </div>
      <div id="achievement">
        <div class="row">
          <h4 id="taskTitle">タスクを失敗する</h4>
          <h4 id="progress">{{achievement[6][1]}}/{{achievement[6][0]}}</h4>
        </div>
        <h4 id="taskStar">{{achievement[6][2]}}</h4>
      </div>
    </div>

    <div class="text-center">
      <button type="button" class="btn btn-danger mt-3 mb-3" onclick="window.close();">閉じる</button>
    </div>

  </div>
</template>

<script>
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
      achievement: [
        [10, 0, "★☆☆☆☆"],
        [3, 0, "★☆☆☆☆"],
        [3, 0, "★☆☆☆☆"],
        [3, 0, "★☆☆☆☆"],
        [3, 0, "★☆☆☆☆"],
        [3, 0, "★☆☆☆☆"],
        [3, 0, "★☆☆☆☆"],
      ],
    }
  },
  mounted() {
  },
  methods: {
    getachievementData() {
    },
    // 実績が増えても対応できるように
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
}

#achievement {
  background-color: white;
  border: 1px solid black;
  margin-top: 2em;
  margin-bottom: 2em;
}

#taskTitle {
  margin-top: 0.5em;
  margin-left: 1.2em;
  display: block;
}

#taskStar {
  margin-left: 0.5em;
  display: block;
}

#progress {
  margin: 0.5em 0 0 auto;
  right: 0em;
  display: block;
}

.row {
  width: 95%;
}
</style>
  
  
<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-warning bg-warning mb-3">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4"
        aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <NuxtLink class="navbar-brand" to="/"><img id="logo" src="~/assets/logo/logo.png"></NuxtLink>
    </nav>

    <div class="container mt-5 border">
      <h2 class="mt-3"> ミッション</h2>
      <hr>
      <div id="achievement">
        
        <div class="row">
          <h4 id="taskTitle">タスクを10回達成する</h4>
          <h4 id="progress">1/5</h4>
        </div>
        <h4 id="taskStar">★☆☆☆☆</h4>
      </div>
      <div id="achievement">
        <div class="row">
          <h4 id="taskTitle">難易度「低」のタスクを3回達成する</h4>
        </div>
        <h4 id="taskStar">★☆☆☆☆</h4>
      </div>
      <div id="achievement">
        <div class="row">
          <h4 id="taskTitle">難易度「中」のタスクを3回達成する</h4>
        </div>
        <h4 id="taskStar">★☆☆☆☆</h4>
      </div>
      <div id="achievement">
        <div class="row">
          <h4 id="taskTitle">難易度「高」のタスクを3回達成する</h4>
        </div>
        <h4 id="taskStar">★☆☆☆☆</h4>
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
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style>
#logo {
  width: 9em;
}

#achievement {
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
  
  
<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-warning bg-warning mb-3">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4"
        aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <NuxtLink class="navbar-brand" to="/"> <img id="logo" src="~/assets/logo/logo.png"></NuxtLink>
    </nav>

    <div class="container mt-5 border">
      <div class="row">
        <div class="col-3 border">
          <h4 class="mt-3">目次</h4>
          <ul>
            <a href="#タスク管理画面の使い方">
              <li>タスク管理画面の使い方</li>
            </a>
          </ul>
          <ul>
            <a href="#楽しみ方">
              <li>楽しみ方</li>
            </a>
            <ul>
              <a href="#遊び要素A">
                <li>遊び要素A</li>
              </a>
              <a href="#遊び要素B">
                <li>遊び要素B</li>
              </a>
            </ul>
          </ul>
        </div>

        <div class="col-9 border">
          <a id="タスク管理画面の使い方">
            <h3 class="mt-3">タスク管理画面の使い方</h3>
          </a>
          <hr>
          <div class="container">
            <div class="row">
              <div class="col-6">
                <iframe width="400" height="250" src="https://www.youtube.com/embed/4uqYCV5vr8k"
                  title="YouTube video player" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>
              </div>
              <div class="col-6">
                <p>これを聞くと天才になれます</p>
              </div>
            </div>
          </div>
          <a id="楽しみ方">
            <h3 class="mt-3">楽しみ方</h3>
          </a>
          <hr>
          <div class="container">
            <ul>
              <li id="遊び要素A">
                <h5>遊び要素A</h5>
              </li>
            </ul>
            <div class="row">
              <div class="col-6">
                <iframe width="400" height="250" src="https://www.youtube.com/embed/qWmivRsusVw"
                  title="YouTube video player" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>
              </div>
              <div class="col-6">
                <p>これを聞くとバカになります</p>
              </div>
            </div>
            <ul>
              <li id="遊び要素B">
                <h5>遊び要素B</h5>
              </li>
            </ul>
          </div>
          <hr>
        </div>
      </div>
    </div>

    <div class="text-center">
      <button type="button" class="btn btn-danger mt-3 mb-3" onclick="window.close();">閉じる</button>
    </div>
  </div>
</template>

<script>
export default {
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
#logo{
  width: 9em;
}
</style>
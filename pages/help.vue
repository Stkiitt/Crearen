<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-warning bg-warning mb-3">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4"
        aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <NuxtLink class="navbar-brand" to="/"><img id="logo" src="../assets/logo/logo.png"></NuxtLink>
    </nav>

    <div class="container mt-5 border">
      <div class="row">
        <div class="col-3 border">
          <h4 class="mt-3">目次</h4>
          <ul>
            <a href="#タスク管理とは">
              <li>タスク管理とは</li>
            </a>
          </ul>
          <ul>
            <a href="#よくある質問">
              <li>よくある質問</li>
            </a>
            <ul>
              <a href="#無料">
                <li>無料ですか？</li>
              </a>
              <a href="#このPC">
                <li>このPCで動く？</li>
              </a>
            </ul>
          </ul>
          <ul>
            <a href="#機能について">
              <li>機能について</li>
            </a>
          </ul>
        </div>

        <div class="col-9 border">
          <h3 class="mt-3">FAQ</h3>
          <hr>
          <div>
            <h3 class="mt-5" id="タスク管理とは">タスク管理とは</h3>
            <hr>
            <p>タスク管理とは、タスクを管理することである。</p>
          </div>
          <div>
            <h3 class="mt-5" id="よくある質問">よくある質問</h3>
            <hr>
            <div>
              <h4 class="mt-4" id="無料">無料ですか？</h4>
              <p>はい、完全無料でご利用いただけます。</p>
            </div>
            <div>
              <h4 class="mt-4" id="このPC">このPCで動く？</h4>
              <p>ブラウザ上での動作であるため、PCのスペックにあまり左右されずに動作します。</p>
            </div>
          </div>
          <div>
            <h3 class="mt-5" id="機能について">機能について</h3>
            <hr>
          </div>
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
  head() {
    return {
      title: "ヘルプページ",
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
#logo{
  width: 9em;
}
</style>
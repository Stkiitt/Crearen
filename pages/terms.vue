<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-warning bg-warning mb-3">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4"
        aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <NuxtLink class="navbar-brand" to="/"><img id="logo" src="../assets/logo/logo.png"></NuxtLink>
    </nav>

    <div class="container mt-5 mb-5">
        <h1>利用規約</h1>
        <hr>
        <p>この利用規約（以下，「本規約」といいます。）は、Crearen（以下、「当社」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って本サービスをご利用いただきます。</p>

        <h2>第一条(適用)</h2>
        <ol>
            <li>本規約は、ユーザーと当社との～～～～～～～</li>
            <li>当社は本サービスに関し、～～～～～～～～～</li>
            <li>本規約の規定が前条の個別規定～～～～～～～</li>
        </ol>

        <h2 class="mt-5">第二条(プライバシーポリシー)</h2>
        <ol>
            <li>当社は、本サービスの利用によって取得する個人情報については～～～～～</li>
            <li>君は誰</li>
        </ol>

    </div>

    <div class="text-center">
      <button type="button" class="btn btn-danger" onclick="window.close();">閉じる</button>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "利用規約",
      // script: [
      //   {
      //     src: "https://unpkg.com/swiper/swiper-bundle.min.js"
      //   },
      // ],
      // link: [
      //   {
      //     rel: "stylesheet",
      //     href: "https://unpkg.com/swiper/swiper-bundle.min.css"
      //   },
      // ],
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
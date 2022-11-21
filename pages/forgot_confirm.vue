<template>
  <div>
    <div class="text-center">
      <NuxtLink class="navbar-brand" to="/"><img id="logo" src="~/assets/logo/logo.png"></NuxtLink>
    </div>

    <div class="container mt-5">

      <div class="col-7 border mx-auto">
        <h3 class="text-center my-5">送信確認</h3>
        <div class="text-center">
          <p>example@xxx.jp</p>
          <p>上記のメールアドレスにパスワード再設定メールを送信しました。</p>
        </div>

        <div class="text-center">
          <button type="button" class="btn btn-danger mt-3 mb-3" onclick="window.close();">閉じる</button>
        </div>

      </div>

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
#logo {
  width: 9em;
}

#nextBtn {
  color: white;
}
</style>
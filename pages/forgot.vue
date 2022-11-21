<template>
  <div>
    <div class="text-center">
      <NuxtLink class="navbar-brand" to="/"> <img id="logo" src="~/assets/logo/logo.png"></NuxtLink>
    </div>

    <div class="container mt-5">

      <div class="col-7 border mx-auto">
        <h3 class="text-center">パスワード再設定</h3>
        <div class="text-center">
          <p>Crearenに登録したメールアドレスを入力してください。</p>
          <p>入力されたメールアドレスにパスワード再設定URLを送信します。</p>
        </div>

        <label for="email" class="ml-5">メールアドレス</label>
        <input type="email" class="form-control mx-auto col-10" id="email" placeholder="example@xxx.xx">

        <p></p>

        <p class="text-center"><a type="button" class="btn btn-success" id="nextBtn">送信</a></p>

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

#nextBtn{
  color: white;
}

</style>
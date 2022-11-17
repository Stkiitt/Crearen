<template>
  <div>
    <div>
      <div class="text-center">
        <NuxtLink class="navbar-brand" to="/"> <img id="logo" src="~/assets/logo/logo.png"></NuxtLink>
      </div>

      <div class="container mt-5">

        <div class="col-7 border mx-auto">
          <h3 class="text-center">登録内容の確認</h3>
          <p><label for="username" class="ml-5 mt-5">ユーザー名　　　：高田陸斗</label></p>

            <p><label for="email" class="ml-5">メールアドレス　：k021c2136798@com</label></p>

            <p><label for="exampleInputPassword1" class="ml-5 form-wrapper">パスワード　　　：********* </label></p>

            <p class="text-center mt-5"><a type="button" id="confirmBtn" class="btn btn-success col-4">登録する</a></p>
            <p class="text-center"><a type="button" class="btn btn-danger col-4" id="backBtn">入力画面へ戻る</a></p>

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
#logo{
  width: 9em;
}

#confirmBtn{
    color: white;
}

#backBtn{
    color: white;
}
</style>
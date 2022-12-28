<template>
  <div class="col-lg-4 order-lg-2 col-12 order-1">
    <div class="m-2 p-3 border">
      <h2 class="profile">プロフィール</h2>
      <div class="P-group row">
        <div id="Avatar" class="col-lg-12 col-6">
          <img src="../assets/Avatar/A_Sample.jpeg" alt="アバターを設定しませんか？">
        </div>
        <div class="col-lg-12 col-6">
          <p class="P-title">称号：</p>
          <p class="P-elements">ユーザー名：</p>
          <p class="P-elements">ログイン日数：</p>
          <p class="P-elements">累計タスク達成数：</p>
          <NuxtLink to="/achievement" target="_blank" rel="noopener noreferrer">
            <button type="button" class="btn btn-dark">ミッション進捗</button>
          </NuxtLink>
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
.P-title {
  font-size: small;
}

/* .P-group {
  
}

.P-elementgroup {

} */

#Avatar {
  text-align: center;
}

#Avatar img{
  width: 170px;
}
</style>
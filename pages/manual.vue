<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-warning bg-warning mb-3">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4"
        aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <NuxtLink class="navbar-brand" to="/"><img id="logo" src="~/assets/logo/logo.png"></NuxtLink>
    </nav>

    <div class="container mt-5 border manual-container">
      <div class="row">
        <div class="col-3 border">
          <h4 class="mt-3">目次</h4>
          <ul>
            <li><a href="#タスク管理画面の使い方">タスク管理画面の使い方</a></li>
            <ul>
              <li><a href="#タスク追加">タスク追加</a></li>
              <li><a href="#タスク編集">タスク編集</a></li>
              <li><a href="#タスク完了">タスク完了</a></li>
              <li><a href="#タスク履歴">タスク履歴</a></li>
              <li><a href="#タスク並び替え">タスク並び替え</a></li>
            </ul>
          </ul>
          <ul>
            <li><a href="#楽しみ方">楽しみ方</a></li>
            <ul>
              <li><a href="#アバター">アバター</a></li>
              <li><a href="#称号">称号</a></li>
            </ul>
          </ul>
        </div>

        <div class="col-9 border content-right">
          <h3 id="タスク管理画面の使い方" class="mt-3">タスク管理画面の使い方</h3>
          <hr>
          <div class="container">
            <div class="row">
              <img src="../assets/manual/manual_taskadmin.PNG" class="col-12">
            </div>
            <h5 id="タスク追加" class="manual-title">① タスク追加</h5>
            <div class="row">
              <img src="../assets/manual/manual_add.PNG" class="col-lg-5 col-9">
              <div class="col-lg-7 col-10">
                <p class="mt-4">「追加」ボタンを押すと追加ポップアップが開きます。</p>
                <p>内容を入力し「タスクを追加する」ボタンを押すとタスクを追加することができます。</p>
                <div class="mt-4 ml-4">
                  <p>タスク名　：タスクの見出しを入力</p>
                  <p>メ　モ　　：タスクの詳細内容を入力</p>
                  <p>優先度　　：高・中・低から選択</p>
                  <p>期　限　　：📅から期限を選択</p>
                </div>
              </div>
            </div>
            <h5 id="タスク編集" class="manual-title">② タスク編集</h5>
            <div class="row">
              <img src="../assets/manual/manual_edit.PNG" class="col-lg-5 col-9">
              <div class="col-lg-7 col-10">
                <p class="mt-4">タスクの枠を押すと編集ポップアップが開きます。</p>
                <p>内容を編集し「編集を保存する」ボタンを押すとタスクの編集を保存できます。「削除」ボタンを押すとタスクを削除できます。</p>
                <div class="mt-4 ml-4">
                  <p>タスク名　：タスクの見出しを入力</p>
                  <p>メ　モ　　：タスクの詳細内容を入力</p>
                  <p>優先度　　：高・中・低から選択</p>
                  <p>期　限　　：📅から期限を選択</p>
                </div>
              </div>
            </div>
            <h5 id="タスク完了" class="manual-title">③ タスク完了</h5>
            <div class="row">
              <img src="../assets/manual/manual_comp.PNG" class="col-lg-5 col-9">
              <div class="col-lg-7 col-10">
                <p class="mt-4">チェックマークを押すと完了ポップアップが開きます。</p>
                <p>「はい」ボタンを押すとタスクを完了します。「いいえ」ボタンを押すとタスクを完了せずに元の画面に戻ります。</p>
              </div>
            </div>
            <h5 id="タスク履歴" class="manual-title">④ タスク履歴</h5>
            <div class="row">
              <img src="../assets/manual/manual_history.PNG" class="col-lg-5 col-9">
              <div class="col-lg-7 col-10">
                <p class="mt-4">「タスク履歴」ボタンを押すとタスク履歴ポップアップが開きます。</p>
                <p>これまでに完了した最新20件までの履歴を表示します。</p>
              </div>
            </div>
            <h5 id="タスク並び替え" class="manual-title">⑤ タスク並び替え</h5>
            <div class="row">
              <img src="../assets/manual/manual_sort.PNG" class="col-lg-5 col-9">
              <div class="col-lg-7 col-10">
                <p class="mt-4">「新しい順」の部分を押すと並び替えの選択肢が表示されます。</p>
                <p>並び替えたい種類を選択するとタスクの表示順序が変更されます。</p>
                <div class="mt-4 ml-4">
                  <p>新しい順　　　：新しく作成したタスクを上に表示</p>
                  <p>古い順　　　　：古いタスクを上に表示</p>
                  <p>優先度順　　　：優先度が高いタスクを上に表示</p>
                  <p>期限が近い順　：期限が近いタスクを上に表示</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="楽しみ方" class="mt-5">楽しみ方</h3>
          <hr>
          <div class="container">
            <h5 id="アバター" class="manual-title">・アバター</h5>
            <div class="row">
              <img src="../assets/manual/manual_avatar.PNG" class="col-lg-5 col-9">
              <div class="col-lg-7 col-10">
                <p class="mt-4">プロフィールの「プロフィール編集」ボタンを押して「アバター画像」タブを選択するとアバター画像選択ポップアップが開きます。</p>
                <p>アバターを選択して「保存する」ボタンを押すと変更を保存します。</p>
              </div>
            </div>
            <h5 id="称号" class="manual-title">・称号</h5>
            <div class="row">
              <img src="../assets/manual/manual_degree.PNG" class="col-lg-5 col-9">
              <div class="col-lg-7 col-10">
                <p class="mt-4">プロフィールの「プロフィール編集」ボタンを押して「称号・名称」タブを選択すると称号選択ポップアップが開きます。</p>
                <p>称号を選択して「保存する」ボタンを押すと変更を保存します。</p>
              </div>
            </div>
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
      title: "使い方",
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

.content-right {
  padding-bottom: 50px;
}

.manual-title {
  margin: 40px 0 20px;
}

.manual-container {
  min-width: 720px;
}
</style>
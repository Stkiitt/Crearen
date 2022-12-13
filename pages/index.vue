<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-warning bg-warning mb-3">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4"
        aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <NuxtLink class="navbar-brand" to="/"><img id="logo" src="~/assets/logo/logo.png"></NuxtLink>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item">
            <NuxtLink to="/manual" target="_blank" rel="noopener noreferrer"><button type="button"
                class="btn btn-dark">使い方</button></NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
    <NuxtLink to="index.vue"></NuxtLink>

    <div class="wrap">

      <!-- メインのスライダー -->
      <div class="swiper slider">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img style="width: 100%;" src="../assets/top/犬.jpg" alt="" />
          </div>
          <div class="swiper-slide">
            <img style="width: 100%;" src="../assets/top/猫.jpg" alt="" />
          </div>
          <div class="swiper-slide">
            <img style="width: 100%;" src="../assets/top/豚.png" alt="" />
          </div>
          <div class="swiper-slide">
            <img style="width: 100%;" src="../assets/top/猫.jpg" alt="" />
          </div>
          <div class="swiper-slide">
            <img style="width: 100%;" src="../assets/top/犬.jpg" alt="" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <!-- 前後の矢印 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>

    <div class="container mt-5">
      <div class="row">
        <!-- お知らせ -->
        <div class="col-7">
          <div class="m-2 p-3 border" id="information">
            <h2 class="my-4">お知らせ</h2>
          </div>
        </div>
        <!-- ログインしていないとき -->
        <div v-if="!loggedIn" class="col-5">
          <div class="m-2 p-3 border" id="login">
            <h2 class="my-4">ログイン</h2>
            <label>メールアドレス</label>
            <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email"
              v-model="email">
            <label>パスワード</label>
            <input type="password" class="form-control" placeholder="PassWord" v-model="password">
            <button @click="login()" class="btn btn-primary mt-3">ログイン</button>
            <NuxtLink to="/forgot" target="_blank">
              <p class="mt-3">パスワードを忘れた</p>
            </NuxtLink>
            <p>
              <NuxtLink to="/signup" target="_blank" rel="noopener noreferrer">新規登録</NuxtLink>
            </p>
          </div>
        </div>
        <!-- ログイン済み -->
        <div v-if="loggedIn" class="col-5 text-center">
          <div class="m-2 p-3 border" id="loggedin">
            <div>
              <h2 class="my-4">ログイン済みです</h2>
              <p>
                <NuxtLink to="/taskadmin" class="btn btn-success w-75" rel="noopener noreferrer">タスク管理画面へ</NuxtLink>
              </p>
              <button @click="logout()" type="button" class="btn btn-dark w-75" >ログアウト</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="text-center text-lg-start bg-light text-muted mt-4">


      <!-- Section: Links  -->
      <section class="border-top">
        <div class="container mt-5">
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-3 mx-auto mb-4">
              <!-- Content -->
              <h6 class="fw-bold mb-4">
                <a href="#">お問い合わせ</a>
              </h6>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-3 mx-auto mb-4">
              <!-- Links -->
              <h6 class="fw-bold mb-4">
                <NuxtLink to="/terms" target="_blank" rel="noopener noreferrer">利用規約・プライバシーポリシー</NuxtLink>
              </h6>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-3 mx-auto mb-4">
              <!-- Links -->
              <h6 class="fw-bold mb-4">
                <NuxtLink to="/help" target="_blank" rel="noopener noreferrer">ヘルプ</NuxtLink>
              </h6>
            </div>
            <!-- Grid column -->

          </div>
          <!-- Grid row -->
        </div>
      </section>
      <!-- Section: Links  -->

      <!-- Copyright -->
      <div id="copyright" class="text-center p-4">
        © 2022 Copyright:
        <a class="text-reset fw-bold" href="#">卒業制作を頑張る会</a>
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->

  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  head() {
    return {
      title: "トップページ",
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
      email: "",
      password: "",
      loggedIn: false,
    }
  },
  mounted() {
    // 画像スライドの設定
    const swiper = new Swiper(".swiper", {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 1000,
      spaceBetween: 20,
      loop: true,
      // ページネーション
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      // 前後の矢印
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });;
    this.checkLogin();
  },
  methods: {
    // ログインの確認
    checkLogin() {
      const auth = getAuth(this.$app);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.loggedIn = true;
        }
      });
    },
    // ログイン機能
    login() {
      const auth = getAuth(this.$app);
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // ログイン
          location.href = 'http://localhost:3000/taskadmin';
        })
        .catch((error) => {
          // ログイン失敗
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode + "," + errorMessage);
        });
    },
    logout() {
      const auth = getAuth(this.$app);
      signOut(auth)
        .then(() => {
          location.href = 'http://localhost:3000';
        }).catch((error) => {
          console.log(error);
        });
    },
  }
}
</script>

<style>
#logo {
  width: 9em;
}

#image {
  text-align: center;
  width: 100%;
}

#information {
  height: 25em;
  box-shadow: 0px 0px 5px black;
  border-radius: 10px;
}

#login {
  height: 25em;
  box-shadow: 0px 0px 5px black;
  border-radius: 10px;
}

#loggedin {
  height: 25em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 5px black;
  border-radius: 10px;
}

#copyright {
  background-color: rgba(0, 0, 0, 0.05);
}

.wrap {
  max-width: 1200px;
  margin: 0 auto;
}

.swiper-slide img {
  height: auto;
  width: 100%;
}

/* ページネーションのサイズと色 */
.swiper-pagination-bullet {
  background-color: orange;
  height: 10px;
  width: 10px;
}

.swiper-button-next {
  color: orange;
}

.swiper-button-prev {
  color: orange;
}
</style>
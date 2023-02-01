<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-warning bg-warning mb-3">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4"
        aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <NuxtLink class="navbar-brand" to="/"><img id="logo" src="../assets/logo/logo.png"></NuxtLink>
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
            <img style="width: 100%;" src="../assets/top/service_start.png" alt="" />
          </div>
          <div class="swiper-slide">
            <img style="width: 100%;" src="../assets/top/kantantask.jpg" alt="" />
          </div>
          <div class="swiper-slide">
            <img style="width: 100%;" src="../assets/top/profile.jpg" alt="" />
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
            <h2 class="my-4" id="informationTitle">Information</h2>

            <!-- 繰り返しここから -->
            <section v-for="info in infos" :key="info.tid">
              <dl>
                <div>
                  <dt>{{ info.date }}</dt>
                  <dd class="info1" @click="openInfoPopup(info.title, info.date, info.content)">{{ info.title }}</dd>
                </div>
              </dl>
              <!-- お知らせポップアップここから -->
              <section id="infoPopup" class="modalArea">
                <div @click="closeInfoPopup()" class="modalBg"></div>
                <div class="modalWrapperInfo">
                  <div>
                    <h3>{{ date }}</h3>
                    <h1>{{ title }}</h1>
                    <p>{{ content }}</p>
                  </div>
                  <div @click="closeInfoPopup()" class="closeModal">
                    ☓
                  </div>
                </div>
              </section>
              <!-- お知らせポップアップここまで -->
            </section>
            <!-- 繰り返しここまで -->
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
              <h2 class="my-4">{{ username }} さん<br>ログイン済みです</h2>
              <p>
                <NuxtLink to="/taskadmin" class="btn btn-success w-75" rel="noopener noreferrer">タスク管理画面へ</NuxtLink>
              </p>
              <button @click="logout()" type="button" class="btn btn-dark w-75">ログアウト</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterCopyright />

  </div>
</template>

<script>
import FooterCopyright from "../components/FooterCopyright.vue";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, getDocs, collection, query, getFirestore } from "firebase/firestore";
export default {
  components: {
    FooterCopyright,
  },
  head() {
    return {
      title: "トップページ",
      script: [
        {
          type: "text/javascript",
          src: "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"
        },
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
      username: "ーーー",
      email: "",
      password: "",
      loggedIn: false,
      date: "",
      title: "",
      content: "",
      infos: [],
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
    this.getInfo();
  },
  methods: {
    // ログインの確認
    checkLogin() {
      const auth = getAuth(this.$app);
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.loggedIn = true;
          const db = getFirestore(this.$app);
          const docSnap = await getDoc(doc(db, "user", user.uid));
          let ad;
          if (docSnap.exists()) ad = docSnap.data();
          this.username = ad.user_name;
        }
      });
    },
    // ログイン機能
    login() {
      const auth = getAuth(this.$app);
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // ログイン
          this.$router.push('/taskadmin');
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
          this.$router.push('/');
          location.reload();
        }).catch((error) => {
          console.log(error);
        });
    },
    //informationからデータの取得
    async getInfo() {
      const db = getFirestore(this.$app);
      const q = query(collection(db, "information"));
      const querySnapshot = await getDocs(q);
      this.infos = [];
      querySnapshot.forEach((doc) => {
        const info = doc.data();
        info["tid"] = doc.id;
        this.infos.push(info);
        this.infos.sort((a, b) => {
          const ac = Number(a.date.replace(/\u002f/g, ''));
          const bc = Number(b.date.replace(/\u002f/g, ''));
          return bc - ac;
        })
      });
    },
    // お知らせポップアップを開く
    openInfoPopup(title, date, content) {
      this.title = title;
      this.date = date;
      this.content = content;
      $('#infoPopup').fadeIn();
    },
    // お知らせポップアップを閉じる
    closeInfoPopup() {
      $('#infoPopup').fadeOut();
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
  /*スクロールの高さ*/
  overflow-y: scroll;
}

#informationTitle {
  border-bottom: dotted;
}

.info1 {
  cursor: pointer;
}

.info1:link {
  color: blue;
}

#login {
  height: 25em;
  box-shadow: 0px 0px 5px black;
}

#loggedin {
  height: 25em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 5px black;
}

.wrap {
  max-width: 1200px;
  margin: 0 auto;
}

.swiper-slide img {
  height: auto;
  width: 100%;
}

.modalWrapperInfo div h1 {
  border-bottom: solid;
}

.modalWrapperInfo div p {
  margin-top: 1em;
  font-size: large;
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

/* モーダルCSS */
.modalArea {
  display: none;
  position: fixed;
  z-index: 10;
  /*サイトによってここの数値は調整 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modalBg {
  width: 100%;
  height: 100%;
  background-color: rgba(30, 30, 30, 0.9);
}

.modalWrapperInfo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 40%;
  max-width: 700px;
  min-width: 200px;
  padding: 10px 30px;
  background-color: #fff;
}
</style>
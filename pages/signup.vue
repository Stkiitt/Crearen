<template>
  <div>
    <div class="text-center">
      <NuxtLink class="navbar-brand" to="/"><img id="logo" src="~/assets/logo/logo.png"></NuxtLink>
    </div>

    <div class="container mt-5">

      <div class="col-7 border mx-auto">
        <h3 class="text-center">アカウントの作成</h3>
        <label class="ml-5">ユーザー名</label>
        <input type="text" class="form-control mx-auto col-10" v-model="username">
        <p class="err">{{ errName }}</p>

        <label class="ml-5">メールアドレス</label>
        <input type="email" class="form-control mx-auto col-10" v-model="email">
        <p class="err">{{ errEmail }}</p>

        <label class="ml-5">パスワード (英数6文字以上)</label>
        <input type="password" class="form-control mx-auto col-10" v-model="password">
        <p class="err">{{ errPasswordVaridity }}</p>

        <label class="ml-5">パスワード再確認</label>
        <input type="password" class="form-control mx-auto col-10" v-model="passwordcheck">
        <p class="err">{{ errPasswordMatch }}</p>

        <p class="mt-2 text-center">
          <NuxtLink to="/terms" target="_blank">利用規約</NuxtLink>に同意しました。<input type="checkbox" id="termsCheckbox">
        </p>
        <p class="errCheckbox text-center">{{ errCheckbox }}</p>

        <p class="text-center"><button @click="checkData()" class="btn btn-success" id="confirmBtn">確認画面へ進む</button>
        </p>

      </div>

    </div>

    <!--確認ポップアップ内容ここから-->
    <section id="confirmPopup" class="modalArea">
      <div @click="closeConfirmPopup()" class="modalBg"></div>
      <div class="modalWrapper">
        <div class="confirmContents">
          <div class="container mt-5">
            <div class="border mx-auto">
              <h3 class="text-center">登録内容の確認</h3>
              <p><label class="ml-5 mt-5">ユーザー名　　　：{{ username }}</label></p>
              <p><label class="ml-5">メールアドレス　：{{ email }}</label></p>
              <p><label class="ml-5 form-wrapper">パスワード　　　：{{ password }}</label></p>
              <p class="text-center mt-5"><button @click="signup()" id="confirmBtn"
                  class="btn btn-success col-4">この内容で登録する</button></p>
              <p class="text-center"><button @click="closeConfirmPopup()" class="btn btn-danger col-4"
                  id="backBtn">修正する</button></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--確認ポップアップここまで-->
  </div>
</template>

<script>
import { getFirestore, doc, setDoc } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  head() {
    return {
      title: "新規登録",
      script: [
        {
          type: "text/javascript",
          src: "//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"
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
      username: "",
      email: "",
      password: "",
      passwordcheck: "",
      errName: "",
      errEmail: "",
      errPasswordVaridity: "",
      errPasswordMatch: "",
      errCheckbox: "",
    }
  },
  methods: {
    // 入力データのチェック
    checkData() {
      const checkName = this.username != "";
      const checkEmail = this.email != "";
      const checkPasswordValidity = this.password.match(/^([a-zA-Z0-9]{6,})$/);
      const checkPasswordMatch = this.password == this.passwordcheck;
      const checkCheckbox = document.getElementById('termsCheckbox').checked;
      if (!checkName) {
        this.errName = "※ 名前を入力してください";
      } else {
        this.errName = "";
      };
      if (!checkEmail) {
        this.errEmail = "※ メールアドレスを入力してください";
      } else {
        this.errEmail = "";
      };
      if (!checkPasswordValidity) {
        this.errPasswordVaridity = "※ 英数6字以上で入力してください";
      } else {
        this.errPasswordVaridity = "";
      };
      if (!checkPasswordMatch) {
        this.errPasswordMatch = "※ パスワードが一致していません";
      } else {
        this.errPasswordMatch = "";
      };
      if (!checkCheckbox) {
        this.errCheckbox = "※ 利用規約に同意してください";
      } else {
        this.errCheckbox = "";
      };
      if (checkPasswordValidity && checkPasswordMatch && checkName && checkEmail && checkCheckbox) {
        this.openConfirmPopup();
      };
    },
    // 新規登録
    signup() {
      const auth = getAuth(this.$app);
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.registerUserData(user.uid);
          location.href = 'http://localhost:3000/taskadmin';
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode + "," + errorMessage);
        });
    },
    // ユーザ情報の登録
    async registerUserData(uid) {
      const db = getFirestore(this.$app);
      await setDoc(doc(db, "user", uid), {
        user_name: this.username,
      });
    },
    // 確認ポップアップを開く
    openConfirmPopup() {
      $('#confirmPopup').fadeIn();
    },
    // 確認ポップアップを閉じる
    closeConfirmPopup() {
      $('#confirmPopup').fadeOut();
    },
  }
}
</script>

<style>
#logo {
  width: 9em;
}

#confirmBtn {
  color: white;
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

.modalWrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 700px;
  padding: 10px 30px;
  background-color: #fff;
}

.closeModal {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  cursor: pointer;
}

/* エラーメッセージ */
.err {
  margin-left: 4em;
  color: red;
  font-size: small;
}

.errCheckbox {
  color: red;
  font-size: small;
}

/* 確認ポップアップ内 */
.confirmContents {
  padding: 2em;
}

#confirmBtn {
  color: white;
}

#backBtn {
  color: white;
}

/* 以下ボタンスタイル */
button {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #282828;
  border-radius: 2px;
  cursor: pointer;
}
</style>
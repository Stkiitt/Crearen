<template>
    <div>
      <button @click="openProfileEditPopup()" class="">プロフィール編集</button>
      <!-- プロフィール編集ポップアップここから -->
      <section id="profileEdit" class="modalArea">
        <div @click="closeProfileEditPopup()" class="modalBg"></div>
        <div class="modalWrapper">
        </div>
      </section>
      <!-- プロフィール編集ポップアップここまで -->
    </div>
  </template>
  
  <script>
  import { getDocs, collection, query, where, getFirestore } from "firebase/firestore";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  export default {
    data () {
      return {
        uid: "",
        comptasks: [],
      }
    },
    mounted() {
      this.checkLogin();
    },
    methods: {
      // ログインの確認
      checkLogin() {
        const auth = getAuth(this.$app);
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.uid = user.uid;
          }
        });
      },
      // プロフィール編集ポップアップを開く
      openProfileEditPopup() {
        this.getCompleteTasks();
        $('profileEdit').fadeIn();
      },
      // プロフィール編集ポップアップを閉じる
      closeProfileEditPopup() {
        $('#profileEdit').fadeOut();
      },
    }
  }
  </script>
  
  <style>
  .button-history {
    margin-left: 30px;
    padding: 0 20px;
    height: 2.5em;
    border-radius: 3em;
    background-color: #ffdd44;
    border: none;
    box-shadow: 1px 2px 1px #777777;
  }
  
  /* プロフィール編集ポップアップ内 */
  
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
    width: 70%;
    max-width: 500px;
    padding: 10px 30px;
    background-color: #fff;
  }
  
  .closeModal {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    cursor: pointer;
  }
  </style>
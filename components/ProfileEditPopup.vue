<template>
  <div>
    <button @click="openProfileEditPopup()" class="">プロフィール編集</button>
    <!-- プロフィール編集ポップアップここから -->
    <section id="profileEdit" class="modalArea">
      <div @click="closeProfileEditPopup()" class="modalBg"></div>
      <div class="modalWrapper_pe">
        <!-- タブ要素ここから -->

        <div id="tab">
          <input type="radio" name="tab_name" id="tab1" value="0" v-model="profileTab" checked>
          <label class="tab_class" for="tab1">アバター画像</label>
          <div class="content_class1">
            <div>
              <img :src="avatar_selected_url" class="avatar_selected">
              <div class="avatar_img_box">
                <img v-for="(avatar, index) in avatars" :key="avatar.img_name" :src="avatar.url"
                  @click="setSelectedAvatar(index, avatar.url)" :class="changeAvatarOpacity(avatar.get)">
              </div>
            </div>
            <button @click="saveEdit()" class="btn btn-warning save_prof">保存する</button>
          </div>
          <input type="radio" name="tab_name" id="tab2" value="1" v-model="profileTab">
          <label class="tab_class" for="tab2">称号・名前</label>
          <div class="content_class2">
            <h3 class="username">ユーザー名</h3>
            <input type="text" v-model="username" class="editName">
            <h3 class="degreeTitle">称号</h3>
            <p class="degree_selected">
              <span @click="changeEdit(0)" :id="changeDegreeFlame(0)" class="degree">{{ degree_selected_first }}</span>
              <span @click="changeEdit(1)" :id="changeDegreeFlame(1)" class="degree">{{ degree_selected_second }}</span>
              <span @click="changeEdit(2)" :id="changeDegreeFlame(2)" class="degree">{{ degree_selected_third }}</span>
            </p>
            <div v-if="(editDegree == 0) || (editDegree == 2)" class="degreeOptionsBox">
              <span v-for="degree in degrees" :key="degree.id" @click="changeDegree(degree)" class="degreeOption">{{
                degree
              }}</span>
            </div>
            <div v-if="editDegree == 1" class="degreeOptionsBox">
              <span v-for="ppp in ppps" :key="ppp.id" @click="changeDegree(ppp)" class="degreeOption">{{ ppp }}</span>
            </div>
            <button @click="saveEdit()" class="btn btn-warning save_prof">保存する</button>
          </div>
        </div>
        <div @click="closeProfileEditPopup()" class="closeModal">
          ☓
        </div>
      </div>
    </section>
    <!-- プロフィール編集ポップアップここまで -->
  </div>
</template>

<script>
import { getDocs, updateDoc, getDoc, doc, collection, query, where, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  computed: {
    avatarUrlChild: {
      get() { return ""; },
      set(newVal) { this.$emit("changeAvatarUrl", newVal); }
    },
    degreeFirstChild: {
      get() { return ""; },
      set(newVal) { this.$emit("changeDegreeFirst", newVal); }
    },
    degreeSecondChild: {
      get() { return ""; },
      set(newVal) { this.$emit("changeDegreeSecond", newVal); }
    },
    degreeThirdChild: {
      get() { return ""; },
      set(newVal) { this.$emit("changeDegreeThird", newVal); }
    },
    userNameChild: {
      get() { return ""; },
      set(newVal) { this.$emit("changeUserName", newVal); }
    },
  },
  data() {
    return {
      uid: "",
      profileTab: "0",
      username: "",
      avatar_selected_name: "",
      avatar_selected_url: "",
      degree_selected_first: "",
      degree_selected_second: "",
      degree_selected_third: "",
      editDegree: 0,
      // 初期で使用できるものはget:trueにしておく
      avatars: {
        A_Sample: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2FA_Sample.jpeg?alt=media&token=c5be4652-87ed-4dba-bf19-5b028597627c", get: true },
        character_boy_normal: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fcharacter_boy_normal.png?alt=media&token=1489efa5-2bb7-4574-bed0-8f78b3fb06e0", get: true },
        character_girl_normal: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fcharacter_girl_normal.png?alt=media&token=6d7da292-0197-4011-abd1-bd783976ec14", get: true },
        kugakusei: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fkugakusei.png?alt=media&token=0e2e56c8-e6c8-4f90-8877-b4d46b011f90", get: false },
        busy_man: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fbusy_man.png?alt=media&token=b56ce7c3-b1d3-4ddd-b17f-721fab83514a", get: false },
        // 5
        syoninkyu_man: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fsyoninkyu_man.png?alt=media&token=7d79658b-15a7-47a5-8076-863bb588d6fd", get: false },
        mahoutsukai_water: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_water.png?alt=media&token=87bbf268-4e17-43b4-853e-56460d71f4e8", get: false },
        mahoutsukai_wind: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_wind.png?alt=media&token=a2b15328-1fcc-4f68-b3f5-093dd54f9d30", get: false },
        mahoutsukai_white_man: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_white_man.png?alt=media&token=c05f4423-b8f3-40f9-acac-734ddce617c2", get: false },
        mahoutsukai_white_woman: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_white_woman.png?alt=media&token=e69754c9-9c3a-438b-a860-1c76f1cd50ca", get: false },
        // 10
        ningyohime: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fningyohime.png?alt=media&token=55854fab-f82b-4aed-a8c2-6408470e7ae1", get: false },
        fantasy_ryuukishi: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_ryuukishi.png?alt=media&token=e92a51b6-996c-401a-b57f-e679d9b130aa", get: false },
        character_hakase: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fcharacter_hakase.png?alt=media&token=40934ff0-e301-4f36-b367-3d7570751909", get: false },
        fantasy_dark_elf: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_dark_elf.png?alt=media&token=4e71a2fd-d6bf-400b-aa10-a2d6f35829f6", get: false },
        yuusya_game: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fyuusya_game.png?alt=media&token=277d5765-c0e3-4f0a-9705-ced7674886ef", get: false },
        // 15
        mahoutsukai_fire: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_fire.png?alt=media&token=d3d53645-22ec-41e2-835e-b3eaa4ae7c5f", get: false },
        fantasy_dracula2: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_dracula2.png?alt=media&token=d9a31b7f-1289-4b21-99e3-a57820d2338b", get: false },
        ninja_shinobiashi: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fninja_shinobiashi.png?alt=media&token=38cfff31-a8ae-41de-95c3-3af9ed06dabf", get: false },
        tantei_boy: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ftantei_boy.png?alt=media&token=d325b36c-5b04-4f5e-9012-1a244c244aaa", get: false },
        tantei_girl: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ftantei_girl.png?alt=media&token=eff1c720-0386-4022-9c91-ac0eec912c3f", get: false },
        // 20
        kintarou: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fkintarou.png?alt=media&token=35f62015-fd49-41c0-a3de-51a7b3ab8f7a", get: false },
        fantasy_elf2: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_elf2.png?alt=media&token=03ff11d9-cffe-4ceb-82be-0a2325ed4fc8", get: false },
        knight: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fknight.png?alt=media&token=df9d5c66-2c96-47f3-932a-57cc2935f625", get: false },
        mahoutsukai_necromancer: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_necromancer.png?alt=media&token=297a1ca0-43d2-4dd6-8848-1579f38176a3", get: false },
        fantasy_maou_devil: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_maou_devil.png?alt=media&token=10949bfe-1a3a-4ba2-ac46-8ef199b3bed1", get: false },
        // 25
        chibikko_gang: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fchibikko_gang.png?alt=media&token=279bdff1-cc8d-4760-b4ea-467bbb9dcbdb", get: false },
        alien_grey: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Falien_grey.png?alt=media&token=a99b2c1d-e3d5-464c-8049-19b4e2db5f5e", get: false },
        mahoutsukai_thunder: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_thunder.png?alt=media&token=229e35e6-11bd-48b3-b3f6-c4f92884fb33", get: false },
        royal_king_gyokuza: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Froyal_king_gyokuza.png?alt=media&token=84249442-6a75-4e8c-a861-056356571449", get: false },
        royal_queen_gyokuza: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Froyal_queen_gyokuza.png?alt=media&token=a16971be-3c3c-4976-a653-7d4e6bff0c65", get: false },
        // 30
        kamisama: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fkamisama.png?alt=media&token=e06c1453-c61d-4ddb-8407-9e59b5b9cce1", get: false },
        tabibito: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ftabibito.png?alt=media&token=34c7dc55-a00d-46e9-8a0e-81410d3e7a8d", get: false },
        monogatari_robinhood: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmonogatari_robinhood.png?alt=media&token=e8ac2e5f-fb3c-4795-819a-95fedb5edf5e", get: false },
        saiyuki_songoku_kintoun: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fsaiyuki_songoku_kintoun.png?alt=media&token=b2ef0b1c-8590-472e-b4cd-b528b4cd1e77", get: false },
        fantasy_dragon: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_dragon.png?alt=media&token=b073af30-42a6-44dd-a101-de7240bcc29f", get: false },
        // 35
        unchi_character: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Funchi_character.png?alt=media&token=0f215469-413e-44c3-9edd-d5381f558fef", get: false },
        futon_derenai_woman: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffuton_derenai_woman.png?alt=media&token=3e6c60fa-9127-45e1-9e4d-caa9355395f4", get: false },
        school_joshikousei_kogyaru_90s: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fschool_joshikousei_kogyaru_90s.png?alt=media&token=ae4d694c-0d41-45a5-aeb3-57b568443aa8"},
        hero_man: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fhero_man.png?alt=media&token=3e5d1716-f2b7-4f97-8953-978d30404dc4", get: false },
        tokusatsu_kyodai_hero: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ftokusatsu_kyodai_hero.png?alt=media&token=bca1179a-3912-4ad0-8369-2f2e5c2db124", get: false },
        // 40
        fantasy_zombie_man: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_zombie_man.png?alt=media&token=903de37a-d62d-468a-a31a-b6b511e9fb09", get: false },
        character_shimekiri: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fcharacter_shimekiri.png?alt=media&token=84d491a2-2b5c-4921-8f85-291f169b1728", get: false },
        businessman_cry_man: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fbusinessman_cry_man.png?alt=media&token=9092c1ae-0e64-4422-9730-69b708eb5c26", get: false },
        speed_slow_turtle: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fspeed_slow_turtle.png?alt=media&token=6b71ded6-68bf-484a-9390-2a61cab52afb", get: false },
        shinigami: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fshinigami.png?alt=media&token=b2ef0b1c-8590-472e-b4cd-b528b4cd1e77", get: false },
        // 45
        fantasy_berserker: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_berserker.png?alt=media&token=a5fc0a00-326f-4564-9c90-2e47ce98676a", get: false },
      },
      // 初期で使用できるものを入れておく
      degrees: [
        "はじめて",
        "タスク",
      ],
      ppps: [
        "(なし)", "の", "が", "で", "を",
        "と", "に", "な", "は", "も",
        "なる", "での", "から", "からの", "的な",
        "兼", "限定", "in", "of", "=",
        "★", "♥"
      ]
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
          this.getSelected();
          this.getUserAvatarDegree();
          this.getUserName();
        }
      });
    },
    // プロフィール編集ポップアップを開く
    openProfileEditPopup() {
      this.getUserAvatarDegree();
      $('#profileEdit').fadeIn();
    },
    // プロフィール編集ポップアップを閉じる
    closeProfileEditPopup() {
      $('#profileEdit').fadeOut();
    },
    // 選択しているアバターと称号の取得
    async getSelected() {
      const db = getFirestore(this.$app);
      const q = query(collection(db, "user", this.uid, "Selected"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        if (doc.id == "avatar") {
          this.avatar_selected_name = doc.data().img_name;
          this.avatar_selected_url = this.avatars[this.avatar_selected_name]["url"];
        } else if (doc.id == "degree") {
          let secondDegree = doc.data().second;
          if (secondDegree == "") {
            secondDegree = "(なし)";
          }
          this.degree_selected_first = doc.data().first;
          this.degree_selected_second = secondDegree;
          this.degree_selected_third = doc.data().third;
        }
      });
    },
    // 個人の取得したアバターと称号の取得
    async getUserAvatarDegree() {
      const db = getFirestore(this.$app);
      const q_a = query(collection(db, "user", this.uid, "Avatar"));
      const querySnapshot_a = await getDocs(q_a);
      querySnapshot_a.forEach(async (doc) => {
        this.$set(this.avatars[doc.data().img_name], "get", true);
      });
      const q_d = query(collection(db, "user", this.uid, "Degree"));
      const querySnapshot_d = await getDocs(q_d);
      querySnapshot_d.forEach(async (doc) => {
        this.degrees.push(doc.data().name);
      });
    },
    // ユーザ名の取得
    async getUserName() {
      const db = getFirestore(this.$app);
      let ud;
      const docSnap = await getDoc(doc(db, "user", this.uid));
      if (docSnap.exists()) ud = docSnap.data();
      this.username = ud.user_name;
    },
    // 画像をクリックしたときに上の画像を変える
    setSelectedAvatar(img_name, url) {
      this.avatar_selected_name = img_name;
      this.avatar_selected_url = url;
    },
    // 保存ボタン
    async saveEdit() {
      if (this.avatars[this.avatar_selected_name]["get"]) {
        const db = getFirestore(this.$app);
        let secondDegree = this.degree_selected_second;
        if (secondDegree == "(なし)") {
          secondDegree = "";
        }
        await updateDoc(doc(db, "user", this.uid, "Selected", "avatar"), {
          img_name: this.avatar_selected_name,
        });
        await updateDoc(doc(db, "user", this.uid, "Selected", "degree"), {
          first: this.degree_selected_first,
          second: secondDegree,
          third: this.degree_selected_third,
        });
        await updateDoc(doc(db, "user", this.uid), {
          user_name: this.username,
        });
        this.avatarUrlChild = this.avatar_selected_url;
        this.degreeFirstChild = this.degree_selected_first;
        this.degreeSecondChild = secondDegree;
        this.degreeThirdChild = this.degree_selected_third;
        this.userNameChild = this.username;
        alert("保存しました");
      } else {
        alert("そのアバターは所持していません");
      }
    },
    // アバター画像の濃さ
    changeAvatarOpacity(get) {
      if (get) {
        return "avatar_get";
      } else {
        return "avatar_not_get";
      }
    },
    // 選択中の変更する称号の枠
    changeDegreeFlame(editDegree) {
      if(this.editDegree == editDegree) {
        return "degree_flame";
      } else {
        return "";
      }
    },
    // 称号の変更箇所の切替
    changeEdit(num) {
      this.editDegree = num;
    },
    // クリックした称号に変更する
    changeDegree(degree) {
      if (this.editDegree == 0) {
        this.degree_selected_first = degree;
      } else if (this.editDegree == 1) {
        this.degree_selected_second = degree;
      } else if (this.editDegree == 2) {
        this.degree_selected_third = degree;
      }
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

.modalWrapper_pe {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  min-width: 720px;
  max-height: 1000px;
  padding: 10px 30px;
  background-color: #fff;
}

.closeModal {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  cursor: pointer;
}

/* タブ要素 */
#tab {
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}

.tab_class {
  width: 200px;
  height: 50px;
  background-color: darkgrey;
  line-height: 50px;
  font-size: 15px;
  text-align: center;
  display: block;
  float: left;
  order: -1;
}

input[name="tab_name"] {
  display: none;
}

input:checked+.tab_class {
  background-color: cadetblue;
  color: aliceblue;
}

.content_class1 {
  display: none;
  width: 100%;
  height: 600px;
  text-align: center;
}

.content_class2 {
  display: none;
  width: 100%;
  height: 600px;
}

input:checked+.tab_class+.content_class1 {
  display: block;
}

input:checked+.tab_class+.content_class2 {
  display: block;
}

.degree {
  font-size: 1.5em;
  margin: 5px;
  border-bottom: 2px solid black;
  padding: 10px 20px;
}

#degree_flame {
  border-bottom: 5px solid cadetblue;
}

.username,
.editName {
  margin-left: 10%;
}

.editName {
  width: 80%;
}

.degreeTitle {
  margin-left: 10%;
  margin-top: 1em;
}

/*  */
.degree_selected {
  display: block;
  margin: 20px auto 10px;
  width: fit-content;
}

.avatar_selected {
  display: block;
  margin: 20px auto 10px;
  height: 180px;
  width: 180px;
}

.avatar_img_box {
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  max-height: 250px;
  width: 80%;
  margin: 0 auto;
}

.avatar_get,
.avatar_not_get {
  margin: 4px;
  height: 70px;
  width: 70px;
}

.avatar_not_get {
  opacity: 0.2;
}

/*  */
.degreeOptionsBox {
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  max-height: 250px;
  width: 90%;
  margin: 40px auto 0;
}

.degreeOption {
  margin-top: 1em;
  width: 25%;
}

.save_prof {
  display: block;
  margin: 40px auto 0;
}
</style>
<template>
  <div>
    <p class="title_selected">
      <span>{{ title_selected_first }}</span>
      <span>{{ title_selected_second }}</span>
      <span>{{ title_selected_third }}</span>
    </p>
    <img :src="avatar_selected_url" class="avatar_selected">
    <div class="avatar_img_box" style="width: 80%; margin: 0 auto;">
      <img v-for="avatar in avatars" :key="avatar.img_name" :src="avatar.url" @click="setSelectedAvatar(avatar.url)" :class="changeAvatarOpacity(avatar.get)">
    </div>
  </div>
</template>

<script>
import { doc, getDoc, getDocs, updateDoc, deleteDoc, collection, query, where, getFirestore, setDoc } from "firebase/firestore";
export default {
  data () {
    return {
      uid: "ivAhPE3aHcbJh6fOVhsPbC2rXV42",
      avatar_selected_url: "",
      title_selected_first: "",
      title_selected_second: "",
      title_selected_third: "",
      avatars: {
        A_Sample: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2FA_Sample.jpeg?alt=media&token=c5be4652-87ed-4dba-bf19-5b028597627c" },
        alien_grey: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Falien_grey.png?alt=media&token=a99b2c1d-e3d5-464c-8049-19b4e2db5f5e" },
        businessman_cry_man: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fbusinessman_cry_man.png?alt=media&token=9092c1ae-0e64-4422-9730-69b708eb5c26" },
        busy_man: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fbusy_man.png?alt=media&token=b56ce7c3-b1d3-4ddd-b17f-721fab83514a" },
        character_boy_normal: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fcharacter_boy_normal.png?alt=media&token=1489efa5-2bb7-4574-bed0-8f78b3fb06e0" },
        // 5
        character_girl_normal: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fcharacter_girl_normal.png?alt=media&token=6d7da292-0197-4011-abd1-bd783976ec14" },
        character_hakase: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fcharacter_hakase.png?alt=media&token=40934ff0-e301-4f36-b367-3d7570751909" },
        character_shimekiri: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fcharacter_shimekiri.png?alt=media&token=84d491a2-2b5c-4921-8f85-291f169b1728" },
        chibikko_gang: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fchibikko_gang.png?alt=media&token=279bdff1-cc8d-4760-b4ea-467bbb9dcbdb" },
        fantasy_berserker: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_berserker.png?alt=media&token=a5fc0a00-326f-4564-9c90-2e47ce98676a" },
        // 10
        fantasy_dark_elf: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_dark_elf.png?alt=media&token=4e71a2fd-d6bf-400b-aa10-a2d6f35829f6" },
        fantasy_dracula2: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_dracula2.png?alt=media&token=d9a31b7f-1289-4b21-99e3-a57820d2338b" },
        fantasy_dragon: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_dragon.png?alt=media&token=b073af30-42a6-44dd-a101-de7240bcc29f" },
        fantasy_elf2: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_elf2.png?alt=media&token=03ff11d9-cffe-4ceb-82be-0a2325ed4fc8" },
        fantasy_maou_devil: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_maou_devil.png?alt=media&token=10949bfe-1a3a-4ba2-ac46-8ef199b3bed1" },
        // 15
        fantasy_ryuukishi: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_ryuukishi.png?alt=media&token=e92a51b6-996c-401a-b57f-e679d9b130aa" },
        fantasy_zombie_man: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_zombie_man.png?alt=media&token=903de37a-d62d-468a-a31a-b6b511e9fb09" },
        futon_derenai_woman: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffuton_derenai_woman.png?alt=media&token=3e6c60fa-9127-45e1-9e4d-caa9355395f4" },
        hero_man: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fhero_man.png?alt=media&token=3e5d1716-f2b7-4f97-8953-978d30404dc4" },
        kamisama: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fkamisama.png?alt=media&token=e06c1453-c61d-4ddb-8407-9e59b5b9cce1" },
        // 20
        kintarou: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fkintarou.png?alt=media&token=35f62015-fd49-41c0-a3de-51a7b3ab8f7a" },
        knight: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fknight.png?alt=media&token=df9d5c66-2c96-47f3-932a-57cc2935f625" },
        kugakusei: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fkugakusei.png?alt=media&token=0e2e56c8-e6c8-4f90-8877-b4d46b011f90" },
        mahoutsukai_fire: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_fire.png?alt=media&token=d3d53645-22ec-41e2-835e-b3eaa4ae7c5f" },
        mahoutsukai_necromancer: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_necromancer.png?alt=media&token=297a1ca0-43d2-4dd6-8848-1579f38176a3" },
        // 25
        mahoutsukai_thunder: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_thunder.png?alt=media&token=229e35e6-11bd-48b3-b3f6-c4f92884fb33" },
        mahoutsukai_water: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_water.png?alt=media&token=87bbf268-4e17-43b4-853e-56460d71f4e8" },
        mahoutsukai_white_man: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_white_man.png?alt=media&token=c05f4423-b8f3-40f9-acac-734ddce617c2" },
        mahoutsukai_white_woman: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_white_woman.png?alt=media&token=e69754c9-9c3a-438b-a860-1c76f1cd50ca" },
        mahoutsukai_wind: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_wind.png?alt=media&token=a2b15328-1fcc-4f68-b3f5-093dd54f9d30" },
        // 30
        monogatari_robinhood: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmonogatari_robinhood.png?alt=media&token=e8ac2e5f-fb3c-4795-819a-95fedb5edf5e" },
        ningyohime: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fningyohime.png?alt=media&token=55854fab-f82b-4aed-a8c2-6408470e7ae1" },
        ninja_shinobiashi: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fninja_shinobiashi.png?alt=media&token=38cfff31-a8ae-41de-95c3-3af9ed06dabf" },
        royal_king_gyokuza: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Froyal_king_gyokuza.png?alt=media&token=84249442-6a75-4e8c-a861-056356571449" },
        royal_queen_gyokuza: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Froyal_queen_gyokuza.png?alt=media&token=a16971be-3c3c-4976-a653-7d4e6bff0c65" },
        // 35
        saiyuki_songoku_kintoun: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fsaiyuki_songoku_kintoun.png?alt=media&token=b2ef0b1c-8590-472e-b4cd-b528b4cd1e77" },
        shinigami: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fshinigami.png?alt=media&token=b2ef0b1c-8590-472e-b4cd-b528b4cd1e77" },
        speed_slow_turtle: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fspeed_slow_turtle.png?alt=media&token=6b71ded6-68bf-484a-9390-2a61cab52afb" },
        syoninkyu_man: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fsyoninkyu_man.png?alt=media&token=7d79658b-15a7-47a5-8076-863bb588d6fd" },
        tabibito: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ftabibito.png?alt=media&token=34c7dc55-a00d-46e9-8a0e-81410d3e7a8d" },
        // 40
        tantei_boy: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ftantei_boy.png?alt=media&token=d325b36c-5b04-4f5e-9012-1a244c244aaa" },
        tantei_girl: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ftantei_girl.png?alt=media&token=eff1c720-0386-4022-9c91-ac0eec912c3f" },
        tokusatsu_kyodai_hero: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ftokusatsu_kyodai_hero.png?alt=media&token=bca1179a-3912-4ad0-8369-2f2e5c2db124" },
        unchi_character: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Funchi_character.png?alt=media&token=0f215469-413e-44c3-9edd-d5381f558fef" },
        yuusya_game: { url: "https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fyuusya_game.png?alt=media&token=277d5765-c0e3-4f0a-9705-ced7674886ef" },
        // 45
      },
    }
  },
  mounted() {
    this.getSelected();
    this.getUserAvatar();
  },
  methods: {
    // 選択しているアバターと称号の取得
    async getSelected() {
      const db = getFirestore(this.$app);
      const q = query(collection(db, "user", this.uid, "Selected"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        if (doc.id == "avatar") {
          this.avatar_selected_url = this.avatars[doc.data().img_name]["url"];
        } else if (doc.id == "title") {
          this.title_selected_first = doc.data().first;
          this.title_selected_second = doc.data().second;
          this.title_selected_third = doc.data().third;
        }
      });
    },
    // 個人の取得したアバターの取得
    async getUserAvatar () {
      const db = getFirestore(this.$app);
      const q = query(collection(db, "user", this.uid, "Avatar"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const avatar = doc.data();
        this.$set(this.avatars[avatar.img_name], "get", true);
      });
    },
    // 画像をクリックしたときに上の画像を変える
    setSelectedAvatar(url) {
      this.avatar_selected_url = url;
    },
    // アバター画像の濃さ
    changeAvatarOpacity(get) {
      if (get) {
        return "avatar_get";
      } else {
        return "avatar_not_get";
      }
    },
  }
}
</script>

<style>
.title_selected {
  display: block;
  margin: 40px auto 10px;
  width: fit-content;

}

.avatar_selected {
  display: block;
  margin: 0 auto;
  height: 180px;
  width: 180px;
}

.avatar_img_box {
  display: flex;
  flex-wrap: wrap;
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
</style>
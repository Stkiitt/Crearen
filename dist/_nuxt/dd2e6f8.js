(window.webpackJsonp=window.webpackJsonp||[]).push([[2,11],{309:function(e,t,r){"use strict";var n=r(310);r.d(t,"a",(function(){return n.a})),r.d(t,"b",(function(){return n.b})),r.d(t,"c",(function(){return n.c})),r.d(t,"d",(function(){return n.d})),r.d(t,"e",(function(){return n.e})),r.d(t,"f",(function(){return n.f})),r.d(t,"g",(function(){return n.g})),r.d(t,"h",(function(){return n.h})),r.d(t,"i",(function(){return n.i})),r.d(t,"j",(function(){return n.j})),r.d(t,"k",(function(){return n.l})),r.d(t,"l",(function(){return n.m}))},321:function(e,t,r){"use strict";r.r(t);var n=r(31),o=(r(84),r(1),r(3),r(27),r(309)),c=r(312),d={computed:{avatarUrlChild:{get:function(){return""},set:function(e){this.$emit("changeAvatarUrl",e)}},degreeFirstChild:{get:function(){return""},set:function(e){this.$emit("changeDegreeFirst",e)}},degreeSecondChild:{get:function(){return""},set:function(e){this.$emit("changeDegreeSecond",e)}},degreeThirdChild:{get:function(){return""},set:function(e){this.$emit("changeDegreeThird",e)}},userNameChild:{get:function(){return""},set:function(e){this.$emit("changeUserName",e)}}},data:function(){return{uid:"",profileTab:"0",username:"",avatar_selected_name:"",avatar_selected_url:"",degree_selected_first:"",degree_selected_second:"",degree_selected_third:"",editDegree:0,avatars:{A_Sample:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2FA_Sample.jpeg?alt=media&token=c5be4652-87ed-4dba-bf19-5b028597627c",get:!0},character_boy_normal:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fcharacter_boy_normal.png?alt=media&token=1489efa5-2bb7-4574-bed0-8f78b3fb06e0",get:!0},character_girl_normal:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fcharacter_girl_normal.png?alt=media&token=6d7da292-0197-4011-abd1-bd783976ec14",get:!0},kugakusei:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fkugakusei.png?alt=media&token=0e2e56c8-e6c8-4f90-8877-b4d46b011f90",get:!1},busy_man:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fbusy_man.png?alt=media&token=b56ce7c3-b1d3-4ddd-b17f-721fab83514a",get:!1},syoninkyu_man:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fsyoninkyu_man.png?alt=media&token=7d79658b-15a7-47a5-8076-863bb588d6fd",get:!1},mahoutsukai_water:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_water.png?alt=media&token=87bbf268-4e17-43b4-853e-56460d71f4e8",get:!1},mahoutsukai_wind:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_wind.png?alt=media&token=a2b15328-1fcc-4f68-b3f5-093dd54f9d30",get:!1},mahoutsukai_white_man:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_white_man.png?alt=media&token=c05f4423-b8f3-40f9-acac-734ddce617c2",get:!1},mahoutsukai_white_woman:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_white_woman.png?alt=media&token=e69754c9-9c3a-438b-a860-1c76f1cd50ca",get:!1},ningyohime:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fningyohime.png?alt=media&token=55854fab-f82b-4aed-a8c2-6408470e7ae1",get:!1},fantasy_ryuukishi:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_ryuukishi.png?alt=media&token=e92a51b6-996c-401a-b57f-e679d9b130aa",get:!1},character_hakase:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fcharacter_hakase.png?alt=media&token=40934ff0-e301-4f36-b367-3d7570751909",get:!1},fantasy_dark_elf:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_dark_elf.png?alt=media&token=4e71a2fd-d6bf-400b-aa10-a2d6f35829f6",get:!1},yuusya_game:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fyuusya_game.png?alt=media&token=277d5765-c0e3-4f0a-9705-ced7674886ef",get:!1},mahoutsukai_fire:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_fire.png?alt=media&token=d3d53645-22ec-41e2-835e-b3eaa4ae7c5f",get:!1},fantasy_dracula2:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_dracula2.png?alt=media&token=d9a31b7f-1289-4b21-99e3-a57820d2338b",get:!1},ninja_shinobiashi:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fninja_shinobiashi.png?alt=media&token=38cfff31-a8ae-41de-95c3-3af9ed06dabf",get:!1},tantei_boy:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ftantei_boy.png?alt=media&token=d325b36c-5b04-4f5e-9012-1a244c244aaa",get:!1},tantei_girl:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ftantei_girl.png?alt=media&token=eff1c720-0386-4022-9c91-ac0eec912c3f",get:!1},kintarou:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fkintarou.png?alt=media&token=35f62015-fd49-41c0-a3de-51a7b3ab8f7a",get:!1},fantasy_elf2:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_elf2.png?alt=media&token=03ff11d9-cffe-4ceb-82be-0a2325ed4fc8",get:!1},knight:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fknight.png?alt=media&token=df9d5c66-2c96-47f3-932a-57cc2935f625",get:!1},mahoutsukai_necromancer:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_necromancer.png?alt=media&token=297a1ca0-43d2-4dd6-8848-1579f38176a3",get:!1},fantasy_maou_devil:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_maou_devil.png?alt=media&token=10949bfe-1a3a-4ba2-ac46-8ef199b3bed1",get:!1},chibikko_gang:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fchibikko_gang.png?alt=media&token=279bdff1-cc8d-4760-b4ea-467bbb9dcbdb",get:!1},alien_grey:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Falien_grey.png?alt=media&token=a99b2c1d-e3d5-464c-8049-19b4e2db5f5e",get:!1},mahoutsukai_thunder:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmahoutsukai_thunder.png?alt=media&token=229e35e6-11bd-48b3-b3f6-c4f92884fb33",get:!1},royal_king_gyokuza:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Froyal_king_gyokuza.png?alt=media&token=84249442-6a75-4e8c-a861-056356571449",get:!1},royal_queen_gyokuza:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Froyal_queen_gyokuza.png?alt=media&token=a16971be-3c3c-4976-a653-7d4e6bff0c65",get:!1},kamisama:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fkamisama.png?alt=media&token=e06c1453-c61d-4ddb-8407-9e59b5b9cce1",get:!1},tabibito:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ftabibito.png?alt=media&token=34c7dc55-a00d-46e9-8a0e-81410d3e7a8d",get:!1},monogatari_robinhood:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fmonogatari_robinhood.png?alt=media&token=e8ac2e5f-fb3c-4795-819a-95fedb5edf5e",get:!1},saiyuki_songoku_kintoun:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fsaiyuki_songoku_kintoun.png?alt=media&token=b2ef0b1c-8590-472e-b4cd-b528b4cd1e77",get:!1},fantasy_dragon:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_dragon.png?alt=media&token=b073af30-42a6-44dd-a101-de7240bcc29f",get:!1},unchi_character:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Funchi_character.png?alt=media&token=0f215469-413e-44c3-9edd-d5381f558fef",get:!1},futon_derenai_woman:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffuton_derenai_woman.png?alt=media&token=3e6c60fa-9127-45e1-9e4d-caa9355395f4",get:!1},school_joshikousei_kogyaru_90s:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fschool_joshikousei_kogyaru_90s.png?alt=media&token=ae4d694c-0d41-45a5-aeb3-57b568443aa8"},hero_man:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fhero_man.png?alt=media&token=3e5d1716-f2b7-4f97-8953-978d30404dc4",get:!1},tokusatsu_kyodai_hero:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ftokusatsu_kyodai_hero.png?alt=media&token=bca1179a-3912-4ad0-8369-2f2e5c2db124",get:!1},fantasy_zombie_man:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_zombie_man.png?alt=media&token=903de37a-d62d-468a-a31a-b6b511e9fb09",get:!1},character_shimekiri:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fcharacter_shimekiri.png?alt=media&token=84d491a2-2b5c-4921-8f85-291f169b1728",get:!1},businessman_cry_man:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fbusinessman_cry_man.png?alt=media&token=9092c1ae-0e64-4422-9730-69b708eb5c26",get:!1},speed_slow_turtle:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fspeed_slow_turtle.png?alt=media&token=6b71ded6-68bf-484a-9390-2a61cab52afb",get:!1},shinigami:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Fshinigami.png?alt=media&token=b2ef0b1c-8590-472e-b4cd-b528b4cd1e77",get:!1},fantasy_berserker:{url:"https://firebasestorage.googleapis.com/v0/b/crearen-a8759.appspot.com/o/Avatar%2Ffantasy_berserker.png?alt=media&token=a5fc0a00-326f-4564-9c90-2e47ce98676a",get:!1}},degrees:[],ppps:["(なし)","の","が","で","を","と","に","な","は","も","なる","での","から","からの","的な","兼","限定","in","of","=","★","♥"]}},mounted:function(){this.checkLogin()},methods:{checkLogin:function(){var e=this,t=Object(c.b)(this.$app);Object(c.c)(t,(function(t){t&&(e.uid=t.uid,e.getSelected(),e.getUserAvatarDegree(),e.getUserName())}))},openProfileEditPopup:function(){this.getUserAvatarDegree(),$("#profileEdit").fadeIn()},closeProfileEditPopup:function(){$("#profileEdit").fadeOut()},getSelected:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,q;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(o.g)(e.$app),q=Object(o.j)(Object(o.b)(r,"user",e.uid,"Selected")),t.next=4,Object(o.f)(q);case 4:t.sent.forEach(function(){var t=Object(n.a)(regeneratorRuntime.mark((function t(r){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:"avatar"==r.id?(e.avatar_selected_name=r.data().img_name,e.avatar_selected_url=e.avatars[e.avatar_selected_name].url):"degree"==r.id&&(""==(n=r.data().second)&&(n="(なし)"),e.degree_selected_first=r.data().first,e.degree_selected_second=n,e.degree_selected_third=r.data().third);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 6:case"end":return t.stop()}}),t)})))()},getUserAvatarDegree:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,c,d,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(o.g)(e.$app),c=Object(o.j)(Object(o.b)(r,"user",e.uid,"Avatar")),t.next=4,Object(o.f)(c);case 4:return t.sent.forEach(function(){var t=Object(n.a)(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.$set(e.avatars[r.data().img_name],"get",!0);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),d=Object(o.j)(Object(o.b)(r,"user",e.uid,"Degree")),t.next=9,Object(o.f)(d);case 9:l=t.sent,e.degrees=["はじめて","タスク"],l.forEach(function(){var t=Object(n.a)(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.degrees.push(r.data().name);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 12:case"end":return t.stop()}}),t)})))()},getUserName:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(o.g)(e.$app),t.next=3,Object(o.e)(Object(o.d)(r,"user",e.uid));case 3:(c=t.sent).exists()&&(n=c.data()),e.username=n.user_name;case 6:case"end":return t.stop()}}),t)})))()},setSelectedAvatar:function(e,t){this.avatar_selected_name=e,this.avatar_selected_url=t},saveEdit:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.avatars[e.avatar_selected_name].get){t.next=18;break}return r=Object(o.g)(e.$app),"(なし)"==(n=e.degree_selected_second)&&(n=""),t.next=6,Object(o.k)(Object(o.d)(r,"user",e.uid,"Selected","avatar"),{img_name:e.avatar_selected_name});case 6:return t.next=8,Object(o.k)(Object(o.d)(r,"user",e.uid,"Selected","degree"),{first:e.degree_selected_first,second:n,third:e.degree_selected_third});case 8:return t.next=10,Object(o.k)(Object(o.d)(r,"user",e.uid),{user_name:e.username});case 10:e.avatarUrlChild=e.avatar_selected_url,e.degreeFirstChild=e.degree_selected_first,e.degreeSecondChild=n,e.degreeThirdChild=e.degree_selected_third,e.userNameChild=e.username,alert("保存しました"),t.next=19;break;case 18:alert("そのアバターは所持していません");case 19:case"end":return t.stop()}}),t)})))()},changeAvatarOpacity:function(e){return e?"avatar_get":"avatar_not_get"},changeDegreeFlame:function(e){return this.editDegree==e?"degree_flame":""},changeEdit:function(e){this.editDegree=e},changeDegree:function(e){0==this.editDegree?this.degree_selected_first=e:1==this.editDegree?this.degree_selected_second=e:2==this.editDegree&&(this.degree_selected_third=e)}}},l=d,m=(r(374),r(63)),component=Object(m.a)(l,(function(){var e=this,t=e._self._c;return t("div",[t("button",{on:{click:function(t){return e.openProfileEditPopup()}}},[e._v("プロフィール編集")]),e._v(" "),t("section",{staticClass:"modalArea",attrs:{id:"profileEdit"}},[t("div",{staticClass:"modalBg",on:{click:function(t){return e.closeProfileEditPopup()}}}),e._v(" "),t("div",{staticClass:"modalWrapperPe"},[t("div",{attrs:{id:"tab"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.profileTab,expression:"profileTab"}],attrs:{type:"radio",name:"tab_name",id:"tab1",value:"0",checked:""},domProps:{checked:e._q(e.profileTab,"0")},on:{change:function(t){e.profileTab="0"}}}),e._v(" "),t("label",{staticClass:"tab_class",attrs:{for:"tab1"}},[e._v("アバター画像")]),e._v(" "),t("div",{staticClass:"content_class1"},[t("div",[t("img",{staticClass:"avatar_selected",attrs:{src:e.avatar_selected_url}}),e._v(" "),t("div",{staticClass:"avatar_img_box"},e._l(e.avatars,(function(r,n){return t("img",{key:r.img_name,class:e.changeAvatarOpacity(r.get),attrs:{src:r.url},on:{click:function(t){return e.setSelectedAvatar(n,r.url)}}})})),0)]),e._v(" "),t("button",{staticClass:"btn btn-warning save_prof",on:{click:function(t){return e.saveEdit()}}},[e._v("保存する")])]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.profileTab,expression:"profileTab"}],attrs:{type:"radio",name:"tab_name",id:"tab2",value:"1"},domProps:{checked:e._q(e.profileTab,"1")},on:{change:function(t){e.profileTab="1"}}}),e._v(" "),t("label",{staticClass:"tab_class",attrs:{for:"tab2"}},[e._v("称号・名前")]),e._v(" "),t("div",{staticClass:"content_class2"},[t("h3",{staticClass:"username"},[e._v("ユーザー名")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"editName",attrs:{type:"text"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),e._v(" "),t("h3",{staticClass:"degreeTitle"},[e._v("称号")]),e._v(" "),t("p",{staticClass:"degree_selected"},[t("span",{staticClass:"degree",attrs:{id:e.changeDegreeFlame(0)},on:{click:function(t){return e.changeEdit(0)}}},[e._v(e._s(e.degree_selected_first))]),e._v(" "),t("span",{staticClass:"degree",attrs:{id:e.changeDegreeFlame(1)},on:{click:function(t){return e.changeEdit(1)}}},[e._v(e._s(e.degree_selected_second))]),e._v(" "),t("span",{staticClass:"degree",attrs:{id:e.changeDegreeFlame(2)},on:{click:function(t){return e.changeEdit(2)}}},[e._v(e._s(e.degree_selected_third))])]),e._v(" "),0==e.editDegree||2==e.editDegree?t("div",{staticClass:"degreeOptionsBox"},e._l(e.degrees,(function(r){return t("span",{key:r.id,staticClass:"degreeOption",on:{click:function(t){return e.changeDegree(r)}}},[e._v(e._s(r))])})),0):e._e(),e._v(" "),1==e.editDegree?t("div",{staticClass:"degreeOptionsBox"},e._l(e.ppps,(function(r){return t("span",{key:r.id,staticClass:"degreeOption",on:{click:function(t){return e.changeDegree(r)}}},[e._v(e._s(r))])})),0):e._e(),e._v(" "),t("button",{staticClass:"btn btn-warning save_prof",on:{click:function(t){return e.saveEdit()}}},[e._v("保存する")])])]),e._v(" "),t("div",{staticClass:"closeModal",on:{click:function(t){return e.closeProfileEditPopup()}}},[e._v("\n        ☓\n      ")])])])])}),[],!1,null,null,null);t.default=component.exports},343:function(e,t,r){var content=r(375);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(107).default)("1191fc02",content,!0,{sourceMap:!1})},374:function(e,t,r){"use strict";r(343)},375:function(e,t,r){var n=r(106)(!1);n.push([e.i,'\n.button-history {\r\n  margin-left: 30px;\r\n  padding: 0 20px;\r\n  height: 2.5em;\r\n  border-radius: 3em;\r\n  background-color: #ffdd44;\r\n  border: none;\r\n  box-shadow: 1px 2px 1px #777777;\n}\r\n\r\n/* プロフィール編集ポップアップ内 */\r\n\r\n/* モーダルCSS */\n.modalArea {\r\n  display: none;\r\n  position: fixed;\r\n  z-index: 10;\r\n  /*サイトによってここの数値は調整 */\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\n}\n.modalBg {\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: rgba(30, 30, 30, 0.9);\n}\n.modalWrapperPe {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  width: 50%;\r\n  min-width: 720px;\r\n  max-height: 1000px;\r\n  padding: 10px 30px;\r\n  background-color: #fff;\n}\n.closeModal {\r\n  position: absolute;\r\n  top: 0.5rem;\r\n  right: 1rem;\r\n  cursor: pointer;\n}\r\n\r\n/* タブ要素 */\n#tab {\r\n  width: 100%;\r\n  margin: auto;\r\n  display: flex;\r\n  flex-wrap: wrap;\n}\n.tab_class {\r\n  width: 200px;\r\n  height: 50px;\r\n  background-color: darkgrey;\r\n  line-height: 50px;\r\n  font-size: 15px;\r\n  text-align: center;\r\n  display: block;\r\n  float: left;\r\n  order: -1;\n}\ninput[name="tab_name"] {\r\n  display: none;\n}\ninput:checked+.tab_class {\r\n  background-color: cadetblue;\r\n  color: aliceblue;\n}\n.content_class1 {\r\n  display: none;\r\n  width: 100%;\r\n  height: 600px;\r\n  text-align: center;\n}\n.content_class2 {\r\n  display: none;\r\n  width: 100%;\r\n  height: 600px;\n}\ninput:checked+.tab_class+.content_class1 {\r\n  display: block;\n}\ninput:checked+.tab_class+.content_class2 {\r\n  display: block;\n}\n.degree {\r\n  font-size: 1.5em;\r\n  margin: 5px;\r\n  border-bottom: 2px solid black;\r\n  padding: 10px 20px;\n}\n#degree_flame {\r\n  border-bottom: 5px solid cadetblue;\n}\n.username,\r\n.editName {\r\n  margin-left: 10%;\n}\n.editName {\r\n  width: 80%;\n}\n.degreeTitle {\r\n  margin-left: 10%;\r\n  margin-top: 1em;\n}\r\n\r\n/*  */\n.degree_selected {\r\n  display: block;\r\n  margin: 20px auto 10px;\r\n  width: fit-content;\n}\n.avatar_selected {\r\n  display: block;\r\n  margin: 20px auto 10px;\r\n  height: 180px;\r\n  width: 180px;\n}\n.avatar_img_box {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  overflow-y: scroll;\r\n  max-height: 250px;\r\n  width: 80%;\r\n  margin: 0 auto;\n}\n.avatar_get,\r\n.avatar_not_get {\r\n  margin: 4px;\r\n  height: 70px;\r\n  width: 70px;\n}\n.avatar_not_get {\r\n  opacity: 0.2;\n}\r\n\r\n/*  */\n.degreeOptionsBox {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  overflow-y: scroll;\r\n  max-height: 250px;\r\n  width: 90%;\r\n  margin: 40px auto 0;\n}\n.degreeOption {\r\n  margin-top: 1em;\r\n  width: 25%;\n}\n.save_prof {\r\n  display: block;\r\n  margin: 40px auto 0;\n}\r\n',""]),e.exports=n}}]);
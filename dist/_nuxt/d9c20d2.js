(window.webpackJsonp=window.webpackJsonp||[]).push([[7,11],{309:function(e,t,n){"use strict";var r=n(310);n.d(t,"a",(function(){return r.a})),n.d(t,"b",(function(){return r.b})),n.d(t,"c",(function(){return r.c})),n.d(t,"d",(function(){return r.d})),n.d(t,"e",(function(){return r.e})),n.d(t,"f",(function(){return r.f})),n.d(t,"g",(function(){return r.g})),n.d(t,"h",(function(){return r.h})),n.d(t,"i",(function(){return r.i})),n.d(t,"j",(function(){return r.j})),n.d(t,"k",(function(){return r.l})),n.d(t,"l",(function(){return r.m}))},317:function(e,t,n){var content=n(328);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(107).default)("67cc527e",content,!0,{sourceMap:!1})},326:function(e,t,n){e.exports=n.p+"img/check.a9267da.png"},327:function(e,t,n){"use strict";n(317)},328:function(e,t,n){var r=n(106)(!1);r.push([e.i,"\n#complete {\r\n  height: 2em;\n}\n#complete:hover {\r\n  transform: scale(1.4, 1.4);\r\n  filter: opacity(30%);\n}\n.task-comp {\r\n  padding-left: 1em;\r\n  margin: auto 1em auto auto;\n}\r\n\r\n/* モーダルCSS */\n.modalArea {\r\n  display: none;\r\n  position: fixed;\r\n  z-index: 10;\r\n  /*サイトによってここの数値は調整 */\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\n}\n.modalBg {\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: rgba(30, 30, 30, 0.9);\n}\n.modalWrapperComp {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  width: 70%;\r\n  max-width: 250px;\r\n  padding: 10px 30px;\r\n  background-color: #fff;\n}\n.closeModal {\r\n  position: absolute;\r\n  top: 0.5rem;\r\n  right: 1rem;\r\n  cursor: pointer;\n}\n.compContents {\r\n  padding: 5px;\r\n  text-align: center;\n}\r\n",""]),e.exports=r},334:function(e,t,n){"use strict";n.r(t);var r=n(31),c=(n(84),n(1),n(3),n(85),n(27),n(233),n(11),n(21),n(309)),o=n(312),d={props:{task:{type:Object}},computed:{tasksChild:{get:function(){return[]},set:function(e){this.$emit("changeTasks",e)}},compChild:{get:function(){return""},set:function(e){this.$emit("changeComp",e)}}},data:function(){return{uid:"",name:"",memo:"",priority:"中",deadline:"",taskid:"",time_created:0}},mounted:function(){this.checkLogin()},methods:{checkLogin:function(){var e=this,t=Object(o.b)(this.$app);Object(o.c)(t,(function(t){t&&(e.uid=t.uid)}))},getTasks:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,q,r,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=Object(c.g)(e.$app),q=Object(c.j)(Object(c.b)(n,"task"),Object(c.l)("uid","==",e.uid)),t.next=4,Object(c.f)(q);case 4:return r=t.sent,o=[],r.forEach((function(e){var t=e.data();t.tid=e.id,o.push(t),o.sort((function(a,b){return b.time-a.time}))})),t.abrupt("return",o);case 8:case"end":return t.stop()}}),t)})))()},completeButton:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=Object(c.g)(e.$app),t.next=3,Object(c.a)(Object(c.b)(n,"task_completed"),{time:e.getNow(),deadline:e.deadline,memo:e.memo,name:e.name,priority:e.priority,uid:e.uid});case 3:return t.next=5,e.countCompAchievement();case 5:return e.compChild=e.taskid,t.next=8,Object(c.c)(Object(c.d)(n,"task",e.taskid));case 8:return t.next=10,e.getTasks();case 10:e.tasksChild=t.sent,e.closeCompPopup();case 12:case"end":return t.stop()}}),t)})))()},countCompAchievement:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,o,d,m,l,h,f,k,_,v,x,O;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={achievement:{avatar:[["mahoutsukai_white_man","mahoutsukai_white_woman"],["ningyohime"],["fantasy_ryuukishi"],["character_hakase"],["fantasy_dark_elf"]],degree:[["新人","魔法使い"],["魅惑","マーメイド"],["最強","ドラゴンナイト"],["ものしり","博士"],["憧れ","タスクマスター"]]},completed_quick:{avatar:[["fantasy_berserker"]],degree:[["タスクキラー"]]},completed_all:{avatar:[["kugakusei"],["busy_man"],["syoninkyu_man"],["mahoutsukai_water"],["mahoutsukai_wind"]],degree:[["働く","学生"],["忙しい","社員"],["少ない","初任給"],["計画的","実行"],["塵","積もれば山となる"]]},completed_high:{avatar:[["chibikko_gang"],["alien_grey"],["mahoutsukai_thunder"],["royal_king_gyokuza","royal_queen_gyokuza"],["kamisama"]],degree:[["生意気","ギャング","ベイビー"],["かわいい","宇宙人"],["ビリビリ","達人"],["やさしい","王様"],["最高","神"]]},completed_middle:{avatar:[["kintarou"],["fantasy_elf2"],["knight"],["mahoutsukai_necromancer"],["fantasy_maou_devil"]],degree:[["元気","金太郎"],["幻","エルフ"],["敏腕","ナイト"],["上手","玄人"],["最悪","魔王"]]},completed_low:{avatar:[["yuusya_game"],["mahoutsukai_fire"],["fantasy_dracula2"],["ninja_shinobiashi"],["tantei_boy","tantei_girl"]],degree:[["駆け出し","勇者"],["メラメラ","努力家"],["強力","ドラキュラ"],["一人前","忍者"],["すごい","名探偵"]]},task_success:{avatar:[["tabibito"],["monogatari_robinhood"],["saiyuki_songoku_kintoun"],["fantasy_dragon"],["unchi_character"]],degree:[["さすらい","旅人"],["百発百中","アーチャー"],["伝説","孫悟空"],["恐ろしい","タスクモンスター"],["嵐を呼ぶ","しり"]]},task_failure:{avatar:[["character_shimekiri"],["businessman_cry_man"],["speed_slow_turtle"]],degree:[["油断大敵"],["鶴","千年"],["亀","万年"]]}},r=Object(c.g)(e.$app),t.next=4,Object(c.e)(Object(c.d)(r,"user",e.uid));case 4:if((o=t.sent).exists()&&(d=o.data()),m=e.getToday(),!(e.getNow()-e.time_created<300)){t.next=18;break}if(d.completed_quick++,0==(l=[10].indexOf(d.completed_quick)+1)){t.next=18;break}return alert("「?」\nミッションを達成しました。"),d.achievement++,t.next=16,Object(c.k)(Object(c.d)(r,"user",e.uid),{completed_quick_step:l});case 16:e.addAvatarDegree(r,n,"completed_quick",l),e.updateAchievement(r,n,d.achievement);case 18:if(d.completed_all++,0==(h=[30,50,100,200,300].indexOf(d.completed_all)+1)){t.next=27;break}return alert("「タスク完了の合計数」\nミッションを達成しました。"),d.achievement++,t.next=25,Object(c.k)(Object(c.d)(r,"user",e.uid),{completed_all_step:h});case 25:e.addAvatarDegree(r,n,"completed_all",h),e.updateAchievement(r,n,d.achievement);case 27:if("高"!=e.priority){t.next=39;break}if(d.completed_high++,0==(f=[1,5,10,50,100].indexOf(d.completed_high)+1)){t.next=37;break}return alert("「優先度：高」\nミッションを達成しました。"),d.achievement++,t.next=35,Object(c.k)(Object(c.d)(r,"user",e.uid),{completed_high_step:f});case 35:e.addAvatarDegree(r,n,"completed_high",f),e.updateAchievement(r,n,d.achievement);case 37:t.next=61;break;case 39:if("中"!=e.priority){t.next=51;break}if(d.completed_middle++,0==(k=[1,5,10,50,100].indexOf(d.completed_middle)+1)){t.next=49;break}return alert("「優先度：中」\nミッションを達成しました。"),d.achievement++,t.next=47,Object(c.k)(Object(c.d)(r,"user",e.uid),{completed_middle_step:k});case 47:e.addAvatarDegree(r,n,"completed_middle",k),e.updateAchievement(r,n,d.achievement);case 49:t.next=61;break;case 51:if("低"!=e.priority){t.next=61;break}if(d.completed_low++,0==(_=[1,5,10,50,100].indexOf(d.completed_low)+1)){t.next=61;break}return alert("「優先度：低」\nミッションを達成しました。"),d.achievement++,t.next=59,Object(c.k)(Object(c.d)(r,"user",e.uid),{completed_low_step:_});case 59:e.addAvatarDegree(r,n,"completed_low",_),e.updateAchievement(r,n,d.achievement);case 61:if(!((v=Number(e.deadline.replace(/-/g,"")))>=m||""==v)){t.next=74;break}if(d.task_success++,0==(x=[30,50,100,200,300].indexOf(d.task_success)+1)){t.next=72;break}return alert("「期限内にタスクを完了する」\nミッションを達成しました。"),d.achievement++,t.next=70,Object(c.k)(Object(c.d)(r,"user",e.uid),{task_success_step:x});case 70:e.addAvatarDegree(r,n,"task_success",x),e.updateAchievement(r,n,d.achievement);case 72:t.next=83;break;case 74:if(d.task_failure++,0==(O=[10,20,30].indexOf(d.task_failure)+1)){t.next=83;break}return alert("「期限を過ぎてタスクを完了する」\nミッションを達成しました。"),d.achievement++,t.next=81,Object(c.k)(Object(c.d)(r,"user",e.uid),{task_failure_step:O});case 81:e.addAvatarDegree(r,n,"task_failure",O),e.updateAchievement(r,n,d.achievement);case 83:return t.next=85,Object(c.k)(Object(c.d)(r,"user",e.uid),{achievement:d.achievement,completed_all:d.completed_all,completed_high:d.completed_high,completed_low:d.completed_low,completed_middle:d.completed_middle,completed_quick:d.completed_quick,task_failure:d.task_failure,task_success:d.task_success});case 85:case"end":return t.stop()}}),t)})))()},updateAchievement:function(e,t,n){var o=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var d;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(0==(d=[1,5,10,15,30].indexOf(n)+1)){r.next=6;break}return alert("「実績解除数」\nミッションを達成しました。"),r.next=5,Object(c.k)(Object(c.d)(e,"user",o.uid),{achievement_step:d});case 5:o.addAvatarDegree(e,t,"achievement",d);case 6:case"end":return r.stop()}}),r)})))()},addAvatarDegree:function(e,t,n,o){var d=this;return Object(r.a)(regeneratorRuntime.mark((function m(){return regeneratorRuntime.wrap((function(m){for(;;)switch(m.prev=m.next){case 0:t[n].avatar[o-1].forEach(function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(c.a)(Object(c.b)(e,"user",d.uid,"Avatar"),{img_name:n});case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),t[n].degree[o-1].forEach(function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(c.a)(Object(c.b)(e,"user",d.uid,"Degree"),{name:n});case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 2:case"end":return m.stop()}}),m)})))()},getNow:function(){var e=new Date;return 1e9*e.getFullYear()+1e7*(e.getMonth()+1)+1e5*e.getDate()+3600*e.getHours()+60*e.getMinutes()+e.getSeconds()},getToday:function(){var e=new Date;return 1e4*e.getFullYear()+100*(e.getMonth()+1)+e.getDate()},openCompPopup:function(){this.name=this.task.name,this.memo=this.task.memo,this.priority=this.task.priority,this.deadline=this.task.deadline,this.taskid=this.task.tid,this.time_created=this.task.time,$("#CompTask"+this.task.tid).fadeIn()},closeCompPopup:function(){$("#CompTask"+this.task.tid).fadeOut(),this.name="",this.memo="",this.priority="中",this.deadline="",this.taskid="",this.time_created=0}}},m=d,l=(n(327),n(63)),component=Object(l.a)(m,(function(){var e=this,t=e._self._c;return t("div",[t("span",{staticClass:"task-comp"},[t("img",{attrs:{id:"complete",src:n(326)},on:{click:function(t){return e.openCompPopup()}}})]),e._v(" "),t("section",{staticClass:"modalArea",attrs:{id:"CompTask"+e.task.tid}},[t("div",{staticClass:"modalBg",on:{click:function(t){return e.closeCompPopup()}}}),e._v(" "),t("div",{staticClass:"modalWrapperComp"},[t("div",{staticClass:"compContents"},[t("p",[e._v("タスクを完了しますか？")]),e._v(" "),t("p",[t("button",{staticClass:"btn btn-warning",on:{click:function(t){return e.completeButton()}}},[e._v("はい")]),e._v(" "),t("button",{staticClass:"btn btn-danger",on:{click:function(t){return e.closeCompPopup()}}},[e._v("いいえ")])])])])])])}),[],!1,null,null,null);t.default=component.exports}}]);
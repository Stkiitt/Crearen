<template lang="">
  <div>
    <p>{{ task.memo }}</p>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
export default {
  data () {
    return {
      task: {},
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      // ユーザ情報を取得
      const docRef_task = doc(this.$db, "task", "BjSC4nstNrZZPm9GGbgV");
      const docSnap_task = await getDoc(docRef_task);
      if (docSnap_task.exists()) {
        this.task = docSnap_task.data();
      } else {
        alert("taskが存在しません");
      }
    }
  }
}
</script>

<style>
  
</style>
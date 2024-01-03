<template>
  <div>
  <div v-for="problem in this.problems" :key="problem.problemId">
    <el-link :href="'/problems/' + problem.problemId" >{{problem.problemTitle}}</el-link>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeworkProblems",
  data() {
    return {
      problems: [],
      localhostPath: ''
    }
  },
  props: ['homeworkId'],
  mounted() {
    axios.post(this.localhostPath + "/getProblemsByHomeworkId", {
      "homeworkId": this.homeworkId
    }).then((data) => {
      this.problems = data.data
    })
  },
  created() {
    let wPath = window.document.location.href;
    // 获取当前页面主机地址之后的目录，如：/admin/index
    let pathName =  this.$route.path;
    let pos = wPath.indexOf(pathName);
    // 获取主机地址，如：http://localhost:8080
    this.localhostPath = wPath.substring(0, pos);
  },
}
</script>

<style scoped>

</style>

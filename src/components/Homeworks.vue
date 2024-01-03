<template>
  <el-row>
    <el-col :span="20" :offset="2">
      <h1>
        我的作业
      </h1>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="homework in homeworks" :key="homework.homeworkId" :title="homework.homeworkTitle"
                          :name="homework.homeworkId">
          <HomeworkProblems :homework-id="homework.homeworkId"></HomeworkProblems>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import HomeworkProblems from "@/components/HomeworkProblems";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Homeworks",
  components: {HomeworkProblems},
  data() {
    return {
      activeNames: ['1'],
      homeworks: [],
      localhostPath: ""
    }
  }, mounted() {
    axios.post( this.localhostPath + '/getHomeworkByClassId',
        {
          userClass: JSON.parse(localStorage.getItem('user')).userClass,
        }).then((data) => {
      console.log(data.data)
      this.homeworks = data.data;
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

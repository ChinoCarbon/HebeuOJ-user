<template>
  <el-collapse v-if="classes !== []">
    <el-collapse-item v-for="aClass in classes" :key="aClass.classId" :title="aClass.className" :name="aClass.classId">
      <homework-finish :homeworkId="id" :classId="aClass.classId"/>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import axios from "axios";
import HomeworkFinish from "@/components/HomeworkFinish";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Homework",
  components: {HomeworkFinish},
  props: ['id'],
  data() {
    return {
      classes: [],
      localhostPath: ''
    }
  },
  created() {
    let wPath = window.document.location.href;
    // 获取当前页面主机地址之后的目录，如：/admin/index
    let pathName =  this.$route.path;
    let pos = wPath.indexOf(pathName);
    // 获取主机地址，如：http://localhost:8080
    this.localhostPath = wPath.substring(0, pos);
  },
  mounted() {
    axios.post(this.localhostPath + "/getClassesByHomeworkId", {
      homeworkId: this.id
    }).then((data) => {
      this.classes = data.data
      console.log(this.classes)
    })
  }
}
</script>

<style scoped>

</style>

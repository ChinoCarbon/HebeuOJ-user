<template>
  <el-table
      :data="this.data"
      style="width: 100%">
    <el-table-column
        prop="name"
        label="姓名"
        width="180">
    </el-table-column>
    <el-table-column
        v-for="problem in problems"
        :key="problem.problemId"
        :prop="problem.problemId.toString()"
        :label="'p'+ problem.problemId + ' ' + problem.problemTitle"
        width="200">
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeworkFinish",
  props: ['homeworkId', 'classId'],
  data() {
    return {
      problems: [],
      students: [],
      data: [],
      localhostPath:'',
    }
  },
  computed: {

  },
  created() {
    let wPath = window.document.location.href;
    // 获取当前页面主机地址之后的目录，如：/admin/index
    let pathName =  this.$route.path;
    let pos = wPath.indexOf(pathName);
    // 获取主机地址，如：http://localhost:8080
    this.localhostPath = wPath.substring(0, pos);
  },
  methods: {
    getPass(p1, p2, a, b) {
      axios.post(this.localhostPath + "/isPass?userId=" + a + "&problemId= " + b)
          .then( (data) => {
          // console.log(a +" " + b + " " + data.data)
            this.data[p1][this.problems[p2].problemId.toString()] = data.data
            if(data.data === true)
            {
              this.data[p1][this.problems[p2].problemId.toString()] = "已通过"
            } else
            {
              this.data[p1][this.problems[p2].problemId.toString()] = "未通过"
            }
          })
    }
  },
  mounted() {
    axios.post(this.localhostPath + "/getProblemsByHomeworkId", {
      "homeworkId": this.homeworkId
    }).then((data) => {
      this.problems = data.data
    })

    axios.post(this.localhostPath + "/selectUserByClassId", {
      "classId": this.classId
    }).then((data) => {
      this.students = data.data
    })

    setTimeout(() => {
      for(let i = 0; i < this.students.length; i ++)
      {
        this.data.push({
          name: this.students[i].userName,
        })
        for(let j = 0; j < this.problems.length; j ++)
        {
          this.getPass(i, j, this.students[i].userId, this.problems[j].problemId)
        }
      }
      console.log(this.data)
    },1000)


  }
}
</script>

<style scoped>

</style>

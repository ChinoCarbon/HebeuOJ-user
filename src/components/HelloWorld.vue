<template>
  <div class="hello">
     <div>
    <h1>
      Entering your code.
    </h1>
    <h1>
      Improving your skill.
    </h1>
  </div>

  <el-row>
    <el-col :span="18" :offset="3">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>推荐题目</h2>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="text item">
        <h3>
        04 时间复杂度
        </h3>
        <h3>
          13 校门外的树
        </h3>
        <h3>
          14 明明的随机数
        </h3>
        <h3>
          18 wr的快速定位法
        </h3>
        <h3>
          23 lyn的反应速度
        </h3>
      </div>
    </el-card>
      </el-col>
  </el-row>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  activated() {
    this.$store.commit("CHANGE_IS_AT_FRONT_PAGE", true)
  },
  deactivated() {
    this.$store.commit("CHANGE_IS_AT_FRONT_PAGE", false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1
{
  margin-left: 5%;
  font-size: 60px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: white;
}
</style>

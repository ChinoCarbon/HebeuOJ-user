<template>
  <el-row>
    <el-col :span="10" :offset="7">
      <el-result icon="error" title="错误提示" subTitle="出错啦！页面不存在">
        <template slot="extra">
          <el-button type="primary" size="medium" @click="back">返回</el-button>
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
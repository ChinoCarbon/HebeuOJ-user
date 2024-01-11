<template>
  <div class="hello">
     <div>
    <h1>
      Entering your code.1
    </h1>
    <h1>
      Improving your skill.
    </h1>
  </div>

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

<template>
  <div>
    <TopSafariBar/>
  </div>
</template>

<script>
import TopSafariBar from "@/components/TopSafariBar";

export default {
  name: "App",
  components:{
    TopSafariBar,
  },
  methods: {
    haha() {
      console.log("add")
    }
  },
  mounted() {
    console.log('App', this);
  }
}
</script>
<style lang="css" scoped>
</style>

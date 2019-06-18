<template>
  <div class="homepage">
    <!-- 所在城市 -->
    <location></location>
    <!-- 轮播图 -->
    <slideshow></slideshow>
    <!-- 主体内容 -->
    <subject></subject>
    <!-- 价格说明 -->
    <price-description></price-description>
  </div>
</template>

<script>
import location from "@/components/child/homePage/location";
import slideshow from "@/components/child/homePage/slideshow";
import subject from "@/components/child/homePage/subject";
export default {
  data() {
    return {};
  },
  mounted() {},
  components: {
    location,
    slideshow,
    subject
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
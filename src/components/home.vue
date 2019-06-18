<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <lay_footer v-if="!(this.$route.path=='/show')"></lay_footer>
  </div>
</template>

<script>
import lay_footer from "@/components/layout/lay_footer";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.commit("vuexInit");
  },
  components: {
    lay_footer
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>



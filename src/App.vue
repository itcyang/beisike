<template>
  <div id="app">
    <router-view/>
    <transition enter-active-class="bounceInRight" leave-active-class="bounceOutRight">
      <login_user v-if="bool" class="animated" ></login_user>
    </transition>
  </div>
</template>

<script>
import login_user from "@/components/main/login";
export default {
  name: "App",
  data() {
    return {
      bool: false
    };
  },
  mounted() {
    this.$eventHub.$on("sub", val => {
       this.bool=val.bool;
    });
  },
  components: {
    login_user
  }
};
</script>


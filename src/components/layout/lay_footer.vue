<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-content-img" v-for="(item,index) in img" :key="index">
        <router-link :to="item.route">
          <img :src="item.src" :ref="item.route" @click="curt($event,index)">
        </router-link>
      </div>
    </div>
    <div class="foot-mark-number" v-if="bln">{{newNum}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newNum: this.$store.state.shopCart.N,
      bln: true,
      img: [
        {
          src:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-a-1.png?v=119",
          src2:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-a-2.png?v=119",
          route: "/home"
        },
        {
          src:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-b-1.png?v=119",
          src2:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-b-2.png?v=119",
          route: "/classification"
        },
        {
          src:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-c-1.png?v=119",
          src2:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-c-2.png?v=119",
          route: "/cart"
        },
        {
          src:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-d-1.png?v=119",
          src2:
            "https://res.bestcake.com/m-images/ww/foot/foot-menu-d-2.png?v=119",
          route: "/mine"
        }
      ]
    };
  },
  mounted() {
    this.img.forEach(ele => {
      if (location.hash.indexOf(ele.route) != -1) {
        this.$refs[ele.route][0].src = ele.src2;
      } else {
        this.$refs[ele.route][0].src = ele.src;
      }
    });

    if (this.newNum <= 0) {
      this.bln = false;
    }
  },
  watch: {
    num(newVal, oldVal) {
      if (newVal == 0) {
        this.bln = false;
      } else {
        this.bln = true;
        this.newNum = newVal;
      }
    }
  },
  computed: {
    num() {
      return this.$store.state.shopCart.N;
    }
  },
  methods: {
    curt(e, index) {
      var user = decodeURIComponent(sessionStorage.getItem("user"));
      if (JSON.parse(user) == null && index == 3) {
        this.$eventHub.$emit("sub", { bool: true });
      } else {
        this.img.forEach(ele => {
          if (e.target.src.indexOf(ele.src) != -1) {
            this.img.forEach(ele => {
              this.$refs[ele.route][0].src = ele.src;
            });
            this.$refs[ele.route][0].src = ele.src2;
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #eee;
  background: #fff;
  .footer-content {
    height: r(100);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .footer-content-img {
      img {
        width: r(74);
        height: r(82);
      }
    }
  }
  .foot-mark-number {
    position: absolute;
    right: r(245);
    bottom: r(65);
    background: #f2495e;
    border-radius: 50%;
    width: r(28);
    height: r(28);
    text-align: center;
    line-height: r(28);
    font-size: r(20);
    color: #fff;
  }
}
</style>



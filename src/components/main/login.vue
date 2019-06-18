<template>
  <div class="main-login">
    <div class="login-title">
      <div class="btn" @click="back">
        <label class="back"></label>
      </div>
    </div>
    <div class="login-top">请登录</div>
    <div class="login-fast">
      <p>
        账号:
        <input type="text" placeholder="请输入用户名" v-model="uname">
      </p>
      <p>
        密码:
        <input type="text" placeholder="请输入密码" v-model="upwd">
      </p>
      <div class="change-login" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      uname: "",
      upwd: ""
    };
  },
  mounted() {},
  methods: {
    back() {
      this.$eventHub.$emit("sub", { bool: false });
      var user = decodeURIComponent(sessionStorage.getItem("user"));
      if (JSON.parse(user) == null) {
        window.history.go(-1);
      } else {
      }
    },
    login() {
      var data = {
        uname: this.uname,
        upwd: this.upwd
      };
      this.$apis.mokeLogin(data).then(res => {
        console.log(res.data);
        if (res.data.status == 1) {
          sessionStorage.setItem(
            "user",
            encodeURIComponent(JSON.stringify(res.data.data))
          );
          MessageBox("提示", "登录成功");
          this.$eventHub.$emit("sub", { bool: false });
          $(".footer-content-img:eq(3)")
            .find("img")
            .attr(
              "src",
              "https://res.bestcake.com/m-images/ww/foot/foot-menu-d-2.png?v=119"
            );
            $(".footer-content-img:eq(0)")
            .find("img")
            .attr(
              "src",
              "https://res.bestcake.com/m-images/ww/foot/foot-menu-a-1.png?v=119"
            );
            $(".footer-content-img:eq(1)")
            .find("img")
            .attr(
              "src",
              "https://res.bestcake.com/m-images/ww/foot/foot-menu-b-1.png?v=119"
            );
            $(".footer-content-img:eq(2)")
            .find("img")
            .attr(
              "src",
              "https://res.bestcake.com/m-images/ww/foot/foot-menu-c-1.png?v=119"
            );
        } else {
          MessageBox("提示", "账号或密码错误");
        }
      });
    }
  },
  components: {}
};
</script>


<style scoped lang="scss">
.main-login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(54, 209, 220, 1);
  .login-title {
    width: 100%;
    height: r(84);
    line-height: r(84);
    color: #fff;
    font-size: r(32);
    position: relative;
    .btn {
      position: absolute;
      width: r(75);
      height: 100%;
      .back {
        position: absolute;
        display: inline-block;
        width: r(28);
        height: r(28);
        top: 40%;
        margin-top: -r(10);
        left: r(30);
        border-left: r(10) solid;
        border-bottom: r(10) solid;
        transform: rotate(45deg);
      }
    }
  }
  .login-top {
    color: #fff;
    font-size: r(64);
    position: absolute;
    line-height: r(90);
    left: r(40);
    top: r(80);
  }
  .login-fast {
    position: absolute;
    left: r(140);
    top: r(280);
    p {
      color: #fff;
      font-size: r(32);
      margin-bottom: r(30);
    }
    .change-login {
      margin-left: r(70);
      font-size: r(32);
      text-align: center;
      width: r(240);
      height: r(64);
      line-height: r(64);
      border-radius: r(64);
      border: 1px solid #fff;
      color: #fff;
    }
  }
}
</style>
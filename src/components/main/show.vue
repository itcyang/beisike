<template>
  <div class="cakepage-big">
    <div class="header">
      <!-- 蛋糕图片和名称 -->
      <div class="lunbotu">
        <a href="/#/classification">
          <div class="cake-fhsy">更多商品</div>
        </a>
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
            <img :src="item" alt>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="cake-name">
        <div class="information-zw">{{obj.Name}}</div>
        <div style="height:60px">
          <div class="promotion-activity" v-if="bln">
            <div class="promotion-activity-1">
              <div class="promotion-a">新</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 蛋糕简介 -->
      <div class="main">
        <div class="td">
          <div class="td-left">甜度</div>
          <div class="td-right" v-if="obj.Sweet>0">
            <img :src="host+obj.Sweet+'.png'" alt>
          </div>
        </div>
        <div class="kw">
          <div class="td-left">口味</div>
          <div class="td-right">{{obj.CategoryName}}</div>
        </div>
        <div class="ycl">
          <div class="td-left">原材料</div>
          <div class="td-right">{{obj.Resource||obj.Resourse}}</div>
        </div>
        <div class="shrq">
          <div class="td-left">适合人群</div>
          <div class="td-right">所有人群</div>
        </div>
        <div class="bxtj">
          <div class="td-left">保险条件</div>
          <div class="td-right">{{obj.KeepFresh}}</div>
        </div>
      </div>
      <!-- 商品评价 -->
      <div class="sppj">
        <div class="pj-left">
          <div class="left">
            <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-a.png" alt>
          </div>
          <div class="right">商品评价</div>
        </div>
        <div class="pj-right"></div>
      </div>
      <!-- 商品磅数 -->
      <div class="spbs">
        <div class="cake-size-a">
          <div class="bsb">{{obj.Size}}</div>
        </div>
        <div class="cake-size-b">
          <div v-for="(item,index) in obj.Arr" :key="index">
            <div class="left">
              <img :src="item.src" alt>
            </div>
            <div class="right">{{item.str}}</div>
          </div>
        </div>
      </div>
      <!-- 商品购买数量 -->
      <div class="shop">
        <div class="s-left">
          <div>购买数量</div>
        </div>
        <div class="s-right">
          <div class="jia" @click="jia">
            <img src="https://res.bestcake.com/m-images/ww/detail/add.png" alt>
          </div>
          <div class="num">{{shopNum}}</div>
          <div class="jian" @click="jian">
            <img src="https://res.bestcake.com/m-images/ww/detail/reduce-1.png" alt>
          </div>
        </div>
      </div>
      <!-- 价格说明 -->
      <price-description style="background: #f7f7f7;"></price-description>
    </div>
    <div class="footer">
      <div class="purchase-c">
        <div class="purchase-c-1">{{obj.CurrentPrice*shopNum+".00"}}</div>
        <div class="purchase-c-2">
          <div class="purchase-c-2-left">已优惠：</div>
          <div class="purchase-c-2-right">0.00</div>
        </div>
      </div>
      <div class="purchase-a">
        <div class="purchase-1" @click="test">立即购买</div>
      </div>
      <div class="purchase-b" @click="add">
        <div class="purchase-2">加入购物车</div>
      </div>
    </div>
    <!-- 加入购物车弹框 -->
    <div class="tk" v-if="boolCart">
      <div class="bj"></div>
      <div class="addCart">
        <div>
          <div class="addCart1">
            <div class="cart">成功添加到购物车</div>
            <div class="zkk" @click="bool">再看看</div>
            <div class="kg"></div>
            <div class="js" @click="toCart">去结算</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      host: "https://res.bestcake.com/m-images/ww/jz/tiandu_",
      bln: false,
      bannerList: [],
      obj: {},
      shopNum: 1,
      boolCart: false
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    test() {
      var user = decodeURIComponent(sessionStorage.getItem("user"));
      if (JSON.parse(user) == null) {
        this.$eventHub.$emit("sub", { bool: true });
      } else {
        this.$router.push({
          path: "/mine"
        });
      }
    },
    add() {
      var data = {
        id: this.obj.ID, //产品ID
        Name: this.obj.Name, //产品名称
        CurrentPrice: this.obj.CurrentPrice, //产品价格
        url: `https://res.bestcake.com/m-images/cart/${
          this.obj.Name
        }.png?v=0128`, //产品图片
        Size: this.obj.Size, //产品规格
        num: this.shopNum, //产品数量
        SupplyNo: this.obj.SupplyNo //产品型号
      };
      // console.log(data);
      this.$store.commit("add", data);
      this.boolCart = true;
    },
    bool() {
      this.boolCart = false;
    },
    toCart() {
      this.$router.push({
        path: "/cart"
      });
    },
    jia() {
      this.shopNum++;
    },
    jian() {
      if (this.shopNum == 1) {
        return;
      }
      this.shopNum--;
    },
    pageInit() {
      if (this.$route.query.c.indexOf("NS") != -1) {
        this.GetNSCakeByName(res => {
          res.data.Tag.forEach(ele => {
            if (
              ele.City == decodeURIComponent(sessionStorage.getItem("city"))
            ) {
              this.obj = ele;
              // console.log(ele);
              this.bln = this.obj.SupplyNo.indexOf("NS") != -1;
              this.obj.KeepFresh =
                "最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。";
              var arr = [
                {
                  src:
                    "https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png?v=112",
                  str: "直径13.5cm"
                },
                {
                  src:
                    "https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png",
                  str: "适合4-5人分享"
                },
                {
                  src:
                    "https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png",
                  str: "含五人份餐具"
                },
                {
                  src:
                    "https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png",
                  str: "至少需提前一天预约"
                }
              ];
              this.obj.Arr = arr;
            }
          });
        });
        this.setBannerList("ns-detail");
      } else if (this.$route.query.c.indexOf("KSK") != -1) {
        this.GetCakeByName(res => {
          // SupplyNo: "KSK-0101-1"
          //obj.CakeType[0].Sweet
          this.obj = res.data.Tag.infos;
          this.obj.SupplyNo = "KSK-0101-1";
          this.obj.Sweet = this.obj.CakeType[0].Sweet;
          this.obj.Size = this.obj.CakeType[0].Size;
          var arr = [
            {
              src:
                "https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png?v=112",
              str: "直径13.5cm"
            },
            {
              src:
                "https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png",
              str: "适合4-5人分享"
            },
            {
              src:
                "https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png",
              str: "含五人份餐具"
            },
            {
              src:
                "https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png",
              str: "至少需提前一天预约"
            }
          ];
          this.obj.Arr = arr;
          this.obj.CurrentPrice = this.obj.CakeType[0].CurrentPrice;
          this.obj.ID = this.obj.CakeType[0].Id;
          // console.log(res.data.Tag.infos);
        });
        this.setBannerList("jd-detail");
      } else if (this.$route.query.c.indexOf("RP") != -1) {
        this.GetRuPCakeByName(res => {
          res.data.Tag.forEach(ele => {
            if (
              ele.City == decodeURIComponent(sessionStorage.getItem("city"))
            ) {
              this.obj = ele;
              // console.log(this.obj);
            }
          });
        });
        this.setBannerList("rp-detail");
      } else {
        this.GetjzCakeInfo(res => {
          this.obj = res.data.Tag[0];
          // console.log(res.data.Tag[0]);
          this.obj.Sweet = this.obj.CakeType[0].Sweet;
          var arr = [
            {
              src:
                "https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png",
              str: "至少2-4人分享"
            },
            {
              src:
                "https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png",
              str: "至少需提前一天预约"
            }
          ];
          this.obj.Arr = arr;
        });
        this.setBannerList("jz-detail");
      }
    },
    setBannerList(path) {
      for (var i = 0; i < 4; i++) {
        var str = `https://res.bestcake.com/m-images/${path}/${
          this.$route.query.key
        }/${this.$route.query.key}-${i + 1}.jpg`;
        this.bannerList.push(str);
      }
    },
    //广告接口  女神
    GetNSCakeByName(callback) {
      var data = { Name: this.$route.query.key };
      this.$apis.GetNSCakeByName(data).then(res => {
        callback(res);
      });
    },
    // 商品详情接口  魔法猜心  经典
    GetCakeByName(callback) {
      var data = {
        ProName: this.$route.query.key,
        City: decodeURIComponent(sessionStorage.getItem("city"))
      };
      this.$apis.GetCakeByName(data).then(res => {
        callback(res);
      });
    },
    //严选
    GetRuPCakeByName(callback) {
      var data = { Name: this.$route.query.key };
      this.$apis.GetRuPCakeByName(data).then(res => {
        callback(res);
      });
    },
    //伴手礼
    GetjzCakeInfo(callback) {
      var data = {
        ProName: this.$route.query.key,
        City: decodeURIComponent(sessionStorage.getItem("city"))
      };
      this.$apis.GetjzCakeInfo(data).then(res => {
        callback(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin left {
  color: #9a9a9a;
  font-size: r(28);
  float: left;
  width: r(120);
  margin-left: r(30);
}
@mixin right {
  color: #252525;
  font-size: r(28);
  float: left;
  width: r(540);
  margin-left: r(30);
  margin-right: r(30);
}
.cakepage-big {
  background: #f7f7f7;
  margin: 0 auto;
  width: 100%;
  .header {
    padding-left: 0;
    padding-right: 0;
    background: white;
    .lunbotu {
      position: relative;
      a {
        text-decoration: none;
        color: #000;
        font-size: r(32);
        .cake-fhsy {
          position: fixed;
          right: r(-1);
          top: r(30);
          background-color: rgba(255, 255, 255, 0.5);
          width: r(165);
          height: r(67.5);
          border-radius: r(9) 0 0 r(9);
          line-height: r(60);
          text-align: center;
          z-index: 2;
          border: 1px solid #333;
        }
      }
      .mint-swipe {
        height: r(890);
        .mint-swipe-items-wrap {
          padding-left: 0;
          padding-right: 0;
          height: r(445);
          width: r(1500);
          transition-duration: 0.3s;
          transform: translate3d(0px, 0px, 0px);
          .mint-swipe-item {
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .cake-name {
      margin-left: auto;
      margin-right: auto;
      float: none;
      border-bottom: r(30) solid #f7f7f7;
      .information-zw {
        line-height: r(34);
        font-weight: bold;
        color: #333;
        font-size: r(34);
        margin-top: r(15);
        margin-bottom: r(30);
        text-align: center;
      }
      .promotion-activity {
        width: 100%;
        height: r(60);
        text-align: center;
        margin-bottom: r(60);
        .promotion-activity-1 {
          display: inline-block;
          margin: 0 auto;
          .promotion-a {
            float: left;
            font-size: r(30);
            line-height: r(60);
            width: r(60);
            height: r(60);
            text-align: center;
            color: #fff;
            border-radius: 2px;
            background: #f2495e;
            margin-right: r(10);
          }
        }
      }
    }
    .main {
      margin-top: r(30);
      background: white;
      border-bottom: r(30) solid #f7f7f7;
      .td {
        overflow: hidden;
        margin-bottom: r(22);
        margin-top: r(68);
        .td-left {
          @include left;
        }
        .td-right {
          @include right;
          img {
            vertical-align: top;
            width: r(168);
            margin-top: r(4.5);
          }
        }
      }
      .kw {
        overflow: hidden;
        margin-bottom: r(30);
        .td-left {
          @include left;
        }
        .td-right {
          @include right;
        }
      }
      .ycl {
        overflow: hidden;
        margin-bottom: r(30);
        .td-left {
          @include left;
        }
        .td-right {
          @include right;
        }
      }
      .shrq {
        overflow: hidden;
        margin-bottom: r(30);
        .td-left {
          @include left;
        }
        .td-right {
          @include right;
        }
      }
      .bxtj {
        overflow: hidden;
        margin-bottom: r(72);
        .td-left {
          @include left;
        }
        .td-right {
          @include right;
        }
      }
    }
    .sppj {
      margin-bottom: r(30);
      padding: r(30);

      .pj-left {
        padding-left: r(30);
        width: 50%;
        .left {
          float: left;
          font-size: r(28);
          margin-top: r(9);
          margin-right: r(22);
          width: 12%;
          img {
            display: block;
            max-width: 100%;
            height: auto;
          }
        }
        .right {
          float: left;
          font-size: r(28);
        }
      }
    }
    .spbs {
      border-top: r(30) solid #f7f7f7;
      margin-top: r(30);
      .cake-size-a {
        overflow: hidden;
        margin-top: r(60);
        .bsb {
          background: #02d3d6;
          border-radius: 2px;
          color: #fff;
          border: 1px solid #02d3d6;
          float: left;
          font-size: r(28);
          text-align: center;
          line-height: r(15);
          padding: r(27);
          height: r(60);
          margin-left: r(30);
        }
      }
      .cake-size-b {
        overflow: hidden;
        margin-top: r(85);
        border-bottom: r(30) solid #f7f7f7;
        div {
          float: left;
          width: 50%;
          margin-bottom: r(15);
          .left {
            width: 12%;
            margin-right: r(20);
            margin-left: r(30);
            img {
              display: block;
              max-width: 100%;
              height: auto;
            }
          }
          .right {
            float: left;
            line-height: r(48);
            font-size: r(24);
            width: r(260);
          }
        }
      }
    }
    .shop {
      overflow: hidden;
      padding: r(30);
      .s-left {
        float: left;
        padding-left: r(30);
        width: 50%;
        div {
          font-size: r(28);
        }
      }
      .s-right {
        float: right;
        width: 50%;
        .jia {
          float: right;
          width: 16.66666667%;
          font-size: r(24);
          padding-top: r(8);
          padding-left: r(10);
          img {
            width: r(24);
            display: block;
            max-width: 100%;
            height: auto;
          }
        }
        .num {
          width: 16.66666667%;
          float: right;
          font-size: r(30);
          text-align: center;
          margin-top: 0;
        }
        .jian {
          width: 16.66666667%;
          float: right;
          padding-left: r(24);
          padding-top: r(8);
          img {
            width: r(24);
            display: block;
            max-width: 100%;
            height: auto;
          }
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    // z-index: 99;
    height: r(110);
    background: white;
    .purchase-c {
      float: left;
      margin-left: r(30);
      margin-top: r(10);
      margin-bottom: r(18);
      width: r(270);
      overflow: hidden;
      .purchase-c-1 {
        font-size: r(34);
        color: #f2495e;
        font-weight: bolder;
        width: r(270);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .purchase-c-2 {
        .purchase-c-2-left {
          float: left;
          font-size: r(18);
          color: #333;
        }
        .purchase-c-2-right {
          float: left;
          font-size: r(18);
          color: #333;
          font-weight: bolder;
        }
      }
    }
    .purchase-a {
      float: right;
      height: r(110);
      width: r(230);
      text-align: center;
      padding: r(32) 0;
      background: #02d4d7;
      color: white;
      font-weight: bolder;
      font-size: r(32);
    }
    .purchase-b {
      float: right;
      width: r(220);
      text-align: center;
      padding: r(32) 0;
      font-size: r(32);
    }
  }
  .tk {
    .bj {
      position: fixed;
      background: rgb(0, 0, 0);
      z-index: 10000300;
      left: 0px;
      top: 0px;
      bottom: 0px;
      width: 100%;
      height: r(1500);
      opacity: 0.8;
    }
    .addCart {
      overflow: hidden;
      margin-left: auto;
      margin-right: auto;
      position: fixed;
      left: -r(4);
      top: r(379);
      z-index: 100003001;
      overflow-y: scroll;
      div {
        width: 83.33333333%;
        margin-left: r(40);
        margin-right: auto;
        .addCart1 {
          width: r(580);
          background: #fff;
          text-align: center;
          border-radius: 2px;
          display: inline-block;
          .cart {
            padding-top: r(80);
            color: #333;
            font-size: r(30);
            margin: 0 r(48);
            margin-bottom: r(114);
          }
          .zkk {
            color: #999;
            font-size: r(30);
            float: left;
            width: r(190);
            margin-bottom: r(30);
          }
          .kg {
            width: r(2);
            height: r(40);
            float: left;
            background: #999;
            margin-top: r(6);
          }
          .js {
            color: #02d3d6;
            font-size: r(30);
            float: left;
            width: r(190);
            margin-bottom: r(30);
          }
        }
      }
    }
  }
}
</style>



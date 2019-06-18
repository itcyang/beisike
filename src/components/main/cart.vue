<template>
  <div class="cart">
    <div class="nullCart" v-if="bln">购物车是空的哦~</div>
    <div class="cartList" v-else>
      <div class="div" v-for="(item,index) in cartList" :key="index">
        <div class="gwc-yh">
          <div class="gwc-yh-1">
            <!-- 选中图片 -->
            <div class="gwc-yh-2">
              <img
                src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg"
                alt
                @click="change($event,item)"
              >
            </div>
            <div class="gwc-yh-3">
              <!-- 产品图片 -->
              <div class="gwc-img">
                <a href="javascript:void(0);" @click="toshow(item)">
                  <img :src="item.url" alt>
                </a>
              </div>
              <div class="gwc-xq">
                <!-- 产品名字 -->
                <div class="gwc-name">{{item.Name}}</div>
                <div class="gwc-size">
                  <!-- 产品大小 -->
                  <div class="gwc-size-1">{{item.Size}}</div>
                  <!-- 产品数量 -->
                  <div class="gwc-num">
                    <div class="gwc-jian" @click="jian($event,item)">
                      <a href="javascript:void(0);">
                        <img src="https://res.bestcake.com\m-images\order\reduce-1.png" alt>
                      </a>
                    </div>
                    <div class="gwc-num-1">{{item.num}}</div>
                    <div class="gwc-jia" @click="jia($event,item)">
                      <a href="javascript:void(0);">
                        <img src="https://res.bestcake.com\m-images\order\add.png" alt>
                      </a>
                    </div>
                  </div>
                </div>
                <!-- 产品价格 -->
                <div class="gwc-price">{{item.CurrentPrice*item.num+".00"}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="gwc-hd">
          <div class="fgx"></div>
          <div class="yhfs">优惠方式</div>
          <div class="hd">不参与活动</div>
        </div>
      </div>
    </div>
    <div class="maincl"></div>
    <div class="main">
      <div class="Recommend">
        <div class="Recommend-1">Hot Recommend</div>
        <div class="Recommend-2">
          <div class="Recommend-2-1"></div>
        </div>
        <div class="Recommend-3">热销新品推荐</div>
      </div>
      <div class="gwc-cake">
        <div class="gwc-cake-1">
          <div class="gwc-cake-2">
            <img src="https://res.bestcake.com\m-images\cart\mw_firm_sq.jpg" alt>
          </div>
          <div class="gwc-cake-3">伴手礼系列-吉致生巧</div>
          <div class="gwc-cake-4">
            <div class="gwc-cake-price">
              <span>168.00</span>
              /1盒
            </div>
            <div class="gwc-cake-shop">
              <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt>
            </div>
          </div>
        </div>
        <div class="gwc-cake-1">
          <div class="gwc-cake-2">
            <img src="https://res.bestcake.com\m-images\cart\mw_firm_nzt_v1.jpg" alt>
          </div>
          <div class="gwc-cake-3">伴手礼系列-吉致牛轧糖</div>
          <div class="gwc-cake-4">
            <div class="gwc-cake-price">
              <span>68.00</span>
              /16粒装
            </div>
            <div class="gwc-cake-shop">
              <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt>
            </div>
          </div>
        </div>
        <div class="gwc-cake-1">
          <div class="gwc-cake-2">
            <img src="https://res.bestcake.com\m-images\cart\mw_firm_pf_v1.jpg" alt>
          </div>
          <div class="gwc-cake-3">伴手礼系列-吉致泡芙</div>
          <div class="gwc-cake-4">
            <div class="gwc-cake-price">
              <span>88.00</span>
              /0.8磅
            </div>
            <div class="gwc-cake-shop">
              <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算 -->
    <div class="gwc-js">
      <div class="gwc-js-1" @click="cut">
        <img src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg" alt v-if="order">
        <img src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg" alt v-else>
      </div>
      <div class="gwc-js-2">全选</div>
      <div class="gwc-js-3" @click="clear">清空</div>
      <div class="gwc-js-5">
        <div class="gwc-js-6">
          <div class="gwc-js-7">{{$store.state.total+".00"}}</div>
          <div>合计：</div>
        </div>
        <div class="gwc-yyh">
          <div class="gwc-js-8">0.00</div>
          <div class="yyh">已优惠：</div>
        </div>
      </div>
      <div class="gwc-js-4" @click="test">结算</div>
    </div>
    <!-- 清除购物车弹框 -->
    <div class="tk" v-if="boolCart">
      <div class="bj"></div>
      <div class="addCart">
        <div>
          <div class="addCart1">
            <div class="cart">确定要清空购物车吗?</div>
            <div class="zkk" @click="cancel">取消</div>
            <div class="kg"></div>
            <div class="js" @click="sure">确定</div>
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
      bln: true,
      order: true,
      boolCart: false,
      cartList: []
    };
  },
  mounted() {
    this.cartInit();
  },
  methods: {
    test() {
      var user = decodeURIComponent(sessionStorage.getItem("user"));
      if (JSON.parse(user) == null) {
        this.$eventHub.$emit("sub", { bool: true });
      } else {
        // this.$router.push({
        //   path: "/mine"
        // });
      }
    },
    clear() {
      if (this.order == false) {
        return;
      }
      this.boolCart = true;
    },
    cancel() {
      this.boolCart = false;
    },
    sure() {
      this.boolCart = false;
      this.$store.commit("cleanCart");
      this.cartList = [];
      this.bln = true;
      this.order = false;
      this.$store.state.total = 0;
    },
    toshow(item) {
      var data = {
        key: item.Name,
        c: item.SupplyNo
      };
      this.$router.push({
        path: "/show",
        query: data
      });
    },
    app() {
      var num = 0;
      $(".gwc-yh-2 img").each((index, ele) => {
        if (ele.getAttribute("src").indexOf(1) != -1) {
          num++;
        }
      });
      if ($(".gwc-yh-2 img").length == num) {
        this.order = true;
      } else {
        this.order = false;
      }
    },
    change(e, item) {
      if (
        $(e.target)
          .attr("src")
          .indexOf(1) != -1
      ) {
        $(e.target).attr(
          "src",
          "https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg"
        );
        this.$store.state.total =
          this.$store.state.total - item.CurrentPrice * item.num;
      } else {
        $(e.target).attr(
          "src",
          "https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg"
        );
        this.$store.state.total =
          this.$store.state.total + item.CurrentPrice * item.num;
      }
      this.app();
    },
    cut() {
      this.order = !this.order;
      if (this.order) {
        $(".gwc-yh-2 img").attr(
          "src",
          "https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg"
        );
        var tol = 0;
        this.$store.state.shopCart.list.forEach(ele => {
          tol += ele.num * ele.CurrentPrice;
        });
        this.$store.state.total = tol;
      } else {
        $(".gwc-yh-2 img").attr(
          "src",
          "https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg"
        );
        this.$store.state.total = 0;
      }
    },
    jia(e, item) {
      this.$store.commit("jia", item);
      if (
        $(e.target)
          .parents(".gwc-yh-1")
          .children(".gwc-yh-2")
          .children("img")
          .attr("src")
          .indexOf(2) != -1
      ) {
        this.$store.state.total =
          this.$store.state.total - item.CurrentPrice * item.num;
      }
    },
    jian(e, item) {
      if (item.num <= 1) {
        return;
      }
      this.$store.commit("jian", item);
      if (
        $(e.target)
          .parents(".gwc-yh-1")
          .children(".gwc-yh-2")
          .children("img")
          .attr("src")
          .indexOf(2) != -1
      ) {
        this.$store.state.total =
          this.$store.state.total - item.CurrentPrice * item.num;
      }
    },
    cartInit() {
      setTimeout(() => {
        this.cartList = this.$store.state.shopCart.list;
        if (this.cartList.length != 0) {
          this.bln = false;
        } else {
          this.bln = true;
          this.order = false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cart {
  background: #f7f7f7;
  width: 100%;
  overflow: hidden;
  .nullCart {
    line-height: r(120);
    color: #141414;
    font-size: r(24);
    background: #fff;
    text-align: center;
  }
  .cartList {
    margin: 0 auto;
    width: 100%;
    .div {
      overflow: hidden;
      margin-bottom: r(30);
      background: #fff;
      width: 100%;
      .gwc-yh {
        padding-bottom: r(32);
        overflow: hidden;
        .gwc-yh-1 {
          overflow: hidden;
          .gwc-yh-2 {
            float: left;
            margin-left: r(30);
            margin-right: r(22);
            img {
              width: r(40);
              margin-top: r(127);
            }
          }
          .gwc-yh-3 {
            float: left;
            .gwc-img {
              float: left;
              margin-right: r(30);
              padding-top: r(32);
              a {
                img {
                  width: r(228);
                }
              }
            }
            .gwc-xq {
              float: left;
              width: r(390);
              padding-top: r(38);
              .gwc-name {
                font-size: r(32);
                color: #000;
                line-height: r(38);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: r(366);
              }
              .gwc-size {
                margin: r(9) 0;
                .gwc-size-1 {
                  float: left;
                  width: 50%;
                  font-size: r(22);
                  color: #ccc;
                  line-height: r(26);
                  margin-top: r(12.5);
                }
                .gwc-num {
                  float: left;
                  width: 50%;
                  .gwc-jian {
                    float: left;
                    width: 33.33333333%;
                    a {
                      color: #333;
                      font-weight: bold;
                      display: block;
                      width: r(45);
                      line-height: r(45);
                      text-align: center;
                      img {
                        width: r(20);
                      }
                    }
                  }
                  .gwc-num-1 {
                    font-size: r(32);
                    padding-left: r(10);
                    float: left;
                    width: 33.33333333%;
                  }
                  .gwc-jia {
                    float: left;
                    width: 33.33333333%;
                    a {
                      color: #333;
                      font-weight: bold;
                      display: block;
                      width: r(45);
                      line-height: r(45);
                      text-align: center;
                      img {
                        width: r(20);
                      }
                    }
                  }
                }
              }
              .gwc-price {
                float: left;
                font-size: r(24);
                color: #030303;
                font-weight: bold;
                line-height: r(30);
                margin-top: r(20);
              }
            }
          }
        }
      }
      .gwc-hd {
        width: 100%;
        padding-left: r(92);
        .fgx {
          border-bottom: r(1) solid #ddd;
        }
        .yhfs {
          float: left;
          color: #f2495e;
          margin-right: r(10);
          font-weight: bold;
          line-height: r(40);
          margin-top: r(29);
          margin-bottom: r(29);
          font-size: r(28);
        }
        .hd {
          color: #333;
          float: left;
          line-height: r(40);
          margin-top: r(30);
          margin-bottom: r(29);
          font-size: r(28);
        }
      }
    }
  }
  .maincl {
    margin-bottom: r(60);
  }
  .main {
    padding-top: r(239);
    padding-left: r(27);
    width: 100%;
    overflow: hidden;
    .Recommend {
      margin-bottom: r(92);
      .Recommend-1 {
        line-height: r(56);
        color: #333;
        font-weight: bold;
        font-size: r(48);
        text-align: center;
      }
      .Recommend-2 {
        padding-left: r(167);
        padding-bottom: r(15);
        padding-top: r(15);
        .Recommend-2-1 {
          width: r(392);
          height: 2px;
          background: #333;
        }
      }
      .Recommend-3 {
        line-height: r(30);
        color: #333;
        font-weight: bold;
        font-size: r(30);
        text-align: center;
      }
    }
    .gwc-cake {
      overflow: hidden;
      padding-bottom: r(170);
      .gwc-cake-1 {
        float: left;
        padding-right: r(13);
        padding-bottom: r(62);
        width: 50%;
        .gwc-cake-2 {
          img {
            width: r(330);
          }
        }
        .gwc-cake-3 {
          line-height: r(40);
          font-size: r(28);
          color: #333;
          margin-bottom: r(18);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: r(9);
          font-weight: bold;
        }
        .gwc-cake-4 {
          .gwc-cake-price {
            float: left;
            font-size: r(26);
            color: #333;
            line-height: r(26);
            width: 83.33333333%;
            span {
              font-size: r(26);
              color: #333;
              line-height: r(26);
              font-weight: bold;
            }
          }
          .gwc-cake-shop {
            float: left;
            width: 16.66666667%;
            img {
              width: r(42);
              margin-top: -18px;
            }
          }
        }
      }
    }
  }
  .gwc-js {
    background: #fff;
    position: fixed;
    right: 0;
    bottom: r(100);
    width: 100%;
    overflow: hidden;
    .gwc-js-1 {
      float: left;
      margin-left: r(22.5);
      margin-right: r(10);
      img {
        width: r(40);
        margin-top: r(32);
      }
    }
    .gwc-js-2 {
      padding-top: r(34);
      padding-bottom: r(34);
      font-size: r(30);
      color: #333;
      line-height: r(42);
      float: left;
      width: r(67.5);
      text-align: center;
      margin-right: r(30);
    }
    .gwc-js-3 {
      padding-top: r(37);
      font-size: r(26);
      color: #333;
      line-height: r(37);
      float: left;
      width: r(60);
      text-align: center;
      margin-right: r(1);
    }
    .gwc-js-5 {
      float: left;
      margin-top: r(19);
      margin-right: r(13);
      width: r(274);
      .gwc-js-6 {
        width: r(307.5);
        line-height: r(48);
        float: left;
        text-align: right;
        .gwc-js-7 {
          float: right;
          padding-right: r(30);
          font-size: r(36);
          color: #f2495e;
          font-weight: bold;
        }
        div {
          float: right;
        }
      }
      .gwc-yyh {
        float: left;
        width: r(307.5);
        text-align: right;
        .gwc-js-8 {
          float: right;
          padding-right: r(30);
          font-size: r(18);
          font-weight: bold;
          color: #333;
        }
        .yyh {
          font-size: r(18);
        }
      }
    }
    .gwc-js-4 {
      float: left;
      width: r(230);
      line-height: r(112.5);
      background: #02d4d7;
      color: #fff;
      font-weight: bolder;
      text-align: center;
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
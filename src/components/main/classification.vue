<template>
  <div id="jdlist-compent">
    <div class="list-tabs">
      <div :class="{'list-tabs-a':true,active:active==1}" @click="two(1,'KSK')">自营</div>
      <div :class="{'list-tabs-b':true,active:active==2}" @click="two(2,'RP')">贝式严选</div>
      <div class="list-tabs-c"></div>
    </div>
    <!-- 自营 -->
    <div class="zy-list" v-show="active==1">
      <div class="list-classify">
        <div :class="{'list-classify-a':true,active:sum==0}" @click="three(0,'KSK')">经典</div>
        <div :class="{'list-classify-b':true,active:sum==1}" @click="three(1,'NS')">女神</div>
        <div :class="{'list-classify-c':true,active:sum==2}" @click="three(2,'JZ')">伴手礼</div>
        <div class="list-classify-e"></div>
      </div>

      <div class="list-product">
        <div class="list-product-tab" v-for="(item,index) in activeList" :key="index">
          <div class="list-product-a">
            <img :src="item.ImgUrl" @click="toShow(item)" class="am-img-responsive">
          </div>
          <div class="list-product-b">
            <span>{{item.Name}}</span>
          </div>
          <div class="list-product-c">
            <span>{{item.Means}}</span>
          </div>
          <div class="list-product-d">
            <span>￥</span>
            <span>{{item.CurrentPrice}}</span>
            <span>.00</span>
            <span>{{item.Size}}</span>
          </div>
          <div class="list-product-e" @click="add(item)">
            <img
              src="https://res.bestcake.com\m-images-2\list-cart.png?v=1"
              class="am-img-responsive"
            >
          </div>
        </div>
      </div>
      <price-description></price-description>
    </div>

    <!-- 贝式严选 -->
    <div class="bs-list" v-show="active==2">
      <div class="list-classify">
        <div class="list-classify-a active" @click="optionData('RP')">乳品</div>
        <div class="list-classify-e"></div>
      </div>
      <div class="list-product">
        <div class="list-product-tab" v-for="(item,index) in activeList" :key="index">
          <div class="list-product-a">
            <img :src="item.ImgUrl" @click="toShow(item)" class="am-img-responsive">
          </div>
          <div class="list-product-b">
            <span>{{item.Name}}</span>
          </div>
          <div class="list-product-c">
            <span>{{item.Means}}</span>
          </div>
          <div class="list-product-d">
            <span>￥</span>
            <span>{{item.CurrentPrice}}</span>
            <span>.00</span>
            <span>{{item.Size}}</span>
          </div>
          <div class="list-product-e" @click="add(item)">
            <img
              src="https://res.bestcake.com\m-images-2\list-cart.png?v=1"
              class="am-img-responsive"
            >
          </div>
        </div>
      </div>
      <price-description></price-description>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      sum: 0,
      active: 1,
      goodsList: [],
      activeList: [],
      one: [
        { name: "经典", mark: "KSK" },
        { name: "女神", mark: "NS" },
        { name: "伴手礼", mark: "JZ" }
      ]
    };
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    add(item) {
      var data = {
        id: item.ID || item.Pid, //产品ID
        Name: item.Name, //产品名称
        CurrentPrice: item.CurrentPrice, //产品价格
        url: `https://res.bestcake.com/m-images/cart/${item.Name}.png?v=0128`, //产品图片
        Size: item.Size, //产品规格
        num: 1, //产品数量
        SupplyNo: item.SupplyNo //产品型号
      };
      this.$store.commit("add",data); 
      // console.log(data);
      Toast({
        message: `${item.Name}已加入购物车`,
        position: "top:20%",
        duration: 1000
      });
    },
    pageInit() {
      this.GetJdListNew(res => {
        var goodsList = res.data.Tag.cakelist;
        var url = `https://res.bestcake.com/m-images/ww/`;
        goodsList.forEach(item => {
          if (item.SupplyNo.indexOf("KSK") != -1) {
            item.ImgUrl = `${url}jd/${item.Name}.png`;
          } else if (item.SupplyNo.indexOf("NS") != -1) {
            item.ImgUrl = `${url}ns/${item.Name}.jpg`;
          } else if (item.SupplyNo.indexOf("JZ") != -1) {
            item.ImgUrl = `${url}jz/${item.Name}.png`;
          } else {
            item.ImgUrl = `${url}rp/${item.Name}.jpg`;
          }
        });
        this.goodsList = goodsList;
        this.optionData(this.one[0].mark);
      });
    },
    optionData(mark) {
      var activeList = [];
      this.goodsList.forEach(item => {
        if (item.SupplyNo.indexOf(mark) != -1) {
          activeList.push(item);
        }
      });
      this.activeList = activeList;
    },
    two(num, name) {
      this.active = num;
      this.optionData(name);
      if(num==1){
        this.sum=0;
      }
    },
    three(sum, mark) {
      this.sum = sum;
      this.optionData(mark);
    },
    toShow(item) {
      var data = {
        key: item.Name,
        c: item.SupplyNo
      };
      this.$router.push({
        path: "/show",
        query: data
      });
    },
    GetJdListNew(callback) {
      this.$apis.GetJdListNew().then(res => {
        callback(res);
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
@mixin abc {
  float: left;
  font-size: r(28);
  text-align: center;
  position: absolute;
  z-index: 2;
  bottom: 0;
}
#jdlist-compent {
  margin-bottom: r(100);
  .list-tabs {
    position: relative;
    border-bottom: 1px solid #d9d9d9;
    height: r(90);
    .list-tabs-a,
    .list-tabs-b {
      width: 50%;
      float: left;
      font-size: r(32);
      text-align: center;
      height: r(97);
      line-height: r(90);
    }
    .list-tabs-c {
      width: 50%;
      height: r(4);
      background: #1db0b8;
      position: absolute;
      bottom: 0;
      transition: left 0.35s;
    }
  }
  .list-tabs .active {
    color: #1db0b8;
  }
  .list-tabs .list-tabs-a.active ~ .list-tabs-c {
    left: 0;
  }
  .list-tabs .list-tabs-b.active ~ .list-tabs-c {
    right: 0;
  }
  .zy-list {
    .list-classify {
      margin-top: r(56);
      height: r(44);
      position: relative;
      .list-classify-a {
        @include abc;
        left: r(150);
      }
      .list-classify-b {
        @include abc;
        left: r(285);
      }
      .list-classify-c {
        @include abc;
        left: r(400);
      }
      .list-classify-e {
        position: absolute;
        bottom: 0;
        transition: left 0.35s;
        z-index: 1;
        height: r(12);
        background: linear-gradient(to right, #95d5d8, #1fb1b9);
      }
    }
    .list-classify .active {
      font-size: r(32);
      font-weight: bold;
    }
    .list-classify .list-classify-a.active ~ .list-classify-e {
      width: r(75);
      left: r(146);
    }
    .list-classify .list-classify-b.active ~ .list-classify-e {
      width: r(75);
      left: r(280);
    }
    .list-classify .list-classify-c.active ~ .list-classify-e {
      width: r(90);
      left: r(400);
    }
    .list-product {
      width: 100%;
      overflow: hidden;
      padding: 0 r(12);
      .list-product-tab:nth-child(2n + 1) {
        margin-right: r(66);
      }
      .list-product-tab {
        width: r(330);
        float: left;
        position: relative;
        margin-bottom: r(40);
        .list-product-a {
          width: r(330);
          height: r(330);
          .am-img-responsive {
            display: block;
            max-width: 100%;
            height: auto;
          }
        }
        .list-product-b {
          margin-top: r(14);
          line-height: r(28);
          span {
            font-size: r(28);
            color: #333;
            padding-left: r(15);
          }
        }
        .list-product-c {
          width: r(300);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: r(37.5);
          span {
            font-size: r(24);
            color: #999;
            padding-left: r(15);
          }
        }
        .list-product-d {
          font-size: 0px;
          span:nth-child(1) {
            color: rgb(255, 51, 0);
            font-size: r(24);
            padding-left: r(15);
          }
          span:nth-child(2) {
            color: rgb(255, 51, 0);
            font-size: r(32);
          }
          span:nth-child(3) {
            color: rgb(255, 51, 0);
            font-size: r(24);
          }
          span:nth-child(4) {
            color: rgb(188, 188, 188);
            font-size: r(24);
            margin-left: r(8);
          }
        }
        .list-product-e {
          width: r(40);
          height: r(40);
          position: absolute;
          right: 0;
          bottom: 0;
          .am-img-responsive {
            display: block;
            max-width: 100%;
            height: auto;
          }
        }
      }
    }
  }
  .bs-list {
    .list-classify {
      margin-top: r(56);
      height: r(44);
      position: relative;
      .list-classify-a {
        @include abc;
        left: r(342);
      }
      .list-classify-e {
        position: absolute;
        bottom: 0;
        transition: left 0.35s;
        z-index: 1;
        height: r(12);
        background: linear-gradient(to right, #95d5d8, #1fb1b9);
      }
    }
    .list-classify .active {
      font-size: r(32);
      font-weight: bold;
    }
    .list-classify .list-classify-a.active ~ .list-classify-e {
      width: r(75);
      left: r(337);
    }
    .list-product {
      width: 100%;
      overflow: hidden;
      padding: 0 r(12);
      .list-product-tab:nth-child(2n + 1) {
        margin-right: r(66);
      }
      .list-product-tab {
        width: r(330);
        float: left;
        position: relative;
        margin-bottom: r(40);
        .list-product-a {
          width: r(330);
          height: r(330);
          .am-img-responsive {
            display: block;
            max-width: 100%;
            height: auto;
          }
        }
        .list-product-b {
          margin-top: r(14);
          line-height: r(28);
          span {
            font-size: r(28);
            color: #333;
            padding-left: r(15);
          }
        }
        .list-product-c {
          width: r(300);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: r(37.5);
          span {
            font-size: r(24);
            color: #999;
            padding-left: r(15);
          }
        }
        .list-product-d {
          font-size: 0px;
          span:nth-child(1) {
            color: rgb(255, 51, 0);
            font-size: r(24);
            padding-left: r(15);
          }
          span:nth-child(2) {
            color: rgb(255, 51, 0);
            font-size: r(32);
          }
          span:nth-child(3) {
            color: rgb(255, 51, 0);
            font-size: r(24);
          }
          span:nth-child(4) {
            color: rgb(188, 188, 188);
            font-size: r(24);
            margin-left: r(8);
          }
        }
        .list-product-e {
          width: r(40);
          height: r(40);
          position: absolute;
          right: 0;
          bottom: 0;
          .am-img-responsive {
            display: block;
            max-width: 100%;
            height: auto;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="subject">
    <div class="banner-icon">
      <div class="loading" v-for="(item,index) in iconList" :key="index">
        <a href>
          <img :src="item.ImgUrl" alt>
        </a>
        <div class="ico-title">{{item.ActName}}</div>
      </div>
    </div>
    <!-- 广告 -->
    <div class="advertising">
      <div>
        <a href="javascript:void(0);" @click="toShow(icoImgList[0])">
          <img src="https://res.bestcake.com/m-images-2/guanggao1.png?v=0419" alt>
        </a>
      </div>
      <div>
        <a href="javascript:void(0);" @click="toShow(icoImgList[1])">
          <img src="https://res.bestcake.com/m-images-2/guangao22.png?v=0419" alt>
        </a>
        <a href="javascript:void(0);" @click="toShow(icoImgList[2])">
          <img src="https://res.bestcake.com/m-images-2/guanggao3.png" alt>
        </a>
      </div>
    </div>
    <!-- 魔法猜心 -->
    <div class="heart">
      <img src="https://res.bestcake.com/m-images-2/mofa.png" alt>
      <p>任选一款，走进你的心</p>
      <div class="heart-tab">
        <ul>
          <li
            v-for="(item,index) in heartTabList"
            :key="index"
            @click="select($event,index)"
            :class="{'select':index==tabNum}"
          >{{item}}</li>
        </ul>
      </div>
      <div class="heart-list">
        <div class="list-c" v-for="(item,index) in heartList" :key="index" @click="toShow(item)">
          <img :src="item.ImgUrl" alt>
          <div class="heart-name">{{item.Name}}</div>
          <div class="heart-price">
            <i>￥</i>
            <span>{{item.CurrentPrice}}</span>
            <b>/{{item.Size}}</b>
          </div>
        </div>
      </div>
    </div>

    <!-- 品质甄选 -->
    <div class="quality">
      <img src="https://res.bestcake.com/m-images-2/pinzhi.png" alt>
      <p>没尝过这些美味的人生，是不完美的</p>
      <div class="quality-list" v-for="(item,index) in qualityList" :key="index">
        <div class="quality-img">
          <img :src="item.ImgUrl" alt @click="toShow(item)">
        </div>
        <div class="quality-detail">
          <div class="quality-name">{{item.Name}}</div>
          <div class="quality-info">{{item.MoreUrl}}</div>
          <div class="quality-tip">
            <img
              src="https://res.bestcake.com/m-images-2/icon_zy.png"
              alt
              v-if="item.SupplyNo.indexOf('RP')==-1"
            >
            <img src="https://res.bestcake.com/m-images-2/icon_yx.png" v-else>
          </div>
          <div class="quality-price">
            <i>￥</i>
            <span>{{item.CurrentPrice}}</span>
            <b>/{{item.Size}}</b>
          </div>
          <div class="quality-cart" @click="add($event,item.ImgUrl,item)">
            <img src="https://res.bestcake.com/m-images-2/pinzhi-cart.png" alt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//飞入购物车
function flay(e, img) {
  var flyer = $(
    `<img class="flyer-img" src=${img} style="height:50px;width:50px">`
  );
  var top = $(window).scrollTop();
  var dh = event.pageY;

  var newh = dh - top;
  //  购物车节点位置,决定图片飘的位置
  var oBtn = $(".footer-content-img:eq(2)").offset();
  var newdh = oBtn.top - top;
  //  console.dir(flyer);

  flyer.fly({
    start: {
      left: event.pageX, //抛物体起点横坐标
      top: newh //抛物体起点纵坐标
    },
    end: {
      left: oBtn.left, //抛物体终点横坐标
      top: newdh //抛物体终点纵坐标
    },
    onEnd: function() {
      this.destory(); //销毁抛物体
    }
  });
}
export default {
  data() {
    return {
      //8个icon图标
      iconList: [],
      icoImgList: [
        {
          key: "宠爱少女"
        },
        {
          key: "贝丽"
        },
        {
          key: "星光游乐园"
        }
      ],
      //魔法猜心
      heart: [],
      heartTabList: [], //送恋人 送挚友...
      tabText: "",
      heartList: [],
      tabNum: 0,
      //品质甄选
      qualityList: []
    };
  },
  mounted() {
    this.GetIndexCakeList(res => {
      this.iconList = res;
    });
  },
  methods: {
    add(e, img, item) {
      flay(e, img);
      var data = {
        id: item.ID||item.Pid, //产品ID
        Name: item.Name, //产品名称
        CurrentPrice: item.CurrentPrice, //产品价格
        url: `https://res.bestcake.com/m-images/cart/${
          item.Name
        }.png?v=0128`, //产品图片
        Size: item.Size, //产品规格
        num: 1, //产品数量
        SupplyNo: item.SupplyNo //产品型号
      }
      this.$store.commit("add",data); 
      // console.log(data);
    },
    //跳转详情页
    toShow(item) {
      var data = {
        key: item.Name || item.key,
        c: item.SupplyNo || "NS"
      };
      this.$router.push({
        path: "/show",
        query: data
      });
    },
    select(e, index) {
      this.tabNum = index;
      this.tabText = e.target.innerText;
      this.heartList = [];
      this.heart.forEach(ele => {
        if (ele.ActiveName.trim() == this.tabText) {
          this.heartList.push(ele);
        }
      });
    },
    GetIndexCakeList(callback) {
      var data = {
        v: Number(new Date()),
        c: "Index",
        m: "GetIndexCakeList"
      };
      this.$apis.GetIndexCakeList(data).then(res => {
        var arr = [];
        //获取icon
        res.data.Tag.iconList.forEach(ele => {
          //判断所在城市所有
          if (ele.City.indexOf(this.$store.state["city"]) != -1) {
            arr.push(ele);
          }
        });
        //魔法猜心
        var arr1 = [];
        res.data.Tag.list.forEach(ele => {
          if (ele.TabType == "4") {
            if (ele.City.indexOf(this.$store.state["city"]) != -1) {
              arr1.push(ele.ActiveName.trim());
              this.heart.push(ele);
            }
          } else {
            this.qualityList.push(ele);
          }
        });
        //tab去重
        this.heartTabList = new Array(...new Set(arr1));

        this.tabText = this.heartTabList[0];
        this.heart.forEach(ele => {
          if (ele.ActiveName == this.tabText) {
            this.heartList.push(ele);
          }
        });

        callback(arr);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.subject {
  .banner-icon {
    overflow: hidden;
    padding: 0 r(23) r(30);
    border-bottom: r(20) solid #fafafa;
    .loading {
      width: r(176);
      float: left;
      margin-top: r(24);
      text-align: center;
      a {
        img {
          width: r(112);
          height: r(112);
        }
      }
    }
  }
  .advertising {
    padding: r(30);
    overflow: hidden;
    border-bottom: r(20) solid #fafafa;
    div {
      width: r(336);
      float: left;
      overflow: hidden;
      img {
        width: r(336);
        height: r(300);
      }
      &:nth-child(2) {
        float: right;
        img {
          height: r(146);
        }
      }
    }
  }
  .heart {
    > img {
      margin: r(50) 0 r(20);
      width: 100%;
      height: r(36);
    }
    > p {
      text-align: center;
      color: #999;
      margin-bottom: r(32);
    }
    .heart-tab {
      padding: 0 r(30);
      overflow: hidden;
      margin-bottom: r(20);
      ul {
        display: flex;
        justify-content: space-between;
        li {
          width: r(120);
          height: r(66);
          background: url(https://res.bestcake.com/m-images-2/mofa-1.png)
            no-repeat center center;
          background-size: r(120) r(66);
          line-height: r(50);
          text-align: center;
          color: #333;
          float: left;
        }
        .select {
          background-image: url(https://res.bestcake.com/m-images-2/mofa-2.png);
          color: #fff;
          border: none;
        }
      }
    }
    .heart-list {
      display: flex;
      justify-content: space-between;
      padding: 0 r(30) r(20);
      border-bottom: r(20) solid #fafafa;
      .list-c {
        width: r(212);
        img {
          width: r(212);
          height: r(180);
        }
        .heart-name {
          text-align: center;
          color: #333;
          font-size: r(30);
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .heart-price {
          text-align: center;
          i {
            color: red;
            font-size: r(24);
          }
          span {
            color: red;
            font-size: r(28);
          }
          b {
            color: rgb(212, 212, 212);
            font-size: r(24);
          }
        }
      }
    }
  }
  .quality {
    > img {
      margin: r(50) 0 r(20);
      width: 100%;
      height: r(36);
    }
    > p {
      text-align: center;
      color: #999;
      margin-bottom: r(32);
    }
    .quality-list {
      margin-bottom: r(24);
      padding: 0 r(30);
      overflow: hidden;
      position: relative;
      .quality-img {
        width: r(220);
        height: r(220);
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .quality-detail {
        margin-left: r(30);
        float: left;
        div {
          max-width: r(370);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .quality-name {
          font-size: r(32);
          color: #333333;
          margin: r(8) 0 0;
        }
        .quality-info {
          font-size: r(24);
          color: #999;
          margin-bottom: r(8);
        }
        .quality-tip {
          img {
            height: r(36);
            margin-right: r(3);
          }
        }
        .quality-price {
          text-align: left;
          i {
            color: red;
            font-size: r(28);
          }
          span {
            color: red;
            font-size: r(32);
          }
          b {
            color: rgb(212, 212, 212);
            font-size: r(28);
          }
        }
      }
      .quality-cart {
        width: r(84);
        height: r(84);
        position: absolute;
        bottom: 0;
        right: r(10);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
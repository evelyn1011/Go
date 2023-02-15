<template>
  <div class="home-box">
    <!-- 每日统计量 -->
    <div class="daily">
      <!-- 总销售额 -->
      <div class="box">
        总销售额
        <div class="num">{{ objCount.sale | num}}</div>
        <div class="sum">今日销售额：{{ objCount.saleTotal | num }}</div>
      </div>
      <!-- 访问量 -->
      <div class="box">
        总访问量
        <div class="num">{{ objCount.viewsTotal | num }}</div>
        <div class="sum">今日访问量：{{ objCount.views | num }}</div>
      </div>
      <!-- 总收藏量 -->
      <div class="box">
        总收藏量
        <div class="num">{{ objCount.collectTotal | num }}</div>
        <div class="sum">今日收藏量：{{ objCount.collect | num }}</div>
      </div>
      <!-- 支付量 -->
      <div class="box">
        总支付量
        <div class="num">{{ objCount.payTotal | num }}</div>
        <div class="sum">今日支付量：{{ objCount.pay | num }}</div>
      </div>
    </div>
    <!-- 数据绘图 -->
    <div class="static">
      <div class="box1">
        月销售额
        <div id="main"></div>
      </div>
      <div class="box2">
        产品销售比例
        <div id="main2"></div>
      </div>
    </div>
    <!-- 底部内容 -->
    <!-- <div class="others">
      <div>
        <i>最新内容</i>
      </div>
      <div>
        <i>新增产品</i>
      </div>
      <div>
        <i>快捷入口</i>
      </div>
    </div>-->
    <div class="others">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日订单</span>
        </div>
        <div class="item-box">
          <div>
            <i>今日订单数</i>
            <div>{{ orderList.curOrderCount }}</div>
          </div>
          <div>
            <i>汇总确认订单</i>
            <div>{{ orderList.curCollect }}</div>
          </div>
          <div>
            <i>累计金额</i>
            <div>{{ orderList.curMoney }}</div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本月订单</span>
        </div>
        <div class="item-box">
          <div>
            <i>本月订单数</i>
            <div>{{ orderList.orderCount }}</div>
          </div>
          <div>
            <i>汇总确认订单</i>
            <div>{{ orderList.collect }}</div>
          </div>
          <div>
            <i>累计金额</i>
            <div>{{ orderList.money }}</div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="item-box">
          <el-button size="small" type="primary" @click="()=>{this.$router.push('/goods/list')}">产品管理</el-button>
          <el-button size="small"  @click="()=>{this.$router.push('/order/collect')}">汇总清单</el-button>
          <el-button size="small"  @click="()=>{this.$router.push('/advert/advertlist')}">广告分类</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      objCount:{},
      orderList:{}
    };
  },

  components: {},

  methods: {
    async getOrderInfo(){
      let res = await this.$api.getOrderInfo()
      console.log(res.data.list)
      this.orderList = res.data.list;

    },
    async getHomeCount(){
      let res = await this.$api.getHomeCount()
      this.objCount = res.data.data.list
    },
    async getFormat() {
      let res = await this.$api.getFormat()
      // console.log(res.data.result.data.sale_money)
      let arr = res.data.result.data.sale_money;
      let x = [], y1 = [], y2 = [], data=[];
      arr.forEach(ele=>{
        x.push(ele.name);
        y1.push(ele.total_amount);
        y2.push(ele.num);
        data.push({value:ele.num,name:ele.name})
      });
      this.line(x,y1,y2);
      this.pie(data)
    },

    line(x,y1,y2) {
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {
          data: ['销售额', '销售量']
        },
        xAxis: {
          type: 'category',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          data:x,
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
            data:y1,
            type: 'line',
            smooth: true,
             name: '销售额',
          },
          {
            data:y2,
            type:'bar',
             name: '销售量',
          }
        ]
      };

      option && myChart.setOption(option);
    },
    pie(data) {
      var chartDom = document.getElementById('main2');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          // text: 'Referer of a Website',
          // subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right: 'right'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            // data: [
            //   { value: 1048, name: 'Search Engine' },
            //   { value: 735, name: 'Direct' },
            //   { value: 580, name: 'Email' },
            //   { value: 484, name: 'Union Ads' },
            //   { value: 300, name: 'Video Ads' }
            // ],
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      option && myChart.setOption(option);

    }

  },

  filters:{
    num(val) {
      if(!val) return ''
      return val.toLocaleString();

    }
  },

  mounted() {
    this.getHomeCount();
    this.line();
    this.pie();
    this.getFormat();
    this.getOrderInfo()
  }
};
</script>

<style scoped>
.home-box {
  padding: 9px 15px;
  background: #eee;
}
.daily {
  display: flex;
  justify-content: space-between;
}
.box {
  width: 220px;
  height: 75px;
  border-radius: 10px;
  padding: 10px;
  color: #fff;
}
.box:nth-child(1) {
  background-image: linear-gradient(#df887d, #88554d);
}
.box:nth-child(2) {
  background-image: linear-gradient(#409eff, #2e556e);
}
.box:nth-child(3) {
  background-image: linear-gradient(#b54fa8, #713c7a);
}
.box:nth-child(4) {
  background-image: linear-gradient(#1cd2f1, #39717a);
}

.box .num {
  font-size: 25px;
  padding: 0 14px;
  border-bottom: solid 1px#fff;
}

.box .sum {
  font-size: 13px;
  padding: 4px 0;
}

.static {
  display: flex;
  height: 260px;
  width: 100%;
  justify-content: space-between;
  margin: 5px 0;
  font-size: revert;
}

.box1 {
  width: 58%;
  background: #fff;
  padding: 10px 0 0 10px;
  margin-right: 10px;
}

.box2 {
  width: 42%;
  padding: 10px 0 0 10px;
  background: #fff;
}

/* .others {
  display: flex;
  justify-content: space-between;
  font-size: revert;
}

.others > div {
  height: 110px;
  background: #fff;
  width: 100%;
  margin: 0 5px;
  padding: 10px;
} */

.others {
  display: flex;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin: 5px;
}

#main,
#main2 {
  height: 100%;
  width: 100%;
}

.item-box {
  display: flex;
  justify-content: center;
}

.item-box > div {
  width: 100%;
  text-align: center;
  border-right: solid 2px #eee;
  padding: 0 5px;
  font-size: 13px;
}

.item-box > div:last-child {
  border-right: 0;
}
</style>

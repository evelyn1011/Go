<template>
  <div>
    <!-- 顶部 -->
    <div class="header">
      <div class="switch" @click="menuHandle">
        <i v-if="!isCollapse" class="iconfont icon-xiangzuo1"></i>
        <i v-else class="iconfont icon-xiangyou1"></i>
      </div>

      <div class="header-right">
        <span class="day">{{ nowTime }}</span>
        <span>|</span>
        <span>欢迎 {{ userInfo.user }}</span>
        <span>|</span>
        <div class="icon" @click="exit">
          <i class="iconfont icon-tuichu"></i>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      nowTime:'',
    };
  },
  
  props:['isCollapse'],

  components: {},

  methods: {

    menuHandle() {
      this.$emit('menuHandle')      
    },
     currentTime() {
      setInterval(this.getTime, 0);
    },
    getTime(){
      this.nowTime = dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss')
    },
    exit(){
      this.$confirm('是否确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          //清空
          this.deleteMenuList();
          this.deleteUser();
          this.$router.options.routes=[];
          // console.log('this.$router',this.$router);
          this.$router.replace('/login')

        }).catch(() => {
         
        });

    },
    ...mapMutations('menu',['deleteMenuList']),
    ...mapMutations('login',['deleteUser']),

  },

  computed: {
    ...mapState('login',['userInfo'])
  },

   mounted() {
    this.currentTime();
  },
  // 销毁定时器
  beforeDestroy() {
    if (this.getTime) {
      clearInterval(this.getTime); // 在Vue实例销毁前，清除时间定时器
    }
  }

};
</script>

<style scoped>
.header {
  height: 50px;
  width: 100%;
  background: #409ee1;
  line-height: 50px;
  color: #fff;
  display: flex;
  position: relative;
}

.switch {
  padding: 0 5px;
  background-color: #2b2c5e;
  opacity: 0.5;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: 45px;
  line-height: 45px;
  z-index: 1;
  position: fixed;
  top: 0;
}
.switch:hover {
  opacity: 1;
}
.header-right {
  flex: 1;
  text-align: right;
  padding: 0 5px;
  font-size: 13px;
  padding-right: 40px;
}

.header-right > span {
  padding: 5px;
}

.header-right .icon {
  position: absolute;
  top: 0;
  right: 0;

  margin: 0px 5px;
  padding: 0 5px;
}

.header-right .icon i {
  font-size: 28px;
}

.header-right .icon i:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>

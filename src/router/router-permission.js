import router from './index'; 
import store from '@/store'; 

router.beforeEach((to, from, next) => {
  console.log('----to--',to);

  if( to.matched.length && !to.matched.some(item => item.meta.isLogin)){
    
    next()
  } else {
    
    let token = store.state.login.userInfo.token;
    // let token = false;
    if(token) {
      // 判断是否存在导航
      if(store.state.menu.menuList.length == 0){
        store.dispatch('menu/getMenuList')
        .then(res => {
          router.addRoutes(res)
          // 中断当前导航，执行新的导航
          next({...to, replace:true});
        })

      } else {
        next();
      }
    } else {
      next('/login')
    }
  }

})
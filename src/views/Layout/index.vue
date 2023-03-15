<template>
  <div class="layout">
    <div class="menu">
      <Menu :isCollapse="isCollapse"></Menu>
    </div>
    <div class="content" :class="{active:isCollapse}">
      <Content @menuHandle="menuHandle" :isCollapse="isCollapse"></Content>
    </div>
  </div>
</template>

<script>
import Menu from './Menu';
import Content from './Content';
export default {
  data() {
    return {
      isCollapse: false
    };
  },

  components: {
    Menu,
    Content
  },

  methods: {
    menuHandle() {
      this.isCollapse = !this.isCollapse;
    }
  },
};
</script>

<style scoped>
.layout {
  height: 100%;
  background: #eee; 
  width: 100%;
}

.menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: #2a2b4c;
  z-index: 1;
}

.content {
  padding-left: 200px;
  /* background: #eee;  */
  transition: all 0.3s;
  height: 100%;
  overflow: auto;
}

.active {
  padding-left: 64px;
}
</style>

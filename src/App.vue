<template>
  <div id="app">
    <keep-alive>
      <router-view :key="key"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  computed: {
    // 添加时间戳来保证路由切换时都会重新渲染触发钩子
    key(){
      return this.$route.name?this.$route.name+ +new Date():this.$route+ +new Date()
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 10rem;
  height: 100%;
}
</style>

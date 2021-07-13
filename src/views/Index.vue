<template>
  <div>
    <div v-show="loading" class="loading">
      <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F63016a6521574b98e2d80a4963e52b824a28c2ae29a43-IHbrSY_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622479112&t=4df3e82974a7ddbd9652c043dd1863d8" alt="">
    </div>
    <van-nav-bar fixed title="推荐">
      <template #left>
        <img style="width: 100px" src="../assets/logo3.png" alt="" />
      </template>
      <template #right>
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="xiaoxi"
          size="18"
        />
      </template>
    </van-nav-bar>
    <div class="wrap" @scroll="scroll($event)">
      <div @click="goPlay(item.data.id)" class="item" v-for="(item, index) in videoList" :key="index">
        <div class="video-wrap">
          <video
            :poster="item.data.cover.detail"
            :src="item.data.playUrl"
          ></video>
          <span class="iconfont icon-jingyin"></span>
        </div>
        <div class="desc">
          <img :src="item.data.author.icon" alt="" />
          <div>
            <p>{{ item.data.title }}</p>
            <p>{{ item.data.author.name }} # {{ item.data.category }}</p>
          </div>
        </div>
      </div>
    </div>
    <van-tabbar route>
      <van-tabbar-item replace to="/index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: false,
      videoList: [],
      nextPageUrl:''
    }
  },
  created() {
    this.getVideo()
  },
  methods: {
    getVideo() {
      this.$http.get('/api/v4/tabs/selected').then(res => {
        // 过滤掉type不为video的值
        this.videoList = res.data.itemList.filter((item) => {
          return item.type === 'video'
        })
        this.nextPageUrl = res.data.nextPageUrl.slice(50,res.data.nextPageUrl.length)
      })
    },
    goPlay(id){
      this.$router.push({path:'/play',query:{id:id}})
    },
    scroll(e){
      let target = e.target
      if(target.scrollTop + target.offsetHeight == target.scrollHeight){
        this.loading = true
        this.$http('/api/v4/tabs/selected?'+ this.nextPageUrl).then(res=>{
          let newVideoList = res.data.itemList.filter((item) => {
          return item.type === 'video'
        })
        if(res.data.nextPageUrl === null) {
          this.loading = false
          this.$notify({
            message:'没有更多视频了',
            type: 'warning'
          })
          return
        }
          this.videoList = [...this.videoList,...newVideoList]
          this.nextPageUrl = res.data.nextPageUrl.slice(50,res.data.nextPageUrl.length)
          this.loading = false
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.loading{
  position: relative;
  width: 100vw;
  height: 100vh;
  img {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
}
.wrap {
  margin-top: 46px;
  height: calc(100vh - 50px - 46px);
  overflow-y: auto;
  .item {
    .video-wrap {
      padding-top: 0.266667rem;
      position: relative;
      video {
        width: 100%;
      }
      .icon-xingzhuang {
        position: absolute;
        top: 0.533333rem;
        left: 0.533333rem;
        color: #fff;
      }
      .icon-jingyin {
        position: absolute;
        top: 0.533333rem;
        left: 0.533333rem;
        color: #fff;
      }
    }
    .desc {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #d9d9d9;
      img {
        width: 1.5rem;
        padding: 0 0.133333rem;
        line-height: 1rem;
        border-radius: 50%;
      }
      div {
        padding-left: 0.266667rem;
        p:nth-child(1) {
          font-size: 0.4rem;
          font-weight: 600;
          color: #060606;
        }
        p:nth-child(2) {
          font-size: 0.266667rem;
          color: #d7d7d7;
        }
      }
    }
  }
}
</style>

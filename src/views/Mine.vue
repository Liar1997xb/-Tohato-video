<template>
  <div class="container">
    <van-nav-bar fixed title="我的收藏"></van-nav-bar>
    <div v-if="collection.length == 0" class="empty">
      <p>暂无收藏</p>
      <button @click="goIndex">去添加</button>
    </div>
    <div v-else class="item_wrap">
      <div class="item" v-for="(item,index) in collection" :key="index">
        <img @click="goPlay(item.id)" class="video_img" :src="item.coverForDetail" alt="">
        <div @click="goPlay(item.id)" class="video_detail">
          <p>{{item.title}}</p>
          <p>{{item.category}}</p>
          <div>
            <img class="author_img" :src="item.author.icon" alt="">
            <span>{{item.author.name}}</span>
          </div>
        </div>
        <van-icon @click="remove(item)" name="cross" />
      </div>
    </div>
    <van-tabbar route>
      <van-tabbar-item replace to="/index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState, mapMutations} from 'vuex'

export default {
  data(){
    return{
    }
  },
  computed:{
    ...mapState(['collection'])
  },
  methods:{
    goIndex(){
      this.$router.push('/index')
    },
    goPlay(id){
      // console.log(id)
      this.$router.push({path:'/play',query:{id:id}})
    },
    remove(item){
      this.removeVideo(item)
      this.$notify({
        message:'删除成功',
        type: 'success',
        duration: 1000
      })
    },
    ...mapMutations(['removeVideo'])
  }
}
</script>
<style lang="less" scoped>
.container{
  height: 100%;
  .empty{
    text-align: center;
    height: 100%;
    transform: translateY(40%);
    p{
      font-size: .4rem;
      color: #DFDDDD;
    }
    button{
      font-size: .333333rem;
      padding: .133333rem .4rem;
    }
  }
  .item_wrap{
    height: 100%;
    margin-top: 46px;
    padding-bottom: 120px;
    overflow-y: auto;
    .item{
      display: flex;
      width: 90%;
      height: 4rem;
      margin: .266667rem auto 0;
      border: 1px solid #ccc;
      border-radius: .133333rem;
      .video_img{
        width: 45%;
        object-fit: cover;
      }
      .video_detail{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 45%;
        padding-left: .266667rem;
        p{
          margin: 0;
          &:nth-child(1){
            font-size: .453333rem;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          &:nth-child(2){
            color: #E3DDDF;
            font-size: .346667rem;
          }
        }
        div{
          display: flex;
          align-items: center;
          .author_img{
            width: .666667rem;
            height: .666667rem;
            border-radius: 50%;
          }
          span{
            margin-left: .133333rem;
            font-size: .4rem;
          }
        }
      }
      .van-icon-cross{
        flex: 1;
        text-align: center;
        margin-top: .266667rem;
        font-size: .533333rem;
        color: gray;
      }
    }
  }
}
</style>
<template>
  <div class="container">
    <div class="wrap">
      <video
        autoplay
        :poster="videoDetail.coverForDetail"
        :src="videoDetail.playUrl"
        controls
      ></video>
      <van-icon @click="back" name="arrow-left" />
    </div>
    <div class="desc">
      <p>{{ videoDetail.title }}</p>
      <p>#{{ videoDetail.category }}</p>
      <p>{{ videoDetail.description }}</p>
      <div class="button">
        <van-icon name="good-job-o" />
        <span v-if="videoDetail.consumption">{{ videoDetail.consumption.collectionCount }}</span>
        <van-icon name="share-o" />
        <span v-if="videoDetail.consumption">{{ videoDetail.consumption.shareCount }}</span>
        <van-icon name="down" />
        <span>缓存</span>
        <van-icon :class="`${ isStar === false ? '' : 'isActive'}`" @click="star(videoDetail)" name="star-o" />
        <span @click="star(videoDetail)">收藏</span>
      </div>
    </div>
    <div class="relevant">
      <img class="author" :src="videoDetail.author ? videoDetail.author.icon: ''" alt="" />
      <div>
        <p v-if="videoDetail.author">{{ videoDetail.author.name }}</p>
        <p v-if="videoDetail.author">{{ videoDetail.author.description }}</p>
      </div>
      <span>+关注</span>
    </div>
    <div class="replyList">
      <p class="latest">最新评论</p>
      <div class="user_comment" v-for="(item,index) in replyList" :key="index">
        <img :src="item.user.avatar" alt="">
        <div class="comment_detail">
          <div>
            <span>{{item.user.nickname}}</span>
            <van-icon name="good-job-o" />
          </div>
          <div>
            <p>{{item.message}}</p>
          </div>
          <div>
            <span>{{item.createTime | formatDate}}</span>
            <van-icon name="ellipsis" />
          </div>
        </div>
      </div>
      <div class="end">
        没有更多评论了~
      </div>
    </div>
    <div class="comment">
      <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2271514238,126097899&fm=26&gp=0.jpg" alt="">
      <input type="text" placeholder="点击发表你的评论">
      <van-icon name="chat-o" />
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

export default {
  data() {
    return {
      videoDetail: [],
      replyList:[],
      isLike:false,
      isStar:false
    };
  },
  created() {
    this.getVideoDetail()
    this.getComment()
  },
  mounted(){
    this.setStatus()
  },
  computed:{
    ...mapState(['collection'])
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    getVideoDetail() {
      this.$http.get(`/api/v1/video/${this.$route.query.id}`).then((res) => {
        // console.log(res)
        this.videoDetail = res.data
      })
    },
    getComment(){
      this.$http.get(`/api/v1/replies/video?id=${this.$route.query.id}`).then(res=>{
        this.replyList = res.data.replyList
      })
    },
    ...mapMutations(['starVideo','removeVideo']),
    star(item){
      if(this.isStar === false){
        this.starVideo(item)
        this.isStar = true
      }else{
        this.removeVideo(item)
        this.isStar = false
      }
    },
    setStatus(){
      let id = parseInt(this.$route.query.id)
      this.collection.forEach(item =>{
        if(item.id === id){
          this.isStar = true
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.isActive {
  color: red;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #404B5D;
  .wrap {
    width: 100%;
    height: 5.625rem;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000;
    z-index: 1;
    video {
      width: 100%;
      height: 100%;
    }
    .van-icon {
      position: absolute;
      top: .133333rem;
      left: .133333rem;
      font-size: .533333rem;
      color: #fff;
    }
  }
  .desc {
    margin-top: 5.625rem;
    padding: 0.266667rem;
    border-bottom: 1px solid #ccc;
    p {
      margin: 0;
      &:nth-child(1) {
        color: #fff;
        font-size: 0.4rem;
      }
      &:nth-child(2) {
        margin: 0.053333rem 0 0.186667rem;
        color: gray;
        font-size: 0.266667rem;
      }
      &:nth-child(3) {
        color: gray;
        font-size: 0.266667rem;
      }
    }
    .button {
      display: flex;
      margin: 0.4rem 0 0.133333rem;
      align-items: center;
      color: #E1E4E3;
      .van-icon {
        font-size: 0.533333rem;
        &:nth-child(n+2){
          margin-left: .4rem;
        }
      }
      span {
        margin-left: .133333rem;
        font-size: .24rem;
      }
    }
  }
  .relevant {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .author {
      width: 1.333333rem;
      height: 1.333333rem;
      border-radius: 50%;
      margin: 0 0.333333rem;
    }
    div {
      flex: 1;
      p{
        &:nth-child(1){
          color: #F7F9F8;
          font-size: .4rem;
        }
        &:nth-child(2){
          color: #D6DDDD;
          font-size: .266667rem;
        }
      }
    }
    span {
      padding: 0.106667rem;
      margin-right: 0.333333rem;
      font-size: .4rem;
      color: #fff;
      border: 1px solid #fff;
      border-radius: 0.133333rem;
    }
  }
  .replyList{
    margin-bottom: 2.666667rem;
    color: #fff;
    .latest{
      margin-left: .266667rem;
    }
    .user_comment{
      display: flex;
      padding: .133333rem 0;
      img{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin: 0 .266667rem;
      }
      .comment_detail{
        width: 100%;
        border-bottom: 1px solid #ccc;
        div{
          &:nth-child(1){
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
              max-width: 4rem;
              text-overflow: ellipsis;
              overflow: hidden;
              font-size: .4rem;
            }
          }
          &:nth-child(2){
            p{
              font-size: .293333rem;
            }
          }
          &:nth-child(3){
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
              font-size: .266667rem;
            }
          }
          .van-icon {
            font-size: .533333rem;
            margin-right: .133333rem;
          }
        }
      }
    }
    .end{
      margin-top: .533333rem;
      text-align: center;
      font-size: .24rem;
    }
  }
  .comment{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .266667rem 0;
    background-color: #313B4B;
    img{
      width: 1rem;
      border-radius: 50%;
      margin: 0 .266667rem;
    }
    input{
      flex: 1;
      padding: .133333rem;
    }
    .van-icon{
      margin: 0 .266667rem;
      font-size: .4rem;
      color: #fff;
    }
  }
}
</style>

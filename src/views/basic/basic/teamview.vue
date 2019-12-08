<template>
  <div class="user-activity">
<!--    <div class="post">-->
<!--      <div class="user-images">-->
<!--        <el-carousel :interval="6000" type="card" height="200px">-->
<!--          <el-carousel-item v-for="item in carouselImages" :key="item">-->
<!--            <img :src="item+carouselPrefix" class="image">-->
<!--          </el-carousel-item>-->
<!--        </el-carousel>-->
<!--      </div>-->
<!--    </div>-->
    <div class="search">
      <el-input placeholder="搜索社团" v-model="search" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="wrapper">
      <div class="post-2" v-for="club in list">
        <el-card :body-style="{ padding: '0px' }">
          <router-link :to="'/basic/clubdetails/'+club.associationId">
          <img :src=club.logoUrl class="image">
          </router-link>
          <div style="padding: 14px;">
            <span>{{club.name}}</span>
            <router-link :to="'/basic/clubdetails/'+club.associationId">
              <el-button type="text" class="button">查看详情</el-button>
            </router-link>
          </div>
        </el-card>
      </div>
    </div>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'
import { fetchList } from '@/api/club'
export default {
  data() {
    return {
      carouselImages: [
        'https://raw.githubusercontent.com/schedule-front/EveryWeekRePort/master/week3/img/post1.jpg',
        'https://raw.githubusercontent.com/schedule-front/EveryWeekRePort/master/week3/img/post2.jpg',
        'https://raw.githubusercontent.com/schedule-front/EveryWeekRePort/master/week3/img/post3.jpg',
        'https://raw.githubusercontent.com/schedule-front/EveryWeekRePort/master/week3/img/post4.jpg'
      ],
      avatarPrefix,
      carouselPrefix,
      search:'',
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 9
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.clubs
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-activity {
    padding: 10px 45px 10px 50px;
    .user-block {

      .username,
      .description {
        display: block;
        margin-left: 50px;
        padding: 2px 0;
      }

      .username{
        font-size: 16px;
        color: #000;
      }

      :after {
        clear: both;
      }

      .img-circle {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        float: left;
      }

      span {
        font-weight: 500;
        font-size: 12px;
      }
    }

    .post {
      font-size: 14px;
      border-bottom: 1px solid #d2d6de;
      margin-bottom: 10px;
      padding-bottom: 10px;
      color: #666;

      .image {
        width: 100%;
        height: 100%;

      }

      .user-images {
        padding-top: 20px;
      }
    }

    .list-inline {
      padding-left: 0;
      margin-left: -5px;
      list-style: none;

      li {
        display: inline-block;
        padding-right: 5px;
        padding-left: 5px;
        font-size: 13px;
      }

      .link-black {

        &:hover,
        &:focus {
          color: #999;
        }
      }
    }

  }
  .input-with-select .el-input-group__prepend {
    background-color: lightblue;
  }
  .search{
    text-align: center;
  }
  .input-with-select{
    width: 50%;
  }
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 300px;
    height: 300px;
    display: block;
  }
  .wrapper{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .page{
    text-align: center;
  }
  .post-2{
    margin: 20px;
    height: 420px;
    width: 300px;
    float: left;
  }
</style>


<template>
  <div class="user-activity">
    <div class="search">
      <el-input placeholder="搜索活动" v-model="search" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
      <div class="user-activities" v-loading="listLoading" v-for="activity in list">
        <div class="club-info">
          <div class="club-logo"> <img src="https://raw.githubusercontent.com/schedule-front/EveryWeekRePort/master/week3/img/club8.jpg" alt="" /></div>
          <div class="club-name">{{activity.name}}</div>
        </div>
        <div class="activity-info">{{activity.title}}
          <router-link :to="'/basic/activity/'+1">
<!--            activity.announcementId-->
            <el-button type="text" class="button">查看详情</el-button>
          </router-link>

        </div>
        <div class="post-time">{{activity.date}}</div>
      </div>
  </div>
</template>
<script>

import { fetchActivityList } from '@/api/activity'
export default {
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      // activities: [
      //   {announcementId：'', date='',title='',name:'',associationlogo:''}
      //   { club_logo: 'https://raw.githubusercontent.com/schedule-front/EveryWeekRePort/master/week3/img/club-pingpong.jpg', club_name: '乒乓球社', activity_info: '关于第一届‘乒乓争霸’活动的通知', post_time: '2019-11-23' },
      //   { club_logo: 'https://raw.githubusercontent.com/schedule-front/EveryWeekRePort/master/week3/img/club7.jpg', club_name: '书法社', activity_info: '关于“书法大家——书法展”活动的通知', post_time: '2019-11-23' },
      //   { club_logo: 'https://raw.githubusercontent.com/schedule-front/EveryWeekRePort/master/week3/img/club8.jpg', club_name: '象棋社', activity_info: '关于第一届‘南征北战——象棋比赛’活动的通知', post_time: '2019-11-23' },
      //   { club_logo: 'https://raw.githubusercontent.com/schedule-front/EveryWeekRePort/master/week3/img/club5.jpg', club_name: '篮球社', activity_info: '关于‘浙江大学城市学院第19届校运动会’活动的通知', post_time: '2019-11-23' },
      //   { club_logo: 'https://raw.githubusercontent.com/schedule-front/EveryWeekRePort/master/week3/img/club1.jpg', club_name: '青莲社', activity_info: '关于‘冲冲冲讲座’活动的通知', post_time: '2019-11-23' }
      //
      // ]
    }
  },
  created() {
    this.getList()
    console.log(this.getList())
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchActivityList().then(response => {
        this.list = response.data.activities
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
    .input-with-select .el-input-group__prepend {
      background-color: lightblue;
    }
    .input-with-select{
      width: 50%;
    }
    .search{
      text-align: center;
    }
    .user-activities{
      margin-top: 50px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      height: 120px;
      width: 100%;
      .club-info{
        height: 45%;
        .club-logo{
          padding-left: 30px;
          text-align: left;
          float: left;
          img{
            width: 75px;
            height: auto;
            border-radius: 40px;
            margin-top: -40px;
          }
        }
        .club-name{
          padding: 10px;
          font-weight: 500;
          font-size: 1em;
          color: gray;
        }
      }
      .activity-info{
        text-align: left;
        height: 30%;
        padding-left: 30px;
      }
      .post-time{
        text-align: left;
        height: 30%;
        padding-left: 30px;
        font-size: 0.5em;
        color: gray;
      }




    }

  }
</style>


<template>
  <div class="user-activity">
    <div class="search">
      <el-input placeholder="搜索活动" v-model="keyword" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
      </el-input>
    </div>
      <div class="user-activities" v-loading="listLoading" v-for="activity in list">
        <div class="club-info">
          <div class="club-logo"> <img :src="activity.logoUrl" alt="" /></div>
          <div class="club-name">{{activity.name}}</div>
        </div>
        <div class="activity-info">
          <div class="activity-title">
            {{activity.title}}
          </div>
          <div class="activity-button">
            <router-link :to="'/basic/activity/'+activity.activityId">
              <!--            activity.announcementId-->
              <el-button type="text" class="button">查看详情</el-button>
            </router-link>
          </div>

        </div>

        <div class="post-time">开始时间：{{activity.beginDate | formatDate}}</div>
        <div class="post-time2">结束时间：{{activity.endDate | formatDate}}</div>
      </div>
  </div>
</template>
<script>

import { fetchActivityList } from '@/api/activity'
import { search } from '@/api/activity'
export default {
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      keyword:''
    }
  },
  created() {
    this.getList()
    console.log(this.getList())
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  },
  methods: {
    getList() {
      if (this.keyword == null){
        this.listLoading = true
        fetchActivityList().then(response => {
          this.list = response.data.activities
          this.total = response.data.total
          this.listLoading = false
        })
      }
      else {
        this.listLoading = true
        search(this.keyword).then(response => {
          this.list = response.data.activities
          this.total = response.data.total
          this.listLoading = false
        })
      }
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
        height: 10%;
        padding-left: 30px;
        font-size: 0.5em;
        color: gray;
      }
      .post-time2{
        text-align: left;
        height: 10%;
        padding-left: 30px;
        font-size: 0.5em;
        color: gray;
      }
      .activity-title{
        float: left;
      }
      .activity-button{float: right;
      margin-right: 30px;
      margin-top: -10px}





    }

  }
</style>

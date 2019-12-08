
<template>
  <div class="user-activity">
    <div  v-loading="listLoading" class="user-activities">
      <div class="club-info">
        <div class="club-logo"> <img :src="activity.logoUrl" alt=""></div>
        <div class="club-name">{{ activity.name }}</div>
        <div class="grid-content bg-purple" style="margin-left: 900px;">开始时间：{{activity.beginDate | formatDate}}</div>
        <div class="grid-content bg-purple-light" style="margin-left: 900px; margin-bottom: 20px;">结束时间：{{activity.endDate | formatDate}}</div>
      </div>
      <div class="activity-info">
        <div class="activity-title" style="margin-top: 20px;">
          {{ activity.title }}
        </div>
        <div class="grid-content bg-purple" style="margin-left: 650px; margin-top: -17px;">地点：{{activity.location}}</div>
        <div class="grid-content bg-purple-light" style="margin-left: 650px;">人数：{{activity.numPeople}}</div>
      </div>

      <div>
        <div class="content-css">{{activity.content}}</div>
        <!-- <el-form-item  class="content-css" label-width="80px">
          <el-input v-model="this.activity.content" :rows="3" :disabled="true" type="textarea" class="content-textarea" placeholder="" />
        </el-form-item> -->
      </div>
      <!-- <el-row>
        <el-col :span="10"><div class="grid-content bg-purple">开始时间：{{activity.beginDate | formatDate}}</div></el-col>
        <el-col :span="10"><div class="grid-content bg-purple-light">结束时间：{{activity.endDate | formatDate}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><div class="grid-content bg-purple">地点：{{activity.location}}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light">人数：{{activity.numPeople}}</div></el-col>
      </el-row> -->

    </div>
  </div>
</template>
<script>

import { fetchActivity } from '@/api/activity'
export default {
  filters: {
    formatDate: function(value) {
      const date = new Date(value)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    }
  },
  data() {
    return {
      activity: null,
      total: 0,
      listLoading: true
    }
  },
  created() {
    const id = this.$route.params.id
    this.getList(id)
  },
  methods: {
    getList(id) {
      this.listLoading = true
      fetchActivity(id).then(response => {
        this.activity = response.data
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
        height: 50px;
        padding-left: 30px;
        font-size: 20px;
        color: gray;
      }
      .post-time2{
        text-align: left;
        height: 50px;
        padding-left: 30px;
        font-size: 20px;
        color: gray;
      }
      .activity-title{
        font-size: 25px;
        font-weight: 550;
        float: left;
      }
      .activity-button{float: right;
        margin-right: 30px;
        margin-top: -10px}

    }

    .el-row {
      margin-bottom: 0px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
      text-align: left;
      padding: 5px;
    }
    .bg-purple-dark {
      background: #ffffff;
    }
    .bg-purple {
      background: #ffffff;
    }
    .bg-purple-light {
      background: #ffffff;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .content-css{
      margin-left: 200px;
      margin-top: -24px;
      font-size: 18px;
      font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

  }
</style>

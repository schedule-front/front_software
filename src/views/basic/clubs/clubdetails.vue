<template>
  <div class="club-container">
    <div class="right">
      <div class="club-logo">

        <div class="club-logo-pic">
          <img :src="list.logoUrl" alt="" >
        </div>
        <div class="club-name">{{ list.name }}</div>
        <div class="president">社长：{{ president.name }}</div>
        <div class="stars">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          />
        </div>
      </div>
      <div class="club-awards">
        <div class="club-awards-title">获奖情况</div>
        <div v-for="award in awards" class="awards">{{ award.title }}</div>
      </div>
      <div class="join-div">
        <div class="join-button">
          <router-link :to="'/basic/clubapplicationform/'+associationId">
            <el-button round class="button">申请加入</el-button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="left">
      <div class="brief">
        <div class="club-info-title">社团简介</div>
        <div class="club-info-detail">{{list.introduction}}</div>

      </div>
      <div class="activities">
        <div class="club-activities-title">近期活动</div>
        <div class="user-activities" v-for="activity in activities">
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
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { fetchClub } from '@/api/club'
  import { fetchActivityList } from '@/api/activity'
  import { fetchAward } from '@/api/award'
  import { fetchActivityListById } from '@/api/activity'

  fetchAward
export default {
  name: 'Clubdetials',
  data() {
    return {
      list: null,
      president:null,
      activities:null,
      associationId:'',
      listLoading2:true,
      awards:''
    }
  },
  filters: {
    formatDate: function(value) {
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
  created() {
    const id = this.$route.params.id
    this.setAssociationId(id)
    this.getList(id)
    this.getList2(id)
    this.getList3(id)
  },
  methods: {
    setAssociationId(id){
      this.associationId=id
    },
    getList(id) {
      this.listLoading = true
      fetchClub(id).then(response => {
        this.list = response.data.association
        this.president=response.data.president
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getList2(id) {
      this.listLoading = true
      fetchActivityListById(id).then(response => {
        this.activities = response.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getList3(id) {
      this.listLoading = true
      fetchAward(id).then(response => {
        this.awards = response.data
        this.total = response.data.total
        this.listLoading = false
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  .club-container{
    padding: 10px 45px 10px 50px;
    .left{
      width: 60%;
      float: left;
      background-color: white;
      margin: 20px;
      margin-top: 75px;
      height: 500px;
      .brief{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-bottom: 30px;
        padding: 25px;
        .club-info-title{
          font-weight: 1000;
          font-size: 1em;
          color: gray;
      }
      }
      .activities{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 25px;
        .club-activities-title{
          font-weight: 1000;
          font-size: 1em;
          color: gray;
        }
        .club-activities{
          border-bottom: 1px solid #d2d6de;
        }
      }
    }
    .right{
      width: 30%;
      float: left;
      margin: 20px;
      margin-top: 75px;
      background-color: white;
      height: 500px;
      .club-logo{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        width: 100%;
        background-color: antiquewhite;
        .club-logo-pic{
          text-align: center;
          img{
            width: 150px;
            height: auto;
            border-radius: 75px;
            margin-top: -75px;
          }
        }
        .club-name{
          text-align: center;
          font-size: 2.0em;
          color: gray;
          font-weight: 1000;
        }
        .president{
          text-align: center;
          color: dimgray;
          font-size: 0.9em;
          margin-top: 3px;
          margin-bottom: 3px;
        }
        .stars{
          padding: 20px;
          text-align: center;
        }
      }
      .club-awards{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-top: 20px;
        padding: 20px;
        background-color: lightblue;
        text-align: center;
        .club-awards-title{
          font-weight: 1000;
          font-size: 2em;
          color: gray;
          padding-bottom: 20px;
        }
        .awards{
          font-weight: 1000;
          font-size: 1em;
          color: black;
        }
      }
      .join-div{
        margin-top: 20px;
        text-align: center;
      }
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
        padding: 30px;
        padding-top: 40px;
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

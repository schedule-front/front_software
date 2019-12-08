<template>
  <div class="club-container">
    <div class="right">
      <div class="club-logo">

        <div class="club-logo-pic">
          <img :src="logo" alt="" >
        </div>
        <div class="club-name">{{ title }}</div>
        <div class="president">社长：{{ president }}</div>
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
        <div v-for="award in awards" class="awards">{{ award.message }}</div>
      </div>
      <div class="join-div">
        <div class="join-button">
          <router-link :to="'/basic/clubapplicationform/'+1">
            <el-button round class="button">申请加入</el-button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="left">
      <div class="brief">
        <div class="club-info-title">社团简介</div>
        <div class="club-info-detail">{{ clubInfoDetail }}</div>

      </div>
      <div class="activities">
        <div class="club-activities-title">近期活动</div>
        <div v-for="activity in activities" class="club-activities">
          <div class="club-activity-info">{{ activity.ac_title }}</div>
          <div class="club-activity-info">{{ activity.time }}</div>
          <div class="club-activity-info">{{ activity.ac_info }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { fetchClub } from '@/api/club'
export default {
  name: 'Clubdetials',
  data() {
    return {
      list:''
    }
  },
  created() {
    const id = this.$route.params.id
    this.getList(id)
  },
  methods: {
    getList(id) {
      this.listLoading = true
      fetchClub(id).then(response => {
        this.list = response.data.clubs
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
  }
</style>

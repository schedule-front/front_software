<template>
  <div class="club-container">
    <div class="right">
      <el-table
        :data="member"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="userid"
          label="学号"
          width="100"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="100"
        />
        <el-table-column
          prop="gender"
          label="性别"
          width="50"
        />
        <el-table-column
          prop="class"
          label="班级"
          width="100"
        />
        <el-table-column
          prop="major"
          label="专业"
        />
        <el-table-column
          prop="phone"
          label="电话"
          width="100"
        />
        <el-table-column
          prop="duty"
          label="职位"
          width="80"
        />
      </el-table>
    </div>
    <div class="left">
      <div class="block">
        <el-timeline>
          <el-timeline-item v-for="(a,index) of ann" :key="index" :timestamp="item.date" placement="top">
            <el-card>
              <h4>{{ item.title }}</h4>
              <p>{{ item.content }}</p>
              <el-button type="text" class="button">操作按钮</el-button>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { fetchMyClubDetail } from '@/api/club'
import { fetchAnnList } from '@/api/announcement'

export default {
  name: 'Clubdetials',
  data() {
    return {
      member: null,
      ann: null,
      listQuery: {
        page: 1,
        limit: 10,
        associationId: ''
      }
    }
  },
  created() {
    const id = this.$route.params.id
    this.getList(id)
    this.setId(id)
    this.getAnn(this.listQuery)
    this.parseTime()
  },
  methods: {
    getList(id) {
      this.listLoading = true
      fetchMyClubDetail(id).then(response => {
        this.member = response.data.member
        this.total = response.data.total
        this.listLoading = false
      })
    },
    setId(id) {
      this.listQuery.associationId = id
    },
    getAnn(listQuery) {
      this.listLoading = true
      fetchAnnList(listQuery).then(response => {
        this.ann = response.data
        this.total = response.data.total
        this.listLoading = false
      })
    }
    // parseTime() {
    //   this.ann.forEach((item) => {
    //     item.date = new Date(parseInt(item.date) * 1000).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
  .club-container{
    padding: 10px 45px 10px 50px;
    .left{
      width: 40%;
      float: right;
      background-color: white;
      margin: 20px;
      margin-top: 75px;
      height: auto;
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
      width: 50%;
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

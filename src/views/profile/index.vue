<template>
  <div class="all">
    <el-card style="margin-bottom:20px;" class="a">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>

      <div class="user-profile">
        <!--      <div class="box-center">-->
        <!--        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">-->
        <!--          <div>Hello</div>-->
        <!--          {{ user.role }}-->
        <!--        </pan-thumb>-->
        <!--      </div>-->
        <div class="box-center">
          <div class="user-name text-center">{{info.name}}</div>
          <div class="user-role text-center text-muted">{{info.userId}}</div>
          <div class="user-role text-center text-muted">{{info.gender}}</div>
        </div>
      </div>

      <div class="user-bio">
        <div class="user-education user-bio-section">
          <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>Education</span></div>
          <div class="user-bio-section-body">
            <div class="text-muted">
              {{info.major}}
            </div>
            <p></p>
            <div class="text-muted">
              {{info.userClass}}
            </div>
            <p></p>
            <div class="text-muted">
              TEL：{{info.phone | noneJudge}}
            </div>
            <p></p>
            <div class="pwd-modify-button">
              <router-link :to="'/profile/pwd/'">
                <el-button size="small" icon="el-icon-edit">
                  修改密码
                </el-button>
              </router-link>
            </div>
          </div>
        </div>

        <!--      <div class="user-skills user-bio-section">-->
        <!--        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>Skills</span></div>-->
        <!--        <div class="user-bio-section-body">-->
        <!--          <div class="progress-item">-->
        <!--            <span>Vue</span>-->
        <!--            <el-progress :percentage="70" />-->
        <!--          </div>-->
        <!--          <div class="progress-item">-->
        <!--            <span>JavaScript</span>-->
        <!--            <el-progress :percentage="18" />-->
        <!--          </div>-->
        <!--          <div class="progress-item">-->
        <!--            <span>Css</span>-->
        <!--            <el-progress :percentage="12" />-->
        <!--          </div>-->
        <!--          <div class="progress-item">-->
        <!--            <span>ESLint</span>-->
        <!--            <el-progress :percentage="100" status="success" />-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->
      </div>
    </el-card>
  </div>

</template>
<script>
import { mapGetters } from 'vuex'
import {getInfobyId} from '@/api/user'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      info:''
    }
  },
  filters: {
    noneJudge: function(val) {
      if (val === '') return "none"
      return val
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'associations',
      'userid'
    ])
  },
  created() {
    const userId=this.userid
    this.getInfo(userId)
  },
  methods: {
    getInfo(userId){
      this.listLoading = true
      getInfobyId(userId).then(response => {
        this.info = response.data
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .all{
    padding: 20px;
    text-align: center;
  }
  .a{width: 30%}
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }

  .user-profile {
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;

    span {
      padding-left: 4px;
    }

    .user-bio-section {
      font-size: 14px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
</style>

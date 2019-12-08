
<template>
  <div class="user-activity">
    <div class="add-button">
      <router-link :to="'/manager/createclub/'">
        <el-button type="primary">创建社团</el-button>
      </router-link>

    </div>
    <div v-for="club in list" v-loading="listLoading" class="user-activities">
      <div class="club-info">
        <div class="club-logo"> <img :src="club.logoUrl" alt=""></div>
        <div class="club-name">{{ club.name }}</div>
      </div>
      <div class="detail-button">
        <router-link :to="'/manager/changepresident/'+club.associationId">
          <el-button type="text" class="button">更换社长</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>

  import { fetchList } from '@/api/club'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      userId: '',
      query: {
        page: 1,
        limit: 200
      }

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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.query).then(response => {
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
    .user-activities{
      margin-top: 50px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      height: 120px;
      width: 100%;
      .add-button .el-button{
        margin-top: 50px;
      }
      .club-info{
        height: 45%;
        float: left;
        width: 300px;
        .club-logo{
          padding-left: 30px;
          text-align: left;
          float: left;
          img{
            width: 75px;
            height: auto;
            border-radius: 40px;
            margin-top: 20px;
          }
        }
        .club-name{
          padding: 10px;
          margin-top: 35px;
          font-weight: 500;
          font-size: 30px;
          float: left;
          color: gray;
        }

      }
      .detail-button{
        float: right;
        margin: 45px;
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

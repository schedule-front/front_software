<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="学号" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.userId}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>





      <el-table-column min-width="300px" label="申请理由">
        <template slot-scope="{row}">
          <router-link :to="'/team/formdetail/'+row.joinFormId" class="link-type">
            <span>{{ row.reason }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="查看详情" width="120">
        <template slot-scope="scope">
          <router-link :to="'/team/formdetail/'+scope.row.joinFormId">
            <el-button type="primary" size="small" icon="el-icon-edit">
              查看详情
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchJoinFormList } from '@/api/joinform'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { mapGetters } from 'vuex'
export default {
  name: 'ActivityList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        已通过: 'success',
        待审核: '',
        草稿: 'info',
        被驳回: 'danger'
        // Noted by qudrx , These lines are seems used to color status on webpage
        // published: 'success',
        // draft: 'info',
        // deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // list: [
      //   {id:'1',author:'曹隆翔',title: '亲爱的社联组织领导: 我是本校外语专业的学生,非常热爱英语专业,尤其擅长英语口语,通过一年的观...',status: '待审核'},
      //   {id:'2',author:'金旻儒',title: '希望通过建立这个社团来尽可能为这些同学提供一个英语学习的平台。虽然学校里...',status: '待审核'},
      //   {id:'3',author:'陈凯隆',title: '我们抱着为广大英语爱好者提供一个好的交流平台和表现自我舞台的宗旨，希望能成立这么一个...',status: '待审核'},
      //   {id:'4',author:'沈臻阳',title: '我们学校对英语感兴趣的人还不少，所以我希望能通过组织一个专...',status: '已通过'}
      // ],
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        associationId:'',
        page: 1,
        limit: 20
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'associations',
      'userid',
      'presidentOf'
    ])
  },
  created() {
    this.getUser()
    this.getList(this.associationId)
  },
  methods: {
    getUser() {
      this.userId = this.userid
      this.listQuery.associationId = this.presidentOf
    },
    getList() {
      this.listLoading = true
      fetchJoinFormList(this.listQuery).then(response => {
        this.list = response.data.joinForms
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

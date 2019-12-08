<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="学号" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.userId}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status | statusFilter2}}
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
          <router-link :to="'/team/joinformdetail/'+row.joinFormId" class="link-type">
            <span>{{ row.reason }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="查看详情" width="120">
        <template slot-scope="scope">
          <router-link :to="'/team/joinformdetail/'+scope.row.joinFormId">
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
          pass: 'success',
          check: 'check',
          reject: 'danger'
          // Noted by qudrx , These lines are seems used to color status on webpage
          // published: 'success',
          // draft: 'info',
          // deleted: 'danger'
        }
        return statusMap[status]
      },
      statusFilter2(status) {
        const statusMap = {
          pass: '已通过',
          check: '未审核',
          reject: '已拒绝'
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

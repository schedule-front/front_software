<template>
  <div class="app-container">
    <el-table v-loading="listLoading"  :data="ann"  border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="发布时间" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.date |formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="内容">
        <template slot-scope="{row}">
            <span>{{ row.content }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="删除" width="120">
        <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-delete">
              删除
            </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { fetchAnnList } from '@/api/announcement'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { mapGetters } from 'vuex'
export default {
  name: 'ActivityList',
  components: { Pagination },
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
    },
    statusFilter(status) {
      const statusMap = {
        已发布: 'success',
        // 待审核: '',
        // 草稿: 'info',
        已撤回: 'danger'
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
      ann: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        associationId: '0'
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
    this.getAnn(this.listQuery)
  },
  methods: {
    getUser() {
      this.userId = this.userid
    },
    getAnn(listQuery) {
      this.listLoading = true
      fetchAnnList(listQuery).then(response => {
        this.ann = response.data
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

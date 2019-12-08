<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="学号" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="专业" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.major }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.clasS }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="性别" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="角色">
        <template slot-scope="scope">
          <span>{{ scope.row.role }}</span>
        </template>
      </el-table-column>





      <el-table-column min-width="120px" label="电话号码" align="center">
        <template slot-scope="{row}">
          <router-link :to="'/team/activityedit'" class="link-type">
            <span>{{ row.phone }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="详情" width="120">
        <template slot-scope="scope">
          <router-link :to="'/team/activityedit'">
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
  import { fetchList } from '@/api/article'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'ActivityList',
    components: { Pagination },
    filters: {
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
        list: [
          {userId:'1',clasS:'计算机1703',major: '计算机科学与技术',name: '曹隆翔',phone:'15989565656',role:'成员',gender:'男'},
          {userId:'2',clasS:'计算机1703',major: '计算机科学与技术',name: '陈凯隆',phone:'14545455656',role:'社长',gender:'男'},
          {userId:'3',clasS:'计算机1703',major: '计算机科学与技术',name: '沈臻阳',phone:'11321655656',role:'成员',gender:'男'},
          {userId:'4',clasS:'计算机1703',major: '计算机科学与技术',name: '金旻儒',phone:'15645645456',role:'成员',gender:'男'},

        ],
        total: 0,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20
        }
      }
    },
    // created() {
    //   this.getList()
    // },
    // methods: {
    //   getList() {
    //     this.listLoading = true
    //     fetchList(this.listQuery).then(response => {
    //       this.list = response.data.items
    //       this.total = response.data.total
    //       this.listLoading = false
    //     })
    //   }
    // }
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

<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="活动编号" width="105">
        <template slot-scope="scope">
          <span>{{ scope.row.activityId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请社团" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" align="center" label="活动名称" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
            <el-table-column align="center" label="活动地点" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开始时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.beginDate | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结束时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.endDate | formatDate  }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row.status | chinese }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="详情" width="120">
        <template slot-scope="scope">
          <router-link :to="'/manager/activitycheck/'+ scope.row.activityId">
            <el-button type="primary" size="small" icon="el-icon-edit">
              审批
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
  import { fetchActivityListt } from '@/api/huodong'
  import { fetchClub } from '@/api/club'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'ActivityListt',
    components: { Pagination },
    filters: {
      statusFilter(status) {
        const statusMap = {
          check: 'info',
          pass: 'success',
          reject: 'danger'
          // Noted by qudrx , These lines are seems used to color status on webpage
          // published: 'success',
          // draft: 'info',
          // deleted: 'danger'
        }
        return statusMap[status]
      },
      formatDate: function (value) {
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
      },
      chinese(status) {
        const statusMap = {
          check: '待审批',
          pass: '已通过',
          reject: '未通过'
        }
        return statusMap[status]
      },
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        }
      }
    },
    created() {
      this.getList()
    },
    // computed: {
    //   Display(timestamp) {
    //     // return new Date(val)
    //     var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    //     var Y = date.getFullYear() + '-';
    //     var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    //     var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    //     var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    //     var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    //     var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    //     return Y+M+D+h+m+s;
    //   }
    // },
    methods: {
      getList() {
        this.listLoading = true
        fetchActivityListt(this.listQuery).then(response => {
          this.list = response.data.activities
          // this.list = response.data.items
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

<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="member" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="学号" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.userid }}</span>
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
          <span>{{ scope.row.class }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="性别" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="角色">
        <template slot-scope="scope">
          <span>{{ scope.row.duty }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="电话号码" align="center">
        <template slot-scope="{row}">
            <span>{{ row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="详情" width="120">
        <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="handleClick(scope.row);open2()" >
              踢除成员
            </el-button>
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>

<script>
import { fetchMyClubDetail } from '@/api/club'
import { deleteMember } from '@/api/club'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      member: null,
      total: 0,
      listLoading: true,
      userId: '',
      associationId: '',
      query:{
        associationId:'',
        userId:''
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
    handleClick(row) {
      this.query.userId=row.userid
      console.log(this.query)
      deleteMember(this.query)
    },
    getUser() {
      this.userId = this.userid
      this.associationId = this.presidentOf
      this.query.associationId=this.presidentOf
    },
    getList(id) {
      this.listLoading = true
      fetchMyClubDetail(id).then(response => {
        this.member = response.data.member
        this.total = response.data.total
        this.listLoading = false
      })
    },
    open2() {
      this.$message({
        message: '操作成功',
        type: 'success'
      });
      window.location.reload()
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

<template>
  <div class="club-container">
    <div class="club-container-box">
      <div class="a-div" style="margin-left: 30px;">
        姓名：
        <el-input v-model="info.name" placeholder="Unknown" class="a-input1" />
      </div>
      <div class="a-div" style="margin-left: 30px;">
        性别：
        <el-radio v-model="info.gender" label="男">男</el-radio>
        <el-radio v-model="info.gender" label="女">女</el-radio>
      </div>
      <div class="'a-div" style="margin-left: 30px;">
        学号：
        <el-input v-model="info.userId" placeholder="Unknown" class="a-input1" />
      </div>
      <div class="a-div" style="margin-left: 30px;">
        班级：
        <el-input v-model="info.userClass" placeholder="Unknown" class="a-input1" />
      </div>
      <div class="a-div">
        联系方式：
        <el-input v-model="info.phone" placeholder="Unknown" class="a-input1" />
      </div>
      <div class="b-div">
        兴趣爱好：
        <el-input
          v-model="list.interests"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="兴趣爱好"
          class="a-input2"
        />
      </div>
      <div class="b-div">
        获奖情况：
        <el-input
          v-model="list.experiences"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="获奖情况"
          class="a-input2"
        />
      </div>
      <div class="b-div">
        申请理由：
        <el-input
          v-model="list.reason"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="申请理由"
          class="a-input2"
        />
      </div>

    </div>
    <div class="club-container-title" style="margin-left: 400px; margin-top: 2px;">申请表</div>
    <div class="button" v-if="list.status==='check'" style="margin-left: 400px; margin-top: 4px;">
      <el-button @click.native.prevent="acceptJoin">同意</el-button>
      <el-button @click.native.prevent="rejectJoin">拒绝</el-button>
    </div>
    <div class="status" v-else-if="list.status==='pass'" style="margin-left: 400px; margin-top: 4px;"><el-tag
      type="success"
      effect="dark" >
      已同意
    </el-tag>
    </div>

    <div class="status" v-else-if="list.status==='reject'" style="margin-left: 400px; margin-top: 4px;"><el-tag
      type="danger"
      effect="dark">
      已拒绝
    </el-tag>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
import { fetchJoinform } from '@/api/joinform'
import { accept } from '@/api/joinform'
import { reject } from '@/api/joinform'
import { getInfobyId } from '@/api/user'
getInfobyId
import { mapGetters } from 'vuex'
export default {
  name: 'Clubapplicationform',
  data() {
    return {
      list: null,
      info: null,
      data: {
        userId: '',
        interests: '',
        experiences: '',
        reason: '',
        associationId: '',
        date: ''
      },
      userId: ''
    }
  }, computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'userid'
    ])
  },
  created() {
    const id = this.$route.params.id

    this.getList(id)

    // this.createForm(data)
  },
  methods: {

    getList(id) {
      this.listLoading = true
      fetchJoinform(id).then(response => {
        this.list = response.data
        this.userId = response.data.userId
        this.total = response.data.total
        this.listLoading = false
        getInfobyId(this.userId).then(response => {
          this.info = response.data
          this.listLoading = false
        })
      })
    },
    getInfo(id) {
      this.listLoading = true
      getInfobyId(id).then(response => {
        this.info = response.data
        this.listLoading = false
      })
    },
    acceptJoin() {
      accept(this.list.joinFormId)
      window.location.reload()
    },
    rejectJoin(){
      reject(this.list.joinFormId)
      window.location.reload()
    }

  }

}
</script>

<style lang="scss" scoped>
  .club-container {
    border-radius: 30px;
    border: solid lightgray;
    margin: 30px;
    padding: 10px 45px 10px 50px;
    .a-div{
      margin-top: 20px;
      height: 50px;
    }
    .b-div{
      margin-top: 20px;
      height: 80px;
    }
    .a-input1{
      width: 150px;
    }
    .a-input2{
      width: 80%;
    }

  }
  .club-container-title{
    width: 120px;
    background-color: white;
    position: absolute;
    left: 80px;
    top: 15px;
    font-size: 2em;
    text-align: center;
  }
</style>

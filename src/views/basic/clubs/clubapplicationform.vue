<template>
  <div class="club-container">
    <div class="club-container-box">
      <el-form ref="data" :rules="rules" :model="data" label-width="500px">
      <!--    <div class="a-div">-->
      <!--      姓名：-->
      <!--      <el-input v-model="data.name" placeholder="姓名" class="a-input1" />-->
      <!--    </div>-->
      <!--    <div class="a-div">-->
      <!--      性别：-->
      <!--      <el-radio v-model="data.gender" label="男">男</el-radio>-->
      <!--      <el-radio v-model="data.gender" label="女">女</el-radio>-->
      <!--    </div>-->
      <!--    <div class="'a-div">-->
      <!--      学号：-->
      <!--      <el-input v-model="data.schoolId" placeholder="学号" class="a-input1" />-->
      <!--    </div>-->
      <!--    <div class="a-div">-->
      <!--      班级：-->
      <!--      <el-input v-model="data.clasS" placeholder="班级" class="a-input1" />-->
      <!--    </div>-->
      <!--    <div class="a-div">-->
      <!--      联系方式：-->
      <!--      <el-input v-model="data.phone" placeholder="联系方式" class="a-input1" />-->
      <!--    </div>-->
      <el-form-item  style="margin-top: 20px;" label="兴趣爱好：" prop="interests" label-width="80px;">
        <el-input
          v-model="data.interests"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="兴趣爱好"
          class="a-input2"
        />
      </el-form-item>
      <el-form-item style="margin-top: 10px;" label="获奖情况：" prop="experiences" label-width="80px;">
        <el-input
          v-model="data.experiences"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="获奖情况"
          class="a-input2"
        />
      </el-form-item>
      <el-form-item style="margin-top: 10px;" label="申请理由：" prop="reason" label-width="80px;">
        <el-input
          v-model="data.reason"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="申请理由"
          class="a-input2"
        />
      </el-form-item>

      </el-form>
    </div>
    <div class="club-container-title" style="margin-left: 300px;">申请表</div>
    <el-button @click.native.prevent="createForm('data')" style="margin-left: 320px;">提交</el-button>
  </div>

</template>

<script type="text/ecmascript-6">
import { createJoinForm } from '@/api/joinform'
import { mapGetters } from 'vuex'
export default {
  name: 'Clubapplicationform',
  data() {
    return {
      data: {
        userId: '',
        interests: '',
        experiences: '',
        reason: '',
        associationId: '',
        date: ''
      },
      rules: {
        interests: [{ required: true, message: '请输入兴趣爱好', trigger: 'blur' }],
        experiences: [{ required: true, message: '如果没有，请填写【无】', trigger: 'blur' }],
        reason:  [{  required: true, message: '请输入申请理由', trigger: 'blur' }],
      }
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
    const data = this.data
    this.setAssociationId(id)
    this.getUser()
    // this.createForm(data)
  },
  methods: {
    getUser() {
      this.data.userId = this.userid
    },
    setAssociationId(id) {
      this.data.associationId = id
    },
    createForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.data.date = new Date().get
            createJoinForm(this.data)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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

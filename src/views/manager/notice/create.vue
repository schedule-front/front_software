<template>
  <div class="club-container">
    <div class="club-container-box">
      <el-form ref="data" :rules="rules" :model="data" label-width="500px">

       <el-form-item style="margin-top: 10px;" label="活动名称：" prop="title" label-width="80px;">
        <el-input
          v-model="data.title"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 1}"
          placeholder="活动名称"
          class="a-input2"
        />
       </el-form-item>

      <el-form-item style="margin-top: 10px;" label="活动简介：" prop="content" label-width="80px;">
        <el-input
          v-model="data.content"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 3}"
          placeholder="活动简介"
          class="a-input2"
        />
      </el-form-item>

      <el-form-item style="margin-top: 10px;" label="活动时间：" prop="date" label-width="80px;" required>
        <div class="block">
          <el-date-picker
            v-model="data.date"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          />
        </div>
      </el-form-item>

      </el-form>

      <el-button style="margin-top: 10px; margin-left: 440px" @click.native.prevent="createForm('data')">提交</el-button>
    </div>
    <div class="club-container-title" style="margin-left: 100px;">通知发布</div>
  </div>

</template>

<script type="text/ecmascript-6">

import { addAnnouncement } from '@/api/announcement'
import { mapGetters } from 'vuex'
export default {
  name: 'Activity',
  data() {
    return {
      data: {
        title: '',
        content: '',
        date: '',
        userId: '',
        associationId: 0,
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        date: [
          { type: 'date', required: true, message: '请选择日期和时间', trigger: 'change' }
        ],
      }
    }
  }, computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'userid',
      'presidentOf'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.data.userId = this.userid
    },
    // setAssociationId(id) {
    //   this.data.associationId = id
    // },
    createForm() {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addAnnouncement(this.data)
            this.$message({
              message: '发布成功',
              type: 'success'
            });
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
    .title_name{
      width: 100px;
      float: left;
    }
    .a-div{
      margin-top: 20px;
      height: 40px;
    }
    .b-div-1{
      margin-top: 20px;
      height: 40px;
    }
    .b-div{
      margin-top: 20px;
      height: 85px;
    }
    .a-input1{
      width: 150px;
      float: left;
    }
    .a-input2{
      width: 80%;
      float: left;
    }

  }
  .club-container-title{
    width: 180px;
    background-color: white;
    position: absolute;
    left: 380px;
    top: 15px;
    font-size: 2em;
    text-align: center;
  }
  // .club-button{
  //   align: center;
  // }
</style>

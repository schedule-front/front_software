<template>
  <div class="club-container">
    <div class="club-container-box">

      
    <el-form :model="data" status-icon :rules="rules" ref="data" label-width="100px" class="ruleForm-container">
        <el-form-item label="旧密码" prop="oldpwd">
            <el-input type="password" v-model="data.oldpwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpwd">
            <el-input type="password" v-model="data.newpwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="data.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 280px;">
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm('data')">重置</el-button>
        </el-form-item>
    </el-form>
      
    </div>
    <div class="club-container-title">密码修改</div>
  </div>

</template>

<script type="text/ecmascript-6">

import { modifypwd } from '@/api/user'
import { mapGetters } from 'vuex'
import crypto from 'crypto'
export default {
  name: 'ModifyPwd',
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.data.checkPass !== '') {
            this.$refs.data.validateField('checkPass');
          }
          callback();
        }
    };
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.data.newpwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
    };
    var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        callback();
    };
    return {
        data: {
          oldpwd: '',
          newpwd: '',
          checkPass: '',
        },
        rules: {
          oldpwd: [
            { validator: validatePass3, trigger: 'blur' }
          ],
          newpwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
    }
  },
  methods: {
    submitForm() {

        var md5 = crypto.createHash("md5")
        md5.update(this.data.oldpwd)
        this.data.oldpwd = md5.digest('hex')
        var md55 = crypto.createHash("md5")
        md55.update(this.data.newpwd)
        this.data.newpwd = md55.digest('hex')

        modifypwd(this.data)
        .then( response => {
            if (this.message === '密码修改成功')
                this.$message({
                    message: '密码修改成功',
                    type: 'success'
                });
            else
                this.$message({
                    message: '原密码错误',
                    type: 'error'
                });
        })
        .catch(() => {
            this.loading = false
        })
    },
    // showPwd() {
    //   if (this.passwordType === 'password') {
    //     this.passwordType = ''
    //   } else {
    //     this.passwordType = 'password'
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.password.focus()
    //   })
    // },
    resetForm(formName) {
        this.$refs[formName].resetFields();
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
    .ruleForm-container{
        margin-top: 40px;
    }
  }
  .club-container-title{
    width: 180px;
    background-color: white;
    position: absolute;
    left: 450px;
    top: 15px;
    font-size: 2em;
    text-align: center;
  }
</style>

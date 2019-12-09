<template>
  <div class="club-container">
    <div class="club-container-box">

      <el-form ref="data" :rules="rules" :model="data" label-width="500px">

      <el-form-item  style="margin-top: 30px;" label="奖项名称：" prop="title" label-width="80px;">
        <el-input v-model="data.title" placeholder="" class="a-input1" />
      </el-form-item>

      <el-form-item style="margin-top: 10px;" label="获得时间：" prop="date" label-width="80px;" required>
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

      <el-button style="margin-top: 10px; margin-left: 450px" @click.native.prevent="createForm('data')">提交</el-button>
    </div>
    <div class="club-container-title" style="margin-top: 10px; margin-left: 400px">增加奖项</div>
  </div>

</template>

<script type="text/ecmascript-6">
import { addAward } from '@/api/award'
import { changePresident } from '@/api/club'
import { mapGetters } from 'vuex'
export default {
  name: 'Activity',
  data() {
    return {
      data: {
        title: '',
        date: ''
      },
      rules: {
        title: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        date: [
          { type: 'date', required: true, message: '请选择日期和时间', trigger: 'change' }
        ]
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
    this.setAId(id)
    this.getInfo(id)
  },
  methods: {
    setAId(id) {
      this.data.associationId = id
    },
    createForm(formName) {
       this.$refs[formName].validate((valid) => {
          if (valid) {
            addAward(this.data)
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
      width: 800px;
      float: left;
    }
    .a-input2{
      width: 100%;
      float: left;
    }

  }
  .club-container-title{
    width: 160px;
    background-color: white;
    position: absolute;
    left: 80px;
    top: 15px;
    font-size: 2em;
    text-align: center;
  }
</style>

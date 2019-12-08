<template>
  <div class="club-container">
    <div class="club-container-box">
      <div class="b-div-1">
        <div class="title_name" style="margin-top: 6px;">活动名称：</div>
        <el-input
          v-model="data.title"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 1}"
          placeholder="活动名称"
          class="a-input2"
        />
      </div>

      <div class="b-div">
        <div class="title_name" style="margin-top: 6px;">活动简介：</div>
        <el-input
          v-model="data.content"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 3}"
          placeholder="活动简介"
          class="a-input2"
        />
      </div>

      <div class="a-div">
        <div class="title_name" style="margin-top: 6px;">活动时间：</div>
        <div class="block">
          <el-date-picker
            v-model="data.date"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          />
        </div>
      </div>

      <el-button style="margin-top: 10px; margin-left: 450px" @click.native.prevent="createForm" @click="open2()">提交</el-button>
    </div>
    <div class="club-container-title" style="margin-left: 400px;">通知发布</div>
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
        associationId:''
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
      this.data.associationId=this.presidentOf
      this.data.userId = this.userid
    },
    // setAssociationId(id) {
    //   this.data.associationId = id
    // },
    createForm() {
      addAnnouncement(this.data)
    },
    open2() {
      this.$message({
        message: '发布成功',
        type: 'success'
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
    left: 80px;
    top: 15px;
    font-size: 2em;
    text-align: center;
  }
</style>

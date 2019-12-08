<template>
  <div class="club-container">
    <div class="club-container-box">
      <div class="a-div">
        <div class="title_name">社团名称：</div>
        <el-input v-model="data.name" placeholder="社团名称" class="a-input1" />
      </div>
      <div class="a-div">
        <div class="title_name">社长学号：</div>
        <el-input v-model="data.presidentId" placeholder="社长学号" class="a-input1" />
      </div>
      <div class="a-div">
        <div class="title_name">社团logo：</div>
        <el-input v-model="data.logoUrl" placeholder="图片链接" class="a-input1" />
      </div>
      <div class="a-div">
        <div class="title_name">创立时间：</div>
        <div class="block">
          <el-date-picker
            v-model="data.establishedTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          />
        </div>
      </div>

      <el-button @click.native.prevent="createForm">提交</el-button>
    </div>
    <div class="club-container-title">创建社团</div>
  </div>

</template>

<script type="text/ecmascript-6">

import { createClub } from '@/api/club'
import { mapGetters } from 'vuex'
export default {
  name: 'Activity',
  data() {
    return {
      data: {
        name: '',
        presidentId: '',
        logoUrl: '',
        establishedTime: ''
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
  },
  methods: {
    createForm() {
      createClub(this.data)
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
    width: 160px;
    background-color: white;
    position: absolute;
    left: 80px;
    top: 15px;
    font-size: 2em;
    text-align: center;
  }
</style>

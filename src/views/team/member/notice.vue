<template>
  <div class="club-container">
    <div class="a-div">
      社团名称：
      <el-input v-model="club_name" placeholder="社团名称" class="a-input1"/>
    </div>
    <div class="a-div">
      时间：
      <el-input v-model="time" placeholder="时间" class="a-input1"/>
    </div>
    <div class="a-div">
      地点：
      <el-input v-model="place" placeholder="地点" class="a-input1"/>
    </div>
    <div class="a-div">
      人数：
      <el-input v-model="number" placeholder="人数" class="a-input1"/>
    </div>
    <div class="a-div">
      联系电话：
      <el-input v-model="contact" placeholder="联系方式" class="a-input1"/>
    </div>
    <div class="'a-div">
      活动名称：
      <el-input v-model="title" placeholder="活动名称" class="a-input1"/>
    </div>
    <div class="b-div">
      活动简介：
      <el-input
        v-model="detail"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="活动简介"
        class="a-input2"
      />
    </div>
    <el-button>提交</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Clubapplicationform',
    data() {
      return {
        club_name: '',
        president: '',
        place: '',
        time: '',
        number: '',
        title: '',
        detail: '',
        contact:''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .club-container {
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
</style>

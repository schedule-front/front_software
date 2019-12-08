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
<!--    <el-button>提交</el-button>-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Clubapplicationform',
    data() {
      return {
        club_name: '乒乓球社',
        president: '陈凯隆',
        place: '南校区老体育馆',
        time: '2018-10-29',
        number: '40',
        title: '关于第一届‘乒乓争霸’活动的通知',
        detail: '为进一步满足辖区青年职工的情感需求,为广大单身青年职工提供更多相识、相知、相亲的机会,营造祖庙街道“暖心”“留心”的浓厚氛围,打造新时期工会服务职工的特色品牌',
        contact:'18888888888'
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

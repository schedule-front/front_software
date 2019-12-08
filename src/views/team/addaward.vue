<template>
  <div class="club-container">
    <div class="club-container-box">
      <div class="a-div">
        <div class="title_name" style="margin-top: 6px;">奖项名称：</div>
        <el-input v-model="data.title" placeholder="" class="a-input1" />
      </div>
      <div class="a-div">
        <div class="title_name" style="margin-top: 6px;">获得时间：</div>
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

      <el-button style="margin-top: 10px; margin-left: 450px" @click.native.prevent="createForm">提交</el-button>
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
    createForm() {
      addAward(this.data)
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

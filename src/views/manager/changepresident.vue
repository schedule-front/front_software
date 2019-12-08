<template>
  <div class="club-container">
    <div class="club-container-box">
      <div class="a-div">
        <div class="title_name">社团名称：</div>
        <el-input v-model="list.name" placeholder="" class="a-input1" :disabled="true" />
      </div>
      <div class="a-div">
        <div class="title_name">原社长学号：</div>
        <el-input v-model="list.duityToUsers['president'][0]" placeholder="" class="a-input1" :disabled="true" />
      </div>
      <div class="a-div">
        <div class="title_name">新社长学号：</div>
        <el-input v-model="data.newPresidentId" placeholder="新社长学号" class="a-input1" />
      </div>

      <el-button @click.native.prevent="createForm">提交</el-button>
    </div>
    <div class="club-container-title">更换社长</div>
  </div>

</template>

<script type="text/ecmascript-6">
import { fetchClub } from '@/api/club'
import { changePresident } from '@/api/club'
import { mapGetters } from 'vuex'
export default {
  name: 'Activity',
  data() {
    return {
      name: '',
      presidentId: '',
      list:'',
      data: {
        associationId: '',
        newPresidentId: ''
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
      changePresident(this.data)
    },
    getInfo(id){
      this.listLoading = true
      fetchClub(id).then(response => {
        this.list = response.data.association
        this.listLoading = false
      })
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

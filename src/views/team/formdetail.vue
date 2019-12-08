<template>
  <div class="club-container">
    <div class="a-div">
      姓名：
      <el-input v-model="name" placeholder="姓名" class="a-input1"/>
    </div>
    <div class="a-div">
      性别：
      <el-radio v-model="gender" label="男">男</el-radio>
      <el-radio v-model="gender" label="女">女</el-radio>
    </div>
    <div class="'a-div">
      学号：
      <el-input v-model="id" placeholder="学号" class="a-input1"/>
    </div>
    <div class="a-div">
      班级：
      <el-input v-model="banji" placeholder="班级" class="a-input1"/>
    </div>
    <div class="a-div">
      联系方式：
      <el-input v-model="contact" placeholder="联系方式" class="a-input1"/>
    </div>
    <div class="b-div">
      兴趣爱好：
      <el-input
        v-model="interest"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6}"
        placeholder="兴趣爱好"
        class="a-input2"
      />
    </div>
    <div class="b-div">
      申请理由：
      <el-input
        v-model="reason"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6}"
        placeholder="申请理由"
        class="a-input2"
      />
    </div>
    <el-button>同意加入</el-button>
    <el-button>拒绝加入</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Clubapplicationform',
    data() {
      return {
        name: '曹隆翔',
        gender: '男',
        id: '31701068',
        banji: '计算机1703',
        contact: '15988893713',
        interest: '听音乐',
        reason: '我是本校外语专业的学生，非常热爱英语专业，尤其擅长英语口语，通过一年的观察调查，发现我们学校对英语感兴趣的人还不少，所以我希望能通过组织一个专门的英语辩论社来和广大的英语爱好者一起交流学习，希望通过建立这个社团来尽可能为这些同学提供一个英语学习的平台。虽然学校里有一个辩论社，但是始终没有一个英语辩论社，我们抱着为广大英语爱好者提供一个好的交流平台和表现自我舞台的宗旨，希望能成立这么一个社团！'
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
      height: 100px;
    }
    .a-input1{
      width: 150px;
    }
    .a-input2{
      width: 80%;
    }

  }
</style>

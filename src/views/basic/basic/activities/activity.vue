<template>
  <div class="club-container">
    <div  class="left">
<!--      v-for="activity in list"-->
      <div class="left-top">
        <div class="left-top-top">
          <div class="data">2018-10-20</div>
          <div class="author">乒乓球社</div>
        </div>
        <div class="passage-title">第一届乒乓球大赛</div>
      </div>
      <div class="left-middle">
        <div class="news-des">
          怎样才能拍出好的照片？是找到对的位置，等到对的时间，抑或是使用昂贵的设备？摄影大师安塞尔·亚当斯说过：“摄影机最重要的元件是在它后方十二寸的那玩意儿。”也就是我们的脑袋。拍摄照片就是要屏住呼吸，全部的官能都集中在一个点上，捕捉稍纵即逝的现实。就在那个瞬间，抓住一幅影像就成了巨大的身体和心灵的快乐。如果你对此感兴趣，就来参加这次的午间漫谈，与徐炜晟进行一次面对面的交谈吧！
          个人简介：徐炜晟，来自信管1701，新媒体中心主席，外号橘猫。
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import { mapGetters } from 'vuex'
import { fetchActivity } from '@/api/activity'
export default {
  name: 'Activity',
  data() {
    return {
      //       ac_title: '第一届乒乓球大赛',
      //       time: '2018-10-20',
      //       ac_info: ` 怎样才能拍出好的照片？是找到对的位置，等到对的时间，抑或是使用昂贵的设备？摄影大师安塞尔·亚当斯说过：“摄影机最重要的元件是在它后方十二寸的那玩意儿。”也就是我们的脑袋。拍摄照片就是要屏住呼吸，全部的官能都集中在一个点上，捕捉稍纵即逝的现实。就在那个瞬间，抓住一幅影像就成了巨大的身体和心灵的快乐。如果你对此感兴趣，就来参加这次的午间漫谈，与徐炜晟进行一次面对面的交谈吧！
      //   个人简介：徐炜晟，来自信管1701，新媒体中心主席，外号橘猫。
      //
      //
      //  本次“午间访谈”将于11月22日12：30-13：20在理四323教室开展。本次活动只有10个名额，名额有限，希望学弟学妹们通过思考后，组织出你最想知道和最有价值的问题。学习部将根据问题的价值，最终选出10位同学参加漫谈。有意向报名的同学们，请在doctorz上报名，成功入选的同学将获得相应的二课分。截至时间为11月21日晚10点，请及时填报。
      // `,
      //       club_name: '乒乓球社'

      list: null,
      total: 0,
      listLoading: true
    }
  }, created() {
    const id = this.$route.params.id
    console.log(id)
    this.getDetail(id)
    console.log()
  },
  methods: {
    getDetail(id) {
      this.listLoading = true
      fetchActivity(id).then(response => {
        this.list = response.data.activities
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .club-container{
    padding: 10px 45px 10px 50px;
    .left {
      width: 60%;
      background-color: white;
      margin: 20px;
      margin-top: 30px;
      height: auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      padding: 20px;
      .left-top-top{
        display: flex;
        justify-content: space-between;
        .data{
          float: left;
        }
        .author{
          float: left;
        }
      }
      .passage-title{
        padding-top: 20px;
        font-size: 2.0em;
        font-weight: 500;
        padding-bottom: 20px;
      }
    }
  }
</style>

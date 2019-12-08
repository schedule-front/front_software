<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <!-- <CommentDropdown v-model="postForm.comment_disabled" />
        <PlatformDropdown v-model="postForm.platforms" />
        <SourceUrlDropdown v-model="postForm.source_uri" /> -->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" :disabled="postForm.status !== 'check'" @click="passForm">
          同意申请
        </el-button>
        <el-button v-loading="loading" type="warning" :disabled="postForm.status !== 'check'" @click="rejectForm">
          拒绝申请
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>

          <el-col :span="24">
            <el-form-item style="margin-bottom: 30px; margin-top: 34px; margin-left:30px;" label-width="50px" label="标题:">
              <el-input v-model="postForm.title" :row="1" :disabled="true" type="textarea" class="title-textarea" autosize>
              </el-input>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item style="margin-right: 40px; margin-left:0px; margin-top: 10px;" label-width="80px" label="申请社团:">
                    <el-input v-model="postForm.author" :rows="1" :disabled="true" type="textarea" class="author-textarea" autosize placeholder="None"/>
                  </el-form-item>
                  <!-- <el-form-item label-width="60px" label="负责人:" class="postInfo-container-item">
                    <el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable default-first-option remote placeholder="请选择">
                      <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item> -->
                </el-col>

                <el-col :span="8">
                  <el-form-item style="margin-right: 30px; margin-left:0px; margin-top: 10px;" label-width="80px" label="活动人数:">
                    <el-input v-model="postForm.peoplenum" :rows="1" :disabled="true" type="textarea" class="author-textarea" autosize placeholder="None"/>
                  </el-form-item>
                </el-col>

                <!-- <el-col :span="6">
                  <el-form-item label-width="90px" label="Importance:" class="postInfo-container-item">
                    <el-rate
                      v-model="postForm.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="display:inline-block"
                    />
                  </el-form-item>
                </el-col> -->


                <!-- add by qudrx -->
                <el-col :span="8">
                  <el-form-item style="margin-bottom: 0px; margin-top: 10px;" label-width="80px" label="活动地点:">
                    <el-input v-model="postForm.location" :rows="1" :disabled="true" type="textarea" class="site-textarea" autosize placeholder="请输入地点"/>
                  </el-form-item>
                </el-col>

              </el-row>

              <el-row>

                <el-col :span="8">
                  <el-form-item label-width="80px" style="margin-top: 20px;" label="开始时间:" class="postInfo-container-item">
                    <el-date-picker v-model="displayBeginTime" :disabled="true" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="None"/>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label-width="80px" style="margin-top: 20px;" label="结束时间:" class="postInfo-container-item">
                    <el-date-picker v-model="displayEndTime" :disabled="true" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="None"/>
                  </el-form-item>
                </el-col>

              </el-row>

            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px; margin-top: 10px;" label-width="80px" label="活动内容:">
          <el-input v-model="postForm.content" :rows="6" :disabled="true" type="textarea" class="content-textarea" placeholder="请输入内容" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>

      </div>
    </el-form>
  </div>
</template>


<script>
import Sticky from '@/components/Sticky' // 粘性header组件

// api add by qudrx
// import { mapGetters } from 'vuex'
import { fetchActivityDetail } from '@/api/huodong'
import { passActivity } from '@/api/huodong'
import { rejectActivity } from '@/api/huodong'
import { fetchClub } from '@/api/club'

// const defaultForm = {
//   author: '',
//   status: 'check',
//   title: '', // 文章题目
//   content: '', // 文章内容
//   display_time: undefined, // 前台展示时间
//   id: undefined,
//   site: '',
//   notice: '',
// }

// used for page test
const defaultForm = {
  author: '沙雕社',
  status: 'check',
  title: '快乐活动', // 文章题目
  content: '一起哈皮', // 文章内容
  peoplenum: 0,
  begintime: new Date(),
  endtime: new Date(),
  location: '风雨操场'
}

export default {
  name: 'ActivityDetail',
  components: {Sticky},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content.length
    },
    noticeLength() {
      return this.postForm.notice.length
    },
    displayBeginTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.begintime))
      },
      set(val) {
        this.postForm.begintime = new Date(val)
      }
    },
    displayEndTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.endtime))
      },
      set(val) {
        this.postForm.endtime = new Date(val)
      }
    }
  },
  created() {
    const id = this.$route.params.id
    // const id = this.$route.params && this.$route.params.id
    this.fetchData(id)

    // if (this.isEdit) {
    //   const id = this.$route.params && this.$route.params.id
    //   this.fetchData(id)
    // }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    // this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    // fetchData(id) {
    //   fetchArticle(id).then(response => {
    //     this.postForm = response.data

    //     // just for test
    //     this.postForm.title += `   Article Id:${this.postForm.id}`
    //     this.postForm.content_short += `   Article Id:${this.postForm.id}`

    //     // set tagsview title
    //     this.setTagsViewTitle()

    //     // set page title
    //     this.setPageTitle()
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // setTagsViewTitle() {
    //   const title = '编辑'
    //   const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
    //   this.$store.dispatch('tagsView/updateVisitedView', route)
    // },
    // setPageTitle() {
    //   const title = '编辑'
    //   document.title = `${title} - ${this.postForm.id}`
    // },

    fetchData(id) {
      fetchActivityDetail(id).then( response => {
        this.postForm.location = response.data.location
        this.postForm.begintime = response.data.beginDate
        this.postForm.endtime = response.data.endDate
        this.postForm.peoplenum = response.data.numPeople
        this.postForm.content = response.data.content
        this.postForm.status = response.data.status
        this.postForm.title = response.data.title
        fetchClub(response.data.associationId).then( response => {
          this.postForm.author = response.data.name
        })
      })
    },
    passForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '审批结果：通过申请',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'pass'
          this.loading = false
          passActivity(this.$route.params.id)          
        } else {
          console.log('提交错误')
          return false
        }
      })
    },
    rejectForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '失败',
            message: '审批结果：拒绝申请',
            type: 'error',
            duration: 2000
          })
          this.postForm.status = 'reject'
          this.loading = false
          rejectActivity(this.$route.params.id) 
        } else {
          console.log('提交错误')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 0px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 14px;
    top: 130px;
    color: gray;
  }
}

.title-textarea /deep/ {
  textarea {
    padding-right: 0px;
    resize: none;
    border: none;
    // text-align: center;
    // border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.author-textarea /deep/ {
  textarea {
    padding-right: 0px;
    resize: none;
    border: none;
    // border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.site-textarea /deep/ {
  textarea {
    padding-right: 0px;
    resize: none;
    border: none;
    // border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}

.content-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    // border: none;
    // border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>

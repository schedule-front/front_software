<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <!-- <CommentDropdown v-model="postForm.comment_disabled" />
        <PlatformDropdown v-model="postForm.platforms" />
        <SourceUrlDropdown v-model="postForm.source_uri" /> -->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" :disabled="postForm.status !== '未审批'" @click="passForm">
          同意申请
        </el-button>
        <el-button v-loading="loading" type="warning" :disabled="postForm.status !== '未审批'" @click="rejectForm">
          拒绝申请
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <!-- <Warning /> -->

          <el-col :span="24">
            <el-form-item style="margin-bottom: 30px; margin-top: 34px; margin-left:30px;" label-width="50px" label="标题:">
              <el-input v-model="postForm.title" :row="1" :disabled="true" type="textarea" class="title-textarea" autosize required>
              </el-input>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="7">
                  <el-form-item style="margin-right: 40px; margin-left:0px; margin-top: 20px;" label-width="80px" label="申请社团:">
                    <el-input v-model="postForm.author" :rows="1" :disabled="true" type="textarea" class="author-textarea" autosize placeholder="请输入名字"  required/>
                  </el-form-item>
                  <!-- <el-form-item label-width="60px" label="负责人:" class="postInfo-container-item">
                    <el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable default-first-option remote placeholder="请选择">
                      <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>
                  </el-form-item> -->
                </el-col>

                <el-col :span="10">
                  <el-form-item label-width="80px" style="margin-top: 20px;" label="活动时间:" class="postInfo-container-item">
                    <el-date-picker v-model="displayTime" :disabled="true" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择日期和时间" required/>
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
                <el-col :span="7">
                  <el-form-item style="margin-bottom: 0px; margin-top: 20px;" label-width="80px" label="活动地点:">
                    <el-input v-model="postForm.site" :rows="1" :disabled="true" type="textarea" class="site-textarea" autosize placeholder="请输入地点" required/>
                  </el-form-item>
                </el-col>

              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px; margin-top: 20px;" label-width="80px" label="活动内容:">
          <el-input v-model="postForm.content" :rows="6" :disabled="true" type="textarea" class="content-textarea" placeholder="请输入内容" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>

        <!-- <el-form-item style="margin-bottom: 40px; margin-top: 14px;" label-width="80px" label="活动公告:">
          <el-input v-model="postForm.notice" :rows="6" :disabled="true" type="textarea" class="content-textarea" placeholder="请输入内容" />
          <span v-show="contentShortLength" class="word-counter">{{ noticeLength }}words</span>
        </el-form-item> -->

      </div>
    </el-form>
  </div>
</template>


<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'

// const defaultForm = {
//   author: '',
//   status: '未审核',
//   title: '', // 文章题目
//   content: '', // 文章内容
//   display_time: undefined, // 前台展示时间
//   id: undefined,
//   site: '',
//   notice: '',
// }

const defaultForm = {
  author: 'qudrx',
  status: '未审批',
  title: '快乐活动', // 文章题目
  content: '一起哈皮', // 文章内容
  display_time: new Date(), // 前台展示时间
  team: '沙雕社',
  id: undefined,
  site: '风雨操场',
  notice: '12月12日，风雨操场不见不散',
}

export default {
  name: 'ArticleDetail',
  // components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  components: {Sticky},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必填项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必填项'))
        // test by qudrx
        // console.log(this.postForm.display_time)
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        // image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        site: [{ validator: validateRequire }],
        author: [{ validator: validateRequire }],
        display_time: [{validator: validateRequire }],
        notice: [{validator: validateRequire }]
        // source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
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
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '编辑'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑'
      document.title = `${title} - ${this.postForm.id}`
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
          this.postForm.status = '已通过'
          this.loading = false
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
          this.postForm.status = '未通过'
          this.loading = false
        } else {
          console.log('提交错误')
          return false
        }
      })
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
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

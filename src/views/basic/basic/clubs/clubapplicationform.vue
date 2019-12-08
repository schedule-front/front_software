<!--<template>-->
<!--  <div class="club-container">-->
<!--    <div class="club-container-box">-->
<!--      <div class="a">-->
<!--        <div class="a-div">-->
<!--          <div class="div-title">姓名：</div>-->
<!--          <el-input v-model="data.name" placeholder="姓名" class="a-input1" />-->
<!--        </div>-->
<!--        <div class="a-div">-->
<!--          <div class="div-title">性别：</div>-->

<!--          <el-radio v-model="data.gender" label="男">男</el-radio>-->
<!--          <el-radio v-model="data.gender" label="女">女</el-radio>-->
<!--        </div>-->
<!--        <div class="'a-div">-->
<!--          <div class="div-title">学号：</div>-->

<!--          <el-input v-model="data.schoolId" placeholder="学号" class="a-input1" />-->
<!--        </div>-->
<!--        <div class="a-div">-->
<!--          <div class="div-title">班级：  </div>-->

<!--          <el-input v-model="data.clasS" placeholder="班级" class="a-input1" />-->
<!--        </div>-->
<!--        <div class="a-div">-->
<!--          <div class="div-title">联系方式：</div>-->

<!--          <el-input v-model="data.phone" placeholder="联系方式" class="a-input1" />-->
<!--        </div>-->

<!--      </div>-->

<!--      <div class="b-div">-->

<!--        <div class="div-title">兴趣爱好：</div>-->

<!--        <el-input-->
<!--          v-model="data.interests"-->
<!--          type="textarea"-->
<!--          :autosize="{ minRows: 2, maxRows: 4}"-->
<!--          placeholder="兴趣爱好"-->
<!--          class="a-input2"-->
<!--        />-->
<!--      </div>-->
<!--      <div class="b-div">-->
<!--        <div class="div-title">获奖情况：</div>-->

<!--        <el-input-->
<!--          v-model="data.experiences"-->
<!--          type="textarea"-->
<!--          :autosize="{ minRows: 2, maxRows: 4}"-->
<!--          placeholder="获奖情况"-->
<!--          class="a-input2"-->
<!--        />-->
<!--      </div>-->
<!--      <div class="b-div">-->
<!--        <div class="div-title">申请理由：</div>-->

<!--        <el-input-->
<!--          v-model="data.reason"-->
<!--          type="textarea"-->
<!--          :autosize="{ minRows: 2, maxRows: 4}"-->
<!--          placeholder="申请理由"-->
<!--          class="a-input2"-->
<!--        />-->
<!--      </div>-->

<!--    </div>-->
<!--    <div class="club-container-title" >社团加入申请表</div>-->
<!--    <el-button @click.native.prevent="createForm">提交</el-button>-->
<!--  </div>-->

<!--</template>-->

<!--<script type="text/ecmascript-6">-->
<!--import { createJoinForm } from '@/api/joinform'-->
<!--import { mapGetters } from 'vuex'-->
<!--export default {-->
<!--  name: 'Clubapplicationform',-->
<!--  data() {-->
<!--    return {-->
<!--      data: {-->
<!--        userId: '',-->
<!--        interests: '',-->
<!--        experiences:'',-->
<!--        reason: '',-->
<!--        associationId: '',-->
<!--        date:''-->
<!--      }-->
<!--    }-->
<!--  }, computed: {-->
<!--    ...mapGetters([-->
<!--      'name',-->
<!--      'avatar',-->
<!--      'roles',-->
<!--      'userid',-->
<!--    ])-->
<!--  },-->
<!--  created() {-->
<!--    const id = this.$route.params.id-->
<!--    const data=this.data-->
<!--    this.setAssociationId(id)-->
<!--    this.getUser()-->
<!--    // this.createForm(data)-->
<!--  },-->
<!--  methods: {-->
<!--    getUser() {-->
<!--      this.data.userId = this.userid-->
<!--    },-->
<!--    setAssociationId(id){-->
<!--      this.data.associationId=id-->
<!--    },-->
<!--    createForm() {-->
<!--      this.data.date = new Date().get-->
<!--      createJoinForm(this.data)-->
<!--    }-->

<!--  }-->

<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--  .club-container {-->
<!--    border-radius: 30px;-->
<!--    border: solid lightgray;-->
<!--    margin: 30px;-->
<!--    padding: 10px 45px 10px 50px;-->
<!--    .div-title{-->
<!--      width: 100px;-->
<!--      float: left;-->
<!--    }-->
<!--    .a{-->
<!--      display: flex;-->
<!--      justify-content: space-around;-->
<!--    }-->
<!--    .a-div{-->
<!--      margin-top: 20px;-->
<!--      height: 50px;-->
<!--      width: 500px;-->
<!--      float: left;-->
<!--    }-->
<!--    .b-div{-->
<!--      margin-top: 20px;-->
<!--      height: 80px;-->
<!--    }-->
<!--    .a-input1{-->
<!--      width: 150px;-->
<!--    }-->
<!--    .a-input2{-->
<!--      width: 80%;-->
<!--    }-->

<!--  }-->
<!--  .club-container-title{-->
<!--    width: 300px;-->
<!--    background-color: white;-->
<!--    position: absolute;-->
<!--    left: 80px;-->
<!--    top: 15px;-->
<!--    font-size: 2em;-->
<!--    text-align: center;-->
<!--  }-->
<!--</style>-->

<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '">
        <el-button v-loading="loading" style="margin-left: 0px;" type="success" @click="passForm">
          提交申请
        </el-button>
        <!-- <el-button v-loading="loading" type="warning" @click="rejectForm">
          拒绝申请
        </el-button> -->
      </sticky>

      <div class="createPost-main-container">
        <el-row>

          <!-- <div class="postInfo-container"> -->
          <el-row>

            <el-col :span="6">
              <el-form-item style="margin-left:20px; margin-right: 40px; margin-top:20px;" label-width="60px" label="姓名:">
                <el-input v-model="postForm.name" :rows="1" :disabled="true" type="textarea" class="author-textarea" placeholder=""  required/>
              </el-form-item>
            </el-col>

            <!-- add by qudrx -->

            <el-col :span="6">
              <el-form-item style="margin-left:0px; margin-right: 40px; margin-top:20px;" label-width="60px" label="性别:">
                <!-- <el-radio v-model="postForm.gender" label="男">男</el-radio>
                <el-radio v-model="postForm.gender" label="女">女</el-radio> -->
                <el-radio-group v-model="postForm.gender" :disabled="true">
                  <el-radio-button label="男"></el-radio-button>
                  <el-radio-button label="女"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item style="margin-right: 40px; margin-top:20px; margin-left: 20px" label-width="60px" label="学号:">
                <el-input v-model="postForm.id" :rows="1" :disabled="true" type="textarea" class="author-textarea" placeholder=""  required/>
              </el-form-item>
            </el-col>

          </el-row>
          <!-- </div> -->
        </el-row>

        <el-row>

          <el-col :span="6">
            <el-form-item style="margin-left:20px; margin-right: 40px;" label-width="60px" label="专业:">
              <el-input v-model="postForm.major" :rows="1" :disabled="true" type="textarea" class="author-textarea" placeholder=""  required/>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item style="margin-right: 40px;" label-width="60px" label="班级:">
              <el-input v-model="postForm.class" :rows="1" :disabled="true" type="textarea" class="author-textarea" placeholder=""  required/>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item style="margin-right: 0px;" label-width="80px" label="联系方式:">
              <el-input v-model="postForm.contact" :rows="1" :disabled="true" type="textarea" class="author-textarea" placeholder=""  required/>
            </el-form-item>
          </el-col>

        </el-row>

        <el-form-item style="margin-bottom: 40px; margin-top: 14px;" label-width="80px" label="兴趣爱好:">
          <el-input v-model="postForm.interest" :rows="3" type="textarea" class="content-textarea" placeholder="请输入内容" />
        </el-form-item>

        <el-form-item style="margin-bottom: 40px; margin-top: 14px;" label-width="80px" label="相关荣誉:">
          <el-input v-model="postForm.honor" :rows="3" type="textarea" class="content-textarea" placeholder="会影响部分社团的申请考量" />
        </el-form-item>

        <el-form-item style="margin-bottom: 40px; margin-top: 14px;" label-width="80px" label="申请理由:">
          <el-input v-model="postForm.reason" :rows="6" type="textarea" class="content-textarea" placeholder="请输入内容" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>

        <!-- <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item> -->

        <!-- <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="postForm.image_uri" />
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

  const defaultForm = {
    name: 'SZY',
    gender: '男',
    id: '31701079',
    major: 'CS',
    class: '1703',
    contact: '11122233345',
    interest: '',
    honor: '',
    reason: '',
    status: 'check'
  }

  export default {
    name: 'EnterApplication',
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
          name : [{ validator: validateRequire }],
          gender : [{ validator: validateRequire }],
          id : [{ validator: validateRequire }],
          class : [{ validator: validateRequire }],
          contact : [{ validator: validateRequire }],
          interest : [{ validator: validateRequire }],
          honor : [{ validator: validateRequire }],
          reason: [{ validator: validateRequire }]
          // image_uri: [{ validator: validateRequire }],
          // title: [{ validator: validateRequire }],
          // content: [{ validator: validateRequire }],
          // source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
        },
        tempRoute: {}
      }
    },
    computed: {
      contentShortLength() {
        return this.postForm.reason.length
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
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            this.postForm.status = 'check'
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
              message: '审批结果：未通过',
              type: 'error',
              duration: 2000
            })
            this.postForm.status = '审核未通过'
            this.loading = false
          } else {
            console.log('提交错误')
            return false
          }
        })
      }
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
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
      right: 20px;
      top: 106px;
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
</style>

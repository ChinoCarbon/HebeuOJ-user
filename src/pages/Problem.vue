<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="background-color: #69bff8; padding: 30px; border-top: white 1px solid">
          <h1 style="color: white"> Problem{{ this.$route.params.id }} &nbsp;&nbsp;&nbsp;{{problem.problemTitle}}</h1>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item>
            <slot slot="label">
              <i class="el-icon-user"></i>
              时间限制
            </slot>
            1.0s
          </el-descriptions-item>
          <el-descriptions-item>
            <slot slot="label">
              <i class="el-icon-mobile-phone"></i>
              测试点个数
            </slot>
            10
          </el-descriptions-item>
          <el-descriptions-item>
            <slot slot="label">
              <i class="el-icon-location-outline"></i>
              提交人数
            </slot>
            {{problem.problemSubmitted}}
          </el-descriptions-item>
          <el-descriptions-item>
            <slot slot="label">
              <i class="el-icon-tickets"></i>
              通过人数
            </slot>
            {{problem.problemPassed}}
          </el-descriptions-item>
          <el-descriptions-item>
            <slot slot="label">
              <i class="el-icon-office-building"></i>
              难度
            </slot>
            Easy
          </el-descriptions-item>
          <el-descriptions-item>
            <slot slot="label">
              <i class="el-icon-office-building"></i>
              历史分数
            </slot>
            100
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3">
        <mavon-editor
            ref="docDetaileNode"
            v-model="article"
            :subfield="false"
            :editable="false"
            :ishljs="true"
            box-shadow-style="0 0 0 0 rgba(0,0,0,0)"
            default-open="preview"
            :toolbars-flag="false"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-collapse>
          <el-collapse-item title="展开提交区" name="1">
            <el-input
                type="textarea"
                :rows="30"
                resize="none"
                placeholder="请输入内容"
                v-model="code">
            </el-input>
            <el-row>
              <el-col :offset="8">
                选择语言
                <el-select v-model="selectedValue" placeholder="语言类型">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
                 <el-button type="primary" @click="submit">
                   <div v-if="isSubmiting===false">
                     提交
                   </div>
                   <div v-else>
                     提交中。。。
                   </div>
                 </el-button>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Problem",
  data() {
    return {
      article: '',
      title: '【模板】线段树',
      code: '',
      problem: null,
      isSubmiting: false,
      options: [{
        value: 1,
        label: 'C'
      }, {
        value: 2,
        label: 'C++'
      }, {
        value: 3,
        label: 'Java'
      }],
      selectedValue: 2,
      localhostPath: ''
    }
  },
  created() {
    let wPath = window.document.location.href;
    // 获取当前页面主机地址之后的目录，如：/admin/index
    let pathName =  this.$route.path;
    let pos = wPath.indexOf(pathName);
    // 获取主机地址，如：http://localhost:8080
    this.localhostPath = wPath.substring(0, pos);
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.getArticle()
  },
  methods: {
    submit() {
      this.isSubmiting = true
      axios.post(
          this.localhostPath + '/getJudgementId',
          {
            problemId: this.$route.params.id,
            userId: JSON.parse(localStorage.getItem("user")).userId,
            code: this.code,
            languageType: this.selectedValue
          }
      ).then((data) => {
        console.log(data)
        localStorage.setItem("code", this.code)
        this.isSubmiting = false
        this.$router.push("/judgement/" + data.data)
      })
    },
    getInformation() {
      console.log(this.$route.params.id)
      axios.post(this.localhostPath + '/getProblemInformation',
        {
          problemId: this.$route.params.id
        }).then((resp) => {
        this.problem = resp.data;
      })
    },
  getArticle() {
        this.getInformation();
        axios.get(this.localhostPath + "/problemsH/" + this.$route.params.id, {
        }).then((url) => {
          this.article = url.data
        })
      }
    },
     deactivated() {
    console.log("asdasfa s")
  }
}
</script>

<style scoped>


</style>

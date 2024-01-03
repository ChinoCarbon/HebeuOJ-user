<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="background-color: #69bff8; padding: 30px; border-top: white 1px solid">
          <h1 style="color: white">评测 #{{ this.$route.params.id }} </h1>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-result v-if="CE===null" icon="success" title="评测中" subTitle="请耐心等待">
        </el-result>
        <div v-else-if="CE===true">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
          <span>
            <el-tag type="warning">
              编译错误 Compile Error！
            </el-tag>
          </span>
            </div>
            错误信息
            <pre style="white-space: pre; overflow: auto"><template v-for="c in compileMessages">
      {{ c }}
            </template></pre>
          </el-card>
        </div>
        <div v-else>
          <el-card class="box-card">
            <div slot="header" class="clearfix">

              <el-tag :type="getType(this.conclusion)">
                {{ getStatement(this.conclusion) }}
              </el-tag>

            </div>
            <el-card shadow="hover" :style="conclusionBackgroundColor(o.statement)" type="success" v-for="o in result" :key="o.id" class="text item">
              测试点 {{ o.id }} {{ getStatement(o.statement).split(" ")[0] }} 消耗时间 {{ o.timeConsumed }} ms
            </el-card>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18" :offset="3">
        <el-card class="box-card" v-if="CE != null">
          源代码
          <pre style="white-space: pre; overflow: auto"><template v-for="c in codeLines">
      {{ c }}
            </template></pre>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>


//import axios from "axios";

import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Judgement",
  data() {
    return {
      result: "",
      CE: null,
      compileMessage: null,
      code: null,
      conclusion: "ACCEPTED",
      localhostPath: ""
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

    axios.post(
        this.localhostPath + "/judgement?id=" + this.$route.params.id,
    ).then((data) => {
      console.log("judge end")
      console.log(data)
      if(data.data === '')
      {
        this.conclusion = "114514"
        this.CE = false
        return;
      }
      this.result = data.data.messages
      this.CE = data.data.ce
      this.compileMessage = data.data.compileMessage
      this.code = data.data.judgement.code
      if(this.CE === false)
      {
        for(let i of this.result)
        {
          if(i.statement !== "ACCEPTED")
          {
            this.conclusion = i.statement
            break;
          }
        }
      }

    })
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    getType(conclusion) {
      if(conclusion === "ACCEPTED")
      {
        return "success"
      } else if(conclusion === "WRONG_ANSWER")
      {
        return "danger"
      } else if(conclusion === "RUNTIME_ERROR")
      {
        return "info"
      } else if(conclusion === "TIME_LIMIT_EXCEEDED")
      {
        return ""
      } else
      {
        return ""
      }
    },
    getStatement(conclusion) {
      if(conclusion === "ACCEPTED")
      {
        return "答案正确 Accepted!"
      } else if(conclusion === "WRONG_ANSWER")
      {
        return "答案错误 Wrong Answer!"
      } else if(conclusion === "RUNTIME_ERROR")
      {
        return "运行时错误 Runtime Error!"
      } else if(conclusion === "TIME_LIMIT_EXCEEDED")
      {
        return "超出时间限制 Time Limit Exceeded!"
      } else
      {
        return "未知错误 Unknown Error!"
      }
    },
    conclusionBackgroundColor(conclusion) {
      let color
      if(conclusion === "ACCEPTED")
      {
        color = "#76f786"
      } else if(conclusion === "WRONG_ANSWER")
      {
        color = "#d25245"
      } else if(conclusion === "RUNTIME_ERROR")
      {
        color = "#6a45df"
      } else if(conclusion === "TIME_LIMIT_EXCEEDED")
      {
        color = "#a5e505"
      } else
      {
        color = "#1e2708"
      }
      return {
        "background-color": color,
        "color": "white"
      }
    }
  },
  computed: {

    compileMessages() {
      let f = this.compileMessage.split("\n");
      for (let str of f) {
        str = str.replace(new RegExp(/( )/g), "&nbsp;")
      }
      return this.compileMessage.split("\n")
    },
    codeLines() {
      if(this.code != null) {
        return this.code.split("\n")
      }
      return null
    },
  }
}
</script>

<style scoped>

</style>

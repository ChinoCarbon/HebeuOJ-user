<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
    <el-tab-pane label="班级管理" name="first">
      <h1>
        我的班级
      </h1>

      <el-card v-for="aClass in classes" class="box-card" :key="aClass.classId">
        <div slot="header" class="clearfix">
          <span>{{aClass.className}}</span>
        </div>
        <div v-for="student in aClass.students" :key="student.userId" class="clearfix">
          <h3>
             <router-link :to="/user/ + student.userId">
               {{student.userName}}
             </router-link>
          </h3>
        </div>
      </el-card>

    </el-tab-pane>
    <el-tab-pane label="添加题目" name="second">
      <h1>
        题目添加
      </h1>
      <h2>
        题目编辑
      </h2>
      标题
      <el-input type="text" v-model="title"></el-input>
      题目内容
      <mavon-editor ref="md" @imgAdd="imgAdd" v-model="article" :toolbars="toolbars"/>
      <el-row>
        <el-col :offset="8">
          <el-button type="primary" @click="submit">
            <div>
              提交
            </div>
          </el-button>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="新建作业" name="third">
      <h1>
        新建作业
      </h1>
      <h2>
        输入作业标题
      </h2>
      <el-input
          placeholder="请输入作业标题"
          prefix-icon="el-icon-search"
          v-model="homeworkTitle">
      </el-input>
      <h2>
        选择要添加的题目
      </h2>
      <el-transfer v-if="problems !== []"
          v-model="value"
          :data="problemsData">
      </el-transfer>

      <h2>
        选择班级
      </h2>
      <el-transfer v-if="classes !== []"
                   v-model="value2"
                   :data="classData">
      </el-transfer>
      <el-row>
        <el-col :offset="5">
          <el-button type="primary" @click="addHomework">
            <div>
              提交
            </div>
          </el-button>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="题目测试点添加" name="fourth">
      <h1>
        添加题目的测试点
      </h1>
      <h2>
        输入题目
      </h2>
      <el-input
          placeholder="请输入题目的编号"
          prefix-icon="el-icon-search"
          v-model="findProblem">
      </el-input>
      <el-button @click="findProblemById">
        查找
      </el-button>
      <el-card class="box-card" v-if="problem !== ''">
        <div slot="header" class="clearfix">
          <span>{{problem.problemTitle}}</span>
        </div>
        <el-upload
            class="upload-demo"
            :action="this.localhostPath + '/uploadInOut?problemId=' + this.problem.problemId"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传in/out文件
            <br>
            每个in文件必须有一个相同名的out文件
            <br>
            且文件名必须是从1开始增大的数字
            <br>
            如1.in 1.out 2.in 2.out 3.in 3.out..
            <br>
            否则会导致无法评测
            <br>
            <h4>
              如果此题目有测试点，新上传会覆盖掉之前的测试点
            </h4>
          </div>
        </el-upload>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="作业管理" name="fifth">
      <h1>
      选择一个作业来查看
      </h1>
      <el-collapse v-model="activeNames">
        <el-collapse-item v-for="homework in homeworks" :key="homework.homeworkId" :title="homework.homeworkTitle" :name="homework.homeworkId">
          <el-row>
            <el-col :span="20" :offset="2">
              <Homework :id="homework.homeworkId"/>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from "axios";
import Homework from "@/components/Homework";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Teacher",
  components: {Homework},
  data() {
    return {
      activeNames: ['1'],
      value: [],
      value2: [],
      activeName: 'second',
      article: "",
      title: "",
      findProblem: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: false, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: false, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
        boxShadow: false
      },
      md :"",
      fileList: [],
      problems: [],
      problem: '',
      classes: [],
      homeworkTitle: "",
      homeworks: [],
      localhostPath: ""
    };
  },
  created() {
    let wPath = window.document.location.href;
    // 获取当前页面主机地址之后的目录，如：/admin/index
    let pathName =  this.$route.path;
    let pos = wPath.indexOf(pathName);
    // 获取主机地址，如：http://localhost:8080
    this.localhostPath = wPath.substring(0, pos);
  },
  computed: {
    problemsData() {
      const data = [];
      for (let i = 0; i < this.problems.length; i++) {
        data.push({
          key: i + 1,
          label: `P${this.problems[i].problemId} ${ this.problems[i].problemTitle }`,
        });
      }
      return data;
    },
    classData() {
      const data = [];
      for (let i = 0; i < this.classes.length; i++) {
        data.push({
          key: i + 1,
          label: `${ this.classes[i].className }`,
        });
      }
      return data;
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addHomework() {
      axios.post(this.localhostPath + "/addHomework",
          {
            "homeworkTitle": this.homeworkTitle,
            "problems": this.value,
            "classes": this.value2,
            "homeworkTeacher": JSON.parse(localStorage.getItem('user')).userId
          }).then((data) => {
            console.log(data.data)
            if(data.data === "SUCCESS")
            {
              this.$message.success("添加成功")
            }
      })
      console.log(this.value2)
    },
    submit() {
      axios.put(this.localhostPath + "/ProblemsH",
          {
            "problemTitle": this.title,
            "problemContent": this.article
          }).then((data) => {
            console.log(data.data)
            if(data.data === "SUCCESS")
              this.$message.success("添加完成")
            else this.$message.error("添加失败")
      })
    },
    created() {
      let wPath = window.document.location.href;
      // 获取当前页面主机地址之后的目录，如：/admin/index
      let pathName =  this.$route.path;
      let pos = wPath.indexOf(pathName);
      // 获取主机地址，如：http://localhost:8080
      this.localhostPath = wPath.substring(0, pos);
    },
    imgAdd(a, b) {
      console.log(b)
      let formData = new FormData()
      formData.append('file', b)
      axios({
        url: this.localhostPath + "/uploadImage",//请求地址
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((url) => {
        // console.log(JSON.stringify(url))
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1.  通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         * 3. 由于vue运行访问的路径只能在static下，so，我就把图片保存到它这里了
         */
        console.log(url.data)
        this.$refs.md.$img2Url(a, 'http://localhost:8080' + url.data)
      })
    },
    findProblemById() {
      axios.post(this.localhostPath + "/problemsH",
          {
            "problemId": this.findProblem
      }).then((data) => {
        console.log(data.data)
        this.problem = data.data;
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  },
  mounted() {
    axios.post( this.localhostPath + "/listClasses?userId=" + JSON.parse(localStorage.getItem('user')).userId)
    .then((data) => {
      this.classes = data.data;
    })

    axios.post(this.localhostPath + '/findAllByPages',
        {
          page:1,//当前页数
          numPerPage:100//每页条数
        }).then((data) => {
          this.problems = data.data.list;
    })

    axios.post(this.localhostPath + '/getHomeworkByTeacherId',
        {
          homeworkTeacher: JSON.parse(localStorage.getItem('user')).userId,
        }).then((data) => {
          console.log(data.data)
      this.homeworks = data.data;
    })
  }
}
</script>

<style scoped>

</style>

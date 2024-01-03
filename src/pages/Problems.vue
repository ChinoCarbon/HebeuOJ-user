<template>
  <div class="home">
    <el-container>
      <el-header>
        <span style="color: #FFFFFF;size: 18px">题目列表</span>
      </el-header>
      <el-main align="center">
        <!--搜索框-->
        <div align="center">
          <div class="search-box" align="center" >
            <el-row>
              <el-col :span="2" :offset="1"><h3>查找题目</h3></el-col>
              <el-col :span="8"><h3>
                <el-input
                  style="width: 95%"
                placeholder="请输入题号或题目名称"
                v-model="input"
                clearable>
              </el-input></h3></el-col>
              <el-col :span="1" ><h3><el-button @click="search" type="primary">搜索</el-button></h3></el-col>
            </el-row>
          </div>
        </div><br/>
        <!--题目表格-->
        <div align="center" class="table-box">
          <el-table :data="tableData"
            :row-style="{height:0+'px'}"
            :cell-style="{padding:5+'px'}"
            height="500"
            border
            style="width: 80%">
            <el-table-column
              align="center"
              prop="id"
              label="题号"
              width="120"
            >
            </el-table-column>
            <el-table-column
              label="题目名称"
              prop="name"
              width="300">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper" >
                  <el-link size="medium" style="font-size: 20px" type="primary" :href="scope.row.link + '/' + scope.row.id">{{ scope.row.name }}</el-link>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="200"
              prop="pass,carry"
              label="通过/执行">
              <template slot-scope="scope">
                {{scope.row.pass}}/{{scope.row.carry}}
              </template>
            </el-table-column>
            <el-table-column
              prop="pass,carry"
              width="300"
              label="通过率">
              <template slot-scope="scope">
                <el-progress :text-inside="true"  v-if="(scope.row.pass/scope.row.carry)" :stroke-width="20" :status="(scope.row.process_status)|statusFilter((scope.row.pass/scope.row.carry))" :percentage="(scope.row.pass/scope.row.carry)| numFilter"></el-progress>
              </template>

            </el-table-column>
          </el-table>

        <!--分页标签-->
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
        </div>
      </el-main>
    </el-container>

  </div>

</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Problems",
  data() {
    return {
      //表格数据
      tableData: [],
      // 总条数
      total:0 ,
      //每页的条目个数
      pagesize:12,
      //显示的页数
      page:1,
      //搜索关键字
      key:'',
      status:'',
      //搜索框输入的数
      input:'',
      process_status:'',
      localhostPath: ''
    }
  }, created() {
    let wPath = window.document.location.href;
    // 获取当前页面主机地址之后的目录，如：/admin/index
    let pathName =  this.$route.path;
    let pos = wPath.indexOf(pathName);
    // 获取主机地址，如：http://localhost:8080
    this.localhostPath = wPath.substring(0, pos);
  },

  methods:{
    // 换页
    handleCurrentChange(val) {
      this.page=val;
      if(this.status === "全局"){
        this.getData()
      }else{
        this.getDataLike()
      }
    },
    //搜索
    search(){
      this.page = 1
      this.key=this.input;
      this.getDataLike();
    },
    //分页全局查询
    getData(){
      axios.post(this.localhostPath + '/findAllByPages',
        {
          page:this.page,//当前页数
          numPerPage:this.pagesize//每页条数
        }
      ).then( (response) => {
       //this.tableData=[];
        let json = response.data.list;//接受后端传输的json

        console.log(response.data)
        if(json==null){
          return ;
        }
        this.tableData = []
        for(let i in json){
          this.tableData.push({
            id:json[i].problemId,
            name:json[i].problemTitle,
            pass:json[i].problemPassed,
            carry:json[i].problemSubmitted,
            link:"/problems",
          });
        }
        //获取信息总数
        this.total=response.data.total;
        this.status="全局";
      }).catch((error) => {
        console.log(error)
      })
    },
    //分页模糊查询
    getDataLike(){
      if(this.key === "")
      {
        this.getData();
        return;
      }
      axios.post(this.localhostPath + '/findLikeByPages',
        {
          keyWord:this.key,//关键词
          page:this.page,//当前页数
          numPerPage:this.pagesize//每页条数
        }
      ).then((response) => {
        this.tableData = [];
        let json = response.data.list;//接受后端传输的json
        if(json==null){
          return ;
        }
        for(let i in json){
          this.tableData.push({
            id:json[i].problemId,
            name:json[i].problemTitle,
            pass:json[i].problemPassed,
            carry:json[i].problemSubmitted,
            link:"/problem",
          });
        }
        //获取信息总数
        if(this.key === ""){
          this.total=response.data.endRow;
          this.status="全局";
        }else {
          this.total=response.data.total;
          this.status="搜索";
        }
      })},
  },
  filters: {
    numFilter (value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat((value*100)).toFixed(2);
      realVal= realVal*1;
      return realVal;
    },
    statusFilter(value,num){
      let numVal = parseFloat((num*100)).toFixed(2);
      numVal = numVal*1;
      let realVal = "";
      if(numVal>=90){
        realVal="success";
      }else if (numVal>=80){
        realVal=null;
      }else if(numVal>=60){
        realVal="warning";
      }else {
        realVal="exception"
      }
      return realVal;
    }

  },
  //钩子函数
  beforeRouteEnter: (to, from, next) => {
    console.log("组件加载之前");
    next(vm => {
      vm.getData();
    });
  },
}

</script>

<style scoped>
.el-header, .el-footer {
  background-color: #303133;
  color: #333;
  text-align: left;
  line-height: 30px;
  font-size: 24px;
}

.el-main {
  background-color: #F2F6FC;
  color: #333;
  text-align: center;
  font-size: 18px;
  line-height: 30px;
}

.home{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.el-table{
  font-size:20px;
  line-height: 40px;
}
.search-box{
  width: 1120px;
  height: 60px;
  background-color: #FFFFFF;
  /*边框设置*/
  border: 1px solid #DCDFE6;
  /*标签位置*/
  margin: 0px auto;
  /*内部边距*/
  padding: 20px 30px 20px 30px;
  /*边框弧度*/
  border-radius: 5px;
  /*阴影设置*/
  box-shadow: 0px 0px 10px  #DCDFE6;
}
.table-box{
  width: 1180px;
  height:530px;
  background-color: #FFFFFF;
  /*标签位置*/
  margin: auto;
  /*内部边距*/
  padding: 20px 0px 20px 0px;
  /*边框弧度*/
  border-radius: 5px;
}
</style>

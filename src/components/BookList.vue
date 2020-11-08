<template>
  <div>

    <div>
      <div class="search-div">
      <el-input v-model="search" placeholder="请输入内容"></el-input>  
      </div>
      <div class="search-btn">
        <el-button type="primary" @click="updateTableDate">查询</el-button>
        <el-button type="danger" @click="delateData">删除</el-button>
      </div>
    </div>
    
    

    <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- <el-table-column prop="bookName" label="书名"></el-table-column>
      <el-table-column prop="bookCounts" label="数量"></el-table-column>
      <el-table-column prop="detail" label="描述"></el-table-column> -->
      <el-table-column v-for="(tableColumn,index) in tableColumns" :key="index" :prop="tableColumn.prop" :label="tableColumn.label"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="viewClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <!--<span class="demonstration">完整功能</span>-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1" :page-sizes="pageSizeList"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPageSize">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  export default {
    name: "bookList",
    data(){
      return {
        tableColumns: [
          {prop: 'bookName', label: '书名'},
          {prop: 'bookCounts', label: '数量'},
          {prop: 'detail', label: '描述'}
        ],
        tableData: [],
        pageSizeList: [5, 10, 20, 50, 100],
        pageSize: 5,
        totalPageSize: 10,
        currentPage1: 1,
        search: '',
        multipleSelection: []
      }
    },
    methods: {
      toggleSelection(rows) {     //取消勾选
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
        console.log(this.multipleSelection);
      },
      handleSelectionChange(val) {    //勾选
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.updateTableDate();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage1 = val;
        this.updateTableDate();
      },
      viewClick(row){   //查看路由跳转
        this.$router.push({name:'BookView',params:{id: row.bookID}});
      },
      handleClick(row){    //编辑路由跳转
        this.$router.push({name:'BookEdit',params:{id: row.bookID}});
      },
      delateData(){
        let ids = "";
        if(this.multipleSelection.length>0){
          for(let i = 0;i<this.multipleSelection.length>0;i++){
            ids+= this.multipleSelection[i].bookID;
          }
        }
        this.$axios.post( this.HOST + "/book/deletes",
        {
          ids: ids
        }
        ).then(res=>{
          this.updateTableDate();
          console.log(res);

        }).catch(error=>{
            console.log(error)
        });
      },
      updateTableDate(){
        this.$axios.post( this.HOST + "/book/getList",
        {
          limit: (this.currentPage1 - 1) * this.pageSize,
          offset: this.pageSize,
          conding: "bookName=" + this.search
        }
        ).then(res=>{
          this.tableData = res.data;
          console.log(res);

        }).catch(error=>{
            console.log(error)
        });
        // getCount
        this.$axios.post( this.HOST + "/book/getCount",
            {
              limit: (this.currentPage1 - 1) * this.pageSize,
              offset: this.pageSize,
              conding: "bookName=" + this.search
            }
          ).then(res=>{
            this.totalPageSize = res.data;
            console.log(res);

        }).catch(error=>{
            console.log(error)
        });
          }
        },
    created(){
      this.updateTableDate();
    }
  }
</script>

<style scoped>
.search-div {
  width: 200px;
}
</style>

<template>
	<div>
		<h1>{{id}}</h1>
    <div>
      <el-button @click="viewGoback">返回</el-button>
    </div>
		<el-row>
		  <el-col :span="4"><div class="grid-content bg-purple">书名：</div></el-col>
		  <el-col :span="4"><div class="grid-content bg-purple-light">{{book.bookName}}</div></el-col>
		  <el-col :span="4"><div class="grid-content bg-purple">数量：</div></el-col>
		  <el-col :span="4"><div class="grid-content bg-purple-light">{{book.bookCounts}}</div></el-col>
		  <el-col :span="4"><div class="grid-content bg-purple">描述：</div></el-col>
		  <el-col :span="4"><div class="grid-content bg-purple-light">{{book.detail}}</div></el-col>
		</el-row>
	</div>
</template>

<script>
	export default({
		name:'bookView',
		props: ['id'],
		data(){
			return{
				bookId: this.id,
				book: {}
			}
		},
		methods:{
			getBook(){
				this.$axios.get( this.HOST + "/book/get",{
						params :{
							booksId: this.bookId
						}
					}
			        ).then(res=>{
			          this.book = res.data;
			          console.log(res);

			        }).catch(error=>{
			            console.log(error)
			        });
      },
      goback(){
        this.$router.go(-1);  //  利用路由返回上一个页面
      }
		},
		created(){
			console.log(this.bookId);
      		this.getBook();
    	}
	})
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
<template>
	<div>
		<h1>{{id}}</h1>
		<el-row>
		<el-col :span="4"><div class="grid-content bg-purple">ID：</div></el-col>
		<el-col :span="4"><div class="grid-content bg-purple-light">{{book.bookId}}</div></el-col>
		  <el-col :span="4"><div class="grid-content bg-purple">书名：</div></el-col>
		  <el-input v-model="book.bookName"></el-input>
		  <el-col :span="4"><div class="grid-content bg-purple">数量：</div></el-col>
		  <el-input v-model="book.bookCounts" ></el-input>
		  <el-col :span="4"><div class="grid-content bg-purple">描述：</div></el-col>
		  <el-input v-model="book.detail"></el-input>
		</el-row>

		<el-button type="primary" @click="saveBook">保存</el-button>
	</div>
</template>

<script>
	export default({
		name:'bookEdit',
		props: ['id'],
		data(){
			return{
				book: {
					bookId: this.id,
					bookName: '',
					bookCounts: '',
					detail: ''
				}
			}
		},
		methods:{
			getBook(){
				this.$axios.get( this.HOST + "/book/get",{
						params :{
							booksId: this.book.bookId
						}
					}
			        ).then(res=>{
			          this.book = res.data;
			          console.log(res);

			        }).catch(error=>{
			            console.log(error)
			        });
			},
			saveBook(){
				this.$axios.post( this.HOST + "/book/save",
							this.book
					
			        ).then(res=>{
			          this.book = res.data;
			          console.log(res);

			        }).catch(error=>{
			            console.log(error)
			        });
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
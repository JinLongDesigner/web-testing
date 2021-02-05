<template>
    <Layout>
    <div class="container">
        <img class="img"
        v-for="(item,index) in srcList"
        :key="index"
        @click="preImg(item,index)"
        :src="item">
        <div class="up">
            <el-upload
            action="http://localhost:3000/upload?user=1"
            :limit="1"
            :on-exceed="handleExceed"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :file-list="fileList">
              <img src="../images/add.png" alt="">
          </el-upload>
        </div>
        <el-dialog :visible.sync="dialogVisible" title="Picture Viewer">
            <img width="100%" :src="dialogImageUrl" alt="">
            <el-button style="margin-top:10px" @click="delate(index)" type="danger" icon="el-icon-delete" circle></el-button>
        </el-dialog>
    </div>
    </Layout>
</template>

<script>
    import Layout from '@/components/Layout.vue'
    export default {
        components: {
            Layout
        },
        data(){
            return{
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                srcList: [
                    'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
                    'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
                    'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
                    'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
                ],
                dialogImageUrl: '',
                dialogVisible: false,
                index:null,
                fileList:[]
            }
        },
        created(){
            this.$axios.get("/upload/getImg?user="+localStorage.getItem("userId")).then(res=>{
                console.log(res)
                this.srcList=this.srcList.concat(res.data.data)
            }).catch(err=>console.log(err))
        },
        methods:{
            preImg(url,index){
                this.dialogVisible = true
                this.dialogImageUrl = url
                this.index = index
            },
            delate(index){
                console.log(index)
                this.srcList.splice(index,1)
                this.dialogVisible = false
            },
            handleExceed(files, fileList) {
                this.$message.warning(`Currently limited to select 1 file, this time ${files.length} files are selected, a total of ${fileList.length} files are selected`);
            },
            beforeUpload(file){
                const isJPG = (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/bmp' || file.type === 'image/gif');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('Uploaded profile picture format is not supported!');
                }
                if (!isLt2M) {
                this.$message.error('Uploaded avatar image size cannot exceed 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleAvatarSuccess(){
                console.log("成功")
            }
        }
        
    }
</script>

<style scoped>
    .container{
        width: 100%;
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        flex-wrap: wrap;
    }
    .img,.up{
        height: 260px;
        border-radius: 5px;
        width: calc(calc(100% / 5) - 20px);
        margin: 10px;
    }
    .up{
        background-color: #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .up img{
        width: 50px;
        height: 50px;
    }
</style>
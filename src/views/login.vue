<template>
    <div class="login">
        <div class="content">
            <div class="title">Solar System Monitoring Platform</div>
            <div class="inp">
                <div>
                    <label for="">User Name</label>
                    <el-input placeholder="Please input Username" v-model="user" clearable></el-input>
                </div>
                <div>
                    <label for="">Password</label>
                    <el-input placeholder="Please input password" v-model="password" show-password></el-input>
                </div>
                
            </div>
            <div class="btn" @click="login">Login</div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                user:'',
                password:''
            }
        },
        methods:{
            login(){
                this.$axios.post("/login/login",{
                    user:this.user,
                    password:this.password
                }).then(res=>{
                    console.log(res)
                    if(res.data.code == 200){
                        window.localStorage.setItem("userId",res.data.data.userId)
                        this.$router.push({
                            name:"Index"
                        })
                    }

                }).catch(err=>console.log(err))
                
            }
        }
    }
</script>

<style scoped>
    .login{
        width: 100%;
        height: 100vh;
        background-color: #f6f6f6;
        position: relative;
    }
    .content{
        width: 50%;
        height: 400px;
        margin-left: 25%;
        background-color: #fff;
        position: absolute;
        left: 0;
        top: 100px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }
    .title{
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 24px;
        font-weight: 700;
    }
    .inp{
        margin-top: 40px;
        width: 60%;
        height: 100px;
        margin-left: 20%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .inp>div{
         display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
    }
    .inp label{
        position: absolute;
        width: 100px;
        height: 40px;
        line-height: 40px;
        left: -110px;
        top: 0;
    }
    .btn{
        margin-top: 60px;
        width: 60%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: rgb(64, 158, 255);
        margin-left: 50%;
        transform: translateX(-50%);
        color: #fff;
        border-radius: 5px;
        font-size: 15px;
    }
</style>
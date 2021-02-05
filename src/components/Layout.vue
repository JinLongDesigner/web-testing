<template>
  <div class="main">
        <div id="nav">
          <el-menu
            :default-active="activeNav"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          > 
            <div class="info">Admin</div>
            <el-menu-item index="/dashboard" style="padding-left:40px">
              <i class="el-icon-odometer"></i>
              <span slot="title">Dashboard</span>
            </el-menu-item>
            <el-menu-item index="/advanced" style="padding-left:40px">
              <i class="el-icon-menu"></i>
              <span slot="title">Advanced</span>
            </el-menu-item>
            <el-menu-item index="/deviceList" style="padding-left:40px">
              <i class="el-icon-document"></i>
              <span slot="title">Device list</span>
            </el-menu-item>
            <el-menu-item index="/photo" style="padding-left:40px">
              <i class="el-icon-camera-solid"></i>
              <span slot="title">Photos</span>
            </el-menu-item>
            <el-menu-item index="/alarmLog" style="padding-left:40px">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">Alarm logs</span>
            </el-menu-item>

            <div class="logout" @click="logOut">
              <i class="el-icon-switch-button"></i>
              <span>Log out</span>
            </div>
          </el-menu>
        </div>
        <div class="box">
          <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
        activeNav:"1"
    };
  },
  methods:{
    logOut(){
      this.$axios.get("/login/logout?user="+localStorage.getItem("userId")).then(res=>{
        console.log(res)
        if(res.data.code == 200){
          this.$router.push({
            name:"login"
          })
        }
      }).catch(err=>console.log(err))
      
    }
  },
  mounted(){
    this.activeNav = this.$route.path
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  width: 100vw;
  display: flex;
  justify-content: space-between;
}
#nav {
  width: 200px;
}
.box{
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-color: #fff;
  scrollbar-width: none; 
  -ms-overflow-style: none;
  
}
.box::-webkit-scrollbar {
  display: none; 
}

.info{
  height: 80px;
  line-height: 80px;
  background-color: #545c64;
  border-bottom: 1px solid #666;
  text-align: center;
  font-size: 22px;
  color: #fff;
  cursor: default;
}
.logout{
  margin-top: 20px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 15px;
  color: #fff;
}
.logout i{
  margin-right: 5px;
}
.logout:hover{
  background-color:rgb(67, 74, 80);
}
#nav .el-menu{
  width: 200px;
  height: 100vh;
}
#nav .el-menu-item{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>

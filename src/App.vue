<template>
  <div id="app">
    <!-- <div class="main">
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
            <el-menu-item index="/1" style="padding-left:40px">
              <i class="el-icon-location"></i>
              <span slot="title">Dashboard</span>
            </el-menu-item>
            <el-menu-item index="/2" style="padding-left:40px">
              <i class="el-icon-menu"></i>
              <span slot="title">Advanced</span>
            </el-menu-item>
            <el-menu-item index="/3" style="padding-left:40px">
              <i class="el-icon-document"></i>
              <span slot="title">Device list</span>
            </el-menu-item>
            <el-menu-item index="/4" style="padding-left:40px">
              <i class="el-icon-setting"></i>
              <span slot="title">Photos</span>
            </el-menu-item>
            <el-menu-item index="/5" style="padding-left:40px">
              <i class="el-icon-setting"></i>
              <span slot="title">Alarm logs</span>
            </el-menu-item>

            <div class="logout">
              <i class="el-icon-switch-button"></i>
              <span>Log out</span>
            </div>
          </el-menu>
        </div>
        <div class="box">
          <router-view />
        </div>
    </div> -->
    <router-view />
    <!-- <router-link to="/">index</router-link> |
    <router-link to="/about">About</router-link> -->
    
  </div>
</template>
<script>
export default {
  data() {
    return {
        // activeNav:"1"
    };
  },
  methods: {
    
  },
  mounted() {
    // this.activeNav = this.$route.path
  },
};
</script>
<style>
body{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  -moz-user-select:none; /* Firefox私有属性 */
  -webkit-user-select:none; /* WebKit内核私有属性 */
  -ms-user-select:none; /* IE私有属性(IE10及以后) */
  -khtml-user-select:none; /* KHTML内核私有属性 */
  -o-user-select:none; /* Opera私有属性 */
  user-select:none; /* CSS3属性 */
}
/* .main{
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
} */
</style>

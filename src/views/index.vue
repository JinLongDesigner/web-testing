<template>
    <Layout>
    <div class="container">
        <div class="head">
            <div class="l">
                <img src="../images/head.png" alt="">
                <span>{{address}}</span>
            </div>
            <div class="r">
                <div class="navText" v-for="item in navTitle" :key="item.title">
                    <span>{{item.title}}</span>
                    <span>{{item.value}}</span>
                </div>
            </div>
        </div>
        <div class="content">
            <el-dialog
                title=""
                :visible.sync="dialogVisible"
                width="60%"
                top="5vh"
                :before-close="handleClose">
                <!-- <div class="dia"> -->
                    <video height="450px" controls>
                        <source src="https://www.runoob.com/try/demo_source/movie.mp4" type="video/mp4">
                    </video>
                    <!-- <el-image v-for="url in urls" :key="url" :src="url" lazy @click="showImg(url)"></el-image> -->
                <!-- </div> -->
            </el-dialog>
            <div class="draw">
                <div class="draws">
                    <img class="img" src="../images/carams.png" alt="" @click="dialogVisible = true">
                    <div class="switch">
                        <div class="ks1" :class="ks1"></div>
                        <div class="ks2" :class="ks2"></div>
                        <div class="ks3" :class="ks3"></div>
                        <div class="ks4" :class="ks4"></div>
                    </div>
                    <div class="switch_text">
                        <p>ks1:{{ks1}}</p>
                        <p>ks2:{{ks2}}</p>
                        <p>ks3:{{ks3}}</p>
                        <p>ks4:{{ks4}}</p>
                    </div>
                    <img class="swImg" :src="lockState=='on'?require('../images/on.png'):require('../images/off.png')" alt="">
                    <div class="lock">Door lock:{{lockState}}</div>
                </div>
            </div>
            <div class="chart">
                <div class="select">
                    <el-select v-model="value" placeholder="请选择" @change="selectChange">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>

                    <div class="typeSe">
                        <el-button icon="el-icon-arrow-left" @click="goLeft"></el-button>
                        <div class="put">{{select[i]}}</div>    
                        <el-button icon="el-icon-arrow-right" @click="goRight"></el-button>
                    </div>
                </div>
                <div class="echarts" ref="echarts"></div>
                <div class="realTime">
                    <div class="realData" v-for="item in realData" :key="item.key">
                        <span>{{item.key}}</span>
                        <span>{{item.value}}kW/h</span>
                    </div>
                </div>   
            </div>
        </div>
    </div>
    </Layout>
</template>

<script>
    import Layout from '@/components/Layout.vue'
    const echarts = require('echarts');
    export default {
        name: 'Index',
        components: {
            Layout
        },
        data() {
            return {
                address:"",
                navTitle:[
                    {
                        title:"Last updated",
                        value:""
                    },
                    {
                        title:"Status",
                        value:""
                    },
                    {
                        title:"Local time",
                        value:""
                    }
                ],
                ks1:"off",
                ks2:"off",
                ks3:"off",
                ks4:"off",
                lockState:"off",
                options: [{
                value: '1',
                label: 'System Overview'
                }, {
                value: '2',
                label: 'From Solar'
                }, {
                value: '3',
                label: 'From Diesel Generator'
                }, {
                value: '4',
                label: 'Battery'
                }],
                value: 'System Overview',
                select:["Today","This Week","last Week"," This Month","Last Month"],
                i:0,
                realData:[
                    {
                        key:"From Solar",
                        value:""
                    },
                    {
                        key:"From Diesel Generator",
                        value:""
                    },
                    {
                        key:"Bettery",
                        value:""
                    }
                ],
                dialogVisible: false,
                urls: [
                    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
                ],
                echartsDataX:[],
                echartsDataY1:[],
                echartsDataY2:[],
                echartsDataY3:[],
            }
        },
        created(){
            //获取用户信息
            this.$axios.get("/users/getUserInfo?user=admin").then(res=>{
                console.log(res)
                if(res.data.code == 200){
                    const {address, loginTime, networkTime, status} = res.data.data
                    this.address = address
                    this.navTitle[0].value = loginTime
                    this.navTitle[1].value = status
                    this.navTitle[2].value = networkTime
                }
            }).catch(err=>console.log(err))

            //获取设备信息
            this.$axios.get("/device?user=admin").then(res=>{
                console.log(res)
                if(res.data.code == 200){
                    const {light, door, solarPower, motorPower, power} = res.data.data
                    this.ks1 = light.s1
                    this.ks2 = light.s2
                    this.ks3 = light.s3
                    this.ks4 = light.s4
                    this.lockState = door
                    this.realData[0].value = solarPower
                    this.realData[1].value = motorPower
                    this.realData[2].value = power
                }
            }).catch(err=>console.log(err))


            //初始化图表数据
            this.echartsDataX = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
            this.echartsDataY1 = [0.5, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
            this.echartsDataY2 = [2.6, 5.9, 9.0, 0.25, 28.7, 70.7, 0.5, 82.2, 48.7, 18.8, 6.0, 2.3]
            this.echartsDataY3 = [5, 15, 50, 20, 70, 55, 20.3, 23.4, 100, 16.5, 90, 6.2]
        },
        watch:{
            echartsDataX:function(newVal){
                this.setCharts(newVal,this.echartsDataY1,this.echartsDataY2,this.echartsDataY3)
            },
            echartsDataY1:function(newVal){
                this.setCharts(this.echartsDataX,newVal,this.echartsDataY2,this.echartsDataY3)
            },
            echartsDataY2:function(newVal){
                this.setCharts(this.echartsDataX,this.echartsDataY1,newVal,this.echartsDataY3)
            },
            echartsDataY3:function(newVal){
                this.setCharts(this.echartsDataX,this.echartsDataY1,this.echartsDataY2,newVal)
            }
        },
        mounted() {
            this.InitEcharts()
        },
        methods: {
            selectChange(e){
                console.log(e)
            },
            goLeft(){
                if(this.i==0){
                    this.i = this.select.length-1
                }else{
                    this.i--
                }
                this.gos(this.select[this.i])
            },
            goRight(){
                if(this.i==this.select.length-1){
                    this.i = 0
                }else{
                    this.i++
                }
                this.gos(this.select[this.i])
            },
            gos(e){
                console.log(e)
                "Today","This Week","last Week"," This Month","Last Month"
                if(e == "Today"){
                    this.echartsDataX = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                    this.echartsDataY1 = [0.5, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
                    this.echartsDataY2 = [2.6, 5.9, 9.0, 0.25, 28.7, 70.7, 0.5, 82.2, 48.7, 18.8, 6.0, 2.3]
                    this.echartsDataY3 = [5, 15, 50, 20, 70, 55, 20.3, 23.4, 100, 16.5, 90, 6.2]
                }else if(e == "This Week"){
                    this.echartsDataX = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                    this.echartsDataY1 = [5, 49, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 64, 33]
                    this.echartsDataY2 = [2.6, 59, 9.0, 0.25, 28.7, 70.7, 5, 8.2, 48.7, 18.8, 6.0, 23]
                    this.echartsDataY3 = [50, 15, 50, 20, 7.0, 55, 2.3, 23.4, 10, 16.5, 9.0, 62]
                }else if(e == "last Week"){
                    this.echartsDataX = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                    this.echartsDataY1 = [50, 49, 7.0, 23.2, 25.6, 76.7, 3.6, 62.2, 32.6, 2.0, 64, 33]
                    this.echartsDataY2 = [26, 59, 9.0, 0.25, 28.7, 70.7, 50, 8.2, 48.7, 8.8, 6.0, 23]
                    this.echartsDataY3 = [50, 15, 5, 20, 7.0, 55, 2.3, 23.4, 100, 16.5, 9.0, 6.2]
                }else if(e == "This Month"){
                    this.echartsDataX = ['1.0', '2.0', '3.0', '4.0', '5.0', '6.0', '7', '8', '9', '10', '11', '12']
                    this.echartsDataY1 = [50, 49, 7.0, 23.2, 25.6, 76.7, 3.6, 62.2, 32.6, 2.0, 64, 33]
                    this.echartsDataY2 = [26, 59, 9.0, 0.25, 28.7, 70.7, 50, 8.2, 48.7, 8.8, 6.0, 23]
                    this.echartsDataY3 = [50, 15, 5, 20, 7.0, 55, 2.3, 23.4, 100, 16.5, 9.0, 6.2]
                }
                
            },
            InitEcharts(){
                this.dataCharts = echarts.init(this.$refs.echarts);
            },
            setCharts(val1,val2,val3,val4){
                var that = this
				this.dataCharts.setOption({
                    tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                            }
                        }
                    },
                    backgroundColor:"#ffffff",
                // toolbox: {
                //     feature: {
                //         dataView: {show: true, readOnly: false},
                //         magicType: {show: true, type: ['line', 'bar']},
                //         restore: {show: true},
                //         saveAsImage: {show: true}
                //     }
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '2%',
                    containLabel: true
                },
                legend: {
                    data: ['From Solar', 'From Diesel Generator', 'Battery']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: val1,
                        axisPointer: {
                            type: 'shadow'
                        },
                        splitLine: { //网格线
                            show: false //隐藏或显示
                        },
                        axisTick: {
                            show: false  //x轴刻度
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#cccccc', //x轴的颜色
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#696969', //坐标值的颜色
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'kW/h',
                        splitLine: { //网格线
                            show: false //隐藏或显示
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#cccccc', //x轴的颜色
                            },
                            show: true  //y轴隐藏或显示
                        },
                        axisTick: {
                            show: false  //x轴刻度
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#696969', //坐标值的颜色
                            }
                        }
                        // min: 0,
                        // max: 100,
                        // interval: 50,
                        // axisLabel: {
                        //     formatter: '{value} kW/h'
                        // }
                    },
                    {
                        type: 'value',
                        name: '%',
                        min: 0,
                        max: 100,
                        interval: 20,
                        splitLine: { //网格线
                            show: false //隐藏或显示
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#cccccc', //x轴的颜色
                            },
                            show: true  //y轴隐藏或显示
                        },
                        axisTick: {
                            show: false  //x轴刻度
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#696969', //坐标值的颜色
                            }
                        }
                        // axisLabel: {
                        //     formatter: '{value} %'
                        // }
                    }
                ],
                series: [
                    {
                        name: 'From Diesel Generator',
                        type: 'bar',
                        data: val2
                    },
                    {
                        name: 'From Solar',
                        type: 'bar',
                        data: val3
                    },
                    {
                        name: 'Bettery',
                        type: 'line',
                        yAxisIndex: 1,
                        data: val4
                    }
                ]
                })
            },
            handleClose(done) {
                done();
            },
            showImg(url){
                window.open(url,"blank");
            }
        },
    }
</script>

<style scoped>
    .container{
        width: 100%;
        background-color: #fff;

    }
    .head{
        height: 80px;
        width: 100%;
        border-bottom: 1px solid #cfcfcf;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-shadow: 0 0 3px #ccc;
    }
    .head .l{
        flex: 1;
        display: flex;
        align-items: center;
        padding: 10px;
        
    }
    .head .l img{
        height: 40px;
        width: 40px;
        margin-left: 30px;
    }
    .head .l span{
        font-size: 18px;
        font-weight: 700;
        margin-left: 15px;
        text-align: left;
    }
    .head .r{
        flex: 1;
        display: flex;
    }
    .head .r .navText{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #000;
        font-weight: 700;
        font-size: 15px;
    }
    .navText span{
        padding: 3px 0;
    }
    .navText span:first-child{
        color: #ccc;
        font-weight: 500;
    }
    .content{
        width: 100%;
        height: 87vh;
        box-sizing: border-box;
        display: flex;
        background-color: #fff;
    }
    .content .draw{
        flex: 1;
        /* background-color: #f6f6f6; */
    }
    .draws{
        width: 70%;
        height: 70%;
        border: 1px solid #9c9c9c;
        margin-left: 10%;
        margin-top: 15%;
        position: relative;
    }
    .draws .img{
        width: 60px;
        height: 60px;
        position: absolute;
        top: -33px;
        right: -55px;
    }
    .draws .switch{
        width: 70px;
        height: 80px;
        border: 1px solid #363636;
        position: absolute;
        top: 60px;
        right: 10px;
        background-color: #666;
        border-radius: 3px;
    }
    .draws .switch div{
        width: 15px;
        height: 15px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
    }
    .ks1{
        top: 10px;
        left: 10px;
    }
    .ks2{
        top: 10px;
        right: 10px;
    }
    .ks3{
        bottom: 10px;
        right: 10px;
    }
    .ks4{
        bottom: 10px;
        left: 10px;
    }
    .draws .switch .on{
        background-color: #fff;
    }
    .draws .switch .off{
        background-color: #000;
    }
    .draws .switch_text{
        position: absolute;
        right: 110px;
        top: 30px;
    }
    .switch_text p{
        margin: 10px 0;
        font-size: 16px;
        color: #333;
    }
    .draws .swImg{
        display:120px;
        height: 120px;
        position: absolute;
        bottom: 0px;
        right: 0px;
        
    }
    .draws .lock{
        position: absolute;
        bottom: 55px;
        right: 120px;
    }
    .content .chart{
        flex: 1;
    }
    .chart .select{
        width: 100%;
        display: flex;
        justify-content: space-around;
        padding: 20px;
        box-sizing: border-box;
    }
    .typeSe{
        width: 260px;
        height: 40px;
        display: flex;
        justify-content: space-between;
    }
    .typeSe .el-button{
        padding: 12px 14px;
    }
    .typeSe .put{
        width: 160px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #DCDFE6;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 3px;
    }
    .chart .echarts{
        width: 90%;
        margin-left: 5%;
        height: 40vh;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid #e1e1e1;
        background-color: #fff;
    }
    .chart .realTime{
        width: 100%;
        height: 30vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 40px;
        box-sizing: border-box;
    }
    .realTime .realData{
        width: 150px;
        height: 70px;
        padding: 5px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background-color: #fff;
        box-shadow: 0 0 5px #cccccc;
        color: #666;
        font-size: 14px;
        border-radius: 5px;
    }
    .realTime .realData span:last-child{
        color: #000;
        font-size: 23px;
    }
    /* .dia{
        width: 100%;
        height: 400px;
        overflow: auto;
    } */
</style>
<template>
  <Layout>	
  <div class="container">
      <div class="t" ref="echarts"></div>
  </div>
  </Layout>
</template>

<script>
  const echarts = require('echarts');
  import Layout from '@/components/Layout.vue'
  export default {
	components: {
        Layout
	},
    data(){
      return{
		  time:[],
		  current:[],
		  voltage:[]
      }
	},
	created(){
		this.$axios.get("/device/electricity?user=admin").then(res=>{
			console.log(res)
			if(res.data.code == 200){
				const {current,voltage} = res.data.data
				current.forEach(element => {
					this.time.push(element.time)
					this.current.push(element.value)
				});
				voltage.forEach(element => {
					this.voltage.push(element.value)
				});
			}
		}).catch(err=>console.log(err))
	},
	watch:{
		time:function(newVal,oldVal){
			this.setCharts(newVal,this.current,this.voltage)
		},
		current:function(newVal,oldVal){
			this.setCharts(this.time,newVal,this.voltage)
		},
		voltage:function(newVal,oldVal){
			this.setCharts(this.time,this.current,newVal)
		}
	},
    mounted(){
		this.InitEcharts()
    },
    methods: {
		InitEcharts(){
			this.dataCharts = echarts.init(this.$refs.echarts);
		},
		setCharts(val1,val2,val3){
			var that = this
			this.dataCharts.setOption({
				title: {
					text: 'Output current and voltage',
					left: 'center', 
					textStyle: {
						color:'#666',
						fontWeight:100,
						fontSize:18,
						lineHeight: 30,
					}
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line' 
					}
				},
				legend: {
					right:40,
					data: ['Current', 'Voltage']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '2%',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap:false,
						data: val1,
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
						axisLine: {
							lineStyle: {
								color: '#cccccc', //x轴的颜色
							},
							show: true  //y轴隐藏或显示
						},
						splitLine: { //网格线
							lineStyle: {
								color: ['#e0e0e0'],
								type: 'solid' //设置网格线类型 dotted：虚线   solid:实线
							},
							show: true //隐藏或显示
						},
						axisTick: {
							show: false  //x轴刻度
						},
						axisLabel: {
							textStyle: {
								color: '#696969', //坐标值的颜色
							}
						}
					}
				],
				series: [
					{
						name: 'Current',
						type: 'line',
						color: ['#fbc531'],
						showSymbol:false,
						lineStyle:{
							width:1
						},
						smooth: 0.1,//曲线平滑度0-1
						data: val2
					},
					{
						name: 'Voltage',
						type: 'line',
						color: ['#00a8ff'],
						showSymbol:false,
						lineStyle:{
							width:1
						},
						smooth: 0.1,//曲线平滑度0-1
						data: val3
					}
				]
			})
		}
    },
  }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f6f6f6;
    padding: 20px;
    box-sizing: border-box;
  }
  .t{
    width: 100%;
    flex: 1;
    background-color: #fff;
	padding: 30px 0;
    box-sizing: border-box;
  }

</style>

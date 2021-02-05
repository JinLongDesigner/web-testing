<template>
    <Layout>
    <div class="container">
        <div class="head">
            Alarm Logs for 01 MANTO VERDE RADAR 151XT
        </div>
        <div class="content">
            <div class="device">
                <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                label="Device">
                <template slot-scope="scope">
                    <i class="el-icon-video-camera-solid"></i>
                    <span style="margin-left: 10px">{{ scope.row.address }}</span>
                </template>
                </el-table-column>
                <el-table-column
                    label="Triggered by">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="Description">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="Started at">
                    <template slot-scope="scope">
                        <span>{{ scope.row.voltage }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="Cleared after">
                    <template slot-scope="scope">
                        <span>{{ scope.row.power }}</span>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            
            <div class="page">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
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
                currentPage:2,
                total:100,
                tableData: [
                    {
                        address: 'Smart Door low BAT Alarm',
                        name: 'No data',
                        status: 'No data alarm',
                        voltage:'2021-1-19 15:21:03',
                        power:'20h 30m 5s'
                    },
                    {
                       address: 'Smart Door low BAT Alarm',
                        name: 'No data',
                        status: 'No data alarm',
                        voltage:'2021-1-19 15:21:03',
                        power:'20h 30m 5s'
                    },
                    {
                        address: 'Smart Door low BAT Alarm',
                        name: 'No data',
                        status: 'No data alarm',
                        voltage:'2021-1-19 15:21:03',
                        power:'20h 30m 5s'
                    },
                    {
                        address: 'Smart Door low BAT Alarm',
                        name: 'No data',
                        status: 'No data alarm',
                        voltage:'2021-1-19 15:21:03',
                        power:'20h 30m 5s'
                    },
                    {
                        address: 'Smart Door low BAT Alarm',
                        name: 'No data',
                        status: 'No data alarm',
                        voltage:'2021-1-19 15:21:03',
                        power:'20h 30m 5s'
                    },
                    {
                        address: 'Smart Door low BAT Alarm',
                        name: 'No data',
                        status: 'No data alarm',
                        voltage:'2021-1-19 15:21:03',
                        power:'20h 30m 5s'
                    },
                    {
                       address: 'Smart Door low BAT Alarm',
                        name: 'No data',
                        status: 'No data alarm',
                        voltage:'2021-1-19 15:21:03',
                        power:'20h 30m 5s'
                    },
                    {
                        address: 'Smart Door low BAT Alarm',
                        name: 'No data',
                        status: 'No data alarm',
                        voltage:'2021-1-19 15:21:03',
                        power:'20h 30m 5s'
                    },
                    {
                        address: 'Smart Door low BAT Alarm',
                        name: 'No data',
                        status: 'No data alarm',
                        voltage:'2021-1-19 15:21:03',
                        power:'20h 30m 5s'
                    },
                    {
                        address: 'Smart Door low BAT Alarm',
                        name: 'No data',
                        status: 'No data alarm',
                        voltage:'2021-1-19 15:21:03',
                        power:'20h 30m 5s'
                    }
                    
                ]
            }
        },
        methods:{
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
    }
    .head{
        height: 80px;
        line-height: 80px;
        width: 100%;
        border-bottom: 1px solid #cfcfcf;
        box-shadow: 0 0 3px #ccc;
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 20px;
        font-weight: 700;
    }
    .content{
        width: 100%;
        background-color: #f6f6f6;
        padding: 30px;
        box-sizing: border-box;
    }
    .content .device{
        width: 100%;
        min-height: 65.5vh;
        border: 1px solid #f1f1f1;
        border-bottom: 0;
        background-color: #fff;
    }
    .content .page{
        width: 100%;
        background-color: #fff;
        padding: 20px 0;
        border: 1px solid #f1f1f1;
        border-top: 0;
    }
</style>
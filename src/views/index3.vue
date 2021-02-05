<template>
    <Layout>
    <div class="container">
        <div class="head">
            el-icon-chat-dot-squareel-icon-chat-dot-squareel-icon-chat-dot-square
        </div>
        <div class="content">
            <div class="device">
                <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                label="Registered address">
                <template slot-scope="scope">
                    <i class="el-icon-video-camera-solid"></i>
                    <span style="margin-left: 10px">{{ scope.row.address }}</span>
                </template>
                </el-table-column>
                <el-table-column
                    label="Equipment name">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="equipment status">
                    <template slot-scope="scope">
                        <span>{{ scope.row.status }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="The output voltage">
                    <template slot-scope="scope">
                        <span>{{ scope.row.voltage }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="Output Power">
                    <template slot-scope="scope">
                        <span>{{ scope.row.power }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column label="operating">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        icon="el-icon-circle-plus-outline"
                        @click="handleEdit(scope.$index, scope.row)">Details</el-button>
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
                        address: 'Jinshajiang Road, Putuo District, Shanghai',
                        name: 'Wang Xiaohu',
                        status: 'status',
                        voltage:'Voltage',
                        power:'power'
                    },
                    {
                        address: 'Jinshajiang Road, Putuo District, Shanghai',
                        name: 'Wang Xiaohu',
                        status: 'status',
                        voltage:'Voltage',
                        power:'power'
                    },
                    {
                        address: 'Jinshajiang Road, Putuo District, Shanghai',
                        name: 'Wang Xiaohu',
                        status: 'status',
                        voltage:'Voltage',
                        power:'power'
                    },
                    {
                        address: 'Jinshajiang Road, Putuo District, Shanghai',
                        name: 'Wang Xiaohu',
                        status: 'status',
                        voltage:'Voltage',
                        power:'power'
                    },
                    {
                        address: 'Jinshajiang Road, Putuo District, Shanghai',
                        name: 'Wang Xiaohu',
                        status: 'status',
                        voltage:'Voltage',
                        power:'power'
                    },
                    {
                        address: 'Jinshajiang Road, Putuo District, Shanghai',
                        name: 'Wang Xiaohu',
                        status: 'status',
                        voltage:'Voltage',
                        power:'power'
                    },
                    {
                        address: 'Jinshajiang Road, Putuo District, Shanghai',
                        name: 'Wang Xiaohu',
                        status: 'status',
                        voltage:'Voltage',
                        power:'power'
                    },
                    {
                        address: 'Jinshajiang Road, Putuo District, Shanghai',
                        name: 'Wang Xiaohu',
                        status: 'status',
                        voltage:'Voltage',
                        power:'power'
                    },
                    {
                        address: 'Jinshajiang Road, Putuo District, Shanghai',
                        name: 'Wang Xiaohu',
                        status: 'status',
                        voltage:'Voltage',
                        power:'power'
                    },
                    {
                        address: 'Jinshajiang Road, Putuo District, Shanghai',
                        name: 'Wang Xiaohu',
                        status: 'status',
                        voltage:'Voltage',
                        power:'power'
                    }
                ]
            }
        },
        methods:{
            handleEdit(index, row) {
                console.log(index, row);
            },
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
        height: 87vh;
        background-color: #f6f6f6;
        padding: 20px;
        box-sizing: border-box;
    }
    .content .device{
        width: 100%;
        /* height: 60vh; */
        background-color: #f6f6f6;
    }
    .content .page{
        width: 100%;
        background-color: #fff;
        padding: 30px 0 40px;
    }
</style>
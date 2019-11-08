<template>
    <div class="home">
        <!-- 我是首页
    <icon-svg icon-class="icon-dianhua" class="home_icon"/>
       <circle-progress
        :id="1"
        :width="130"
        :radius="20"
        :progress="70"
        :delay="200"
        :duration="1000"
        barColor="#F2AE57"
        backgroundColor="#FFE8CC"
        :isAnimation="true"
        timeFunction="cubic-bezier(0.99, 0.01, 0.22, 0.94)"
        /> -->
        <el-table :data="tableData" style="width: 100%" align="center" @select="selectTable" @select-all="selectAll">
            <el-table-column v-if="idFlag" prop="id" label="id" align="center" width="180"> </el-table-column>
            <el-table-column type="selection" align="center" width="60"></el-table-column>
            <el-table-column prop="username" label="用户姓名" align="center" width="80"> </el-table-column>
            <el-table-column prop="address" label="籍贯" align="center" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="createTime" label="投资时间" align="center" sortable width="190">
                <template slot-scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="incomePayType" label="收支类型" align="center" width="130" :formatter="formatterType" :filters="fields.incomePayType.filter.list" :filter-method="filterType"> </el-table-column>
            <el-table-column prop="income" label="收入" align="center" width="130" sortable>
                <template slot-scope="scope">
                    <span style="color:#00d053">+ {{ scope.row.income }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="pay" label="支出" align="center" width="130" sortable>
                <template slot-scope="scope">
                    <span style="color:#f56767">{{ getPay(scope.row.pay) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="accoutCash" label="账户现金" align="center" width="130" sortable>
                <template slot-scope="scope">
                    <span style="color:#4db3ff">{{ scope.row.accoutCash }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="operation" align="center" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="warning" icon="edit" size="mini" @click="onEditMoney(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="delete" size="mini" @click="onDeleteMoney(scope.row, scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
        <addFundDialog v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow" @getFundList="getMoneyList" @closeDialog="hideAddFundDialog"></addFundDialog>
    </div>
</template>
<script>
// import circleProgress from './circle-progress'
import Pagination from './component/pagination'
import AddFundDialog from './component/addFundDialog'
import { getMoneyIncomePay, removeMoney } from '@/api'
export default {
    name: 'homes',
    data () {
        return {
            pageTotal: 0,
            loading: true,
            tableData: [],
            idFlag: false,
            isShow: false, // 是否显示资金modal,默认为false
            editid: '',
            rowIds: [],
            sortnum: 0,
            format_type_list: {
                0: '提现',
                1: '提现手续费',
                2: '提现锁定',
                3: '理财服务退出',
                4: '购买宜定盈',
                5: '充值',
                6: '优惠券',
                7: '充值礼券',
                8: '转账'
            },
            addFundDialog: {
                show: false,
                dialogRow: {}
            },
            incomePayData: {
                page: 1,
                limit: 20,
                name: ''
            },
            fields: {
                incomePayType: {
                    filter: {
                        list: [
                            {
                                text: '提现',
                                value: 0
                            },
                            {
                                text: '提现手续费',
                                value: 1
                            },
                            {
                                text: '提现锁定',
                                value: 2
                            },
                            {
                                text: '理财服务退出',
                                value: 3
                            },
                            {
                                text: '购买宜定盈',
                                value: 4
                            },
                            {
                                text: '充值',
                                value: 5
                            },
                            {
                                text: '优惠券',
                                value: 6
                            },
                            {
                                text: '充值礼券',
                                value: 7
                            },
                            {
                                text: '转账',
                                value: 8
                            }
                        ],
                        multiple: true
                    }
                }
            }
        }
    },
    components: {
        //   circleProgress
        Pagination,
        AddFundDialog
    },
    mounted () {
        this.getMoneyList()
        // document.getElementById('content').addEventListener('scroll', this.handleScroll, true)
    },
    methods: {
        onDeleteMoney (row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            })
                .then(() => {
                    const para = { id: row.id }
                    removeMoney(para).then(res => {
                        console.log(res)
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getMoneyList()
                    })
                })
                .catch(() => { })
        },
        // 编辑操作方法
        onEditMoney (row) {
            //   console.log(row)
            this.addFundDialog.dialogRow = row
            this.showAddFundDialog()
        },
        showAddFundDialog (val) {
            // console.log(val)
            this.$store.commit('SET_DIALOG_TITLE', val)
            this.addFundDialog.show = true
        },
        hideAddFundDialog () {
            this.addFundDialog.show = false
        },
        handleSizeChange (val) {  // 每页显示多少条
            this.incomePayData.limit = val
            this.getMoneyList()
        },
        handleCurrentChange (val) { // 上下分页
            this.incomePayData.page = val
            this.getMoneyList()
        },
        isInteger (s) {
            var re = /^[0-9]+$/;
            return re.test(s)
        },
        getPay (val) {
            if (this.isInteger(val)) {
                return -val
            } else {
                return val
            }
        },
        getMoneyList () {
            getMoneyIncomePay(this.incomePayData).then(res => {
                console.log(res)
                this.pageTotal = res.data.total
                this.tableData = res.data.moneyList
            })
        },
        formatterType (item) {
            const type = parseInt(item.incomePayType)
            return this.format_type_list[type]
        },
        filterType (value, item) {
            const type = parseInt(item.incomePayType)
            // return value === item.incomePayType // 第一种写法
            return this.format_type_list[value] == this.format_type_list[type] // 第二种写法
        },
        handleScroll (e) {
            console.log(e)
            // var scrollTop = document.getElementById('content').scrollTop
            // console.log(scrollTop)
        },
        // 当用户手动勾选数据行的 Checkbox 时触发的事件
        selectTable (val, row) {
            this.setSearchBtn(val)
        },
        selectAll (val) {
            console.log(val)
        }
    }
}
</script>
<style scoped>
#content {
    /* overflow-y: auto; */
    height: 300px;
}
.home_icon {
    font-size: 60px;
    /* color:red; */
    /* fill:red; */
}
</style>

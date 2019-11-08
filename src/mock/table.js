import Mock from 'mockjs'

let List = []
const count = 60
let typelist = [1, 2, 3, 4, 5, 6, 7, 8]

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: Mock.Random.guid(),
        username: Mock.mock('@cname'),
        // username: Mock.Random.cname(),
        address: Mock.mock('@county(true)'),
        createTime: Mock.Random.datetime(),
        income: Mock.Random.float(0, 9999, 2, 2),
        pay: Mock.Random.float(-5999, 0, 2, 2),
        accoutCash: Mock.Random.float(0, 9999, 2, 2),
        'incomePayType|1': typelist
    }))
}
var param2Obj = url => {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}
export default {
    /**
     * 获取列表
     * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
     * @param name, page, limit
     * @return {{code: number, count: number, data: *[]}}
     */
    getMoneyList: config => {
        const {
            name,
            page = 1,
            limit = 20
        } = param2Obj(config.url)
        const mockList = List.filter(user => {
            // console.log(name)
            if (name && user.username.indexOf(name) === -1) return false
            return true
        })
        // console.log(mockList)
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 200,
            data: {
                total: mockList.length,
                moneyList: pageList
            }
        }
    },
    deleteMoney: config => {
        const {
            id
        } = param2Obj(config.url)
        if (!id) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            List = List.filter(u => u.id !== id)
            return {
                code: 200,
                data: {
                    message: '删除成功'
                }
            }
        }
    },
    updateMoney: config => {
        const {
            id,
            username,
            address,
            income,
            pay,
            accoutCash,
            incomePayType
        } = param2Obj(config.url)
        List.some(u => {
            if (u.id === id) {
                u.username = username
                u.address = address
                u.income = income
                u.pay = pay
                u.accoutCash = accoutCash
                u.incomePayType = incomePayType
                return true
            }
        })
        return {
            code: 200,
            data: {
                message: '编辑成功'
            }
        }
    }
}
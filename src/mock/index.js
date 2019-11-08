import Mock from 'mockjs'

import tableAPI from './table'
import userAPI from './user'
Mock.setup({
    timeout: '300-600'
})

Mock.mock(/\/money\/get/, 'get', tableAPI.getMoneyList)
Mock.mock(/\/money\/remove/, 'get', tableAPI.deleteMoney)
Mock.mock(/\/money\/edit/, 'get', tableAPI.updateMoney)

Mock.mock(/\/user\/login/, 'get', userAPI.login)
Mock.mock(/\/user\/info\/get/, 'get', userAPI.getUserInfo)
Mock.mock(/\/user\/logout/, 'get', userAPI.logout)
export default Mock
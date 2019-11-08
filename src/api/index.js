import request from '../utils/request';

export const getMoneyIncomePay = p => request.get('/money/get', {
    params: p
}); // 获取盈利总览

export const updateMoney = p => request.get('/money/edit', {
    params: p
})

export const removeMoney = p => request.get('/money/remove', {
    params: p
})

export const login = p => request.get('/user/login', {
    data: p
})

export const getUserInfo = p => request.get('/user/info/get', {
    data: p
})

export const logout = p => request.get('/user/logout', { data: p })

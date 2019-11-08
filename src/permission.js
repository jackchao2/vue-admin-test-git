import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权(从cookie中获取)
import { getUserInfo } from "@/api";
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    // console.log(getToken('Token'))
    if (getToken('Token')) {  // 如果存在就拉取信息
        // console.log('执行了')
        if (store.getters.roles.length === 0) {
            let token = getToken('Token');
            getUserInfo({ "token": token }).then(res => {
                let userList = res.data.userList;
                store.commit("SET_ROLES", userList.roles);
                store.commit("SET_NAME", userList.name);
                store.commit("SET_AVATAR", userList.avatar);
                next({
                    ...to,
                    replace: true
                })
            })
        } else {
            next()
        }
    } else {
        // console.log('进来了')
        if (whiteList.indexOf(to.path) !== -1) {
            // 点击退出时,会定位到这里
            next()
        } else {
            next('/login')
        }
    }
})
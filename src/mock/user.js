import Mock from 'mockjs'

export default {
    logout: config => {
        console.log(config)
        return {
            code: 200,
            data: {
                userList: ""
            }
        }
    },
    login: config => {
        let data = JSON.parse(config.body);
        let userList = {};
        if (data.username === 'admin') {
            userList = {
                token: 'admin',
                name: '管理员',
            }
        } else if (data.username === 'editor') {
            userList = {
                token: 'editor',
                name: '赵晓编',
            }
        } else {
            return {
                code: -1,
                data: {
                    msg: "用户名错误",
                    status: 'fail'
                }
            }
        }
        return {
            code: 200,
            data: {
                userList: userList
            }
        }
    },
    getUserInfo: config => {
        // console.log(config)
        let data = JSON.parse(config.body);
        let userList = {};
        if (data.token === 'admin') {
            userList = {
                roles: ['admin'],
                name: 'admin',
                avatar: 'https://wx.qlogo.cn/mmopen/vi_32/un2HbJJc6eiaviaibvMgiasFNlVDlNOb9E6WCpCrsO4wMMhHIbsvTkAbIehLwROVFlu8dLMcg00t3ZtOcgCCdcxlZA/132'
            }
        } else if (data.token === 'editor') {
            userList = {
                roles: ['editor'],
                name: 'editor',
                avatar: 'https://mirror-gold-cdn.xitu.io/168e088859e325b9d85?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'
            }
        } else {
            userList = {}
        }
        return {
            code: 200,
            data: {
                userList: userList
            }
        }
    }
}
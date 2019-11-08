import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zh from '../common/lang/zh.js';
import en from '../common/lang/en.js';
Vue.use(VueI18n);
const messages = {
    "zh-CN": {
        ...zh
    },
    "en-US": {
        ...en
    }
}
const i18n = new VueI18n({
    locale: 'zh-CN', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale 
    messages
})

export default i18n
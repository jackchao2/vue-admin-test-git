<template>
    <div class="main">
        <el-container>
            <el-aside style="width:auto;">
                <div class="logo" v-if="!isCollapse">
                    <h1 class="logo_text">Admin</h1>
                </div>
                <div class="logo" v-else>
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </div>
                <menu-list :list="List" :isCollapse="isCollapse"></menu-list>
            </el-aside>
            <el-container>
                <el-header height="100px">
                    <div class="flex_header">
                        <i class="el-icon-menu" @click="isCollapse = !isCollapse"></i>
                        <div class="crumbs"></div>
                        <div class="custom-content-con">
                            <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
                                <i class="el-icon-rank screen" @click="buttoncli"></i>
                            </el-tooltip>
                            <el-popover placement="top" trigger="click" class="language_box">
                                <div class="language" @click="languageZh">中文</div>
                                <div class="language" @click="languageEn">英文</div>
                                <el-link slot="reference">语言<i class="el-icon-view el-icon-caret-bottom"></i> </el-link>
                                <!-- <el-button slot="reference">click 激活</el-button> -->
                            </el-popover>
                            <el-popover placement="top" trigger="hover" class="tool_title">
                                <div class="title_login">
                                    <p>消息中心</p>
                                    <p @click="logout">退出登录</p>
                                </div>
                                <el-avatar slot="reference" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            </el-popover>
                        </div>
                    </div>
                    <div class="crumbs_list">
                        <i class="el-icon-arrow-left"></i>
                        <p>
                            <el-tag v-for="(tag,index) in dynamicTags" :class="{'current':currentColor === index}" :key="index+''" :closable="tag.name !== '首页'" :disable-transitions="false" @click.native="setColor(tag,index)" @close="handleClose(tag,index)">
                                {{$t(tag.view)}}
                            </el-tag>
                        </p>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </el-header>
                <el-main class="main_el el-scrollbar">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
                <el-footer>Power By ST-Team 京ICP备10086号&nbsp;京公网安备10086</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import screenfull from 'screenfull'; // 全屏
import NavMenu from "@/mock/NavMenu";
import zh from '../common/lang/zh';
// @ is an alias to /src
import MenuList from "@/components/Menulist";
export default {
    name: "mains",
    components: {
        MenuList
    },
    data () {
        return {
            isCollapse: false,
            List: NavMenu,
            dynamicTags: [{ name: '首页', path: '/main', view: 'homeview' }],
            // dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            currentColor: 0,
        };
    },
    mounted () {

        if (this.$route.name !== '首页') {
            this.dynamicTags.push({
                name: this.$route.name,
                path: this.$route.path,
                view: this.$route.meta.view
            })
            this.currentColor = 1;
        }

        // console.log(this.$route)
    },
    watch: {
        '$route': function (newval, oldval) {
            // console.log(newval)
            const handleFlag = this.dynamicTags.some(item => { return item.name === newval.name })
            if (handleFlag) {
                this.currentColor = this.dynamicTags.findIndex(item => { return item.path === newval.path });
            } else {
                this.dynamicTags.push({
                    name: newval.name,
                    path: newval.path,
                    view: this.$route.meta.view
                })

                this.currentColor = this.dynamicTags.length - 1
                //  console.log(this.currentColor )
            }        }
        // console.log(newval)

    },
    methods: {
        logout () {
            this.$store.dispatch('LogOut').then(() => {
                location.reload();
            })
        },
        languageZh () {
            this.$i18n.locale = 'zh-CN';//关键语句

        },
        languageEn () {
            this.$i18n.locale = 'en-US';//关键语句
        },
        handleClose (tag, index) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            this.currentColor = this.dynamicTags.length - 1;
            this.$router.push(this.dynamicTags[index - 1].path);
        },
        buttoncli () { // 全屏
            if (!screenfull.enabled) { // 如果不允许进入全屏，发出不允许提示
                this.$message({
                    message: '不支持全屏',
                    type: 'warning'
                })
                return false
            }
            screenfull.toggle()
        },
        handleOpen (key, keyPath) {
            console.log(key, keyPath);
        },
        setColor (tag, index) {
            this.currentColor = index;
            this.$router.push(tag.path)
        }
    }
};
</script>
<style lang="stylus">
.main {
    overflow: hidden;
    height: 100vh;
}

.el-header {
    background-color: #fff;
    color: #333;
    padding: 0 !important;
}

.el-footer {
    text-align: center;
    background-color: #fff;
    color: #333;
    line-height: 60px;
}

.el-aside {
    background-color: #001529;
    color: #333;
    text-align: center;
}

.main_el {
    background-color: #fff;
    box-sizing: border-box;
    color: #333;
    border: 20px solid #E9EEF3;
    overflow-y: auto;
    height: calc(100vh - 160px);
}

// 竖向滚动条
.is-scroll-right::-webkit-scrollbar, .is-scroll-left::-webkit-scrollbar, .el-scrollbar::-webkit-scrollbar {
    width: 4px;
    height: 8px !important;
}

/* 滚动条的背景区域的内阴影 */
.el-scrollbar::-webkit-scrollbar-track {
    /* 滚动条的背景区域的圆角 */
    border-radius: 10px;
    /* 滚动条的背景颜色 */
    background-color: #ddd;
}

/* 滑块 滚动条的内阴影 */
.is-scroll-right::-webkit-scrollbar-thumb, .is-scroll-left::-webkit-scrollbar-thumb, .el-scrollbar::-webkit-scrollbar-thumb {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3) inset;
    background-color: #ccc;
    border-radius: 4px;
}

// 横向滚动条
::-webkit-scrollbar:horizontal {
    width: 0;
    height: 10px !important;
}

::-webkit-scrollbar-track:horizontal {
    background-color: #fff;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 280px;
}

.logo {
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo_text {
        color: #409EFF;
    }
}

.flex_header {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 20px;

    .crumbs {
        flex: 1;
        height: 60px;
    }

    .custom-content-con {
        display: flex;
        align-items: center;

        .tool_title {
            display: flex;
            align-items: center;
            margin-left: 20px;
        }
    }
}

.title_login {
    p {
        text-align: center;
        margin: 0;
        height: 30px;
        line-height: 30px;

        &:hover {
            background: #eee;
        }
    }
}

.el-popover {
    padding: 0;
}

.crumbs_list {
    box-shadow: inset 0 0 3px 2px hsla(0, 0%, 39.2%, 0.1);
    background: #E9EEF3;
    height: 40px;
    display: flex;
    align-items: center;

    p {
        flex: 1;
        padding-left: 10px;
    }

    i {
        width: 20px;
        height: 36px;
        text-align: center;
        line-height: 40px;
        background: #fff;
    }
}

.el-tag + .el-tag {
    margin-left: 10px;
}

.current {
    background: #409EFF;
    color: #fff;
}

.language {
    text-align: center;
    height: 30px;
    line-height: 30px;

    &:hover {
        background: #f3f3f3;
    }
}

.language_box {
    padding: 0;
}

.screen {
    font-size: 26px;
    margin-right: 20px;
}
</style>
<template>
    <div class="sidebar">
        {{activeIndex}}
        <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            @select="handleSelect">
            <el-menu-item :index="item.index"
                          v-for="(item,index) in items"
                          :key="index"
                          @click="handleClick(item)">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import {nxStore} from './index'

    export default {
        data() {
            return {
                activeIndex: '1'
            }
        },
        props: {
            items: {
                type: Array
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(inItem) {
                console.log('inItem:', inItem);
                this.activeIndex = inItem.index;
            },
            handleClick(inItem) {
                this.$router.push({name: inItem.router})
            }
        },
        created() {
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .sidebar {
        display: block;
        width: 250px;
        height: 100%;
        > .el-menu {
            .is-active {
                color: #4d7cfe;
            }
        }
    }

    .sidebar > ul {
        height: 100%;
        overflow: auto;
    }
</style>

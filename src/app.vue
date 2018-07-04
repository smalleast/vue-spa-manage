<template>
    <div id="app">
        <router-view></router-view>
        <div></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        created() {

        },
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    //外部引用
    @import "../node_modules/element-ui/lib/theme-default/index.css";
    @import "assets/fonts/iconfont.css";
    @import "../node_modules/flex-grid/dist/flex-grid.css";
    @import "../node_modules/flex-sass/dist/flex-sass.css";
    @import "../node_modules/pc-sass-generator/dist/pc-sass-generator.scss";
    @import "components/styles/index.scss";

    html, body {
        margin: 0;
        padding: 0;
        background-color: #F6F7FB;;
    }

    a {
        text-decoration: none;
    }

    .crumbs {
        margin-bottom: 20px;
    }

    .el-upload {
        width: 100%;
        height: 100%;

        .el-upload-dragger {
            width: 100%;
            height: 100%;
            padding: 0;
            background: transparent;
        }

    }
</style>

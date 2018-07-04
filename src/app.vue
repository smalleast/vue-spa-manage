<template>
    <div id="app">
        <router-view></router-view>
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
</style>

<template>
    <div class="my-next">
        <slot></slot>
    </div>
</template>

<script>

    export default {
        props: {
            total: {
                type: Number,
                default: 20
            },
            filter: {
                type: Object
            }
        },
        methods: {
            LoadMore() {
                 if ((this.filter.pageNum * this.filter.pageSize) < this.total) {
                    this.$emit('success', this.filter.pageNum + 1)
                }
            },
            isLoadMore() {
                let scrolltop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
                let documentHeight = document.body.scrollHeight;
                let winHeight = window.innerHeight;

                if ((documentHeight - scrolltop < 2 * winHeight) && scrolltop !== 0) {
                    this.LoadMore()
                }
            },
            debounce(method, delay) {
                let timer = null;
                return function () {
                    let self = this,
                        args = arguments;
                    timer && clearTimeout(timer);
                    timer = setTimeout(function () {
                        method.apply(self, args);
                    }, delay);
                }
            }
        },
        beforeMount() {
            window.addEventListener('scroll', this.debounce(this.isLoadMore, 500));
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.isLoadMore);
        }
    }
</script>

<style rel="stylesheet/scss">

</style>

<template>
    <div class="tag-inputs" @click="addLabel()">
        <div class="tag-input">
            <div class="tag-labels" id="tag-labels">
            <span class="tag-label" v-for="(label,index) in labels">
                {{label}}
                <i class="el-icon-close" style="font-size:10px;" @click="removeLabel(index)"></i>
            </span>
            </div>
            <input class="clear-input taginput" id="taginput" autocomplete="off"
                   @keydown="labeler($event)" v-model="labelNew" @blur="labelInputBlur">
            <div class="placeholder" id="placeholder" v-show="labels.length<1">输入文字，按空格或回车以生成标签</div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                labels:this.labelArr||[],
                labelNew:''
            }
        },
        props:{
            labelArr:{
                type:Array,
            }
        },
        watch:{
            labelArr:{
                handler:function(val){
                   if(!val||val.length<1){
                       this.labels = [];
                       this.labelInputBlur();
                   }
                }
            }
        },
        methods:{
            //点击按钮添加子节点
            addLabel(){
                let placeholder = document.getElementById('placeholder');
                let taginput = document.getElementById('taginput');
                taginput.focus();
                placeholder.style.display = 'none';
            },
            removeLabel(index){
                this.labels.splice(index, 1);
                this.$emit('changeLabels',this.labels);
            },
            labeler(e){
                let text = this.labelNew.trim();
                if (e.keyCode == '32' || e.keyCode == '13') {
                    this.pushLabel(text);
                }
            },
            pushLabel(text){
                if (text == '' || this.labels.includes(text)) {
                    this.labelNew = '';
                    document.getElementById('taginput').value = this.labelNew;
                }else{
                    this.labels.push(text);
                    this.labelNew = '';
                    document.getElementById('taginput').value = this.labelNew;
                    this.$emit('changeLabels',this.labels);
                }
            },
            labelInputBlur(){
                if(this.labelNew.trim()){
                    this.pushLabel(this.labelNew.trim());
                }
                if (!this.labels[0]) {
                    let placeholder = document.getElementById('placeholder');
                    placeholder.style.display = 'block';
                }
            },
        }
    }
</script>
<style scoped>
    .tag-inputs{
        border:1px solid #dfe6ec;
        width:300px;
        height:auto;
        text-align:center;
    }
    .tag-inputs .tag-input{
        cursor:text;
    }
    .tag-inputs #taginput{
        border: 0;
        background-color: transparent;
        box-shadow: none;
        width: 98px;
        height: 24px;
        vertical-align: middle;
        resize: none;
        outline: 0;
    }
    .tag-inputs .placeholder{
        position: absolute;
        display:block;
        top: 1px;
        left: 20px;
        font-size: 12px;
        color: #A2A2A8;
        letter-spacing: 3px;
    }
    .tag-inputs .tag-labels{
        display: inline;
        vertical-align: middle;
    }
    .tag-inputs .tag-labels .tag-label{
        display: inline-block;
        border-radius: 100px;
        margin: 2px 4px;
        height: 20px;
        line-height: 20px;
        padding: 0 8px;
        font-weight: 300;
        background: #DCE0E0;
    }
    .tag-inputs .tag-labels .tag-label i{
        cursor: pointer;
        font-size:14px;
    }
</style>

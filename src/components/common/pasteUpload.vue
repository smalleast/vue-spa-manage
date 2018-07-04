<template>
    <div class="paste">
        <div class="paste-container" id="tar_box" :contenteditable="!busy" ref="paste">
        </div>
        <p class="placeholder" v-loading.body="busy">ctrl+v 粘贴图片</p>
    </div>
</template>
<script>
    import api from '../../api'
    export default{
        data(){
            return {
                imageUrl:api.common.imgBaseUrl,
                data:{
                    type:this.type
                },
                busy:false
            }
        },
        methods:{
            paste(event){
                if ( event.clipboardData || event.originalEvent ) {
                    let _this = this;
                    let clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
                    if (clipboardData.items&&clipboardData.items.length) {
                        // for chrome
                        let items = clipboardData.items,
                            len = items.length,
                            blob = null;
                        //在items里找粘贴的image,据上面分析,需要循环
                        for (let i = 0; i < len; i++) {
                            if (items[i].type.indexOf("image") !== -1) {
                                blob = items[i].getAsFile();
                            }
                        }
                        if (blob !== null) {
                            _this.uploadImgFromPaste(blob);
                        }
                    }
                }
            },
            uploadImgFromPaste(file){
                this.busy = true;
                let formData = new FormData();
                formData.append('file', file);
                formData.append('type', 1);
                api.files.uploadImage(formData)
                    .then((res)=>{
                        this.$emit('uploadSuc',res[0]);
                        this.busy = false;
                    });
            }
        },
        porps:{
            type:{
                type:String
            }
        },
        mounted(){
            this.$refs.paste.addEventListener('paste',this.paste);
        },
        beforeDestroy(){
            this.$refs.paste.removeEventListener('paste',this.paste);
        }
    }
    function convertImgDataToBlob(base64Data) {
        let format = "image/jpeg";
        let base64 = base64Data;
        let code = window.atob(base64.split(",")[1]);
        let aBuffer = new window.ArrayBuffer(code.length);
        let uBuffer = new window.Uint8Array(aBuffer);
        for (let i = 0; i < code.length; i++) {
            uBuffer[i] = code.charCodeAt(i) & 0xff;
        }
        console.info([aBuffer]);
        console.info(uBuffer);
        console.info(uBuffer.buffer);
        console.info(uBuffer.buffer == aBuffer); //true

        let blob = null;
        try {
            blob = new Blob([uBuffer], {type: format});
        }
        catch (e) {
            window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;
            if (e.name == 'TypeError' && window.BlobBuilder) {
                let bb = new window.BlobBuilder();
                bb.append(uBuffer.buffer);
                blob = bb.getBlob("image/jpeg");

            }
            else if (e.name == "InvalidStateError") {
                blob = new Blob([aBuffer], {type: format});
            }
            else {

            }
        }
        return blob;
    }
</script>
<style>
    .paste{
        position:relative;
    }
    .paste-container{
        width:110px;
        height:60px;
        border:1px solid #ccc;
        position:relative;
        z-index:3;
    }
    .paste-container *{
        display:none;
    }
    .paste .placeholder{
        position:absolute;
        top:20px;
        left:10px;
        font-size:14px;
        color:#A2A2A8;
    }
</style>

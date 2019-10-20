<template>
    <div class="form-group">
        <h2>上传语音</h2>
        <label>
            语音中文名称
            <input type="text" v-model="zh_CN" class="form-control">
        </label>
        <label>
            语音日文名称
            <input type="text" v-model="ja_JP" class="form-control">
        </label>
        <label class="form-control-static">选择音频文件
            <input type="file" id="file" @change="getFile"></label>

        <button type="submit" @click="uploadItem" class="btn btn-primary">上传</button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "upload",
        data() {
            return {
                zh_CN: '',
                ja_JP: '',
                file: ''
            }
        },
        methods: {
            uploadItem() {
                let form = new FormData();
                form.append('file', this.file);
                form.append('zh_CN', this.zh_CN);
                form.append('ja_JP', this.ja_JP);
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                };
                axios.post("http://127.0.0.1:5000/api/upload", form, config).then(
                    response => (console.log(response.data))
                ) //TODO: 添加上传
            },
            getFile(e) {
                this.file = e.target.files[0]
            }
        }
    }
</script>

<style scoped>

</style>
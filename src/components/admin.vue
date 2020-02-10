<template>
    <div>
        <div class="form-group">
        <h2>上传语音</h2>
        <label>
            语音中文名称
            <input type="text" v-model="newVoice['zh_CN']" class="form-control">
        </label>
        <label>
            语音日文名称
            <input type="text" v-model="newVoice['ja_JP']" class="form-control">
        </label>
        <label class="form-control-static">选择音频文件
            <input type="file" id="file" @change="getFile"></label>

        <button type="submit" @click="uploadItem" class="btn btn-primary">上传</button>
    </div>
        <h2>分类</h2>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">分类序号(categoryID)</th>
                <th scope="col">分类中文名(zh-CN')</th>
                <th scope="col">分类日文名（ja-JP)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="category in voices" :key="category.categoryName">
                <td><input v-model="category['categoryName']"></td>
                <td><input v-model="category['categoryDescription']['zh-CN']"></td>
                <td><input v-model="category['categoryDescription']['ja-JP']"></td>
            </tr>
            </tbody>
        </table>
        <div style="text-align: center">
            <button type="button" style="margin: auto" @click="addCategory">添加分类</button>
        </div>

        <h2>音频列表</h2>
        <table class="table" v-for="category in voices" :key="category['categoryName']">
            <thead>
            <tr>
                <th scope="col">分类(categoryID)</th>
                <th scope="col">音频文件名(filename)</th>
                <th scope="col">音频中文名（zh-CN)</th>
                <th scope="col">音频日文名（ja-JP)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="voice in category.voiceList" :key="voice['path']">
                <td><input v-model="category['categoryName']"></td>
                <td><input v-model="voice['path']"></td>
                <td><input v-model="voice['description']['zh-CN']"></td>
                <td><input v-model="voice['description']['ja-JP']"></td>
            </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" style="float: right" @click="submitConfig">提交配置</button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Admin",
        data() {
            return {
                voices: [],
                file: '',
                newVoice: {}
            }
        },
        methods: {
            getVoice() {
            axios.get('voices.json').then(Response => (this.voices = Response['data']['voices']))
        },
            addCategory() {
                let model = {
                    "categoryName": "", "categoryDescription": {"zh-CN": "", "ja-JP": ""}, "voiceList": []
                };
                this.voices.push(model)
            },
            submitConfig() {
                axios.post('http://towa.matsuri.best/api/submit', {
                    voices: this.voices
                })
            },
            uploadItem() {
                let form = new FormData();
                form.append('file', this.file);
                form.append('zh_CN', this.newVoice['zh_CN']);
                form.append('ja_JP', this.newVoice['ja_JP']);
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                };
                axios.post("http://towa.matsuri.best/api/upload", form, config).then(
                    response => (console.log(response.data))
                );

            },
            getFile(e) {
                this.file = e.target.files[0]
            }
        },
        created() {
            this.getVoice()
        }
    }
</script>

<style scoped>

</style>
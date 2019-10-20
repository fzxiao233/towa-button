<template>
    <div>
        <upload></upload>
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
            <tr v-for="cata in r_category" :key="cata.categoryID">
                <td><input v-model="cata.categoryID"></td>
                <td><input v-model="cata['zh_CN']"></td>
                <td><input v-model="cata['ja_JP']"></td>
            </tr>
            </tbody>
        </table>
        <div style="text-align: center">
            <button type="button" style="margin: auto" @click="addCategory">添加分类</button>
        </div>

        <h2>音频列表</h2>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">分类(categoryID)</th>
                <th scope="col">音频文件名(filename)</th>
                <th scope="col">音频中文名（zh-CN)</th>
                <th scope="col">音频日文名（ja-JP)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="voice in r_voices" :key="voice['filename']">
                <td><input v-model="voice['categoryID']"></td>
                <td><input v-model="voice['filename']"></td>
                <td><input v-model="voice['zh_CN']"></td>
                <td><input v-model="voice['ja_JP']" @click="modify"></td>
            </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" style="float: right" @click="submitConfig">提交配置</button>
    </div>
</template>

<script>
    import axios from 'axios'
    import upload from "./upload";

    export default {
        name: "Admin",
        components: {
            upload: upload
        },
        data() {
            return {
                r_voices: [],
                r_category: [],
                voice_modify: [],
                category_modify: []
            }
        },
        methods: {
            get_config() {
                axios.get('http://127.0.0.1:5000/api/config')
                    .then(response => ((this.r_voices = response['data']['voices']),(this.r_category = response['data']['category'])))
            },
            modify(e) {
                console.log(e)
            },
            submitConfig() {
                axios.post("http://127.0.0.1:5000/api/config", {
                    config: JSON.stringify({voices: this.config})
                }).then(
                    response => (alert(response[data][msg]))
                )
            },
            addCategory() {
                let model = {
                    "categoryName": "", "categoryDescription": {"zh-CN": "", "ja-JP": ""}, "voiceList": []
                };
                this.config.push(model)
            }
        },
        created() {
            this.get_config()
        }
    }
</script>

<style scoped>

</style>
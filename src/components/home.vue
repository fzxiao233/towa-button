<template>
    <div class="container-fluid">
        <div>
            <div class="cate-header">{{ $t("action.control")}}</div>
            <div class="cate-body">
                <button class="btn btn-info" @click="stopPlay">{{$t("action.stopvoice")}}</button>
            </div>
            <audio id="player"></audio>
        </div>
        <div v-for="category in voices" v-bind:key="category.categoryName">
            <div class="cate-header">{{ $t("voicecategory." + category.categoryName) }}</div>
            <div class="cate-body">
                <button class="btn btn-new" v-for="voiceItem in category.voiceList" v-bind:key="voiceItem.name"
                        @click="play(voiceItem.path)">
                    {{ $t("voice." + voiceItem.name )}}
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .cate-header {
        background-color: rgba(132, 120, 122, 1);
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        text-align: center;
        font-size: 20px;
        margin-bottom: 12px;
        color: #ffffff
    }

    .cate-body {
        margin-bottom: 12px;
        text-align: center;
    }

    .cate-body button {
        margin: 5px;
    }

    .btn-new {
        color: #000000;
        background-color: rgb(248, 207, 123);
        border-color: rgb(175, 96, 24);
    }

    .btn-new:hover {
        color: #333;
        background-color: rgba(248, 207, 123, 0.6);
        border-color: rgb(175, 96, 24);
    }

    .btn-info {
        color: #000000;
        background-color: rgb(248, 207, 123);
        border-color: rgb(175, 96, 24);
    }

    .btn-info:hover {
        color: #333;
        background-color: rgba(248, 207, 123, 0.6);
        border-color: rgb(175, 96, 24);
    }

    .btn-info.active.focus,
    .btn-info.active:focus,
    .btn-info.active:hover,
    .btn-info:active.focus,
    .btn-info:active:focus,
    .btn-info:active:hover,
    .open > .dropdown-toggle.btn-info.focus,
    .open > .dropdown-toggle.btn-info:focus,
    .open > .dropdown-toggle.btn-info:hover {
        color: #333;
        background-color: rgba(248, 207, 123, 0.6);
        border-color: rgb(175, 96, 24);
    }
</style>


<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    // import VoiceList from '../voices.json'
    import axios from 'axios'

    @Component
    class HomePage extends Vue {
        // voices = VoiceList.voices
        r_voices = [];
        r_category = [];
        voices = [];
        created() {
            this.getVoices();
        }

        getVoices() {
            axios.get('http://127.0.0.1:5000/api/config')
                .then(response => ((this.r_voices = response['data']['voices']),(this.r_category = response['data']['category']),(this.adapt_data())))
        }

        adapt_data() {
            for (let category of this.r_category) {
                let adapt_data = {
                    'categoryName': category['categoryID'],
                    'categoryDescription': {'zh-CN': category['zh_CN'], 'ja-JP': category['ja_JP']},
                    'voiceList': []
                };
                for (let voice of this.r_voices) {
                    if (voice['categoryID'] === category['categoryID']) {
                        let adapt_voice = {
                            "name": voice['filename'].split('.')[0],
                            "path": voice['filename'],
                            "description": {
                                "zh-CN": voice['zh_CN'],
                                "ja-JP": voice['ja_JP']
                            }
                        };
                        adapt_data['voiceList'].push(adapt_voice);
                        console.log(adapt_voice)
                    }
                }
                console.log(adapt_data);
                this.voices.push(adapt_data)
            }
        }

        play(path) {
            this.stopPlay();
            let player = document.getElementById('player');
            player.src = "voices/" + path;
            player.play();
        }

        stopPlay() {
            let player = document.getElementById('player');
            player.pause();
        }
    }

    export default HomePage;
</script>
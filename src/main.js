import Vue from 'vue'
import VueI18n from 'vue-i18n'
import router from './router'

import App from './App.vue'

import zh_CN from './locales/zh-CN'
import ja_JP from './locales/ja-JP'

import $ from 'jquery'
import 'bootstrap'
import GlobalConst from './globalconst'

global.jQuery = global.$ = $;

let VoiceList = [];
let xhr = $.ajax('voices.json?timestamp=' + new Date().getTime(), {async: false}).done(data => (VoiceList = data));


//提取标签到语言文件
let addZh_CN = { voice: {}, voicecategory: {} };
let addja_JP = { voice: {}, voicecategory: {} };

for (let voiceCategoryList of VoiceList.voices){
  if(voiceCategoryList.categoryDescription !== undefined){
    if(voiceCategoryList.categoryDescription['zh-CN'] !== undefined){
      addZh_CN.voicecategory[voiceCategoryList.categoryName] = voiceCategoryList.categoryDescription['zh-CN'];
    }
    if(voiceCategoryList.categoryDescription['ja-JP'] !== undefined){
      addja_JP.voicecategory[voiceCategoryList.categoryName] = voiceCategoryList.categoryDescription['ja-JP'];
    }
  }
  for (let voiceItem of voiceCategoryList.voiceList){
    if(voiceItem.description !== undefined){
      if(voiceItem.description['zh-CN'] !== undefined){
        addZh_CN.voice[voiceItem.name] = voiceItem.description['zh-CN'];
      }
      if(voiceItem.description['ja-JP'] !== undefined){
        addja_JP.voice[voiceItem.name] = voiceItem.description['ja-JP'];
      }
    }
  }
}

let emzh_CN = Object.assign(zh_CN, addZh_CN);
let emja_JP = Object.assign(ja_JP, addja_JP);

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(GlobalConst);

const messages = {
  'zh-CN': emzh_CN,
  'ja-JP': emja_JP
}

let locale = 'zh-CN';
if(/ja/i.test(navigator.language)){
  locale = 'ja-JP';
}

const i18n = new VueI18n({
  locale,
  messages
})


new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

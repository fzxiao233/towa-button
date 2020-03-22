<template>
  <div id="app">
    <!--        <Modal></Modal>-->
    <nav class="navbar navbar-fixed-top nav-color">
      <div class="container-fluid">
        <div class="navbar-header text-color">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-navbar-collapse"
            aria-expanded="false"
          >
            <span class="sr-only">{{ $t("action.toggleNavbar") }}</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div></div>
          <router-link class="navbar-brand" to="/">{{ $t("info.title") }}</router-link>
        </div>

        <div class="collapse navbar-collapse" id="bs-navbar-collapse">
          <ul class="nav navbar-nav text-color">
            <li>
              <a
                href="https://www.youtube.com/channel/UC1uv2Oq6kNxgATlCiez59hw?sub_confirm=1"
                target="_blank"
              >
                <img src="resources/youtube_social_icon_red.png" height="18" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/tokoyamitowa" target="_blank">
                <img src="resources/Twitter_Social_Icon_Circle_Color.png" height="18" />
              </a>
            </li>
            <li>
              <a href="https://matsuri.best/?user=tokoyamitowa" target="_blank">录播存档</a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown text-color">
              <a
                href="javascript:;"
                class="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{$t("lang." + currentLang)}}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a href="javascript:;" @click="chlang('zh-CN')">{{$t("lang.zh-CN")}}</a>
                </li>
                <li>
                  <a href="javascript:;" @click="chlang('ja-JP')">{{$t("lang.ja-JP")}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container-fluid main-content">
      <router-view></router-view>
    </div>
    <footer class="footer">
      <div class="container-fluid footer-content">
        <div class="pull-right">
          <div class="text-right">
            <a
                    class="text-color"
                    href="https://github.com/fzxiao233/towa-button"
                    target="_blank"
            >
              {{$t("info.toGithub")}}
              <img
                      src="https://img.shields.io/github/stars/fzxiao233/towa-button.svg?style=social"
              />
            </a>
          </div>
          <div class="text-right">{{$t("info.notOfficial")}}</div>
        </div>
        <div>{{$t("info.audioStaff")}}</div>
        <div>
          <span>Powered By Meowsound Idols</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.css";

body {
  padding-top: 70px;
  background: url("assets/bg.jpg") no-repeat fixed;
}

.main-content {
  min-height: 100vh;
}

.footer {
  width: 100%;
  height: 60px;
  background-color: #594b67;
}

.footer-content {
  padding-top: 10px;
  color: #fcf5ea;
  background-color: #594b67;
}

.text-right {
  text-align: right;
}

.text-color {
  color: #fcf5ea;
}

.text-color:hover {
  color: #fff8ed;
}

.text-color a {
  color: inherit;
  background-color: inherit;
}
.text-color a:hover {
  background-color: inherit !important;
}
.text-color a:focus {
  background-color: inherit !important;
}
.text-color li > a:focus {
  background-color: inherit;
}
.text-color li > a:hover {
  background-color: inherit;
}

.nav-color {
  color: #fcf5ea;
  background-color: rgba(45, 43, 57, 0.89);
}
</style>

<script>
  import Vue from "vue";
  import Component from "vue-class-component";
  import Modal from "./components/modal.vue";

  //import fetchpost from './util/fetchpost'

@Component({
  components: {
    Modal
  }
})
class App extends Vue {
  get currentLang() {
    return this.$i18n.locale;
  }

  created() {
    // eslint-disable-next-line
    console.log("Produced by MoewSound Idols");
    this.$i18n.locale = localStorage.getItem("lang") || this.$i18n.locale;
  }

  chlang(v) {
    this.$i18n.locale = v;
    localStorage.setItem("lang", v);
  }
}

export default App;
</script>


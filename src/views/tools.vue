<template>
  <div style="width:80%;margin:auto">
    <div class="box">
      <div id="app1">
        <g-button>
          按钮
        </g-button>
        <g-button icon="settings">
          按钮
        </g-button>
        <g-button
          :loading="flag"
          icon="download"
          iconPosition="right"
          @click="flag = !flag"
        >
          按钮
        </g-button>
        <button-group>
          <g-button icon="left">
            上一页
          </g-button>

          <g-button>
            更多
          </g-button>
          <g-button icon="right" iconPosition="right">
            下一页
          </g-button>
        </button-group>

        <div style="border: 1px solid black">
          <g-row>
            <!-- span="2"此处的2是字符串不是数字 -->
            <g-col span="2">1</g-col>
            <!--外面的引号是css的引号，里面的单引号是js的引号，这里的2就是字符串 也可以双引号在里面，单引号在外面或者用反引号-->
            <!-- <g-col ：span="'2'"></g-col> -->
            <g-col span="20" :offset="2">2</g-col>
          </g-row>
          <g-row>
            <g-col span="4">3</g-col>
          </g-row>
          <g-row gutter="20">
            <!-- 默认phone样式 -->
            <g-col
              span="24"
              :pc="{ span: 4 }"
              :narrowPc="{ span: 2 }"
              :widePc="{ span: 1 }"
              >1</g-col
            >
            <g-col
              span="24"
              :pc="{ span: 20 }"
              :narrowPc="{ span: 22 }"
              :widePc="{ span: 23 }"
              >2</g-col
            >
          </g-row>
          <g-row gutter="20">
            <g-col>1</g-col>
            <g-col>2</g-col>
          </g-row>
        </div>
      </div>

      <div class="box">
        <g-input v-model="message"></g-input>
        <p>{{ message }}</p>
        <button @click="message += 1">+1</button>
      </div>
      <div class="box">
        <g-input value="张三" error="姓名不规范"></g-input>
        <!-- 如果不加冒号 disabled绑定的是字符串不是变量 -->
        <g-input value="李四" :disabled="true" :readonly="true"></g-input>
        <g-input value="李四" readonly></g-input>
        <g-input value="李四" disabled></g-input>
      </div>
      <button @click="showToast1">top</button>
      <button @click="showToast2">middle</button>
      <button @click="showToast3">bottom</button>

      <!-- <router-view /> -->
    </div>
    <!-- yyy监听的是g-tab的事件 如果要触发eventbus的事件 触发的应该是new Vue的事件，所以要在tabs里emit -->
    <!-- <g-tabs :selected.sync="selectedTab" @update:selected="yyy"> -->
    <g-tabs :selected="selectedTab">
      <!-- 这两个语法相同 -->
      <!-- <g-tabs-head selected="selectedTab" @update:selected="selectedTab = $event"> -->
      <!-- 自组件不能改父组件的数据，所以这里要添加事件 -->
      <!-- 语法糖 -->
      <g-tabs-head>
        <template slot="actions">
          <button>设置</button>
        </template>

        <g-tabs-item name="education" disabled>
          <g-icon name="settings"></g-icon>教育
        </g-tabs-item>
        <g-tabs-item name="finance">
          财经
        </g-tabs-item>
        <g-tabs-item name="sports">
          体育
        </g-tabs-item>
      </g-tabs-head>
      <g-tabs-body>
        <g-tabs-panel name="education">
          教育相关资讯
        </g-tabs-panel>
        <g-tabs-panel name="finance">
          财经相关资讯
        </g-tabs-panel>
        <g-tabs-panel name="sports">
          体育相关资讯
        </g-tabs-panel>
      </g-tabs-body>
    </g-tabs>
    {{ selectedTab }}

    <g-collapse :selected="selectedNums">
      <g-collapse-item title="标题1" name="1">内容1</g-collapse-item>
      <g-collapse-item title="标题2" name="2">内容2</g-collapse-item>
      <g-collapse-item title="标题3" name="3">内容3</g-collapse-item>
    </g-collapse>
    {{ selectedNums }}

    <g-slides :selected.sync="selected">
      <g-slides-item name="1">
        <div class="slides">1</div>
      </g-slides-item>
      <g-slides-item name="2">
        <div class="slides">2</div>
      </g-slides-item>
      <g-slides-item name="3">
        <div class="slides">3</div>
      </g-slides-item>
    </g-slides>
  </div>
</template>

<script>
export default {
  name: "tools",

  data() {
    return {
      selected: "1",
      //selected: [],
      // iconName: 'settings'
      flag: true,
      message: "hi",
      selectedTab: "sports",
      selectedNums: ["2", "1"],
      source: [],
    };
  },
  mounted() {
    // console.log(this.$el.children)
    //防止用户在button外面包了div button-group的css选择器不起效
    for (let node of this.$el.children) {
      //nodeName都是大写
      //console.log(node.nodeName)
      if (node.nodeName.toLowerCase() !== "button") {
        console.warn(
          `g-button-group的子元素应该全是g-button，但是你写的是${node.nodeName.toLowerCase()}`
        );
      }
    }
  },
  created() {},
  methods: {
    //xy说明形参可以随便取
    // inputchange(xxxxx, yyyyy) {
    //   console.log(xxxxx.target.value);
    //   console.log(yyyyy)

    // }

    yyy(data) {
      console.log(data);
    },
    showToast1() {
      this.showToast("top");
    },
    showToast2() {
      this.showToast("middle");
    },
    showToast3() {
      this.showToast("bottom");
    },

    showToast(position) {
      this.$toast("<strong>当前功能不稳定</strong>", {
        enableHtml: true,
        position,
        autoClose: false,
        closeButton: {
          text: "知道了",
          callBack: () => {
            console.log("用户说他知道了");
          },
        },
      });
    },
  },
};
</script>
<style scoped>
#app1 {
  margin: 20px;
}
.box {
  margin: 20px;
}
.slides {
  width: 100%;
  height: 150px;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
</style>

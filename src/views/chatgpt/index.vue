<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header class="elHeader">
          <div class="header">
            <div>ChatGpt体验版</div>
          </div>
        </el-header>
        <el-container class="elContain">
          <el-aside width="200px" class="elAside">Aside</el-aside>
          <el-container>
            <el-main class="elMain" id="elMain" ref="elMain">
              <div class="main">
                <div class="chatCon" v-for="(item, index) in dataList" :key="index">
                  <div class="person" v-if="isType(item.messages) === 'Array'">

                    <img :src="Avatar" />
                    <div v-html="item.messages[0].content"></div>
                  </div>
                  <div class="chatAi" v-else>

                    <img :src="AiAvatar" fit="cover" />
                    <div v-html="item.message.content"></div>
                  </div>
                </div>
              </div>
            </el-main>
            <el-footer class="elFooter">
              <textarea name="" id="inputCon" maxlength="45" v-model="problem" @keydown="kedDownSend($event)"></textarea>
              <div class="send" @click="sendInfo">
                <img src="../../assets/send.svg" alt="">
              </div>
            </el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from "@/assets/my.jpg"
import AiAvatar from "@/assets/chatAI.svg";
import { ref, nextTick } from "vue";

import { chatgptPost, chatgptMyServer } from "@/apis/chatgptApi"
import { isType } from "@/utils/tool"

const problem = ref<string>("")

const dataList = ref<Array<any>>([])


const scrollBottom = () => {
  const mainCon = document.querySelector("#elMain") as HTMLElement;
  const elMain = ref<any>(null)
  console.log(elMain);
  nextTick(() => {
    mainCon.scrollTop = mainCon.scrollHeight;
  });
}

const sendInfo = async () => {
  const formData = {
    "model": "gpt-3.5-turbo",
    "messages": [{ "role": "user", "content": problem.value }],
    "temperature": 0.7,
    "max_tokens": 2000
  }
  if (!problem.value) return;

  dataList.value.push(formData);

  problem.value = '';
  scrollBottom();
  const res = await chatgptPost(formData);
  // const res = await chatgptMyServer(formData);

  if (res && res.choices.length) {
    console.log(res.choices);
    dataList.value.push(res.choices[0])
  }
  scrollBottom()
  console.log(res);
}


const kedDownSend = (e: any) => {
  console.log(e);
  if (e && e.keyCode === 13) {
    e.preventDefault();
    sendInfo();
  }
}

</script>

<style lang="scss" scoped>
$bgleftcolor: rgba(68, 70, 84, 1);

.common-layout {
  height: 100vh;
  width: 100vw;
}

.elHeader {
  height: 5vh;
  background-color: #61656d;
  color: #443e3e;
  .header {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 22px;
  }
}

.elContain {
  height: 95vh;

  .elMain {
    padding: 0;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: $bgleftcolor;
    font-size: 1.2rem;
    scrollbar-width: none;

    /* &::-webkit-scrollbar { display: none; } */
    &::-webkit-scrollbar {
      width: 8px;
      background-color: #343540;

    }
    &::-webkit-scrollbar-thumb {
      width: 8px;
      background-color: #40414F;
    }
  }
}

.main {
  height: 75vh;
  flex: 1;
}

.elFooter {
  height: 15vh;
  background-color: #343540;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.elAside {
  background-color: #202123;
}

textarea {
  resize: none;
  width: 50%;
  height: 5vh;
  background-color: transparent;
  color: #fff;
  border: 0;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  background-color: #40414F;
  border-radius: 5px;
  outline: medium;
  line-height: 5vh;
  padding: 0 10px;

}

.send {
  position: relative;
  right: 5.5vh;
  top: 0.2vh;
}

.chatCon {
  position: relative;
  &>div {
    padding: 5vh 10vw 5vh 10vw;
    height: max-content;
    line-height: 2.5rem;
    font-size: 1.3rem;
    width: 100%;
    div {
      display: inline;
      position: relative;
      top: -1vh;
      left: 4vh;
      color: #fff
    }
  }

  &>div>img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }

  .person {
    right: 0;
    text-align: left;
    background-color: #343541;
    width: 70vw;
  }

  .chatAi {
    left: 0;
    width: 70vw;
    img {
      padding: 5px;
      background-color: rgb(16, 163, 127);
      width: 30px;
      height: 30px;
    }
  }
}
</style>

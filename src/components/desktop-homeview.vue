<template>
  <div>
    <iframe src='https://player.twitch.tv/?channel=moyasi7458&parent=niconico-omega.vercel.app' frameborder='0'
      allowfullscreen='true' scrolling='no'
      style='width: 100vw; height: 100vh; z-index: 1; position: fixed; top:0; left:0;'></iframe>

    <!--<div class="position fixed top-0 left-0 z-50"
      style="width: 100vw;height: 100vh;background-color: rgba(0,0,0,0.5);backdrop-filter: blur(20px);"
      v-if="playerView">

      <div class="position absolute text-center" style="top: 50vh; left: 50vw; transform: translate(-50%,-50%);">
        <div class="position relative" style="left: 50%; transform: translateX(-50%);">
          <h1 class="text-white text-3xl flex">
            <img src="/public/image/warning.svg" class="ml-auto" width="50">
            <p class="ml-5 my-auto font-bold mr-auto">淫夢注意</p>
          </h1>
          <p class="text-white mt-5">この避難所ではホモビデオほんへ<br>が再生されるおそれがあります。</p>
          <p class="text-white">苦手な人は注意してください。</p>
          <p class="text-white">なお淫夢よる損失責任は取れません。</p>
        </div>

        <div class="mt-4">
          <button
            class="bg-purple-700 inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-110 mx-2"
            @click="player">たまげたなぁ</button>
          <button
            class="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-110 mx-2"
            @click="player">いいよこいよ！</button>
        </div>
      </div>
    </div>-->

    <!--<button class="position fixed z-50" @click="player" v-if="playerView"
      style="top: 50vh; left: 50vw; transform: translate(-50%,-50%);filter: invert(100%)"><img
        src="/public/image/play.svg" width="70"></button>-->

    <div class="position fixed top-0 left-0 z-10">
      <header class="flex justify-between px-10 py-3" style="backdrop-filter: blur(20px);width: 100vw;">
        <RouterLink to="/"><img src="/public/image/title.svg"></RouterLink>
      </header>

      <marquee class="bg-black py-2 text-white mb-0">Info:
        こちらは「ニコニコ避難所」です。ニコニコ名作動画や淫夢動画、ニコニコ被害状況のラジオを流れるニコニコ風のコメントで楽しめます。
      </marquee>
    </div>

    <div class="px-8 py-5 mt-0 position fixed z-20"
      style="top: 98px;height: 100vh;width: 30vw; background-color: rgba(0, 0, 0, 0.4)">

      <div class="mb-7">
        <RouterLink to="/inmu" class="py-2 rounded-lg px-4 bg-indigo-500 text-base text-white font-bold underline underline-offset-1">淫夢ほんへはこちらから ></RouterLink>
      </div>

      <div class="mb-7">
        <RouterLink to="/video" class="py-2 rounded-lg px-4 bg-indigo-500 text-base text-white font-bold underline underline-offset-1">ボカロやニコニコMADはこちらから ></RouterLink>
      </div>

      <div class="twitchradio">
        <p class="my-2 flex text-white"><img src="/public/image/mic.svg" style="filter: invert(100%)">Twitchラジオ(被害状況と雑談)
        </p>
        <iframe src="https://player.twitch.tv/?channel=moyasi7458&parent=niconico-omega.vercel.app" frameborder="0"
          allowfullscreen="true" scrolling="no" class="rounded-xl outline outline-3 outline-indigo-500"
          style="width: calc(100% - 10px)"></iframe>
      </div>

      <div class="videoinfo mt-8 text-white">
        <p>再生中のビデオ:</p>
        <h1 class="text-3xl font-bold video-title">{{ title }}</h1>
      </div>

      <div class="comentlog mt-5">
        <p class="text-white">コメント欄</p>
        <div class="text-white">
          <div v-for="comment in commentLog">
            {{ comment.text }}
          </div>
        </div>
      </div>
    </div>

    <div>
      <div id="commentfield">
        <div v-for="item in items" :key="item.id" :id="item.id" class="moving-text" :style="item.style">
          {{ item.text }}
        </div>
      </div>

      <div class="position fixed bg-white bottom-5 rounded-full flex justify-between py-1 px-1 custom-input z-20"
        style="max-width: 600px;width: calc(100vw - 150px);left: 50vw; transform: translateX(-50%);">
        <div class="bg-zinc-900 block rounded-full px-3 my-auto flex">
          <button @click="changeSize" class="bg-zinc-900 mx-2 py-1 text-white" :style="colorUI">{{ sizeUI }}</button>
          <button @click="changeColor" class="bg-zinc-900 mintyo mx-2 py-1 text-white" :style="colorUI">T</button>
        </div>

        <input v-model="input" placeholder="Enterまたは完了で実況コメントを送信する" class="text-neutral-950 rounded-r-full"
          style="max-width: 480px;width: calc(100vw - 300px)" @keydown.enter="send">

        <button></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { io } from 'socket.io-client';
import { ref, nextTick } from 'vue';
import { gsap } from 'gsap';


const title = ref("参加型ニコニコ避難所WEB開発")
let count = ref(0);
const commentLog = ref([]);//コメントログ（UIでずっと表示）
const input = ref("");//inputのv-model用
const items = ref([])//流れるコメントを格納


//chat用socket
const socket = io('https://c5b2f24c-963f-41ba-8fd8-56e8c5ff3bb8-00-trpm54ga9v98.sisko.replit.dev/')
//video用socket
//const videosocket = io('https://86bfc230-82da-41a4-8b3b-d8575a223b0f-00-1vinzlq417xr7.pike.replit.dev/')

const size = ref("25px");
const color = ref("white")
const colorUI = ref("font-size: 25px;color: white")
const sizeUI = ref("Aa")

const colorList = [
  "white",
  "yellow",
  "orange",
  "red",
  "blue",
  "purple"
]

const colorObject = {
  "white": 1,
  "yellow": 2,
  "orange": 3,
  "red": 4,
  "blue": 5,
  "purple": 0
}

const send = () => {
  socket.emit('chat', { message: input.value, size: size.value, color: color.value });
  input.value = ''
}

socket.on('chat', (msg) => {
  createText(msg)
  commentLog.value.unshift({ text: msg.message })
  console.log(commentLog.value)
  console.log(msg.message)
});

const changeColor = () => {
  color.value = colorList[colorObject[color.value]]
  colorUI.value = `font-size: 25px;color: ${color.value}`
}

const changeSize = () => {
  size.value = size.value
  if (size.value == "25px") {
    sizeUI.value = "A"
    size.value = "32px"
  } else {
    sizeUI.value = "a"
    size.value = "25px"
  }
}


const createText = async (msg) => {
  await nextTick(); // Ensure the DOM is updated before accessing commentFieldRef

  const id = "text" + count.value;
  const text = msg.message;
  const randomTop = Math.round(Math.random() * (document.documentElement.clientHeight - 200)) + 80 + 'px';

  const style = {
    position: 'fixed',
    whiteSpace: 'nowrap',
    left: document.documentElement.clientWidth + 'px',
    top: randomTop,
    color: msg.color,
    fontWeight: "bolder",
    fontSize: msg.size,
    zIndex: "10",
    textShadow: "#000 1px 0 10px"
  };

  items.value.push({ id, text, style });
  count.value++;

  await nextTick(); // Ensure the DOM is updated before animating

  const itemElement = document.getElementById(id);
  gsap.to(itemElement, {
    duration: 7,
    ease: "none",
    x: -1 * (document.documentElement.clientWidth + itemElement.clientWidth),
    onComplete: () => {
      items.value = items.value.filter(i => i.id !== id);
    }
  });
};



/*videosocket.on("video", (msg) => {
  console.log(msg)
  const videoObject = JSON.parse(msg.data)

  document.getElementById("videoiframe").innerHTML = videoObject.urldata
  title.value = videoObject.title

  document.querySelector("video").muted = false
  document.querySelector("video").play()

  setTimeout(function () {
    document.querySelector("video").play()
  }, 5000);
})*/

const playerView = ref(true)

const player = () => {
  playerView.value = false
  document.querySelector("video").play()
}
</script>
<template>
  <div>
    <div id="videoiframe"></div>

    <div class="position fixed top-0 left-0 z-10">
      <header class="flex justify-between px-10 py-3" style="backdrop-filter: blur(20px);width: 100vw;">
        <RouterLink to="/"><img src="/public/image/title.svg"></RouterLink>
      </header>

      <marquee class="bg-black py-2 text-white mb-0">Info: こちらは「ニコニコ避難所」です。ニコニコ名作動画や淫夢動画、ニコニコ被害状況のラジオを流れるニコニコ風のコメントで楽しめます。
      </marquee>
    </div>

    <div>

      <div class="position fixed bg-white bottom-5 rounded-full flex justify-between py-1 px-1 custom-input z-20"
        style="max-width: 600px;width: calc(100vw - 150px);left: 50vw; transform: translateX(-50%);">
        <div class="bg-zinc-900 block rounded-full px-3 my-auto flex">
          <button @click="send" class="bg-zinc-900 mx-2 py-1" style="font-size: 25px;">Aa</button>
          <button @click="send" class="bg-zinc-900 mintyo mx-2 py-1" style="font-size: 25px;">T</button>
        </div>

        <input v-model="input" placeholder="Enterまたは完了で実況コメントを送信する" class="text-neutral-950 rounded-r-full"
          style="max-width: 480px;width: calc(100vw - 300px)" @keydown.enter="send">
      </div>
    </div>
  </div>
</template>

<script setup>
import { io } from 'socket.io-client';
import { ref, nextTick } from 'vue';

const input = ref("");//inputのv-model用
//video用socket
const videosocket = io('https://86bfc230-82da-41a4-8b3b-d8575a223b0f-00-1vinzlq417xr7.pike.replit.dev/')

const send = () => {
  videosocket.emit('video', {data: `${input.value}`});
  input.value = ''
}

</script>
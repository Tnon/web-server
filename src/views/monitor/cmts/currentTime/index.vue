<template>
  <div class="timeCom">
    <div class="time">{{ hours + ':' + min + ':' + sec }}</div>
    <div class="weekData">
      <div class="week">{{ week }}</div>
      <div class="date">{{ month + '-' + day }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onUnmounted, ref } from 'vue';
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const hours = ref(''),
    min = ref(''),
    sec = ref(''),
    week = ref(''),
    month = ref(''),
    day = ref('');

  let timer = setInterval(() => {
    const now = new Date();
    hours.value = now.getHours() < 10 ? '0' + now.getHours() : now.getHours() + '';
    min.value = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes() + '';
    sec.value = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds() + '';
    week.value = weekDays[now.getDay()];
    month.value = now.getMonth() + 1 < 10 ? '0' + now.getMonth() + 1 : now.getMonth() + 1 + '';
    day.value = now.getDate() < 10 ? '0' + now.getDate() : now.getDate() + '';
  }, 1000);
  onUnmounted(() => {
    clearInterval(timer);
  });
</script>

<style scoped lang="less">
  .timeCom {
    display: flex;
    align-items: center;
    .time {
      font-family: D-DIN;
      font-size: @fz24;
      font-weight: bold;
      line-height: 32px;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .weekData {
      font-size: @fz12;
      font-weight: normal;
      line-height: 16px;
      color: rgba(255, 255, 255, 0.6);
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>

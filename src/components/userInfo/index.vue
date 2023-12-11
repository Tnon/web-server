<!--
 * @Author: Caocong.dw
 * @LastEditors: Delevin.TnT
 * @Date: 2021-12-21 13:49:59
 * @LastEditTime: 2023-10-12 16:41:25
-->
<template>
  <div class="con">
    <template v-if="hasHeader">
      <div class="header">{{ hasHeader }}</div>
    </template>
    <template v-if="(email === '-' && name === '-') || (!email && !name)"> - </template>
    <template v-else>
      <div class="userinfo">
        <a-avatar class="avatar" :src="avatar">
          <template #icon>
            <showAvatar class="avaicon" :name="name!" />
          </template>
        </a-avatar>
        <div>
          <div class="name" :title="name ?? '-'">{{ name ?? '-' }}</div>
          <div class="email" :title="email ?? '-'">{{ email ?? '-' }}</div>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import showAvatar from '@/components/showAvatar';
  defineProps({
    name: String,
    email: String,
    avatar: String,
    hasHeader: String,
  });
</script>
<style lang="less" scoped>
  .header {
    font-size: @fz12;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.4);
    line-height: 16px;
    margin-bottom: 8px;
  }
  .con {
    overflow: hidden;
  }
  .userinfo {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    .avatar {
      width: 24px;
      height: 24px;
      margin-right: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: @primary-color;
      .avaicon {
        font-size: @fz12;
        line-height: normal;
      }
    }
    .name {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
    }
    .email {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
    }
  }
</style>

<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-01-12 13:47:25
 * @LastEditTime: 2023-02-24 19:07:35
-->
<template>
  <a-popover trigger="hover" placement="bottom" destroyTooltipOnHide>
    <template #content>
      <div class="con">
        <div class="contHead" :class="[textInfo.className]">
          <span>
            {{ textInfo.text }}
          </span>
          <span>{{ score }}</span>
        </div>
        <div class="item">
          <div class="label">
            <div class="high round"></div>
            <span>{{ t('arcomn.hpf') }}</span>
          </div>
          <span class="highText">≥100</span>
        </div>
        <div class="item">
          <div class="label">
            <div class="mid round"></div>
            <span>{{ t('arcomn.mpf') }}</span>
          </div>
          <span class="midText">70≤-&lt;100</span>
        </div>
        <div class="item">
          <div class="label">
            <div class="low round"></div>
            <span>{{ t('arcomn.lpf') }}</span>
          </div>
          <span class="lowText">40≤-&lt;70</span>
        </div>
      </div>
    </template>
    <!-- <slot></slot> -->
    <div class="contHead contHeadSlot" :class="[textInfo.className]">
      {{ textInfo.text }}
    </div>
  </a-popover>
</template>

<script setup lang="ts">
  import { reactive, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    level: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  });
  const { t } = useI18n();
  const textInfo = reactive({
    text: '',
    className: '',
  });
  watchEffect(() => {
    if (~~props.level === 3) {
      textInfo.text = t('arcomn.highAttack');
      textInfo.className = 'high';
    } else if (~~props.level === 1) {
      textInfo.text = t('arcomn.lowAttack');
      textInfo.className = 'low';
    } else {
      textInfo.text = t('arcomn.midAttack');
      textInfo.className = 'mid';
    }
  });
</script>

<style scoped lang="less">
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    .label {
      display: flex;
      align-items: center;
      margin-right: 30px;
    }
    .round {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .highText {
      color: @danger-color;
    }
    .midText {
      color: #f8a556;
    }
    .lowText {
      color: #ecd834;
    }
  }
  .contHead {
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    border-radius: 8px;
    font-size: @fz14;
    color: #fff;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .contHeadSlot {
    margin: 0;
  }
  .high {
    background-color: @danger-color;
  }
  .mid {
    background-color: #f8a556;
  }
  .low {
    background-color: #ecd834;
  }
</style>

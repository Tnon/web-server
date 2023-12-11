<template>
  <div class="pwdcheck">
    <div class="title_">{{ t('common.pwdTit') }}</div>
    <ul>
      <li :class="{ active: low }">
        <CheckCircleOutlined class="checkIcon" />{{ t('common.pwdLen') }}
      </li>
      <li :class="{ active: middle }">
        <CheckCircleOutlined class="checkIcon" />{{ t('common.pwdRulOne') }}
      </li>
      <li :class="{ active: high }">
        <CheckCircleOutlined class="checkIcon" />{{ t('common.pwdRulTwo') }}
      </li>
    </ul>
    <div class="pwd_check">
      {{ t('common.pwdVliTit') }}
      {{
        level === 1
          ? t('common.low')
          : level === 2
          ? t('common.mid')
          : level === 3
          ? t('common.high')
          : t('common.low')
      }}
    </div>
    <div class="three_c">
      <span
        :class="{
          low: level === 1,
          middle: level === 2,
          high: level === 3,
        }"
      ></span>
      <span
        :class="{
          middle: level === 2,
          high: level === 3,
        }"
      ></span>
      <span :class="{ high: level === 3 }"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CheckCircleOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  defineProps({
    level: Number,
    low: Boolean,
    middle: Boolean,
    high: Boolean,
  });
  const { t } = useI18n();
</script>

<style lang="less" scoped>
  .pwdcheck {
    padding: 10px 15px;

    .title_ {
      font-size: @fz12;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 5px;
    }

    .pwd_check {
      font-size: @fz12;
      color: rgba(0, 0, 0, 0.8);
      letter-spacing: 0;
      margin-top: 10px;
    }

    .three_c {
      span {
        display: inline-block;
        width: 33.33%;
        height: 5px;
        background: #eee;
      }
    }
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        padding: 5px 0;
        color: rgba(0, 0, 0, 0.6);
        font-size: @fz12;
        .checkIcon {
          margin-right: 8px;
        }
      }
    }
  }
  .active {
    color: #16b66b !important;
  }
  .low {
    background: #f53d45 !important;
  }

  .middle {
    background: #f0bc24 !important;
  }

  .high {
    background: #16b66b !important;
  }
</style>

<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-22 14:24:52
 * @LastEditTime: 2023-02-22 14:28:38
-->
<template>
  <div class="head">
    <div class="backbtn">
      <div class="left" @click="goBack">
        <LeftOutlined class="back" />
        {{
          id
            ? t('common.edit') + t('reinforce.monitored_rule')
            : t('reinforce.add') + t('reinforce.monitored_rule')
        }}
      </div>
      <div class="right">
        <a-button type="primary" @click="saveData">{{ t('common.save') }}</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { LeftOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';
  defineProps({
    id: String,
    saveData: Function,
  });
  const { t } = useI18n();
  const router = useRouter();
  //返回
  const goBack = () => {
    router.go(-1);
  };
</script>

<style scoped lang="less">
  .head {
    background-color: #fff;
    padding: 12px 0;
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    .backbtn {
      width: 800px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        font-size: @fz16;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        cursor: pointer;
        .back {
          margin-right: 8px;
        }
      }
    }
  }
</style>

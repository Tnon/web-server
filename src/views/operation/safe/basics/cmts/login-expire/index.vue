<!--
 * @Author: dailuxin
 * @LastEditors: dailuxin
 * @Date: 2022-08-08 09:20:43
 * @LastEditTime: 2022-09-01 16:44:37
-->
<template>
  <swt-card v-bind="options" v-model:isOpen="isOpen" @confirm="confirm" class="loginExpire">
    <a-popover overlayClassName="popNoPad" trigger="click" placement="bottom">
      <template #content>
        <template v-for="item in timeOptions" :key="item.value">
          <div class="optionItem" @click="selectValue(item.value)">{{ item.label }}</div>
        </template>
      </template>
      <a-input-number
        class="iptNum"
        v-model:value="expireSetting"
        :min="10"
        :max="1440"
        :placeholder="t('common.range', ['10-1440'])"
      />
    </a-popover>
  </swt-card>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { swtCard } from '@/views/operation/components/swt-card';
  import { getLoginExpireApi, setLoginExpireApi } from '@/api/operation/safe';
  import { message } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  // 选项
  const options = {
    title: 'operation.expireTitle',
    subtitle: t('operation.expireSubtitle'),
    label: t('operation.expireLabel'),
    warning: t('operation.reloginWaring'),
  };
  // 时间选项
  const timeOptions = [
    { label: `10${t('operation.minuteUnits')}`, value: 10 },
    { label: `30${t('operation.minuteUnits')}`, value: 30 },
    { label: `60${t('operation.minuteUnits')}`, value: 60 },
    { label: `6${t('operation.hourUnits')}`, value: 360 },
    { label: `24${t('operation.hourUnits')}`, value: 1440 },
  ];
  // 子组件switch等是否开启
  const isOpen = ref<boolean>(true);
  // 失效时间
  const expireSetting = ref<number>(60);
  // 获取设置的失效时间
  const getLoginExpire = async () => {
    const { expiretime } = await getLoginExpireApi();
    expireSetting.value = expiretime || 60;
  };
  getLoginExpire();
  // 点击选择
  const selectValue = (value) => {
    expireSetting.value = value;
  };
  // 保存
  const confirm = async () => {
    if (unref(expireSetting)) {
      await setLoginExpireApi({ expiretime: unref(expireSetting) });
      // getLoginExpire();
    } else {
      message.error(t('operation.expireWarning'));
    }
  };
</script>
<style lang="less" scoped>
  .loginExpire {
    margin-top: 16px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    // 样式穿透，将子组件中switch组件隐藏
    :deep(.switchBox) {
      display: none;
    }
  }
  .optionPopover {
    .ant-popover-inner-content {
      padding: 0;
    }
  }
  .optionItem {
    padding: 8px 10px;
    width: 120px;
    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }
  .iptNum {
    border-radius: 8px;
    width: 120px;
    margin-left: 8px;
    :deep(.ant-input-number-handler-wrap) {
      border-radius: 8px;
    }
  }
</style>

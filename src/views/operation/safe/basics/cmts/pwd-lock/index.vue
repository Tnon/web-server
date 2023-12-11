<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-07-20 10:37:09
-->
<template>
  <swt-card
    v-bind="options"
    v-model:isOpen="isOpenPwd"
    @confirm="confirm"
    @switchChange="switchChange"
    class="box"
  >
    <a-input-number
      class="iptNum"
      v-model:value="valueCount"
      :min="3"
      :max="10"
      :placeholder="t('common.range', ['3-10'])"
    />
  </swt-card>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { swtCard } from '@/views/operation/components/swt-card';
  import { updateLoginAuthApi, getLoginAuthApi, controlLoginAuthApi } from '@/api/operation/safe';
  import { message } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  //选项
  const options = {
    title: 'setting.lockTitle',
    subtitle: t('setting.lockTime'),
    label: t('setting.maxErrLa'),
  };
  //是否开启
  const isOpenPwd = ref<boolean>(false);
  //错误次数
  const valueCount = ref<number>(3);
  //保存
  const confirm = async () => {
    // 更新登录鉴别次数
    if (unref(valueCount)) {
      await updateLoginAuthApi({ maxtry: unref(valueCount) });
    } else {
      message.error(t('setting.psetMax'));
    }
  };

  // 获取登录鉴别次数
  const getLoginAuth = async () => {
    const { maxtry } = await getLoginAuthApi();
    valueCount.value = maxtry;
    isOpenPwd.value = !!unref(valueCount);
  };
  getLoginAuth();

  // 控制登录鉴别次数
  const switchChange = async () => {
    //恢复默认值
    valueCount.value = 3;
    //关闭发送0
    await controlLoginAuthApi({
      maxtry: unref(isOpenPwd) ? 3 : 0,
    });
    unref(isOpenPwd) ? message.success(t('setting.enaSuc')) : message.success(t('setting.delSuc'));
  };
</script>
<style lang="less" scoped>
  .box {
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    position: relative;
  }
  .iptNum {
    border-radius: 8px;
    margin-left: 8px;
    width: 120px;
    :deep(.ant-input-number-handler-wrap) {
      border-radius: 8px;
    }
  }
</style>

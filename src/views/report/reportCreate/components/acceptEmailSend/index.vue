<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-22 16:27:26
 * @LastEditTime: 2022-12-23 11:15:18
-->
<template>
  <a-popover trigger="click" overlayClassName="popNoPad" placement="left">
    <template #content>
      <template v-for="(item, index) in accept_emailArr" :key="item">
        <a-popconfirm placement="left" :title="t('report.sendemcf', [item])">
          <template #icon><question-circle-outlined /></template>
          <template #okButton>
            <a-button
              size="small"
              type="primary"
              :disabled="timerArr[index].btnDisabled"
              @click="confirm(index)"
              :loading="timerArr[index].loading"
            >
              {{
                timerArr[index].btnDisabled
                  ? t('operation.sendag', [timerArr[index].time])
                  : t('common.confirm')
              }}
            </a-button>
          </template>
          <div class="node">{{ item }}</div>
        </a-popconfirm>
      </template>
    </template>
    <div class="numb">
      {{ accept_emailArr.length }}
    </div>
  </a-popover>
</template>

<script setup lang="ts">
  import { computed, onUnmounted, ref, watchEffect } from 'vue';
  import { QuestionCircleOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { testEmailApi } from '@/api/operation/notice';
  const props = defineProps({
    accept_email: {
      type: String,
      required: true,
    },
  });
  const { t } = useI18n();
  //邮箱的数组
  const accept_emailArr = computed(() => props.accept_email.split(','));
  //每个邮箱的状态集合
  const timerArr = ref<any>([]);
  watchEffect(() => {
    //主动填充
    accept_emailArr.value.forEach(() => {
      timerArr.value.push({
        time: 20,
        btnDisabled: false,
        timer: 0,
        loading: false,
      });
    });
  });
  //发送邮件测试
  const confirm = async (index) => {
    // 确定按钮loading
    timerArr.value[index].loading = true;
    const { code } = await testEmailApi({ email: accept_emailArr.value[index] });
    timerArr.value[index].loading = false;
    if (!code) {
      //不能点击状态
      timerArr.value[index].btnDisabled = true;
      //初始化一分钟
      timerArr.value[index].time = 20;
      //定时器
      timerArr.value[index].timer = setInterval(() => {
        timerArr.value[index].time = timerArr.value[index].time - 1;
        if (timerArr.value[index].time === 0) {
          clearInterval(timerArr.value[index].timer);
          timerArr.value[index].btnDisabled = false;
        }
      }, 1000);
    }
  };
  onUnmounted(() => {
    timerArr.value.forEach((ele) => {
      clearInterval(ele.timer);
    });
  });
</script>

<style scoped lang="less">
  .numb {
    cursor: pointer;
    color: @primary-color;
  }
  .node {
    cursor: pointer;
    min-width: 200px;
    color: @primary-color;
    height: 48px;
    line-height: 48px;
    padding: 0 12px;
    border-bottom: 1px solid #f1f1f1;
    &:last-child {
      border: none;
    }
  }
</style>

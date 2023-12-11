<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-07 14:18:42
 * @LastEditTime: 2022-11-15 17:12:32
-->
<template>
  <div class="rightOption">
    <div class="header">
      <span class="subtitle">{{ t('setting.histip') }}</span>
      <a-button type="text" :disabled="!historyIps.length" size="small" @click="addAllHistory">
        <template #icon>
          <PlusOutlined />
        </template>
        {{ t('operation.all') }}
      </a-button>
    </div>
    <div class="content">
      <template v-for="item in historyIps" :key="item">
        <div class="allIps">
          <span>{{ item.ip }}</span>
          <a-button type="text" @click="addSingleHistory(item.ip)" class="antbtn" size="small">
            <template #icon>
              <PlusOutlined />
            </template>
          </a-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { getHiIps } from '@/api/operation/safe';
  import { ref } from 'vue';
  const { t } = useI18n();
  const props = defineProps({
    addIpMethod: {
      type: Function,
      required: true,
    },
  });
  //历史ip
  const historyIps = ref<{ ip: string }[]>([]);
  //全部添加
  const addAllHistory = () => {
    historyIps.value.forEach((item) => {
      props.addIpMethod(item.ip, item.ip);
    });
    // historyIps.value = [];
  };
  //单个添加
  const addSingleHistory = (item) => {
    props.addIpMethod(item, item);
    // historyIps.value.splice(index, 1);
  };
  //获取历史ip
  const getHistoryIps = async () => {
    const { items } = await getHiIps();
    historyIps.value = items ?? [];
  };
  getHistoryIps();
</script>

<style scoped lang="less">
  .rightOption {
    flex: 220px 0 0;
    border: 1px solid #eee;
    border-radius: 0 8px 8px 0;
    border-left: none;
    .header {
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      .subtitle {
        font-size: @fz12;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .content {
      height: 200px;
      overflow: auto;
    }
    .content {
      padding: 0 8px;
      .allIps {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 28px;
        transition: all 0.3s;
        padding: 0 8px;
        border-radius: 8px;
        cursor: pointer;
        margin: 4px 0;
        color: rgba(0, 0, 0, 0.7);
        .antbtn {
          color: rgba(0, 0, 0, 0.5);
        }
        &:hover {
          background: rgba(0, 0, 0, 0.08);
        }
      }
    }
  }
</style>

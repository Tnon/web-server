<template>
  <div class="container">
    <div class="header">{{ t('operation.asstmoni') }}</div>
    <div class="monitor">
      <div class="title">
        <custom-icon class="cusicon" size="24" type="#ax-os-Linux" />
        {{ ipCount }}
        <span class="subtitle">
          {{ t('setting.assMoTit') }}
        </span>
      </div>
      <a-spin :spinning="spinning">
        <a-row :gutter="16">
          <a-col span="8" v-for="(item, keyp) in state" :key="keyp">
            <div class="nodes">
              <a-col span="12" v-for="(c_item, key) in item" :key="key">
                <div class="label">{{ t('setting.' + c_item.label) }}</div>
                <div class="value">{{ c_item.value }}</div>
              </a-col>
            </div>
          </a-col>
        </a-row>
      </a-spin>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { getMonitorApi } from '@/api/operation/storage';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const spinning = ref<boolean>(false);
  const ipCount = ref<string>('');
  const state = reactive({
    cpu: {
      cpu_num: {
        label: 'cpuCNmb',
        value: '',
      },
      cpu_us: {
        label: 'cpuUtil',
        value: '',
      },
    },
    mem: {
      mem_total: {
        label: 'memSize',
        value: '',
      },
      mem: {
        label: 'memUseC',
        value: '',
      },
    },
    disk: {
      disk_total: {
        label: 'hadSize',
        value: '',
      },
      disk: {
        label: 'hadUtil',
        value: '',
      },
    },
  });

  // 获取资源控制
  const getMonitor = async () => {
    spinning.value = true;
    getMonitorApi()
      .then(({ ip, ...res }) => {
        ipCount.value = ip;
        for (let k in state) {
          for (let key in state[k]) {
            state[k][key].value = res[key];
          }
        }
      })
      .finally(() => {
        spinning.value = false;
      });
  };
  getMonitor();
</script>
<style lang="less" scoped>
  .container {
    padding: 0 16px;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    line-height: 56px;
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
  }
  .monitor {
    border: 1px solid #eee;
    .title {
      display: flex;
      align-items: center;
      height: 48px;
      line-height: 48px;
      padding: 0 16px;
      font-size: @fz16;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      img {
        width: 24px;
        height: 24px;
      }
      .subtitle {
        margin-left: 16px;
        font-size: @fz12;
        color: rgba(0, 0, 0, 0.8);
        font-weight: 300;
      }
    }
    .nodes {
      border-radius: 8px;
      padding: 16px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .label {
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
        line-height: 20px;
        margin-bottom: 8px;
      }
      .value {
        font-size: @fz22;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        height: 40px;
      }
    }
  }
</style>

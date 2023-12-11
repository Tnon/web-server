<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-08 10:00:24
 * @LastEditTime: 2023-07-27 19:11:23
-->
<template>
  <div class="container">
    <!-- 解压中 start-->
    <template v-if="zipState.unpack_status === UnPackStatus.Unpacking">
      <div class="unpacking">
        <div class="loadmsg">
          <img class="sicon smicon" :src="loadingPng" />
          <span class="msg">{{ t('operation.unpacking') }}</span>
        </div>
        <a-progress strokeColor="#18BA79" :percent="zipState.unpack_percentage" />
      </div>
    </template>
    <!-- 解压中 end-->
    <!-- 解压成功 start -->
    <template v-else-if="zipState.unpack_status === UnPackStatus.Success">
      <template v-if="!isUpgradeDone">
        <img class="sicon" :src="loadingPng" />
      </template>
      <CheckCircleFilled class="sicon" v-else />
      <div class="steps">
        <div class="title">
          {{ isUpgradeDone ? t('operation.serupdone') : t('operation.seruping') }}
        </div>

        <template v-for="item in state" :key="item.name">
          <div class="step">
            <span
              :class="{
                upgrading: item.update_status === SERVERUPGRADESTATUS.UPGRADING,
                done: item.update_status === SERVERUPGRADESTATUS.SUCCESS,
                error: item.update_status === SERVERUPGRADESTATUS.FAILED,
              }"
            >
              {{
                item.update_status === SERVERUPGRADESTATUS.UPGRADEABLE
                  ? t('operation.waitUpg')
                  : item.update_status === SERVERUPGRADESTATUS.UPGRADING
                  ? t('operation.upging')
                  : item.update_status === SERVERUPGRADESTATUS.SUCCESS
                  ? t('operation.upgdone')
                  : item.update_status === SERVERUPGRADESTATUS.FAILED
                  ? t('operation.upgerr')
                  : item.update_status === SERVERUPGRADESTATUS.PREPARE
                  ? t('operation.prepupgra')
                  : item.update_status === SERVERUPGRADESTATUS.LASTED
                  ? t('operation.lastedv')
                  : ''
              }}
            </span>
            &nbsp;
            <span>
              {{ t('operation.versionnm', [item.module, item.old_version, item.version]) }}
            </span>
          </div>
        </template>
        <!-- 完成升级按钮 start -->
        <a-button class="btn" v-if="isUpgradeDone" @click="closeModal()" type="primary">
          {{ t('operation.sucupg') }}
        </a-button>
        <!-- 完成升级按钮 end -->
        <!-- 退出升级按钮 start -->
        <a-button class="btn" v-if="upgradeErr" @click="closeModal()" type="primary" danger>
          {{ t('operation.quit') }}
        </a-button>
        <!-- 退出升级按钮 end -->
      </div>
    </template>
    <!-- 解压成功 end -->
    <!-- 解压失败 start-->
    <template v-else>
      <div class="unpackerr">
        <div class="result">
          <CloseCircleFilled class="siconerr" />
          <span class="msg">{{ t('operation.unpackerr') }}</span>
        </div>
        <a-button class="btn" type="primary" danger @click="closeModal()">
          {{ t('operation.quit') }}
        </a-button>
      </div>
    </template>
    <!-- 解压失败 end-->
  </div>
</template>

<script setup lang="tsx">
  import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue';
  import { computed, onUnmounted, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { UnPackStatus, UpgredeState } from './type';
  import loadingPng from '@/assets/images/loading.svg';
  import { SERVERUPGRADESTATUS } from '../upgradeStatus';

  import { getServerTableList } from '@/api/operation/upgrade';
  defineProps({
    closeModal: {
      type: Function,
      required: true,
    },
  });
  const { t } = useI18n();
  //是否显示退出升级
  const upgradeErr = ref(false);
  //解压的时间
  const timerUnpack = ref<any>();
  //升级的时间
  const timerUpgrade = ref<any>();
  //等待进度条满的时间
  const timerProgress = ref<any>();
  //mock数据
  const state = ref<UpgredeState[]>([]);
  //解压状态和百分比
  const zipState = reactive({
    unpack_status: UnPackStatus.Init,
    unpack_percentage: 0,
  });
  //解压操作的轮训函数
  const unpackInterval = async () => {
    const { code, unpack_status, unpack_percentage } = await getServerTableList({
      page: {
        page_index: -1,
        page_size: 0,
      },
    } as any);
    // 如果解压完成，延时赋值，让进度走满，再更新dom
    if (unpack_status === UnPackStatus.Success) {
      timerProgress.value = setTimeout(() => {
        zipState.unpack_status = unpack_status;
      }, 2000);
    } else {
      zipState.unpack_status = unpack_status ?? UnPackStatus.Init;
    }
    zipState.unpack_percentage = parseInt(unpack_percentage ?? 0);
    // 如果解压失败，停止轮训
    if (unpack_status === UnPackStatus.Error || code) {
      clearInterval(timerUnpack.value);
    }
    // 解压完成，停止解压轮训
    if (unpack_percentage === 100 || unpack_status === UnPackStatus.Success) {
      clearInterval(timerUnpack.value);
      // 开始升级
      getUpgradeStatus();
    }
  };
  //轮训获取解压进度
  const getUnpackPercent = () => {
    unpackInterval();
    timerUnpack.value = setInterval(() => {
      unpackInterval();
    }, 2000);
  };
  getUnpackPercent();
  //升级的轮训函数
  const upgradeInterval = async () => {
    const { code, items } = await getServerTableList({
      page: {
        page_index: -1,
        page_size: 0,
      },
    } as any);
    if (code) {
      clearInterval(timerUpgrade.value);
      upgradeErr.value = true;
    } else {
      state.value = items ?? [];
    }
  };
  //升级轮训
  const getUpgradeStatus = () => {
    upgradeInterval();
    timerUpgrade.value = setInterval(async () => {
      upgradeInterval();
      state.value[0].update_status = 1;
    }, 2000);
  };
  //是否升级完成
  const isUpgradeDone = computed(() => {
    const bool =
      !!state.value.length &&
      state.value.every(
        (ele) =>
          ele.update_status === SERVERUPGRADESTATUS.SUCCESS ||
          ele.update_status === SERVERUPGRADESTATUS.FAILED,
      );
    if (bool) {
      clearInterval(timerUpgrade.value);
    }
    return bool;
  });
  onUnmounted(() => {
    clearInterval(timerUnpack.value);
    clearInterval(timerUpgrade.value);
    clearTimeout(timerProgress.value);
  });
</script>

<style scoped lang="less">
  .container {
    padding: 48px;
    display: flex;
    align-items: start;
    .sicon {
      font-size: 42px;
      color: @primary-color;
      margin-right: 16px;
    }

    img {
      animation: rotate 5s linear infinite;
      width: 42px;
    }
    .steps {
      .title {
        font-size: @fz18;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 8px;
      }
      .step {
        display: flex;
        align-items: center;
        margin: 8px 0;
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
        .upgrading {
          color: @warn-color;
        }
        .error {
          color: @danger-color;
        }
        .done {
          color: @primary-color;
        }
      }
    }
    .btn {
      margin-top: 16px;
    }
    .unpacking {
      flex: 1;
      .loadmsg {
        display: flex;
        align-items: center;
        margin-bottom: 48px;
        .smicon {
          font-size: @fz24;
        }
        .msg {
          font-size: @fz18;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
    .unpackerr {
      flex: 1;
      .btn {
        float: right;
      }
      .result {
        display: flex;
        align-items: center;
        .siconerr {
          font-size: 42px;
          color: @danger-color;
          margin-right: 16px;
        }
        .msg {
          font-size: @fz18;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }
</style>

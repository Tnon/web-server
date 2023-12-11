<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-26 18:33:41
 * @LastEditTime: 2023-08-16 09:10:11
-->
<template>
  <div class="cardcon">
    <!-- 授权状态 start -->
    <div class="licen" @click="openLicense">
      <custom-icon
        class="cion"
        :class="[authStatus.flag === 'Authorized' ? 'sucColor' : 'errColor']"
        type="#ax-authorization"
      />
      <!-- :type="authStatus.flag === 'Authorized' ? '#ax-authorize' : '#ax-unauthorized'" -->
      <div class="sket">{{ t('license.' + authStatus.status) }}</div>
      <right-outlined class="ricon" />
    </div>
    <!-- 授权状态 end -->
    <div class="authStatus" v-if="authStatus.flag === 'Authorized'">
      <!-- 授权剩余 start -->
      <div class="dayrm">
        <template v-if="isNumber(authDays)">
          <div class="label">{{ t('license.sysqqx') }}</div>
          <!-- 天数统计 start -->
          <div class="static">
            <div class="fr">{{ dayrm }}</div>
            <div class="total">/ {{ authDays }}{{ t('license.days') }}</div>
          </div>
          <!-- 天数统计 end -->
        </template>
        <template v-else>
          <div class="label">{{ t('license.' + authDays) }}</div>
        </template>
      </div>
      <!-- 授权剩余 end -->

      <!-- 台数剩余 start -->
      <div class="dayrm">
        <div class="label">{{ t('license.suzdd') }}</div>
        <!-- 天数统计 start -->
        <div class="static">
          <div class="fr">{{ numbSurplus }}</div>
          <div class="total">/ {{ authNum }}{{ t('setting.agtUil') }}</div>
        </div>
        <!-- 天数统计 end -->
      </div>
      <!-- 台数剩余 end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useLicense } from '@/store/modules/license-auth';
  import { useI18n } from 'vue-i18n';
  import { isNumber } from 'lodash';
  import { RightOutlined } from '@ant-design/icons-vue';
  import licenseModal from '@/layout/setava/components/licenseModal';
  import { useModal } from '@/hooks/use-modal';

  const { t } = useI18n();
  const licenseStore = useLicense();
  //授权状态
  const authStatus = computed(() => licenseStore.authStatus);
  //剩余天数
  const dayrm = computed(() => licenseStore.lic_rmday);
  // const dayrm = ref(120);
  //授权天数
  const authDays = computed(() => licenseStore.authDays);
  //授权台数
  const authNum = computed(() => licenseStore.authNum);
  //使用台数
  const numbSurplus = computed(() => licenseStore.numbSurplus);

  const openLicense = () => {
    useModal(
      {
        title: t('license.authInfo'),
        footer: false,
        width: 400,
        wrapClassName: 'modalBodyNopad',
      },
      licenseModal,
    );
  };
</script>

<style scoped lang="less">
  .cardcon {
    margin: 0 16px;
    position: relative;
    min-height: 90px;
    background: linear-gradient(90deg, #1f2124 0%, #14161a 100%);
    border-radius: 0px 0px 16px 16px;
    z-index: 2;
    padding: 16px;
    &::before {
      content: '';
      position: absolute;
      background: @primary-color;
      border-radius: 0 0 0 12px;
      height: 80px;
      width: 4px;
      left: -4px;
      top: 0;
    }
    &::after {
      content: '';
      position: absolute;
      background: @primary-color;
      border-radius: 0 12px 0 0;
      height: 80px;
      width: 4px;
      right: -4px;
      top: 0;
    }
    .licen {
      flex: 1;
      display: flex;
      align-items: center;
      cursor: pointer;
      .cion {
        font-size: 32px !important;
      }
      .sucColor {
        color: @primary-color;
      }
      .errColor {
        color: @danger-color;
      }
      .sket {
        font-size: @fz16;
        font-weight: 600;
        margin-left: 8px;
        color: #fff;
      }
      .ricon {
        color: #fff;
        margin-left: 8px;
      }
    }
    .authStatus {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .dayrm {
        display: flex;
        flex-direction: column;
        padding: 16px 0;
        .label {
          font-size: @fz13;
          font-weight: 600;
          color: #ffffff;
        }
        .static {
          display: flex;
          align-items: baseline;
          font-size: @fz13;
          font-weight: normal;
          color: rgba(255, 255, 255, 0.55);
          .fr {
            font-size: @fz20;
            font-weight: 600;
            color: @primary-color;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .suc {
    color: @primary-color;
  }
  .err {
    color: @danger-color;
  }
  .openDetail {
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .detail {
    color: #fff;
    transition: all 0.3s;
    overflow: hidden;
    .header {
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 8px;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .id {
        word-break: break-word;
        margin-right: 16px;
      }
      .copy {
        cursor: pointer;
      }
    }
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 16px 0 8px 0;
    .selBtn {
      color: #fff;
      background: rgba(0, 0, 0, 0);
    }
    :deep(.ant-btn-primary[disabled]) {
      color: #00000040;
      border-color: #d9d9d9;
      background: #f5f5f5;
      text-shadow: none;
      box-shadow: none;
    }
  }
  .fileName {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.7);
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    .delFile {
      cursor: pointer;
    }
  }
</style>

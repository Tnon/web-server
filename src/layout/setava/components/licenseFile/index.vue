<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-08 16:22:44
 * @LastEditTime: 2023-08-14 10:13:57
-->
<template>
  <div class="licen" @click="openLicense" :class="[flag === 'Authorized' ? 'suc' : 'err']">
    <custom-icon size="18" class="skicon" type="#ax-authorization" />
    <span class="sket">{{ t('license.' + status) }}</span>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { useLicense } from '@/store/modules/license-auth';
  import { useModal } from '@/hooks';
  import licenseModal from '../licenseModal';
  import { useI18n } from 'vue-i18n';
  const emit = defineEmits(['closePop']);
  const { t } = useI18n();
  const licenseStore = useLicense();
  const authStatus = computed(() => licenseStore.authStatus);
  const { status, flag } = authStatus.value;

  const openLicense = async () => {
    emit('closePop');
    await licenseStore.getLicense();
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
<style lang="less" scoped>
  .licen {
    height: 40px;
    padding: 8px 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    cursor: pointer;

    .skicon {
      margin-right: 8px;
    }
    .sket {
      font-size: @fz12;
      font-weight: 400;
      line-height: 20px;
    }
  }
  .suc {
    color: @primary-color;
  }
  .err {
    color: @danger-color;
  }
</style>

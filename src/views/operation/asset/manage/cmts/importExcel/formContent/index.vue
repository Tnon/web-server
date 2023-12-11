<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-10-27 17:33:53
 * @LastEditTime: 2023-04-06 18:03:53
-->
<template>
  <div class="content">
    <div class="letOp">
      <!-- 导入方式 start -->
      <template v-for="item in staticState" :key="item.key">
        <checkNode :nodes="item" :state="state" />
      </template>
      <!-- 导入方式 end -->
      <!-- 上传文件 start -->

      <uploadHost v-bind="state" :refreshAll="refreshAll" />
      <!-- 上传文件 end -->
    </div>
    <div class="tips">
      <p>
        <span>{{ t('asset.tpOnePre') }}</span>
        <span class="tmpdld" @click="downloadTmp">
          {{ '"' + t('asset.dldtemplate') + '.xlsx"' }}
        </span>
        <span>{{ t('asset.tpOneNext') }}</span>
      </p>
      <p>{{ t('asset.tpTwo') }}</p>
      <p>{{ t('asset.tpThree') }}</p>
      <p>{{ t('asset.tpFour') }}</p>
      <p>{{ t('asset.tpFive') }}</p>
      <p>{{ t('asset.tpSix') }}</p>
      <p>{{ t('asset.tpSeven') }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { checkNode } from '../checkNode/index';
  import { NodeItems } from './index';
  import { uploadHost } from '../uploadHost';
  import { useI18n } from 'vue-i18n';
  import { exportExcel } from '@/utils/tools';
  const { t } = useI18n();
  const state = reactive({
    mode: '1',
  });
  defineProps({
    refreshAll: Function,
  });
  //静态数据，表单项
  const staticState: NodeItems[] = [
    {
      title: t('asset.seliptTp'),
      key: 'mode',
      checkes: [
        {
          lable: t('asset.byHon'),
          value: '1',
        },
        {
          lable: t('asset.byIp'),
          value: '2',
        },
      ],
    },
    // {
    //   title: t('asset.hipSame'),
    //   key: 'ip',
    //   checkes: [
    //     {
    //       lable: t('asset.noIpt'),
    //       value: '1'
    //     },
    //     {
    //       lable: t('asset.iptAll'),
    //       value: '2'
    //     }
    //   ]
    // }
  ];
  const downloadTmp = () => {
    exportExcel(
      '/api/asset/host/downloadtemplate',
      { filter: undefined },
      'GET',
      t('asset.dldtemplate'),
    );
  };
</script>

<style lang="less" scoped>
  .tmpdld {
    cursor: pointer;
    color: rgb(24, 186, 121);
  }
  .content {
    display: flex;
    align-items: center;
    .letOp {
      flex: 4;
    }
    .tips {
      flex: 3;
      margin-left: 16px;
    }
    p {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
    }
  }
</style>

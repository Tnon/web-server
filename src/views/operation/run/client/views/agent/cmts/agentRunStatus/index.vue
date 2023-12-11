<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-06-13 10:07:47
 * @LastEditTime: 2023-07-13 11:14:02
-->
<template>
  <div>
    <!-- 提示语 start -->
    <template v-if="!agtCollMid.agent && !agtCollMid.collection && !agtCollMid.plugin">
      <div class="tips">
        <check-circle-filled class="cico" />
        <span class="text">{{ t('operation.acpno') }}</span>
      </div>
    </template>
    <template v-else>
      <div class="tips">
        <InfoCircleFilled class="eico" />
        <span class="text">{{ errorTypes }}{{ t('operation.acperr') }} </span>
      </div>
    </template>
    <!-- 提示语 end -->

    <!-- tab和表格 start -->
    <tab-table :self_verify="self_verify" />
    <!-- tab和表格 end -->
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, ref, watchEffect } from 'vue';
  import { CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import tabTable from '../tabTable';
  import { T_Self_Status } from '../selfDete/type';
  import { getAgentList } from '@/api/operation/run';
  const props = defineProps<{
    host_id: string;
  }>();
  const { t } = useI18n();
  const agtCollMid = reactive({
    agent: false,
    collection: true,
    plugin: true,
  });
  const self_verify = ref<T_Self_Status>();
  watchEffect(async () => {
    const {
      items: [{ agent_status: self_verifyRes }],
    } = await getAgentList({
      filter: {
        host_id: props.host_id,
      },
      page: {
        page_index: 1,
        page_size: 1,
      },
    });
    self_verify.value = self_verifyRes;
    for (let k in self_verifyRes) {
      agtCollMid[k] = !!self_verifyRes[k].count;
    }
  });
  //错误的集合
  const errorTypes = computed(() => {
    const labelText: string[] = [];
    for (let k in agtCollMid) {
      if (agtCollMid[k]) {
        labelText.push(t('operation.' + k));
      }
    }
    return labelText.length === 1 ? labelText[0] : labelText.join('、');
  });
</script>

<style scoped lang="less">
  .tips {
    display: flex;
    align-items: center;
    padding: 0 0 32px 0;
    .cico {
      color: @primary-color;
      font-size: @fz14;
    }
    .eico {
      color: @warn-color;
      font-size: @fz14;
    }
    .text {
      font-size: @fz12;
      color: rgba(0, 0, 0, 0.4);
      margin-left: 8px;
    }
  }
</style>

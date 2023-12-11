<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-14 19:16:54
 * @LastEditTime: 2023-10-13 10:25:44
-->
<template>
  <div>
    <div class="subtitle">{{ t('asset.moveHostTo') }}</div>
    <a-form>
      <a-form-item v-bind="validateInfos.host_group_id">
        <hostGroupSelect
          v-model:selectedGroupIds="host_group_idState.host_group_id"
          :placeholder="t('asset.selectGroup')"
          :multiple="false"
        />
      </a-form-item>
    </a-form>
    <template v-if="effectStrategyList.white_items.length || effectStrategyList.black_items.length">
      <!-- 删除分组提示 start -->
      <div class="tips">
        {{ t('asset.deletips') }}
      </div>
      <!-- 影响白 start -->
      <div class="item" v-if="effectStrategyList.white_items.length">
        <div class="label">{{ t('strategy.white') }}:</div>
        <template v-for="item in effectStrategyList.white_items" :key="item.id">
          <span class="tags">{{ item.id }}</span>
        </template>
      </div>
      <!-- 影响白 end -->

      <!-- 影响黑 start -->
      <div class="item" v-if="effectStrategyList.black_items.length">
        <div class="label">{{ t('strategy.black') }}:</div>
        <template v-for="item in effectStrategyList.black_items" :key="item.id">
          <span class="tags">{{ item.id }}</span>
        </template>
      </div>
      <!-- 影响黑 start -->
    </template>

    <!-- 删除分组提示 start -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Form } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  import { GROUPENUM } from '@/enums/moveGroup';
  import { getHostGroups, getEffStrategy } from '@/api/asset/hostInfo/host';
  import hostGroupSelect from '@/components/host-group-select';
  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
  });
  const useForm = Form.useForm;
  const host_group_idState = reactive({ host_group_id: undefined });
  //影响的策略
  const effectStrategyList = reactive<any>({
    white_items: [],
    black_items: [],
  });
  const { t } = useI18n();
  const rulesRef = reactive({
    host_group_id: [
      {
        required: true,
        message: t('asset.selectGroup'),
      },
    ],
  });
  const { validate, validateInfos } = useForm(host_group_idState, rulesRef);
  //树 数据
  let dataSource: any = ref<any>();
  const getTreeData = async () => {
    const { groups } = await getHostGroups(GROUPENUM.ALL);
    dataSource.value = groups;
  };
  getTreeData();
  //获取删除分组影响的策略
  const getEffectStrategy = async () => {
    const { white_items, black_items } = await getEffStrategy({ id: props.id });
    effectStrategyList.white_items = white_items ?? [];
    effectStrategyList.black_items = black_items ?? [];
  };
  getEffectStrategy();
  defineExpose({ validate, host_group_idState });
</script>
<style lang="less" scoped>
  .subtitle {
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
  }
  .tips {
    font-size: @fz14;
    color: @warn-color;
  }
  .item {
    padding: 16px 0;
    max-height: 200px;
    overflow: auto;
    .label {
      font-size: @fz12;
      font-weight: 600;
    }
    .tags {
      display: inline-block;
      padding: 2px 4px;
      background-color: #eee;
      margin: 8px 8px 0 0;
    }
  }
</style>

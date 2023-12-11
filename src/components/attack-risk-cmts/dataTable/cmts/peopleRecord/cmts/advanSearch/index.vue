<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlayClassName="advanCard"
    destroyTooltipOnHide
  >
    <template #content>
      <!-- 分组 start -->
      <div class="cols">
        <div class="label">{{ t('common.group') }}</div>
        <hostGroupSelect :multiple="false" v-model:selected-group-ids="params.group" />
      </div>
      <!-- 分组 end -->
      <!-- 威胁类型 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.wxlx') }}</div>
        <a-select
          class="select"
          show-search
          allowClear
          optionFilterProp="name"
          v-model:value="risk_type_listCmp"
          :placeholder="t('report.defaultAll')"
          @dropdownVisibleChange="dropdownVisibleChange"
          :options="wxlxOptions"
          :fieldNames="{ label: 'name', value: 'id' }"
        />
      </div>
      <!-- 威胁类型 end -->
      <!-- 处置方式 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.czfs') }}</div>
        <a-select
          class="select"
          allowClear
          show-search
          optionFilterProp="label"
          @dropdownVisibleChange="dropdownVisibleChangeCzfs"
          v-model:value="params.dispose_kind"
          :placeholder="t('report.defaultAll')"
          :options="czfsOptions"
        />
      </div>
      <!-- 处置方式 end -->
      <!-- 处置结果 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.czjg') }}</div>
        <a-select
          class="select"
          allowClear
          v-model:value="params.dispose_res"
          show-search
          optionFilterProp="label"
          :placeholder="t('report.defaultAll')"
          :options="czjgOptions"
        />
      </div>
      <!-- 处置结果 end -->
      <!-- 处置人 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.czr') }}</div>
        <a-select
          class="select"
          show-search
          optionFilterProp="name"
          allowClear
          v-model:value="params.dispose_user"
          :placeholder="t('report.defaultAll')"
          :options="czrOptions"
          :fieldNames="{ label: 'name', value: 'id' }"
        />
      </div>
      <!-- 处置人 end -->
      <!-- 确定和重置 start -->
      <div class="footer">
        <a-button class="confirm" @click="confirm" type="primary">
          {{ t('common.confirm') }}
        </a-button>
        <a-button class="reset" @click="cancle">
          {{ t('common.reset') }}
        </a-button>
      </div>
      <!-- 确定和重置 end -->
    </template>
    <a-button class="filter" type="text">
      <template #icon>
        <customIcon type="#ax-Filters" class="btnIcon" />
      </template>
      {{ t('common.filter') }}
      <span class="flag" v-if="effectFlag"></span>
    </a-button>
  </a-popover>
</template>
<script lang="ts" setup>
  import { computed, PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { IPeopleRecordState } from '../recordDetail/type';
  import { getPeopleHandleResult } from '../..';
  import { getAttRiskListApi, getHandlePeople, getCzfsMethods } from '@/api/attack_risk';
  import { HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';
  import { formaDataByName } from '.';
  import hostGroupSelect from '@/components/host-group-select';
  //属性
  const props = defineProps({
    params: {
      type: Object as PropType<Partial<IPeopleRecordState>>,
      default: () => {},
      required: true,
    },
  });
  //派发事件
  const emit = defineEmits(['confirm']);
  const { t } = useI18n();
  //处置方式
  const czfsOptions = ref([
    // {
    //   //拦截进程
    //   label: t('arcomn.lanjpr'),
    //   value: 1,
    // },
  ]);
  //动态获取处置方式
  const dropdownVisibleChangeCzfs = async (v) => {
    if (v) {
      const { items } = await getCzfsMethods({ is_man: 1 });
      czfsOptions.value = items.map((ele) => ({ label: ele.name, value: ele.id }));
    }
  };
  //处置结果

  const czjgOptions = getPeopleHandleResult(t);

  //处置人
  const czrOptions = ref([]);
  const getCzrOptions = async () => {
    const { items } = await getHandlePeople({ source: props.params.source });
    czrOptions.value = items;
  };
  getCzrOptions();
  //威胁类型数据
  const wxlxOptions = ref<any>([]);
  //动态获取
  const dropdownVisibleChange = async (v) => {
    if (v) {
      const { items } = await getAttRiskListApi({
        filter: {
          risk_path:
            props.params.source === MODELTYPE.ATTACK ? MODELTYPE.ATTACKPATH : MODELTYPE.NGAVPATH,
          handle: HANDLETYPE.UNHANDLE,
        } as any,
      });
      //根据名字去重
      wxlxOptions.value = formaDataByName(items);
    }
  };
  //威胁类型计算属性
  const risk_type_listCmp = computed({
    get: () => {
      if (props.params.risk_type_list?.length) {
        return props.params.risk_type_list?.join(',');
      }
      return undefined;
    },
    set: (v) => {
      if (v) {
        props.params.risk_type_list = v.split(',').map((ele) => ~~ele);
      } else {
        props.params.risk_type_list = [];
      }
    },
  });
  //flag 标记是否筛选了
  const effectFlag = ref<boolean>(false);
  //派发确定事件
  const confirm = () => {
    let flag = '';
    for (let k in props.params) {
      if (k !== 'source') {
        if (k === 'risk_type_list') {
          if (props.params[k]?.length) {
            flag += props.params[k]?.length ?? '';
          }
        } else {
          flag += props.params[k] ?? '';
        }
      }
    }
    effectFlag.value = !!flag;
    emit('confirm');
  };
  //重置init
  const cancle = () => {
    for (let k in props.params) {
      if (k !== 'source') {
        props.params[k] = undefined;
      }
    }
    effectFlag.value = false;
    emit('confirm');
  };
</script>
<style lang="less" scoped>
  .cols {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .label {
      width: 100px;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
    }
    .selecTree {
      flex: 1;
      position: relative;
      border-radius: 8px;
    }
    .select {
      flex: 1;
      border-radius: 8px;
    }
  }
  .filter {
    position: relative;
    margin: 0 8px;
    .flag {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      right: 2px;
      top: 5px;
      background: #18ba79;
    }
  }
  .footer {
    display: flex;
    margin-top: 24px;
    .confirm {
      flex: 1;
    }
    .reset {
      margin-left: 16px;
    }
  }
</style>

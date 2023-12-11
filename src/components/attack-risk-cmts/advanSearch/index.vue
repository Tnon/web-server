<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlayClassName="advanCard"
    destroyTooltipOnHide
  >
    <template #content>
      <!-- 攻击/风险 标签 start -->
      <div class="cols">
        <div class="label">
          {{ t('common.attacktag') }}
        </div>
        <a-tree-select
          style="flex: 1"
          treeNodeFilterProp="name"
          :height="200"
          :fieldNames="fieldNames"
          v-model:value="tagListValue"
          :tree-data="attriskTagList"
          :tree-checkable="true"
          allow-clear
          @dropdownVisibleChange="getAttackRiskTagList"
          :placeholder="t('common.allPlace')"
        >
          <template #notFoundContent v-if="treeDataLoading">
            <div class="loadingContainer">
              <loading-outlined />
            </div>
          </template>
          <template #title="{ name, num }">
            <div class="node">
              <span>{{ name }}</span>
              <span>{{ num }}</span>
            </div>
          </template>
        </a-tree-select>
      </div>
      <!-- 攻击/风险 标签 end -->

      <!-- 处理状态 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.protStatus') }}</div>
        <a-tree-select
          style="flex: 1"
          treeNodeFilterProp="name"
          :fieldNames="fieldNames"
          :dropdownMatchSelectWidth="false"
          v-model:value="modelValue"
          :tree-data="statusData"
          :tree-checkable="true"
          allow-clear
          :placeholder="t('common.allPlace')"
        />
      </div>
      <!-- 处理状态 end -->

      <!-- 攻击源 start -->
      <div class="cols">
        <div class="label">
          {{ t('arcomn.attackSrc') }}
        </div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('arcomn.attSrcPlace')"
          v-model:value="agus.risk_src_list"
        />
      </div>
      <!-- 攻击源 end -->

      <!-- 影响主机 start -->
      <div class="cols" v-if="!fromAsset">
        <div class="label">{{ t('arcomn.impactHost') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('arcomn.ipPlace')"
          v-model:value="agus.ip_list"
        />
      </div>
      <!-- 影响主机 end -->

      <!-- 分组 start -->
      <div class="cols" v-if="!fromAsset">
        <div class="label">{{ t('common.group') }}</div>
        <hostGroupSelect v-model:selectedGroupIds="agus.group_list" :multiple="true" />
      </div>
      <!-- 分组 end -->

      <!-- 标签 start -->
      <div class="cols" v-if="!fromAsset">
        <div class="label">{{ t('common.tag') }} </div>
        <a-textarea
          class="selecTree"
          :placeholder="t('common.tagPlace')"
          auto-size
          v-model:value="agus.tag_list"
        />
      </div>
      <!-- 标签 end -->

      <!-- 时间 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.dateRange') }}</div>
        <a-range-picker
          style="width: 100%; flex: 1"
          v-model:value="daterange"
          show-time
          @change="ok"
          :format="dateFormat"
        />
      </div>
      <!-- 时间 end -->
      <!-- 人工处置结果 start -->
      <div class="cols">
        <a-select
          style="width: 100%; flex: 1"
          :placeholder="t('arcomn.rhresu')"
          optionFilterProp="label"
          show-search
          allowClear
          v-model:value="agus.dispose_result_list"
          :options="dispose_result_listOptions"
        />
      </div>
      <!-- 人工处置结果 end -->
      <!-- 当前处置策略 start -->
      <div class="cols">
        <a-select
          style="width: 100%; flex: 1"
          :placeholder="t('arcomn.cuspol')"
          allowClear
          optionFilterProp="label"
          show-search
          mode="multiple"
          :autoClearSearchValue="false"
          v-model:value="policy_listCmp"
          :options="policyOptions"
        />
      </div>
      <!-- 当前处置策略 end -->
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
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { computed, PropType, reactive, ref } from 'vue';
  import { getAttRiskListApi } from '@/api/attack_risk';
  import hostGroupSelect from '@/components/host-group-select';
  import { formatItemsByName, getPolicyOptions, getStatusData } from './datasource';
  import dayjs, { Dayjs } from 'dayjs';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';
  import { AttackTableparams } from '@/api/attack_risk/model';
  import { getPeopleHandleResult } from '../dataTable/cmts/peopleRecord';
  //属性
  const props = defineProps({
    params: {
      type: Object as PropType<AttackTableparams>,
      required: true,
    },
    //资产 筛选项删除 影响主机、分组、主机标签 筛选项
    fromAsset: {
      type: Boolean,
    },
  });
  // 总览跳转携带参数
  const {
    query: { begintime, endtime },
  } = useRoute() as any;
  const { t } = useI18n();

  //人工处置结果和当前处置测了
  const dispose_result_listOptions = getPeopleHandleResult(t);
  const policyOptions = getPolicyOptions(t);
  //获取数据的loading(攻击风险标签)
  const treeDataLoading = ref<boolean>(false);
  //派发事件
  const emit = defineEmits(['confirm']);

  //时间格式
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  //攻击/风险 标签 计算属性
  const tagListValue = computed({
    get: () => {
      //平铺的数据，需要改成标准数据
      const arr: any = [];
      agus.risk_tab_list!.forEach(({ id }) => {
        attriskTagList.value.forEach((ele) => {
          if (ele.id.split(',').includes(id)) {
            if (!arr.includes(ele.id)) {
              arr.push(ele.id);
            }
          }
        });
      });
      return arr;
    },
    set: (val) => {
      //设置的时候把agus的数据改造好
      const arr: any = [];
      val.forEach((ele) => {
        attriskTagList.value.forEach(({ id, kind }) => {
          if (ele === id) {
            if (ele.includes(',')) {
              ele.split(',').forEach((ids, index) => {
                arr.push({ id: ids, kind: ~~kind.split(',')[index] });
              });
            } else {
              arr.push({ id: ele, kind: ~~kind });
            }
          }
        });
      });
      agus.risk_tab_list = arr;
      return val;
    },
  });
  //处理状态 计算属性
  const modelValue = computed({
    get: () => (agus.risk_status_list ? agus.risk_status_list.split(',') : []),
    set: (val) => {
      agus.risk_status_list = val.join(',');
    },
  });
  //处置策略 计算属性
  const policy_listCmp = computed({
    get: () => (agus.policy_list ? agus.policy_list.split(',') : []),
    set: (val) => {
      agus.policy_list = val.join(',');
    },
  });
  //树数据
  const statusData = getStatusData(t);
  //攻击和风险标签
  const attriskTagList = ref<any>([]);
  //动态获取
  const getAttackRiskTagList = async (v) => {
    if (v) {
      treeDataLoading.value = true;
      const { items } = await getAttRiskListApi({ filter: Object.assign({}, props.params, agus) });
      //根据名字去重
      attriskTagList.value = formatItemsByName(items);
      treeDataLoading.value = false;
    }
  };
  //数据仓
  const agus = reactive<Partial<AttackTableparams>>({
    //攻击风险标签
    risk_tab_list: [],
    //处理状态
    risk_status_list: '',
    //攻击源
    risk_src_list: '',
    //影响主机
    ip_list: '',
    //所属分组
    group_list: '',
    //标签
    tag_list: '',
    //时间范围
    date_range: begintime || endtime ? begintime + ',' + endtime : '',
    //人工处置结果
    dispose_result_list: undefined,
    //当前处置策略
    policy_list: undefined,
  });
  //时间范围
  const daterange = ref<Dayjs[]>(
    begintime || endtime ? [dayjs(begintime, dateFormat), dayjs(endtime, dateFormat)] : [],
  );
  //时间确定按钮
  const ok = (v) => {
    if (v && v.length) {
      const [start, end] = v;
      agus.date_range = start.format(dateFormat) + ',' + end.format(dateFormat);
    } else {
      agus.date_range = '';
    }
  };
  //flag 标记是否筛选了
  const effectFlag = ref<boolean>(begintime || endtime ? true : false);
  //派发确定事件
  const confirm = () => {
    let flag = '';
    const sendStateObj = Object.assign({}, agus, {
      risk_src_list: agus.risk_src_list!.replace(/\//g, ','),
      ip_list: agus.ip_list!.replace(/\//g, ','),
      tag_list: agus.tag_list!.replace(/\//g, ','),
    });
    for (let k in sendStateObj) {
      if (k === 'risk_tab_list') {
        flag += sendStateObj[k]!.length ? sendStateObj[k]!.length : '';
      } else {
        flag += sendStateObj[k] ?? '';
      }
    }
    effectFlag.value = !!flag;
    emit('confirm', sendStateObj);
  };
  //重置init
  const cancle = () => {
    for (let k in agus) {
      if (k === 'risk_tab_list') {
        agus[k] = [];
      } else if (k === 'dispose_result_list' || k === 'policy_list') {
        agus[k] = undefined;
      } else {
        agus[k] = '';
      }
    }
    daterange.value = [];
    effectFlag.value = false;
    emit('confirm', agus);
  };
  //处理状态的field
  const fieldNames = {
    children: 'items',
    label: 'name',
    key: 'id',
    value: 'id',
  };
</script>
<style lang="less" scoped>
  .cols {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .ant-calendar-picker {
      flex: 1;
    }
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
  }
  .filter {
    position: relative;
    // margin: 0 8px;
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

  .node {
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
  }
  .loadingContainer {
    padding: 30px 0;
    font-size: @fz20;
    text-align: center;
  }
</style>

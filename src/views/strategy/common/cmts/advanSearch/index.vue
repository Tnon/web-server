<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlayClassName="advanCard"
    destroyTooltipOnHide
  >
    <template #content>
      <!-- 属性 start -->
      <div class="cols">
        <div class="label">
          {{ t('strategy.attr') }}
        </div>
        <a-select
          style="flex: 1"
          allowClear
          :placeholder="t('arcomn.pslesx')"
          v-model:value="agus.attribute"
        >
          <template v-for="item in dymicAttrs" :key="item">
            <a-select-option :value="item"> {{ t('arcomn.' + item) }}</a-select-option>
          </template>
        </a-select>
      </div>
      <!-- 属性 end -->

      <!-- 攻击类型 start -->
      <div class="cols" v-if="params.policy_type === E_WB_Enum.White">
        <div class="label">{{ t('arcomn.attack_typeDraw') }}</div>
        <a-tree-select
          style="flex: 1"
          :filterTreeNode="filterTreeNode"
          :fieldNames="fieldNames"
          v-model:value="modelValue"
          :tree-data="attrTreeData"
          allow-clear
          tree-checkable
          multiple
          :placeholder="t('common.allPlace')"
        />
      </div>
      <!-- 攻击类型 end -->

      <!-- 应用分组 start -->
      <div class="cols">
        <div class="label">{{ t('strategy.polAppGroup') }}</div>
        <a-select
          style="flex: 1"
          allowClear
          :fieldNames="{ label: 'name', value: 'id' }"
          optionFilterProp="name"
          mode="multiple"
          :autoClearSearchValue="false"
          :height="300"
          :placeholder="t('strategy.psleyyfz')"
          :options="applyGroupOptions"
          @dropdownVisibleChange="dropdownVisibleChange($event, 'group')"
          v-model:value="apply_groupCmp"
        />
      </div>
      <!-- 应用分组 end -->
      <!-- 创建人 start -->
      <div class="cols">
        <div class="label">
          {{ t('strategy.cjr') }}
        </div>

        <a-select
          v-model:value="create_userCmp"
          :fieldNames="{ label: 'name', value: 'id' }"
          optionFilterProp="name"
          mode="multiple"
          :autoClearSearchValue="false"
          :height="300"
          allowClear
          class="selecTree"
          :placeholder="t('strategy.create_userPlace')"
          :options="create_userOptions"
          @dropdownVisibleChange="dropdownVisibleChange($event, E_USER.Create)"
        />
      </div>
      <!-- 创建人 end -->

      <!-- 最新规则内容变更人 start -->
      <div class="cols">
        <a-select
          v-model:value="update_content_userCmp"
          :fieldNames="{ label: 'name', value: 'id' }"
          mode="multiple"
          :autoClearSearchValue="false"
          :height="300"
          allowClear
          class="selecTree"
          :placeholder="t('strategy.ruleuouplac')"
          :options="update_content_userOptions"
          @dropdownVisibleChange="dropdownVisibleChange($event, E_USER.Content)"
        />
      </div>
      <!-- 最新规则内容变更人 end -->

      <!-- 最新应用分组变更人 start -->
      <div class="cols">
        <a-select
          v-model:value="update_group_userCmp"
          :fieldNames="{ label: 'name', value: 'id' }"
          mode="multiple"
          :autoClearSearchValue="false"
          :height="300"
          allowClear
          class="selecTree"
          :placeholder="t('strategy.guslpfflplac')"
          :options="update_group_userOptions"
          @dropdownVisibleChange="dropdownVisibleChange($event, E_USER.Group)"
        />
      </div>
      <!-- 最新应用分组变更人 end -->

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
  import { computed, PropType, reactive, ref } from 'vue';
  import { getAttackTreeDataApi } from '@/api/attack_risk';
  import { useI18n } from 'vue-i18n';
  import { useStaticConfigs } from '@/components/handle-dymic-form/helpTips';
  import { E_WB_Enum, I_BW_Filter } from '@/views/strategy/common/types';
  import { useDymicPeople, E_USER } from '.';
  //属性
  const props = defineProps({
    params: {
      type: Object as PropType<Partial<I_BW_Filter>>,
      default: () => {},
      required: true,
    },
  });
  //派发事件
  const emit = defineEmits(['confirm']);
  const { t } = useI18n();
  //应用分组计算属性
  const apply_groupCmp = computed({
    get: () => {
      if (agus.apply_group) {
        return agus.apply_group.split(',').map((ele) => ~~ele);
      }
      return [];
    },
    set: (v) => {
      agus.apply_group = v.join(',');
    },
  });
  //动态获取属性
  const dymicAttrs = ref<string[]>([]);
  const getDymicAttrs = () => {
    const { attr } = useStaticConfigs(props.params.policy_type!);
    dymicAttrs.value = attr;
  };
  getDymicAttrs();
  //处理状态 计算属性
  const modelValue = computed({
    get: () => (agus.attack_type ? agus.attack_type.split(',') : []),
    set: (val) => {
      agus.attack_type = val.join(',');
    },
  });
  //攻击类型树数据
  const attrTreeData = ref([]);
  //获取树
  const getTreeData = async () => {
    const [treeArr] = await getAttackTreeDataApi({
      policy_type: props.params.policy_type,
      deep: 3,
    });
    attrTreeData.value = treeArr.items;
  };
  props.params.policy_type === E_WB_Enum.White && getTreeData();

  //创建人中介
  const create_userCmp = computed({
    get: () => {
      if (agus.create_user) {
        return agus.create_user.split(',').map((ele) => ~~ele);
      }
      return [];
    },
    set: (v) => {
      agus.create_user = v.join(',');
    },
  });
  //变更人中介
  const update_content_userCmp = computed({
    get: () => {
      if (agus.update_content_user) {
        return agus.update_content_user.split(',').map((ele) => ~~ele);
      }
      return [];
    },
    set: (v) => {
      agus.update_content_user = v.join(',');
    },
  });
  //变更主机人中介
  const update_group_userCmp = computed({
    get: () => {
      if (agus.update_group_user) {
        return agus.update_group_user.split(',').map((ele) => ~~ele);
      }
      return [];
    },
    set: (v) => {
      agus.update_group_user = v.join(',');
    },
  });
  //应用分组数组
  const applyGroupOptions = ref([]);
  //创建人数组
  const create_userOptions = ref<any>([]);
  //变更人数组
  const update_content_userOptions = ref<any>([]);
  //变更分组人
  const update_group_userOptions = ref<any>([]);
  //下拉框打开
  const dropdownVisibleChange = async (v, type) => {
    if (v) {
      const items = await useDymicPeople(type);
      if (type === E_USER.Create) {
        create_userOptions.value = items;
      }
      if (type === E_USER.Group) {
        update_group_userOptions.value = items;
      }
      if (type === E_USER.Content) {
        update_content_userOptions.value = items;
      }
      if (type === 'group') {
        applyGroupOptions.value = items;
      }
    }
  };
  //数据仓
  const agus = reactive<Partial<I_BW_Filter>>({
    //攻击类型
    attack_type: undefined,
    //应用分组
    apply_group: undefined,
    //属性
    attribute: undefined,
    //创建人
    create_user: undefined,
    //最新内容变更芯
    update_content_user: undefined,
    //最新应用分组变更人
    update_group_user: undefined,
  });
  //flag 标记是否筛选了
  const effectFlag = ref<boolean>(false);
  //派发确定事件
  const confirm = () => {
    let flag = '';
    const sendStateObj = Object.assign({}, agus);
    for (let k in sendStateObj) {
      flag += sendStateObj[k] ?? '';
    }
    effectFlag.value = !!flag;
    Object.assign(props.params, sendStateObj);
    emit('confirm', false);
  };
  //重置init
  const cancle = () => {
    for (let k in agus) {
      if (k === 'attack_type' || k === 'apply_group' || k === 'attribute') {
        agus[k] = undefined;
      } else {
        agus[k] = '';
      }
    }
    effectFlag.value = false;
    Object.assign(props.params, agus);
    emit('confirm', false);
  };
  //处理状态的field
  const fieldNames = {
    children: 'items',
    label: 'name',
    value: 'path',
  };
  const filterTreeNode = (searchData, treeNode) => {
    return treeNode.name.includes(searchData);
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

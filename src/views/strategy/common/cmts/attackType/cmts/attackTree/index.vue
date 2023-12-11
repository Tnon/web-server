<template>
  <div class="container">
    <!-- 总览 start -->
    <div class="treeHead" @click="selectAll" :class="[attack_typeCmp[0] === '' ? 'actived' : '']">
      <span>{{ t('menu.overview') }}</span>
      <span> {{ totalNum }}</span>
    </div>
    <!-- 总览 start -->
    <div class="line"></div>
    <!-- 分组树 start -->
    <a-tree
      :height="480"
      blockNode
      :fieldNames="fieldNames"
      :treeData="treeData"
      v-model:selectedKeys="attack_typeCmp"
      @select="selectType"
    >
      <!-- 自定义图标 start -->
      <template #switcherIcon="{ expanded }">
        <RightOutlined :class="{ rot: expanded }" class="arrowIcon" />
      </template>
      <!-- 自定义图标 end -->
      <!-- 组信息 start -->
      <template #title="{ name, num }">
        <div class="node">
          <span class="label" :title="name">{{ name }}</span>
          <span class="number" v-if="num" :title="num">{{ num }}</span>
        </div>
      </template>
      <!-- 组信息 end -->
    </a-tree>
  </div>
</template>
<script lang="ts" setup>
  import { computed, PropType, ref } from 'vue';
  import { fieldNames } from './index';
  import { RightOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { getAttackTreeDataApi } from '@/api/attack_risk';
  import { E_WB_Enum } from '@/views/strategy/common/types';
  const props = defineProps({
    attack_type: String,
    attack_title: {
      type: String,
      required: true,
    },
    policy_type: {
      type: Number as PropType<E_WB_Enum>,
      required: true,
    },
  });
  const { t } = useI18n();
  const emit = defineEmits(['update:attack_type', 'update:attack_title']);
  //选择树的节点
  const attack_typeCmp = computed({
    get: () => [props.attack_type],
    set: (val) => {
      if (!val.length) {
        return;
      }
      emit('update:attack_type', val[0]);
    },
  });
  //选择全部
  const selectAll = () => {
    attack_typeCmp.value = [''];
    emit('update:attack_title', t('menu.overview'));
  };
  //选择树的节点
  const selectType = (_, { selectedNodes }) => {
    if (!selectedNodes.length) {
      selectAll();
    } else {
      emit('update:attack_title', selectedNodes[0].name);
    }
  };
  //树
  const treeData = ref<any>([]);
  //全部数量
  const totalNum = ref(0);
  //获取树
  const getTreeData = async () => {
    const [treeArr] = await getAttackTreeDataApi({
      policy_type: props.policy_type,
      deep: 3,
    });
    totalNum.value = treeArr.num;
    treeData.value = treeArr.items;
  };
  getTreeData();
</script>
<style lang="less" scoped>
  .container {
    width: 280px;
    padding: 0 8px;
  }
  .treeHead {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
    padding: 0 8px;
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    &:hover {
      background: #eee;
    }
  }
  .actived {
    background: #f1f1f1;
    border-radius: 8px;
  }
  .line {
    margin: 8px 0;
    height: 1px;
    background: #eeeeee;
  }
  .node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    .label,
    .number {
      height: 40px;
      // flex: 1;
      line-height: 40px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .label {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      padding-left: 10px;
      // flex: 8;
    }
    .number {
      text-align: right;
      padding-right: 16px;
      // flex: 2;
    }
  }
  .arrowIcon {
    transition: all 0.3s;
    font-size: 10px;
    color: #666;
  }
  .rot {
    transform: rotate(90deg);
  }
</style>

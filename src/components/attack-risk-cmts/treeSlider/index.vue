<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-18 12:19:10
 * @LastEditTime: 2023-02-06 20:06:36
-->
<template>
  <div>
    <a-spin :spinning="loading">
      <common-tree
        class="AttackRisktreeCon attackTree"
        :handleType="handleTypeCmp"
        :tree-data="treeData"
        v-model:selectedKeys="selectedKeysCmp"
      >
        <template #header>
          <div :class="[selectedKeysCmp === MODELTYPE.ATTACKPATH ? 'actived' : '']">
            <div
              class="treeHead"
              :class="[totalNum ? (handleTypeCmp === HANDLETYPE.IGNORE ? 'health' : 'danger') : '']"
            >
              <dync-atk-risk-img
                imgType="alarm"
                size="small"
                :danger="handleTypeCmp !== HANDLETYPE.IGNORE"
              />
              <span class="label">
                {{ t('attack.allAttack') }}
              </span>

              <span class="number">{{ totalNum }}</span>
            </div>
          </div>
        </template>
      </common-tree>
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
  import { watch, computed, ref, PropType } from 'vue';

  import commonTree from '@/components/commonTree';
  import { getTreeDataApi } from '@/api/attack_risk';
  import { MODELTYPE, HANDLETYPE } from '@/enums/attack_risk';
  import dyncAtkRiskImg from '@/components/attack-risk-cmts/dync-attack-risk-img';
  import { useI18n } from 'vue-i18n';
  //属性
  const props = defineProps({
    handleType: Number as PropType<HANDLETYPE>,
    selectedKeys: String as PropType<MODELTYPE>,
  });
  //派发
  const emit = defineEmits(['update:handleType', 'update:selectedKeys']);
  const { t } = useI18n();
  const loading = ref<boolean>(false);
  //全部攻击
  const totalNum = ref<number>(0);
  //树
  const treeData = ref<any>([]);
  //计算属性来get / set (层级太多，有点傻X)
  const handleTypeCmp = computed({
    get: (): HANDLETYPE => props.handleType!,
    set: (val: HANDLETYPE): void => emit('update:handleType', val),
  });
  //计算属性来get / set (层级太多，有点傻X)
  const selectedKeysCmp = computed({
    get: (): MODELTYPE => props.selectedKeys!,
    set: (val: MODELTYPE): void => emit('update:selectedKeys', val),
  });

  //计算属性来get / set (层级太多，有点傻X)
  watch(handleTypeCmp, async () => {
    loading.value = true;
    await getTreeData();
    loading.value = false;
  });
  //获取树
  const getTreeData = async (silence?) => {
    if (!silence) {
      loading.value = true;
    }
    const [treeArr] = await getTreeDataApi({
      type: MODELTYPE.ATTACK,
      handle: props.handleType!,
      deep: 3,
    }).finally(() => {
      loading.value = false;
    });
    totalNum.value = treeArr.num;
    treeData.value = treeArr.items;
  };
  getTreeData();

  defineExpose({ getTreeData });
</script>
<style lang="less" scoped>
  @import url('./index.less');
</style>

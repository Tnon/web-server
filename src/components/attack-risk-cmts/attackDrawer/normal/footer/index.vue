<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 15:21:08
 * @LastEditTime: 2023-01-11 10:18:50
-->
<template>
  <div class="footer">
    <switch-nodes v-model:actived="fType" :types="dymicTab" />
    <component
      :is="components[fTypecmp]"
      v-if="!isEmpty(dataSource[fType])"
      :dataSource="dataSource[fType]"
      :id="id"
      :handle="handle"
      :getFileInfo="{
        detail_id: dataSource.detail_id,
        process_id: dataSource.process_info ? dataSource.process_info.pid : '',
        mac: dataSource.mac,
        file_size: fType === 'file_info' ? dataSource.file_info.size : '',
      }"
    />
    <!-- getFileInfo 在文件信息和类文件信息的文件获取中需要 -->
  </div>
</template>
<script lang="ts" setup>
  import switchNodes from '@/components/switchNodes';
  import { isEmpty } from 'lodash';
  import { computed, ref, unref, watchEffect } from 'vue';
  import components from './cmts';
  import { getTabs } from './index';
  const props = defineProps({
    dtype: {
      type: Number,
      required: true,
    },
    initTab: Boolean,
    dataSource: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
    },
    handle: {
      type: Number,
    },
  });
  //全部tab
  const AllTypes = getTabs();
  // 刚开始默认选中的tab
  const fType = ref<string>('');
  //计算一下组件名称
  const fTypecmp = computed(() => AllTypes[unref(fType)]['component'] ?? fType.value);
  // 初始化tab
  const dymicTab = ref<any>([]);

  //动态生成tab
  watchEffect(() => {
    //动态找出tab选中(初始化加载，翻页不加载)
    if (props.initTab) {
      let title: string = '';
      for (let type in props.dataSource) {
        title = 'title';
        if (!isEmpty(props.dataSource[type])) {
          if (type === 'srcinfo' || type === 'timeline') {
            title = 'titleAttack';
          }
          //87 无时间轴
          if (!(props.dtype === 87 && type === 'timeline')) {
            if (AllTypes[type] && AllTypes[type][title]) {
              dymicTab.value.push({
                title: AllTypes[type][title],
                type,
              });
            }
          }
        }
      }
      fType.value = dymicTab.value.length ? dymicTab.value[0].type : '';
    }
  });
</script>
<style lang="less" scoped>
  .footer {
    padding: 24px 0;
  }
  .emptyStatus {
    margin-top: 100px;
  }
</style>

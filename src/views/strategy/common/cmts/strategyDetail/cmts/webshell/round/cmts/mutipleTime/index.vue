<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-01 20:21:27
 * @LastEditTime: 2022-09-26 13:58:56
-->
<template>
  <div class="container">
    <!-- 时间选择器 start -->
    <a-time-range-picker
      class="rangepiker"
      :format="timeFormat"
      :allowClear="false"
      v-model:value="singleTimeRange"
      @change="addTimeRange"
    />
    <!-- 时间选择器 end -->
    <!-- 时间段 start -->
    <a-form class="timepk">
      <a-form-item v-bind="validateInfos!['time-range']">
        <template v-for="(item,index) in modelRef!['time-range']" :key="item">
          <a-tag class="tagSelf" closable @close="closeTag(index)">
            {{ item.begin + ' - ' + item.end }}
          </a-tag>
        </template>
      </a-form-item>
    </a-form>
    <!-- 时间段 end -->
  </div>
</template>

<script setup lang="ts">
  import { unref, ref } from 'vue';

  const props = defineProps({
    modelRef: Object,
    validateInfos: Object,
  });
  const emit = defineEmits(['change']);
  //时间格式
  const timeFormat = 'H:mm';
  //时间的值
  const singleTimeRange = ref();
  //添加时间
  const addTimeRange = () => {
    const [begin, end] = unref(singleTimeRange);
    const timeRange = { begin: begin.format(timeFormat), end: end.format(timeFormat) };

    props.modelRef!['time-range'].push(timeRange);
    singleTimeRange.value = null;
    emit('change', props.modelRef!['time-range']);
  };
  //删除
  const closeTag = (index) => {
    props.modelRef!['time-range'].splice(index, 1);
    emit('change', props.modelRef!['time-range']);
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    align-items: flex-start;
    position: relative;
    :deep(.ant-picker) {
      margin-right: 16px;
    }
    .rangepiker {
      width: 220px;
    }
  }
  .timepk {
    :deep(.ant-col) {
      position: unset;
      .ant-form-item-explain-error {
        position: absolute;
        left: 0;
        bottom: 0px;
      }
    }
  }
  .tagSelf {
    display: inline-block;
    cursor: pointer;
    position: relative;
    line-height: 30px;
    height: 30px;
    padding-right: 7px;
    &:hover {
      padding-right: 20px;
      ::v-deep(.anticon) {
        transform: scale(1);
      }
    }
    ::v-deep(.anticon) {
      transition: all 0.4s;
      position: absolute;
      right: 3px;
      top: 10px;
      transform: scale(0);
    }
  }
</style>

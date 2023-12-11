<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-20 15:58:53
 * @LastEditTime: 2023-04-06 17:35:15
-->
<template>
  <div class="pathContainer">
    <div class="atkpath hideScrollBar">
      <!-- 攻击路径选项 start -->
      <template v-for="item in selectOptions" :key="item.act_path_sha256">
        <div
          class="pathnode"
          @click.stop="selectedNode(item.act_path_sha256, item.act_num, item.pid_info_list)"
          :class="{ actived: item.act_path_sha256 === selectedPath }"
        >
          <div class="name">{{ item.act_path_name }}</div>
          <div class="number" :class="[className]">
            <span>{{ item.act_recount }}</span>
            <span>{{ t('ngav.times') }}</span>
          </div>
        </div>
      </template>
      <!-- 攻击路径选项 end -->
    </div>

    <!-- 分割线 start -->
    <div class="line"></div>
    <!-- 分割线 end -->

    <!-- 风险行为数量 start -->
    <div class="risknum">
      <div class="title">{{ t('ngav.riskBeh') }}</div>
      <div class="number">{{ activedNumber }}{{ t('ngav.bge') }}</div>
    </div>
    <!-- 风险行为数量 start -->

    <!-- 分割线 start -->
    <div class="line"></div>
    <!-- 分割线 end -->

    <!-- 启动的进程 start -->
    <div class="path hideScrollBar">
      <div class="title">
        <span>{{ t('ngav.prosline') }}</span>
        <span>{{ pid_info_list.length }}</span>
      </div>
      <!-- 进程路径 start -->
      <column-path :paths="pid_info_list" />
      <!-- 进程路径 end -->
    </div>
    <!-- 启动的进程 start -->
  </div>
</template>

<script setup lang="ts">
  import { PropType, ref, watchEffect } from 'vue';
  import columnPath from './cmts/columnPath';
  import { getClassName } from '.';
  import { useI18n } from 'vue-i18n';
  import { AttackState, AttackPath } from './type';
  const props = defineProps({
    selectOptions: {
      type: Array as PropType<AttackState[]>,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    record: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  //选中的攻击路径
  const selectedPath = ref('');
  //风险行为的数量
  const activedNumber = ref(0);
  //选中的攻击路径的子进程
  const pid_info_list = ref<AttackPath[]>([]);
  //等级颜色
  const className = ref('');
  //默认选中第一个
  watchEffect(() => {
    if (props.selectOptions && props.selectOptions.length) {
      selectedPath.value = props.selectOptions[0].act_path_sha256;
      activedNumber.value = props.selectOptions[0].act_num;
      pid_info_list.value = props.selectOptions[0].pid_info_list;
      // props.record.act_path_sha256 = selectedPath.value;
    }
    className.value = getClassName(props.level);
  });

  //选择的方法
  const selectedNode = (act_path_sha256: string, act_num: number, list: AttackPath[]): void => {
    selectedPath.value = act_path_sha256;
    activedNumber.value = act_num;
    pid_info_list.value = list;
    props.record.act_path_sha256 = act_path_sha256;
  };
</script>

<style scoped lang="less">
  .pathContainer {
    display: flex;
    padding: 0 26px;
    .atkpath {
      flex: 150px 0 0;
      align-items: center;
      justify-content: space-between;
      max-height: 100px;
      align-self: center;
      .pathnode {
        display: flex;
        margin-bottom: 4px;
        padding: 4px 10px;
        border-radius: 10px;
        cursor: pointer;
        justify-content: space-between;
        position: relative;
        .name {
          font-size: @fz12;
          font-weight: 400;
          color: #000000;
          word-break: keep-all;
        }
        .number {
          font-size: @fz12;
          font-weight: 500;
          word-break: keep-all;
        }
        .danger {
          color: #f75555;
        }
        .mid {
          color: #fb7e52;
        }
        .warning {
          color: #f6c84d;
        }
      }
      .actived {
        // background-color: #eee;
        &::before {
          content: '';
          position: absolute;
          border: 4px solid transparent;
          border-left: 8px solid @danger-color;
          width: 0;
          height: 0px;
          left: 0px;
          top: 8px;
        }
      }
    }
    .line {
      flex: 1px 0 0;
      height: 48px;
      background: rgba(0, 0, 0, 0.04);
      margin: 0 32px;
      align-self: center;
    }
    .risknum {
      // flex: 150px 0 0;
      align-self: center;
      .title {
        font-size: @fz12;
        word-break: keep-all;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
        margin-bottom: 12px;
      }
      .number {
        font-size: @fz16;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .path {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      .title {
        font-size: @fz12;
        font-weight: 400;
        word-break: keep-all;
        color: rgba(0, 0, 0, 0.5);
        margin-bottom: 8px;
      }
    }
  }
  .hideScrollBar {
    overflow: auto;
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: none;
    }
    &::-webkit-scrollbar-track-piece {
      background: #fff !important;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background: #ddd;
      }
    }
  }
</style>

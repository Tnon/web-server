<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-20 10:58:54
 * @LastEditTime: 2023-10-13 10:09:53
-->
<template>
  <div class="con">
    <div class="node">
      <div
        class="leftOp"
        :class="{ canJump: type === 'enable_vrl_patch' }"
        @click="viewDetail(type)"
      >
        <!-- 图标start -->
        <div class="cusIconPar">
          <custom-icon class="cicon" :type="item.icon" />
        </div>
        <!-- 图标end -->

        <!-- 标题 start -->
        <div class="msg">
          <div class="title">{{ t(`reinforce.${type}`) }}</div>
          <countTo class="count" :endVal="item.count" />
        </div>
        <!-- 标题 end -->
      </div>

      <!-- 监控规则额外 start -->
      <template v-if="item.extra">
        <div class="line"></div>
        <template v-for="extra in item.extra" :key="extra.title">
          <!-- 标题 start -->
          <div class="extramsg">
            <div class="title">{{ extra.title }}</div>
            <countTo class="count canJump" :endVal="extra.count" />
          </div>
          <!-- 标题 end -->
        </template>
      </template>
      <!-- 监控规则额外 start -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { I_Rule_Node } from './type';
  defineProps({
    item: {
      type: Object as PropType<I_Rule_Node>,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  });
  const { t } = useI18n();
  const router = useRouter();
  //点击查看
  const viewDetail = (type: string) => {
    if (type === 'enable_vrl_patch') {
      router.push({
        name: 'reinforce-layout-virpatch-detail',
      });
    }
  };
</script>

<style scoped lang="less">
  .node {
    display: flex;
    align-items: flex-start;
    margin-right: 16px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    .leftOp {
      display: flex;
      align-items: flex-start;
      padding: 24px;
    }
    .cusIconPar {
      padding: 6px 5px;
      background-color: @primary-color;
      border-radius: 6px;
      margin-right: 16px;
      .cicon {
        font-size: 24px !important;
        color: #fff;
      }
    }
    .msg {
      font-size: @fz14;
      font-weight: 600;
      .title {
        color: #000000;
        margin-bottom: 8px;
        word-break: keep-all;
      }
      .count {
        font-size: @fz20;
      }
    }
    .line {
      width: 1px;
      height: 60px;
      /* 控件/#000-4 - Line */
      background: rgba(0, 0, 0, 0.04);
      margin: 24px;
    }
    .extramsg {
      padding: 24px;
      cursor: pointer;
      .title {
        font-size: @fz13;
        /* 文字/黑0.55 */
        color: rgba(0, 0, 0, 0.5);
        margin-bottom: 8px;
        word-break: keep-all;
      }
      .count {
        font-size: @fz20;
        font-weight: 600;
      }
    }
  }
  .con {
    &:nth-child(3) {
      .node {
        border-radius: 12px 0 0 12px;
        margin: 0;
        border-right: none;
      }
    }
    &:nth-child(4) {
      .node {
        border-radius: 0 12px 12px 0;
        margin: 0;
        border-left: none;
      }
    }
  }
  .canJump {
    color: @primary-color;
    cursor: pointer;
  }
</style>

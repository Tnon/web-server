<!--
 * @Author: Delevin.TnT
 * @LastEditors: dailuxin
 * @Date: 2022-12-07 16:15:33
 * @LastEditTime: 2023-04-20 17:54:58
-->
<template>
  <div class="con">
    <div class="tools" :class="{ direction, handled: handled === HANDLESTATUS.GUIDANG }">
      <div
        class="btn"
        :class="{ hasBorder: direction }"
        @click.stop="handleAttack(BatchOption.Confirm)"
        v-if="handleType === HANDLETYPE.UNHANDLE || handleType === HANDLETYPE.HANDLING"
      >
        {{ t('ngav.confirm') }}
      </div>
      <div
        class="line"
        :class="{ hidden: direction }"
        v-if="handleType === HANDLETYPE.UNHANDLE || handleType === HANDLETYPE.HANDLING"
      ></div>
      <div
        @click.stop="handleAttack(BatchOption.Ignore)"
        class="btn"
        :class="{ hasBorder: direction }"
        v-if="handleType === HANDLETYPE.UNHANDLE || handleType === HANDLETYPE.HANDLING"
      >
        {{ t('arcomn.ignore') }}
      </div>
      <div
        class="line"
        :class="{ hidden: direction }"
        v-if="handleType === HANDLETYPE.UNHANDLE"
      ></div>
      <div
        class="btn"
        :class="{ hasBorder: direction }"
        @click.stop="handleAttack(BatchOption.Handling)"
        v-if="handleType === HANDLETYPE.UNHANDLE"
      >
        {{ t('arcomn.handling') }}
      </div>
      <div
        class="btn"
        :class="{ hasBorder: direction }"
        @click.stop="handleAttack(BatchOption.Reopen)"
        v-if="handleType === HANDLETYPE.IGNORE || handleType === HANDLETYPE.CONFIRM"
      >
        {{ t('arcomn.reopen') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { HANDLESTATUS, HANDLETYPE, MODELTYPE } from '@/enums/attack_risk';
  import { PropType } from 'vue';
  import { BatchOption } from '../../type';
  import { useI18n } from 'vue-i18n';
  import { batchHandleApi } from '@/api/attack_risk';
  import { AttackHandleRecord } from '@/api/attack_risk/model';
  import { useBatchMark, useModal } from '@/hooks';
  import batchMarks from '@/components/attack-risk-cmts/batchMarks';

  const { t } = useI18n();
  const props = defineProps({
    handleType: {
      type: Number as PropType<HANDLETYPE>,
      required: true,
    },
    reload: Function,
    id: {
      type: String,
      required: true,
    },
    direction: Boolean,
    selectedKeys: {
      type: String as PropType<MODELTYPE>,
      required: true,
    },
    modelType: {
      type: Number as PropType<MODELTYPE>,
      required: true,
    },
    handled: {
      type: Number,
      required: true,
    },
  });
  const handleAttack = (type: BatchOption) => {
    if (props.handled === HANDLESTATUS.GUIDANG) {
      return false;
    }
    let set_handle = 0;
    switch (type) {
      case BatchOption.Ignore:
        set_handle = HANDLETYPE.IGNORE;
        break;
      case BatchOption.Confirm:
        set_handle = HANDLETYPE.CONFIRM;
        break;
      case BatchOption.Handling:
        set_handle = HANDLETYPE.HANDLING;
        break;
      case BatchOption.Reopen:
        set_handle = HANDLETYPE.UNHANDLE;
        break;
    }
    const sendObj: AttackHandleRecord = {
      isall: false,
      riskinfolist: [props.id],
      set_handle,
      set_note: '',
      filter: {
        handle: props.handleType,
        risk_path: props.selectedKeys,
      },
    };
    //填写批注
    useModal(
      {
        title: t('arcomn.title' + type, [
          props.modelType === MODELTYPE.ATTACK ? t('menu.attack') : t('menu.ngav'),
        ]),
        handleOk: async (conRef) => {
          await conRef.validate();
          return useBatchMark(batchHandleApi, sendObj, conRef, props.reload);
        },
      },
      batchMarks,
    );
  };
</script>

<style scoped lang="less">
  .con {
    display: flex;
    // justify-content: center;
  }
  .tools {
    display: inline-flex;
    align-items: center;
    padding: 2px;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    .btn {
      padding: 2px 10px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      word-break: keep-all;
      cursor: pointer;
      &:hover {
        background-color: #f0f0f0;
      }
    }
    .hasBorder {
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      margin: 4px 0;
    }
    .line {
      width: 1px;
      height: 8px;
      background-color: rgba(0, 0, 0, 0.04);
      margin: 0 2px;
    }
    .hidden {
      display: none;
    }
  }
  .direction {
    border: none;
    flex-direction: column;
    width: 100%;
  }
  .handled {
    .btn {
      cursor: not-allowed;
      background-color: #f0f0f0;
      opacity: 0.7;
    }
  }
</style>

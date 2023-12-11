<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-06-09 15:51:53
 * @LastEditTime: 2023-07-11 16:08:20
-->
<template>
  <a-tooltip placement="left" destroyTooltipOnHide>
    <template v-if="disabled" #title>
      <span>
        {{ online === ONLINESTATUS.OFFLINE ? t('operation.colloff') : t('operation.collserr') }}
      </span>
    </template>
    <a-checkbox :disabled="disabled" name="mode" v-model:checked="isChecked" />
  </a-tooltip>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { I_Check_State, E_Select_Mode } from '../collection/type';
  import { ONLINESTATUS } from '@/enums/assetsType';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    status: I_Check_State;
    checked: boolean;
    host_id: string;
    disabled: boolean;
    online: ONLINESTATUS;
  }>();
  const { t } = useI18n();
  const isChecked = computed({
    get: () => {
      if (!props.disabled) {
        if (props.status.mode === E_Select_Mode.Init) {
          if (props.status.include.indexOf(props.host_id) > -1) {
            return true;
          } else if (props.status.exclude.indexOf(props.host_id) > -1) {
            return false;
          } else {
            return props.checked;
          }
        } else if (props.status.mode === E_Select_Mode.All) {
          if (props.status.exclude.indexOf(props.host_id) > -1) {
            return false;
          } else {
            return true;
          }
        } else {
          if (props.status.include.indexOf(props.host_id) > -1) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return props.checked;
      }
    },
    set: (v) => {
      if (props.status.mode === E_Select_Mode.Init) {
        if (v) {
          const idIndex = props.status.exclude.indexOf(props.host_id);
          if (idIndex > -1) {
            props.status.exclude.splice(idIndex, 1);
          } else {
            props.status.include.push(props.host_id);
          }
        } else {
          const idIndex = props.status.include.indexOf(props.host_id);
          if (idIndex > -1) {
            props.status.include.splice(idIndex, 1);
          } else {
            props.status.exclude.push(props.host_id);
          }
        }
      } else if (props.status.mode === E_Select_Mode.All) {
        if (v) {
          const idIndex = props.status.exclude.indexOf(props.host_id);
          if (idIndex > -1) {
            props.status.exclude.splice(idIndex, 1);
          }
        } else {
          props.status.exclude.push(props.host_id);
        }
      } else {
        if (v) {
          props.status.include.push(props.host_id);
        } else {
          const idIndex = props.status.include.indexOf(props.host_id);
          if (idIndex > -1) {
            props.status.include.splice(idIndex, 1);
          }
        }
      }
    },
  });
</script>

<style scoped></style>

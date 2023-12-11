<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-16 18:37:39
 * @LastEditTime: 2022-07-20 10:14:04
-->
<template>
  <div>
    <a-button
      disabled
      shape="circle"
      v-if="migrate_status === MIGSTATUS.SUCCESS || migrate_status === MIGSTATUS.MANUAL"
      class="disBtn"
    >
      <template #icon>
        <CheckOutlined />
      </template>
    </a-button>
    <a-popconfirm
      v-else
      :title="t('setting.migSure')"
      :ok-text="t('common.confirm')"
      :cancel-text="t('common.cancle')"
      @confirm="handMove"
      placement="left"
    >
      <a-button type="primary" shape="circle">
        <template #icon>
          <CheckOutlined />
        </template>
      </a-button>
    </a-popconfirm>
  </div>
</template>

<script lang="ts" setup>
  import { CheckOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { MIGSTATUS } from '@/enums/pstatus';
  import { migrateSingHost } from '@/api/operation/migrate';

  const props = defineProps({
    migrate_status: Number,
    host_id: String,
    reload: Function,
  });
  const { t } = useI18n();
  const handMove = async () => {
    const { code } = await migrateSingHost({ host_id: props.host_id! });
    if (!code) {
      props.reload!(true);
    }
  };
</script>

<style lang="less" scoped>
  ::v-deep(.ant-btn) {
    width: 16px;
    height: 16px;
    min-width: 16px;
    font-size: 10px;
    text-align: center;
    line-height: 16px;
  }
  .disBtn {
    border: none;
    color: #fff;
    background-color: #eee;
  }
</style>

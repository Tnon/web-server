<template>
  <div class="backup">
    <div class="header">{{ t('setting.backup') }}</div>
    <div class="backupNow">
      <!-- 进度条 start -->
      <a-progress
        class="uploadprogre"
        :strokeWidth="2"
        :showInfo="false"
        strokeColor="#18ba79"
        :percent="uplpadPrg"
        v-if="uplpadPrg !== 0 && uplpadPrg !== 100"
        status="active"
      />
      <!-- 进度条 end -->
      <a-button type="primary" @click="bakDataBase">
        {{ t('setting.backNow') }}
      </a-button>
      <upload-file action="/storage/backup" :accept="'.zip'" @change="uploadBak">
        <a-button type="dashed">{{ t('setting.iptBak') }}</a-button>
      </upload-file>

      <span class="desc" :title="t('setting.backTitle')">
        <a-popover placement="bottom">
          <template #content>{{ t('setting.dbVersion') }}:{{ dbVersion }}</template>
          <InfoCircleOutlined />
        </a-popover>
        {{ t('setting.backTitle') }}
      </span>
      <a-button type="primary" @click="refreshTable" style="float: right">
        {{ t('setting.refreshN') }}
      </a-button>
    </div>
    <slots-table
      ref="tableRef"
      class="dataTable"
      :scroll="{ y: 'calc(100vh - 423px)' }"
      v-model:columns="columns"
      row-key="id"
      :get-list-func="getDataBackupApi"
    />
  </div>
</template>

<script lang="tsx" setup>
  import { onMounted, ref } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { useColumns } from './index';
  import { message } from 'ant-design-vue';
  import uploadFile, { FileInfo } from '@/components/upload-file';
  import { getDataBackupApi, backup_database, getDiskSpace } from '@/api/operation/storage';
  import { useModal } from '@/hooks';
  import { InfoCircleOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  //数据库版本
  const dbVersion = ref('');
  const columns = useColumns(t);
  const tableRef = ref<any>(null);
  //上传进度
  const uplpadPrg = ref<number>(0);
  //立即备份
  const bakDataBase = async () => {
    //获取是否有磁盘空间
    const { confirm_message } = await getDiskSpace();
    useModal(
      {
        title: t('setting.cfmBack'),
        handleOk: async () => {
          await backup_database();
          refreshTable(true);
        },
      },
      <span style="color:#f8a04c">{{ confirm_message }}</span>,
    );
  };
  //导入备份
  const uploadBak = (info: FileInfo & Event) => {
    //百分比
    uplpadPrg.value = Math.floor(info.file.percent as number);
    //上传接口失败
    if (info.file.status === 'error') {
      message.error(t('common.serverError'));
    }
    if (info.file.response) {
      if (info.file.response.code) {
        message.error(info.file.response.msg || t('setting.uploadError'));
      } else {
        message.success(t('setting.uploadSuc'));
        refreshTable(true);
      }
    }
  };
  const refreshTable = (keepPage?: boolean) => {
    tableRef.value.refreshTableData(keepPage);
  };
  //获取数据库版本
  onMounted(async () => {
    const { current_db_version } = await getDiskSpace();
    dbVersion.value = current_db_version;
  });
</script>

<style lang="less" scoped>
  .backup {
    border-radius: 8px;
    background: #fff;
    height: calc(100vh - 203px);
    display: flex;
    flex-direction: column;
    .header {
      padding: 16px 0px;
      font-size: @fz14;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
    }
    .backupNow {
      padding: 0 0px;
      margin-bottom: 12px;
      position: relative;
      button {
        margin-right: 10px;
      }
      .desc {
        font-size: @fz12;
        color: #f8a04c;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        // max-width: 600px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
      }
      .uploadprogre {
        position: absolute;
        bottom: -18px;
        left: 0;
      }
    }
  }
</style>

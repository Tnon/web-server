<template>
  <div class="download">
    <div v-if="!Object.keys(formData).length" class="empty">
      <FrownOutlined class="empicon" />
      <div class="msg">{{ t('download.noPkgInfo') }}</div>
    </div>
    <div v-else>
      <div class="client">
        <div class="logo">
          <img class="cusIcon" :src="osType === 'Windows' ? winPkg : linPkg" alt="" />
          <span class="title">
            {{ t('setting.product_name') }} {{ formData.package_version }}
          </span>
        </div>
        <a-button type="primary" v-if="!isShow && formData.download_https_url">
          <a :href="formData.download_https_url">
            {{ t('download.downForSys', [osType]) }}
          </a>
        </a-button>
      </div>
      <div class="nodes">
        <span class="label">{{ t('common.agentVersion') + ':' }}</span>
        <span class="value">{{ formData.agent_version }}</span>
      </div>
      <div class="nodes" v-if="isShow">
        <span class="label">{{ t('download.driVer') + ':' }}</span>
        <span class="value">{{ formData.driver_version }}</span>
      </div>
      <div class="nodes">
        <span class="label">{{ t('common.updateTime') + ':' }}</span>
        <span class="value">{{ formData.created_at }}</span>
      </div>
      <div class="nodes">
        <span class="label">{{ t('download.insSize') }}:</span>
        <span class="value">{{ formData.package_size }}</span>
      </div>
      <div class="nodes">
        <span class="label">{{ t('operation.fudip') }}</span>
        <span class="value">
          {{ formData.server_proxy_ip }}
          <a-button
            size="small"
            class="btn"
            v-if="isLogin"
            @click="editclientIp(formData.server_proxy_ip)"
          >
            {{ t('common.edit') }}
          </a-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import winPkg from '@/assets/images/win_pkg.png';
  import linPkg from '@/assets/images/lin_pkg.png';
  import { FrownOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { useModal } from '@/hooks';
  import editClientIp from '../editClientIp';
  import { saveClientIpApi } from '@/api/operation/upgrade';
  import { useUserToken } from '@/store/modules/user';

  const props = defineProps({
    osType: {
      type: String,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      required: true,
    },
    getPackageVersions: Function,
  });
  const { t } = useI18n();

  const userTokenStore = useUserToken();
  const isLogin = computed(() => userTokenStore.isLogin);

  const editclientIp = (ip) => {
    useModal(
      {
        title: t('common.edit') + t('operation.fudip'),
        contentProps: {
          server_ip: ip,
        },
        handleOk: async (conRef) => {
          await conRef.validate();
          const { code } = await saveClientIpApi(
            {
              server_ip: conRef.server_ip,
            },
            '/api/admin/config/set_to_server_ip',
          );
          if (code) {
            return Promise.reject();
          } else {
            props.getPackageVersions!();
          }
        },
      },
      editClientIp,
    );
  };
</script>

<style lang="less" scoped>
  .download {
    //屏蔽windows
    // width: 560px;
    background: #f8f8f8;
    padding: 24px;
    border-radius: 8px;
    margin: 16px 0 24px;
    .client {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      .logo {
        display: flex;
        align-items: center;
        .cusIcon {
          border-radius: 8px;
          margin-right: 16px;
          width: 64px;
          height: 64px;
        }
      }
    }
    .nodes {
      display: flex;
      margin: 16px 0;
      color: rgba(0, 0, 0, 0.6);
      .label {
        min-width: 110px;
        color: rgba(0, 0, 0, 0.9);
      }
      .value {
        word-break: break-word;
        display: flex;
        align-items: center;
        .btn {
          margin-left: 16px;
        }
      }
    }
  }
  .empty {
    height: 194px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .empicon {
      font-size: @fz30;
      color: rgba(0, 0, 0, 0.3);
      margin-bottom: 10px;
    }
    .msg {
      color: rgba(0, 0, 0, 0.3);
    }
  }
</style>

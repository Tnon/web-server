<template>
  <div class="SysLog">
    <!-- 总开关 start -->
    <div class="logSwitch">
      <div class="headertitle">{{ t('operation.tygl') }}</div>
    </div>
    <!-- 总开关 end -->

    <div class="flex">
      <div class="left">
        <!-- 左侧图标 start -->
        <div class="iconP">
          <custom-icon class="licon" type="#ax-wh-syslog" />
        </div>
        <!-- 左侧图标 end -->
        <!-- 标题和端口ip协议 start -->
        <div>
          <div class="title">{{ t('operation.serverAd') }}</div>
          <div class="subtitle">
            <!-- 未安装 start -->
            <template v-if="win_state === E_Win_State.None">
              {{ t('operation.waz') }}
            </template>
            <!-- 未安装 end -->
            <!-- 已安装 start -->
            <template v-if="win_state === E_Win_State.Active">
              {{ t('operation.yjh') }}
            </template>
            <!-- 已安装 end -->
            <!-- 未安装 start -->
            <template v-if="win_state === E_Win_State.NotActive">
              {{ t('operation.wjh') }}
            </template>
            <!-- 未安装 start -->
          </div>
        </div>
        <!-- 标题和端口ip协议 end -->
      </div>
      <!-- 激活操作 start -->
      <div class="right">
        <template v-if="win_state !== E_Win_State.None">
          <a-button
            :type="win_state === E_Win_State.Active ? 'danger' : 'primary'"
            @click="openSyslogSet"
          >
            {{ win_state === E_Win_State.Active ? t('operation.tzjh') : t('operation.ljjh') }}
          </a-button>
        </template>
      </div>
      <!-- 激活操作 end -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { useModal, useValidatePwd } from '@/hooks';
  import { useProductLogo } from '@/store/modules/product-logo';
  import { computed, createVNode } from 'vue';
  import { E_Win_State } from '@/store/modules/product-logo/type';
  import { pwdConfirm } from '@/components/pwdConfirm';
  import { activeWin } from '@/api/operation/server';
  const { t } = useI18n();
  const productLogoStore = useProductLogo();
  const win_state = computed(() => productLogoStore.win_state);
  //刷新windows激活状态
  const refreshWinStata = () => {
    productLogoStore.GetProductLogoVersion();
  };
  //激活设置
  const openSyslogSet = () => {
    if (win_state.value === E_Win_State.Active) {
      //删除确认
      useModal(
        {
          title: t('operation.tzjh'),
          contentProps: {
            labelText: t('operation.tzjhmsg'),
          },
          handleOk: async (conRef) => {
            await conRef.validate();
            return useValidatePwd(
              activeWin,
              { url: '/api/admin/deactivate' },
              conRef,
              refreshWinStata,
            );
          },
        },
        pwdConfirm,
      );
    } else {
      // 激活
      useModal(
        {
          title: t('operation.ljjh'),
          handleOk: async () => {
            const { code } = await activeWin({ url: '/api/admin/activate' });
            !code && refreshWinStata();
          },
        },
        createVNode('span', null, t('operation.jhmsg')),
      );
    }
  };
</script>

<style lang="less" scoped>
  .SysLog {
    position: relative;
    padding: 0 16px;
    .logSwitch {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      line-height: 56px;
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      .headertitle {
        font-size: @fz14;
        font-weight: 500;
      }
    }
    .flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      margin-bottom: 24px;
      padding: 24px;
      .left {
        display: flex;
        align-items: center;
        .iconP {
          background-color: @primary-color;
          border-radius: 8px;
          margin-right: 16px;
          text-align: center;
          padding: 10px;
          .licon {
            font-size: 40px !important;
            color: #fff;
          }
        }
        .title {
          font-size: 16px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
          margin-bottom: 8px;
        }
        .subtitle {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.7);
        }
      }
      .right {
        display: flex;
        align-items: center;
        .swtc {
          margin-left: 16px;
          transform: scale(1.2);
        }
      }
    }
    .dataTypeContainer {
      .dataType {
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        margin-bottom: 16px;
        padding: 16px 24px;
        display: flex;
        align-items: flex-start;
        .iclp {
          padding: 8px;
          border-radius: 8px;
          background: rgba(24, 186, 121, 0.1);
          margin-right: 16px;
          .iclpicon {
            font-size: 16px !important;
            color: @primary-color;
          }
        }
        .rightOption {
          flex: 1;
          .labelSwt {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 6px;
            .label {
              font-size: 14px;
              font-weight: 600;
              line-height: 24px;

              color: rgba(0, 0, 0, 0.8);
            }
          }
          .line {
            width: 100%;
            height: 1px;
            background-color: #eee;
            margin: 20px 0;
          }
          .bottomS {
            .selectS {
              width: 120px;
            }
            .sync {
              margin-left: 16px;
            }
          }
        }
      }
    }
    .data_title {
      font-size: 14px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 16px;
    }
  }
</style>

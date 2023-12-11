<template>
  <div class="SysLog">
    <!-- 总开关 start -->
    <div class="logSwitch">
      <div class="headertitle">{{ t('operation.basicsSyslog') }}</div>
      <!-- 保存并执行 start -->
      <div class="btn">
        <a-button type="primary" @click="submit" :disabled="!fields.ip" :loading="saveloading">
          {{ t('common.savezx') }}
        </a-button>
      </div>
      <!-- 保存并执行 end -->
    </div>
    <!-- 总开关 end -->

    <!-- 参数配置 start -->
    <div class="flex">
      <div class="left">
        <!-- 左侧图标 start -->
        <div class="iconP">
          <custom-icon class="licon" type="#ax-wh-syslog" />
        </div>
        <!-- 左侧图标 end -->
        <!-- 标题和端口ip协议 start -->
        <div>
          <div class="title">Syslog</div>
          <div class="subtitle" v-if="fields.ip">
            <span>{{ fields.ip + ':' + fields.port }}</span>
            <span>（{{ t('setting.agmY') + ':' + fields.protocol }}）</span>
          </div>
        </div>
        <!-- 标题和端口ip协议 end -->
      </div>
      <!-- 参数配置和开关 start -->
      <div class="right">
        <a-button type="text" @click="openSyslogSet" :disabled="!agms.enabled">
          <template #icon>
            <SettingOutlined />
          </template>
          {{ t('setting.paraCfg') }}
        </a-button>
        <a-switch class="swtc" v-model:checked="agms.enabled" />
      </div>
      <!-- 参数配置和开关 end -->
    </div>
    <!-- 参数配置 end -->
    <div class="data_title">{{ t('setting.dateCat') }}</div>
    <!-- 数据类别 start -->
    <div class="dataTypeContainer">
      <template v-for="item in dataType" :key="item.dataIndex">
        <template v-if="acdr_enabled || item.dataIndex !== 'risk'">
          <div class="dataType">
            <!-- 左侧图标 start -->
            <div class="iclp">
              <custom-icon class="iclpicon" :type="item.icon" />
            </div>
            <!-- 左侧图标 end -->
            <div class="rightOption">
              <!-- label和开关 start -->
              <div class="labelSwt">
                <span class="label">{{ item.title }}</span>
                <a-switch v-model:checked="agms[item.dataIndex]" :disabled="!agms.enabled" />
              </div>
              <!-- label和开关 start -->
              <div class="line" v-if="agms[item.dataIndex]"></div>
              <!-- 同步周期配置 start -->
              <div class="bottomS" v-if="agms[item.dataIndex]">
                <span>{{ t('setting.assCycle') }}：</span>
                <span v-if="item.dataIndex === 'asset'">
                  <a-select
                    v-model:value="agms.asset_interval"
                    class="selectS"
                    :options="roundOptions"
                  />
                  <a-button :loading="syncLoading" class="sync" @click="syncAsset">
                    {{ t('setting.sdljtb') }}
                  </a-button>
                </span>
                <span v-else>{{ t('setting.evetime') }}</span>
              </div>
              <!-- 同步周期配置 end -->
            </div>
          </div>
        </template>
      </template>
    </div>
    <!-- 数据类别 end -->
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, unref, watch } from 'vue';
  import slotsFormCmp from '@/components/slots-form';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import { useFormItems, useDataType, useRoundOptions } from './index';
  import { getSyslogApi, updateSyslogApi, syncAssetApi } from '@/api/operation/syslog';
  import { useI18n } from 'vue-i18n';
  import { useProductLogo } from '@/store/modules/product-logo';
  import { useModal } from '@/hooks';
  import { cloneDeep } from 'lodash';
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
  const { t } = useI18n();
  const formItems = useFormItems(t);
  const dataType = useDataType(t);
  const roundOptions = useRoundOptions(t);
  //交互
  const saveloading = ref<boolean>(false);
  const syncLoading = ref<boolean>(false);

  //参数配置表单
  const fields = reactive<{
    ip: string;
    port: string;
    protocol: undefined | string;
  }>({
    ip: '', //ip
    port: '', // 端口
    protocol: undefined, // 协议
  });
  // 数据类别结构体
  const agms = reactive({
    enabled: false, // 总开关
    attack: false, // 攻击开关
    risk: false, // 风险开关
    behavior: false, // 行为日志开关
    asset: false, // 资产开关
    asset_interval: 30,
  });
  //保存按钮
  const submit = async () => {
    saveloading.value = true;
    await updateSyslogApi(Object.assign({}, agms, fields) as any);
    saveloading.value = false;
  };

  // 获取syslog信息
  const getSyslog = async () => {
    const syslog = await getSyslogApi();
    if (syslog) {
      for (const key in agms) {
        if (key === 'asset_interval' && !syslog[key]) {
          syslog[key] = 30;
        }
        agms[key] = syslog[key];
      }
      for (const key in fields) {
        fields[key] = syslog[key];
      }
    }
  };
  getSyslog();
  //打开syslog设置
  const openSyslogSet = () => {
    useModal(
      {
        title: t('setting.paraCfg'),
        contentProps: {
          colsMap: formItems,
          fields: reactive(cloneDeep(fields)),
          disabled: !agms.enabled,
        },
        handleOk: async (contRef) => {
          await contRef.validate();
          Object.assign(fields, unref(contRef).fields);
        },
      },
      slotsFormCmp,
    );
  };

  // 监听总开关变化，如果关闭则重置表单
  watch(
    () => agms.enabled,
    (v) => {
      if (!v) {
        //协议默认成udp
        fields.protocol = 'udp';
        agms.attack = false;
        agms.risk = false;
        agms.behavior = false;
        agms.asset = false;
        agms.asset_interval = 30;
      }
    },
  );
  //手动立即同步
  const syncAsset = async () => {
    syncLoading.value = true;
    await syncAssetApi();
    syncLoading.value = false;
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

<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-18 16:47:24
 * @LastEditTime: 2023-08-16 16:29:08
-->

<template>
  <div class="scanConfig">
    <a-form layout="vertical">
      <!-- 主机范围 start -->
      <a-form-item v-bind="validateInfos.apply_type">
        <div class="label">{{ t('operation.fqzjfw') }}</div>
        <a-select
          :placeholder="t('reinforce.zjfwplac')"
          optionFilterProp="label"
          allowClear
          v-model:value="formData.apply_type"
          :options="apply_typeOptions"
        />
      </a-form-item>
      <!-- 主机范围 end -->

      <!-- 主机组中选择 start -->
      <a-form-item
        v-bind="validateInfos.host_group"
        v-if="formData.apply_type === E_Host_Range.Group"
      >
        <hostGroupSelect
          :placeholder="t('reinforce.qksngs')"
          v-model:selectedGroupIds="formData.host_group"
          :multiple="true"
        />
      </a-form-item>
      <!-- 主机组中选择 end -->

      <!-- 主机中选择 start -->
      <a-form-item
        v-bind="validateInfos.host_list"
        v-if="formData.apply_type === E_Host_Range.Host"
      >
        <hostSelect v-model:selectedMacs="formData.host_list" />
      </a-form-item>
      <!-- 主机中选择 end -->

      <!-- 扫描网段 start -->
      <a-form-item v-bind="validateInfos.scan_address">
        <div class="label">{{ t('operation.smwd') }}</div>
        <a-popover placement="left">
          <template #content>
            <div class="toolTips">
              {{ t('operation.scaniptips') }}
            </div>
          </template>
          <a-input
            type="text"
            v-model:value.trim="formData.scan_address"
            :placeholder="t('operation.smwdplac')"
          />
        </a-popover>
      </a-form-item>
      <!-- 扫描网段 end -->

      <a-button type="primary" class="scanBtn" @click="startScan">
        {{ t('operation.kssm') }}
      </a-button>
      <!-- 扫描设置 start -->
      <a-button type="text" @click="scanConfig" class="scanCfgBtn">
        <template #icon>
          <SettingOutlined />
        </template>
        {{ t('operation.smsz') }}
      </a-button>
      <!-- 扫描设置 end -->

      <div class="configdetail" v-if="configShow">
        <!-- ARP start -->
        <a-form-item class="node">
          <a-checkbox v-model:checked="formData.arp">
            {{ t('operation.arphc') }}
          </a-checkbox>
        </a-form-item>
        <!-- ARP end -->

        <!-- PING start -->
        <a-form-item class="node">
          <a-checkbox v-model:checked="formData.ping">
            {{ t('operation.pingfs') }}
          </a-checkbox>
        </a-form-item>
        <!-- PING end -->

        <div class="node">
          <!-- Nmap start -->
          <a-form-item class="node nodeNb">
            <a-checkbox v-model:checked="formData.nmap" @change="changeNTU($event, 'nmap')">
              {{ t('operation.nmapfs') }}
            </a-checkbox>
          </a-form-item>
          <!-- Nmap end -->

          <template v-if="formData.nmap">
            <!-- Tcp start -->
            <a-form-item class="nmitem tcpupd">
              <a-popover placement="topLeft">
                <template #content>
                  <div class="toolTips">
                    {{ t('operation.porttips') }}
                  </div>
                </template>
                <a-checkbox v-model:checked="formData.tcp" @change="changeNTU($event, 'tcp')">
                  {{ t('operation.tcpxy') }}
                </a-checkbox>
              </a-popover>
            </a-form-item>
            <!-- Tcp end -->
            <!-- Tcp value start -->
            <a-form-item v-bind="validateInfos.tcp_value" class="nmitem">
              <a-input
                type="text"
                :placeholder="t('operation.mrtcp')"
                v-model:value.trim="formData.tcp_value"
              />
            </a-form-item>
            <!-- Tcp value end -->

            <!-- udp start -->
            <a-form-item class="nmitem tcpupd">
              <a-popover placement="topLeft">
                <template #content>
                  <div class="toolTips">
                    {{ t('operation.porttips') }}
                  </div>
                </template>
                <a-checkbox v-model:checked="formData.udp" @change="changeNTU($event, 'udp')">
                  {{ t('operation.udpxy') }}
                </a-checkbox>
              </a-popover>
            </a-form-item>
            <!-- udp end -->
            <!-- udp value start -->
            <a-form-item v-bind="validateInfos.udp_value" class="nmitem">
              <a-input
                type="text"
                :placeholder="t('operation.mrudp')"
                v-model:value.trim="formData.udp_value"
              />
            </a-form-item>
            <!-- udp value end -->
          </template>
        </div>

        <div class="line"></div>

        <!-- 获取操作系统 start -->
        <a-form-item class="node">
          <a-popover
            placement="topLeft"
            :overlayClassName="formData.system ? 'showContent' : 'hideContent'"
          >
            <template #content>
              <div class="toolTips">
                {{ t('operation.systips') }}
              </div>
            </template>
            <a-checkbox v-model:checked="formData.system">
              {{ t('operation.syshq') }}
            </a-checkbox>
          </a-popover>
        </a-form-item>
        <!-- 获取操作系统 end -->

        <div class="row">
          <!-- 并发扫描最大数量 start -->
          <a-form-item class="rownode" v-bind="validateInfos.scan_count">
            <template #label>
              <span class="label">{{ t('operation.bishl') }}</span>
            </template>
            <a-input-number
              class="ipnum"
              v-model:value="formData.scan_count"
              :placeholder="t('common.range', ['1-500'])"
            />
          </a-form-item>
          <!-- 并发扫描最大数量 end -->

          <!-- 每秒最大发包数 start -->
          <a-form-item class="rownode" v-bind="validateInfos.package_count">
            <template #label>
              <span class="label">{{ t('operation.mefss') }}</span>
            </template>
            <a-input-number
              class="ipnum"
              v-model:value="formData.package_count"
              :placeholder="t('common.range', ['1-2000'])"
            />
          </a-form-item>
          <!-- 每秒最大发包数 end -->
        </div>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { Form } from 'ant-design-vue';
  import { reactive, computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useStaticOptions } from '@/views/reinforce/file/views/rule/cmts/advanSearch/datasource';
  import { I_Form_Data } from './type';
  import hostGroupSelect from '@/components/host-group-select';
  import hostSelect from '@/components/hostSelect';
  import { E_Host_Range } from '@/views/reinforce/baseline/cmts/tableContent/type';
  import { validaAddress, validatePorts } from '.';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import { scanHostApi } from '@/api/operation/notice';
  defineProps<{
    visiable: boolean;
  }>();
  const emit = defineEmits(['update:visiable', 'refreshStatus']);
  //获取数据
  const formData = reactive<I_Form_Data>({
    apply_type: undefined, // 应用维度: 1: 全部主机; 2: 分组; 3: 主机
    host_group: '', // 分组ID列表
    host_list: [], // 主机mac列表
    scan_address: '',
    arp: true,
    ping: true,
    nmap: false,
    system: false,
    tcp: false,
    udp: false,
    tcp_value: '80',
    udp_value: '40125',
    scan_count: 100,
    package_count: 500,
  });
  const { t } = useI18n();
  //表单默认隐藏
  const configShow = ref(false);
  const { apply_typeOptions } = useStaticOptions(t);

  const host_groupRequiredCmp = computed(() => formData.apply_type === E_Host_Range.Group);
  const host_listRequiredCmp = computed(() => formData.apply_type === E_Host_Range.Host);

  const tcp_valueRequiredCom = computed(() => formData.tcp);
  const udp_valueRequiredCom = computed(() => formData.udp);

  //动态正则初始化
  const rulesRef = reactive({
    apply_type: [
      {
        required: true,
        message: t('reinforce.zjfwplac'),
      },
    ],
    host_group: [
      {
        required: host_groupRequiredCmp,
        message: t('reinforce.qksngs'),
      },
    ],

    host_list: [
      {
        required: host_listRequiredCmp,
        message: t('reinforce.hstplac'),
      },
    ],
    scan_address: [
      {
        validator: validaAddress(t),
      },
    ],
    tcp_value: [
      {
        required: tcp_valueRequiredCom,
        message: t('operation.tcppbt'),
      },
      {
        validator: validatePorts,
        message: t('operation.tcppbtcr'),
      },
    ],
    udp_value: [
      {
        required: udp_valueRequiredCom,
        message: t('operation.tcppbt'),
      },
      {
        validator: validatePorts,
        message: t('operation.tcppbtcr'),
      },
    ],
    scan_count: [
      {
        required: true,
        min: 1,
        max: 500,
        type: 'number',
        message: t('operation.sccsfp'),
      },
    ],
    package_count: [
      {
        required: true,
        min: 1,
        max: 2000,
        type: 'number',
        message: t('operation.vdkg'),
      },
    ],
  });
  //表单hook
  const useForm = Form.useForm;

  const { validate, validateInfos } = useForm(formData, rulesRef);
  //开始扫描
  const startScan = async () => {
    try {
      await validate();
      const { code } = await scanHostApi(formData);
      if (!code) {
        emit('update:visiable', false);
        emit('refreshStatus');
      }
    } catch {}
  };

  //扫描设置
  const scanConfig = () => {
    configShow.value = !configShow.value;
  };

  //联动监听
  const changeNTU = (v, type) => {
    const checked = v.target.checked;
    if (type === 'nmap') {
      formData.tcp = checked;
      formData.udp = checked;
    } else {
      validate(type + '_value');
      if (checked) {
        formData.nmap = true;
      } else {
        if (!formData.udp && !formData.tcp) {
          formData.nmap = false;
        }
      }
    }
  };
  // watch(
  //   () => formData.nmap,
  //   (v) => {
  //     formData.tcp = v;
  //     formData.udp = v;
  //   },
  // );
  // watch([() => formData.tcp, () => formData.udp], () => {
  //   if (!formData.udp && !formData.tcp) {
  //     formData.nmap = false;
  //   } else if (formData.udp && formData.tcp) {
  //     formData.nmap = true;
  //   } else {
  //     formData.nmap = true;
  //   }
  // });
</script>

<style scoped lang="less">
  .scanConfig {
    position: absolute;
    width: 320px;
    height: calc(100% - 48px);
    border-left: 1px solid #eee;
    background-color: #fff;
    overflow: auto;
    top: 49px;
    right: -320px;
    transition: all 0.3s;
    padding: 16px;

    .label {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 8px;
    }
    :deep(.ant-input) {
      border-radius: 8px;
    }
    .scanBtn {
      width: 100%;
    }
    .scanCfgBtn {
      margin: 16px 0;
    }
    .configdetail {
      .node {
        border: 1px solid #eee;
        border-radius: 8px;
        margin-bottom: 8px;
        :deep(.ant-checkbox-wrapper) {
          width: 100%;
          padding: 12px 16px;
        }
      }
      .nodeNb {
        border: none;
        margin-bottom: 0px;
      }
      .nodeb {
        padding-bottom: 12px;
      }
      .tcpupd {
        margin-bottom: 4px;
      }
      .nmitem {
        padding-left: 40px;
        :deep(.ant-checkbox-wrapper) {
          width: 100%;
          padding: 0px;
        }
        :deep(.ant-input) {
          width: 200px;
        }
      }
      .line {
        margin: 16px 0;
        width: 100%;
        height: 1px;
        background-color: #eee;
      }
      .row {
        display: flex;
        align-items: center;
        margin-top: 16px;
        .rownode {
          flex: 1;
          :deep(.ant-input-number) {
            width: 100%;
          }
          &:nth-child(1) {
            margin-right: 8px;
          }
          &:nth-child(2) {
            margin-left: 8px;
          }
        }
      }
    }
  }
  .show {
    right: 0;
  }
  .toolTips {
    white-space: pre-line;
  }
</style>

<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-21 12:03:00
 * @LastEditTime: 2023-10-27 13:44:37
-->
<template>
  <a-form autocomplete="off" class="formContent" layout="vertical">
    <a-collapse ghost class="selfColl" expandIconPosition="end">
      <a-collapse-panel>
        <template #header>
          <div class="more">
            <setting-outlined />
            <div class="labels"> {{ t('operation.gjsz') }}</div>
          </div>
        </template>
        <a-form-item v-bind="validateInfos.connect_type" name="connect_type">
          <span class="labelCs">{{ t('operation.zjljfs') }}</span>
          <!-- 主机连接方式 start -->
          <a-radio-group v-model:value="modalState.connect_type" @change="changeContectType">
            <a-radio :value="1">{{ t('operation.zlzj') }}</a-radio>
            <a-radio :value="2">{{ t('operation.dlzj') }}</a-radio>
          </a-radio-group>
          <!-- 主机连接方式 end -->
        </a-form-item>

        <!-- <div class="text">{{ t('operation.scck5') }}</div> -->
        <div class="item" v-if="modalState.connect_type === 2">
          <a-form-item name="proxy_address" v-bind="validateInfos.proxy_address">
            <template #label>
              <div class="label">{{ t('operation.dldz') }}</div>
            </template>
            <!-- 代理地址 start -->
            <a-input
              class="ipt iptt"
              v-model:value="modalState.proxy_address"
              :placeholder="t('operation.dldzplac')"
            />
            <!-- 代理地址 end -->
          </a-form-item>
          <a-form-item class="midItem" name="proxy_username" v-bind="validateInfos.proxy_username">
            <template #label>
              <div class="label">{{ t('user.name') }}</div>
            </template>
            <!-- 用户名 start -->
            <a-input
              class="ipt iptt"
              v-model:value="modalState.proxy_username"
              :placeholder="t('user.pIptName')"
            />
            <!-- 用户名 end -->
          </a-form-item>

          <a-form-item name="proxy_password" v-bind="validateInfos.proxy_password">
            <template #label>
              <div class="label">{{ t('common.password') }}</div>
            </template>
            <!-- 密码 start -->
            <a-input
              class="ipt iptt"
              type="password"
              v-model:value="modalState.proxy_password"
              :placeholder="t('user.piptPwd')"
            />
            <!-- 密码 end -->
          </a-form-item>
        </div>
        <div class="item">
          <a-form-item class="nodes" name="server_ip" v-bind="validateInfos.server_ip">
            <template #label>
              <div class="label">{{ t('operation.fudip') }}</div>
            </template>
            <div class="item">
              <!-- 服务端IP start -->
              <a-input
                class="ipt"
                :disabled="!isEditing.server_ip"
                v-model:value="modalState.server_ip"
                :placeholder="t('operation.fudippacl')"
              />
              <!-- 服务端IP end -->
              <a-button class="btn edit" @click="saveClientIp('server_ip')">
                {{ isEditing.server_ip ? t('common.save') : t('common.edit') }}
              </a-button>
            </div>
          </a-form-item>
          <!-- 安装目录 start -->
          <a-form-item class="nodes" name="install_path" v-bind="validateInfos.install_path">
            <template #label>
              <div class="label">{{ t('setting.azml') }}</div>
            </template>
            <div class="item">
              <a-input
                class="ipt"
                :disabled="!isEditing.install_path"
                v-model:value.trim="modalState.install_path"
                :placeholder="t('setting.fudippacl')"
              />
              <a-button class="btn edit" @click="saveClientIp('install_path')">
                {{ isEditing.install_path ? t('common.save') : t('common.edit') }}
              </a-button>
            </div>
          </a-form-item>
          <!-- 安装目录 end -->
        </div>

        <div class="item">
          <!-- CPU使用上限 (%) start -->
          <a-form-item class="nodes" v-bind="validateInfos.cpu" name="cpu">
            <template #label>
              <div class="label">{{ t('operation.cpusx') }}</div>
            </template>
            <a-input-number
              class="iptNum"
              :precision="0"
              v-model:value="modalState.cpu"
              :placeholder="t('operation.range', ['3%', '50%'])"
            />
          </a-form-item>
          <!-- CPU使用上限 (%) end -->

          <!-- 内存使用上限 (MB) start -->
          <a-form-item class="nodes" v-bind="validateInfos.memory" name="memory">
            <template #label>
              <div class="label">{{ t('operation.ncsx') }}</div>
            </template>
            <a-input-number
              class="iptNum"
              :precision="0"
              v-model:value="modalState.memory"
              :placeholder="t('operation.range', ['400M', '1024M'])"
            />
          </a-form-item>
        </div>
        <!-- 内存使用上限 (MB) end -->
      </a-collapse-panel>
    </a-collapse>

    <a-form-item name="grouplist" v-bind="validateInfos.grouplist">
      <template #label>
        <div class="label">{{ t('common.selectGroup') }}</div>
      </template>
      <div class="rows">
        <!-- 分组 start -->
        <hostGroupSelect
          v-model:selectedGroupIds="modalState.grouplist"
          :placeholder="t('common.psecGrp')"
          :multiple="false"
        />
        <a-button class="btn" type="primary" @click="makeInstall">
          {{ t('operation.gencmd') }}
        </a-button>
        <!-- 分组 end -->
      </div>
    </a-form-item>
    <div class="tips">
      {{ t('operation.cmdtips') }}
    </div>
    <a-form-item>
      <!-- <a-button class="btn" :disabled="!!!commandStr.length" @click="copyCommand">
        {{ t('operation.copycmd') }}
      </a-button> -->
      <div class="copyItem">
        <div class="cmdCopy">
          <a-textarea
            :rows="5"
            placeholder="wget"
            :bordered="false"
            v-model:value="commandStrWget"
          />
          <a-button
            type="text"
            class="btn"
            :disabled="!!!commandStrWget.length"
            @click="copyCommand('wget')"
          >
            <template #icon>
              <copy-outlined />
            </template>
          </a-button>
        </div>
        <div class="cmdCopy">
          <a-textarea
            :bordered="false"
            placeholder="curl"
            :rows="5"
            v-model:value="commandStrCurl"
          />
          <a-button
            type="text"
            class="btn"
            :disabled="!!!commandStrCurl.length"
            @click="copyCommand('curl')"
          >
            <template #icon>
              <copy-outlined />
            </template>
          </a-button>
        </div>
      </div>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref, unref } from 'vue';
  import hostGroupSelect from '@/components/host-group-select';
  import { message } from 'ant-design-vue';
  import { makeInstallCmd, saveClientIpApi, getClientIpApi } from '@/api/operation/upgrade';
  import useClipboard from 'vue-clipboard3';
  import { useI18n } from 'vue-i18n';
  import { OSTYPE } from '@/enums/assetsType';
  import { Form } from 'ant-design-vue';
  import { SettingOutlined, CopyOutlined } from '@ant-design/icons-vue';
  import { validateAgtAddress, validateIpPort, validateUsername, validatePath } from '.';

  const { t } = useI18n();

  // const isEditingIP = ref(false);
  // const isEditingPATH = ref(false);
  const isEditing = reactive({
    server_ip: false,
    install_path: false,
  });
  const useForm = Form.useForm;

  const modalState = reactive({
    //直接or代理
    connect_type: 1,
    //代理地址
    proxy_address: '',
    //用户名
    proxy_username: '',
    //密码
    proxy_password: '',
    //服务端ip
    server_ip: '',
    //主机组
    grouplist: undefined,
    //安装目录
    install_path: '/usr/local/',
    //cpu
    cpu: 5,
    //内存
    memory: 500,
  });

  const addressRequired = computed(() => modalState.connect_type === 2);

  const ruleState = reactive({
    // connect_type: [
    //   {
    //     required: false,
    //   },
    // ],

    proxy_address: [
      {
        required: addressRequired,
        message: t('operation.pincre', [t('operation.dldz')]),
      },
      {
        validator: validateAgtAddress,
        message: t('operation.pincre', [t('operation.dldz')]),
      },
    ],
    proxy_username: [
      {
        validator: validateUsername,
        message: t('operation.pincre', [t('user.name')]),
      },
    ],
    server_ip: [
      {
        required: true,
        message: t('operation.pincre', [t('operation.fudip')]),
      },
      {
        validator: validateIpPort,
        message: t('operation.pincre', [t('operation.fudip')]),
      },
    ],
    grouplist: [
      {
        required: true,
        message: t('common.psecGrp'),
      },
    ],
    install_path: [
      {
        required: true,
        message: t('setting.ansjggs'),
      },
      {
        validator: validatePath(t),
        // message: t('setting.skjg'),
      },
    ],
    cpu: [
      {
        required: true,
        type: 'number',
        min: 3,
        max: 50,
        message: t('operation.cpumax'),
      },
    ],
    memory: [
      {
        required: true,
        type: 'number',
        min: 400,
        max: 1024,
        message: t('operation.memmax'),
      },
    ],
  });
  const { validate, validateInfos } = useForm(modalState, ruleState, {
    validateOnRuleChange: true,
  });

  //复制
  const { toClipboard } = useClipboard();
  //命令
  const commandStrCurl = ref<string>('');
  const commandStrWget = ref<string>('');
  //改变连接方式 正则改变
  const changeContectType = () => {
    // ruleState.proxy_address[0].required = modalState.connect_type === 2;
    ruleState.proxy_address[0].required = false;
  };
  // 屏蔽windows
  const activedType = ref<OSTYPE | undefined>(OSTYPE.LINUX);
  //生成命令
  const makeInstall = async () => {
    try {
      await validate();
      const { command_wget, command_curl } = await makeInstallCmd({
        osver: unref(activedType),
        group_id: unref(modalState.grouplist)!,
        install_path: unref(modalState.install_path)!,
        cpu: unref(modalState.cpu)!,
        memory: unref(modalState.memory)!,
        //直接or代理
        connect_type: unref(modalState.connect_type)!,
        //代理地址
        proxy_address: unref(modalState.proxy_address)!,
        //用户名
        proxy_username: unref(modalState.proxy_username)!,
        //密码
        proxy_password: unref(modalState.proxy_password)!,
      });
      commandStrCurl.value = command_curl ?? '';
      commandStrWget.value = command_wget ?? '';
    } catch {}
  };
  //复制命令
  const copyCommand = async (type) => {
    try {
      await toClipboard(type === 'wget' ? commandStrWget.value : commandStrCurl.value);
      message.success(t('operation.copClid'));
    } catch (e) {}
  };
  //保存ip
  const saveClientIp = async (type) => {
    if (isEditing[type]) {
      try {
        await validate([type]);
        const { code } = await saveClientIpApi(
          {
            [type]: modalState[type],
          },
          type === 'server_ip'
            ? '/api/admin/config/set_to_server_ip'
            : '/api/admin/config/set_to_install_path',
        );
        if (!code) {
          isEditing[type] = false;
        }
      } catch {}
    } else {
      isEditing[type] = true;
    }
  };
  //获取ip
  const getClientIp = async () => {
    const { server_ip } = await getClientIpApi('/api/admin/config/set_to_server_ip');
    modalState.server_ip = server_ip;
    const { install_path } = await getClientIpApi('/api/admin/config/set_to_install_path');
    modalState.install_path = install_path ? install_path : '/usr/local/';
  };
  getClientIp();
</script>
<style lang="less" scoped>
  .formContent {
    padding: 0 16px;
    :deep(.ant-collapse-content-box) {
      padding: 8px 36px !important;
    }
    .labelCs {
      font-size: @fz13;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-right: 24px;
    }
    .item {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .nodes {
        flex: 1;
        .iptNum {
          width: 100%;
          border-radius: 8px;
          :deep(.ant-input-number-handler-wrap) {
            border-radius: 0 8px 8px 0;
          }
        }
        &:nth-child(1) {
          margin-right: 8px;
        }
        &:nth-child(2) {
          margin-left: 8px;
        }
      }
      .btn {
        margin: 0;
        margin-left: 4px;
      }
    }
    // .btn {
    //   margin-right: 16px;
    //   margin-bottom: 16px;
    // }
    .label {
      font-size: @fz13;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
    }
  }
  .node {
    display: flex;
    align-items: baseline;
    padding-bottom: 30px;
    .label {
      margin-right: 20px;
      position: relative;
      text-align: right;
      flex: 6 0 0;
    }
    .contet {
      flex: 18 0 0;
    }
  }
  .text {
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 24px;
  }
  .ipt {
    border-radius: 8px;
    width: 210px;
  }
  .iptt {
    width: 184px;
  }
  .more {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.6);
    .labels {
      margin-left: 8px;
    }
  }
  .selfColl {
    background: #f8f8f8;
    margin: 0 -20px;
    margin-bottom: 25px;
  }
  .rows {
    display: flex;
    align-items: center;
    .btn {
      margin-left: 16px;
    }
  }
  .cmdCopy {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    border: 1px solid #eee;
    position: relative;
    flex: 1;
    border-radius: 8px;
    :deep(textarea.ant-input) {
      padding-right: 30px;
    }
    .btn {
      position: absolute;
      right: 0;
    }
    &:nth-child(1) {
      margin-right: 12px;
    }
  }
  .midItem {
    margin: 0 12px;
  }
  .copyItem {
    display: flex;
    align-items: center;
  }
  .tips {
    font-size: @fz12;
    color: rgba(0, 0, 0, 0.4);
    margin: 24px 0 8px;
  }
</style>

<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-04 14:30:53
 * @LastEditTime: 2022-11-07 14:22:56
-->
<template>
  <div class="ipAdd">
    <div class="leftOption">
      <div class="header">
        <span class="title">{{ t('setting.ipSeg') }}</span>
        <slot name="save"></slot>
      </div>
      <div class="content">
        <!-- ip前后输入框 start -->
        <template v-for="(item, index) in ips" :key="item">
          <ip-addr :ipAddress="state.ipAddress">
            <template #last>
              <li>
                <a-input
                  v-model:value.trim="state[item]"
                  type="text"
                  class="ipInputClass"
                  @input="checkIpVal(item, state[item])"
                />
                <div></div>
              </li>
            </template>
          </ip-addr>
          <MinusOutlined v-if="index < 1" class="line" />
        </template>
        <!-- ip前后输入框 end -->
        <!-- 添加按钮 start -->
        <a-button class="addBtn" @click="addIp">{{ t('common.add') }}</a-button>
        <!-- 添加按钮 end -->
        <!-- IP展示区域 start -->
        <div class="tagBox">
          <a-tag class="tagSelf clientip">
            <span> {{ t('operation.clientip') }}</span>
            <span> {{ clientIp }}</span>
          </a-tag>
          <template v-for="(item, index) in ipAddrResult" :key="index">
            <a-tag class="tagSelf" closable @close="deleteIp(index)">
              <span> {{ item }}</span>
            </a-tag>
          </template>
        </div>
        <!-- IP展示区域 end -->
      </div>
    </div>
    <!-- 历史登录ip start -->
    <history-ips :addIpMethod="addIpMethod" />
    <!-- 历史登录ip end -->
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { ipAddr } from '@/components/ip-addr';
  import { validateIp } from '@/utils/reg';
  import { message } from 'ant-design-vue';
  import { MinusOutlined } from '@ant-design/icons-vue';
  import { sampleSample } from '.';
  import { PropType, reactive, ref, watchEffect } from 'vue';
  import historyIps from '../historyIps';

  const { t } = useI18n();
  const emit = defineEmits(['update:ipAddreses']);
  const props = defineProps({
    ipAddreses: {
      type: Array as PropType<{ id?: number; ip_begin: string; ip_end: string }[]>,
      required: true,
    },
    clientIp: {
      type: String,
      required: true,
    },
  });
  //ip地址段
  const ips = ['ippre', 'ipnext'];

  //ip结构体
  const state = reactive({
    ippre: '',
    ipnext: '',
    ipAddress: [
      {
        value: '',
      },
      {
        value: '',
      },
      {
        value: '',
      },
    ],
  });
  // 检查ip输入为0-255
  const checkIpVal = (type, val) => {
    //确保每个值都处于0-255
    // 处理非数字
    state[type] = val.toString().replace(/[^0-9]/g, '');
    state[type] = parseInt(val, 10);
    if (isNaN(val)) {
      state[type] = '';
    } else {
      state[type] = val < 0 ? 0 : val;
      state[type] = val > 255 ? 255 : val;
    }
  };
  //添加ip的方法
  const addIpMethod = (ip_begin: string, ip_end: string) => {
    props.ipAddreses.push({
      ip_begin,
      ip_end,
    });
    //里面外面保持同步
    const { ipObjArr } = sampleSample(props.ipAddreses);
    //去重
    emit('update:ipAddreses', ipObjArr);
  };
  // 添加ip地址段
  const addIp = async () => {
    let ipCommon = '';
    state.ipAddress.forEach((item) => {
      ipCommon += item.value + '.';
    });
    const ip_begin = ipCommon + state.ippre;
    const ip_end = ipCommon + state.ipnext;
    try {
      await validateIp('', ip_begin);
      await validateIp('', ip_end);
    } catch {
      message.error(t('setting.ipSegWarn'));
      return;
    }
    addIpMethod(ip_begin, ip_end);
  };
  // 删除ip地址段
  const deleteIp = (index: Number) => {
    ipAddrResult.value.splice(~~index, 1);
    //外面同步
    props.ipAddreses.splice(~~index, 1);
  };
  //显示的ip段
  const ipAddrResult = ref<string[]>([]);
  //初次渲染
  watchEffect(() => {
    const { result } = sampleSample(props.ipAddreses);
    ipAddrResult.value = result;
  });
</script>

<style scoped lang="less">
  .ipAdd {
    margin-left: 44px;
    display: flex;

    .header {
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      .title {
        font-size: @fz14;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
      }
      .subtitle {
        font-size: @fz12;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .content {
      height: 200px;
      overflow: auto;
    }
    .leftOption {
      border-right: 1px solid #eee;
      border: 1px solid #eee;
      border-radius: 8px 0 0 8px;
      flex: 520px 0 0;
      .content {
        padding: 0 16px;
        li {
          position: relative;
          height: 24px;
          margin: 0;
          list-style-type: none;
        }
        .ipInputClass {
          border: none;
          width: 35px;
          height: 24px;
          text-align: center;
          background: transparent;
          padding: 0;
          /*取消掉默认的input focus状态*/
          &:focus {
            outline: none;
            box-shadow: none;
          }
        }
        .line {
          margin: 0 2px;
          padding: 0 4px;
          color: #ddd;
        }
        .addBtn {
          height: 24px;
          line-height: 24px;
          padding: 0 9px;
          margin-left: 8px;
          border-radius: 6px;
        }
        .tagSelf {
          border: none;
          display: inline-block;
          cursor: pointer;
          margin-bottom: 8px;
          position: relative;
          line-height: 24px;
          height: 24px;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.08);
          padding: 0 20px;
          &:hover {
            ::v-deep(.anticon) {
              transform: scale(1);
            }
          }
          ::v-deep(.anticon) {
            transition: all 0.3s;
            position: absolute;
            right: 5px;
            top: 7px;
            transform: scale(0);
          }
        }
        .clientip {
          background: rgba(0, 0, 0, 0.04);
          color: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
</style>

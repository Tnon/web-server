<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-25 14:20:13
 * @LastEditTime: 2023-11-10 11:35:55
-->
<template>
  <div class="container">
    <template v-for="(item, index) in ipTypes" :key="item.id">
      <a-popover
        trigger="click"
        placement="rightTop"
        overlayClassName="popNoPad"
        destroyTooltipOnHide
        @openChange="openChange($event, item.id, index)"
      >
        <template v-if="item.children" #content>
          <div class="container">
            <!-- 新增规则 start -->
            <div class="node" @click="addRules(item.id, index)">
              <div class="left">
                <PlusOutlined class="addIcon" />
                <div class="label">
                  {{ item.id === E_Show_Ip.Custom ? t('operation.addc') : t('operation.addn') }}
                </div>
              </div>
            </div>
            <!-- 新增规则 end -->
            <template v-if="item.children.length">
              <!-- 自定义规则 start -->
              <template v-for="itemChild in item.children" :key="itemChild.id">
                <div
                  class="node"
                  :class="{ actived: show_ip.c_id === itemChild.id }"
                  @click="switchIpShow(itemChild.id, true)"
                >
                  <div class="left">
                    <CheckOutlined class="checkIcon" />
                    <div class="label">{{ itemChild.label }}</div>
                  </div>
                </div>
              </template>
              <!-- 自定义规则 end -->
            </template>
            <template v-else>
              <div class="emptyText">{{ t('operation.emptyte') }}</div>
            </template>
          </div>
        </template>

        <!-- ip方式 start -->
        <div
          class="node"
          :class="{ actived: show_ip.id === item.id }"
          @click="switchIpShow(item.id)"
        >
          <div class="left">
            <CheckOutlined class="checkIcon" />
            <div class="label">{{ item.label }}</div>
          </div>
          <RightOutlined v-if="item.children" />
        </div>
        <!-- ip方式 end -->
      </a-popover>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { createVNode, ref, unref } from 'vue';
  import { E_Show_Ip } from '../../type';
  import { useI18n } from 'vue-i18n';
  import { CheckOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { I_Ip_Types } from './type';
  import { getIplist, switchIpShowApi } from '@/api/operation/run';
  import { useModal } from '@/hooks/use-modal';
  import customIpModal from '../customIpModal';
  const { t } = useI18n();
  defineProps<{
    show_ip: {
      label: string;
      id: E_Show_Ip;
      c_id: number;
    };
    host_id: string;
  }>();
  const ipTypes = ref<I_Ip_Types[]>([
    {
      label: t('strategy.ljipyx'),
      id: E_Show_Ip.Init,
    },
    {
      label: t('operation.cip'),
      id: E_Show_Ip.Connect,
    },
    {
      label: t('operation.zdhip'),
      id: E_Show_Ip.Custom,
      children: [
        {
          label: '1.1.1.1',
          id: 1,
        },
      ],
    },
    {
      label: t('operation.dkgs'),
      id: E_Show_Ip.Network,
      children: [],
    },
  ]);
  //按需加载
  const openChange = async (v, id, index) => {
    if (id === E_Show_Ip.Custom || id === E_Show_Ip.Network) {
      if (v) {
        const { code, items } = await getIplist({ type: id });
        if (!code) {
          ipTypes.value[index].children = items;
        }
      } else {
        ipTypes.value[index].children = [];
      }
    }
  };
  //新增规则
  const addRules = (id, index) => {
    useModal(
      {
        title: index === 2 ? t('operation.zdjkfs') : t('operation.zjdkfs2'),
        width: 640,
        contentProps: {
          id,
        },
        handleOk: async (contRef) => {
          await unref(contRef).validate();
        },
      },
      customIpModal,
    );
  };
  //切换IP
  const switchIpShow = (id, bool?) => {
    if (id === E_Show_Ip.Init || id === E_Show_Ip.Connect || bool) {
      useModal(
        {
          title: t('operation.qhips'),
          handleOk: async () => {
            const { code } = await switchIpShowApi({ id });
            if (code) {
              return Promise.reject();
            }
          },
        },
        createVNode('span', { style: {} }, t('operation.qohjsf')),
      );
    }
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 4px;
    max-height: 300px;
    overflow: auto;
  }
  .node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    color: rgba(0, 0, 0, 0.8);
    font-size: @fz12;
    width: 200px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.08);
    }
    .left {
      display: flex;
      align-items: center;
      .checkIcon {
        opacity: 0;
        margin-right: 8px;
        padding: 4px;
      }
      .addIcon {
        margin-right: 8px;
        padding: 4px;
      }
    }
  }
  .actived {
    background: rgba(0, 0, 0, 0.08);
    .left {
      .checkIcon {
        opacity: 1;
      }
    }
  }
  .emptyText {
    color: rgba(0, 0, 0, 0.4);
    margin: 16px 0;
    text-align: center;
  }
</style>

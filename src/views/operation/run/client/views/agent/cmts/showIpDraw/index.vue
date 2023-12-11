<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-28 18:47:18
 * @LastEditTime: 2023-08-29 11:33:16
-->
<template>
  <div class="container">
    <div class="title">{{ t('operation.shtips') }}</div>
    <template v-for="item in ipTypes" :key="item.id">
      <div class="node">
        <div class="header">
          <div class="label">{{ item.label }}</div>
          <!-- 新增 start -->
          <a-button type="text" v-if="item.children" @click="addEditCustomIp(item.id)">
            <template #icon>
              <PlusOutlined />
            </template>
            {{ t('operation.add') }}
          </a-button>
          <!-- 新增 end -->

          <!-- 选择主机 start -->
          <a-button v-else @click="selectHost(item.id)">
            {{ t('operation.sech') }}
          </a-button>
          <!-- 选择主机 end -->
        </div>
        <template v-if="item.children">
          <template v-if="item.children.length">
            <div class="childNode" v-for="itemChild in item.children" :key="itemChild.id">
              <div class="label">{{ itemChild.label }}</div>
              <div class="tools">
                <!-- 删除 start -->
                <a-button class="iconBtn" type="text" @click="delCustomIp(item.id, itemChild.id)">
                  <template #icon>
                    <DeleteOutlined />
                  </template>
                </a-button>
                <!-- 删除 end -->

                <!-- 编辑 start -->
                <a-button
                  class="iconBtn"
                  type="text"
                  @click="addEditCustomIp(item.id, itemChild.id)"
                >
                  <template #icon>
                    <EditOutlined class="iconBtn" />
                  </template>
                </a-button>
                <!-- 编辑 end -->

                <!-- 选择主机 start -->
                <a-button @click="selectHost(item.id, itemChild.id)">
                  {{ t('operation.sech') }}
                </a-button>
                <!-- 选择主机 end -->
              </div>
            </div>
          </template>
          <template v-else>
            <div class="emptyText">{{ t('operation.shtips') }}</div>
          </template>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { createVNode, ref, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { I_Ip_Types } from '../showIp/cmts/ipSelect/type';
  import { E_Show_Ip } from '../showIp/type';
  import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { useModal } from '@/hooks';
  import customIpModal from '../showIp/cmts/customIpModal';
  const props = defineProps({
    closeDraw: Function,
    selectHostRecords: Function,
  });
  const { t } = useI18n();
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
          label: '事实上',
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
  //删除
  const delCustomIp = (type, id) => {
    useModal(
      {
        title: t('operation.delcip'),
        dangerButton: true,
        okText: t('operation.saapp'),
        handleOk: () => {
          console.log(type, id);
        },
      },
      createVNode('span', { style: { color: 'rgba(0,0,0,.4)' } }, t('operation.sfkgplc')),
    );
  };
  //新增
  const addEditCustomIp = (id, childId?) => {
    useModal(
      {
        title: id === E_Show_Ip.Custom ? t('operation.zdjkfs') : t('operation.zjdkfs2'),
        width: 640,
        okText: childId ? t('operation.saapp') : undefined,
        contentProps: {
          id,
          childId,
        },
        handleOk: async (contRef) => {
          await unref(contRef).validate();
        },
      },
      customIpModal,
    );
  };
  //选择主机
  const selectHost = (id, childId?) => {
    props.closeDraw!();
    props.selectHostRecords!(id, childId);
  };
</script>

<style scoped lang="less">
  .container {
    .title {
      color: rgba(0, 0, 0, 0.4);
      margin: 16px 0;
    }
    .node {
      border: 1px solid rgba(0, 0, 0, 0.04);
      border-radius: 6px;
      margin-bottom: 16px;
      .header {
        padding: 12px 16px;
        display: flex;
        border-radius: 6px;
        align-items: center;
        justify-content: space-between;
        transition: all 0.3s;

        .label {
          color: rgba(0, 0, 0, 0.8);
          font-size: @fz14;
        }
        &:hover {
          background: rgba(0, 0, 0, 0.04);
        }
      }
      .childNode {
        display: flex;
        align-items: center;
        margin: 0 4px;
        justify-content: space-between;
        padding: 12px;
        border-radius: 6px;
        transition: all 0.3s;
        .label {
          color: rgba(0, 0, 0, 0.8);
          font-size: @fz12;
        }
        .tools {
          display: flex;
          align-items: center;
          .iconBtn {
            opacity: 0;
            transition: all 0.3s;
          }
        }
        &:hover {
          background: rgba(0, 0, 0, 0.04);
          .iconBtn {
            opacity: 1;
          }
        }
      }
      .emptyText {
        color: rgba(0, 0, 0, 0.4);
        margin: 16px 0;
        text-align: center;
      }
    }
  }
</style>

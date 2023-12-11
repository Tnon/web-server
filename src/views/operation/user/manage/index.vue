<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-10-12 12:09:29
-->
<template>
  <div class="userContainer">
    <div class="header">
      <!-- title start -->
      <!-- <div>{{ intance }}</div> -->
      <span class="title" v-if="!isCheck">{{ t('report.adminMag') }}</span>

      <!-- title end -->
      <!-- 批量删除 start -->
      <batch-bar
        v-model:isCheck="isCheck"
        v-else
        class="batbar"
        :batch-api="delUsers"
        :disabled="!tableRef.selectAllNumber"
        :ok-text="t('common.delete')"
        :danger="true"
      >
        <template #title>
          {{ t('user.delRecord', [tableRef.selectAllNumber]) }}
        </template>
      </batch-bar>
      <!-- 批量删除 end -->
      <div class="tools">
        <!-- 搜索 start -->
        <span>
          <a-input-search
            class="search"
            v-model:value.trim="agms.name"
            :placeholder="t('user.emacname')"
            @search="onSearch"
            @change="onSearch"
          />
        </span>
        <!-- 搜索 end -->
        <!-- 高级筛选 start -->
        <div class="filterContainer">
          <advan-filter v-model:u_type="agms.u_type" v-model:enable="agms.enable">
            <span class="filter">
              {{ t('common.filter') }}
              <span class="flag" v-if="StateEffect"></span>
            </span>
          </advan-filter>
        </div>

        <!-- 高级筛选 end -->
        <!-- 批量标记 start -->
        <span
          class="mark"
          @click="showCheckbox"
          v-permission="{ name: 'deleteUser', showUsers: [USERTOKEN.admin, USERTOKEN.super] }"
        >
          <a-button type="text">
            <template #icon>
              <CarryOutOutlined />
            </template>
            {{ t('common.batchOpt') }}
          </a-button>
        </span>
        <!-- 批量标记 end-->

        <!-- 新增管理员 start -->
        <a-button
          type="primary"
          @click="NewUser"
          class="addbtn"
          v-permission="{ name: 'addUser', showUsers: [USERTOKEN.admin, USERTOKEN.super] }"
        >
          <template #icon>
            <PlusOutlined />
          </template>
          {{ t('user.addUser') }}
        </a-button>
        <!-- 新增管理员 end -->
        <!-- LDAP设置 start -->
        <a-button
          type="text"
          @click="setLadp"
          class="exportIc"
          v-permission="{ name: 'ldapLogin', showUsers: [USERTOKEN.safe, USERTOKEN.super] }"
        >
          <template #icon>
            <SettingOutlined />
          </template>
          {{ t('user.ldapSet') }}
        </a-button>
        <!-- LDAP设置 end -->
        <div class="line"></div>
        <!-- 导出 start -->
        <export-data api="/api/report/user" :params="agms" class="exportIc" />
        <!-- 导出 end -->
      </div>
    </div>
    <slots-table
      :scroll="{ y: 'calc(100vh - 178px)' }"
      :isCheck="isCheck"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="agms"
      :get-list-func="getUserList"
      :allowCheckAll="false"
    />
  </div>
</template>

<script lang="ts" setup>
  import { unref, ref, reactive, computed, watch, createVNode } from 'vue';
  import { SlotsTable } from '@/components/slots-table';
  import { getUserList, addUser, batchDelUsers, saveLdapCfg } from '@/api/operation/user';
  import { useColumns } from './index';
  import { useModal, useValidatePwd } from '@/hooks';
  import { CarryOutOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons-vue';
  import { addModal } from './cmts/addModal';
  import { LdapSeting } from './cmts/LdapSeting';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { pCompile } from '@/utils/urlUtils';
  import { batchBar } from '@/components/batch-bar';
  import { useI18n } from 'vue-i18n';
  import exportData from '@/components/exportData';
  import advanFilter from './cmts/advanFilter';
  import { USERTOKEN } from '@/store/modules/user/type';
  import { useRoute } from 'vue-router';
  import { pwdConfirm } from '@/components/pwdConfirm';
  import { cloneDeep } from 'lodash';
  // 角色管理跳转携带参数
  const {
    query: { id },
  } = useRoute() as any;
  const { t } = useI18n();

  //table dom
  const tableRef: any = ref<HTMLElement>();
  //全选
  const isCheck = ref<boolean>(false);
  //批量选择
  const showCheckbox = () => {
    isCheck.value = !isCheck.value;
  };
  //搜索数据源
  const agms = reactive({
    name: '',
    u_type: id ? ~~id : undefined,
    enable: undefined,
  });
  //选择没选择
  const StateEffect = computed(() => {
    let flag = '';
    for (let k in agms) {
      if (k !== 'name') {
        const kvalue = agms[k] === undefined ? '' : agms[k];
        flag += kvalue;
      }
    }
    return flag;
  });
  //监听所有的条件 刷新表格
  watch([() => agms.u_type, () => agms.enable], () => {
    refreshTable();
  });
  //添加管理员
  const NewUser = () => {
    useModal(
      {
        title: t('user.addUser'),
        contentProps: {
          formData: reactive({}),
          formDataExtra: reactive({ u_type: undefined, group_id: [] }),
          isadd: true,
          isEmbed: false,
        },
        handleOk: async (conRef) => {
          // await unref(conRef.slotRef).validate();
          // await unref(conRef.extraSlotRef).validate();
          await Promise.all([
            unref(conRef.slotRef).validate(),
            unref(conRef.extraSlotRef).validate(),
          ]);
          const sendForm = cloneDeep(conRef.state);
          sendForm.password = pCompile(sendForm.password); // 密码加密
          sendForm.password_p = pCompile(sendForm.password_p);
          const sendFormExtra = conRef.extraSlotRef.state;
          await addUser(Object.assign({}, sendForm, sendFormExtra)); // 传参到添加用户
          refreshTable(true);
        },
      },
      addModal,
    );
  };
  //
  //删除管理员
  const delUsers = async () => {
    useModal(
      {
        title: t('user.cfmdeluer'),
        handleOk: async (conRef) => {
          await conRef.validate();
          return useValidatePwd(
            batchDelUsers,
            {
              useridarr: unref(tableRef).rowSelection.selectedRowKeys as number[],
            },
            conRef,
            refreshTable,
            false,
          );
        },
      },
      createVNode(pwdConfirm),
    );
  };
  //刷新表格的方法
  const refreshTable = (keepPage?: boolean) => {
    unref(tableRef).refreshTableData(keepPage);
    initRowSelection();
  };
  const columns = useColumns(t, refreshTable);
  // 搜索框变化刷新表格
  const onSearch = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      refreshTable();
      initRowSelection();
    }
    if (!value && !e) {
      refreshTable();
      initRowSelection();
    }
  };

  //LDAP设置
  const setLadp = async () => {
    useModal(
      {
        title: t('user.ldapTit'),
        handleOk: async (conRef) => {
          try {
            await unref(conRef).validate();
          } catch {
            return Promise.reject('');
          }
          saveLdapCfg(unref(conRef).formState);
        },
      },
      LdapSeting,
    );
  };
</script>
<style lang="less" scoped>
  .userContainer {
    padding: 0 16px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      flex: 0 0 48px;
      align-items: center;
      justify-content: space-between;
      .title {
        font-weight: 700;
        font-size: @fz14;
      }
      .mark {
        margin-right: 8px;
      }

      .tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .search {
          width: 220px;
        }
      }
    }
  }
  .batbar {
    flex: 1;
    background: rgba(24, 186, 121, 0.1);
    border-radius: 4px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 16px;
  }
  .exportIc {
    cursor: pointer;
  }

  .line {
    width: 1px;
    height: 16px;
    background: #e1e1e1;
    margin-right: 16px;
  }
  .filterContainer {
    .filter {
      position: relative;
      .flag {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        right: -10px;
        background: #18ba79;
      }
    }
  }
</style>

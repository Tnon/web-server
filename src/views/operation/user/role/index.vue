<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-25 09:42:14
 * @LastEditTime: 2022-10-28 15:42:48
-->
<template>
  <div class="container">
    <div class="header">{{ t('operation.userRole') }}</div>
    <div class="nodeCon">
      <template v-for="item in userRoleList" :key="item.role_key">
        <div class="node">
          <div>
            <custom-icon
              :type="judgeLogoIcon(item.id)['iconType']"
              :style="{ color: judgeLogoIcon(item.id)['color'] }"
              class="avatar"
            />
          </div>
          <div class="rolename">{{ item.role_name }}</div>
          <div class="merber">
            <span class="label">{{ t('operation.gluser') }}</span>
            <span class="count" @click="jumpTo(item.id)">{{ item.account_count }}</span>
          </div>
          <div class="desc">{{ item.description }}</div>
          <div class="creatime">
            <span class="label">{{ t('operation.creatim') }}</span>
            <span class="ctime">{{ item.create_time }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';
  import { getRoleList } from '@/api/operation/user';
  import { useRouter } from 'vue-router';
  import { USERTOKEN } from '@/store/modules/user/type';
  const { t } = useI18n();
  const router = useRouter();
  const userRoleList = ref<any>([]);
  const getRoleListM = async () => {
    const { items } = await getRoleList();
    userRoleList.value = items;
  };
  //获取角色详情
  getRoleListM();
  //根据角色判断logo
  const judgeLogoIcon = (id) => {
    let iconType = '#ax-osadmin',
      color = '#18BA79';
    if (id === USERTOKEN.admin) {
      iconType = '#ax-osadmin';
      color = '#587BF5';
    } else if (id === USERTOKEN.audit) {
      iconType = '#ax-auditadmin';
      color = '#2ECF99';
    } else if (id === USERTOKEN.operation) {
      color = '#439EF6';
      iconType = '#ax-oamadmin';
    } else if (id === USERTOKEN.safe) {
      iconType = '#ax-securityadmin';
      color = '#18BA79';
    } else if (id === USERTOKEN.super) {
      iconType = '#ax-vipadmin';
      color = '#E2CD00';
    }
    return { iconType, color };
  };
  //跳转用户管理
  const jumpTo = (id) => {
    router.push({
      name: 'operation-layout-user-manage',
      query: {
        id,
      },
    });
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 16px;
    .header {
      height: 48px;
      display: flex;
      align-items: center;
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
    }
    .nodeCon {
      display: flex;
      .node {
        padding: 16px;
        border: 1px solid #eee;
        border-radius: 8px;
        margin: 0 16px 16px 0;
        width: 240px;
        display: flex;
        flex-direction: column;
        .avatar {
          font-size: @fz30 !important;
        }
        .rolename {
          font-size: @fz16;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
          margin: 10px 0 4px 0;
        }
        .merber {
          .label {
            font-size: @fz14;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.7);
          }
          .count {
            color: @primary-color;
            cursor: pointer;
          }
        }
        .desc {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.7);
          margin: 8px 0 30px 0;
          flex: 1;
        }
        .creatime {
          .label {
            font-size: @fz12;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.7);
          }
          .ctime {
            font-size: @fz12;
          }
        }
      }
    }
  }
</style>

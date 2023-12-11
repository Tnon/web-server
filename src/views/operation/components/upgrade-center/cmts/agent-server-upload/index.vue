<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-07 16:53:32
 * @LastEditTime: 2023-08-15 16:47:01
-->
<template>
  <div class="containers">
    <div class="node nodefst">
      <div class="header">
        <div class="title">{{ t('operation.client') }}</div>
      </div>
      <!-- 上传agent组件 start -->
      <upload-agent
        :packageMsg="pkgMsgState['linux']!"
        :closeModal="closeModal"
        @refreshCmt="refreshCmtAgent"
      />
      <!-- 上传agent组件 end -->
    </div>
    <div class="node">
      <div class="header">
        <div class="title">{{ t('operation.server') }}</div>
      </div>
      <!-- 上传server start -->
      <upload-server :packageMsg="pkgMsgState['server']!" @refreshCmt="refreshCmtServer" />
      <!-- 上传server end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, watch } from 'vue';
  import uploadAgent from './cmts/upload-agent';
  import uploadServer from './cmts/upload-server';
  import { getPkgVer, getServerPkgVer } from '@/api/operation/upgrade';
  import { useI18n } from 'vue-i18n';
  import { PackageMsg } from './type';

  const props = defineProps({
    refreshMethods: Function,
    closeModal: Function,
    open: Boolean,
  });
  const { t } = useI18n();
  //客户端和服务端的包信息
  const pkgMsgState = reactive<PackageMsg>({
    linux: {
      //包版本
      package_version: '-',
      // agent版本
      agent_version: '-',
      //驱动库版本
      driver_version: '-',
      //更新时间
      created_at: '-',
      //包大小
      package_size: '-',
      //适用系统
      supports: '-',
      // 是否可以撤回
      enable_recall: false,
      //是否合并中
      is_merge: false,
    },
    server: {
      //包版本
      version: '-',
      // 基础包版本
      base_pkg_version: '-',
      //驱动库版本
      upgrade_pkg_version: '-',
      //发布时间
      release_at: '-',
      //是否合并中
      is_merge: false,
    },
  });

  let timerServer: any = 0;
  let timerAgent: any = 0;
  const setInterGetServerPackageVersions = () => {
    timerServer = setInterval(async () => {
      const { code, ...server } = await getServerPkgVer();
      if (code) {
        clearInterval(timerServer);
        getServerPackageVersions();
      } else {
        pkgMsgState.server = server ?? {};
        if (!server.is_merge) {
          clearInterval(timerServer);
          props.refreshMethods!();
        }
      }
    }, 3000);
  };
  const setInterGetAgentPackageVersions = () => {
    timerAgent = setInterval(async () => {
      const { linux, code } = await getPkgVer();
      if (code) {
        clearInterval(timerAgent);
        getAgentPackageVersions();
      } else {
        pkgMsgState.linux = linux ?? {};
        if (!linux.is_merge) {
          clearInterval(timerAgent);
          props.refreshMethods!();
        }
      }
    }, 3000);
  };
  watch(
    () => props.open,
    (newVal) => {
      if (!newVal) {
        clearInterval(timerServer);
        clearInterval(timerAgent);
      }
    },
  );
  // getAgentPackageVersions();
  //获取agent版本信息
  const getAgentPackageVersions = async () => {
    const { linux, code } = await getPkgVer();
    if (!code) {
      pkgMsgState.linux = linux ?? {};
      if (linux.is_merge) {
        setInterGetAgentPackageVersions();
      }
    }
  };
  //获取server版本信息
  const getServerPackageVersions = async () => {
    const { code, ...server } = await getServerPkgVer();
    if (!code) {
      pkgMsgState.server = server ?? {};
      if (server.is_merge) {
        setInterGetServerPackageVersions();
      }
    }
  };
  // getServerPackageVersions();
  //刷新agent和外部信息
  const refreshCmtAgent = () => {
    getAgentPackageVersions();
    props.refreshMethods!();
  };
  //刷新server和外部信息
  const refreshCmtServer = () => {
    getServerPackageVersions();
    props.refreshMethods!();
  };
  //获取包的方法合并
  const refreshServerAgentMsg = () => {
    getAgentPackageVersions();
    getServerPackageVersions();
  };
  defineExpose({ refreshServerAgentMsg });
</script>

<style scoped lang="less">
  .containers {
    display: flex;
    .node {
      flex: 1;
    }
    .nodefst {
      margin-right: 8px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      .title {
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        line-height: 24px;
      }
      :deep(.box) {
        border: none;
        .defaultS {
          padding: 4px 10px;
          margin: 0;
          line-height: 16px;
        }
      }
    }
  }
</style>

<template>
  <div>
    <div class="header">{{ t('operation.engine') }}</div>
    <a-spin :tip="t('setting.pasing') + '...'" :spinning="spinning">
      <div class="uploadFile">
        <div class="pack">
          <!-- 进度条 start -->
          <a-progress
            class="uploadprogre"
            :strokeWidth="2"
            :showInfo="false"
            strokeColor="#18ba79"
            :percent="uplpadPrg"
            v-if="uplpadPrg !== 0 && uplpadPrg !== 100"
            status="active"
          />
          <!-- 进度条 end -->
          <!-- 系统logo start -->
          <img class="upicon" :src="engPkg" />
          <!-- 系统logo end -->
          <!-- 包信息 start -->
          <div class="pkginfo">
            <div class="uptitle">
              {{ t('operation.producteng') }}
            </div>
            <div class="version">
              {{ t('operation.agtvs') }}
              {{ pkgMsgState.engine.version }}
            </div>
            <div class="pubtime">
              {{ t('operation.pubtime') }}
              {{ pkgMsgState.engine.created_at }}
            </div>
          </div>
          <!-- 包信息 end -->
          <div class="operation">
            <!-- 上传引擎包 start -->
            <upload-file
              v-permission="{
                name: 'engineUpload',
                showUsers: [USERTOKEN.admin, USERTOKEN.super],
              }"
              action="/api/enginelib/upload"
              @change="handleChange"
              accept=".gz"
            >
              <a-button
                type="primary"
                class="upbtn"
                :loading="uplpadPrg !== 0 && uplpadPrg !== 100"
              >
                {{ t('operation.updPkg') }}
              </a-button>
            </upload-file>
            <!-- 上传引擎包 end -->
          </div>
        </div>
        <!-- 引擎列表 start -->
        <engine-list
          :client="pkgMsgState.client"
          :server="pkgMsgState.server"
          :refreshMethods="refreshTableAndPackage"
        />
        <!-- 引擎列表 end -->
      </div>
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { message } from 'ant-design-vue';
  import uploadFile, { FileInfo } from '@/components/upload-file';
  import engPkg from '@/assets/images/eng_pkg.svg';
  import { useI18n } from 'vue-i18n';
  import engineList from './cmts/engineList';
  import { getEnginePkgVer } from '@/api/operation/upgrade';
  import { EnginePackageState } from './type';
  import { USERTOKEN } from '@/store/modules/user/type';
  const props = defineProps({
    refreshMethods: Function,
  });
  const { t } = useI18n();

  //spining
  const spinning = ref<boolean>(false);
  //引擎库包信息
  const pkgMsgState = reactive<EnginePackageState>({
    engine: {
      //包版本
      version: '-',
      //更新时间
      created_at: '-',
    },
    client: {
      acdr: {},
      hash_featurelib: {},
      precheck_baseline: {},
      rasp: {},
      baseline: {},
    },
    server: {
      yara: {},
      clamav: {},
      avira: {},
      vul: {},
      baseline: {},
    },
  });
  //上传进度
  const uplpadPrg = ref<number>(0);
  //上传完成
  const handleChange = (info: FileInfo & Event) => {
    //百分比
    uplpadPrg.value = Math.floor(info.file.percent as number);
    //上传进度到90开始解析
    if (uplpadPrg.value >= 98) {
      spinning.value = true;
    }
    //解析完成/上传错误
    if (info.file.status === 'done' || info.file.status === 'error') {
      spinning.value = false;
    }
    //上传接口失败
    if (info.file.status === 'error') {
      message.error(t('common.serverError'));
    }
    if (info.file.response) {
      if (info.file.response.code) {
        message.error(info.file.response.msg || t('setting.uploadError'));
      } else {
        message.success(t('setting.uploadSuc'));
      }
    }
    refreshTableAndPackage();
  };

  //获取版本信息
  const getPackageVersions = async () => {
    const { version, created_at, server, client } = await getEnginePkgVer();
    pkgMsgState.engine = { version, created_at };
    pkgMsgState.server = server ?? {};
    pkgMsgState.client = client ?? {};
  };
  // getPackageVersions();
  //刷新引擎包信息和外部表格
  const refreshTableAndPackage = (bool?: boolean) => {
    props.refreshMethods!(bool);
    getPackageVersions();
  };
  //获取包的方法合并
  const refreshEngineMsg = () => {
    getPackageVersions();
  };
  defineExpose({ refreshEngineMsg });
</script>
<style lang="less" scoped>
  .header {
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    margin: 24px 0 8px 0;
  }
  .uploadFile {
    border-radius: 8px;
    border: 1px solid #eeeeee;
    padding: 24px;
    position: relative;
    flex-direction: column;
    .pack {
      display: flex;
      align-items: flex-start;
    }
    .pkginfo {
      flex: 1;
      .uptitle {
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 4px;
      }
      .version {
        font-size: @fz12;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
      }
      .pubtime {
        font-size: @fz12;
        color: rgba(0, 0, 0, 0.4);
        margin: 4px 0 16px 0;
      }
    }
    .operation {
      display: flex;
      flex-direction: column;
    }

    .upicon {
      margin-right: 24px;
      cursor: pointer;
      width: 48px;
      height: 48px;
    }
    .upbtn {
      margin-bottom: 8px;
    }
  }
  .uploadprogre {
    position: absolute;
    bottom: -8px;
    left: 0;
  }

  .nodes {
    padding: 0 16px;
    line-height: 30px;
    font-size: @fz12;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
  .notallow {
    cursor: not-allowed;
    color: rgba(0, 0, 0, 0.5);
  }
</style>

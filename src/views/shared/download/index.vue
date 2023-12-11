<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-23 10:30:36
 * @LastEditTime: 2023-01-13 15:35:13
-->
<template>
  <router-view>
    <transition name="zoom-fade" mode="out-in" appear>
      <div class="box">
        <div class="bg">
          <div class="title">{{ t('download.produname') }}</div>
          <div class="subtitle">{{ t('download.agtdld') }}</div>
          <div class="tip">{{ t('download.wlstm') }}</div>
        </div>
        <div class="container bk_br_sd">
          <div class="content">
            <template v-for="item in agentDownload" :key="item">
              <div class="agent">
                <!-- agent客户端下载 -->
                <div class="title">
                  <span class="line"></span>
                  <span>{{ t('download.agtDown', [item]) }}</span>
                </div>

                <!-- windows版/linux版 -->
                <client
                  :getPackageVersions="getPackageVersions"
                  :formData="state[item]"
                  :osType="item"
                  :isShow="false"
                />

                <!-- 安装说明 -->
                <div class="title">
                  <span class="line"></span>
                  <span>{{ t('download.instInst') }}</span>
                </div>
                <time-line
                  :osType="item"
                  :downLoadUrl="state[item].download_url"
                  :agent_filename="state[item].agent_filename"
                  :ip="state[item].ip"
                  :port="state[item].port"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import timeLine from './timeLine/index.vue';
  import client from './client/index.vue';
  import { getPkgVer } from '@/api/operation/upgrade';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  // 屏蔽windows
  // const agentDownload = ['Windows', 'Linux'];
  const agentDownload = ['Linux'];
  //版本信息
  const state = reactive<{ Windows: any; Linux: any }>({
    Windows: {},
    Linux: {},
  });

  //获取版本信息
  const getPackageVersions = async () => {
    const { windows, linux } = await getPkgVer();
    state.Windows = windows ?? {};
    state.Linux = linux ?? {};
  };
  getPackageVersions();
</script>

<style lang="less" scoped>
  .box {
    min-width: 1080px;
  }
  .bg {
    height: 260px;
    background: url('@/assets/images/login-bg.jpg') no-repeat 88%;
    background-size: 35%;
    background-color: #0d1611;
    padding: 0 12%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      font-size: @fz30;
      color: @primary-color;
    }
    .subtitle {
      font-size: 40px;
      margin: 10px 0;
      color: #fff;
    }
    .tip {
      color: #eee;
      opacity: 0.4;
      font-size: @fz16;
      margin-top: 30px;
      font-weight: 100;
    }
  }
  .container {
    width: 1280px;
    margin: 24px auto;
    overflow: auto;
    height: calc(100vh - 308px);
    .content {
      padding: 24px 0;
      //屏蔽windows
      // display: flex;
      .agent {
        //屏蔽windows
        // width: 50%;
        border-right: 1px solid #eee;
        padding: 0 40px;
        box-sizing: border-box;
        .title {
          font-size: @fz14;
          font-weight: 600;
          .line {
            width: 4px;
            height: 16px;
            display: inline-block;
            background: #18ba79;
            border-radius: 8px;
            margin-right: 16px;
          }
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
</style>

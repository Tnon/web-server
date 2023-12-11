<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-11-08 14:59:57
 * @LastEditTime: 2023-11-09 16:36:20
-->
<template>
  <div class="asset">
    <div class="title">
      <span>{{ t('overview.kjjfs') }}</span>
    </div>
    <div class="main">
      <template v-for="item in staticType" :key="item.icon">
        <div class="node">
          <custom-icon class="c_icon" :type="item.icon" />
          <div class="lb">
            <div class="label">{{ item.title }}</div>
            <count-to class="value" :endVal="item.number" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const staticType = reactive({
    account: {
      title: t('asset.account'),
      number: 0,
      icon: '#ax-user',
    },
    process: {
      title: t('asset.process'),
      number: 0,
      icon: '#ax-process',
    },
    port: {
      title: t('asset.port'),
      number: 0,
      icon: '#ax-port',
    },
    kernel: {
      title: t('asset.kernel'),
      number: 0,
      icon: '#ax-kernel',
    },

    app: {
      title: t('asset.app'),
      number: 0,
      icon: '#ax-applications',
    },

    webservice: {
      title: t('asset.webservice'),
      number: 0,
      icon: '#ax-web',
    },
    webapp: {
      title: t('asset.webapp'),
      number: 0,
      icon: '#ax-zc-webapplication',
    },
    website: {
      title: t('asset.website'),
      number: 0,
      icon: '#ax-zc-webside',
    },
  });
</script>

<style scoped lang="less">
  .asset {
    min-width: 400px;
    min-height: 384px;
    width: 20.833vw;
    height: 35.555vh;
    max-width: 37.036vh;
    max-height: 19.999vw;
    display: flex;
    flex-direction: column;
    .title {
      display: flex;
      align-items: center;
      flex: 40px 0 0;
      font-size: @fz14;
      font-weight: 600;
      line-height: 24px;
      padding-left: 10px;
      color: #ffffff;
      background-image: url(../../imgs/BoxTitle01.svg);
      background-position: left;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .main {
      padding: 4px 0 20px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      flex: 1;
      .node {
        display: flex;
        align-items: center;
        flex: 50% 0 0;
        margin: 12px 0;
        .c_icon {
          width: 28px;
          height: 28px;
          padding: 14px;
          border: 2px solid rgba(24, 186, 121, 0.2);
          border-radius: 50%;
          color: @primary-color;
          box-sizing: content-box;
        }
        .lb {
          display: flex;
          flex-direction: column;
          margin-left: 12px;
          .label {
            font-size: @fz14;
            font-weight: normal;
            line-height: 24px;
            color: rgba(255, 255, 255, 0.8);
          }
          .value {
            font-family: D-DIN;
            font-size: @fz20;
            font-weight: bold;
            line-height: 32px;

            /* Font/白1 */
            color: #ffffff;
          }
        }
      }
    }
  }
</style>

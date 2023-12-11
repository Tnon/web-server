<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-23 19:09:19
 * @LastEditTime: 2021-12-10 12:02:06
-->
<template>
  <div class="timeLine">
    <template v-for="(item, index) in installStep[osType!]" :key="index">
      <div class="titleAndStep">
        <span class="step">{{ index + 1 }}</span>
        <span class="title">{{ t('download.' + item.step) }}</span>
      </div>
      <div class="line">
        <template v-for="(ele, indexc) in item.children" :key="indexc">
          <div class="lineP">
            <span class="line_subtitle" v-if="ele.label">
              {{ t('download.method', [indexc + 1]) }}
            </span>
            <div class="linetext" v-html="ele.value"></div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useInstallDesc } from './index';
  const props = defineProps({
    osType: String,
    downLoadUrl: String,
    ip: String,
    port: String,
    agent_filename: String,
  });
  const { t } = useI18n();
  const installStep = useInstallDesc(t);
  watch(
    () => props.downLoadUrl,
    (v) => {
      if (v && props.osType === 'Linux') {
        //文件名
        installStep.Linux[0].children![0].value = t('download.linMone', [props.agent_filename]);
        //下载地址
        installStep.Linux[0].children![1].value = t('download.wget', [
          props.downLoadUrl?.replace(/\(/g, '\\(').replace(/\)/g, '\\)'),
        ]);
        //chmod ip和端口+文件名
        // installStep.Linux[1].children![0].value = `在root 帐户下执行以下命令：<br>文件执行授权 （chmod +x ${props.agent_filename}） <br> 执行安装文件（./${props.agent_filename} -r ${props.ip} -p ${props.port} -g<分组id> ）`
        installStep.Linux[1].children![0].value = t('download.cmdIns', [
          props.agent_filename?.replace(/\(/g, '\\(').replace(/\)/g, '\\)'),
          props.ip,
          props.port,
          props.downLoadUrl?.replace('/latest_version', ''),
        ]);
      }
    },
  );
</script>

<style lang="less" scoped>
  .timeLine {
    margin-top: 24px;
  }
  .titleAndStep {
    display: flex;
    align-items: center;
  }
  .step {
    display: inline-block;
    width: 32px;
    height: 32px;
    text-align: center;
    border-radius: 50%;
    line-height: 32px;
    background: #eee;
  }
  .title {
    color: rgba(0, 0, 0, 0.8);
    font-size: @fz12;
    font-weight: 600;
    display: inline-block;
    padding-left: 16px;
  }
  .line {
    margin: 5px 0;
    min-height: 170px;
    margin-left: 16px;
    border-left: 1px solid #aaa;
    padding-left: 35px;
    padding-bottom: 15px;
    .lineP {
      display: flex;
      margin-bottom: 16px;
    }
    .line_subtitle {
      display: inline-block;
      color: rgba(0, 0, 0, 0.8);
      font-weight: 600;
      margin: 0 17px 0px 0;
      min-width: 80px;
    }
    .linetext {
      color: rgba(0, 0, 0, 0.6);
      line-height: 20px;
      word-break: break-word;
    }
    &:last-child {
      display: none;
    }
  }
</style>

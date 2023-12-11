<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-11-09 11:50:47
 * @LastEditTime: 2023-11-09 17:25:35
-->
<template>
  <div class="threePie">
    <div class="cpu">
      <div class="pie">
        <div class="pieCon" ref="cpuRef"></div>
      </div>
      <div class="label">{{ t('setting.cpuUtil') }}</div>
    </div>
    <div class="cpu">
      <div class="pie">
        <div class="pieCon" ref="memRef"></div>
      </div>
      <div class="label">{{ t('setting.memUseC') }}</div>
    </div>
    <div class="cpu">
      <div class="pie">
        <div class="pieCon" ref="disRef"></div>
      </div>
      <div class="label">{{ t('setting.hadUtil') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Ref, onMounted, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useECharts } from '@/hooks';
  const { t } = useI18n();

  const state = reactive({
    cpu: 53,
    mem: 49,
    disk: 32,
  });

  //chart 元素
  const cpuRef = ref<HTMLDivElement | null>(null),
    memRef = ref<HTMLDivElement | null>(null),
    disRef = ref<HTMLDivElement | null>(null);
  const renderPies = (ele, type) => {
    const { setOptions } = useECharts(ele as Ref<HTMLDivElement>);
    setOptions({
      title: [
        {
          text: '{name|' + state[type] + '%}',
          top: 'center',
          left: 'center',

          textStyle: {
            rich: {
              name: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#18BA79',
              },
            },
          },
        },
      ],

      series: [
        {
          type: 'pie',
          color: ['#18BA79', '#000'],
          id: 1,
          radius: ['70%', '100%'],
          avoidLabelOverlap: false,
          labelLine: {
            show: false,
          },
          label: {
            show: false,
          },
          data: [
            { name: '', value: state[type] },
            { name: '', value: 100 - state[type] },
          ],
        },
      ],
    });
  };
  onMounted(() => {
    renderPies(cpuRef, 'cpu');
    renderPies(memRef, 'mem');
    renderPies(disRef, 'disk');
  });
</script>

<style scoped lang="less">
  .threePie {
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    margin-top: 16px;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    padding: 16px;
    width: calc(100% - 16px);
    .cpu {
      display: flex;
      flex-direction: column;
      align-items: center;
      .label {
        font-size: @fz12;
        font-weight: 600;
        line-height: 16px;
        color: #ffffff;
        margin-top: 20px;
      }
      .pie {
        width: 4.583vw;
        height: 8.148vh;
        min-width: 88px;
        min-height: 88px;
        max-width: 8.148vh;
        max-height: 4.583vw;
        background-image: url(../../imgs/Useratebox.svg);
        padding: 8px;
        background-position: center;
        background-size: 130%;
        .pieCon {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
</style>

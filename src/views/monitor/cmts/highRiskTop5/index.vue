<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-11-08 11:56:13
 * @LastEditTime: 2023-11-09 15:57:03
-->
<template>
  <div class="top5">
    <div class="title">
      <span>{{ t('overview.fklsg') }}</span>
      <div class="legend">
        <template v-for="item in legend" :key="item.type">
          <div class="node">
            <div class="bar" :style="{ background: item.color }"></div>
            <div class="label">{{ item.label }}</div>
          </div>
        </template>
      </div>
    </div>
    <div class="main" v-if="data.length">
      <template v-for="item in data" :key="item.ip">
        <div class="nodeBar">
          <div class="badge"></div>
          <div class="label">{{ item.ip }}</div>
          <div class="progress">
            <div class="total" :style="{ width: (item.total / data[0].total) * 100 + '%' }">
              <div
                class="attack prp"
                :style="{ width: (item.attack / item.total) * 100 + '%' }"
              ></div>
              <div
                class="event prp"
                :style="{ width: (item.event / item.total) * 100 + '%' }"
              ></div>
              <div
                class="vrl prp"
                :style="{ width: (item.loophole / item.total) * 100 + '%' }"
              ></div>
              <div class="risk prp" :style="{ width: (item.risk / item.total) * 100 + '%' }"></div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const legend = ref([
    {
      label: t('overview.ld'),
      color: '#F75555',
      type: 'loophole',
      show: true,
    },
    {
      label: t('menu.risk'),
      color: 'rgba(247, 85, 85, 0.8)',
      type: 'risk',
      show: true,
    },
    {
      label: t('menu.ngav'),
      color: 'rgba(247, 85, 85, 0.6)',
      type: 'event',
      show: true,
    },
    {
      label: t('menu.attack'),
      color: 'rgba(247, 85, 85, 0.4)',
      type: 'attack',
      show: true,
    },
  ]);

  const data = ref([
    {
      ip: '255.255.255.255',
      attack: 100,
      event: 100,
      loophole: 100,
      risk: 100,
      total: 400,
    },
    {
      ip: '255.255.255.256',
      attack: 90,
      event: 100,
      loophole: 100,
      risk: 70,
      total: 360,
    },
    {
      ip: '255.255.255.257',
      attack: 10,
      event: 100,
      loophole: 100,
      risk: 90,
      total: 300,
    },
    {
      ip: '255.255.255.258',
      attack: 50,
      event: 100,
      loophole: 60,
      risk: 60,
      total: 270,
    },
    {
      ip: '1.1.2.1',
      attack: 100,
      event: 60,
      loophole: 40,
      risk: 30,
      total: 230,
    },
  ]);
</script>

<style scoped lang="less">
  .top5 {
    min-width: 400px;
    min-height: 320px;
    width: 20.833vw;
    height: 29.629vh;
    max-width: 37.036vh;
    max-height: 16.666vw;
    margin: 24px 0;
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
      background-image: url(../../imgs/BoxTitle02.svg);
      background-position: left;
      background-repeat: no-repeat;
      background-size: contain;
      justify-content: space-between;
      .legend {
        display: flex;
        align-items: center;
        .node {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          margin: 0 5px;
          .bar {
            width: 16px;
            height: 2px;
            border-radius: 2px;
            margin-bottom: 6px;
          }
          .label {
            font-size: @fz12;
            font-weight: normal;
            line-height: 16px;
            /* Font/白1 */
            color: #ffffff;
          }
        }
      }
    }
    .main {
      padding: 10px 0;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      .nodeBar {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        height: 40px;
        margin: 6px 0;
        display: flex;
        align-items: center;
        padding: 0 16px;
        .badge {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: @primary-color;
        }
        .label {
          flex: 105px 0 0;
          margin: 0 10px;
          font-family: D-DIN;
          font-size: @fz13;
          font-weight: bold;
          line-height: 20px;
          /* Font/白1 */
          color: #ffffff;
        }
        .progress {
          // flex: 250px 0 0;
          flex: 1;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          height: 16px;
          display: flex;
          align-items: center;
          padding: 0 4px;
          .total {
            display: flex;
            align-items: center;
            border-radius: 24px;
            overflow: hidden;
            .prp {
              height: 8px;
              position: relative;
              &::after {
                content: ' ';
                position: absolute;
                height: 8px;
                width: 1px;
                background-color: #000;
                right: 0;
                top: 0;
              }
              &:last-child {
                &::after {
                  display: none;
                }
              }
            }
            .attack {
              background-color: #f75555;
            }
            .event {
              background-color: rgba(247, 85, 85, 0.8);
            }
            .vrl {
              background-color: rgba(247, 85, 85, 0.6);
            }
            .risk {
              background-color: rgba(247, 85, 85, 0.4);
            }
          }
        }
      }
    }
  }
</style>

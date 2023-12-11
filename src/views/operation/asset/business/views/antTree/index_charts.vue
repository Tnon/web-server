<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-24 16:22:51
 * @LastEditTime: 2022-11-28 11:10:10
-->
<template>
  <div class="flowContainer" ref="chartRef"></div>
</template>

<script setup lang="ts">
  import { onMounted, Ref, ref } from 'vue';
  // import { getHostGroups } from '@/api/asset/hostInfo/host';
  import { useECharts } from '@/hooks';
  import { transformData } from '.';
  import { getBusinessGroups } from '@/api/operation/asset';
  import { GROUPENUM } from '@/enums/moveGroup';

  //容器
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  onMounted(async () => {
    const { items, host_total, total } = await getBusinessGroups({
      filter: {
        id: GROUPENUM.ALL,
      },
      exclude_host: false,
      exclude_id: '',
      page: {
        page_index: -1,
        page_size: 20,
      },
    } as any);
    transformData(items);
    // console.log(items);
    // const { groups } = await getHostGroups();
    setOptions({
      // tooltip: {
      //   trigger: 'item',
      //   triggerOn: 'mousemove',
      // },
      series: [
        {
          type: 'tree',
          id: 0,
          zoom: 1,
          name: 'tree',
          data: [
            {
              id: -1,
              name: '全部分组',
              children: items,
              host_num: host_total,
              host_group_num: total,
            },
          ],
          symbolSize: 7,
          edgeShape: 'polyline',
          edgeForkPosition: '63%',
          initialTreeDepth: 5,
          lineStyle: {
            width: 1,
          },
          label: {
            backgroundColor: '#fff',
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            // width: 200,
            // height: 32,
            // borderColor: 'red',
            // borderRadius: 8,
            // borderWidth: 1,
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left',
            },
          },
          // emphasis: {
          //   focus: 'descendant',
          // },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    });
  });
</script>

<style scoped lang="less">
  .flowContainer {
    width: 100%;
    height: 100%;
  }
</style>

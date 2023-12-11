<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-19 14:32:38
 * @LastEditTime: 2023-07-27 14:25:15
-->
<template>
  <div>
    <a-popover
      trigger="click"
      placement="bottomRight"
      overlayClassName="batchM"
      @openChange="popVisibleChange"
    >
      <template #content>
        <div class="container">
          <!-- 报告类型 start -->
          <div class="formitems">
            <span class="filterLabel">{{ t('report.taskType') }}</span>
            <a-select
              class="select"
              allowClear
              v-model:value="localAgms.type"
              :placeholder="t('report.defaultAll')"
              @change="selectChange"
            >
              <template v-for="item in typeOptions" :key="item.value">
                <a-select-option>{{ item.label }}</a-select-option>
              </template>
            </a-select>
          </div>
          <!-- 报告类型 end -->

          <!-- 更新时间 start -->
          <div class="formitems">
            <span class="filterLabel">{{ t('report.updataTime') }}</span>
            <a-range-picker
              class="select"
              show-time
              v-model:value="updateTime"
              :presets="ranges"
              :format="dateFormat"
              @change="timeChange"
            />
          </div>
          <!-- 更新时间 end -->

          <!-- 任务状态 start -->
          <div class="formitems">
            <span class="filterLabel">{{ t('report.taskStatus') }}</span>
            <a-select
              class="select"
              allowClear
              v-model:value="localAgms.status"
              :placeholder="t('report.defaultAll')"
              @change="selectChange"
            >
              <template v-for="item in statusOptions" :key="item.value">
                <a-select-option>{{ item.label }}</a-select-option>
              </template>
            </a-select>
          </div>
          <!-- 任务状态 end -->

          <!-- 使用模板 start -->
          <div class="formitems">
            <span class="filterLabel">{{ t('report.useingTemplate') }}</span>
            <a-select
              class="select"
              allowClear
              v-model:value="localAgms.report_template_id"
              :placeholder="t('report.defaultAll')"
              @change="selectChange"
              :options="templateOptions"
              :field-names="{ label: 'title', value: 'id', options: 'options' }"
            />
          </div>
          <!-- 使用模板 end -->
        </div>
      </template>
      <!-- 筛选按钮 start -->
      <a-button type="text" class="batchbtn">
        <template #icon>
          <customIcon type="#ax-Filters" class="btnIcon" />
        </template>
        {{ t('common.filter') }}
        <span class="flag" v-if="StateEffect"></span>
      </a-button>
      <!-- 筛选按钮 end -->
    </a-popover>
  </div>
</template>

<script lang="ts" setup>
  import { computed, PropType, reactive, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useSelectOptions } from './index';
  import dayjs, { Dayjs } from 'dayjs';
  import { getTemplateListApi } from '@/api/report';
  import { TaskFilter } from '@/api/report/model';

  const props = defineProps({
    agms: {
      type: Object as PropType<TaskFilter>,
      reuired: true,
    },
  });
  const emit = defineEmits(['changeValue']);

  const { t } = useI18n();
  const localAgms = reactive<Partial<TaskFilter>>({
    type: props.agms?.type, // 任务类型
    start_time: props.agms?.start_time, // 秒级时间戳
    end_time: props.agms?.end_time, // 秒级时间戳
    status: props.agms?.status, // 任务状态
    report_template_id: props.agms?.report_template_id, // 使用的模板
  });
  const { typeOptions, statusOptions } = useSelectOptions(t);
  const templateOptions = ref<any>([]);

  // 接口获取模板列表
  const getTemplateList = async () => {
    const { email, word } = await getTemplateListApi({ filter: { title: '' } });
    if (email) {
      templateOptions.value = [
        {
          //邮件格式
          title: t('report.emafmt'),
          options: email,
        },
        {
          //word格式
          title: t('report.word'),
          options: word ?? [],
        },
      ];
    } else {
      templateOptions.value = word ?? [];
    }
  };
  getTemplateList();

  // pop显示隐藏改变
  const popVisibleChange = (open) => {
    if (open) {
      getTemplateList();
    }
  };
  // 选择没选择
  const StateEffect = computed(() => {
    let flag = '';
    for (let k in props.agms) {
      if (k !== 'title') {
        const kvalue = props.agms[k] === undefined ? '' : props.agms[k];
        flag += kvalue;
      }
    }
    return flag;
  });

  // 选择项变化
  const selectChange = () => {
    emit('changeValue', localAgms);
  };
  // 监听来自模板对话框的搜索条件
  // 但是也监听了本组件导致的搜索条件变化
  // 为了不重复调用接口，所以其父组件中只在agms变化时调用接口
  watch(props.agms!, () => {
    Object.assign(localAgms, props.agms);
    selectChange();
  });

  // 时间格式
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  // 时间组件绑定值
  const updateTime = ref<Dayjs[]>([]);
  // 固定时间范围
  const ranges = ref([
    {
      label: t('report.latestDay'),
      value: [dayjs().subtract(1, 'day'), dayjs()],
    },
    {
      label: t('report.latestWeek'),
      value: [dayjs().subtract(7, 'day'), dayjs()],
    },
    {
      label: t('report.latestMonth'),
      value: [dayjs().subtract(1, 'month'), dayjs()],
    },
  ]);
  // 时间选择变化，将时间数据转换为后端可接受的数据
  const timeChange = (v) => {
    // console.log('time', v);
    if (v && v.length) {
      const [start, end] = v;
      localAgms.start_time = start.unix();
      localAgms.end_time = end.unix();
      selectChange();
    } else {
      localAgms.start_time = undefined;
      localAgms.end_time = undefined;
      selectChange();
    }
  };
</script>

<style lang="less" scoped>
  .container {
    width: 480px;
    padding: 16px 15px;
    .header {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 8px;
    }

    .formitems {
      display: flex;
      align-items: center;
      padding: 4px 0;
      .filterLabel {
        flex: 80px 0 0;
      }
      .select {
        flex: 1;
      }
    }
  }

  .batchbtn {
    position: relative;
    .btnIcon {
      font-size: @fz12 !important;
    }
    .flag {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      right: 0px;
      top: 3px;
      background: #18ba79;
    }
  }
</style>

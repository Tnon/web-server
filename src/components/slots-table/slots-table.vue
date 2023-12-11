<template>
  <div class="tableContent">
    <!-- <div> -->
    <!-- {{ disabledKeys }} -->
    <!-- {{ dynaRowSelection.rowSelection }} -->
    <a-table
      v-bind="Object.assign({}, $props, $attrs)"
      :loading="state.loading"
      :data-source="state.dataSource"
      :pagination="state.pageOption"
      @change="paginationChange"
      :rowSelection="dynaRowSelection.rowSelection"
      :columns="columnsEllipsis"
      @resizeColumn="handleResizeColumn"
      :showSorterTooltip="false"
      ref="tableRef"
      :locale="{ emptyText: state.loading ? createVNode('span', null, '') : undefined }"
    >
      <!--自定义slots start (title,footer....)-->
      <template v-for="(_, key) in $slots" #[key]="slotProps">
        <slot :name="key" v-bind="slotProps"></slot>
      </template>
      <!--自定义slots end (title,footer....)-->

      <!--自定义显示 slots start-->
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.actions">
          <!--对表格的操作动作start-->
          <template v-for="(action, indexP) in column.actions" :key="indexP">
            <!-- switch启用状态 start-->
            <template v-if="action.type === 'switch'">
              <a-switch
                :disabled="action.disabled && action.disabled(record)"
                :checked="action.checked && action.checked(record)"
                v-bind="action.props"
                @click="toogleEnable($event, record, action.func)"
              />
            </template>
            <!--switch启用状态 end-->

            <!--三个点操作符 start-->
            <template v-if="action.type === 'icon'">
              <!-- 气泡卡片 -->
              <a-popover
                v-if="!(action.disabled && action.disabled(record))"
                placement="leftTop"
                trigger="click"
                overlayClassName="popNoPad"
                destroyTooltipOnHide
              >
                <template #content>
                  <div v-for="item in action.actionList" :key="item.title">
                    <!-- 删除确认 -->
                    <template v-if="item.type === 'popconfirm'">
                      <a-popconfirm
                        v-if="!(item.hidden && item.hidden(record))"
                        placement="leftTop"
                        :disabled="!(!isCheck && !(item.disabled && item.disabled(record)))"
                        @confirm="actionEvent(record, item.func)"
                      >
                        <template #title>
                          {{
                            item.popConfirmText
                              ? item.popConfirmText(record)
                              : t('common.confirmDel')
                          }}
                        </template>
                        <!-- 批量删除时候，不让删除   全局默认策略不让删除 -->
                        <a-button
                          :disabled="!(!isCheck && !(item.disabled && item.disabled(record)))"
                          class="noradiuBtn"
                          type="text"
                        >
                          {{ item.text }}
                        </a-button>
                      </a-popconfirm>
                    </template>

                    <!-- 编辑 -->
                    <template v-else>
                      <template v-if="item.isVnode">
                        <component :is="item.text(record)" />
                      </template>
                      <template v-else>
                        <a-tooltip placement="left" destroyTooltipOnHide>
                          <template
                            #title
                            v-if="item.disabled && item.disabled(record) && item.tooltip"
                          >
                            <span>
                              {{ isString(item.tooltip) ? item.tooltip : item.tooltip(record) }}
                            </span>
                          </template>
                          <a-button
                            v-if="!(item.hidden && item.hidden(record))"
                            class="noradiuBtn"
                            :disabled="item.disabled && item.disabled(record)"
                            type="text"
                            :loading="item.loading && item.loading(record)"
                            @click="actionEvent(record, item.func)"
                          >
                            {{ isString(item.text) ? item.text : item.text(record) }}
                          </a-button>
                        </a-tooltip>
                      </template>
                    </template>
                  </div>
                </template>
                <a-button type="text" class="iconBtn">
                  <EllipsisOutlined />
                </a-button>
              </a-popover>
              <a-button type="text" v-else disabled class="iconBtn">
                <EllipsisOutlined />
              </a-button>
            </template>
            <!--三个点操作符 end-->

            <!-- 按钮组 start -->
            <template v-if="action.type === 'groups'">
              <!-- 气泡卡片 -->
              <div class="btnGroups">
                <template v-for="(item, indexBtn) in action.actionList" :key="item.title">
                  <!-- 删除确认 -->
                  <template v-if="item.type === 'popconfirm'">
                    <a-popconfirm
                      v-if="!(item.hidden && item.hidden(record))"
                      placement="leftTop"
                      :disabled="!(!isCheck && !(item.disabled && item.disabled(record)))"
                      @confirm="actionEvent(record, item.func)"
                    >
                      <template #title>
                        {{
                          item.popConfirmText ? item.popConfirmText(record) : t('common.confirmDel')
                        }}
                      </template>
                      <!-- 批量删除时候，不让删除   全局默认策略不让删除 -->
                      <a-button
                        :disabled="!(!isCheck && !(item.disabled && item.disabled(record)))"
                        class="noradiuBtn smallBtn"
                        type="text"
                      >
                        {{ item.text }}
                      </a-button>
                    </a-popconfirm>
                  </template>

                  <!-- 更多操作 -->
                  <template v-else-if="item.type === 'moreActions'">
                    <a-popover
                      v-if="!(item.disabled && item.disabled(record))"
                      placement="leftTop"
                      trigger="click"
                      overlayClassName="popNoPad"
                      destroyTooltipOnHide
                    >
                      <template #content>
                        <div v-for="itemChild in item.actionList" :key="itemChild.title">
                          <!-- 删除确认 -->
                          <template v-if="itemChild.type === 'popconfirm'">
                            <a-popconfirm
                              v-if="!(itemChild.hidden && itemChild.hidden(record))"
                              placement="leftTop"
                              :disabled="
                                !(!isCheck && !(itemChild.disabled && itemChild.disabled(record)))
                              "
                              @confirm="actionEvent(record, itemChild.func)"
                            >
                              <template #title>
                                {{
                                  itemChild.popConfirmText
                                    ? itemChild.popConfirmText(record)
                                    : t('common.confirmDel')
                                }}
                              </template>
                              <!-- 批量删除时候，不让删除   全局默认策略不让删除 -->
                              <a-button
                                :disabled="
                                  !(!isCheck && !(itemChild.disabled && itemChild.disabled(record)))
                                "
                                class="noradiuBtn"
                                type="text"
                              >
                                {{ itemChild.text }}
                              </a-button>
                            </a-popconfirm>
                          </template>

                          <!-- 编辑 -->
                          <template v-else>
                            <template v-if="itemChild.isVnode">
                              <component :is="itemChild.text(record)" />
                            </template>
                            <template v-else>
                              <a-tooltip placement="left" destroyTooltipOnHide>
                                <template
                                  #title
                                  v-if="
                                    itemChild.disabled &&
                                    itemChild.disabled(record) &&
                                    itemChild.tooltip
                                  "
                                >
                                  <span>
                                    {{
                                      isString(itemChild.tooltip)
                                        ? itemChild.tooltip
                                        : itemChild.tooltip(record)
                                    }}
                                  </span>
                                </template>
                                <a-button
                                  v-if="!(itemChild.hidden && itemChild.hidden(record))"
                                  class="noradiuBtn"
                                  :disabled="itemChild.disabled && itemChild.disabled(record)"
                                  type="text"
                                  :loading="itemChild.loading && itemChild.loading(record)"
                                  @click="actionEvent(record, itemChild.func)"
                                >
                                  {{
                                    isString(itemChild.text)
                                      ? itemChild.text
                                      : itemChild.text(record)
                                  }}
                                </a-button>
                              </a-tooltip>
                            </template>
                          </template>
                        </div>
                      </template>
                      <a-button type="text" class="iconBtn">
                        {{ item.text }}
                      </a-button>
                    </a-popover>
                  </template>
                  <!-- 编辑 -->
                  <template v-else>
                    <template v-if="item.isVnode">
                      <component :is="item.text(record)" />
                    </template>
                    <template v-else>
                      <a-tooltip placement="left" destroyTooltipOnHide>
                        <template
                          #title
                          v-if="item.disabled && item.disabled(record) && item.tooltip"
                        >
                          <span>
                            {{ isString(item.tooltip) ? item.tooltip : item.tooltip(record) }}
                          </span>
                        </template>
                        <a-button
                          v-if="!(item.hidden && item.hidden(record))"
                          class="noradiuBtn smallBtn"
                          :disabled="item.disabled && item.disabled(record)"
                          type="text"
                          :loading="item.loading && item.loading(record)"
                          @click="actionEvent(record, item.func)"
                        >
                          {{ isString(item.text) ? item.text : item.text(record) }}
                        </a-button>
                      </a-tooltip>
                    </template>
                  </template>
                  <div
                    class="line"
                    v-if="indexBtn !== action.actionList.length - 1 && action.actionList.length > 1"
                  >
                  </div>
                </template>
              </div>
            </template>
            <!-- 按钮组 end -->
          </template>
          <!--        对表格的操作动作end-->
        </template>
        <!--      非自定义渲染end-->
        <!--自定义slots start bodyCellcustom-->
        <slot
          name="bodyCellcustom"
          :text="text"
          :record="record"
          :index="index"
          :column="column"
        ></slot>
        <!--自定义slots end bodyCellcustom-->
      </template>
      <!--    是否有自定义显示slots end-->
      <template #headerCell="{ column, title }">
        <template v-if="!showColumsSet && column.is_last_columns">
          <div class="lastOption" :class="{ absColumn: column.customHead }">
            <span v-if="!column.customHead">{{ title }}</span>
            <drag-columns v-model:columns="proxyColumns" />
          </div>
        </template>
        <!--自定义slots start headerCellcustom-->
        <slot name="headerCellcustom" :title="title" :column="column"></slot>
        <!--自定义slots end headerCellcustom-->
      </template>
    </a-table>
    <!-- 全选 start -->
    <div class="selectAllTools" v-if="isCheck && allowCheckAll">
      <a-button
        type="text"
        @click="selectAllRows(true)"
        class="checkAll btnBorder"
        :class="{ actived: isSelectAll }"
      >
        {{ t('common.selectAll') }}
      </a-button>
      <a-button type="text" @click="selectAllRows(false)" class="uncheckAll btnBorder">
        {{ t('common.cancle') }}
      </a-button>
    </div>
    <!-- 全选 end -->
  </div>
</template>

<script lang="ts" setup>
  import {
    reactive,
    PropType,
    computed,
    watch,
    unref,
    ref,
    watchEffect,
    toRefs,
    createVNode,
    nextTick,
  } from 'vue';
  import { EllipsisOutlined } from '@ant-design/icons-vue';
  import { usePages } from '@/hooks';
  import { useRowSelection, useSelectAll } from './hooks';
  import { PageOption, ExtraFunc, DisbKeys, TableRowSelection } from './types';
  import { useSelectAll as useSelectAllStore } from '@/store/modules/select-all';
  import { TableColumn } from '@/types/tableColumn';
  import { useI18n } from 'vue-i18n';
  import dragColumns from './components/drag-columns';
  import { isString } from '@/utils/is';
  import { findLastIndex } from '@/utils/tools';
  import { cloneDeep } from 'lodash';
  const props = defineProps({
    columns: {
      // 表头信息
      type: Array as PropType<TableColumn[]>,
      required: true,
      default: () => [],
    },
    customRow: {
      // 单击行事件，用于单击弹出drawDetail抽屉事件
      type: Function as PropType<(...args: any[]) => any>,
    },
    getListFunc: {
      // 获取列表数据函数API
      type: Function as PropType<(params: any) => any>,
      required: true,
    },
    getCanSelectFunc: {
      // 获取可选数量
      type: Function as PropType<(record: any) => any>,
    },
    isCheck: {
      // 手否选中
      type: Boolean,
      default: false,
    },
    allowCheckAll: {
      // 是否允许全选
      type: Boolean,
      default: true,
    },
    rowKey: {
      // 表格唯一字段
      type: [String, Function] as PropType<string | ((record: any) => string)>,
      required: true,
    },
    pageOption: {
      // 分页参数
      type: Object as PropType<PageOption>,
      default: () => ({}),
    },
    arguments: {
      type: Object as PropType<Arguments>,
    },
    extraFunc: {
      type: Object as PropType<ExtraFunc>,
      default: () => ({
        sortVsb: false,
        dragRow: false,
        dragCol: false,
      }),
    },
    totalNum: {
      // 列表总数
      type: Number,
      default: 0,
    },
    disabledKeys: {
      // 禁用参数的数组
      type: Array as PropType<DisbKeys[]>,
      default: () => [],
    },
    scroll: Object,
    childrenColumnName: String,
    showColumsSet: Boolean,
    refreshRoundChange: Function,
    autoGetData: {
      type: Boolean,
      default: () => true,
    },
  });
  //表格
  const tableRef = ref<any>();
  const emit = defineEmits(['update:totalNum']);
  //将外部的columns统一转换成proxy对象 drag使用
  const proxyColumns = ref<any>(cloneDeep(props.columns));
  //统一处理columns table使用
  const columnsEllipsis = ref<any>([]);
  //监听drag的proxyColumns，改变table使用的columnsEllipsis
  watchEffect(() => {
    columnsEllipsis.value = [];
    proxyColumns.value = props.columns;
    proxyColumns.value.forEach((ele) => {
      //主动设置宽度
      if (!ele.width) {
        ele.width = 200;
      }
      //每一列可以拖动
      ele.resizable = true;
      //拖动最小100像素
      ele.minWidth = 100;
      //重制最后一列
      ele.is_last_columns = undefined;
      //设置超出三个点
      if (!ele.customRender) {
        ele.ellipsis = true;
      }

      if (!unref(ele.hidden)) {
        if (!ele.unChecked) {
          columnsEllipsis.value.push(ele);
        }
      }
    });

    const index = findLastIndex(proxyColumns.value, (ele: any) => !ele!.unChecked);
    proxyColumns.value[index].is_last_columns = true;
    proxyColumns.value[index].fixed = 'right';
  });
  const handleResizeColumn = (w, col) => {
    computedColumnWidth();
    col.width = w;
  };

  //重新计算宽度
  const computedColumnWidth = () => {
    if (tableRef.value.$el.getElementsByTagName('colgroup').length) {
      const cols = tableRef.value.$el
        .getElementsByTagName('colgroup')[0]
        .getElementsByTagName('col');
      const finalWidthArr: number[] = [];
      cols.forEach((ele) => {
        const styleStr = ele.getAttribute('style');
        const startIndex = styleStr.indexOf(': ');
        const endIndex = styleStr.indexOf('px');
        const result = styleStr.slice(startIndex + 1, endIndex);
        const className = ele.getAttribute('class');
        if (!className) {
          finalWidthArr.push(~~result);
        }
      });
      columnsEllipsis.value.forEach((ele, index) => {
        if (!ele.unChecked) {
          ele.width = finalWidthArr[index];
        }
      });
    }
  };
  const { t } = useI18n();

  //开启分页
  const pageOption = usePages(t);

  //表格动态选择列，初始化
  let dynaRowSelection = reactive<TableRowSelection>({
    rowSelection: undefined,
  });
  // 主机总数
  const totalCount = ref<number>(0);

  //表格数据源，行事件，分页，加载
  const state = reactive({
    dataSource: [], // 表格数据
    pageOption: Object.assign(pageOption.value, props.pageOption), // 表格分页，将两个pageOption合并
    loading: false, // 表格加载,
    field: undefined,
    order: undefined,
  });
  //表格刷新初始化
  const initTableData = () => {
    state.dataSource = [];
    emit('update:totalNum', undefined);
    state.pageOption.total = 0;
    state.pageOption.current = 1;
    state.pageOption.pageSize = 20;
  };

  //动态组件监听api变化，重绘表格
  watch(
    () => props.getListFunc,
    () => {
      initTableData();
      refreshTableData();
    },
  );

  const selectAllStore = useSelectAllStore();
  //获取全局是否全选
  const isSelectAll = computed(() => selectAllStore.isSelectAll);

  // 获取表格数据
  const refreshTableData = async (keepPage?: boolean, silence = false) => {
    if (document.getElementsByClassName('ant-table-body')[0]) {
      document.getElementsByClassName('ant-table-body')[0].scrollLeft = 0;
    }
    // state.dataSource = [];
    // keepPage:是否进行current或者pagesize操作，初始值默认是undefined
    // aru传递给过滤操作的参数
    // 初始化的时候keepPage===undefined走if的逻辑，当前页是第一页，pagesize是10。当页码变动的时候不走if
    if (!keepPage) {
      //初始化页数和当前页数量
      state.pageOption.current = 1;
      state.pageOption.pageSize = 20;
    }
    //表格入参
    const params: tableParams<any> = {
      page: {
        page_index: state.pageOption.current,
        page_size: state.pageOption.pageSize,
      },
      // 排序参数，有排序时
      orderby: state.field ? state.order + '' + state.field : undefined,
      // 过滤参数，有查询时
      filter: props.arguments!,
    };
    //有选择框&&全选清空 当前选项
    if (props.isCheck && unref(isSelectAll)) {
      if (dynaRowSelection.rowSelection) {
        dynaRowSelection.rowSelection!.selectedRowKeys = [];
      }
    }
    //表格loading
    if (!silence) {
      state.loading = true;
    }
    //请求表格数据
    const { items, page_index, code, total } = await props.getListFunc(params).finally(() => {
      state.loading = false;
    });
    if (code) {
      return false;
    }
    //在这里做全选操作
    if (unref(isSelectAll)) {
      useSelectAll(items ?? [], props.rowKey, props.disabledKeys);
    }
    //更新分页
    Object.assign(state.pageOption, {
      current: ~~page_index === 0 ? 1 : ~~page_index,
      // pageSize: ~~page_size,
      total: ~~total,
    });
    //赋值
    state.dataSource = items || [];

    //获取可选择总数。左侧选择打开
    //点击批量操作，允许全选操作，有禁用的选项，点击了全部选择。同时满足这四个条件执行if
    if (props.isCheck && props.allowCheckAll && props.disabledKeys.length && unref(isSelectAll)) {
      const { count } = await props.getCanSelectFunc!(props.arguments);
      totalCount.value = count ?? 0;
    } else {
      totalCount.value = total;
    }
    //有的表格需要条数总量，抛出总量
    if (props.totalNum !== undefined) {
      emit('update:totalNum', total);
    }
  };
  //请求表格数据
  props.autoGetData && refreshTableData();
  // 操作事件
  const actionEvent = async (record, func) => {
    // 将refreshTableData放入宏任务中,等待当前微任务拿到结果进行判断操作，再请求表格数据
    await func({ record, props }, (bool) => refreshTableData(bool));
  };
  // 分页，排序，筛选
  const paginationChange = (pagination, _, sorter) => {
    // pagination:是一个对象分页配置信息，包括current,pagesize,total等
    // filter:是一个对象过滤参数
    // sort:排序参数，返回结果包括：
    // column:当前列的表头信息
    // columnKey
    // field:dataIndex索引项的值是一个string
    // order:descend降序   ascend升序  undefined没有排序
    // currentDataSource:当前行信息+当前操作状态，返回结果有两个：action:'sort/paginate/filter'表示当前执行的操作。Array()当前行信息
    // if (props.timer) {
    //   clearInterval(timer);
    // }
    props.refreshRoundChange && props.refreshRoundChange();
    let { field, order } = sorter;
    field = order ? field : undefined;
    // 升序order='+'  降序order='-'
    order = order === 'ascend' ? '+' : order === 'descend' ? '-' : undefined;
    // state.pageOption = {
    //   ...state.pageOption,
    //   ...pagination,
    // };
    state.pageOption = Object.assign({}, state.pageOption, pagination);
    state.field = field;
    state.order = order;
    //   执行任何一个操作之后都刷新列表数据
    refreshTableData(true);
  };

  //初始化有选择
  if (props.isCheck) {
    dynaRowSelection.rowSelection = useRowSelection(
      props.rowKey,
      props.isCheck,
      props.disabledKeys,
    );
  }
  watch(
    [() => props.isCheck, () => props.rowKey, () => props.disabledKeys],
    () => {
      dynaRowSelection.rowSelection = useRowSelection(
        props.rowKey,
        props.isCheck,
        props.disabledKeys,
      );
      props.isCheck && document.querySelector('.ant-table-body')?.scrollTo(0, 0);
    },
    {
      deep: true,
    },
  );

  //全选和取消全选
  const selectAllRows = (type) => {
    //更新仓库是否全选
    selectAllStore.setIselectAll(type);
    //取消全选 初始化未选的  和  已选的
    selectAllStore.InitExclude();
    dynaRowSelection.rowSelection!.selectedRowKeys = [];
    //重绘表格，getcheckprops重绘
    refreshTableData(true);
  };
  //选择的最终数量

  //获取取消选择的ids
  const excludeHostIds: any = computed(() => selectAllStore.exclude);
  //最终选择条数（全选）
  const selectAllNumber = computed(() => {
    if (unref(isSelectAll)) {
      return unref(totalCount) - unref(excludeHostIds).length;
    } else {
      if (props.isCheck) {
        if (dynaRowSelection.rowSelection) {
          return dynaRowSelection.rowSelection!.selectedRowKeys.length;
        }
        return 0;
      }
      return 0;
    }
  });

  //处理switch的逻辑
  const toogleEnable = (event, record, func) => {
    func({ record, event }, refreshTableData);
  };

  //自动选择
  const initSelectRow = (selectedRowKeys) => {
    nextTick(() => {
      dynaRowSelection.rowSelection!.selectedRowKeys = selectedRowKeys;
    });
  };
  defineExpose({
    refreshTableData,
    ...toRefs(dynaRowSelection),
    selectAllNumber,
    initSelectRow,
  });
</script>

<style lang="less" scoped>
  ::v-deep(.ant-table .ant-table-title) {
    display: flex;

    .ant-btn {
      margin-right: 10px;
    }
  }

  // ::v-deep(.ant-table-footer) {
  //   position: absolute;
  // }
  .actived {
    background: #18ba79;
    color: #fff !important;

    &:hover {
      color: #fff !important;
    }
  }

  .btnBorder {
    border: 1px solid #eee;
    margin-right: 15px;
  }

  .tableContent {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;

    .selectAllTools {
      position: absolute;
      bottom: 10px;
      left: 16px;
    }
  }

  .customPage {
    display: flex;
    padding: 8px;
    justify-content: flex-end;
    background: #fff;

    .nextPage {
      margin: 0 16px;
    }
  }

  // .iconBtn {
  //   padding-top: 0;
  //   padding-bottom: 0;
  //   height: unset;
  // }
  .lastOption {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .absColumn {
    position: absolute;
    right: 0;
  }

  .btnGroups {
    border: 1px solid #eee;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;

    .smallBtn {
      padding: 4px 10px;
    }

    .line {
      width: 1px;
      height: 8px;
      background-color: #eee;
    }
  }
</style>

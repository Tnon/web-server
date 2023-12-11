/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-29 09:31:11
 * @LastEditTime: 2022-12-09 18:18:19
 */
import type { App } from 'vue';
import uploader from 'vue-simple-uploader';
import 'vue-simple-uploader/dist/style.css';
import {
  ConfigProvider,
  Modal,
  Table,
  Menu,
  Input,
  Form,
  Checkbox,
  Radio,
  Pagination,
  Switch,
  Button,
  Select,
  Popover,
  DatePicker,
  TreeSelect,
  Badge,
  Timeline,
  Popconfirm,
  Spin,
  Drawer,
  Tree,
  Tooltip,
  Upload,
  Layout,
  Avatar,
  Image,
  Row,
  Col,
  Cascader,
  Progress,
  TimePicker,
  InputNumber,
  Tag,
  Slider,
  Collapse,
  Empty,
  AutoComplete,
  Statistic,
} from 'ant-design-vue';
export function setupAntd(app: App<Element>) {
  app
    .use(Layout)
    .use(Tag)
    .use(Progress)
    .use(Cascader)
    .use(Row)
    .use(Col)
    .use(Image)
    .use(Upload)
    .use(Avatar)
    .use(Tree)
    .use(Tooltip)
    .use(ConfigProvider)
    .use(Spin)
    .use(TreeSelect)
    .use(DatePicker)
    .use(TimePicker)
    .use(Form)
    .use(Input)
    .use(Modal)
    .use(Select)
    .use(Table)
    .use(Menu)
    .use(Checkbox)
    .use(Radio)
    .use(Switch)
    .use(Pagination)
    .use(Button)
    .use(Popover)
    .use(Popconfirm)
    .use(Badge)
    .use(Drawer)
    .use(InputNumber)
    .use(Timeline)
    .use(Collapse)
    .use(Empty)
    .use(Slider)
    .use(AutoComplete)
    .use(Statistic)
    .use(uploader);
}

<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-07-21 11:28:48
 * @LastEditTime: 2021-10-12 15:14:53
-->
<template>
  <div @click="NewTag" style="cursor: pointer">
    <div v-if="tag === '-'" :class="{ isAddTag: tag === '-' }">
      <PlusOutlined class="addtag" />
      <span class="notag">{{ tag }}</span>
    </div>
    <div class="editTag" v-else>
      <span class="comCls tagName">{{ tag }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, unref } from 'vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { useModal } from '@/hooks';
  import { hostTags } from '@/api/asset/hostInfo/host';
  import addTag from './tag.vue';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    tag: String,
    host_id: {
      type: String,
      required: true,
    },
    reload: Function,
  });
  const { t } = useI18n();
  const NewTag = () => {
    const isRename = !(props.tag === '-');
    useModal(
      {
        title: !isRename ? t('asset.newTag') : t('asset.modTag'),
        contentProps: {
          fields: reactive({ tagName: !isRename ? '' : props.tag }),
        },
        handleOk: async (conRef) => {
          await unref(conRef.slotsForm).validate();
          await hostTags(
            {
              tag: conRef.fields.tagName!,
              host_id: props.host_id,
            },
            !isRename ? 'tagAddSuc' : 'tagUpSuc',
          );
          props.reload!(true);
        },
      },
      addTag,
    );
  };
</script>

<style lang="less" scoped>
  .isAddTag {
    cursor: pointer;
    position: relative;
    height: 24px;
    .addtag {
      transition: all 0.3s;
      position: absolute;
      top: 5px;
      opacity: 0;
      transform: scale(0);
    }
    .notag {
      transition: all 0.3s;
      opacity: 1;
      transform: scale(1);
      width: 14px;
      height: 14px;
      display: inline-block;
      position: absolute;
      line-height: 14px;
      top: 5px;
      text-align: center;
    }
    &:hover {
      .addtag {
        opacity: 1;
        transform: scale(1);
      }
      .notag {
        opacity: 0;
        transform: scale(0);
      }
    }
  }
  .editTag {
    transition: all 0.3s;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover {
      padding-left: 3px;
    }
  }
  // .editTag {
  //   position: relative;
  //   min-width: 30px;
  //   min-height: 30px;
  //   .comCls {
  //     display: inline-block;
  //     transition: all 0.3s;
  //     position: absolute;
  //   }
  //   .editIcon {
  //     transform: scale(0);
  //     opacity: 0;
  //   }
  //   .tagName {
  //     transform: scale(1);
  //     opacity: 1;
  //   }
  //   &:hover {
  //     .editIcon {
  //       transform: scale(1) !important;
  //       opacity: 1 !important;
  //     }
  //     .tagName {
  //       transform: scale(0) !important;
  //       opacity: 0 !important;
  //     }
  //   }
  // }
</style>

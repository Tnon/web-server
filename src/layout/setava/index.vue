<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-06-16 11:13:12
 * @LastEditTime: 2023-08-14 10:14:01
-->
<template>
  <div class="avaCon">
    <SettingOutlined
      v-if="hasPerimission('setting')"
      class="setIcon"
      :class="actived.activedS ? 'actived' : ''"
      @click="linkTo('setting')"
    />
    <!-- -->

    <a-popover
      trigger="click"
      placement="rightBottom"
      destroyTooltipOnHide
      overlayClassName="popNoPad"
      :open="popVisible"
      @openChange="openChange"
    >
      <template #content>
        <avatarMenus :avatarUrl="avatarUrl" @closePop="popVisible = false">
          <div @click="linkTo('avatar')" class="accSet">
            {{ t('avatar.accSet') }}
          </div>
        </avatarMenus>
      </template>
      <a-avatar
        @click="popVisible = true"
        class="avatar"
        :src="avatarUrl"
        :class="actived.activedA ? 'actived' : ''"
      >
        <template #icon>
          <showAvatar :name="userName" />
        </template>
      </a-avatar>
    </a-popover>
  </div>
</template>
<script lang="ts" setup>
  import { SettingOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { watch, ref, reactive, computed, unref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useUserToken } from '@/store/modules/user';
  import { useLicense } from '@/store/modules/license-auth';
  import avatarMenus from './components/avatarMenus';
  import { useI18n } from 'vue-i18n';
  import { useModal } from '@/hooks';
  import licenseModal from './components/licenseModal';
  import { hasPerimission } from '@/utils/permission';
  import showAvatar from '@/components/showAvatar';
  const { t } = useI18n();
  //手动控制pop
  const popVisible = ref<boolean>(false);
  //路由跳转
  const router = useRouter();
  const currentRoute = useRoute();
  //设置 还是 头像
  const actived = reactive({
    activedS: (currentRoute.name as string).indexOf('setting-') > -1,
    activedA: (currentRoute.name as string).indexOf('avatar-') > -1,
  });
  //关闭pop 跳转路由
  const linkTo = (name) => {
    popVisible.value = false;
    router.push({ name });
  };
  // 跟随页面路由变化，切换菜单选中状态
  watch(
    () => currentRoute.fullPath,
    () => {
      actived.activedS = false;
      actived.activedA = false;
      if ((currentRoute.name as string).indexOf('setting-') > -1) {
        actived.activedS = true;
      } else if ((currentRoute.name as string).indexOf('avatar-') > -1) {
        actived.activedA = true;
      }
    },
  );
  const userTokenStore = useUserToken(),
    licenseStore = useLicense();
  //头像
  const avatarUrl = computed(() => userTokenStore.userAvatar);
  //名字
  const userName = computed(() => userTokenStore.userName);
  const openChange = (v) => {
    popVisible.value = v;
  };

  //授权过期判断
  const authStatus = computed(() => licenseStore.authStatus);
  //剩余15天
  const lic_rmday = computed(() => licenseStore.lic_rmday);
  if (unref(lic_rmday) && unref(lic_rmday) <= 15) {
    message.warn(t('message.lice15Ub', [unref(lic_rmday)]));
  }
  const { flag } = authStatus.value;
  if (flag !== 'Authorized') {
    useModal(
      {
        title: t('license.authInfo'),
        footer: false,
        width: 400,
        wrapClassName: 'modalBodyNopad',
      },
      licenseModal,
    );
  }
</script>
<style lang="less" scoped>
  .avaCon {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fafafa;
    .setIcon {
      font-size: @fz18;
      cursor: pointer;
    }
    .actived {
      color: #18ba79;
    }
    .avatar {
      margin-top: 28px;
      cursor: pointer;
    }
  }
</style>

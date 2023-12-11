<template>
  <div class="box">
    <div class="content bk_br_sd">
      <div class="lmenus">
        <a-avatar class="avatar" :src="avatatUrl">
          <template #icon>
            <showAvatar :name="userInfo.name!" />
          </template>
        </a-avatar>
        <h3 class="name">{{ userInfo.name }}</h3>
        <div>
          <span class="role">
            {{ getRoleName(userInfo.u_type!, t) }}
          </span>
        </div>
      </div>
      <div class="tabs">
        <template v-for="item in tabs" :key="item.key">
          <div class="nodes" @click="actived = item.key" :class="{ actived: actived === item.key }">
            {{ t(item.title) }}
          </div>
          <!-- userInfo.u_src === 1 -->
        </template>
      </div>
    </div>
    <div class="rcontent bk_br_sd">
      <self-msg :avatatUrl="avatatUrl" :userInfo="userInfo" v-if="actived === 'msg'" />
      <self-pwd v-else-if="actived === 'pwd'" />
      <self-lang v-else />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import showAvatar from '@/components/showAvatar';
  import { selfPwd, selfMsg, selfLang } from './components';
  import { useUserToken } from '@/store/modules/user';
  import { useI18n } from 'vue-i18n';
  import { getRoleName } from '@/layout/setava/components/avatarMenus';
  const { t } = useI18n();
  const userTokenStore = useUserToken();
  const actived = ref<string>('msg');
  const tabs = [
    {
      title: 'setting.perInfo',
      key: 'msg',
    },
    {
      title: 'setting.pwdSeting',
      key: 'pwd',
    },
    {
      title: 'setting.languageSeting',
      key: 'lang',
    },
  ];
  //头像
  const avatatUrl = computed(() => userTokenStore.userAvatar);
  //用户信息
  const userInfo = computed(() => userTokenStore.user_info);
</script>
<style lang="less" scoped>
  .box {
    display: flex;
    margin: 12px 24px;
    .content {
      margin-right: 24px;
      height: calc(100vh - 24px);
    }
    .tabs {
      background: #fff;
      .nodes {
        height: 50px;
        line-height: 50px;
        padding: 0 16px;
        cursor: pointer;
      }
      .actived {
        color: #19be6b;
        background: #edfff3;
        border-right: 2px solid #19be6b;
      }
    }
    .lmenus {
      width: 260px;
      padding: 30px;
      background: #fff;
      text-align: center;
      margin-bottom: 16px;
      .avatar {
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: @fz30;
      }
      .name {
        margin: 16px 0;
      }
      .role {
        display: inline-block;
        font-size: @fz12;
        color: #00be2d;
        padding: 3px 5px;
        background: #ebfaef;
        border: 1px solid #00be2d;
        border-radius: 2px;
      }
    }
  }
  .rcontent {
    width: 900px;
    padding: 0 24px;
  }
</style>

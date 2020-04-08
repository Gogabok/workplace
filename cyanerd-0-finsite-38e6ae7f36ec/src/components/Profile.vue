<template>
    <div>
        <div class="account-container" v-if="user">
            <div class="status" :class="status.color"></div>
            <div class="profile-picture-container">
                <div class="profile-picture" :class="status.picture"></div>
            </div>
            <div class="phone-number">{{user.phone.formatted}}</div>
            <div class="description">{{status.description}}</div>
            <div class="sub-description" v-if="status.subDescription">{{status.subDescription}}</div>
            <router-link class="button green" to="/">Вернуться к чтению</router-link>
        </div>
        <div class="button outlined" @click="openPasswordChangeModal">Сменить пароль</div>
        <template v-if="user && user.payment">
            <div v-if="user.payment.type === 1 || user.payment.type === 2"
                 @click="cancelSubscription"
                 class="button outlined"
                 style="margin-top: 10px;"
            >
                Отключить услугу
            </div>
        </template>
    </div>
</template>
<script>
  import eventsBus from '@/api/events';
  import request from '@/api/axios';

  export default {
    data: () => {
      return {
        statuses: {
          1: {
            color: 'green',
            picture: 'profile-picture-0',
            description: 'Услуга подключена и оплачена'
          },
          2: {
            color: 'yellow',
            picture: 'profile-picture-1',
            description: 'Услуга подключена, но не оплачена',
            subDescription: 'Стоимость услуги 10 руб.в день'
          },
          3: {
            color: 'red',
            picture: 'profile-picture-2',
            description: 'Услуга отключена',
            subDescription: 'Стоимость услуги 10 руб.в день'
          }
        }
      }
    },
    mounted() {
      eventsBus.$emit('page-ready');
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      status() {
        return this.statuses[this.$store.state.user?.payment.type];
      }
    },
    methods: {
      openPasswordChangeModal() {
        eventsBus.$emit('show-modal', 'passwordChange');
      },
      cancelSubscription() {
        this.user.payment.type = 3;
        request({action: 'cancel'});
      }
    },
    created() {
      document.body.classList.remove('active-menu');
    }
  }
</script>
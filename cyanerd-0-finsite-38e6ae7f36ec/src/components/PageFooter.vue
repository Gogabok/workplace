<template>
    <footer>
        <div class="offer">
            <a href="#">Оферта</a>
        </div>
        <div class="footer-text">
            Свяжитесь с нами через
            <router-link to="/feedback">форму обратной</router-link>
            связи или написав на почту <a
                :href="'mailto:' + $config.site.email">{{ $config.site.email }}</a>
        </div>
        <div class="modal-container profile-container" v-if="modal !== false">
            <div class="modal-wrapper">
                <div>
                    <password-change-form v-if="modal === 'passwordChange'" v-click-outside="closeOutside"/>
                    <div class="modal exit-modal" v-if="modal === 'logout'" v-click-outside="closeOutside">
                        <div class="caption">Вы уверены, что хотите выйти?</div>
                        <div class="exit-buttons-container input-group">
                            <a href="#" @click.prevent="close" class="button blue">Остаться</a>
                            <a href="#" @click.prevent="logout" class="button black">Выйти</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
  import PasswordChangeForm from '@/components/PasswordChangeForm';
  import eventsBus from '@/api/events';
  import request from '@/api/axios';

  export default {
    data: () => {
      return {
        modal: false,
        attemptsToClose: 0
      }
    },
    components: {
      PasswordChangeForm
    },
    created() {
      eventsBus.$on('show-modal', type => {
        this.opens(type);
      });
      eventsBus.$on('close-modal', () => {
        this.close();
      });
    },
    methods: {
      async logout() {
        await request({action: 'logout'});
        this.$router.push('/');
        this.$store.commit('logout');
      },
      close() {
        this.modal = false;
        this.attemptsToClose = 0;
      },
      closeOutside() {
        if (++this.attemptsToClose > 1) {
          this.close();
        }
      },
      opens(type) {
        this.modal = type;
      }
    }
  }
</script>
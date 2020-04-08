<template>
    <div class="modal change-password-modal">
        <div class="caption">Изменение пароля</div>
        <form method="post" autocomplete="off" class="enter-form">
            <div class="input-containers" :class="{'input-containers-error':error}">
                <div class="success-container"></div>
                <div class="input-group">
                    <input :type="passwordType" placeholder="Новый пароль" v-model="password">
                    <input-success/>
                    <input-error/>
                    <template v-if="password.length">
                        <a
                                href="#"
                                @click.prevent="passwordType = 'text'"
                                v-if="passwordType === 'password'"
                                class="show-password"
                        ></a>
                        <a
                                href="#"
                                @click.prevent="passwordType = 'password'"
                                v-if="passwordType === 'text'"
                                class="hide-password"
                        ></a>
                    </template>
                </div>
                <div class="input-group">
                    <input :type="passwordConfirmType" placeholder="Новый пароль еще раз" v-model="passwordConfirm">
                    <input-success/>
                    <input-error/>
                    <template v-if="passwordConfirm.length">
                        <a
                                href="#"
                                @click.prevent="passwordConfirmType = 'text'"
                                v-if="passwordConfirmType === 'password'"
                                class="show-password"
                        ></a>
                        <a
                                href="#"
                                @click.prevent="passwordConfirmType = 'password'"
                                v-if="passwordConfirmType === 'text'"
                                class="hide-password"
                        ></a>
                    </template>
                </div>
                <div class="input-group button-group">
                    <input type="submit" :value="error.message || 'Сохранить'" class="button blue"
                           @click.prevent="handleSubmit">
                    <div>
                        <div @click.prevent="close" class="button black">Закрыть</div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
  import InputError from '@/components/base/InputError';
  import InputSuccess from '@/components/base/InputSuccess';
  import eventsBus from '@/api/events';
  import request from '@/api/axios';

  export default {
    data: () => {
      return {
        password: '',
        passwordType: 'password',
        passwordConfirmType: 'password',
        passwordConfirm: '',
        error: false
      }
    },
    components: {
      InputError,
      InputSuccess
    },
    watch: {
      password: function () {
        this.error = false;
      },
      passwordConfirm: function () {
        this.error = false;
      }
    },
    methods: {
      close() {
        eventsBus.$emit('close-modal');
      },
      async handleSubmit() {
        if (!this.password) {
          this.error = {message: 'Введите пароль'};
          return false;
        }

        if (!this.passwordConfirm) {
          this.error = {message: 'Подтвердите пароль'};
          return false;
        }

        if (this.password !== this.passwordConfirm) {
          this.error = {message: 'Ошибка подтверждения пароля'};
          return false;
        }

        let response = await request({
          action: 'change_password',
          options: {
            phone: this.user.phone.original,
            password: this.password
          }
        });
        console.log(response);
      }
    }
  }
</script>
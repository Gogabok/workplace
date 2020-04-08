<template>
    <div class="account-container enter-container">
        <template v-if="step === 1">
            <div class="enter-caption">Вход и регистрация</div>
            <div class="enter-description">
                Введите ваш номер телефона для входа или регистрации нового пользователя
            </div>
            <form class="enter-form" autocomplete="off">

                <div class="input-containers" :class="{'input-containers-error':error}">
                    <div class="input-group">
                        <input
                                type="tel"
                                v-model="phone"
                                placeholder="Номер телефона"
                                v-mask="'+7 (###) ### - ## - ##'"
                        >
                        <input-success/>
                        <input-error/>
                    </div>

                    <div class="input-group button-group">
                        <input
                                type="submit"
                                :value="error.message || 'Продолжить'"
                                class="button blue"
                                @click.prevent="handleSubmit"
                        >
                    </div>
                </div>
            </form>
        </template>

        <template v-if="step === 2">
            <div class="enter-caption">Регистрация</div>
            <div class="enter-description">
                Данный номер еще не зарегистрирован. Задайте пароль для входа
            </div>
            <form method="post" class="enter-form" autocomplete="off">

                <div class="input-containers" :class="{'input-containers-error':error}">
                    <div class="input-group">
                        <div class="relative mt-30px">
                            <input
                                    type="password"
                                    placeholder="Пароль"
                                    v-model="password"
                            >
                            <input-success/>
                            <input-error/>
                        </div>
                        <div class="relative mt-30px">
                            <input
                                    type="password"
                                    placeholder="Пароль еще раз"
                                    v-model="passwordConfirm"
                            >
                            <input-success/>
                            <input-error/>
                        </div>
                    </div>

                    <div class="input-group button-group">
                        <input
                                type="submit"
                                :value="error.message || 'Зарегистрироваться'"
                                class="button blue"
                                @click.prevent="handleSubmit"
                        >
                    </div>
                </div>
            </form>
        </template>

        <template v-if="step === 3">
            <div class="enter-caption">Вход</div>
            <div class="enter-description">
                Данный номер уже зарегистрирован. Введите пароль для входа
            </div>
            <form method="post" class="enter-form" autocomplete="off">

                <div class="input-containers" :class="{'input-containers-error':error}">
                    <div class="input-group">
                        <div class="relative mt-30px">
                            <input
                                    type="password"
                                    placeholder="Пароль"
                                    v-model="password"
                            >
                            <input-success/>
                            <input-error/>
                        </div>
                    </div>

                    <div class="input-group button-group">
                        <input
                                type="submit"
                                :value="error.message || 'Войти'"
                                class="button blue"
                                @click.prevent="handleSubmit"
                        >
                        <a href="#" @click.prevent="step = 4">Забыл пароль</a>
                    </div>
                </div>
            </form>
        </template>

        <template v-if="step === 4">
            <div class="enter-caption">Восстановление доступа</div>
            <div class="enter-description">
                Чтобы создать новый пароль введите код из смс
            </div>
            <form method="post" class="enter-form" autocomplete="off">

                <div class="input-containers" :class="{'input-containers-error':error}">
                    <div class="input-group">
                        <div class="relative mt-30px">
                            <input
                                    type="text"
                                    placeholder="Код"
                                    v-model="code"
                                    v-mask="'####'"
                            >
                            <input-success/>
                            <input-error/>
                        </div>
                    </div>

                    <div class="input-group button-group">
                        <input
                                type="submit"
                                :value="codeSubmitButton"
                                class="button blue"
                                @click.prevent="sendCode"
                                :disabled="codeSubmitDisabled"
                                v-show="code.length !== 4"
                        >
                        <input
                                type="submit"
                                :value="error.message || 'Продолжить'"
                                class="button blue"
                                @click.prevent="handleSubmit"
                                v-show="code.length === 4"
                        >
                    </div>
                </div>
            </form>
        </template>

        <template v-if="step === 5">
            <div class="enter-caption">Восстановление доступа</div>
            <div class="enter-description">
                Задайте новый пароль для входа
            </div>
            <form method="post" class="enter-form" autocomplete="off">

                <div class="input-containers" :class="{'input-containers-error':error}">
                    <div class="input-group">
                        <div class="relative mt-30px">
                            <input
                                    type="password"
                                    placeholder="Пароль"
                                    v-model="password"
                            >
                            <input-success/>
                            <input-error/>
                        </div>
                        <div class="relative mt-30px">
                            <input
                                    type="password"
                                    placeholder="Пароль еще раз"
                                    v-model="passwordConfirm"
                            >
                            <input-success/>
                            <input-error/>
                        </div>
                    </div>

                    <div class="input-group button-group">
                        <input
                                type="submit"
                                :value="error.message || 'Войти'"
                                class="button blue"
                                @click.prevent="handleSubmit"
                        >
                    </div>
                </div>
            </form>
        </template>
    </div>
</template>
<script>
  import InputError from '@/components/base/InputError';
  import InputSuccess from '@/components/base/InputSuccess';
  import request from '@/api/axios';
  import eventsBus from '@/api/events';

  export default {
    data: () => {
      return {
        phone: '',
        password: '',
        passwordConfirm: '',
        code: '',
        step: 1,
        error: false,
        time: 30,
        seconds: 30,
        codeSubmitDisabled: true
      }
    },
    components: {
      InputError,
      InputSuccess
    },
    computed: {
      codeSubmitButton: function () {
        if (this.time === 0) return 'Отправить еще раз';
        return 'Отправить еще раз 0:' + (this.time > 9 ? this.time : '0' + this.time);
      }
    },
    watch: {
      phone: function () {
        this.error = false;
      },
      password: function () {
        this.error = false;
      },
      passwordConfirm: function () {
        this.error = false;
      },
      code: function () {
        this.error = false;
      },
      step: function (newStep, oldStep) {
        if (newStep === 4 && oldStep !== 4) {
          this.sendCode();
        }
      }
    },
    mounted() {
      eventsBus.$emit('page-ready');
    },
    methods: {
      async handleSubmit() {
        let phone = this.phone.replace(/\s|\(|\)|-/g, '');

        if (this.step === 1) {

          if (phone.length !== 12) {
            if (phone.length === 0) {
              this.error = {message: 'Введите номер телефона'};
              return false;
            }
            this.error = {message: 'Номер указан неверно'};
            return false;
          }

          const checkUser = (await request({action: 'check_phone', options: {phone}})).data;
          if (checkUser.status === false) {
            this.error = {message: 'У вас не Tele2 :('};
            return false;
          } else {
            if (checkUser.login === true) { // user exists
              this.step = 3;
              return false;
            }
            if (checkUser.exists === true) { // ussd account
              this.step = 5;
              return false;
            }
            this.step = 2;
            return false;
          }
        }

        if (this.step === 2 || this.step === 5) {
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

          let response = null;
          if (this.step === 2) {
            response = await request({
              action: 'register',
              options: {
                phone,
                password: this.password
              }
            });
          }
          if (this.step === 5) {
            response = await request({
              action: 'change_password',
              options: {
                phone,
                password: this.password
              }
            });
          }

          this.$store.commit('login', response);
          this.$router.push('/profile');
          return false;
        }

        if (this.step === 3) {
          if (this.password.length === 0) {
            this.error = {message: 'Введите пароль'};
            return false;
          }

          const login = (await request({action: 'login', options: {phone, password: this.password}})).data;
          if (login.status === false) {
            this.error = {message: 'Пароль неверный'};
            return false;
          }

          this.$store.commit('login', login.user);
          this.$router.push('/profile');
        }

        if (this.step === 4) {
          let isCodeValid = (await request({action: 'reset_password', options: {phone, code: this.code}})).data;
          if (isCodeValid.status === false) {
            this.error = {message: 'Код неверный'};
            return false;
          }
          this.step = 5;
          return false;
        }
      },
      async sendCode() {
        this.startTimer();
        let phone = this.phone.replace(/\s|\(|\)|-/g, '');
        return await request({action: 'reset_password', options: {phone}});
      },
      startTimer() {
        this.time = this.seconds;
        this.codeSubmitDisabled = true;
        let interval = setInterval(() => {
          this.time--;
          if (this.time <= 0) {
            clearInterval(interval);
            this.codeSubmitDisabled = false;
          }
        }, 1000);
      }
    }
  }
</script>
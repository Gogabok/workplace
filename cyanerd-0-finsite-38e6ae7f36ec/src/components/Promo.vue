<template>
    <div>
        <div class="main-container">
            <header>
                <h1>{{ $config.site.title }}</h1>
            </header>
            <div class="desc">Финансовые статьи<br> и лайфхаки у вас в кармане</div>
            <ul class="advantages">
                <li>коротко</li>
                <li>уникально</li>
                <li>актуально</li>
            </ul>
            <div class="input-containers" :class="{
              'input-containers-error': response.type === 'error',
              'input-containers-gray': response.type === 'gray',
              'input-containers-complete': response.type === 'complete'
            }">
                <form class="login-form" autocomplete="off">
                    <template v-if="step === 1">
                        <div class="input-container">
                            <input
                                    v-mask="'+7 (###) ### - ## - ##'"
                                    v-model="phone"
                                    type="tel"
                                    placeholder="+7 (999) 123 - 45 - 67"
                                    class="text-input"
                            >
                            <input-success :class="{active: '+7 (999) 123 - 45 - 67'.length === phone.length && response.type !== 'error'}" />
                            <input-error/>
                        </div>
                        <div class="input-container">
                            <input
                                    type="submit"
                                    :value="response.message || 'Вперед'"
                                    @click.prevent="handleSubmit"
                            >
                        </div>
                    </template>

                    <template v-if="step === 2 ">
                        <div class="input-container">
                            <input
                                    type="text"
                                    placeholder="Введите код из SMS"
                                    class="text-input"
                                    v-mask="'####'"
                                    v-model="code"
                            >
                            <input-success :class="{active: code.length === 4 && response.type !== 'error'}" />
                            <input-error/>
                        </div>
                        <div class="input-container">
                            <input
                                    type="submit"
                                    :value="codeSubmitButton"
                                    class="gray disabled"
                                    @click.prevent="sendCode"
                                    :disabled="codeSubmitDisabled"
                                    v-show="code.length !== 4"
                            >
                            <input
                                    type="submit"
                                    :value="response.message || 'Начать читать'"
                                    @click.prevent="handleSubmit"
                                    v-show="code.length === 4"
                            >
                        </div>
                    </template>
                </form>
            </div>
            <div class="free active">Первые 3 дня бесплатно</div>
            <div id="change-phone">Изменить телефон</div>
            <footer>
                Нажимая на кнопку «Начать читать» и подтверждая номер телефона кодом<br> из SMS, Вы соглашаетесь с
                подключением
                сервиса «Финсайт» и его<br> <a href="/upload/oferta.pdf" target="_blank">условиями</a>.
                Стоимость
                услуги 10 рублей в день, оплата со счета телефона. <br>Первые 3 дня предоставляются бесплатно.
            </footer>
        </div>
    </div>
</template>
<script>
  import InputError from '@/components/base/InputError';
  import InputSuccess from '@/components/base/InputSuccess';
  import request from '@/api/axios';

  export default {
    data: () => {
      return {
        phone: '',
        code: '',
        step: 1,
        response: false,
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
        this.response = false;
      },
      code: function () {
        this.response = false;
      },
      step: function (newStep, oldStep) {
        if (newStep === 2 && oldStep !== 2) {
          this.startTimer();
        }
      }
    },
    methods: {
      async handleSubmit() {
        let phone = this.phone.replace(/\s|\(|\)|-/g, '');

        if (this.step === 1) {

          if (phone.length !== 12) {
            if (phone.length === 0) {
              this.response = {message: 'Введите номер телефона', type: 'error'};
              return false;
            }
            this.response = {message: 'Номер указан неверно', type: 'error'};
            return false;
          }

          const checkUser = (await request({action: 'check_phone', options: {phone}})).data;
          if (checkUser.status === false) {
            this.response = {message: 'У вас не Tele2 :(', type: 'gray'};
            return false;
          } else {
            if (checkUser.login === true) { // user exists
              // todo тут нужно кинуть пользователя на форму ввода пароля (login step 2)
              return false;
            }
            if (checkUser.exists === true) { // ussd account
              // todo тут нужно кинуть пользователя на форму ввода пароля (login step N)
              return false;
            }
            this.step = 2;
            return false;
          }
        }

        if (this.step === 2) {
          if (this.response?.type === 'complete') return false;

          let isCodeValid = (await request({action: 'check_code', options: {phone, code: this.code}})).data;
          if (isCodeValid.status === false) {
            this.response = {message: 'Код неверный', type: 'error'};
            return false;
          }

          this.response = {message: 'Подписка оформлена', type: 'complete'};
          setTimeout(() => {
            this.$router.push('/');
          }, 1000);
        }
      },
      async sendCode() {
        this.startTimer();
        let phone = this.phone.replace(/\s|\(|\)|-/g, '');
        return await request({action: 'check_phone', options: {phone}});
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

<style scoped>
    @font-face {
        font-family: 'YesevaOne';
        src: url('/fonts/YesevaOne-Regular.eot');
        src: local('☺'), url('/fonts/YesevaOne-Regular.woff') format('woff'), url('/fonts/YesevaOne-Regular.ttf') format('truetype'), url('/fonts/YesevaOne-Regular.svg') format('svg');
        font-weight: normal;
        font-style: normal;
    }

    body, html, ul, li {
        padding: 0;
        margin: 0;
        position: relative;
    }

    * {
        box-sizing: border-box;
    }

    li {
        list-style: none;
    }

    body {
        background-color: #111;
        color: #fff;
        font-family: 'Roboto', sans-serif;
    }

    .main-container {
        max-width: 450px;
        margin: 0 auto;
        position: relative;
        padding: 0 16px;
    }

    header {
        margin-top: 24px;
        margin-bottom: 20px;
    }

    header h1 {
        font-family: 'YesevaOne' !important;
        font-size: 32px;
        line-height: 37px;
        text-align: center;
        font-weight: normal;
        margin: 0;
        color: #fff;
    }

    .desc {
        font-size: 20px;
        line-height: 24px;
        background-image: url('/img/bg.png');
        background-repeat: no-repeat;
        background-position: center top;
        font-weight: 900;
        padding-top: 180px;
        text-align: center;
    }

    ul.advantages {
        font-weight: 300;
        font-size: 12px;
        line-height: 20px;
        display: flex;
        margin-top: 8px;
        justify-content: center;
    }

    ul.advantages li {
        margin-left: 10px;
        position: relative;
        padding-left: 10px;
    }

    ul.advantages li:before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        background-color: #fff;
        border-radius: 100%;
        position: absolute;
        left: -2px;
        top: 50%;
        margin-top: -1px;
    }

    ul.advantages li:first-child {
        margin-left: 0;
    }

    ul.advantages li:first-child:before {
        display: none;
    }

    form.login-form {
        margin-top: 20px;
    }

    form.login-form .input-container {
        position: relative;
    }

    form.login-form .input-container .checked-icon,
    form.login-form .input-container .error-icon {
        display: none;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -10px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
    }

    form.login-form .input-container .checked-icon {
        color: #149FED;
    }

    form.login-form .input-container .error-icon {
        color: #DB1616;
    }

    svg {
        display: inline-block;
    }

    form.login-form .text-input {
        border: none;
        border-radius: 0;
        border-bottom: 2px solid #555;
        color: #fff;
        padding: 9px 0;
        font-size: 15px;
        line-height: 15px;
        background-color: transparent;
        width: 100%;
        outline: none;
        margin-bottom: 0;
    }

    form.login-form .text-input:focus {
        border-color: #149FED;
    }

    .input-containers-error form.login-form .text-input {
        border-color: #DB1616;
    }

    form.login-form .input-container.complete:not(.error) .text-input {
        border-color: #555;
    }

    form.login-form .input-container .checked-icon.active {
        display: block;
    }

    .input-containers-error form.login-form .error-icon {
        display: block;
    }

    form.login-form .text-input::-webkit-input-placeholder {
        color: #565656;
    }

    form.login-form .text-input:-moz-placeholder {
        color: #565656;
        opacity: 1;
    }

    form.login-form .text-input::-moz-placeholder {
        color: #565656;
        opacity: 1;
    }

    form.login-form .text-input:-ms-input-placeholder {
        color: #565656;
    }

    form.login-form .text-input::-ms-input-placeholder {
        color: #565656;
    }

    form.login-form .text-input::placeholder {
        color: #565656;
    }

    form.login-form input[type="submit"] {
        cursor: pointer;
        display: block;
        width: 100%;
        outline: none;
        background: #149FED;
        border-radius: 3px;
        color: #fff;
        padding: 16px;
        text-align: center;
        font-size: 16px;
        line-height: 16px;
        margin-top: 24px;
        border: none;
    }

    .input-containers-error form.login-form input[type="submit"] {
        background: #DB1616;
    }

    .input-containers-gray form.login-form input[type="submit"] {
        background: #808080;
    }

    form.login-form input[type="submit"][disabled] {
        background: #808080;
        cursor: default;
    }

    .input-containers-complete form.login-form input[type="submit"] {
        background: #18CE56;
    }

    .free, #change-phone {
        margin-top: 12px;
        font-size: 11px;
        line-height: 16px;
        text-align: center;
        margin-bottom: 20px;
        display: none;
    }

    .free {
        opacity: 0.5;
    }

    #change-phone {
        color: #149FED;
        cursor: pointer;
    }

    .free.active {
        display: block;
    }

    #change-phone.active {
        display: block;
    }

    footer {
        font-size: 8px;
        line-height: 8px;
        opacity: 0.5;
        text-align: center;
        margin-bottom: 12px;
    }

    footer a {
        color: #fff;
    }

    .image {
        background-image: url('/img/page.png');
        background-position: center;
        background-repeat: no-repeat;
        width: 214px;
        height: 379px;
        margin: 0 auto;
        margin-top: 30px;
    }

    input {
        -webkit-appearance: none;
    }
</style>
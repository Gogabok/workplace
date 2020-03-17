<template>
  <div class="modal-wrapper">
    <div class="modal modal--callback" id="callback-modal" style="display: block;">
      <span class="modal-close" @click="$emit('closeModal')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.642 15.642"><path fill-rule="evenodd" d="M8.882 7.821l6.541-6.541A.75.75 0 1 0 14.362.219L7.821 6.76 1.28.22A.75.75 0 1 0 .219 1.281L6.76 7.822l-6.54 6.54a.75.75 0 0 0 1.06 1.061l6.541-6.541 6.541 6.541a.75.75 0 1 0 1.06-1.061l-6.54-6.541z"></path></svg></span>
      <div class="modal__inner">
        <p class="modal__title">Отправить заявку</p>
        <form class="modal__form">
          <div class="form__group-inputs">
            <div class="form__group">
              <span class="form__group-message sent" v-if="formSent">Заявка отправленна</span>
              <div class="form__group-input">
                <input v-model="form.name" class="only-text-input" type="text" placeholder="Введите Ваше имя:"></div>
              <span class="form__group-message" v-if="nameError" >{{nameErrorMessage}}</span>
            </div>
            <div class="form__group">
              <div class="form__group-input">
                <input v-mask="'+#(###)###-##-##'" v-model="form.phone" class="mask-phone" type="text" placeholder="Введите Ваш телефон: "></div>
              <span class="form__group-message" v-if="phoneError" >{{phoneErrorMessage}}</span>
            </div>
            <div class="form__group">
              <div class="form__group-input">
                <textarea v-model="form.comment" class="only-text-input t-area" rows="5" type="text" placeholder="Текст сообщения: "></textarea>
              </div>
              <span class="form__group-message" v-if="commentError">{{commentErrorMessage}}</span>
            </div>
          </div><button class="btn modal__form-btn" @click="sendForm($event)">Отправить</button>
        </form>
      </div>
    </div>
    <loader v-if="loading"></loader>
  </div>
</template>
<script>
  import api from '~/assets/js/api.js'
  import Loader from '~/components/Loader.vue'
  export default {
    name: 'CallBackModal',
    components: {
      Loader
    },
    data() {
      return {
        form: {
          name: '',
          phone: '',
          comment: ''
        },
        loading: false,
        nameError: false,
        phoneError: false,
        commentError: false,
        formSent: false,
        nameErrorMessage: '',
        phoneErrorMessage: '',
        commentErrorMessage: '',
      }
    },
    methods: {
      sendForm(event) {
        event.preventDefault()
        this.nameError = false
        this.phoneError = false
        this.commentError = false
        if(!this.nameError && !this.phoneError && !this.commentError) {
          const name = this.form.name
          const phone = this.form.phone
          const text = this.form.comment
          this.loading = true
          this.formSent = false
          api.sendForm(name, phone, text)
            .then(response => {
              this.loading = false
              this.formSent = true
              this.form.name = ''
              this.form.phone = ''
              this.form.comment = ''
              this.nameError = false
              this.phoneError = false
              this.commentError = false
            })
            .catch(error => {
              this.loading = false
              error.response.data.forEach(err => {
                switch (err.field) {
                  case 'name' : {
                    this.nameError = true
                    this.nameErrorMessage = err.message
                  } break;
                  case 'phone' : {
                    this.phoneError = true
                    this.phoneErrorMessage = err.message
                  } break;
                  case 'text' : {
                    this.commentError = true
                    this.commentErrorMessage = err.message
                  } break;
                }
              })
              //this.$emit('closeModal')
            })
        }
      },
      checkEmpty(type) {
        switch(type) {
          case 'name': {
            this.nameError = this.form.name === '';
          } break;

          case 'phone': {
            this.phoneError = this.form.phone === '';
          } break;

          case 'comment': {
            this.commentError = this.form.comment === '';
          } break;
        }
      }
    }
  }
</script>
<style lang="scss">
  .modal-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(30, 30, 30, .9);
    z-index: 999;
    & .modal {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
    }
  }
  .t-area {
    padding: 10px;
  }
  .modal-close {
    position: absolute;
    top: 10px;
    cursor: pointer;
    right: 10px;
  }
  .form__group-message.sent {
    color: #00d65b;
  }
</style>

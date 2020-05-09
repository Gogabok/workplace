<template>
  <div id="authorization">

    <div class="work">
    

      <div class="maket topCaption">
        <div class="caption section">
          <h1> {{ $t(caption) }}</h1>
        </div>
      </div>

      <div class="maket leftPart">

        <div class="sitelogin section">
          <div class="form" v-if="auth < 1">

            <div class="item">
              <div class="label"><label>{{ $t("message.email") }}</label></div>
              <div class="input"><input type="email" v-model="login" autocomplete="on"/></div>
              
            </div>
            <div class="item">
              <div class="label"><label>{{ $t("message.password") }}</label></div>
              <div class="input"><input type="password" value="" v-model="password" autocomplete="off"/></div>			
            </div>
            
            <div class="item">
              <a href="restore?forget=true">
                <div class="forgotPassword">
                  {{ $t("message.forgotPassword") }}
                </div>
              </a>
            </div>

            <div class="item buttons">
              <button class="enter" v-on:click="signin"> {{ $t("button.signin") }}</button>
            </div>

          </div>
        </div>

        <div class="form" v-if="auth == 2">
          <div>Loading</div>
        </div>

        <div class="form" v-if="auth == 1">
          <div>Auth success</div>
        </div>

      </div>

    </div>
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="sass" src="./index.sass"></style>


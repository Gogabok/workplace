<template>
  <header class="header">
    <div class="container-custom">
      <div class="wrapper">
        <div @click="openMenu" class="menu-burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <router-link tag="p" to="/" class="logo">punic<span>app</span></router-link>
        <transition mode="out-in" name="fade">
          <ul v-show="isMenuOpen" class="list">
            <a href="#" class="item">Услуги</a>
            <a href="#" class="item">Портфолио</a>
            <a href="#" class="item">О компании</a>
            <a href="#" class="item">Контакты</a>
            <a href="#" class="item">Блог</a>
          </ul>
        </transition>
        <div class="info">
          <a href="tel:84951896799" class="phone">8 (495) 189-67-99</a>
          <a href="mailto:support@punicapp.com" class="email"><span>support@punicapp.com</span><img src="../../assets/images/email-icon.svg" alt=""></a>
        </div>
      </div>
    </div>
  </header>  
</template>

<script>
export default {
  name: 'AppHeader',
  data: () => ({
    isMenuOpen: false
  }),
  methods: {
    openMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>
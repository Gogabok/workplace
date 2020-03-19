<template lang="pug">
header.header
  .header__top
    .container
      .row.align-items-center
        .col-lg-2.col-3
          a(href="/").header__logo
            img(src="/images/logo.png" alt="Logo")
        .col.d-none.d-lg-block
          nav.header__top-nav
            ul
              li
                nuxt-link(to="/delivery") Доставка
              li
                nuxt-link(to="/payment") Оплата
              li
                nuxt-link(to="/contact") Контакты
        .col-lg-5.col-9
          .header__contacts
            .header__contacts-left
              .header__contacts-top
                .header__contacts-icons
                  i.header__contacts-icon
                    img(src="/images/whatsapp.png" alt="whatsapp")
                  i.header__contacts-icon
                    img(src="/images/telegram.png" alt="telegram")
                a(href="tel:+74952666903").header__contacts-phone +7 (495) 266-6903
              a.header__contacts-cta(href="#" @click="toggleCallBackModal($event)") Заказать обратный звонок
            .header__contacts-right
              .header__contacts-top
                .header__contacts-icons
                  i.header__contacts-icon
                    img(src="/images/phone.png" alt="phone")
                a(href="tel:+74952666903").header__contacts-phone +7 (495) 266-6903
              .header__contacts-address
                i.header__contacts-icon
                  img(src="/images/location.png" alt="location")
                span Г. Казань, ул. Фаттыха Амирхана дом 9 оф 318
            button.mobile-btn.d-md-inline-block.d-lg-none#menu-open(@click="openMenu()")
              span.mobile-btn__line
              span.mobile-btn__line
              span.mobile-btn__line
  .header__bottom(v-if="$route.fullPath === '/'")
    .container
      nav.header__nav
        ul
          li(v-for="(category, cat_index) in $store.getters.getPartsCategories.slice(0, 8)" :key="category.id")
            nuxt-link(to="/")
              span {{category.parent.description}}
            .sub-menu
              .row
                .col-sm-12
                  .sub-menu-title {{category.parent.description}}
                  ul
                    li(@click.prevent="linkTo(child)" v-for="child in category.children" :key="child.id")
                      nuxt-link(to="/") {{child.description}}
  call-back-modal(v-if="showCallBack" @closeModal="toggleCallBackModal")
</template>
<script>
  import api from '~/assets/js/api'
  import CallBackModal from '~/components/CallBackModal.vue'
  export default {
    name: 'AppHeader',
    components: {
      CallBackModal
    },
    data() {
      return {
        showCallBack: false
      }
    },
    methods: {
      toggleCallBackModal(event) {
        if(event) {
          event.preventDefault()
        }
        this.showCallBack = !this.showCallBack
      },
      openMenu() {
        this.$store.commit('setMobileMenuOpened', true)
      },
      linkTo(item) {
        console.log(item);
        
        api.getCarInfoByModificationId(item.passangercarid)
        .then(response => {
          let currentCar = response
          console.log(response);
          localStorage.setItem(currentCar.manufacturers.description, JSON.stringify(currentCar.manufacturers))
          localStorage.setItem(currentCar.model.description, JSON.stringify(currentCar.model))
          localStorage.setItem(currentCar.modification.id, JSON.stringify(currentCar.modification))

          this.$store.commit('setSelectedManufacturer', currentCar.manufacturers)
          this.$store.commit('setSelectedModel', currentCar.model)
          this.$store.commit('setSelectedModification', currentCar.modification)

          console.log(`/${currentCar.manufacturers.description}/${currentCar.model.description}/${currentCar.modification.description}/${item.number}`);
          this.$router.push({
            path: `/${currentCar.manufacturers.description}/${currentCar.model.description}/${currentCar.modification.id}/${item.number}`,
          })
        })
      }
    }
  }
</script>
<style lang="sass">

</style>

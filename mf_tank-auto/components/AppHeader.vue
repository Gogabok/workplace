<template>
  <header class="header">
    <div class="header__top">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-2 col-3">
            <a class="header__logo" href="/">
              <img src="/images/logo.png" alt="Logo" />
            </a>
          </div>
          <div class="col d-none d-lg-block">
            <nav class="header__top-nav">
              <ul>
                <li>
                  <nuxt-link to="/delivery">Доставка</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/payment">Оплата</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/contact">Контакты</nuxt-link>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-lg-5 col-9">
            <div class="header__contacts">
              <div class="header__contacts-left">
                <div class="header__contacts-top">
                  <div class="header__contacts-icons">
                    <i class="header__contacts-icon">
                      <img src="/images/whatsapp.png" alt="whatsapp" />
                    </i>
                    <i class="header__contacts-icon">
                      <img src="/images/telegram.png" alt="telegram" />
                    </i>
                  </div>
                  <a class="header__contacts-phone" href="tel:+74952666903">+7 (495) 266-6903</a>
                </div>
                <a
                  class="header__contacts-cta"
                  href="#"
                  @click="toggleCallBackModal($event)"
                >Заказать обратный звонок</a>
              </div>
              <div class="header__contacts-right">
                <div class="header__contacts-top">
                  <div class="header__contacts-icons">
                    <i class="header__contacts-icon">
                      <img src="/images/phone.png" alt="phone" />
                    </i>
                  </div>
                  <a class="header__contacts-phone" href="tel:+74952666903">+7 (495) 266-6903</a>
                </div>
                <div class="header__contacts-address">
                  <i class="header__contacts-icon">
                    <img src="/images/location.png" alt="location" />
                  </i>
                  <span>Г. Казань, ул. Фаттыха Амирхана дом 9 оф 318</span>
                </div>
              </div>
              <button
                class="mobile-btn d-md-inline-block d-lg-none"
                id="menu-open"
                @click="openMenu()"
              >
                <span class="mobile-btn__line"></span>
                <span class="mobile-btn__line"></span>
                <span class="mobile-btn__line"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header__bottom" v-if="$route.fullPath === '/'">
      <div class="container">
        <nav class="header__nav">
          <ul>
            <li
              v-for="category in $store.getters.getPartsCategories.slice(0, 8)"
              :key="category.toString() + Math.random()"
            >
              <nuxt-link to="/">
                <span>{{category.parent.description}}</span>
              </nuxt-link>
              <div class="sub-menu">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="sub-menu-title">{{category.parent.description}}</div>
                    <ul>
                      <li
                        @click.prevent="linkTo(child)"
                        v-for="child in category.children"
                        :key="child.id + Math.random()"
                      >
                        <nuxt-link to="/">{{child.description}}</nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <call-back-modal v-if="showCallBack" @closeModal="toggleCallBackModal"></call-back-modal>
  </header>
</template>
<script>
import api from "~/assets/js/api";
import CallBackModal from "~/components/CallBackModal.vue";
export default {
  name: "AppHeader",
  components: {
    CallBackModal
  },
  data() {
    return {
      showCallBack: false
    };
  },
  methods: {
    toggleCallBackModal(event) {
      if (event) {
        event.preventDefault();
      }
      this.showCallBack = !this.showCallBack;
    },
    openMenu() {
      this.$store.commit("setMobileMenuOpened", true);
    },
    linkTo(item) {
      api.getCarInfoByModificationId(item.passangercarid).then(response => {
        let currentCar = response;
        localStorage.setItem(
          currentCar.manufacturers.description,
          JSON.stringify(currentCar.manufacturers)
        );
        localStorage.setItem(
          currentCar.model.description,
          JSON.stringify(currentCar.model)
        );
        localStorage.setItem(
          currentCar.modification.fulldescription,
          JSON.stringify(currentCar.modification)
        );

        this.$store.commit("setSelectedManufacturer", currentCar.manufacturers);
        this.$store.commit("setSelectedModel", currentCar.model);
        this.$store.commit("setSelectedModification", currentCar.modification);

        this.$router.push({
          path: `/${currentCar.manufacturers.description}/${currentCar.model.description}/${currentCar.modification.fulldescription}/${item.number}`
        });
      });
    }
  }
};
</script>
<style lang="sass">

</style>

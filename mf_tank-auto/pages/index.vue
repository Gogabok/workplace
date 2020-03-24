<template>
  <main class="main">
    <section class="hero hero--home" style="background-image: url(/images/hero-home.jpg);">
      <basket-price></basket-price>
      <div class="container">
        <div class="hero__inner">
          <h1 class="hero__title">
            Интернет магазин
            <br />автозапчастей
            <br />в Казани
          </h1>
          <form class="hero__search">
            <div class="form__group">
              <div class="form__group-input">
                <input
                  type="text"
                  name="hero-search"
                  placeholder="Поиск по артикулу или названию товара"
                />
              </div>
            </div>
            <button class="btn btn--upper hero__search-btn">Найти</button>
          </form>
        </div>
      </div>
    </section>
    <section class="choose">
      <div class="container">
        <div class="choose__inner">
          <div class="choose__top">
            <p class="choose__title">Начните поиск с выбора года выпуска или с марки автомобиля</p>
            <p
              class="choose__subtitle"
            >Выбор автомобиля позволяет отобразить только те запчасти, которые подходят к вашему автомобилю</p>
          </div>
          <div class="choose__tabs">
            <div
              class="choose__tab choose__tab--manufacturer"
              :class="selectedTabTop === 'manufacturer' ? 'active' : ''"
            >
              <div
                class="choose__tab-btn"
                @click="() =&gt; {selectedTabTop !== '' ? selectedTabTop = '' : selectedTabTop = 'manufacturer'}"
              >
                <span>Марка</span>
                <i class="choose__tab-arrow"></i>
              </div>
              <div class="choose__tab-body scrollbar-outer select-scrollbar-mobile top-tabs">
                <div class="top-tabs-wrapper">
                  <div class="choose__tab-car-wrapper-column" v-for="(pass_key, pass_key_index) in Object.keys(groupedPassengers)" :key="pass_key_index + Math.random()">
                    <a
                      href="#"
                      @click="formattedModels(passenger, $event)"
                      v-for="(passenger, pass_index) in groupedPassengers[pass_key]"
                      :key="passenger.id"
                      :class="pass_key_index % 2 === 0 &amp;&amp; pass_index === 0 ? 'choose__tab-letter choose__tab-letter--odd' : (pass_key_index % 2 !== 0 &amp;&amp; pass_index === 0 ? 'choose__tab-letter choose__tab-letter--even' : '')"
                    >
                      <template v-if="pass_index === 0">
                        <i>{{pass_key.toUpperCase()}}</i>
                        <span>{{passenger.description.replace(' ', '&nbsp;')}}</span>
                      </template>
                      <template v-if="pass_index !== 0">{{passenger.description}}</template>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="choose__tab choose__tab--year"
              :class="selectedTabTop === 'model' ? 'active' : ''"
            >
              <div
                class="choose__tab-btn"
                @click="() =&gt; {selectedTabTop !== '' ? selectedTabTop = '' : selectedTabTop = 'model'}"
                :class="selectedManufacturer ? '' : 'hidden'"
              >
                <span>Модель</span>
                <i class="choose__tab-arrow"></i>
              </div>
              <div class="choose__tab-body scrollbar-outer select-scrollbar-mobile top-tabs models">
                <div class="top-tabs-wrapper models">
                  <a
                    @click="formattedModifications(model, $event)"
                    href="#"
                    v-for="model in modelsForManufacturer"
                    :key="model.description"
                  >{{model.description}}</a>
                </div>
              </div>
            </div>
            <div
              class="choose__tab choose__tab--model"
              :class="selectedTabTop === 'modifications' ? 'active' : ''"
            >
              <div
                class="choose__tab-btn"
                @click="() =&gt; {selectedTabTop !== '' ? selectedTabTop = '' : selectedTabTop = 'modifications'}"
                :class="selectedModel ? '' : 'hidden'"
              >
                <span>Модификация</span>
                <i class="choose__tab-arrow"></i>
              </div>
              <div class="choose__tab-body scrollbar-outer select-scrollbar-mobile top-tabs models">
                <div class="top-tabs-wrapper models">
                  <a
                    href="#"
                    @click="routeToGarage(modification)"
                    v-for="modification in modificationsForModel"
                    :key="modification.description"
                  >{{modification.fulldescription}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="type">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="type__inner">
              <div class="type__tabs tabs">
                <div class="type__tabs-top tabs__top">
                  <div
                    class="type__tabs-button tabs__btn active"
                    data-target="#car"
                  >Легковой автомобиль</div>
                  <div class="type__tabs-button tabs__btn" data-target="#truck">Грузовой автомобиль</div>
                </div>
                <div class="type__tabs-content tabs__content">
                  <div class="type__tabs-body tabs__body active" id="car">
                    <div class="choose__tab choose__tab--manufacturer light">
                      <div
                        class="choose__tab-body scrollbar-outer select-scrollbar-mobile light-auto"
                      >
                        <div
                          class="choose__tab-car-wrapper-column"
                          v-for="(pass_key, pass_key_index) in Object.keys(groupedPassengers)"
                          :key="pass_key_index + Math.random()"
                        >
                          <a
                            href="#"
                            @click="routeSearchAuto(passenger, $event)"
                            v-for="(passenger, pass_index) in groupedPassengers[pass_key]"
                            :key="passenger.id"
                            :class="pass_key_index % 2 === 0 &amp;&amp; pass_index === 0 ? 'choose__tab-letter choose__tab-letter--odd' : (pass_key_index % 2 !== 0 &amp;&amp; pass_index === 0 ? 'choose__tab-letter choose__tab-letter--even' : '')"
                          >
                            <template v-if="pass_index === 0">
                              <i>{{pass_key.toUpperCase()}}</i>
                              <span>{{passenger.description.replace(' ', '&nbsp;')}}</span>
                            </template>
                            <template v-if="pass_index !== 0">{{passenger.description}}</template>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="type__tabs-body tabs__body" id="truck">
                    <div class="choose__tab choose__tab--manufacturer">
                      <div class="choose__tab-body scrollbar-outer select-scrollbar-mobile">
                        <div class="choose__tab-col"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a class="btn type__btn" href="#">Показать все автомобили</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="popular">
      <div class="container">
        <div class="popular__inner">
          <p class="popular__title">Популярные группы запчастей</p>
          <div class="popular__category">
            <div
              class="popular__category-item"
              v-for="category in shuffle(formattedPartsCategories).slice(0, 8)"
              :key="category.id"
            >
              <i class="popular__category-icon">
                <img src="/images/engine.png" alt="alt" />
              </i>
              <p class="popular__category-title">{{category.parent.description}}</p>
              <div class="popular__category-links">
                <nuxt-link
                  to="/"
                  @click.prevent.native="linkTo(child)"
                  v-for="child in category.children"
                  :key="child.id"
                >
                  <span>{{child.description}}</span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="promotions">
      <div class="container">
        <div class="promotions__inner">
          <div class="promotions__item" style="background-image: url('/images/promotions-1.jpg');">
            <p class="promotions__item-title">
              Lamp & Lights
              <span>MEGA SALE</span>
            </p>
            <p class="promotions__item-price">
              from
              <span>500$</span>
            </p>
            <a class="btn promotions__item-btn" href="#">Купить</a>
          </div>
          <div class="promotions__item" style="background-image: url('/images/promotions-2.jpg');">
            <p class="promotions__item-title">
              Lamp & Lights
              <span>MEGA SALE</span>
            </p>
            <p class="promotions__item-price">
              from
              <span>500$</span>
            </p>
            <a class="btn promotions__item-btn" href="#">Купить</a>
          </div>
          <div class="promotions__item" style="background-image: url('/images/promotions-3.jpg');">
            <p class="promotions__item-title">
              Lamp & Lights
              <span>MEGA SALE</span>
            </p>
            <p class="promotions__item-price">
              from
              <span>500$</span>
            </p>
            <a class="btn promotions__item-btn" href="#">Купить</a>
          </div>
          <div class="promotions__item" style="background-image: url('/images/promotions-4.jpg');">
            <p class="promotions__item-title">
              Lamp & Lights
              <span>MEGA SALE</span>
            </p>
            <p class="promotions__item-price">
              from
              <span>500$</span>
            </p>
            <a class="btn promotions__item-btn" href="#">Купить</a>
          </div>
        </div>
      </div>
    </section>
    <section class="about">
      <div class="container">
        <div class="about__text">
          <p>
            Звоните и заказывайте автозапчасти по телефону: +7 (495) 266-69-03. Внимание! Для точного подбора запчастей обращайтесь к нашим менеджерам и помните, что радость из-за низкой цены длится гораздо меньше, чем горе из-за низкого качества.
            <br />БиБи-Партс.ру
            – онлайн гипермаркет автозапчастей, предлагает Вам широкий ассортимент оригинальных и неоригинальных автозапчастей для иномарок всех марок. Независимо от того, нужны ли детали для внепланового ремонта или регламентных работ по техническому
            осмотру, в нашем интернет магазине вы найдете основной ассортимент из наличия, а менее ходовые узлы автомобиля под заказ.
          </p>
          <p>
            Мы предоставляем первоклассный клиентский сервис в обслуживании и соблюдаем сроки поставки. Запчасти из наличия отгружаются текущим днем или следующим. Конкурентные цены делают нас одним из ведущих продавцов автозапчастей на рынке. Обширный
            и удобный онлайн каталог запчастей, позволяет оперативно выбрать детали на Ваш автомобиль. Наша команда специалистов всегда на связи с Вами, с использованием ВИН кода проконсультируют по применимости запчастей, о возможности использования
            аналогов, ответят на все вопросы и помогут вам оформить заказ.
          </p>
          <p>
            Среди других преимуществ, предлагаемых bb-parts.ru, вы можете также отметить высокое качество деталей. В общем ассортименте запчастей представлено более 300 производителей из стран Германии, Италии, Японии, Китая, США и России. Качество
            предлагаемых нами автозапчастей подтверждено сертификатами производителей, дилерскими документами или бланками соответствия.
          </p>
          <div class="about__img" style="background-image: url('/images/about-img.jpg');"></div>
          <div class="about__bg" style="background-image: url('/images/about-text.jpg');"></div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import api from "~/assets/js/api.js";
import Loader from "~/components/Loader.vue";
import BasketPrice from "~/components/BasketPrice";

export default {
  head: {
    title: "Интернет-магазин автозапчастей в Казани - ТЕЛЕФОНПОМЕНЯТЬ"
  },
  components: {
    Loader,
    BasketPrice
  },
  async fetch({ store, params }) {
    let passengers = await api.getPassengers();
    store.commit("setPassengers", passengers);
    let partsCategories = await api.getPartsCategories();
    store.commit("setPartsCategories", partsCategories);
  },
  data() {
    return {
      selectedTabTop: "manufacturer",
      selectedManufacturer: null,
      selectedModel: null,
      selectedModifications: null,
      modelsForManufacturer: [],
      modificationsForModel: [],
      loading: false
    };
  },
  mounted() {},
  computed: {
    groupedPassengers() {
      const result = {};
      const all_passengers = [...this.$store.getters.getPassengers];
      all_passengers.forEach((passenger, index) => {
        if (!result[passenger.matchcode[0]]) {
          result[passenger.matchcode[0]] = [];
          passenger.index = index;
          result[passenger.matchcode[0]].push(passenger);
        } else {
          passenger.index = index;
          result[passenger.matchcode[0]].push(passenger);
        }
      });
      let items = [];
      this.$router.options.routes.forEach(route => {
        items.push({
          name: route.name,
          path: route.path
        });
      });
      return result;
    },
    formattedPartsCategories() {
      const result = [...this.$store.getters.getPartsCategories];
      return result;
    }
  },
  methods: {
    shuffle(a) {
      let j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    },
    formattedModels(manufacturer, event) {
      event.preventDefault();
      this.selectedManufacturer = manufacturer;
      this.$store.commit("setSelectedManufacturer", manufacturer);
      api
        .getModels(manufacturer.description)
        .then(response => {
          this.modelsForManufacturer = [...response];
          this.selectedTabTop = "model";
        })
        .catch(error => {
          console.log("error: ", error);
        });
    },
    formattedModifications(model, event) {
      event.preventDefault();
      this.selectedModel = model;
      this.$store.commit("setSelectedModel", model);
      api
        .getModifications(
          this.selectedManufacturer.description,
          model.description
        )
        .then(response => {
          this.modificationsForModel = [...response];
          this.selectedTabTop = "modifications";
        })
        .catch(error => {
          console.log("error: ", error);
        });
    },
    routeToGarage(selectedModification) {
      this.selectedModification = selectedModification;
      this.$store.commit("setSelectedModification", selectedModification);

      localStorage.setItem(
        this.selectedManufacturer.description,
        JSON.stringify(this.selectedManufacturer)
      );
      localStorage.setItem(
        this.selectedModel.description,
        JSON.stringify(this.selectedModel)
      );
      localStorage.setItem(
        this.selectedModification.fulldescription,
        JSON.stringify(this.selectedModification)
      );

      this.$router.push(
        `${this.selectedManufacturer.description.replace(
          /\//g,
          "%2F"
        )}/${this.selectedModel.description.replace(
          /\//g,
          "%2F"
        )}/${this.selectedModification.fulldescription.replace(/\//g, "%2F")}`
      );
    },
    routeSearchAuto(manufacturer, event) {
      event.preventDefault();
      localStorage.setItem(
        manufacturer.description,
        JSON.stringify(manufacturer)
      );
      this.$store.commit("setSelectedManufacturer", manufacturer);
      let pageParams = manufacturer.description.replace(/\//g, "%2F");
      this.$router.push(`${pageParams}`);
    },
    linkTo(item) {
      api.getCarInfoByModificationId(item.passangercarid).then(response => {
        let currentCar = response;
        console.log(response);
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

<style lang="scss">
@media screen and (max-width: 1440px) {
  .choose__tab-body {
    max-width: 950px;
    min-width: 950px !important;
  }
  .top-tabs-wrapper {
    min-width: unset;
    min-height: 2000px !important;
  }
  .choose__tab--manufacturer.light {
    overflow-x: hidden;
  }
}
@media screen and (max-width: 1024px) {
  .choose__tab--manufacturer.light {
    overflow-x: hidden;
    .choose__tab-body.light-auto {
      min-width: 770px !important;
    }
  }
  .choose__tab-body {
    max-width: 750px !important;
    min-width: 750px !important;
    overflow-x: hidden;
  }
  &.choose__tab--year {
    .choose__tab-body {
      max-width: 700px !important;
      min-width: 700px !important;
    }
  }
  &.choose__tab--model {
    .choose__tab-body {
      max-width: 650px !important;
      min-width: 650px !important;
    }
  }
  .top-tabs-wrapper {
    min-width: 800px !important;
    min-height: 2000px !important;
  }
}
@media screen and (max-width: 768px) {
  .choose__tab--manufacturer.light {
    overflow-x: hidden;
    overflow-y: unset;
    .choose__tab-body.light-auto {
      overflow-y: visible;
      min-width: 100% !important;
      min-height: 5600px !important;
    }
    .choose__tab-letter {
      span {
        padding-left: 33px !important;
      }
    }
  }
  .choose__tab-body {
    max-width: 600px !important;
    min-width: 600px !important;
    overflow-x: hidden;
    .top-tabs-wrapper {
      min-width: 600px !important;
      min-height: 2000px !important;
    }
  }
  &.choose__tab--year {
    .choose__tab-body {
      max-width: 500px !important;
      min-width: 500px !important;
    }
  }
  &.choose__tab--model {
    .choose__tab-body {
      max-width: 450px !important;
      min-width: 450px !important;
    }
  }
}
@media screen and (max-width: 425px) {
  .choose__tab--manufacturer.light {
    overflow-x: hidden;
    .choose__tab-body.light-auto {
      min-width: 395px !important;
      overflow-y: hidden;
      min-height: 5600px !important;
    }
    .choose__tab-letter {
      span {
        padding-left: 33px !important;
      }
    }
  }
  .choose__tab-body {
    max-width: 300px !important;
    min-width: 300px !important;
    overflow-x: hidden;
    .top-tabs-wrapper {
      min-width: 300px !important;
      min-height: 2000px !important;
    }
    .choose__tab-letter {
      span {
        padding-left: 33px !important;
      }
    }
  }
  &.choose__tab--year {
    .choose__tab-body {
      padding-left: 0 !important;
      left: -100px;
      max-width: 300px !important;
      min-width: 300px !important;
      .top-tabs-wrapper {
        min-width: 300px !important;
        min-height: 300px !important;
        a {
          padding-left: 0 !important;
        }
      }
    }
  }
  &.choose__tab--model {
    .choose__tab-body {
      left: 0px;
      padding-left: 0 !important;
      max-width: 300px !important;
      min-width: 300px !important;
    }
    .top-tabs-wrapper {
      min-width: 300px !important;
      min-height: 300px !important;
    }
  }
}
</style>


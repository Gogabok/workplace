<template>
    <div>
        <main class="main">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="overlay-title">
                            <h1>Расчитайте стоимость услуги</h1>
                            <p>Узнайте стоимость создания приложения, ответив на несколько простых вопросов! Перед тем, как заказывать услугу, выберите в калькуляторе нужный функционал и набор опций. Меняя эти настройки, вы поймете от чего зависит итоговая цена приложения.</p>
                        </div>
                    </div>
                </div>
                <div class="row swiper-row">
                    <div class="col-12">
                        <div class="overlay-swiper">
                            <swiper :options="swiperOption" ref="calcSwiper">
                                <div
                                        v-for="slide in items"
                                        :key="slide.id"
                                        @click="getId(slide.id)"
                                        :class="['swiper-slide',{'my-active-swiper': current_id === slide.id || filterValues(slide).length }]"
                                >
                                    <span class="swiper-slide-index">{{ slide.id }} </span>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M7.50002 0H26.7857C28.5609 0 30 1.43909 30 3.21429V22.5C30.0001 24.2656 28.576 25.7008 26.8104 25.7143H26.7857V8.57142C26.7822 5.61421 24.3858 3.21781 21.4286 3.21429H4.28573V3.18962C4.29929 1.42408 5.73442 -6.27791e-05 7.50002 0ZM3.21428 5.35713H21.4285C23.2037 5.35713 24.6428 6.79622 24.6428 8.57142V26.7857C24.6428 28.5609 23.2037 30 21.4285 30H3.21428C1.43908 30 0 28.5609 0 26.7857V8.57142C0 6.79622 1.43908 5.35713 3.21428 5.35713Z"
                                              :fill="[current_id === slide.id || filterValues(slide).length ? '#fff' :  '#000000']"/>
                                    </svg>
                                    <span class="swiper-slide-number">{{ slide.title}}</span>
                                </div>
                            </swiper>
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                        </div>
                    </div>
                </div>
                <div class="row subtext-row">
                    <div class="col-12">
                        <div class="calc-subtext">
                            <div class="left-border"></div>
                            <div class="calc-text">Выберете одно или несколько пунктов и нажмите «далее»</div>
                            <div class="right-border"></div>
                        </div>
                    </div>
                </div>
                <div class="row services-row">
                    <div class="col-12">
                        <div v-for="item in items" :key="item.id" class="services-row-items">
                            <div
                                    v-for="item2 in item.items"
                                    :key="item2.id"
                                    v-if="current_id === item.id"
                                    @click="getTotal(item2)"
                                    :class="['services-row-card',{'services-row-active': item2.active }]"
                            >
                                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="40" height="40" rx="20" :fill="[item2.active ? '#fff' :  '#D8D8D8']"/>
                                </svg>
                                <span>{{ item2.text}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="underline"></div>
                    </div>
                </div>
                <div class="row settings-row">
                    <div class="col-12">
                        <div class="overlay-settings">
                            <div class="overlay-settings-btn">
                                <a href="#" @click.prevent="nextStep()">
                                    <span>Далее</span>
                                </a>
                                <span class="overlay-settings-step">Шаг <b>{{ current_id}}</b> из <b>{{ items.length}}</b></span>
                            </div>
                            <div class="overlay-settings-price">
                                <span class="overlay-settings-text">Предварительная стоимость вашего приложения или проекта:</span>
                                <b><animated-number :value="total" :formatValue="formatToPrice" :duration="300"/>Р</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer class="footer">
            <div class="clients">
                <p class="title">Клиенты и партнеры</p>
                <div class="items">
                    <div class="item">
                        <div class="image"></div>
                    </div>
                    <div class="item">
                        <div class="image"></div>
                    </div>
                    <div class="item">
                        <div class="image"></div>
                    </div>
                    <div class="item">
                        <div class="image"></div>
                    </div>
                    <div class="item">
                        <div class="image"></div>
                    </div>
                    <div class="item">
                        <div class="image"></div>
                    </div>
                    <div class="item">
                        <div class="image"></div>
                    </div>
                    <div class="item">
                        <div class="image"></div>
                    </div>
                </div>
            </div>
            <div class="info">
                <div class="block first-block">
                    <div class="links">
                        <div class="socials">
                            <a href="#" target="_blank"><img ondragstart="return false" src="../../assets/images/instagram.svg" alt=""></a>
                            <a href="#" target="_blank"><img ondragstart="return false" src="../../assets/images/vk.svg" alt=""></a>
                             <a href="#" target="_blank"><img ondragstart="return false" src="../../assets/images/fb.svg" alt=""></a>
                        </div>
                        <p class="link">
                             <a href="#">Политика конфиденциальности</a>
                        </p>
                    </div>
                    <div class="text">
                        <div>
                            <p>Разработка мобильных приложений для iOS (iPhone, iPad), Andriod. Создание мобильных приложений на заказ и продажа готовых продуктов. Разработка сайтов и Web приложений. </p>
                            <p>Контроль качества на всех этапах.</p>
                            <p>ООО "Паникапп СЕ", Новосибирск, 630090, Академика Лаврентьева проспект, д. 6/1, офис 1018</p>
                            <p>ОГРН 1165476058990, ИНН 5408008372, КПП 540801001. Punicapp © 2019</p>
                        </div>
                        <img class="logo-mobile" ondragstart="return false" src="../../assets/images/logo.png" alt="">
                    </div>
                </div>
                <div class="block second-block">
                    <img ondragstart="return false" src="../../assets/images/logo.png" alt="">
                </div>
                <div class="block third-block">
                    <a href="#"><button class="getConsultation">
                        Получить консультацию
                    </button></a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>

    import AnimatedNumber from "animated-number-vue/src/AnimatedNumber";

    export default {
        name: "PriceCalculate",
        components: {AnimatedNumber},
        data() {
            return {
                current_id: 1,
                total: 0,
                swiperOption: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    breakpoints: {
                        1200: {
                            slidesPerView: 4,
                        },
                        962: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        480: {
                            slidesPerView: 1,
                        }
                    }
                },
                items: [
                    {
                        id: 1,
                        title: 'Количество экранов',
                        icon: 'icon-name',
                        items: [
                            {
                                id: 1,
                                icon: 'icon-name',
                                text: 'Количество экранов 7',
                                price: 60,
                                active: false,
                            },
                            {
                                id: 2,
                                icon: 'icon-name',
                                text: 'Количество экранов 15',
                                price: 120,
                                active: false,
                            },
                            {
                                id: 3,
                                icon: 'icon-name',
                                text: 'Количество экранов 25',
                                price: 200,
                                active: false,
                            }
                        ]
                    },
                    {
                        id: 2,
                        title: 'Дизайн',
                        icon: 'icon-name',
                        items: [
                            {
                                id: 1,
                                icon: 'icon-name',
                                text: 'прототип',
                                price: 24,
                                active: false,
                            },
                            {
                                id: 2,
                                icon: 'icon-name',
                                text: 'обычный',
                                price: 60,
                                active: false,
                            },
                            {
                                id: 3,
                                icon: 'icon-name',
                                text: 'Кастомный',
                                price: 120,
                                active: false,
                            }
                        ]
                    },
                    {
                        id: 3,
                        title: 'Авторизация',
                        icon: 'icon-name',
                        items: [
                            {
                                id: 1,
                                icon: 'icon-name',
                                text: 'e-mail',
                                price: 8,
                                active: false,
                            },
                            {
                                id: 2,
                                icon: 'icon-name',
                                text: 'телефон',
                                price: 8,
                                active: false,
                            },
                            {
                                id: 3,
                                icon: 'icon-name',
                                text: 'соцсети',
                                price: 8,
                                active: false,
                            },
                        ]
                    },
                    {
                        id: 4,
                        title: 'контент',
                        icon: 'icon-name',
                        items: [
                            {
                                id: 1,
                                icon: 'icon-name',
                                text: 'Загрузка медиафайлов',
                                price: 18,
                                active: false,
                            },
                            {
                                id: 2,
                                icon: 'icon-name',
                                text: 'Профили пользователей',
                                price: 10,
                                active: false,
                            },
                            {
                                id: 3,
                                icon: 'icon-name',
                                text: 'рейтинги, оценки, обзоры',
                                price: 16,
                                active: false,
                            },
                            {
                                id: 4,
                                icon: 'icon-name',
                                text: 'Редактирование фото-видео (манипуляции с файлом)',
                                price: 60,
                                active: false,
                            },
                            {
                                id: 5,
                                icon: 'icon-name',
                                text: 'Тэги',
                                price: 14,
                                active: false,
                            },
                            {
                                id: 6,
                                icon: 'icon-name',
                                text: 'Новостная лента',
                                price: 10,
                                active: false,
                            },
                            {
                                id: 7,
                                icon: 'icon-name',
                                text: 'Поиск фильтрация',
                                price: 12,
                                active: false,
                            },
                            {
                                id: 8,
                                icon: 'icon-name',
                                text: 'Каталоги, категории',
                                price: 22,
                                active: false,
                            },
                        ]
                    },
                    {
                        id: 5,
                        title: 'Время и место',
                        icon: 'icon-name',
                        items: [
                            {
                                id: 1,
                                icon: 'icon-name',
                                text: 'Календарь',
                                price: 14,
                                active: false,
                            },
                            {
                                id: 2,
                                icon: 'icon-name',
                                text: 'Бронирование(букинг)',
                                price: 24,
                                active: false,
                            },
                            {
                                id: 3,
                                icon: 'icon-name',
                                text: 'Локация карты',
                                price: 10,
                                active: false,
                            },
                            {
                                id: 4,
                                icon: 'icon-name',
                                text: 'Кастомные метки/районы на карте',
                                price: 10,
                                active: false,
                            }
                        ]
                    },
                    {
                        id: 6,
                        title: 'Социальный функционал',
                        icon: 'icon-name',
                        items: [
                            {
                                id: 1,
                                icon: 'icon-name',
                                text: 'Oбмен сообщениями',
                                price: 22,
                                active: false,
                            },
                            {
                                id: 2,
                                icon: 'icon-name',
                                text: 'Форум или комментарии',
                                price: 16,
                                active: false,
                            },
                            {
                                id: 3,
                                icon: 'icon-name',
                                text: 'Поделиться в соцсетях',
                                price: 10,
                                active: false,
                            },
                            {
                                id: 4,
                                icon: 'icon-name',
                                text: 'Push - ннотификации',
                                price: 12,
                                active: false,
                            },
                        ]
                    },
                    {
                        id: 7,
                        title: 'Количество экранов',
                        icon: 'icon-name',
                        items: [
                            {
                                id: 1,
                                icon: 'icon-name',
                                text: 'Интеграция с одним или более сторонних сервисов',
                                price: 110,
                                active: false,
                            },
                            {
                                id: 2,
                                icon: 'icon-name',
                                text: 'Интеграция с одним или более сторонних сервисов',
                                price: 130,
                                active: false,
                            },
                            {
                                id: 3,
                                icon: 'icon-name',
                                text: 'Интеграция с одним или более сторонних сервисов',
                                price: 140,
                                active: false,
                            },
                            {
                                id: 4,
                                icon: 'icon-name',
                                text: 'Интеграция с одним или более сторонних сервисов',
                                price: 150,
                                active: false,
                            },
                            {
                                id: 5,
                                icon: 'icon-name',
                                text: 'Интеграция с одним или более сторонних сервисов',
                                price: 160,
                                active: false,
                            },
                        ]
                    },
                ]
            }
        },
        methods: {
            getId(item) {
                this.current_id = item;
            },
            getTotal(item) {
                item.active = !item.active;
                item.active ? this.total += item.price : this.total -= item.price
            },
            nextStep() {
                if (this.current_id !== this.items.length) {
                    this.$refs.calcSwiper.swiper.slideTo(this.current_id);
                    ++this.current_id;
                } else {
                    alert('End');
                }
            },
            filterValues(item) {
                return item.items.filter(item => item.active === true);
            },
            formatToPrice(value) {
                return `${value.toFixed(0)}`;
            }
        },
    }
</script>

<style scoped>

</style>

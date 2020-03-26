<template>
  <section class="section section-2">
    <div class="container-custom">
      <p class="title">Наши услуги</p>
      <p class="subtitle">Разработка мобильных приложений и веб-проектов для бизнеса и стартапов</p>
      <div class="icons">
        <div :class="'icon-' + icon" class="icon" v-for="icon of 25" :key="icon">
          <img
            ondragstart="return false"
            :src="require(`../../../assets/images/section-2/icon-${icon}.svg`)"
            alt
          />
        </div>
      </div>
      <div class="cards-services">
        <div class="cards-services-item cards-services-item-1">
          <p class="title">Разработка мобильных приложений <img ondragstart="return false" src="../../../assets/images/section-2/arrow-mobile.svg" alt=""></p>
          <p class="subtitle">iOS, Android</p>
          <div class="text">
            <p class="desc">
              Мы создаём мобильные приложения, которые помогают вам зарабатывать. Уникальный дизайн, понятный функционал, удобный интерфейс привлекают пользователей и увеличивают число ваших клиентов.
            </p>
            <p class="desc">
              Качественное мобильное приложение укрепляет имидж вашей компании и лояльность клиентов, делает бизнес более узнаваемым и положительно влияет на увеличение прибыли.  
            </p>
          </div>
          <div class="desktop">
            <img class="icon" ondragstart="return false" src="../../../assets/images/section-2/services-1-icon.svg" alt="">
            <img ondragstart="return false" class="card-decor-1" src="../../../assets/images/section-2/card-decor-1.svg" alt="">
            <img ondragstart="return false" class="card-decor-2" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
            <img ondragstart="return false" class="card-decor-3" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
          </div>
          <div class="mobile">
            <img ondragstart="return false" class="card-mobile-decor-1" src="../../../assets/images/section-2/sec-1-mobile-icons/1.png" alt="">
            <img ondragstart="return false" class="card-mobile-decor-2" src="../../../assets/images/section-2/sec-1-mobile-icons/2.png" alt="">
            <img ondragstart="return false" class="card-mobile-decor-3" src="../../../assets/images/section-2/sec-1-mobile-icons/3.png" alt="">
          </div>
        </div>
        <div class="cards-services-item cards-services-item-2 opened">
          <p class="title">Web разработка <img ondragstart="return false" src="../../../assets/images/section-2/arrow-mobile.svg" alt=""></p>
          <p class="subtitle">Frontend, Backend</p>
          <div class="text">
            <p class="desc">
              Разрабатываем сайты персонально под ваш бизнес. Анализируем рынок и целевую аудиторию в соответствии с задачами, которые вы хотите решить с помощью веб-сайта.
            </p>
            <p class="desc">
              Создаём web-сервисы для любого направления бизнеса: продажи, коммуникации, управление, серверную часть и API, гибкие административные инструменты для управления приложениями и сбора статистики.
            </p>
            <p class="desc">
              Вы получаете продукт, привлекательный для пользователей и функциональный для вас.
            </p>
            <p class="link">Читать далее...</p>
          </div>
          <div class="desktop">
            <img class="icon" ondragstart="return false" src="../../../assets/images/section-2/services-2-icon.svg" alt="">
            <img ondragstart="return false" class="card-decor-1" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
            <img ondragstart="return false" class="card-decor-2" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
            <img ondragstart="return false" class="card-decor-3" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
            <img ondragstart="return false" class="card-decor-4" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
          </div>
          <div class="mobile">
            <img ondragstart="return false" class="card-mobile-decor-1" src="../../../assets/images/section-2/sec-2-mobile-icons/1.png" alt="">
            <img ondragstart="return false" class="card-mobile-decor-2" src="../../../assets/images/section-2/sec-2-mobile-icons/2.png" alt="">
            <img ondragstart="return false" class="card-mobile-decor-3" src="../../../assets/images/section-2/sec-2-mobile-icons/3.png" alt="">
          </div>
        </div>
        <div class="cards-services-item cards-services-item-3">
          <p class="title">Проектирование мобильного приложения <img ondragstart="return false" src="../../../assets/images/section-2/arrow-mobile.svg" alt=""></p>
          <p class="subtitle">Дизайн, ТЗ</p>
          <div class="text">
            <p class="desc">
              Разрабатываем концепцию дизайна мобильного приложения, учитывая особенности продукта и фирменный стиль компании.
            </p>
            <p class="desc">
              Вы получите функциональный, интуитивно понятный интерфейс. Уникальный и качественный дизайн повысят интерес к приложению, сделают его запоминающимся. 
            </p>
            <p class="desc">
При разработке дизайна руководствуемся рекоммендациями Google и Apple, благодаря чему пользователи получают дизайн, основанный на знакомых им принципах.
            </p>
          </div>
          <div class="desktop">
            <img class="icon" ondragstart="return false" src="../../../assets/images/section-2/services-3-icon.svg" alt="">
            <img ondragstart="return false" class="card-decor-1" src="../../../assets/images/section-2/card-decor-1.svg" alt="">
          </div>
          <div class="mobile">
            <img ondragstart="return false" class="card-mobile-decor-1" src="../../../assets/images/section-2/sec-3-mobile-icons/1.png" alt="">
            <img ondragstart="return false" class="card-mobile-decor-2" src="../../../assets/images/section-2/sec-3-mobile-icons/2.png" alt="">
            <img ondragstart="return false" class="card-mobile-decor-3" src="../../../assets/images/section-2/sec-3-mobile-icons/3.png" alt="">
          </div>
        </div>
      </div>
      <div class="howMuch">
        <div class="info">
          <p class="title">Сколько стоит разработка?</p>
          <div class="calculator">
            <img ondragstart="return false" src="../../../assets/images/section-2/calculator.png" alt="">
          </div>
          <button class="calculate">Рассчитать стоимость</button>
        </div>
      </div>
    </div>
    
    <img ondragstart="return false" class="bg-1" src="../../../assets/images/section-2/calculatorBackground.png" alt="">
    <img ondragstart="return false" class="bg-2" src="../../../assets/images/section-2/calculatorDecor.png" alt="">
    <img ondragstart="return false" class="bg-3" src="../../../assets/images/section-2/bg-icon-1.svg" alt="">
    <img ondragstart="return false" class="bg-4" src="../../../assets/images/section-2/bg-icon-2.png" alt="">
    
  </section>
</template>

<script>
export default {
  name: "Section-2"
};
</script>

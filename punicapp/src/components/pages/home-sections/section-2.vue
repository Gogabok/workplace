<template>
  <section class="section section-2">
    <div class="container">
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
          <p class="title">Разработка мобильных приложений</p>
          <p class="subtitle">iOS, Android</p>
          <img class="icon" ondragstart="return false" src="../../../assets/images/section-2/services-1-icon.svg" alt="">

          <img ondragstart="return false" class="card-decor-1" src="../../../assets/images/section-2/card-decor-1.svg" alt="">
          <img ondragstart="return false" class="card-decor-2" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
          <img ondragstart="return false" class="card-decor-3" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
        </div>
        <div class="cards-services-item cards-services-item-2 opened">
          <p class="title">Web разработка</p>
          <p class="subtitle">Frontend, Backend</p>
          <div>
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
          
          <img ondragstart="return false" class="card-decor-1" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
          <img ondragstart="return false" class="card-decor-2" src="../../../assets/images/section-2/card-decor-2.svg" alt="">
          <img ondragstart="return false" class="card-decor-3" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
          <img ondragstart="return false" class="card-decor-4" src="../../../assets/images/section-2/card-decor-3.svg" alt="">
        </div>
        <div class="cards-services-item cards-services-item-3">
          <p class="title">Проектирование мобильного приложения</p>
          <p class="subtitle">Дизайн, ТЗ</p>
          <img class="icon" ondragstart="return false" src="../../../assets/images/section-2/services-3-icon.svg" alt="">

          <img ondragstart="return false" class="card-decor-1" src="../../../assets/images/section-2/card-decor-1.svg" alt="">
        </div>
      </div>
    </div>
    <div class="howMuch">
      <div class="info">
        <p class="title">Сколько стоит разработка?</p>
        <button class="calculate">Рассчитать стоимость</button>
      </div>
    </div>
    <div class="calculator">
      <img src="../../../assets/images/section-2/calculator.png" alt="">
    </div>
    <img ondragstart="return false" class="bg-1" src="../../../assets/images/section-2/calculatorBackground.png" alt="">
    <img ondragstart="return false" class="bg-2" src="../../../assets/images/section-2/calculatorDecor.png" alt="">
  </section>
</template>

<script>
export default {
  name: "Section-2"
};
</script>

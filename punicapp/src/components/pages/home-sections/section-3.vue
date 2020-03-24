<template>
  <section class="section section-3">
    <div class="container-custom">
      <p class="title">Наши<br/>преимущества</p>
      <div class="wrapper">
        <div class="item" v-for="(item, index) in items" :key="item.text">
          <img ondragstart="return false" :src="require(`../../../assets/images/section-3/item-icon-${index + 1}.png`)" alt="">
          <p class="item-text">
            {{ item.text }}
          </p>
          <img ondragstart="return false" class="icon-1" src="../../../assets/images/section-3/cross.svg" alt="">
          <img ondragstart="return false" class="icon-2" src="../../../assets/images/section-3/cross.svg" alt="">
          <img ondragstart="return false" class="icon-3" src="../../../assets/images/section-3/cross.svg" alt="">
        </div>
      </div>
    </div>
    <img ondragstart="return false" class="bg-icon-1" src="../../../assets/images/section-3/bg-icon-1.png" alt="">
  </section>
</template>

<script>
export default {
  name: "Section-3",
  data: () => ({
    items: [
      {
        text: 'Ваше приложение — только ваше. Владельцем исключительных прав на приложение является заказчик.'
      },
      {
        text: 'Разрабатываем приложения всех видов: нативные, кроссплатформенные, pwa, мобильные web-приложения. '
      },
      {
        text: 'Поддержка и развитие. Обеспечиваем бесперебойную работу приложения и добавляем новый функционал.'
      },
      {
        text: 'Полный цикл услуг. Поможем вам пройти весь путь — от идеи продукта до публикации. '
      },
      {
        text: 'Всегда вовремя. Сдаём работу в оговоренные сроки.'
      },
      {
        text: 'Высочайший сервис на всех этапах разработки.'
      }
    ]
  })
};
</script>

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
        <div class="cards-services-item">
          
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Section-2"
};
</script>

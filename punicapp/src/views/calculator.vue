<template>
  <div class="home">
    <price-calculate></price-calculate>
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
              <a href="#" target="_blank">
                <img ondragstart="return false" src="../assets/images/instagram.svg" alt />
              </a>
              <a href="#" target="_blank">
                <img ondragstart="return false" src="../assets/images/vk.svg" alt />
              </a>
              <a href="#" target="_blank">
                <img ondragstart="return false" src="../assets/images/fb.svg" alt />
              </a>
            </div>
            <p class="link">
              <a href="#">Политика конфиденциальности</a>
            </p>
          </div>
          <div class="text">
            <div>
              <p>Разработка мобильных приложений для iOS (iPhone, iPad), Andriod. Создание мобильных приложений на заказ и продажа готовых продуктов. Разработка сайтов и Web приложений.</p>
              <p>Контроль качества на всех этапах.</p>
              <p>ООО "Паникапп СЕ", Новосибирск, 630090, Академика Лаврентьева проспект, д. 6/1, офис 1018</p>
              <p>ОГРН 1165476058990, ИНН 5408008372, КПП 540801001. Punicapp © 2019</p>
            </div>
            <img
              class="logo-mobile"
              ondragstart="return false"
              src="../assets/images/logo.png"
              alt
            />
          </div>
        </div>
        <div class="block second-block">
          <img ondragstart="return false" src="../assets/images/logo.png" alt />
        </div>
        <div class="block third-block">
          <a href="#">
            <button class="getConsultation">Получить консультацию</button>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import PriceCalculate from "../components/pages/PriceCalculate";

export default {
  name: "Calculator",
  components: {
    PriceCalculate
  }
};
</script>

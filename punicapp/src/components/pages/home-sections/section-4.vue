<template>
  <section class="section section-4">
    <div class="container-custom">
      <div class="title">Этапы разработки</div>
      <div class="wrapper">
        <div class="item">
          <div class="folder">
            <p class="title" :class="currentCategory === 'idea' ? 'active' : ''" @click="selectCategory('idea')">Идея</p>
            <transition mode="out-in" name="scaleY">
              <div class="text" v-show="currentCategory === 'idea'">
                <p>
                  Хорошо, когда у вас есть четкое понимание задачи, но если нет, то мы поможем его сформировать, поделимся знаниями, расскажем о трендах, дадим дельные советы, поможем создать документ с техническим заданием.  
                </p>
              </div>
            </transition>
          </div>
          <div class="icons">
            <img class="item-1 icon-1" src="../../../assets/images/section-4/item-1/icon-1.png" alt="" ondragstart="return false">
            <img class="item-1 icon-2" src="../../../assets/images/section-4/item-1/icon-2.png" alt="" ondragstart="return false">
            <img class="item-1 icon-3" src="../../../assets/images/section-4/item-1/icon-3.png" alt="" ondragstart="return false">
          </div>
        </div>
        <div class="item">
          <div class="folder">
            <p class="title" :class="currentCategory === 'analitics' ? 'active' : ''" @click="selectCategory('analitics')">Аналитика</p>
            <transition mode="out-in" name="scaleY">
              <div class="text" v-show="currentCategory === 'analitics'">
                <p>
                  Изучаем ваши бизнес-процессы, ваших конкурентов, проводим бенчмаркинг решений.
                </p>
                <p>
                  Анализируем ЦА и её потребности.
                </p>
              </div>
            </transition>
          </div>
          <div class="icons">
            <img class="item-2 icon-1" src="../../../assets/images/section-4/item-2/icon-1.png" alt="" ondragstart="return false">
          </div>
        </div>
        <div class="item">
          <div class="folder">
            <p class="title" :class="currentCategory === 'design' ? 'active' : ''" @click="selectCategory('design')">Проектирование и дизайн</p>
            <transition mode="out-in" name="scaleY">
              <div class="text" v-show="currentCategory === 'design'">
                <p>
                  Разрабатываем удобный и понятный дизайн. Прорабатываем лучший пользовательский опыт: подготавливаем удобную навигацию, используем нативные компоненты, тщательно подбираем цвета и шрифты. Проводим юзабилити-тестирование дизайна. 
                </p>
              </div>
            </transition>
          </div>
          <div class="icons">
            <img class="item-3 icon-1" src="../../../assets/images/section-4/item-3/icon-1.png" alt="" ondragstart="return false">
            <img class="item-3 icon-2" src="../../../assets/images/section-4/item-3/icon-2.png" alt="" ondragstart="return false">
            <img class="item-3 icon-3" src="../../../assets/images/section-4/item-3/icon-3.png" alt="" ondragstart="return false">
            <img class="item-3 icon-4" src="../../../assets/images/section-4/item-3/icon-4.png" alt="" ondragstart="return false">
          </div>
        </div>
        <div class="item">
          <div class="folder">
            <p class="title" :class="currentCategory === 'development' ? 'active' : ''" @click="selectCategory('development')">Разработка</p>
            <transition mode="out-in" name="scaleY">
              <div class="text" v-show="currentCategory === 'development'">
                <p>
                  Ведем разработку по SCRUM (разбиваем весь проект на более мелкие части, спринты), что обеспечивает наглядность и контроль процесса. 
                </p>
                <p>
                  Нативная разработка осуществляется на языках Java и Kotlin для Android, Objective-C и Swift для iOS. Используем актуальные фреймворки и библиотеки.
                </p>
              </div>
            </transition>
          </div>
          <div class="icons">
            <img class="item-4 icon-1" src="../../../assets/images/section-4/item-4/icon-1.png" alt="" ondragstart="return false">
            <img class="item-4 icon-2" src="../../../assets/images/section-4/item-4/icon-2.png" alt="" ondragstart="return false">
          </div>
        </div>
        <div class="item">
          <div class="folder">
            <p class="title" :class="currentCategory === 'test' ? 'active' : ''" @click="selectCategory('test')">Тестирование</p>
            <transition mode="out-in" name="scaleY">
              <div class="text" v-show="currentCategory === 'test'">
                <p>
                  Каждый спринт заканчивается автоматическим и ручным тестированием для устранения багов и ошибок. В конце проекта производится масштабное финальное тестирование.
                </p>
                <p>
                  Обычно тестирование занимает существенную часть всего процесса разработки. В результате вы получаете готовый хорошо работающий продукт. 
                </p>
              </div>
            </transition>
          </div>
          <div class="icons">
            <img class="item-5 icon-1" src="../../../assets/images/section-4/item-5/icon-1.png" alt="" ondragstart="return false">
            <img class="item-5 icon-2" src="../../../assets/images/section-4/item-5/icon-2.png" alt="" ondragstart="return false">
          </div>
        </div>
        <div class="item">
          <div class="folder">
            <p class="title" :class="currentCategory === 'publish' ? 'active' : ''" @click="selectCategory('publish')">Публикация</p>
            <transition mode="out-in" name="scaleY">
              <div class="text" v-show="currentCategory === 'publish'">
                <p>
                  Готовим продукт к публикации в магазинах.
                </p>
                <p>
                  Делаем скриншоты и привлекательные картинки, создаём описание, иконки, баннеры, видео, подбираем ключевые слова для AppStore/Google Play. Если требуется, создаем аккаунты в этих системах для вашей компании и помогаем с публикацией приложений. 
                </p>
              </div>
            </transition>
          </div>
          <div class="icons">
            <img class="item-6 icon-1" src="../../../assets/images/section-4/item-6/icon-1.png" alt="" ondragstart="return false">
            <img class="item-6 icon-2" src="../../../assets/images/section-4/item-6/icon-2.png" alt="" ondragstart="return false">
            <img class="item-6 icon-3" src="../../../assets/images/section-4/item-6/icon-3.png" alt="" ondragstart="return false">
          </div>
        </div>
        <div class="item">
          <div class="folder">
            <p class="title" :class="currentCategory === 'support' ? 'active' : ''" @click="selectCategory('support')">Поддержка и развитие</p>
            <transition mode="out-in" name="scaleY">
              <div class="text" v-show="currentCategory === 'support'">
                <p>
                  Обеспечиваем стабильную работу приложения, адаптацию под новые версии ОС и доработку нового функционала. Вместе с вами развиваем проект, добавляя актуальные функции и фишки. Возможно заключение SLA для обеспечения нами надежности и безотказности работы ваших решений (защита от сбоев, техподдержка). 
                </p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <img class="bg-icon-1" src="../../../assets/images/section-4/element-1.png" alt="">
    <img class="bg-icon-2" src="../../../assets/images/section-4/bg-code.png" alt="">
    <img class="bg-icon-3" src="../../../assets/images/section-4/bg-code.png" alt="">
  </section>
</template>

<script>
export default {
  name: "Section-4",
  data: () => ({
    currentCategory: 'idea'
  }),
  methods: {
    selectCategory (category) {
      this.currentCategory = category
    }
  }
};
</script>

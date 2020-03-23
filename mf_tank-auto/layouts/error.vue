<template>
  <div>
    <div class="page flex fd-c jc-sb" id="page">
      <main class="main" v-if="error.statusCode === 404">
        <section class="error hero--delivery">
          <div class="error-bg">
            <div class="error-bg-img" style="background-image: url(/images/404s.png)">
              <!--<div class="container">
                  <div class="hero__inner">
                      <h1 class="hero__title">404</h1>
                      <p>Ошибка</p>
                  </div>
              </div> -->
            </div>
          </div>
        </section>
      </main>
      <main class="main" v-if="error.statusCode === 500">
        <section class="error hero--delivery">
          <div class="error-bg">
            <div class="error-bg-img" style="background-image: url(/images/500.png)">
              <!--<div class="container">
                  <div class="hero__inner">
                      <h1 class="hero__title">404</h1>
                      <p>Ошибка</p>
                  </div>
              </div> -->
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error']
  }
</script>

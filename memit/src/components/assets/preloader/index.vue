<template>
  <div id="preloader">
    <div class='spinner'>
      <div class='dot'></div>
      <div class='dot'></div>
      <div class='dot'></div>
      <div class='dot'></div>
      <div class='dot'></div>
      <div class='dot'></div>
      <div class='dot'></div>
    </div>
    <svg>
        <defs>
            <filter id='goo'>
                <feGaussianBlur in='SourceGraphic' stdDeviation='8' result='blur' />
                <feColorMatrix in='blur' mode='matrix' values='
                    1 0 0 0 0 
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 25 -8' result='goo' />
                <feBlend in='SourceGraphic' in2='goo' />
            </filter>
        </defs>
    </svg>
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="sass" src="./index.sass"></style>


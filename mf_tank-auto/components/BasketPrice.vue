<template lang="pug">
    nuxt-link.hero__cart(to="/cart")
        i.hero__cart-icon
          img(src="/images/cart.png" alt="cart")
        p.hero__cart-total Корзина (
          span {{getTotalSum}}
          |  руб)
</template>


<script>
    import api from '~/assets/js/api.js'

    export default {
        name: 'BasketPrice',
        components: {},
        props: {

        },
        data() {
            return {
                userCart: [],
            }
        },
        mounted() {
            this.getCartSum();
            this.$root.$on('basketChangeSum', () => {
                this.getCartSum();
            });
        },
        computed: {
            getTotalSum() {
                let total = 0;
                this.userCart.forEach(product => {
                    total += (
                            !isNaN(Number.parseFloat(product.price)) ? Number.parseFloat(product.price) : 0)
                        * Number(product.count)
                });
                return total.toFixed(2);
            }
        },
        methods: {
            getCartSum() {
                if(this.$cookie.get('user_hash')) {
                    api.getUserCart(this.$cookie.get('user_hash'))
                        .then(response => {
                            this.userCart = response;
                            let productsInfo = [];
                            this.userCart.forEach(product => {
                                productsInfo.push(
                                    api.getProductByCode(product.article)
                                );
                            });
                            return api.axios.all(productsInfo);
                        })
                        .then((response) => {
                            response.forEach(productInfo => {
                                this.userCart.forEach(productInCart => {
                                    if(productInCart.article === productInfo.view.part_number) {
                                        this.$set(productInCart, 'price', productInfo.view.price)
                                    }
                                })
                            });
                        })
                        .catch(error => {})
                }
            },
        }
    }
</script>

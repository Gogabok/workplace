var app = new Vue({
  el: '#app',
  data: () => ({
    items: [
      {
        "title": "Латте",
        "volume": "400мл",
        "price": 130,
        "image": '1.jpg',
        inCartAmount: 0
      },
      {
        "title": "Капучино",
        "volume": "400мл",
        "price": 120,
        "image": '1.jpg',
        inCartAmount: 0
      },
      {
        "title": "Латте",
        "volume": "300мл",
        "price": 110,
        "image": '1.jpg',
        inCartAmount: 0
      },
      {
        "title": "Американо",
        "volume": "400мл",
        "price": 110,
        "image": '1.jpg',
        inCartAmount: 0
      },
      {
        "title": "Капучино",
        "volume": "300мл",
        "price": 100,
        "image": '1.jpg',
        inCartAmount: 0
      },
      {
        "title": "Американо",
        "volume": "300мл",
        "price": 85,
        "image": '1.jpg',
        inCartAmount: 0
      },
      {
        "title": "Капучино",
        "volume": "200мл",
        "price": 80,
        "image": '1.jpg',
        inCartAmount: 0
      },
      {
        "title": "Эспрессо",
        "volume": "60мл",
        "price": 80,
        "image": '1.jpg',
        inCartAmount: 0
      },
      {
        "title": "Американо",
        "volume": "200мл",
        "price": 65,
        "image": '1.jpg',
        inCartAmount: 0
      },
      {
        "title": "Эспрессо",
        "volume": "30мл",
        "price": 60,
        "image": '1.jpg',
        inCartAmount: 0
      },
    ],
    modal: {
      isActive: false,
      lastItem: null
    }
  }),
  mounted() {
    if (localStorage.getItem("inCart")) {
      this.items = JSON.parse(localStorage.getItem("inCart"))
    }
  },
  methods: {
    addToCart(item) {
      let itemInList = this.items.find(i => i === item)
      if (itemInList.inCartAmount > 0) {
        itemInList.inCartAmount++
      } else {
        itemInList.inCartAmount = 1
      }
      this.modal.isActive = true
      this.modal.lastItem = itemInList
      localStorage.setItem("inCart", JSON.stringify(this.items))
    },
    closeModal() {
      this.modal.isActive = false
      this.modal.lastItem = null
    }
  },
  computed: {
    itemsInCart() {
      let acc = 0
      for(let i = 0; i < this.items.length; i++) {
        if(this.items[i].inCartAmount > 0) {
          acc += this.items[i].inCartAmount
        }
      }
      return acc 
    },
    itemsPriceInCart() {
      let acc = 0
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].inCartAmount > 0) {
          acc += this.items[i].inCartAmount * this.items[i].price
        }
      }
      return acc 
    },
    deliveryPrice() {
      let acc = 0
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].inCartAmount > 0) {
          acc += this.items[i].inCartAmount * this.items[i].price
        }
      }
      if(acc >= 400) {
        return 0
      } else {
        return 100
      }
    }
  }
})
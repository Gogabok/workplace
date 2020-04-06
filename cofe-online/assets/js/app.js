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
    },
    modalSuccessIsActive: false,
    form: {
      name: {
        value: '',
        isError: false
      },
      phone: {
        value: '',
        isError: false
      },
      isAgree: false
    }
  }),
  mounted() {
    if (localStorage.getItem("inCart")) {
      this.items = JSON.parse(localStorage.getItem("inCart"))
    }
  },
  methods: {
    makeOrder() {
      let xhr = new XMLHttpRequest();
      let text = `
Имя: ${this.form.name.value};
Телефон: ${this.form.phone.value};
Стоимость доставки: ${this.deliveryPrice}р;
Итог: ${this.itemsPriceInCart + this.deliveryPrice}р;
Товары:
      `
      for (let i = 0; i < this.inCart.length; i++) {
        text += `
${this.inCart[i].title} ${this.inCart[i].volume}, ${this.inCart[i].inCartAmount} шт., ${this.inCart[i].price * this.inCart[i].inCartAmount}р.`
      }

        xhr.open('POST', 'send.php', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { 

        }
      }
      xhr.send('text=' + encodeURIComponent(text));
    },
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
    deleteInCartItem(item) {
      let itemInList = this.items.find(i => i === item)
      itemInList.inCartAmount = 0
      localStorage.setItem("inCart", JSON.stringify(this.items))
    },
    changeAmountOfItem(item, e) {
      let itemInList = this.items.find(i => i === item)
      if(+e.value > 1) {
        itemInList.inCartAmount = +e.value
      } else {
        itemInList.inCartAmount = 1
      }
      if (+e.value < 99) {
        itemInList.inCartAmount = +e.value
      } else {
        itemInList.inCartAmount = 99
      }
      localStorage.setItem("inCart", JSON.stringify(this.items))
    },
    closeModal() {
      this.modal.isActive = false
      this.modal.lastItem = null
      this.modalSuccessIsActive = false
    },
    isError(input) {
      if(input !== 'phone') {
       this.form[input].isError = this.form[input].value.length <= 3
      } else {
        let phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        this.form.phone.isError = !phonePattern.test(this.form.phone.value)
      }
    }
  },
  computed: {
    inCart() {
      let inCart = []
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].inCartAmount > 0) {
          inCart.push(this.items[i])
        }
      }
      return inCart
    },
    isBtnActive () {
      if (!this.form.name.isError && this.form.name.value.length > 0 && this.form.phone.value.length > 0 && !this.form.phone.isError && this.form.isAgree) {
        return false
      } else {
        return true
      }
    },
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
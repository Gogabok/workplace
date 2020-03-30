
const filters = document.getElementById("filters");
const folderItems = document.getElementById("folder_items")
const folderPagination = document.getElementById("folder_pagination")
let folderCart = document.getElementById("cart-items")
let items = null
let allItems = null
let currentPage = 1
const pageRangeValue = 15
let filtersValues = {
  name: '',
  price: {
    min: 0,
    max: 1000
  },
  isAvaliable: false
}
let inCart = []

window.onload = function () {
  // У меня меньше товаров, чем 3000, так как фейк сервер разрешает хранить только
  // 10.000 символов 
  fetch("https://my-json-server.typicode.com/Gogabok/workplace/db")
    .then(response => {
      if (response.status >= 400) {
        return Promise.reject();
      }
      return response.json();
    })
    .catch(() => {
      alert('404')
    })
    .then(response => {
      items = JSON.parse(JSON.stringify(response.items))
      allItems = items
      inCart = JSON.parse(localStorage.getItem("InCart")) ? JSON.parse(localStorage.getItem("InCart")) : []
      RENDER_ITEMS()
      RENDER_PAGINATION()
      RENDER_CART()
    })
}


document.getElementById("filters-switchers").addEventListener('click', () => {
  if (filters.style.visibility === 'hidden') {
    filters.style.visibility = 'visible';
    filters.style.opacity = '1';
  } else {
    filters.style.visibility = 'hidden';
    filters.style.opacity = '0';
  }
});

document.getElementById("filtersSubmit").addEventListener('click', () => {
  filters.style.visibility = 'hidden';
  filters.style.opacity = '0';
  sortItems()
});

function pageSelecting(e) {
  currentPage = Number(e.getAttribute('data-page'))
  RENDER_ITEMS()
  RENDER_PAGINATION()
}

function nameInputSelecting(e) {
  filtersValues.name = e.value
}

function priceInputSelecting(e) {
  let minInput = document.getElementById("min")
  let maxInput = document.getElementById("max")
  if (e.id === 'min' && Number(minInput.value) >= Number(maxInput.value)) {
    minInput.value = maxInput.value
  } else if (e.id === 'max' && Number(maxInput.value) <= Number(minInput.value)) {
    maxInput.value = minInput.value
  }
  filtersValues.price[e.id] = Number(e.value);
  document.getElementById(`${e.id}Value`).innerHTML = ''
  document.getElementById(`${e.id}Value`).innerHTML = filtersValues.price[e.id]
}

function isAvaliableInputSelecting(e) {
  filtersValues.isAvaliable = e.checked
}

function sortItems() {
  items = allItems.filter(function (item) {
    let isFiltered = false
    isFiltered = !!item.title.toLowerCase().match(filtersValues.name.toLowerCase())
    if (isFiltered) {
      isFiltered = item.price >= filtersValues.price.min && item.price <= filtersValues.price.max
    }
    if (isFiltered && filtersValues.isAvaliable) {
      isFiltered = item.available === filtersValues.isAvaliable
    }
    return isFiltered
  })
  currentPage = 1
  RENDER_ITEMS()
  RENDER_PAGINATION()
  RENDER_CART()
}

function addToCart(id) {
  let inCartItem = allItems.find(thing => thing.id === id)
  let isInCart = inCart.find(thing => thing.id === id)
  if (isInCart) {
    isInCart.amount++
  } else {
    inCartItem.amount = 1
    inCart.push(inCartItem)
  }
  localStorage.setItem("InCart", JSON.stringify(inCart))
  RENDER_CART()
}

function removeFromCart(id) {
  let ItemInCart = inCart.find(thing => thing.id === id)
  let indexInCart = inCart.findIndex(thing => thing === ItemInCart)
  if (ItemInCart.amount > 1) {
    ItemInCart.amount--
  } else {
    if (document.getElementById(`${ItemInCart.id}-inCartValue`)) {
      document.getElementById(`${ItemInCart.id}-inCartValue`).innerHTML = 0
    }
    inCart.splice(indexInCart, 1)
  }

  localStorage.setItem("InCart", JSON.stringify(inCart))
  RENDER_CART()
}

function RENDER_CART() {
  if (inCart.length < 1) {
    document.getElementById("folder-aside-cart").style.visibility = 'hidden'
    document.getElementById("folder-aside-cart").style.position = 'absolute'
    document.getElementById("folder-aside-cart").style.right = '0'
    document.getElementById("folder-aside-cart").style.width = '0px'
    document.getElementById("folder-aside-cart").style.padding = '0px'
    document.getElementById("folder-aside-cart").style.opacity = '0'
  } else {
    document.getElementById("folder-aside-cart").style.visibility = 'visible'
    document.getElementById("folder-aside-cart").style.position = 'relative'
    document.getElementById("folder-aside-cart").style.width = '100%'
    document.getElementById("folder-aside-cart").style.padding = '15px'
    document.getElementById("folder-aside-cart").style.opacity = '1'
  }
  let HTML = ''
  folderCart.innerHTML = ''
  let summaryPrice = 0
  if (inCart.length > 0) {
    for (let i = 0; i < inCart.length; i++) {
      summaryPrice += inCart[i].price * inCart[i].amount
      if (document.getElementById(`${inCart[i].id}-inCartValue`)) {
        document.getElementById(`${inCart[i].id}-inCartValue`).innerHTML = inCart[i].amount
      }
      HTML +=
        `
          <div class="cart-item">
            <img onclick="removeFromCart(${inCart[i].id})" class="cart-item-close" ondragstart="return false" src="./assets/images/close.svg" alt="">
            <img class="cart-item-image" ondragstart="return false"
              src="${inCart[i].image}" alt="">
            <p class="cart-item-title">${inCart[i].title}</p>
            <p class="cart-item-amount">x${inCart[i].amount}</p>
          </div>
        `
    }
  }
  document.getElementById("summaryPrice").innerHTML = `${summaryPrice}₽`
  folderCart.innerHTML = HTML
}

function RENDER_ITEMS() {
  let HTML = ''
  folderItems.innerHTML = ''
  // Реализация пагинации не очень, хотелось бы сделать через параметр запроса к api
  let arrayPagesRange = [(currentPage - 1) * pageRangeValue, currentPage * pageRangeValue]
  for (let i = arrayPagesRange[0]; i < arrayPagesRange[1]; i++) {
    if (items[i]) {
      HTML +=
        `
        <div class="folder-main-side-catalog-item">
          <img ondragstart="return false" class="folder-main-side-catalog-item-preview"
            src="${items[i].image}" alt="">
          <div class="folder-main-side-catalog-item-text">
            <p class="folder-main-side-catalog-item-text-title">${items[i].title}</p>
            <p class="folder-main-side-catalog-item-text-price">Стоимость: <span class="text-primary">${items[i].price}₽</span></p>
            <p class="folder-main-side-catalog-item-text-desc">${items[i].descr}</p>
          </div>
          <div class="addToCart">
            <button onclick="addToCart(${JSON.stringify(items[i].id)})" class="addToCart-btn btn btn-success ${items[i].available ? '' : 'disabled'}" ${items[i].available ? '' : 'disabled'}>Добавить в корзину</button>
            <p class="addToCart-text">В корзине: <span id="${JSON.stringify(items[i].id)}-inCartValue">0</span></p>
          </div>
        </div>
      `
    }
  }
  folderItems.innerHTML = HTML
}

function RENDER_PAGINATION() {
  folderPagination.innerHTML = ''
  document.getElementById("first-page").innerHTML = ''
  document.getElementById("last-page").innerHTML = ''
  let amountPages = Math.ceil(items.length / pageRangeValue)
  if (amountPages >= 2) {
    let pages = [currentPage - 1, currentPage, (currentPage + 1)];
    let HTML = ''
    if (amountPages > 1) {
      for (let i = 0; i < pages.length; i++) {
        if (pages[i] > 0 && pages[i] <= amountPages) {
          HTML +=
            `
            <li class="page-item btn ${pages[i] === currentPage ? 'btn-primary' : 'btn-outline-primary'} text-white mx-1" onclick="pageSelecting(event.target)" data-page="${pages[i]}">${pages[i]}</li>
          `
        }
      }
      folderPagination.innerHTML = HTML
      document.getElementById("last-page").innerHTML =
        currentPage < amountPages ?
          `
        <li class="page-item btn btn-outline-primary text-white" onclick="pageSelecting(event.target)" data-page="${amountPages}">${amountPages}</li>
        `
          :
          `
        <li class="page-item btn btn-primary disabled text-white">${amountPages}</li>
        `

      document.getElementById("first-page").innerHTML =
        currentPage > 1 ?
          `
        <li class="page-item btn btn-outline-primary text-white" onclick="pageSelecting(event.target)" data-page="1">1</li>
        `
          :
          `
        <li class="page-item btn btn-primary disabled text-white">1</li>
        `
    }
  }
}

const filters = document.getElementById("filters");
const folderItems = document.getElementById("folder_items")
const folderPagination = document.getElementById("folder_pagination")
let items = null
let allItems = null
let currentPage = 1
const pageRangeValue = 5
let filtersValues = {
  name: '',
  price: {
    min: 0,
    max: 1000
  },
  isAvaliable: false
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

function pageSelecting (e) {
  currentPage = Number(e.getAttribute('data-page'))
  RENDER_ITEMS()
  RENDER_PAGINATION()
}

function nameInputSelecting (e) {
  filtersValues.name = e.value
}

function priceInputSelecting (e) {
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

function sortItems () {
  items = allItems.filter(function(item) {
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
}


fetch("https://my-json-server.typicode.com/Gogabok/workplace/db")
  .then(response => {
    if (response.status >= 400) {
      return Promise.reject();
    }
    return response.json();
  })
  .then(response => {
    items = JSON.parse(JSON.stringify(response.items))
    allItems = items
    RENDER_ITEMS()
    RENDER_PAGINATION()
  })

function RENDER_ITEMS() {
  let HTML = ''
  folderItems.innerHTML = ''
  // Реализация пагинации не очень, хотелось бы сделать через параметр запроса к api
  let arrayPagesRange = [(currentPage - 1) * pageRangeValue, currentPage * pageRangeValue]
  for (let i = arrayPagesRange[0]; i < arrayPagesRange[1]; i++) {
    if(items[i]) {
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
            <button class="addToCart-btn btn btn-success ${items[i].available ? '' : 'disabled'}" ${items[i].available ? '' : 'disabled'}>Добавить в корзину</button>
            <p class="addToCart-text">В корзине: 0</p>
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
  } else {

  }
}
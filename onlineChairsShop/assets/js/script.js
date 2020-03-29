
const filters = document.getElementById("filters");
const folderItems = document.getElementById("folder_items")
const folderPagination = document.getElementById("folder_pagination")
let items = null
let currentPage = 1
const pageRangeValue = 5
let filtersValues = {
  name: '',
  price: {
    min: 0,
    max: 0
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
  console.log(filtersValues)
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


fetch("https://my-json-server.typicode.com/Gogabok/workplace/db")
  .then(response => {
    if (response.status >= 400) {
      return Promise.reject();
    }
    return response.json();
  })
  .then(response => {
    items = JSON.parse(JSON.stringify(response.items))
    RENDER_ITEMS()
    RENDER_PAGINATION()
  })

function RENDER_ITEMS() {
  let HTML = ''
  folderItems.innerHTML = ''
  // Реализация пагинации не очень, хотелось бы сделать через параметр запроса к api
  let arrayPagesRange = [(currentPage - 1) * pageRangeValue, currentPage * pageRangeValue]
  for (let i = arrayPagesRange[0]; i < arrayPagesRange[1]; i++) {
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
          <button class="addToCart-btn btn-success">Добавить в корзину</button>
          <p class="addToCart-text">В корзине: 0</p>
        </div>
      </div>
    `
  }
  folderItems.innerHTML = HTML
}

function RENDER_PAGINATION () {
  let pages = [currentPage - 1, currentPage, (currentPage + 1)];
  let HTML = ''
  folderPagination.innerHTML = ''
  if ((items.length / pageRangeValue) > 1) {
    for (let i = 0; i < pages.length; i++) {
      if (pages[i] > 0 && pages[i] <= (items.length / pageRangeValue)) {
        HTML += 
        `
          <li class="page-item btn ${pages[i] === currentPage ? 'btn-primary' : 'btn-outline-primary'} text-white mx-1" onclick="pageSelecting(event.target)" data-page="${pages[i]}">${pages[i]}</li>
        `
      }
    }
    folderPagination.innerHTML = HTML

    document.getElementById("last-page").innerHTML =
      currentPage < (items.length / pageRangeValue) ?
      `
      <li class="page-item btn btn-outline-primary text-white" onclick="pageSelecting(event.target)" data-page="${items.length / pageRangeValue}">${items.length / pageRangeValue}</li>
      `
      : 
      `
      <li class="page-item btn btn-primary disabled text-white">${items.length / pageRangeValue}</li>
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
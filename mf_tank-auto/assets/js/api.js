import axios from 'axios';

const http = axios.create({
  baseURL: "http://backend.autoen.ru/api/",
  headers: {
    "Content-Type": "application/json"
  }
});

http.interceptors.request.use((config) => {
  config.params = {};
  return config
});

http.interceptors.response.use(
  function(response) {
    return Promise.resolve(response.data);
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default {
  getPassengers() {
    return http.get('/manufacturers/passengers')
  },
  getPartsCategories() {
    return http.get('/sections/main')
  },
  getModels(manufacturerId) {
    return http.get(`/models/passengers?description=${manufacturerId}`)
  },
  getModifications(manufacturer, modelId) {
    return http.get(`/passanger-cars/modifications?brand_description=${manufacturer}&model_description=${modelId}`)
  },
  getGarageSections(manufacturer, model, modificationId) {
    return http.get(`/sections/all?brand_description=${manufacturer}&model_description=${model}&modification_description=${modificationId}`)
  },
  getChildSection(modificationId, childId, page) {
    return http.get(`/details/list?modification_id=${modificationId}&section_id=${childId}${page ? '&page=' + page : ''}`)
  },
  // ??
  getProductByCode(code) {
    return http.get(`/details/view?code=${code}`)
  },
  // ??
  getProductById(id) {
    return http.get(`/details/view?id=${id}`)
  },
  getSectionById(sectionId, modificationId) {
    return http.get(`/sections/view?id=${sectionId}&modification_id=${modificationId}`)
  },
  getCarInfoByModificationId(modificationId) {
    return http.get(`/passanger-cars/view?id=${modificationId}`)
  },
  sendForm(name, phone, text) {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('phone', phone);
    params.append('text', text);
    return http.post(`/feedback/create`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  getUserHash() {
    return http.get('/basket/str')
  },
  addItemToCart(modificationId, sectionId, article, userHash, price) {
    const params = new URLSearchParams();
    params.append('count', 1);
    params.append('article', article);
    params.append('modification_id', modificationId);
    params.append('section_id', sectionId);
    params.append('str', userHash);
    params.append('price', price);
    return http.post('/basket/create', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  getUserCart(userHash) {
    return http.get(`/basket/index?str=${userHash}`)
  },
  updateProductInCart(productIdInCart, count) {
    const params = new URLSearchParams();
    params.append('count', count);
    return http.put(`/basket/update/${productIdInCart}`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  createOrder(userHash, name, phone) {
    const params = new URLSearchParams();
    params.append('str', userHash);
    params.append('name', name);
    params.append('phone', phone);

    return http.post(`/orders/create`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  axios,
  baseUrl: 'http://backend.autoen.ru'
}


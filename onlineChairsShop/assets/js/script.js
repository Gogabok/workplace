
let filters = document.getElementById("filters");

document.getElementById("filters-switchers").addEventListener('click', () => {
  if (filters.style.visibility === 'hidden') {
    filters.style.visibility = 'visible';
    filters.style.opacity = '1';
  } else {
    filters.style.visibility = 'hidden';
    filters.style.opacity = '0';
  }
})

document.getElementById("filters-success").addEventListener('click', () => {
  filters.style.visibility = 'hidden';
  filters.style.opacity = '0';
})

// fetch("https://github.com/Gogabok/workplace/blob/master/db.json").then(data => {
//   console.log(data)
// })




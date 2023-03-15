const cardsContainer = document.querySelector("#cardContainer");
const categoriesContainer = document.querySelector("#categoriesContainer");

let currDate = data.currentDate;
let categories = categoryFilter(data.events);
createCard(data.events, currDate);
createCategory(categories);

function printHTML(info, container) {
    container.innerHTML = info;
}

function createCard(arreglo, fecha) {
    let cards = "";
    if (arreglo.length == 0) {
        cards += `<h3>No se encontraron resultados</h3>`
    }

    arreglo.forEach(card => {
        let cardDate = card.date;
        if (fecha < cardDate) {
            cards += `<div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="card mb-3 h-28">
                        <img class="card-img-top" src="${card.image}" alt="Photo">
                        <div class="card-body">
                            <h5 class="card-title d-flex justify-content-center mb-4">${card.name}</h5>
                            <p class="card-text">${card.description}</p>
                            <div class="d-flex justify-content-between mt-5">
                                <p class="card-text">$${card.price}</p>
                                <a href="details.html?id=${card._id}" class="btn btn-primary">More info</a>
                            </div>
                        </div>
                    </div>
                </div>`
        }
    })
    printHTML(cards, cardsContainer);
}

function categoryFilter(arrayData) {
    let arrayCategories = [];
    for (const card of arrayData) {
        let cardCategory = card.category;
        if (!(arrayCategories.includes(cardCategory))) {
            arrayCategories.push(cardCategory);
        } 
    }
    return arrayCategories;
}

function createCategory(categoriesArray) {
    let categories = "";
    categoriesArray.forEach(category => {
        categories += `<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
        <label class="form-check-label" for="${category}">${category}</label>
    </div>`   
    })
    printHTML(categories, categoriesContainer);
}

const buscador = document.querySelector("#buscador");

function filtrarArrayPorTexto(array, texto) {
    return array.filter(evento => evento.name.toLowerCase().includes(texto.toLowerCase()) || evento.description.toLowerCase().includes(texto.toLowerCase()));
}

function filtrarPorCategoria(array) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    let chboxArray = Array.from(checkboxes);
    let checkd = chboxArray.filter(check => check.checked);
    if(checkd.length == 0){
        return array;
      }
      let category = checkd.map(check => check.value);
      let filtroArray = array.filter(e => category.includes(e.category));
      return filtroArray; 
}

buscador.addEventListener("input", () =>  {
    // let filteredArray = filtrarArrayPorTexto(data.events, buscador.value);
    // createCard(filteredArray, currDate);
    dobleFiltro();
})

categoriesContainer.addEventListener('change',dobleFiltro);

function dobleFiltro(){
    let textFiltered = filtrarArrayPorTexto(data.events, buscador.value);
    let categoryFiltered = filtrarPorCategoria(textFiltered);
    createCard(categoryFiltered, currDate);
}

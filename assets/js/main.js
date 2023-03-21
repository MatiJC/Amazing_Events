const cardsContainer = document.querySelector("#cardContainer");
const categoriesContainer = document.querySelector("#categoriesContainer");

let events = [];
let categories = [];
const buscador = document.querySelector("#buscador");

buscador.addEventListener("input", () =>  {
    // let filteredArray = filtrarArrayPorTexto(events, buscador.value);
    // createCard(filteredArray);
    dobleFiltro();
})

categoriesContainer.addEventListener('change',dobleFiltro);
document.querySelector(".btn").addEventListener('click', (e) => {
    e.preventDefault();
});

function getData() {
    // fetch('./assets/js/data.json')
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(dataAPI => {
        events = dataAPI.events;
        categories = categoryFilter(dataAPI.events);
        createCard(events);
        createCategory(categories);
    })
    .catch(error => console.log(error.message));
    
}

getData();


function printHTML(info, container) {
    container.innerHTML = info;
}

function createCard(arreglo) {
    let cards = "";
    if (arreglo.length == 0) {
        cards += `<h3>No se encontraron resultados</h3>`
    }
    
    arreglo.forEach(card => {
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
    })
    printHTML(cards, cardsContainer);
}

function categoryFilter(arreglo) {
    let arrayCategories = [];
    arreglo.forEach(evento => {
        let cardCategory = evento.category;
        if (!(arrayCategories.includes(cardCategory))) {
            arrayCategories.push(cardCategory);
        }
    })
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

function dobleFiltro(){
    let textFiltered = filtrarArrayPorTexto(events, buscador.value);
    let categoryFiltered = filtrarPorCategoria(textFiltered);
    createCard(categoryFiltered);
}


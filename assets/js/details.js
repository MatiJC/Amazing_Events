const container = document.querySelector('#container');
const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
let eventSelected;

function getData() {
    // fetch('./assets/js/data.json')
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(dataAPI => {
        events = dataAPI.events;
        eventSelected = events.find(evento => evento._id == id);
        createCard(eventSelected);
    })
    .catch(error => console.log(error.message));
    
}

getData();

function printHTML(info, container) {
    container.innerHTML = info;
}

function createCard(card) {
    card += `<div class="card m-auto">
            <div class="row no-gutters justify-content-evenly">
                <div class="col-md-4">
                <img src="${eventSelected.image}" class="card-img-horizontal p-3 table-border" alt="Photo">
            </div>
            <div class="col-md-4">
                <div class="card-body">
                    <h5 class="card-title d-flex justify-content-center mb-4">${eventSelected.name}</h5>
                    <p class="card-text">${eventSelected.description}</p>
                    <div class="d-flex justify-content-evenly">
                        <p class="card-text">Category: ${eventSelected.category}</p>
                        <p class="card-text">Date: ${eventSelected.date}</p>
                    </div>
                    <div class="d-flex justify-content-evenly">
                        <p class="card-text">$${eventSelected.price}</p>
                        <p class="card-text">Place: ${eventSelected.place}</p>
                    </div>
                    <a href="index.html" class="card-link d-flex justify-content-center"> Volver al Inicio </a> 
                </div>
            </div>`
    printHTML(card, container);
}


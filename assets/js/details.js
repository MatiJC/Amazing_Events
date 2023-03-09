const queryString = location.search;

const params = new URLSearchParams(queryString);

const id = params.get('id');

const eventSelected = data.events.find(evento => evento._id == id);

const container = document.querySelector('#container');

container.innerHTML = `<div class="card m-auto">
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
</div>`;
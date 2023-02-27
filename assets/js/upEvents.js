const contenedorTarjetas = document.querySelector("#cardContainer");

let currDate = new Date(currentDate).getTime();
let generatedCards = createCard(events, currDate);

contenedorTarjetas.innerHTML = generatedCards;

function createCard(arreglo, fecha) {
    let cards = "";
    for (const card of arreglo) {
        let cardDate = new Date(card.date).getTime();
        if (fecha < cardDate) {
            cards += `<div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="card mb-3">
                        <img class="card-img-top" src="${card.image}" alt="Photo">
                        <div class="card-body">
                            <h5 class="card-title d-flex justify-content-center">${card.name}</h5>
                            <p class="card-text">${card.description}</p>
                            <div class="d-flex justify-content-between">
                                <p class="card-text">$${card.price}</p>
                                <a href="details.html" class="btn btn-primary">More info</a>
                            </div>
                        </div>
                    </div>
                </div>`
        }
    }
    return cards;
}

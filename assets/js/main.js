const containerCards = document.querySelector("#cardContainer");
const containerCategories = document.querySelector("#categoriesContainer");

let generatedCards = createCard(data.events);
let categories = categoryFilter(data.events);
let generatedCategories = createCategory(categories);

containerCards.innerHTML = generatedCards;
containerCategories.innerHTML = generatedCategories;

function createCard(arreglo) {
    let cards = "";
    for (const card of arreglo) {
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
    return cards;
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
    let categoriesInner = "";
    for(let category of categoriesArray) {
        let index = categoriesArray.indexOf(category) + 1;
        let optionText = "option" + index;
        categoriesInner += `<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="${category}" value="${optionText}">
        <label class="form-check-label" for="${category}">${category}</label>
    </div>`
    }
    return categoriesInner;

}


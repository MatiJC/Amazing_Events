let events = [];
let currentDate;
let pastEvents, upcomingEvents = [];

function getData() {
    // fetch('./assets/js/data.json')
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(dataAPI => {
        events = dataAPI.events;
        currentDate = dataAPI.currentDate;
        pastEvents = filterPastEvents(events, currentDate);
        upcomingEvents = filterUpEvents(events, currentDate);
        printStatTable(results(checkPercentageAttendance(pastEvents), checkPercentageAttendance(pastEvents).reverse(), checkMaxCapacity(pastEvents)), "statisticsTable");

        printTable(dataTable(upcomingEvents), "upTable");
        printTable(dataTable(pastEvents), "pastTable");

    })
    .catch(error => console.log(error.message));
    
}

getData();


function filterUpEvents(array, date) {
    return array.filter(evento => evento.date > date);
}

function filterPastEvents(array, date) {
    return array.filter(evento => evento.date < date);
}

function checkPercentageAttendance(array) {
    let percentageArray = array.map(event => {
        return {
            attendance: (event.assistance / event.capacity) * 100,
            nameEvent: event.name
        }
    })
    percentageArray.sort((a, b) => b.attendance - a.attendance);
    return percentageArray;
}

function checkMaxCapacity(array) {
    let capacityArray = array.map(event => {
        return {
            capacity: event.capacity,
            nameEvent: event.name
        }
    })
    capacityArray.sort((a, b) => b.capacity - a.capacity);
    return capacityArray;
}

function results(highestPercentage, lowestPercentage, largerCapacity) {
    let all = {
      highestPercentage: highestPercentage[0].nameEvent,
      lowestPercentage: lowestPercentage[0].nameEvent,
      largerCapacity: largerCapacity[0].nameEvent
    }
    return all
  }

function dataTable(array) {
    let categories = Array.from(new Set(array.map(arr => arr.category)));
    let eventCategories = categories.map(cat => array.filter(event => event.category == cat))
    let result = eventCategories.map(eventCat => {
        let calculate = eventCat.reduce((counter, event) => {
            counter.category = event.category;
            counter.revenues += event.price * (event.assistance || event.estimate);
            counter.attendance += ((event.assistance || event.estimate) * 100) / event.capacity
            return counter
      }, {
        category: "",
        revenues: 0,
        attendance: 0
      })
      calculate.attendance = calculate.attendance / eventCat.length
      return calculate;
    })
    return result;
  }

  function printStatTable(results, container) {
    const table = document.getElementById(container)
    table.innerHTML = `
    <tr>
        <td class="col-4 table-border">${results.highestPercentage}</td>
        <td class="col-4 table-border">${results.lowestPercentage}</td>
        <td class="col-4 table-border">${results.largerCapacity}</td>
    </tr>
    `
  }
  
  function printTable(array, container) {
    const table = document.getElementById(container);
    let html = array.map(events => {
      return `
        <tr>
                <td class="col-4 table-border">${events.category}</td>
                <td class="col-4 table-border">$${events.revenues}</td>
                <td class="col-4 table-border">${events.attendance.toFixed(2)}%</td>
            </tr>
        `
    })
    table.innerHTML = html.join("")
  }
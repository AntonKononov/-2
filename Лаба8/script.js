var key = prompt("Введіть ключ: ");

set_key(key);
var main_url = `https://cloud.iexapis.com/stable/`;
var url = `${main_url}stock/market/batch?symbols=AMZN,ADBE,TSLA,TMUS,QCOM,NFLX,MSFT,INTC&types=quote&filter=companyName,symbol,latestPrice,change&token=${key}`;
var update_url = `${main_url}stock/market/batch?symbols=AMZN,ADBE,TSLA,TMUS,QCOM,NFLX,MSFT,INTC&types=quote&filter=latestPrice,change&token=${key}`;

const Interval = 20000;
var time_Update = 0;
var body = document.querySelector('body');
var header = document.querySelector('header');
var section = document.querySelector("section");

function set_key(val) {
    localStorage.setItem(val.id, val.value);
}

function get_key(val) {
    if (!localStorage.getItem(val.id)) {
        return val;
    }
    return localStorage.getItem(val.id);
}

var json = [];
var letcreatetable = false;
async function sendRequest(url) {
    var response = await fetch(url);
    if (response.ok) {
        let jeson = await response.json();
        json.push(jeson);
        if (letcreatetable == false) {
            makeTable(json);
            console.log(json);
            letcreatetable = true;
        } else {
            updateTable(json);
        }
        time_Update = Date.now();
    } else {
        alert("error");
    }
    return json;
}

sendRequest(url);


function makeTable(data) {
    let table = document.createElement("table"),
        h1 = document.createElement("h1"),
        t_headlines = document.createElement("t_headlines"),
        t_body = document.createElement("t_body"),
        t_Update = document.createElement("span");

    t_Update.id = "time_to_Update";
    h1.innerHTML += "Минуле оновлення було: ";
    h1.appendChild(t_Update);
    h1.innerHTML += "c назад";
    header.appendChild(h1);

    var list = ["Компанія", "Позиція", "Остання ціна позиції", "Різниця з моменту останнього оновлення"];
    let tr = document.createElement("tr");
    //for (i of Object.keys(Object.values(Object.values(data)[0])[0])) {
    for (i of list) {
        let th = document.createElement("th");
        th.textContent = i;
        tr.appendChild(th);
    }

    t_headlines.appendChild(tr);
    table.appendChild(t_headlines);

    for (i in data[0]) {
        let tr = document.createElement("tr");
        tr.id = i;
        for (j in data[0][i].quote) {
            let td = document.createElement("td");
            td.id = j;
            td.textContent = data[0][i].quote[j];
            tr.appendChild(td);
        }
        t_body.appendChild(tr);
    }
    table.appendChild(t_body);
    section.appendChild(table);
}

function updateTable(data) {
    for (i in data) {
        for (j in data[i].quote) {
            section.querySelector("#" + i + ' > #' + j).textContent = data[i].quote[j];
        }
    }
}

var observable = rxjs.interval(20000);
observable.subscribe(() => {
    sendRequest(update_url);
});

var time_to__next_Update = rxjs.interval(100);
time_to__next_Update.subscribe(() => {
    if (time_Update != 0) {
        document.getElementById("time_to_Update").textContent =
            Math.round((Date.now() - time_Update) / 100) / 10;
    }
});
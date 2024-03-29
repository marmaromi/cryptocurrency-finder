/// <reference path="jquery-3.6.0.js" />

"use strict";

$(function () {

    // Clear local storage
    (function () {
        const togglesOn = JSON.parse(localStorage.getItem("togglesOn"));
        localStorage.clear();
        if (togglesOn !== null && togglesOn !== []) {
            localStorage.setItem("togglesOn", JSON.stringify(togglesOn));
        }
    })();

    function addSearchBar() {
        const searchBar = `<div class="row float-md-end w-md-auto"> <div class="col-8"> <input type="text" id="searchBox" class="form-control" placeholder="Search a coin"> </div> <div class="col gx-2"> <button id="searchButton" class="btn btn-outline-primary btn-light">Search</button> </div> </div>`;
        $(`#searchBar`).html(searchBar);
    } addSearchBar();


    $("#topMenu").on("click", "#homeButton", function () {
        clearInterval(JSON.parse(localStorage.getItem("myInterval")));
        addSearchBar();
        fetchData();
    });

    $("#topMenu").on("click", "#liveReportsButton", function () {
        clearInterval(JSON.parse(localStorage.getItem("myInterval")));
        const checkedToggles = JSON.parse(localStorage.getItem("togglesOn"));
        $(`#searchBar`).html("");
        if (checkedToggles !== null && checkedToggles.length > 0) {
            $.ajax({
                url: "html/live-reports.html",
                success: show => $(`#sectionMain`).html(show),
                error: err => console.log(err)
            });
        }
        else {
            $(`#sectionMain`).html(`<div class="d-flex justify-content-center m-4">No coins selected</div>`)
        }
    });

    $("#topMenu").on("click", "#aboutButton", function () {
        clearInterval(JSON.parse(localStorage.getItem("myInterval")));
        $(`#searchBar`).html("");
        $.ajax({
            url: "html/about.html",
            success: show => $(`#sectionMain`).html(show),
            error: err => console.log(err)
        });
    });


    const searchCoin = () => {
        // simple search
        let searchValue = $("input[id='searchBox']").val().toLowerCase();
        let coinList = JSON.parse(localStorage.getItem("coinListSymbolOnly"));
        if (coinList.includes(searchValue) && searchValue !== "") {
            let coinObjects = JSON.parse(localStorage.getItem("coinList"));
            let selectedCoin = coinObjects.filter(obj => obj.symbol === searchValue);
            displayCoins(selectedCoin, 1)
        }
        else {
            $(`#sectionMain`).html(`<div class="d-flex justify-content-center m-4">Coin not found</div>`)
        }
    }
    $("#searchBar").on("click", "#searchButton", searchCoin);
    $("#searchBar").on("keydown", "#searchBox", (e) => { if (e.key === 'Enter') searchCoin() });


    function fetchData(displayLimit = 30) {
        $(`#sectionMain`).html(`<div class="d-flex justify-content-center">
                                <span class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status" aria-hidden="true"></span>
                            </div>`);
        $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/",
            success: coinList => {
                let array = [];
                for (const coin of coinList) {
                    array.push(coin.symbol);
                }
                localStorage.setItem("coinListSymbolOnly", JSON.stringify(array));
                localStorage.setItem("coinList", JSON.stringify(coinList));
                displayCoins(coinList, displayLimit);
            },
            error: err => console.log(err)
        });
    }; fetchData();

    function displayCoins(coinList, limit) {
        $(`#sectionMain`).html(`<div id="coinCards" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3"></div>`)
        let coinCard = "";
        for (let i = 0; i < limit; i++) {
            coinCard = `
                <div class="col">
                    <div class="card shadow-sm pt-3 px-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="card-body">
                                <h5 class="card-title"id="coinSymbol${i}">${coinList[i].symbol}</h5>
                                    <p class="card-text" id="coinId${i}">${coinList[i].id}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group pt-3">
                                            <button type="button" class="btn btn-sm btn-primary" 
                                            id="moreInfo" name="${coinList[i].id}" type="button" 
                                            data-bs-toggle="collapse" data-bs-target="#collapse_${coinList[i].id}"
                                            aria-expanded="false" aria-controls="collapse_${coinList[i].id}">More Info
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center col-4 p-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" ${isTheSwitchChecked([coinList[i].id, coinList[i].symbol])} name="${coinList[i].id}" symbol="${coinList[i].symbol}" style="transform: scale(1.8);">
                                </div>
                            </div>
                        </div>
                        <div class="collapse" id="collapse_${coinList[i].id}" name="${coinList[i].id}">
                            <div class="card card-body" id="collapse_card_${coinList[i].id}">    
                        </div>
                    </div>
                </div>`
            $("#coinCards").append(coinCard);
        }

        $(`#sectionMain`).append(`
            <div class="d-flex justify-content-center m-2">
                <button id="loadCoins" class="btn btn-primary">Load All</button>
            </div>`)
        showModalIfNecessary();
    }

    // Load all coins
    $("#sectionMain").on("click", "#loadCoins", function () {
        let coinList = JSON.parse(localStorage.getItem("coinList"));
        fetchData(coinList.length)
    })

    const displayModalCoins = (coinList) => {
        $(`#sectionModal`).html(`<div id="modalCards" class="row row-cols-1 g-2"></div>`);
        for (let i = 0; i < coinList.length; i++) {
            let coinCard = `
                <div class="col">
                    <div class="card shadow-sm pt-3 px-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="card-body">
                                <h5 class="card-title"id="coinSymbol${i}">${coinList[i][1]}</h5>
                                    <p class="card-text" id="coinId${i}">${coinList[i][0]}</p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center col-4 p-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" checked id="flexSwitchCheckDefault" name="${coinList[i][0]}" symbol="${coinList[i][1]}" style="transform: scale(1.8);">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            $("#modalCards").append(coinCard)
        }
    }

    const getCoinDataFromApi = (coinName, successFunc) => {
        $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/${coinName}`,
            success: coinData => addCoinToLocalStorage(coinData, successFunc),
            error: err => console.log(err)
        });
    }

    const addCoinToLocalStorage = (coinData, func) => {
        setTimeout(() => {
            localStorage.removeItem(coinData.id);
        }, 120000);

        localStorage.setItem(coinData.id, JSON.stringify(coinData));
        func(coinData);
    }

    const getCoinFromLocalStorage = (coinName) => {
        return JSON.parse(localStorage.getItem(coinName));
    }

    const removeCoinFromLocalStorage = (checkedToggles, coin) => {
        const equals = (a, b) =>
            a.length === b.length &&
            a.every((v, i) => v === b[i]);
        const index = checkedToggles.findIndex(arr => equals(arr, coin));
        checkedToggles.splice(index, 1);
        localStorage.setItem("togglesOn", JSON.stringify(checkedToggles));
    }

    // Load more data on coin in collapse
    $("#sectionMain").on("show.bs.collapse", ".collapse", function () {
        let coinData = getCoinFromLocalStorage($(this).attr("name"));
        if (coinData === null) {
            $(`button[name$="${$(this).attr("name")}"]`).html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`);
            getCoinDataFromApi($(this).attr("name"), showCoinDataInCollapse);
        }
        else showCoinDataInCollapse(coinData);
    });


    const showCoinDataInCollapse = coinData => {
        let dataToShow = `
                <img src="${coinData.image.small}" srcset="${coinData.image.small}" class="coinImage"><br>
                <p>USD price: ${coinData.market_data.current_price.usd}$</p>
                <p>EUR price: ${coinData.market_data.current_price.eur}€</p>
                <p>ILS price: ${coinData.market_data.current_price.ils}₪</p>

            `;
        $(`#collapse_card_${coinData.id}`).html(dataToShow);
        $(`button[name$="${coinData.id}"]`).html(`More Info`);
    }


    $("#sectionMain").on('change.bootstrapSwitch', "input[type='checkbox']", function () {
        if (this.checked === true) {//add coin
            let checkedToggles = JSON.parse(localStorage.getItem("togglesOn"));
            let numberOfCheckedToggles;

            if (checkedToggles !== null) {
                numberOfCheckedToggles = Object.keys(JSON.parse(localStorage.getItem("togglesOn"))).length;
            }
            else {
                numberOfCheckedToggles = 0;
                checkedToggles = [];
            };

            checkedToggles.push([$(this).attr("name"), $(this).attr("symbol")]);
            localStorage.setItem("togglesOn", JSON.stringify(checkedToggles));

            if (numberOfCheckedToggles >= 5) {
                const myModal = new bootstrap.Modal($("#modal"));
                displayModalCoins(checkedToggles);
                myModal.show();
            }
        }
        else {//remove coin
            let checkedToggles = JSON.parse(localStorage.getItem("togglesOn"));
            removeCoinFromLocalStorage(checkedToggles, [$(this).attr("name"), $(this).attr("symbol")]);
        }
    });

    $("#sectionModal").on('change.bootstrapSwitch', "input[type='checkbox']", function () {
        let checkedToggles = JSON.parse(localStorage.getItem("togglesOn"));
        let numberOfCheckedToggles;

        if (checkedToggles !== null) {
            numberOfCheckedToggles = Object.keys(JSON.parse(localStorage.getItem("togglesOn"))).length;
        }
        else {
            numberOfCheckedToggles = 0;
            checkedToggles = [];
        };

        if (this.checked === true) {//add coin
            checkedToggles.push([$(this).attr("name"), $(this).attr("symbol")]);
            localStorage.setItem("togglesOn", JSON.stringify(checkedToggles));
        }
        else {//remove coin
            removeCoinFromLocalStorage(checkedToggles, [$(this).attr("name"), $(this).attr("symbol")]);
        }

        numberOfCheckedToggles = Object.keys(checkedToggles).length;
        if (numberOfCheckedToggles <= 5) {
            $("#modalOk").prop('disabled', false);
        }
        if (numberOfCheckedToggles > 5) {
            $("#modalOk").prop('disabled', true);
        }
    });

    const isTheSwitchChecked = (coin) => {
        const checkedToggles = JSON.parse(localStorage.getItem("togglesOn"));
        // if (checkedToggles === null) {
        //     localStorage.setItem("togglesOn", JSON.stringify([]));
        // }
        // console.log(checkedToggles);
        try {
            const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
            const found = checkedToggles.find(arr => equals(arr, coin));
            if (found !== undefined) {
                return "checked";
            }
        } catch (error) {
            // console.log(error);
            return
        }
    }

    const showModalIfNecessary = () => {
        const checkedToggles = JSON.parse(localStorage.getItem("togglesOn"));
        if (checkedToggles !== null) {
            const numberOfCheckedToggles = Object.keys(checkedToggles).length;
            if (numberOfCheckedToggles > 5) {
                const myModal = new bootstrap.Modal($("#modal"));
                displayModalCoins(checkedToggles);
                myModal.show();
            }
        }
    }

    $("#modalOk").on("click", function () {
        fetchData();
    });

});

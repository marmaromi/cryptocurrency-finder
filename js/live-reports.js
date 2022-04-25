/// <reference path="jquery-3.6.0.js" />

"use strict";

$(function () {

    setInterval(() => {


    }, 100000000);


    const coinList = [["cardano", "ada"], ["solana", "sol"], ["terra-luna", "luna"], ["ripple", "xrp"], ["usd-coin", "usdc"]];
    localStorage.setItem("togglesOn", JSON.stringify(coinList));
    const togglesOn = JSON.parse(localStorage.getItem("togglesOn"));
    let coins = '';
    for (let i = 0; i < togglesOn.length; i++) {
        coins += togglesOn[i][1];
        if (i + 1 !== togglesOn.length) {
            coins += ','
        }
    }

    // $.ajax({
    //     url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coins}&tsyms=USD,EUR`,
    //     success: price => showPrice(price),
    //     error: err => console.log(err)
    // });

    const showPrice = (price) => {
        console.log(price);

    };

    let options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Actual vs Projected Sales"
        },
        axisX: {
            valueFormatString: "DD MMM"
        },
        axisY: {
            title: "Coin Value",
            suffix: "$",
            minimum: 0
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "bottom",
            horizontalAlign: "left",
            dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        data: [{
            type: "line",
            showInLegend: true,
            name: "Projected Sales",
            markerType: "square",
            lineDashType: "solid",
            xValueFormatString: "DD MMM, YYYY",
            color: "#F08080",
            yValueFormatString: "#,##0K",
            dataPoints: [
                { x: new Date(2017, 10, 1), y: 10 },
                { x: new Date(2017, 10, 2), y: 10 },
                { x: new Date(2017, 10, 3), y: 10 },
                { x: new Date(2017, 10, 4), y: 10 },
                { x: new Date(2017, 10, 5), y: 10 },
                { x: new Date(2017, 10, 6), y: 10 },
                { x: new Date(2017, 10, 7), y: 10 },
                { x: new Date(2017, 10, 8), y: 10 },
                { x: new Date(2017, 10, 9), y: 10 }
            ]
        },
        {
            type: "line",
            showInLegend: true,
            name: "Actual Sales",
            markerType: "triangle",
            lineDashType: "shortDash",
            yValueFormatString: "#,##0K",
            dataPoints: [
                { x: new Date(2017, 10, 1), y: 20 },
                { x: new Date(2017, 10, 2), y: 20 },
                { x: new Date(2017, 10, 3), y: 20 },
                { x: new Date(2017, 10, 4), y: 20 },
                { x: new Date(2017, 10, 5), y: 20 },
                { x: new Date(2017, 10, 6), y: 20 },
                { x: new Date(2017, 10, 7), y: 20 },
                { x: new Date(2017, 10, 8), y: 20 },
                { x: new Date(2017, 10, 9), y: 20 }
            ]
        },
        {
            type: "line",
            showInLegend: true,
            name: "Actual Sales",
            markerType: "cross",
            lineDashType: "shortDot",
            yValueFormatString: "#,##0K",
            dataPoints: [
                { x: new Date(2017, 10, 1), y: 30 },
                { x: new Date(2017, 10, 2), y: 30 },
                { x: new Date(2017, 10, 3), y: 30 },
                { x: new Date(2017, 10, 4), y: 30 },
                { x: new Date(2017, 10, 5), y: 30 },
                { x: new Date(2017, 10, 6), y: 30 },
                { x: new Date(2017, 10, 7), y: 30 },
                { x: new Date(2017, 10, 8), y: 30 },
                { x: new Date(2017, 10, 9), y: 30 }

            ]
        },
        {
            type: "line",
            showInLegend: true,
            name: "Actual Sales",
            markerType: "circle",
            lineDashType: "shortDashDotDot",
            yValueFormatString: "#,##0K",
            dataPoints: [
                { x: new Date(2017, 10, 1), y: 40 },
                { x: new Date(2017, 10, 2), y: 40 },
                { x: new Date(2017, 10, 3), y: 40 },
                { x: new Date(2017, 10, 4), y: 40 },
                { x: new Date(2017, 10, 5), y: 40 },
                { x: new Date(2017, 10, 6), y: 40 },
                { x: new Date(2017, 10, 7), y: 40 },
                { x: new Date(2017, 10, 8), y: 40 },
                { x: new Date(2017, 10, 9), y: 40 }

            ]
        },
        {
            type: "line",
            showInLegend: true,
            name: "Actual Sales",
            markerType: "square",
            lineDashType: "longDashDotDot",
            yValueFormatString: "#,##0K",
            dataPoints: [
                { x: new Date(2017, 10, 1), y: 50 },
                { x: new Date(2017, 10, 2), y: 50 },
                { x: new Date(2017, 10, 3), y: 50 },
                { x: new Date(2017, 10, 4), y: 50 },
                { x: new Date(2017, 10, 5), y: 50 },
                { x: new Date(2017, 10, 6), y: 50 },
                { x: new Date(2017, 10, 7), y: 50 },
                { x: new Date(2017, 10, 8), y: 50 },
                { x: new Date(2017, 10, 9), y: 50 }

            ]
        }
        ]
    };

    // console.log(options.data);
    $("#chartContainer").CanvasJSChart(options);

    function toogleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }



});
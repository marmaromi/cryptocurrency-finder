/// <reference path="jquery-3.6.0.js" />

"use strict";

$(function () {
    const togglesOn = JSON.parse(localStorage.getItem("togglesOn"));
    let coins = '';
    for (let i = 0; i < togglesOn.length; i++) {
        coins += togglesOn[i][1];
        if (i + 1 !== togglesOn.length) coins += ',';
    }

    setTimeout(() => {
        $.ajax({
            url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coins}&tsyms=USD,EUR`,
            success: price => showPrice(Object.entries(price)),
            error: err => console.log(err)
        });
    }, 0);

    const myInterval = setInterval(() => {
        $.ajax({
            url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coins}&tsyms=USD,EUR`,
            success: price => showPrice(Object.entries(price)),
            error: err => console.log(err)
        });
    }, 2000);

    localStorage.setItem("myInterval", JSON.stringify(myInterval));


    let options = {
        animationEnabled: false,
        theme: "light2",
        title: {
            text: "Live Price Charts"
        },
        axisX: {
            title: "Time",
            interval: 2,
            intervalType: "second",
            valueFormatString: "hh : mm : ss TT",
            labelAngle: -20
        },
        axisY: {
            title: "Coin Value",
            suffix: "$"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "bottom",
            horizontalAlign: "left",
            dockInsidePlotArea: false,
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
            dataPoints: []
        },
        {
            type: "line",
            showInLegend: true,
            name: "Actual Sales",
            markerType: "triangle",
            lineDashType: "shortDash",
            yValueFormatString: "#,##0K",
            dataPoints: [

            ]
        },
        {
            type: "line",
            showInLegend: true,
            name: "Actual Sales",
            markerType: "cross",
            lineDashType: "shortDot",
            yValueFormatString: "#,##0K",
            dataPoints: []
        },
        {
            type: "line",
            showInLegend: true,
            name: "Actual Sales",
            markerType: "circle",
            lineDashType: "shortDashDotDot",
            yValueFormatString: "#,##0K",
            dataPoints: []
        },
        {
            type: "line",
            showInLegend: true,
            name: "Actual Sales",
            markerType: "square",
            lineDashType: "longDashDotDot",
            yValueFormatString: "#,##0K",
            dataPoints: []
        }
        ]
    };

    const showPrice = (coinPrice) => {
        for (let i = 0; i < coinPrice.length; i++) {
            options.data[i].name = coinPrice[i][0]
            options.data[i].dataPoints.push({ x: new Date(), y: coinPrice[i][1]["USD"] })
        };
        $("#chartContainer").CanvasJSChart(options);
    };


    function toogleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
});
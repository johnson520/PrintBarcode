"use strict";
var generated = [];
var JsBarcode;
var Quagga;
function generate10() {
    var here = document.getElementById("insertHere");
    here.textContent = "";
    for (var i = 0; i < 10; ++i) {
        var span = document.createElement("span");
        span.className = "barcode";
        here.appendChild(span);
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = "barcode" + i;
        span.appendChild(svg);
        var s = void 0;
        do {
            s = "";
            for (var j = 0; j < 8; ++j) {
                s += Math.ceil(Math.random() * 9).toString();
            }
        } while (generated.indexOf(s) !== -1);
        generated.push(s);
        JsBarcode("#" + svg.id, s);
    }
}
document.getElementById("btnBen10").addEventListener("click", generate10);
var scannerState = {
    inputStream: {
        type: "LiveStream",
        constraints: {
            width: { min: 200, max: 320 },
            height: { min: 112, max: 160 },
            facingMode: "environment" // or user
        }
    },
    locator: {
        patchSize: "medium",
        halfSample: true
    },
    numOfWorkers: window.navigator.hardwareConcurrency || 1,
    decoder: {
        readers: [
            {
                format: "code_128_reader",
                config: {}
            }
        ]
    },
    locate: true
};
var onDetected = function (data) {
    if (!data.codeResult || !data.codeResult.code || !/\d{8}/.test(data.codeResult.code))
        return;
    stopScan();
    var p = document.createElement("p");
    p.className = "detectedCode";
    p.textContent = "Detected barcode: " + data.codeResult.code + " (" + data.codeResult.format + ")";
    document.body.appendChild(p);
};
var onDetectedSet = false;
var viewport = document.querySelector("#interactive.viewport");
function startScan() {
    viewport.removeAttribute("hidden");
    Quagga.init(scannerState, function (err) {
        if (err) {
            window.alert("Error initialzing Quagga: " + err);
            return;
        }
        if (!onDetectedSet) {
            onDetectedSet = true;
            Quagga.onDetected(onDetected);
        }
        var videoStyle = window.getComputedStyle(viewport.querySelector("video"));
        viewport.style.width = videoStyle.width;
        viewport.style.height = videoStyle.height;
        Quagga.start();
        document.getElementById("btnScan").setAttribute("hidden", "");
        document.getElementById("btnStopScan").removeAttribute("hidden");
    });
}
document.getElementById("btnScan").addEventListener("click", startScan);
var stopScan = function () {
    Quagga.stop();
    viewport.setAttribute("hidden", "");
    document.getElementById("btnStopScan").setAttribute("hidden", "");
    document.getElementById("btnScan").removeAttribute("hidden");
};
document.getElementById("btnStopScan").addEventListener("click", stopScan);

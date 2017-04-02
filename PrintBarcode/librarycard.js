"use strict";
var generated2 = [];
var JsBarcode;
function generateCard() {
    var here = document.querySelectorAll(".card .barcode");
    for (var i = 0; i < here.length; ++i) {
        var span = document.createElement("span");
        span.className = "svgWrapper";
        here[i].appendChild(span);
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = "barcode" + i;
        span.appendChild(svg);
        var s = void 0;
        do {
            s = "";
            var check = 0;
            for (var j = 0; j < 6; ++j) {
                var d = Math.ceil(Math.random() * 9);
                s += d.toString();
                check += d;
            }
            s += (check % 10).toString();
        } while (generated2.indexOf(s) !== -1);
        generated2.push(s);
        JsBarcode("#" + svg.id, s);
    }
}
generateCard();

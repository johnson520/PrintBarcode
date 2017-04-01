var generated = [];
var JsBarcode;
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
//# sourceMappingURL=index.js.map
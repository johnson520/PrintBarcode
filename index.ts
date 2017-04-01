
const generated: Array<string> = [];

var JsBarcode: (sel:string, t:string) => void;

function generate10() {
    const here = document.getElementById("insertHere");
    here.textContent = "";

    for (let i = 0; i < 10; ++i) {
        const span = document.createElement("span");
        span.className = "barcode";
        here.appendChild(span);

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = `barcode${i}`;
        span.appendChild(svg);

        let s : string;
        do {
            s = "";
            for (let j = 0; j < 8; ++j) {
                s += Math.ceil(Math.random() * 9).toString();
            }
        } while (generated.indexOf(s) !== -1);

        generated.push(s);

        JsBarcode(`#${svg.id}`, s);
    }
}

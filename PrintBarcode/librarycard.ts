const generated2: string[] = [];

var JsBarcode: (sel: string, t: string) => void;

function generateCard() {
    const here = document.querySelectorAll(".card .barcode");

    for (let i = 0; i < here.length; ++i) {
        const span = document.createElement("span");
        span.className = "svgWrapper";
        here[i].appendChild(span);

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = `barcode${i}`;
        span.appendChild(svg);

        let s: string;
        do {
            s = "";

            var check = 0;

            for (let j = 0; j < 6; ++j) {
                var d = Math.ceil(Math.random() * 9);
                s += d.toString();
                check += d;
            }
            s += (check % 10).toString();

        } while (generated2.indexOf(s) !== -1);

        generated2.push(s);

        JsBarcode(`#${svg.id}`, s);
    }
}

generateCard();
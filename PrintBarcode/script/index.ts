
const generated: string[] = [];

var JsBarcode: (sel: string, t: string) => void;
var Quagga: any;

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

        let s: string;
        do {
            s = "VL";

            var check = 0;

            for (let j = 0; j < 6; ++j) {
                var d = Math.ceil(Math.random() * 9);
                s += d.toString();
                check += d;
            }
            s += (check % 10).toString();

        } while (generated.indexOf(s) !== -1);

        generated.push(s);

        JsBarcode(`#${svg.id}`, s);
    }
}

document.getElementById("btnBen10").addEventListener("click", generate10);

const scannerState = {
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

const onDetected = (data) => {

    //if (!data.codeResult || !data.codeResult.code || !/\d{8}/.test(data.codeResult.code))
    //    return;

    stopScan();

    const p = document.createElement("p");
    p.className = "detectedCode";
    p.textContent = `Detected barcode: ${data.codeResult.code} (${data.codeResult.format})`;
    document.body.appendChild(p);
};

let onDetectedSet = false;

const viewport = document.querySelector("#interactive.viewport") as any;

function startScan() {

    viewport.removeAttribute("hidden");

    Quagga.init(scannerState,
        err => {
            if (err) {
                window.alert(`Error initialzing Quagga: ${err}`);
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

        }
    );
}

document.getElementById("btnScan").addEventListener("click", startScan);

const stopScan = () => {
    Quagga.stop();
    viewport.setAttribute("hidden", "");
    document.getElementById("btnStopScan").setAttribute("hidden", "");
    document.getElementById("btnScan").removeAttribute("hidden");
};

document.getElementById("btnStopScan").addEventListener("click", stopScan);
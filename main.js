const fs = require("fs");

let words = JSON.parse(fs.readFileSync("words.txt"))

//chula

let letrasExcluidas = "cisemt";
let letrasConocidasSinPosicion =  ["...n.", ".ora.", "....."];
let letrasConocidasPosicionadas = "ra.on";

function valid(w) {

    for (let l of letrasExcluidas) {
        if (w.indexOf(l) != -1) {
            // console.log("a")
            return false
        }
    }

    for (let l of letrasConocidasPosicionadas) {

        if (l != "." && w.indexOf(l) != letrasConocidasPosicionadas.indexOf(l)) {
            // console.log("b")

            return false
        }
    }
    for (let word of letrasConocidasSinPosicion)
        for (let l of word) {
            if (l != "." && w.indexOf(l) == -1 || w.indexOf(l) == word.indexOf(l)) {
                // console.log("c")

                return false
            }
        }

    return true;
}


let i = 0;
while (!valid(words[i])) {
    i++;
    console.log(i, words.length)
}

console.log(words[i]);
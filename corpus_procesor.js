const fs = require("fs");

function remove(str, chars) {
    let ret = str;
    for (let char of chars) {
        ret = ret.split(char).join(" ")
    }
    return ret;
}


const corpus = " " + fs.readFileSync("text.txt")

const remove_non_leters = remove(corpus, [" ", "/", "«", "#", "€", "$", "\\", "´", ",", ";", "%", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", ")", "(", "_", ":", ";", "?", "."])


const normalized = remove_non_leters.toLowerCase().split("á").join("a")
    .split("é").join("e")
    .split("í").join("i")
    .split("ó").join("o")
    .split("ú").join("u")

const words = [...new Set(normalized.split(" ").filter(e => e.length == 5))]

console.log(words);

fs.writeFileSync("words.txt", JSON.stringify(words));




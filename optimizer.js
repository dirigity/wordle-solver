const fs = require("fs");

let word_i = -1;

function process_word(goal_word, guess_word, { letras_excluidas, letras_conocidas_sin_posicion, letras_conocidas_posicionadas }) {

    let new_letras_excluidas = "";
    let new_letras_conocidas_sin_posicion = "";
    let new_letras_conocidas_posicionadas = "";


    for (let c in guess_word) {
        if (goal_word.indexOf(guess_word[c]) == -1) {
            // console.log("no match")
            new_letras_excluidas += guess_word[c];
            new_letras_conocidas_posicionadas += "."
            new_letras_conocidas_sin_posicion += ".";

        } else {
            // console.log(c, goal_word.indexOf(guess_word[c]))
            if (c == goal_word.indexOf(guess_word[c])) {
                new_letras_conocidas_posicionadas += guess_word[c]
                new_letras_conocidas_sin_posicion += "."
            } else {
                new_letras_conocidas_posicionadas += ".";
                new_letras_conocidas_sin_posicion += guess_word[c]
            }
            // console.log(new_letras_conocidas_posicionadas, new_letras_conocidas_sin_posicion)

        }
    }


    letras_conocidas_sin_posicion.push(new_letras_conocidas_sin_posicion)
    for (let i in letras_conocidas_posicionadas) {
        if (new_letras_conocidas_posicionadas[i] == ".")
            new_letras_conocidas_posicionadas = letras_conocidas_posicionadas[i]
    }
    return {
        "letras_excluidas": letras_excluidas + new_letras_excluidas,
        "letras_conocidas_sin_posicion": letras_conocidas_sin_posicion,
        "letras_conocidas_posicionadas": new_letras_conocidas_posicionadas,
    }
}

function next_word(state) {
    let { letras_excluidas, letras_conocidas_sin_posicion, letras_conocidas_posicionadas } = state
    // let letras_excluidas = "lapzme"
    // let letras_conocidas_sin_posicion = [];
    // let letras_conocidas_posicionadas = "..dio";

    function valid(w) {

        for (let l of letras_excluidas) {
            if (w.indexOf(l) != -1) {
                return false
            }
        }

        for (let l of letras_conocidas_posicionadas) {

            if (l != "." && w.indexOf(l) != letras_conocidas_posicionadas.indexOf(l)) {
                return false
            }
        }
        for (let word of letras_conocidas_sin_posicion)
            for (let l of word) {
                if (l != "." && w.indexOf(l) == -1 || w.indexOf(l) == word.indexOf(l)) {
                    return false
                }
            }

        return true;
    }

    word_i++;
    while (!valid(words[word_i])) {
        word_i++;
        // console.log(i, words.length)
    }

    return words[word_i];
}

function time_of_word(goal_word) {
    let state = {
        "letras_excluidas": "",
        "letras_conocidas_sin_posicion": [],
        "letras_conocidas_posicionadas": ".....",
    }
    word_i = -1;
    // console.log("goal: ", goal_word, word_i);
    let t = 0;
    let test_word = "";
    while (test_word != goal_word) {
        t++;
        test_word = next_word(state);
        state = process_word(goal_word, test_word, state);
        //console.log(test_word, state, word_i)
    }
    return t;
}

function test_dict() {
    let score = 0;
    for (i in words) {
        score += time_of_word(words[i]);
    }
    return score;
}

function clone(arr) {
    let ret = []
    for (let elm of arr) ret.push(elm);
    return ret;
}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let refinements = 100

let words = JSON.parse(fs.readFileSync("words.txt"))
let best_words = clone(words)
let best_words_score = test_dict();

while (refinements > 0) {
    refinements--;
    console.log(refinements)
    words = shuffle(words);
    let word_score = test_dict();
    console.log(word_score / words.length, best_words_score / words.length)
    if (word_score < best_words_score) {
        console.log("found better")
        best_words = clone(words)
        best_words_score = word_score;
    }

}

fs.writeFileSync("words.txt",JSON.stringify(best_words))
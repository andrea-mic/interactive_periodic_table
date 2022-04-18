var elements = {
    "1": "H Hydrogen",
    "2": "He Helium",
    "3": "Li Lithium",
    "4": "Be Beryllium",
    "5": "B Boron",
    "6": "C Carbon",
    "7": "N Nitrogen",
    "8": "O Oxygen",
    "9": "F Fluorine",
    "10": "Ne Neon",
    "11": "Na Sodium",
    "12": "Mg Magnesium",
    "13": "Al Aluminium",
    "14": "Si Silicon",
    "15": "P Phosphorus",
    "16": "S Sulfur",
    "17": "Cl Chlorine",
    "18": "Ar Argon",
    "19": "K Potassium",
    "20": "Ca Calcium",
    "21": "Sc Scandium",
    "22": "Ti Titanium",
    "23": "V Vanadium",
    "24": "Cr Chromium",
    "25": "Mn Manganese",
    "26": "Fe Iron",
    "27": "Co Cobalt",
    "28": "Ni Nickel",
    "29": "Cu Copper",
    "30": "Zn Zinc",
    "31": "Ga Gallium",
    "32": "Ge Germanium",
    "33": "As Arsenic",
    "34": "Se Selenium",
    "35": "Br Bromine",
    "36": "Kr Krypton",
    "37": "Rb Rubidium",
    "38": "Sr Strontium",
    "39": "Y Yttrium",
    "40": "Zr Zirconium",
    "41": "Nb Niobium",
    "42": "Mo Molybdenum",
    "43": "Tc Technetium",
    "44": "Ru Ruthenium",
    "45": "Rh Rhodium",
    "46": "Pd Palladium",
    "47": "Ag Silver",
    "48": "Cd Cadmium",
    "49": "In Indium",
    "50": "Sn Tin",
    "51": "Sb Antimony",
    "52": "Te Tellurium",
    "53": "I Iodine",
    "54": "Xe Xenon",
    "55": "Cs Cesium",
    "56": "Ba Barium",
    "57": "La Lanthanum",
    "58": "Ce Cerium",
    "59": "Pr Praseodymium",
    "60": "Nd Neodymium",
    "61": "Pm Promethium",
    "62": "Sm Samarium",
    "63": "Eu Europium",
    "64": "Gd Gadolinium",
    "65": "Tb Terbium",
    "66": "Dy Dysprosium",
    "67": "Ho Holmium",
    "68": "Er Erbium",
    "69": "Tm Thulium",
    "70": "Yb Ytterbium",
    "71": "Lu Lutetium",
    "72": "Hf Hafnium",
    "73": "Ta Tantalum",
    "74": "W Tungsten",
    "75": "Re Rhenium",
    "76": "Os Osmium",
    "77": "Ir Iridium",
    "78": "Pt Platinum",
    "79": "Au Gold",
    "80": "Hg Mercury",
    "81": "Tl Thallium",
    "82": "Pb Lead",
    "83": "Bi Bismuth",
    "84": "Po Polonium",
    "85": "At Astatine",
    "86": "Rn Radon",
    "87": "Fr Francium",
    "88": "Ra Radium",
    "89": "Ac Actinium",
    "90": "Th Thorium",
    "91": "Pa Protactinium",
    "92": "U Uranium",
    "93": "Np Neptunium",
    "94": "Pu Plutonium",
    "95": "Am Americium",
    "96": "Cm Curium",
    "97": "Bk Berkelium",
    "98": "Cf Californium",
    "99": "Es Einsteinium",
    "100": "Fm Fermium",
    "101": "Md Mendelevium",
    "102": "No Nobelium",
    "103": "Lr Lawrencium",
    "104": "Rf Rutherfordium",
    "105": "Db Dubnium",
    "106": "Sg Seaborgium",
    "107": "Bh Bohrium",
    "108": "Hs Hassium",
    "109": "Mt Meitnerium",
    "110": "Ds Darmstadtium",
    "111": "Rg Roentgenium",
    "112": "Cn Copernicium",
    "113": "Nh Nihonium",
    "114": "Fl Flerovium",
    "115": "Mc Moscovium",
    "116": "Lv Livermorium",
    "117": "Ts Tennessine",
    "118": "Og Oganesson",
    "119": "Uue Ununennium"
};

const SOLUTION_STATE = 0, INPUT_STATE = 1;
const LANDING_STATE = 0, TRAIN_STATE = 1, TEST_ELEMENTS_STATE = 2, TEST_GROUPS_STATE = 3;
const INPUT = 0, SYMBOL = 1, NUM = 2, NAME = 3;

var inputs = Array.from ( document.getElementsByClassName("element-symbol-input") );
var symbols = Array.from ( document.getElementsByClassName("element-symbol") );
var names = Array.from ( document.getElementsByClassName("element-name") );
var numbers = Array.from ( document.getElementsByClassName("element-number") );
var wrappers = Array.from ( document.getElementsByClassName("element-wrapper") );
var tiles = Array.from ( document.getElementsByClassName("element") );

var score_tile_correct = document.getElementById("correct-score");
var score_tile_incorrect = document.getElementById("incorrect-score");
var score_tile_neutral = document.getElementById("neutral-score");

var train_option = document.getElementById("train-option");
var test_elements_option = document.getElementById("test-element-option");
var test_groups_option = document.getElementById("test-group-option");

var button = document.getElementById("reset-button");

var modal = document.getElementById("completed-modal");
var modal_scores_correct = document.getElementById("modal-score-correct");
var modal_scores_incorrect = document.getElementById("modal-score-incorrect");
var modal_button = document.getElementById("modal-button");

var state = TRAIN_STATE;
var train_state = SOLUTION_STATE;
var score_correct = 0, score_incorrect = 0, score_neutral = 118;

var selected_elements = [];
var selected_groups = [];
var active_elements = [];
var n;

var groups = [
    [1,3,11,19,37,55,87], // 1
    [4,12,20,38,56,88], // 2
    [5,13,31,49,81,113],
    [6,14,32,50,82,114],
    [7,15,33,51,83,115],
    [8,16,34,52,84,116],
    [9,17,35,53,85,117],
    [2,10,18,36,54,86,118]
];
var transition_metals = [];
var lanthanides = [];
var actinides = [];

function button_function() { // switch on state to change function of the start button
    switch(state) {
        case TRAIN_STATE:
            toggle_train_state();
            break;
        case TEST_ELEMENTS_STATE:
            start_test_elements_state();
            break;
        case TEST_GROUPS_STATE:
            start_test_groups_state();
            break;
    }
}

function change_state(state_input) { // initializes new state
    if(state===state_input) return;
    
    switch(state_input) {
        
        case TRAIN_STATE:
            test_elements_option.classList.remove('selected-option');
            test_groups_option.classList.remove('selected-option');
            train_option.classList.add('selected-option');

            tiles.forEach(reset_tile);
            train_state = SOLUTION_STATE;
            set_score(0,0,118);

            button.textContent = "START";

            break;

        case TEST_ELEMENTS_STATE:
            train_option.classList.remove('selected-option');
            test_groups_option.classList.remove('selected-option');
            test_elements_option.classList.add('selected-option');

            button.textContent = "RESTART";

            start_test_elements_state();
            
            break;

        case TEST_GROUPS_STATE:
            train_option.classList.remove('selected-option');
            test_elements_option.classList.remove('selected-option');
            test_groups_option.classList.add('selected-option');

            active_elements = [];

            button.textContent = "RESTART";
            
            start_test_groups_state();
            
            break;
    }

    state = state_input;
}

function toggle_train_state() { // switch between solutions and inputs in training

    if (train_state === SOLUTION_STATE) // solutions -> input
    {
        tiles.forEach(tile_to_input);

        train_state = INPUT_STATE;
        button.textContent = "SOLUTION";
    } 
    else if (train_state === INPUT_STATE) // input -> solutions
    {
        tiles.forEach(tile_to_solution);

        train_state = SOLUTION_STATE;
        button.textContent = "START";
    }
}

function start_test_elements_state() { // starts elements test

    tiles.forEach(reset_tile);
    selected_elements = [...Array(118).keys()];
    set_score(0,0,118);

    setTimeout(test_elements_next_tile, 200);
}

function start_test_groups_state() { // starts groups test

    tiles.forEach(reset_tile);
    selected_groups = [...Array(8).keys()];
    set_score(0,0,50);

    setTimeout(test_groups_next_group, 200);
}

function init_listeners() { // initializes listeners

    tiles.forEach(tile => {

        let input = tile.children[INPUT];
        let num = parseInt( tile.children[NUM].textContent );

        input.addEventListener("keydown", function(e) {
            if( input.value === "" && state == TRAIN_STATE ) return;
            if( e.key === "ArrowDown" ||
                e.key === "ArrowRight"||
                e.key === "ArrowLeft" ||
                e.key === "ArrowUp" ) return;

            if( e.key === "Enter" || e.key === "Tab") 
            {

                if( input.value.toLowerCase() === tile.children[SYMBOL].textContent.toLowerCase() ) {
                    tile_to_correct(tile);
                } else {
                    tile_to_incorrect(tile);
                }


                // TEST ELEMENTS STATE
                // if (state === TEST_ELEMENTS_STATE && parseInt(tile.children[NUM].textContent) === n+1) {
                if (state === TEST_ELEMENTS_STATE && num === n+1) {
                    tile_to_solution(tile);
                    setTimeout(test_elements_next_tile(), 50);
                }


                // TEST GROUPS STATE
                if (state === TEST_GROUPS_STATE) {
                    tile_to_solution(tile);
                    let i = active_elements.indexOf(num);
                    active_elements.splice(i, 1);

                    if (active_elements.length === 0) {
                        test_groups_next_group();
                    } else {
                        if (active_elements.length>i) {
                            tiles[active_elements[i]-1].children[INPUT].focus();
                        } else {
                            tiles[active_elements[0]-1].children[INPUT].focus();
                        }
                    }
                }

            } else {
                tile_to_neutral(tile);
            }
        });

    });
}

function test_elements_next_tile() {
    n = get_new_element();
    if (n===-1) return;

    tile_to_input(tiles[n]);
    highlight_tile(tiles[n]);
    tiles[n].children[INPUT].focus();
}

function test_groups_next_group() {
    let index = get_new_group();
    if (index===-1) return;
    let ns = [...groups [index]];
    
    active_elements = [...ns];
    ns.forEach( n => {
        tile_to_input(tiles[n-1]);
        highlight_tile(tiles[n-1]);
    });
    
    tiles[ns[0]-1].children[INPUT].focus();
}

function tile_to_correct(tile) {
    let wrapper = tile.parentElement;
    if (wrapper.classList.contains("correct")) return;

    let input   = tile.children[0];
    let symbol   = tile.children[1];
    // let number = tile.children[2];
    let name    = tile.children[3];

    input.value = symbol.textContent;
    wrapper.classList.add('correct');
    name.classList.remove("fading-down");
    name.classList.add("fading-up");

    set_score(1,0,-1,"add");
}

function tile_to_incorrect(tile) {
    let wrapper = tile.parentElement;
    if (wrapper.classList.contains("incorrect")) return;

    wrapper.classList.add('incorrect');
    
    set_score(0,1,-1,"add");
}

function tile_to_neutral(tile) {
    let wrapper = tile.parentElement;

    if (wrapper.classList.contains("correct")) {
        wrapper.classList.remove("correct");
        tile.children[NAME].classList.remove("fading-up");
        tile.children[NAME].classList.add("fading-down");

        set_score(-1,0,+1,"add");
    }
    else if (wrapper.classList.contains("incorrect")) {
        wrapper.classList.remove("incorrect");

        set_score(0,-1,+1,"add");
    }
}

function tile_to_input(tile) {

    let input   = tile.children[0];
    let symbol   = tile.children[1];
    // let number = tile.children[2];
    let name    = tile.children[3];
    let wrapper = tile.parentElement;

    input.classList.remove("hidden");
    input.classList.add("fading-in");
    setTimeout( () => { input.classList.remove("fading-in"); }, 200);
    
    // wrapper.classList.remove("incorrect");
    // wrapper.classList.remove("correct");

    symbol.classList.add("hidden");

    if (!tile.parentElement.classList.contains("correct")) {
        name.classList.remove("fading-up");
        name.classList.add("fading-down");
    }

}

function tile_to_solution(tile) {

    let input   = tile.children[0];
    let symbol   = tile.children[1];
    // let number = tile.children[2];
    let name    = tile.children[3];
    let wrapper = tile.parentElement;

    
    if (name.classList.contains("fading-down")){
        name.classList.add("fading-up");
        name.classList.remove("fading-down");
    }
    
    input.classList.add("fading-out");
    setTimeout( () => {
        
        input.classList.add("hidden");
        input.classList.remove("fading-out");
        
        name.classList.remove("hidden");
        
        symbol.classList.remove("hidden");
            
    }, 200);

}

function highlight_tile(tile) {

    let wrapper = tile.parentElement;
    wrapper.classList.add("highlighted");
    setTimeout( () => wrapper.classList.remove("highlighted"), 500);
    
}

function reset_tile(tile){
    tile_to_neutral(tile);
    tile_to_solution(tile);
    tile.children[INPUT].value = "";
}

function set_score(c,i,n, control="") {

    if (control === "add") {
        score_correct += c;
        score_incorrect += i;
        score_neutral += n;
    } else {
        score_correct = c;
        score_incorrect = i;
        score_neutral = n;
    }

    score_tile_correct.children[0].textContent = score_correct;
    score_tile_incorrect.children[0].textContent = score_incorrect;
    score_tile_neutral.children[0].textContent = score_neutral;

    if (score_neutral === 0 && state != TRAIN_STATE) show_modal();
}

function init_names() {  // initializes tile with correct data
    let elem_sym;
    let elem_name;
    for (let i=0; i<symbols.length; i++) {
        elem_sym = elements[i+1].split(' ')[0];
        elem_name = elements[i+1].split(' ')[1];
        numbers[i].textContent = i+1;
        symbols[i].textContent = elem_sym;
        inputs[i].textContent = elements[i];
        names[i].textContent = elem_name;
    }
}

function get_new_element() { // get new tile - use this to implement new groups
    if (selected_elements.length === 0) return -1;
    
    return selected_elements.splice(  Math.floor(Math.random() * selected_elements.length), 1 )[0];
}

function get_new_group() { // get new tile - use this to implement new groups
    if (selected_groups.length === 0) return -1;
    
    return selected_groups.splice(  Math.floor(Math.random() * selected_groups.length), 1 )[0];
}

function show_modal() {

    modal_scores_correct.textContent = score_correct;
    modal_scores_incorrect.textContent = score_incorrect;

    modal.showModal();
    
    modal_button.blur();
}

function close_modal() {
    modal.close();
}



init_names();
init_listeners();

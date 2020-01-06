var happiness = 50;
var crime = 50;
var hunger = 50;
var religion = 50;
var health = 50;
var education = 50;

var years = 0;

var selected = 0;
var needed = 0;
var population = 0;

function Init() {
    console.log("init");
}

function SetNeeded(need) {
    console.log("Needed: "+need);
    needed = need;
}


function showPopulation() {

    console.log(populationArray);
}

function SelectCell(e) {
    console.log(e.id + " selected (index: " + e.id.substring(1)+")");
    if (e.bgColor == "silver") {
        e.bgColor = "white";
        selected--;
        populationArray[parseInt(e.id.substring(1))].use = false;
    } else {
        if (selected >= needed) {
            window.alert("You can only select " + needed + " people!");
        } else {
            e.bgColor = "silver"; selected++;
            populationArray[parseInt(e.id.substring(1))].use = true;
        }
    }

    if (selected == needed) {
        document.getElementById("go").disabled = false;
        console.log("needed hit");
    } else {
        document.getElementById("go").disabled = true;
    }
    document.getElementById("selected").innerHTML = selected.toString();
    population = selected;
};  


function applyPopulationAttributes(item) {

    if (item.use) {
        switch (item.JC) {
            case "F": hunger -= Math.floor(Math.random() * item.skill); break;
            case "H": health += Math.floor(Math.random() * item.skill); break;
            case "S": crime -= Math.floor(Math.random() * item.skill); break;
            case "E": education += Math.floor(Math.random() * item.skill); break;
            case "A": happiness += Math.floor(Math.random() * item.skill); break;
            case "R": religion += Math.floor(Math.random() * item.skill); break;
        }

        switch (item.sin) {
            case "Glutton": hunger -= Math.floor(Math.random() * item.sinv); break;
            case "Liar": education += Math.floor(Math.random() * item.sinv); break;
            default: happiness -= Math.floor(Math.random() * item.sinv);
        }


        // age and die
        item.age += 1;
        if (item.age > 80) {
            log(item.name +" died of old age.")
            item.use = false;
            population -= 1;
        }

        // have babbies
        if (item.gender == 'female' && item.age >= 16 && item.age <= 45 && (Math.floor(Math.random() * item.fertility) == 0)) {
            log(item.name + " had a baby.");
            population += 1;
        }

    }
}

function log(message) {
    document.getElementById("log").innerHTML += "<br>"+message;

}
function step() {


    //    document.getElementById("elasped").innerHTML = happiness.toString;
    years += 1;
    document.getElementById("year").innerHTML = years.toString();

    // run through the population
    populationArray.forEach(applyPopulationAttributes);

    // make random cahnges
    happiness += Math.floor(Math.random() * 2) - 1;
    crime += Math.floor(Math.random() * 2) - 1;
    hunger += Math.floor(Math.random() * 2) - 1;
    religion += Math.floor(Math.random() * 2) - 1;
    health += Math.floor(Math.random() * 2) - 1;
    education += Math.floor(Math.random() * 2) - 1;

    hunger += population;
    happiness -= crime;

    draw("Education", education)
    draw("Health", health)
    draw("Happiness", happiness)
    draw("Crime", crime)
    draw("Hunger", hunger)
    draw("Religion", religion)
    draw("population", population);
}

function letsGo() {
    document.getElementById("go").hidden = false;
    timer = setInterval(step, 500);
    document.getElementById("go").disabled = true;
    document.getElementById("pause").disabled = false;
}


function pause() {
    clearInterval(timer);
    document.getElementById("go").disabled = false;
    document.getElementById("pause").disabled = true;
}

function draw(id, height) {
    var canvas = document.getElementById(id.toLowerCase()+"_g");

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, 25, 100);
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, 25, 100);

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 25, 100-height);
    }

    document.getElementById(id.toLowerCase()).innerHTML = id + "<br>" + height.toString();

}



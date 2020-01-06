var populationArray = [];

function gen_pop() {
    populationArray = [];

    var num = document.getElementById("pop_size").value;
    SetNeeded(document.getElementById("pop_need").value);

    var perrow = 5;
    var html = "<table id=\"grid\"><tr>";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var index = 0;
            var myObj = JSON.parse(this.responseText);
            myObj.results.forEach(addPopulation);

            function addPopulation(item) {

                var person = {
                    index: index,
                    name: item.name.first + " " + item.name.last,
                    gender: item.gender,
                    jobName: '', JC: '', skill: 0,
                    sin: '', sinv: 0,
                    fertililty: 0,
                    age: item.dob.age,
                    use: false
                };
                if (person.gender == "female" && person.age >= 16 && person.age <= 45) {
                    person.fertility = Math.floor(Math.random() * 4)+1
                }
                set_job(person); 
                console.log(person);


                // build the HTML
                html += "<td>"+
                    "<table id=p" + index + " onclick=\"SelectCell(p" + index + ")\" cellpadding=\"0\" cellspacing=\"0\">" +
                    "<tr>"+
                    "<td><img src=\"" + item.picture.medium + "\"></td>" +
                    "<td>" +
                    "<b>"+person.name+"</b>"+
                    "<br>" + person.age + " year old " + person.gender +
                    "<br><u>Job</u>: "+person.jobName+" ("+person.skill+")"+
                    "<br><u>Crime</u>: " + person.sin + " (" + person.sinv + ")" +
                    "</td></tr></table></td>";

                populationArray[index] = person;
                index++;
                if (index % perrow == 0) {
                    html += "</tr><tr>";
                }
            }

            html += "</tr></table>";
            document.getElementById("pop_table").innerHTML = "<br>" + html;
            console.log(html);


        }
    };
    xmlhttp.open("GET", "https://randomuser.me/api/?results="+num, true);
    xmlhttp.send();


}

job_array = [
    [['F'], [['Farmer'], ['Rancher'], ['Chief']]],
    [['H'], [['Doctor'], ['Nurse'], ['EMT'], ['Dentist']]],
    [['S'], [['Police'], ['Guard'], ['Soldier']]],
    [['E'], [['Teacher'], ['Librarian'], ['Journalist']]],
    [['A'], [['Artist'], ['Writer'], ['Actor']]],
    [['R'], [['Immam'], ['Priest'], ['Rabbi']]]
];
sin_array = ['Rapist', 'Murderer', 'Thief', 'Glutton'];

function set_job(person) {
    jc_array_index = Math.floor(Math.random() * job_array.length);
    person.JC = job_array[jc_array_index][0][0];
    person.jobName = job_array[jc_array_index][1][Math.floor(Math.random() * job_array[jc_array_index].length)][0];

    person.sin = sin_array[Math.floor(Math.random() * sin_array.length)];

    person.skill = Math.floor(Math.random() * 9)+1;
    person.sinv = Math.floor(Math.random() * 9)+1;

}


/*
old 
function addPopulation(inIndex, inName, inGender, inAge, inJob, inJob_skill, inSin, inSin_skill) {
    var person = { index: inIndex, name: inName, gender: inGender, JC: inJob, skill: inJob_skill, sin: inSin, sinv: inSin_skill, fertililty: 0, age: inAge, use: false };
    console.log(person);
    if (inGender == "F" && inAge >= 16 && inAge <= 45) {
        person.fertility = Math.floor(Math.random() * 5)
    }
    populationArray[inIndex] = person;
}
*/
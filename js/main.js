/*jslint devel: true plusplus: true*/


function getBasicCoeff(project) {
    "use strict";

    var coeff = new Array(4);

    switch (project) {

    case "organic":
        coeff[0] = 2.4;
        coeff[1] = 1.05;
        coeff[3] = 0.38;
        break;

    case "semi":
        coeff[0] = 3.0;
        coeff[1] = 1.12;
        coeff[3] = 0.35;
        break;

    case "embedded":
        coeff[0] = 3.6;
        coeff[1] = 1.20;
        coeff[3] = 0.32;
        break;
    }
    coeff[2] = 2.5;
    return coeff;
}

function getIntermediateCoeff(project) {
    "use strict";
    var coeff = getBasicCoeff(project);

    switch (project) {
    case "organic":
        coeff[0] = 3.2;
        break;

    case "embedded":
        coeff[0] = 2.8;
        break;
    }
    return coeff;
}

function basicEffortApplied(coeff, kloc) {
    "use strict";
    return coeff[0] * Math.pow(kloc, coeff[1]);
}

function developmentTime(coeff, effort) {
    "use strict";
    return coeff[2] *  Math.pow(effort, coeff[3]);
}

function peopleRequired(effort, devTime) {
    "use strict";
    return effort / devTime;
}

//get checkd radio button value
function getRadioButtonVal(name) {
    "use strict";

    var elements = document.getElementsByName(name),
        val = 0,
        i = 0;

    for (i = 0; i < elements.length; ++i) {
        if (elements[i].checked) {
            val = elements[i].value;
        }
    }
    return val;
}

function calculateEaf() {
    "use strict";
    var prod = getRadioButtonVal("prodAttr"),
        sizeDb = getRadioButtonVal("sizeOfDb"),
        complex = getRadioButtonVal("complex"),
        runtime = getRadioButtonVal("runtime"),
        memory = getRadioButtonVal("memory"),
        volat = getRadioButtonVal("volat"),
        turn = getRadioButtonVal("turn"),
        analyst = getRadioButtonVal("analyst"),
        appExp = getRadioButtonVal("appExp"),
        engCap = getRadioButtonVal("engCap"),
        virtual = getRadioButtonVal("virtual"),
        program = getRadioButtonVal("program"),
        methods = getRadioButtonVal("methods"),
        tools = getRadioButtonVal("tools"),
        schedule = getRadioButtonVal("schedule");

    return prod * sizeDb * complex * runtime * memory * volat * turn * analyst * appExp
            * engCap * virtual * program * methods * tools * schedule;
}


function setField(field, value) {
    "use strict";
    document.getElementById(field).textContent = value.toFixed(3);
}

function getField(field, value) {
    "use strict";
    return document.getElementById(field).value;
}

function displayIntermediate() {
    "use strict";
    var eaf = calculateEaf(),
        kloc = getField("klocInput"),
        project = getField("projectSelector"),
        coeff = getIntermediateCoeff(project);


    if (kloc < 0 || kloc === "") {
        setField("effortField", 0);
        setField("devTimeField", 0);
        setField("PeopleReqField", 0);
        return;
    }

    var effort = basicEffortApplied(coeff, kloc) * eaf,
        devTime = developmentTime(coeff, effort),
        people = peopleRequired(effort, devTime);

    setField("eaf", eaf);
    setField("effortField", effort);
    setField("devTimeField", devTime);
    setField("PeopleReqField", people);
}


function dispBasic() {
    "use strict";
    var kloc = getField("klocInput"),
        project = getField("projectSelector"),
        coeff = getBasicCoeff(project);

    if (kloc < 0 || kloc === "") {
        setField("effortField", 0);
        setField("devTimeField", 0);
        setField("PeopleReqField", 0);
        return;
    }

    var effort = basicEffortApplied(coeff, kloc),
        devTime = developmentTime(coeff, effort),
        people = peopleRequired(effort, devTime);

    setField("effortField", effort);
    setField("devTimeField", devTime);
    setField("PeopleReqField", people);
}


function display() {
    "use strict";

    var cocomo = getField("cocomoSelector");

    switch (cocomo) {
    case "basic":
        document.getElementById("intermediateCocomo").style.display = "none";
        dispBasic();
        break;

    case "intermediate":
        document.getElementById("intermediateCocomo").style.display = "block";
        displayIntermediate();
        break;
    }
}

/*jslint devel: true plusplus: true*/

function getValueOfBoxes(name) {
    "use strict";

    var elements = document.getElementsByName(name),
        arr = new Array(elements.length),
        i = 0;

    for (i = 0; i < elements.length; ++i) {
        arr[i] = elements[i].value;
    }

    return arr;
}

function getConstants() {
    "use strict";
    return [[3, 4, 6],
          [4, 5, 7],
          [3, 4, 6],
          [7, 10, 15],
          [5, 7, 10]];
}

function multiply(a, b) {
    "use strict";
    var result = new Array(a.length),
        i = 0,
        j = 0,
        val = 0;

    for (i = 0; i < a.length; ++i) {
        val = 0;
        for (j = 0; j < a[i].length; ++j) {
            val += a[i][j] * b[i][j];
        }
        result[i] = val;
    }
    return result;
}

function getValueOfRadio(name) {
    "use strict";
    var elems = document.getElementsByName(name),
        i = 0,
        val = 0;

    for (i = 0; i < elems.length; ++i) {
        if (elems[i].checked) {
            val = elems[i].value;
        }
    }
    return val;
}


function calculateUFP() {
    "use strict";
    var names = ["intInput", "extInput", "extFile", "logFile", "extEnq"],
        arr = new Array(names.length),
        i = 0,
        cons = getConstants(),
        res,
        val = 0;

    for (i = 0; i < names.length; ++i) {
        arr[i] = getValueOfBoxes(names[i]);
    }

    res = multiply(cons, arr);

    i = 0;
    for (i = 0; i < res.length; ++i) {
        val += res[i];
    }
    return val;
}


function sumAllFactors(ufp) {
    "use strict";

    var i = 0,
        sum = 0;

    for (i = 1; i <= 14; ++i) {
        sum += parseInt(getValueOfRadio("row" + i), 10);
    }
    return sum;
}

function calculateCaf(sum) {
    "use strict";
    return 0.65 + 0.01 * sum;
}


function calculateFP(ufp, caf) {
    "use strict";
    return ufp * caf;
}

function displayValues() {
    "use strict";

    var ufp = calculateUFP(),
        sum = sumAllFactors(ufp),
        caf = calculateCaf(sum),
        fp = calculateFP(ufp, caf);

    document.getElementById("ufpBox").textContent = ufp;
    document.getElementById("cafBox").textContent = caf.toFixed(3);
    document.getElementById("fpBox").textContent = fp.toFixed(3);
}

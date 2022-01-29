const state = {}
var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function start() {
    addDay(30)
    addMonth();
    addYear();
}

function addDay(value) {
    let d = document.getElementById("d");
    for (let i = 1; i <= value; i++) {
        let option = document.createElement("option");
        option.value = i
        option.text = i
        d.add(option)
    }
}

function addMonth() {
    let month = document.getElementById("month");
    for (let j = 1; j <= 12; j++) {
        let option = document.createElement("option")
        option.value = j
        option.text = monthName[j - 1]
        month.add(option)
    }
}

function addYear() {
    let year = document.getElementById("year");
    for (let i = 1920; i <= new Date().getFullYear(); i++) {
        let option = document.createElement("option")
        option.value = i
        option.text = i
        year.add(option)
    }
}

function isLeapYear(year) {
    year = parseInt(year);
    if (year % 4 != 0) {
        return false;
    } else if (year % 400 == 0) {
        return true;
    } else if (year % 100 == 0) {
        return false;
    } else {
        return true;
    }
}

function update() {
    let month = parseInt(state.month)
    let date = parseInt(state.date)
    let year = parseInt(state.year)

    if (month != undefined) {
        document.getElementById("d").innerHTML = "";
        if (month == 2) {
            if (year != undefined) {
                if (isLeapYear(year)) {
                    addDay(29)
                } else {
                    addDay(28)
                }
                if (date <= 28) {
                    document.getElementById('d').value = date
                }
            }
        } else if (month == 4 || month == 6 || month == 8 || month == 11) {
            if (date == 31) {
                addDay(30)
            } else {
                addDay(30)
                document.getElementById('d').value = date
            }
        } else {
            addDay(31)
            document.getElementById('d').value = date
        }
    }
}

function handleDateChange(e) {
    state.date = e.target.value
}

function handleMonthChange(e) {
    state.month = e.target.value
    update()
}

function handleYearChange(e) {
    state.year = e.target.value
    update()
}

function handleNextClick() {
    document.getElementById('error').innerHTML = ''
    var today = new Date();
    var age = today.getFullYear() - state.year;
    console.log(age);
    var m = (today.getMonth() + 1) - state.month;
    console.log(m);
    if (m < 0 || (m === 0 && today.getDate() <= state.date)) {
        age--;
    }
    console.log(age);
    if (age >= 13) {
        alert(`Age: ${age} ,You can proceed futher`)
    } else {
        document.getElementById('error').innerHTML = "Sorry , You can't proceed futher your age is less than 13 years"
    }
}

start()
document.getElementById("d").onchange = handleDateChange
document.getElementById("month").onchange = handleMonthChange
document.getElementById("year").onchange = handleYearChange
document.getElementById("next").onclick = handleNextClick
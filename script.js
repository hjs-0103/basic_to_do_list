
let storedItems = JSON.parse(localStorage.getItem('items')) || { mylist: [], completed: [] };


today = new Date()
img = document.querySelector(".main-img")

weekday = today.getDay()

let weekdayName;
switch (weekday) {
    case 0:
        weekdayName = "Sunday";
        break;
    case 1:
        weekdayName = "Monday";
        break;
    case 2:
        weekdayName = "Tuesday";
        break;
    case 3:
        weekdayName = "Wednesday";
        break;
    case 4:
        weekdayName = "Thursday";
        break;
    case 5:
        weekdayName = "Friday";
        break;
    case 6:
        weekdayName = "Saturday";
        break;
    default:
        weekdayName = "";
}


img.after(weekdayName + ' , ' + today.toLocaleDateString())





document.addEventListener('DOMContentLoaded', () => {
    if (storedItems && Array.isArray(storedItems.mylist) && storedItems.mylist.length > 0) {
        storedItems.mylist.forEach(item => {
            let newitem = document.createElement('div');
            newitem.innerHTML = `<li class="list-item">${item}</li><button class="done-button">X</button>`;
            newitem.className = "list-button-container";
            document.querySelector('.list').append(newitem);
        });


    }

    if (storedItems && Array.isArray(storedItems.completed) && storedItems.completed.length > 0) {
        storedItems.completed.forEach(item => {

            newComp = document.createElement('li');
            newComp.innerHTML = `<li class="finished">${item}</li>`
            document.querySelector(".finished-items").append(newComp)

        })
    }
});



document.querySelector(".create").addEventListener('click', () => {
    if (document.querySelector("#input").value == "") {
        alert("Please enter an item. Cannot add an empty to-do");
    } else {
        let todo = document.querySelector("#input").value;
        let newitem = document.createElement('div');
        newitem.innerHTML = `<li class="list-item" > ${todo}</li > <button class="done-button">X</button>`;
        newitem.className = "list-button-container";
        document.querySelector('.list').append(newitem);
        storedItems.mylist.push(todo);
        localStorage.setItem('items', JSON.stringify(storedItems));
        console.log(storedItems);
        document.querySelector("#input").value = "";
    }
});



document.querySelector('.list').addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        let completed = event.target.parentElement;
        let itemText = completed.querySelector('.list-item').textContent.trim();
        completed.remove();

        // Create a new li element with only the text
        let finishedItem = document.createElement('li');

        const now = new Date();
        console.log(now.toLocaleDateString())

        finishedItem.className = 'finished';
        finishedItem.textContent = itemText + " " + "\tDate Completed:" + now.toLocaleDateString();


        if (storedItems.mylist.includes(itemText)) { // Remove completed item from localstorage
            storedItems.completed.push(finishedItem.textContent);
            storedItems.mylist = storedItems.mylist.filter(item => item !== itemText);
            localStorage.setItem('items', JSON.stringify(storedItems));
        }
        document.querySelector('.finished-items').append(finishedItem);
    }
});




function updateTotalTasks() {
    totalTasks.textContent = `${storedItems.completed.length} of ${storedItems.mylist.length + storedItems.completed.length} tasks completed`;
}


const heading = document.querySelector("#main-heading");
const totalTasks = document.createElement('p');
totalTasks.textContent = `${storedItems.completed.length} of ${storedItems.mylist.length + storedItems.completed.length} tasks completed`;
heading.after(totalTasks);


document.querySelector(".create").addEventListener('click', () => {
    setTimeout(updateTotalTasks, 0);
});

document.querySelector('.list').addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        setTimeout(updateTotalTasks, 0);
    }
});



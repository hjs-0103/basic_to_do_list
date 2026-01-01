
let storedItems = JSON.parse(localStorage.getItem('items')) || { mylist: [], completed: [] };
console.log(storedItems);

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


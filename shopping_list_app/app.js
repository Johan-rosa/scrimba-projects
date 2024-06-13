// Firebase configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-ee653-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

// Objects from the DOM
const inputElement = document.getElementById("input-field")
const addBtn = document.getElementById("add-btn")
const shoppingList = document.getElementById("shopping-list")

onValue(shoppingListInDB, snapshot => {
    if (snapshot.exists()) {
        let itemsInDB = Object.entries(snapshot.val())
        shoppingList.innerHTML = null
        itemsInDB.forEach(itemEntry => addInputToList(itemEntry))
    } else {
        shoppingList.innerHTML = "No items adde... yet"
    }
})

addBtn.addEventListener("click", () => {
    let item =inputElement.value 

    push(shoppingListInDB, item)
    clearInputValue()
})

const addInputToList = (itemEntry) => {
    let itemID = itemEntry[0]
    let itemValue = itemEntry[1]

    let newElement = document.createElement("li")
    newElement.textContent = itemValue    

    newElement.addEventListener("click", () => {
        let itemLocation = ref(database, `shoppingList/${itemID}`)
        remove(itemLocation)
    })

    shoppingList.append(newElement)
}
    
function clearInputValue() {
    inputElement.value = null
}
function clearSoppingList () {
    shoppingList.value = null
}


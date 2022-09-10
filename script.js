const inputButton = document.getElementById("input-btn"); // --- Save Input button
const deleteAll = document.getElementById("delete-btn"); // --- Delete All button
const tabButton = document.getElementById("tab-btn"); // --- Save Tab button
const removeItem = document.getElementsByClassName("deleteItem"); // --- Delete button that's part of the list items
const inputBox = document.getElementById("input-el"); // --- Input field for the HTTP links
const inputName = document.getElementById("input-el-name"); // --- Input field for the Names of HTTP links
const unList = document.getElementById("ul-el"); // --- The unordered list where list items will be added
let myData = []; // --- The array where data will be stored so it could be further rendered on page


/// ---checks if there is anything stored in local storage, parses it into an array and renders it on the page
const dataFromLocalStorage = JSON.parse(localStorage.getItem("myData"));
if(dataFromLocalStorage) {
    myData = dataFromLocalStorage;
    renderLeads(myData);
}

/// ---creates an object by collecting the Http links and Name from the input fields
function createLink(httpLink, linkName, title) {
    let newLink = {
        link: httpLink,
        name: linkName,
        title: title
    }
    return newLink;
}

/// ---renders the bookmarks on the screen by creating list items and appending them to the list
function renderLeads(arr) {
    let listItem = "";
    
    for(let i = 0; i < arr.length; i++) {
        listItem += `
            <li id="${i}">
                <a href="${arr[i].link}" title="${arr[i].title}" target="_blank">${arr[i].name}</a>
                <button class="deleteItem">X</button>
            </li>`
    }
    unList.innerHTML = listItem; 
}

/// ---pushes the newly made object into the myData array, stores the item in local storage and renders the bookmark on page
inputButton.addEventListener("click", () => {
    let link = inputBox.value;
    let name = inputName.value;
    let title = inputName.value;
    if(link != "" && name != "") {
        if(name.length > 30) {
            const array = Array.from(name);
            array.splice(30);
            array.push("...");
            let arr = array.join("");
            console.log(title);
            myData.push(createLink(link, arr, title));
        }
        else {
            myData.push(createLink(link, name, title));
        }
    }
    else {
        alert("Please input text");
    }
    inputBox.value = "";
    inputName.value = "";
    localStorage.setItem("myData", JSON.stringify(myData));
    renderLeads(myData);
});


/// ---deletes all the bookmarks from the local storage and thus from the page
deleteAll.addEventListener("click", () => {
    localStorage.clear();
    myData = [];
    renderLeads(myData);
});


/// ---creates and object form the current active tab information, pushes it to myData array, stores in local storage and renders on screen
tabButton.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let link = tabs[0].url;
        let name = tabs[0].title;
        let title = tabs[0].title;
        if(link != "" && name != "") {
            if(name.length > 30) {
                const array = Array.from(name);
                array.splice(30);
                array.push("...");
                let arr = array.join("");
                myData.push(createLink(link, arr, title));
            }
            else {
                myData.push(createLink(link, name, title));
            } 
        }
        localStorage.setItem("myData", JSON.stringify(myData));
        renderLeads(myData);
    });
});


/// ---removes the individual bookmark from the parent list, the local storage and from the screen
unList.addEventListener("click", (e) => {
    console.log(e.target.tagName);
    if(e.target.tagName === "BUTTON") {
        e.target.parentElement.remove()
        myData.splice(e.target.parentElement.getAttribute("id"), 1);
        localStorage.setItem("myData", JSON.stringify(myData));
    }
});
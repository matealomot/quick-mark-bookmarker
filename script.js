// VARIABLES  --------------------

const body = document.querySelector('body'); // the body of the page
const header = document.querySelector('header'); // the header of the page
const buttons = document.querySelectorAll('button'); // the buttons that appear across the page and settings
const addOneTab = document.getElementById("addTab"); // button that adds the currently active tab
const addTabs = document.getElementById("addAll"); // button that adds all the tabs in the current window
const deleteTabs = document.getElementById("deleteAll"); // button that deletes all the tabs
const selectAll = document.getElementById("select_all"); // button that checks all checkmarks
const diselectAll = document.getElementById("diselect_all"); // button that unchecks all checkmarks
const deleteSelected = document.getElementById('delete_selected'); // button that deletes all checkmarked tabs
const settings = document.getElementById("settings"); // button that opens up the settings for customizing the extension
const bookmarks = document.getElementById("container"); // the main container where the saved tabs are displayed on screen
const settingsTab = document.getElementById("colorPicker"); // container with the settings for customizing the extension
const resetSettings = document.getElementById("resetSettings"); // button inside settings that resets all input selections to the default colors
const setBody = document.getElementById("saveBodyColor"); // button that sets a new desired color for the body based on the value of the color input field
const setHeader = document.getElementById("saveHeaderColor"); // button that sets a new desired color for the header based on the value of the color input field
const setButton = document.getElementById("saveButtonColor"); // button that sets a new desired color for the buttons (not "deleteBlock" buttons inside tabBlock) based on the value of the color input field
const setBorder = document.getElementById("saveBorderColor"); // button that sets a new desired color for the borders on buttons and bookmarks based on the value of the color input field
const setBookmarks = document.getElementById("saveBookmarkColor"); // button that sets a new desired color for the bookmarks (tabBlock) based on the value of the color input field
const resetBody = document.getElementById("resetBodyColor"); // button that resets the input color field in the settings to default body color
const resetHeader = document.getElementById("resetHeaderColor"); // button that resets the input color field in the settings to default header color
const resetButtonColor = document.getElementById("resetButtonColor"); // button that resets the input color field in the settings to default button color
const resetBookmarkColor = document.getElementById("resetBookmarkColor"); // button that resets the input color field in the settings to default bookmark (tabBlock) color
const resetBorderColor = document.getElementById("resetBorderColor");
let allTabs = []; // the main array which stores all the saved tabs and is saved in local storage for further storing/reading under the key name "myData"
let dataFromLocalStorage = JSON.parse(localStorage.getItem("myData")); // the data that is currently stored in local storage (allTabs array which is either empty or full)
let bodyColorData = JSON.parse(localStorage.getItem("bodyColor")); // the color for the body that's saved in local storage
let headerColorData = JSON.parse(localStorage.getItem("headerColor")); // the color for the header that's saved in local storage
let buttonsColorData = JSON.parse(localStorage.getItem("buttonColor")); // the color for the buttons that's saved in local storage
let borderColorData = JSON.parse(localStorage.getItem("borderColor"));
//.........................

// Checking LocalStorage for any data and if true, displaying the data

if(dataFromLocalStorage) {
  allTabs = dataFromLocalStorage;
  allTabs.forEach(element => createDiv(element));
  body.style.backgroundColor = bodyColorData;
  header.style.backgroundColor = headerColorData;
  buttons.forEach(button => {
    button.style.backgroundColor = buttonsColorData;
    button.style.border = `1px solid ${borderColorData}`;
  });
  settingsTab.style.backgroundColor = bodyColorData;
  settingsTab.style.border = `1px solid ${borderColorData}`;
}
else {
  bookmarks.innerHTML = "<p>No saved tabs</p>";
  body.style.backgroundColor = bodyColorData;
  header.style.backgroundColor = headerColorData;
  buttons.forEach(button => {
    button.style.backgroundColor = buttonsColorData;
    button.style.border = `1px solid ${borderColorData}`;
  });
  settingsTab.style.backgroundColor = bodyColorData;
  settingsTab.style.borderLeft = `1px solid ${borderColorData}`;
};

//.........................

// Checking which theme should is enabled (Dark, Light, or Default if Dark/Light theme isn't selected/supported)

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // Dark mode is enabled
  body.classList.add("dark");
  let bodyColor = document.getElementById('bodyColor').value = "#898585";
  let headerColor = document.getElementById('headerColor').value = "#3A3A3A";
  let bookmarkColor = document.getElementById("bookmarkColor").value = "#1E1E1E";
  let buttonColor = document.getElementById('buttonColor').value = "#1E1E1E";
  let borderColor = document.getElementById('borderColor').value = "#000000";
}
else if(window.matchMedia('(prefers-color-scheme: light)').matches) {
  // Light mode is enabled
  body.classList.add("light");
  let bodyColor = document.getElementById('bodyColor').value = "#FFFFFF";
  let headerColor = document.getElementById('headerColor').value = "#F1F3F5";
  let bookmarkColor = document.getElementById("bookmarkColor").value = "#F2F2F2";
  let buttonColor = document.getElementById('buttonColor').value = "#F2F2F2";
  let borderColor = document.getElementById('borderColor').value = "grey";
}
else {
  // Default theme mode is enabled
  body.classList.remove("dark", "light");
  let bodyColor = document.getElementById('bodyColor').value = "#E0DEDE";
  let headerColor = document.getElementById('headerColor').value = "#FFBFCB";
  let bookmarkColor = document.getElementById("bookmarkColor").value = "#FFE5EA";
  let buttonColor = document.getElementById('buttonColor').value = "#FFE5EA";
  let borderColor = document.getElementById('borderColor').value = "#FF54F1";
};

// FUNCTIONS --------------------

// Creates the link object that is added to the array, saved in LocalStorage and displayed on the page

function createLink(id, name, title, httpLink) {
  let newLink = {
      id: id,
      linkName: name,
      title: title,
      urlLink: httpLink
  };
  return newLink;
};

//.........................

// Checks the length of the link title so that it can be shortened if it exceeds 30 characters

function checkTitleLength(title) {
  if(title.length > 30) {
      const array = Array.from(title);
      array.splice(30);
      array.push("...");
      title = array.join("");
      return title;
  }
  else {
    return title;
  };
};

//.........................

// Returns a random number that's later passed as a id to links inside the array and local storage

function idGenerator() {
  return Math.floor(Math.random() * (1000000 - 0 + 1)) + 0;
};

//.........................

// Resets the value of the individual color input field in the settings tab to their default value which depends on the OS theme

function resetColorInput(inputId, colorA, colorB, colorC) {
  let colorInput = document.getElementById(inputId);
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colorInput.value = colorA;
  }
  else if(window.matchMedia('(prefers-color-scheme: light)').matches) {
    colorInput.value = colorB;
  }
  else {
    colorInput.value = colorC;
  };

  return colorInput;
};

//.........................

// Checks if there are any checked checkboxes and if so, displays additional buttons on the page by changing their display proprety to "flex" (default is"none")

function checkForCheckboxes() {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  if(checkboxes.length > 0) {
    checkboxes.forEach(e => {
      e.addEventListener('click', () => {
        let isChecked = false;
        for (let i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
            isChecked = true;
            break;
          }
        }
        if(isChecked) {
          const selectionBox = document.getElementById("selectionBox");
          selectionBox.style.display = "flex";
        }
        else {
          const selectionBox = document.getElementById("selectionBox");
          selectionBox.style.display = "none";
        };
      });
    });
  };
};
checkForCheckboxes();

//.........................

// Creates a div container (with a Delete button and checkbox) for each link that's saved so that it can be displayed on the page

function createDiv(element) {
  let bookmarkColorData = JSON.parse(localStorage.getItem("bookmarkColor"));
  let borders = JSON.parse(localStorage.getItem("borderColor"));
  const tabBlock = document.createElement('div');
  tabBlock.classList.add("tabBlock");

  if(bookmarkColorData) {
    tabBlock.style.backgroundColor = bookmarkColorData;
    tabBlock.style.border = `1px solid ${borders}`;
  }

  const deleteBlock = document.createElement('button');
  deleteBlock.innerText = "X";
  deleteBlock.classList.add("deleteBlock");

  const title = document.createElement('a');
  title.innerText = element.title;
  title.href = element.urlLink;
  title.setAttribute("id", element.id);
  title.setAttribute("title", element.linkName);
  title.setAttribute("target", "_blank");

  const checkMark = document.createElement('input');
  checkMark.setAttribute('type', 'checkbox');
  checkMark.setAttribute('id', element.id);
  checkMark.setAttribute('name', "myCheckbox");

  tabBlock.appendChild(title);
  tabBlock.appendChild(deleteBlock);
  tabBlock.appendChild(checkMark);
  bookmarks.appendChild(tabBlock);

  deleteBlock.addEventListener("click", (e) => {
    if(allTabs.length == 1) {
      if(e.target.classList.contains("deleteBlock")) {
          e.target.parentElement.remove();
          localStorage.removeItem("myData");
          bookmarks.innerHTML = "<p>No saved tabs</p>";
          allTabs = [];
      };
    }
    else {
      if(e.target.classList.contains("deleteBlock")) {
          let targetID = e.target.previousSibling.getAttribute('id');
          let arrayID = 0;
          for(let i = 0; i < allTabs.length; i++) {
            if(allTabs[i].id == targetID) {
              arrayID = i;
            }
          };
          e.target.parentElement.remove();
          allTabs.splice(arrayID, 1);
          localStorage.setItem("myData", JSON.stringify(allTabs));
      };
    };
  });
};

// EVENTS --------------------

// Adds the current active tab as a bookmark

addOneTab.addEventListener("click", () => {
  if(bookmarks.innerHTML == "<p>No saved tabs</p>") {
    chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
      bookmarks.innerHTML = "";
      let tabID = idGenerator();
      let tabName = tab[0].title;
      let tabURL = tab[0].url;
      let tabTitle = checkTitleLength(tab[0].title);

      let newLink = createLink(tabID, tabName, tabTitle, tabURL);
      createDiv(newLink);
      allTabs.push(newLink);
      localStorage.setItem("myData", JSON.stringify(allTabs));
      checkForCheckboxes();
    });
  }
  else {
    chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
      let tabID = idGenerator();
      let tabName = tab[0].title;
      let tabURL = tab[0].url;
      let tabTitle = checkTitleLength(tab[0].title);

      let newLink = createLink(tabID, tabName, tabTitle, tabURL);
      createDiv(newLink);
      allTabs.push(newLink);
      localStorage.setItem("myData", JSON.stringify(allTabs));
      checkForCheckboxes();
    });
  };
});

//.........................

// Adds all tabs from current window as bookmarks

addTabs.addEventListener("click", () => {
  if(bookmarks.innerHTML == "<p>No saved tabs</p>") {
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
      bookmarks.innerHTML = "";
      tabs.forEach(tab => {
        let tabID = idGenerator();
        let tabName = tab.title;
        let tabURL = tab.url;
        let tabTitle = checkTitleLength(tab.title);

        let newLink = createLink(tabID, tabName, tabTitle, tabURL);
        createDiv(newLink);
        allTabs.push(newLink);
      });

      localStorage.setItem("myData", JSON.stringify(allTabs));
      checkForCheckboxes();
    });
  }
  else {
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
      tabs.forEach(tab => {
        let tabID = idGenerator();
        let tabName = tab.title;
        let tabURL = tab.url;
        let tabTitle = checkTitleLength(tab.title);

        let newLink = createLink(tabID, tabName, tabTitle, tabURL);
        createDiv(newLink);
        allTabs.push(newLink);
      });

      localStorage.setItem("myData", JSON.stringify(allTabs));
      checkForCheckboxes();
    });
  };
});

//.........................

// Deletes all bookmarks from the page, local storage and clears the array

deleteTabs.addEventListener("click", () => {
    allTabs.length = 0;
    // bookmarks.innerHTML = "";
    localStorage.removeItem("myData");
    bookmarks.innerHTML = "<p>No saved tabs</p>";
    const selectionBox = document.getElementById("selectionBox");
    if(selectionBox.style.display != "none") {
      selectionBox.style.display = "none";
    };
});

//.........................

// Selects all the tabs by checking all of the checkboxes

selectAll.addEventListener("click", () => {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkmark => {
    checkmark.checked = true;
  });
});

//.........................

// Disselects all tabs by unchecking all the checkboxes

diselectAll.addEventListener("click", () => {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkmark => {
    checkmark.checked = false;
  });
  selectionBox.style.display = "none";
});

//.........................

// Deletes all tabs (from the page, array and localstorage) the checkboxes of which are checked

deleteSelected.addEventListener("click", () => {
  if(allTabs.length == 1) {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(element => {
      element.parentElement.remove();
      localStorage.removeItem("myData");
      selectionBox.style.display = "none";
      bookmarks.innerHTML = "<p>No saved tabs</p>";
      allTabs = [];
    });
  }
  else {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(element => {
      if(element.checked) {
        let linkId = element.parentElement.children[0].id;
        let elementId = 0;
        for(let i = 0; i < allTabs.length; i++) {
          if(allTabs[i].id == linkId) {
            elementId = i;
          }
        };
        element.parentElement.remove();
        allTabs.splice(elementId, 1);
        localStorage.setItem("myData", JSON.stringify(allTabs));
      };
    });
    if(allTabs.length == 0) {
      localStorage.removeItem("myData");
      bookmarks.innerHTML = "<p>No saved tabs</p>";
      allTabs = [];
    };
  };
});

//.........................

// Displays the settings element (div) by changing its display to "block" (default is "none")

settings.addEventListener("click", () => {
  if(settingsTab.style.display == "none") {
    settingsTab.style.display = "block";
  }
  else {
    settingsTab.style.display = "none";
  };
});

//.........................

// Changes the Settings' display property to "none" if clicked anywhere outside the Settings element (div)

document.addEventListener("click", (e) => {
  const isClickInsideElement = settingsTab.contains(e.target);
  const isClickInsideButton = settings.contains(e.target);

  if (!isClickInsideElement && !isClickInsideButton) {
    settingsTab.style.display = 'none';
  };
})

//.........................

// Changes the color of the body element based on the value from the body color input field and saves it to localstorage

setBody.addEventListener("click", () => {
  let bodyColor = document.getElementById('bodyColor').value;
  body.style.backgroundColor = bodyColor;
  settingsTab.style.backgroundColor = bodyColor;

  localStorage.setItem("bodyColor", JSON.stringify(bodyColor));
});

//.........................

// Changes the color of the header element based on the value from the header color input field and saves it to localstorage

setHeader.addEventListener("click", () => {
  let headerColor = document.getElementById('headerColor').value;
  header.style.backgroundColor = headerColor;

  localStorage.setItem("headerColor", JSON.stringify(headerColor));
});

//.........................

// Changes the color of the bookmark element based on the value from the bookmark color input field and saves it to localstorage

setBookmarks.addEventListener("click", () => {
  let bookmarkLinks = document.getElementsByClassName("tabBlock");
  let bookmarkColor = document.getElementById("bookmarkColor").value;
  if(bookmarkLinks.length > 0) {
    for(let i = 0; i < bookmarkLinks.length; i++) {
      bookmarkLinks[i].style.backgroundColor = bookmarkColor;
    };
    localStorage.setItem("bookmarkColor", JSON.stringify(bookmarkColor));
  }
  else {
    localStorage.setItem("bookmarkColor", JSON.stringify(bookmarkColor));
  };
});

//.........................

// Changes the color of the button element based on the value from the button color input field and saves it to localstorage

setButton.addEventListener("click", () => {
  let buttonColor = document.getElementById('buttonColor').value;
  const filteredButtons = Array.from(buttons).filter(button => !button.classList.contains('deleteBlock'));
  filteredButtons.forEach(button => {
    button.style.backgroundColor = buttonColor;
  });

  localStorage.setItem("buttonColor", JSON.stringify(buttonColor));
});

//.........................

// Changes the color of the borders based on the value from the border color input field and saves it to localstorage

setBorder.addEventListener("click", () => {
  let borderColor = document.getElementById('borderColor').value;
  buttons.forEach(button => {
    button.style.border = `2px solid ${borderColor}`;
  });

  let bookmarkLinks = document.getElementsByClassName("tabBlock");
  if(bookmarkLinks.length > 0) {
    for(let i = 0; i < bookmarkLinks.length; i++) {
      bookmarkLinks[i].style.border = `1px solid ${borderColor}`;
    };
  };

  settingsTab.style.borderLeft = `1px solid ${borderColor}`;

  localStorage.setItem("borderColor", JSON.stringify(borderColor));
});

//.........................

// Calls the resetColorInput() function (see explanation above) by clicking on the buttons inside the Settings tab

resetBody.addEventListener("click", () => {resetColorInput("bodyColor","#898585","#FFFFFF", "#E0DEDE")});

//.........................

resetHeader.addEventListener("click", () => {resetColorInput("headerColor", "#3A3A3A", "#F1F3F5", "#FFBFCB")});

//.........................

resetButtonColor.addEventListener("click", () => {resetColorInput("buttonColor", "#1E1E1E", "#F2F2F2", "#FFE5EA")});

//.........................

resetBookmarkColor.addEventListener("click", () => {resetColorInput("bookmarkColor", "#1E1E1E", "#F2F2F2", "#FFE5EA")});

//.........................

resetBorderColor.addEventListener("click", () => {resetColorInput("borderColor", "#000000", "#FF54F1", "#FF54F1")});

//.........................

// Resets the colors of all the elements back to their default values (based on the OS theme) and clears the localstorage of said color values

resetSettings.addEventListener("click", () => {
  let defaultHeader = "";
  let defaultButtonsBookmark = "";
  let defaultBorderColor = "";
  let defaultBodyColor = "";


  if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Dark mode is enabled
    defaultHeader = "#3A3A3A";
    defaultButtonsBookmark = "#1E1E1E";
    defaultBorderColor = "#000000";
    defaultBodyColor = "#898585";
  }
  else if(window.matchMedia('(prefers-color-scheme: light)').matches) {
    // Light mode is enabled
    defaultHeader = "#F1F3F5";
    defaultButtonsBookmark = "#F2F2F2";
    defaultBorderColor = "grey";
    defaultBodyColor = "#FFFFFF";
  }
  else {
    // Default theme mode is enabled
    defaultHeader = "#FFBFCB";
    defaultButtonsBookmark = "#FFE5EA";
    defaultBorderColor = "#FF54F1";
    defaultBodyColor = "#E0DEDE";
  };


  body.style.backgroundColor = defaultBodyColor;
  settingsTab.style.backgroundColor = defaultBodyColor;
  settingsTab.style.borderLeft = `1px solid ${defaultBorderColor}`;

  let header = document.querySelectorAll('header');
  header.forEach(element => {
    element.style.backgroundColor = defaultHeader;
  });

  let buttons = document.querySelectorAll('button');
  const filteredElements = Array.from(buttons).filter(button => !button.classList.contains('deleteBlock'));
  filteredElements.forEach(button => {
    button.style.backgroundColor = defaultButtonsBookmark;
    button.style.border = `1px solid ${defaultBorderColor}`;
  });

  let bookmarkLinks = document.getElementsByClassName("tabBlock");
  if(bookmarkLinks.length > 0) {
    for(let i = 0; i < bookmarkLinks.length; i++) {
      bookmarkLinks[i].style.backgroundColor = defaultButtonsBookmark;
      bookmarkLinks[i].style.border = `1px solid ${defaultBorderColor}`;
    };
  };

  const keys = ["bodyColor", "headerColor", "buttonColor", "borderColor", "bookmarkColor"];

  if(keys) {
    keys.forEach(key => {localStorage.removeItem(key)});
  };
});


function getButtons() {
  let buttons = document.querySelectorAll('button');
  return buttons;
};

const buttons = getButtons();

const [
  addTab, 
  addAll, 
  deleteAll, 
  settings, 
  saveBodyColor, 
  resetBodyColor, 
  saveBookmarkColor, 
  resetBookmarkColor, 
  saveHeaderColor, 
  resetHeaderColor, 
  saveFontColor,
  resetFontColor,
  saveButtonColor, 
  resetButtonColor, 
  saveBorderColor, 
  resetBorderColor, 
  resetSettings, 
  delete_selected, 
  diselect_all, 
  select_all
] = buttons;


// Elements 

const body = document.querySelector('body'); // the body of the page
const header = document.querySelector('header'); // the header of the page
const bookmarks = document.getElementById("container"); // the main container where the saved tabs are displayed on screen
const settingsTab = document.getElementById("colorPicker"); // container with the settings for customizing the extension

// Buttons 

const addOneTab = addTab; // button that adds the currently active tab
const addTabs = addAll; // button that adds all the tabs in the current window
const deleteTabs = deleteAll; // button that deletes all the tabs
const selectAll = select_all; // button that checks all checkmarks
const diselectAll = diselect_all; // button that unchecks all checkmarks
const deleteSelected = delete_selected; // button that deletes all checkmarked tabs
const settingButton = settings; // button that opens up the settings for customizing the extension
const resetSettingsButton = resetSettings; // button inside settings that resets all input selections to the default colors
const setBody = saveBodyColor; // button that sets a new desired color for the body based on the value of the color input field
const setHeader = saveHeaderColor; // button that sets a new desired color for the header based on the value of the color input field
const setFont = saveFontColor; // button that sets a new desired color for the font based on the value of the color input field
const setButton = saveButtonColor; // button that sets a new desired color for the buttons (not "deleteBlock" buttons inside tabBlock) based on the value of the color input field
const setBorder = saveBorderColor; // button that sets a new desired color for the borders on buttons and bookmarks based on the value of the color input field
const setBookmarks = saveBookmarkColor; // button that sets a new desired color for the bookmarks (tabBlock) based on the value of the color input field
const resetBody = resetBodyColor; // button that resets the input color field in the settings to default body color
const resetHeader = resetHeaderColor; // button that resets the input color field in the settings to default header color
const resetFont = resetFontColor; // button that resets font color field in the settings to default font color
const resetButtonColorButton = resetButtonColor; // button that resets the input color field in the settings to default button color
const resetBookmarkColorButton = resetBookmarkColor; // button that resets the input color field in the settings to default bookmark (tabBlock) color
const resetBorderColorButton = resetBorderColor; // button that resets the border colors in the settings to default border color for all elements

// Container and local storage variables

let dataFromLocalStorage = JSON.parse(localStorage.getItem("myData")); // the data that is currently stored in local storage (allTabs array which is either empty or full)
let bodyColorData = JSON.parse(localStorage.getItem("bodyColor")); // the color for the body that's saved in local storage
let headerColorData = JSON.parse(localStorage.getItem("headerColor")); // the color for the header that's saved in local storage
let buttonsColorData = JSON.parse(localStorage.getItem("buttonColor")); // the color for the buttons that's saved in local storage
let borderColorData = JSON.parse(localStorage.getItem("borderColor")); // the color of the borders that's saved in local storage 
let fontsColorData = JSON.parse(localStorage.getItem("fontsColor")); // the color of the fonts that's saved in local storage 


export {
  addOneTab, 
  addTabs, 
  deleteTabs, 
  selectAll, 
  diselectAll, 
  deleteSelected, 
  settingButton, 
  resetSettingsButton, 
  setBody, 
  setHeader,
  setFont, 
  setButton, 
  setBorder, 
  setBookmarks, 
  resetBody, 
  resetHeader, 
  resetFont,
  resetButtonColorButton, 
  resetBookmarkColorButton, 
  resetBorderColorButton,
  buttons,
  body,
  header,
  bookmarks,
  settingsTab,
  dataFromLocalStorage,
  bodyColorData,
  headerColorData,
  buttonsColorData,
  borderColorData,
  fontsColorData
};
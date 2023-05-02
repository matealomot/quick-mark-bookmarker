# QuickMark Bookmarker

<p>A simple bookmarker that allows saving of the currently active tab or all tabs in the browser window.<br>
The links are saved in local storage.</p>

## Current features

### Saving the active tab as a bookmark

<p>The "Add Tab" button will take your currently active tab and save/display it as a bookmark.</p>

### Saving all tabs as a bookmarks

<p>This could be considered the main feature of the bookmarker.<br>
The "Add All Tabs" button will take all the tabs opened in the browser window and will save/display them as bookmarked links.</p> 

### Deleting all or individual tabs

<p>The "Delete All Tabs" button will remove all the bookmarked links, both from the page and from local storage.<br>
On the other hand, each bookmarked link comes with its own delete button which allows the user to remove specific bookmarks individually.</p>

### Selecting multiple bookmarks and removing them in groups

<p>Each bookmarked link comes with a checkbox allowing the user to select which bookmarks are to be removed.<br>
Checking even one checkbox will reveal additional options including the ability to "Select ALL", "Deselect All" and finally,<br> "Delete Selected" which will remove all checked bookmarks, both from the page and local storage.</p>

### Changing the colors of individual elements through the Settings tab

<p>Clicking on the little cogwheel button in the top right corner will open the settings tab.<br>
Here you can select and modify the colors of individual elements, including the body, header, buttons, borders and finally bookmarks themselves.<br>
The customized color choices are then "Set" and saved in LocalStorage.<br>
If you wish to go back to the extension's default colors, just click "Reset All To Default".<br>
Or if you wish, you can reset individual elements to their original color and set them as such.</p>

<p>*It should be noted that the default colors of the extension will depend on the OS theme as well.*<br>
The extensions will feature a dark or light theme, or if the system doesn't have one set, the default theme.</p>

## Future/Upcoming features

<p>As of now, I wish to also add the ability for the user to change the font color, so that it can be matched properly with whatever color choices users select for the extensions.<br>
At the moment the font is either black or white by default, depending on whether the extension's default theme is Dark or Light, but I will fix that and add more options for it in the future.</p>

<p>Another plan is to eventually change the save locations for the bookmarks and settings to an actual database like Indexdb or something similar so that the data isn't lost if the user clears out their local storage.</p>

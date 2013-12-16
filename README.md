## Intro

This Javascript file provides a enduser with the ability to show and hide columns from a table, you can decide wich columns can be hidden


## Requirements

**Required:**

* [jQuery](http://jquery.com/)

**Optional:**

* [Bootstrap](http://getbootstrap.com/2.3.2/) TODO: Upgrade code to use Bootstrap 3.x (not tested if it works with 3.0)


## Installation and Setup

1. Place the selectable.js in your webroot

Or clone it from github: 
'https://github.com/AlexStallen/SelectTable.git'

or download the archive from Github: 
'https://github.com/AlexStallen/SelectTable/archive/master.zip'


2. Include the javascript (selectable.js) onto the proper webpages



## Usage
Tables must include a <thead> tag like the following and have a unique ID:
```html
<table id='tabelId'>
   <thead>
      <th data-columnname="first">Column 1</th>
      <th data-columnname="second">Column 2</th>
      <th>Column 3</th>
   </thead>
   <tbody>
      <tr>
         <td>Column 1 contents</td>
         <td>Column 2 contents</td>
         <td>Column 3 contents</td>
      </tr>
   </tbody>
</table>
```

Give all columns you want your uses to be able to hide a unique 'data-columnname' attribute (This name is only used if you leave the columnname empty) Columns without this attribute cannot be hidden

Somewhere else on your page you add a TwitterBootstrap button group to wich the show/hide button will be appended. This could be a empty button group, but can also be a existing button group, you need the ID from this button group to initialize SelecTable

```html
<div class="btn-toolbar">
   <div class="btn-group dropup" id="columnsDiv"> //you can decide here if the show/hide menu is a dropup or down
      //Optional other buttons
   </div>
</div>
```

Finally you initialize the plugin in a document ready function

```html
$(document).ready(function() {
    initColumns('tabelid', 'columnsDiv', 'Columns', true);
});
```
First parameter is the ID of the Tabel
Second parameter is the ID of the button group where you want to show the 'hide/show' button
Third parameter is the name you want to display on the 'hide/show' button
Fourth parameter is a boolean(True or False) wether you want to include hide all / show all buttons in the menu


## Images

comming soon
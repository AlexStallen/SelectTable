/*!
* columns 0.1 - Client-side table selection with ease!
* Copyright (c) 2013 Alex Stallen
*/

  function initColumns(tableId, btnGroupId, btnName, allBtns) {
    //build up the arrays with ID's and names
    var tablefields = new Array();
    var tablenames = new Array();
    $('#'+tableId+' thead th').each(function() { //find the table concerned and loopt through all TH's
        var columnName = '';
        if ($(this).data("columnname") !== undefined) {
            var columnName = $(this).data("columnname");
        }
        tablefields.push(columnName); //fill this Array with all the ID's
        if($(this).text() == '' ) {
            tablenames.push(columnName);
        } else {
            tablenames.push($(this).text()); //fill this Array with all the names
        }
    });

    //function like php's UCfirst()
    function capitaliseFirstLetter(string)
    {
       return string.charAt(0).toUpperCase() + string.slice(1);
    }

    $(document).ready(function() {
        //build up the button and append it to the right menu
        var button = '<a class="btn dropdown-toggle" data-toggle="dropdown" href="#"><i class="icon-th-list"></i> '+btnName+ ' <span class="caret"></span></a>';
        button += '<ul class="dropdown-menu columnselection pull-right">';
        if (allBtns) {
                button += '<li><a href="#" id="hideAll"><i class="icon-plus"></i> Hide all</a></li>';
            button += '<li><a href="#" id="showAll"><i class="icon-minus"></i> Show all</a></li>';
            button += '<li class="divider"></li>' ;
        }
        $.each( tablefields, function( key, value ) {
           if(value != '') { //no value means no data-attribute was set, so we can ignore it
                var selector = 'toggle' + capitaliseFirstLetter(value); //build up the name of the jQuery selector
                button += '<li><a><input type="checkbox" id="'+selector+'" checked><label class="columncursor" for="'+selector+'"> '+tablenames[key]+'</label></a></li>';
            }
        });
        button += '<li class="divider"></li>';
        button += '<li><a href="#" id="closeDropdown"><i class="icon-remove"></i> Close</a></li>';
        button += '</ul>';
        $("#"+btnGroupId).append(button); //here we append the created button to the given menu DIV

        //keeps the dropdown  on colums from closing
        $('.columnselection').on('click', function(e){
            e.stopPropagation();
        });

        //the close button however still needs to close the dropdown
        $('#closeDropdown').on('click', function(e){
            $('[data-toggle="dropdown"]').parent().removeClass('open');
        });

        $('#hideAll').click(function(e) {
            $.each( tablefields, function( key, value ) {
                if(value != '') { //no value means no ID was set, so we can ignore it
                    var thIndex = key + 1; //increment the key since js arrays start at 0 but our dom selection of the tables start at 1
                    var selector = '#toggle' + capitaliseFirstLetter(value); //build up the name of the jQuery selector
                    $(' #'+tableId+' td:nth-child('+thIndex+'), #'+tableId+' th:nth-child('+thIndex+')').hide();
                    $(selector).prop('checked', false); //check the corresponding checkbox
                    localStorage.setItem('column'+value,'unchecked');
                }
             }); 
        });

        $('#showAll').click(function(e) {
            $.each( tablefields, function( key, value ) {
                if(value != '') { //no value means no ID was set, so we can ignore it
                    var thIndex = key + 1; //increment the key since js arrays start at 0 but our dom selection of the tables start at 1                                  
                    var selector = '#toggle' + capitaliseFirstLetter(value); //build up the name of the jQuery selector
                    $(' #'+tableId+' td:nth-child('+thIndex+'), #'+tableId+' th:nth-child('+thIndex+')').show();
                    $(selector).prop('checked', true); //uncheck the corresponding checkbox
                    localStorage.setItem('column'+value,'checked');
                }
            });
        });

        $.each( tablefields, function( key, value ) {
            var thIndex = key + 1; //increment the key since js arrays start at 0 but our dom selection of the tables start at 1
            var selector = '#toggle' + capitaliseFirstLetter(value); //build up the name of the jQuery selector
            //function we bind to every checkbox/th
            $(selector).click(function(e) {
                if ($(selector).is(':checked')) { //here we wright the value of the checkbox to the localstorage
                   localStorage.setItem('column'+value,'checked');
                    $(' #'+tableId+' td:nth-child('+thIndex+'), #'+tableId+' th:nth-child('+thIndex+')').show(); //Show the TH and TD's corresponding to the checkbox (de)selected
                } else {
                   localStorage.setItem('column'+value,'unchecked');
                    $(' #'+tableId+' td:nth-child('+thIndex+'), #'+tableId+' th:nth-child('+thIndex+')').hide(); //Hide the TH and TD's corresponding to the checkbox (de)selected
                } 
            });
            if ((localStorage.getItem('column'+value+'') == 'checked') || (localStorage.getItem('column'+value+'') === null)) { //on load of the page we will see if there is anything stored in the localstorage
                //if there is nothing present about a certain checkbox we make sure we show the TH/TD
                $(' #'+tableId+' td:nth-child('+thIndex+'), #'+tableId+' th:nth-child('+thIndex+')').show(); //SHOW the TD and TH
                $(selector).prop('checked', true); //mark the checkboxes as checked
            } else {
                $(' #'+tableId+' td:nth-child('+thIndex+'), #'+tableId+' th:nth-child('+thIndex+')').hide(); //HIDE the TD and TH
                $(selector).prop('checked', false); //mark the checkboxes as unchecked
            } 
        });

    //some css 
    $(".columncursor").css("display","inline");
    $(".columncursor").css("cursor","pointer");
    }); 
}

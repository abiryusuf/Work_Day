//Abir Yusuf, Date: 03/10/2020
// (document).ready the function will make sure that javaScript won't run before html 
$(document).ready(function() {
  

    var time = false;
  
    // date format
    var now = moment().format('MMMM Do YYYY');
    var nowHour24 = moment().format('H');
    var nowHour12 = moment().format('h');
  
    // set times for tesitng after hours
    if (time) {
      nowHour24 = 13;
      nowHour12 = 1;
    }
  
    const $dateHeading = $('#currentDay');
    $dateHeading.text(now);
    
    // Get stored from localStorage
    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
    if (time) { console.log(storedPlans); }
  
    // If plans were retrieved from localStorage, update the plan array to it
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {
      // this should only occur on first time the app is loaded in the browser
    
      planTextArr = new Array(9);
      planTextArr[4] = "";
    }
  
    if (time) {
         console.log("full array of plned text",planTextArr); 
        }
  
    // get element from DOM 
    var $plannerDiv = $('#shedulerContainer');
    // clear  elements or remove data
    $plannerDiv.empty();
  
    if (time) { console.log("current time",nowHour12); }
  
  
    // for loop 
    for (var hour = 8; hour <= 17; hour++) {
      // index for array to use from hour
      var index;
      
      // create div for row
      var $rowDiv = $('<div>');
      $rowDiv.addClass('row');
      $rowDiv.addClass('tableRow');
      $rowDiv.attr('hour-index',hour);
    
      // create column
      var $col2TimeDiv = $('<div>');
      $col2TimeDiv.addClass('col-md-2');
    
      // create timeBox element (contains time)
      var $timeBox = $('<span>');
      // can use this to get value
      $timeBox.attr('class','timeBox');
      
      // format hours for display
      var displayHour = 0;
      var dayNight = "";
      if (hour > 12) { 
        displayHour = hour - 12;
        dayNight = "pm";
      } else {
        displayHour = hour;
        dayNight = "am";
      }
      
    
     $timeBox.text(`${displayHour} ${dayNight}`);
  
      // insert into col inset into timebox
      $rowDiv.append($col2TimeDiv);
      $col2TimeDiv.append($timeBox);
      // STOP building Time box portion of row
  
      // START building input portion of row
      // build row components
      var $dailyPlanSpn = $('<input>');
  
      $dailyPlanSpn.attr('id',`input-${index}`);
      $dailyPlanSpn.attr('hour-index',index);
      $dailyPlanSpn.attr('type','text');
      $dailyPlanSpn.attr('class','dailyPlan');
  
      // access index from data array for hour 
      $dailyPlanSpn.val( planTextArr[index] );
      
      // create col to control width
      var $col9IptDiv = $('<div>');
      $col9IptDiv.addClass('col-md-9');
  
      // add col width and row component to row
      $rowDiv.append($col9IptDiv);
      $col9IptDiv.append($dailyPlanSpn);
      // STOP building Time box portion of row
  
      // create col
      var $col1SaveDiv = $('<div>');
      $col1SaveDiv.addClass('col-md-1');
  
      var $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"far fa-save saveIcon");
      
      // add col width and row component to row
      $rowDiv.append($col1SaveDiv);
      $col1SaveDiv.append($saveBtn);
      
  
      // set row color based on time
      updateRowColor($rowDiv, hour);
      
      // add row to planner container
      $plannerDiv.append($rowDiv);
    };
  
    // function to update row color
    function updateRowColor ($hourRow,hour) { 
  
      if (time) { console.log("rowColor ",nowHour24, hour); }
  
      if ( hour < nowHour24) {
        // add class for past, future ans present
        if (time) { console.log("lessThan"); }
        $hourRow.addClass("past")
       } else if ( hour > nowHour24) {
        if (time){ 
            console.log("greaterthan");
            }
          $hourRow.addClass("future")
    
      } else {
        if (time) { console.log("eqaul"); }
        $hourRow.addClass("present")
        
      }
    };
  
    // saves to local storage
    // conclick function 
    $(document).on('click','i', function(event) {
      event.preventDefault();  
  
      if (time) { console.log('click pta before '+ planTextArr); }
  
      var $index = $(this).attr('save-id');
  
      var inputId = '#input-'+$index;
      var $value = $(inputId).val();
  
      planTextArr[$index] = $value;
  
  
      if (time) { console.log('value ', $value); }
      if (time) { console.log('index ', $index); }
      if (time) { console.log('click pta after '+ planTextArr); }
  
      // remove shawdow pulse class
      $(`#saveid-${$index}`).removeClass('shadowPulse');
      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });  
    
    // function to color save button on change of input
    $(document).on('change','input', function(event) {
      event.preventDefault();  
      if (time) { console.log('onChange'); }
      if (time) { console.log('id', $(this).attr('hour-index')); }
  
      // neeed to check for save button
  
      var i = $(this).attr('hour-index');
  
      // add shawdowPulse class
      $(`#saveid-${i}`).addClass('shadowPulse');
    });
  });
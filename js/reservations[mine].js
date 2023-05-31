////console.log("reservations.js");

  let purchaseWindow = document.getElementById("purchase-window");

  let screen1 = document.getElementById("screen-1");
  let screen2 = document.getElementById("screen-2");
  let screen3 = document.getElementById("screen-3");

  let screenHeader = document.getElementsByClassName("screen-header");
  let screenFooter = document.getElementsByClassName("screen-footer");

  let adultPrice = document.getElementById("adult-price");
  let youthPrice = document.getElementById("youth-price");
  let childPrice = document.getElementById("child-price");
  let lapChildPrice = document.getElementById("lap-child-price");
  let transportationPrice = document.getElementById("transportation-price");

  let earlyTransportation = document.getElementById("early-transportation");

  let datePicker = document.getElementById("dateInput");

  var el;
  var element;

  var adultPriceInput = document.getElementById("package-number-input1");
  var youthPriceInput = document.getElementById("package-number-input2");
  var childPriceInput = document.getElementById("package-number-input3");
  var lapChildPriceInput = document.getElementById("package-number-input4");

  var transportationInput = document.getElementById("transportation-spinner");
  var earlyTransportationInput;

  let participants = document.getElementById("participants");

//======================================================================////======================================================================//

//======================================================================////======================================================================//

  function setscreen1(arg){
    packageObject = arg;
    var element = arg;
    //console.log(arg);

    screen2.className = "";
    idToggle("screen-1","active");

    var templateTitle = "<header>" + element.title + "</header>";
    screenHeader[0].innerHTML += templateTitle;

//======================================================================//Datepicker//======================================================================//
    var dateToday = new Date();
    // list of specific disabled dates //
    disabledDates = element.disabled_date;
    for (var i = 0; i < disabledDates.length; i++) {
      disabledDates[i] = disabledDates[i].replace(/\//g, '-');
    };
    $("#datepicker").datepicker({
      minDate: dateToday,// dates before current day disabled //
      beforeShowDay: function(date){ // disables dates based on disabledDates
      var disabledDatesString = jQuery.datepicker.formatDate('mm-dd-yy', date);
      return [ disabledDates.indexOf(disabledDatesString) == -1 ]
    }
    });

    $("#dateInput").attr("name","" + element.datepicker_id + "");

    if (localStorage.getItem("" + $('#dateInput').attr('name') + "")){

      $("#dateInput").prop('value',localStorage.getItem(element.datepicker_id)).trigger('change');
      $("#datepicker").datepicker('setDate',$("#dateInput").val());

    }else if(element.dateSelected !== "" && element.dateSelected !== " " ){

      var $date = element.dateSelected;
      $("#dateInput").prop('value',$date).trigger('change');
      $("#datepicker").datepicker('setDate',$date);

    }else{

        $('.ui-datepicker-current-day').removeClass('ui-datepicker-current-day');
        $('#dateInput').val('');
        $('#datepicker').val('');
    };

    $("#dateInput").change(function(){
      $("#datepicker").datepicker('setDate',$(this).val()).trigger('change');
    });

    $("#datepicker").change(function(){
      if ($("#dateInput").val() !== disabledDates) {
        $("#dateInput").prop('value',$(this).val());
        localStorage.setItem("" + $('#dateInput').attr('name') + "","" + $('#dateInput').val() + "");
        //console.log(localStorage.getItem("" + $('#dateInput').attr('name') + ""));
      };
    });
//======================================================================////======================================================================//
    let _dateError = document.getElementsByClassName('date-error')[0];
    let _datePick = document.getElementById("datepicker");
    let _dateInpt = document.getElementById("dateInput");

    _datePick.onchange = function(){
      console.log("CHANGE")
      if(_dateInpt.value.trim().length === 0){
        _dateError.className = "date-error";
        console.log(this.value);
      }else{
        _dateError.className = "date-error hidden";
      }
    };

    screenFooter[0].innerHTML += '<button type="button" id="screen1btn" class="yellow-button">continue</button>';
        document.getElementById("screen1btn").addEventListener("click",function(){
          if(datePicker.value.trim().length === 0 || datePicker.value === null || datePicker.value === undefined){
            _dateError.className = "date-error";
          }else{
            _dateError.className = "date-error hidden";
            setscreen2(element);
          }
        });
  };

//======================================================================////======================================================================//
//======================================================================////======================================================================//

var numberPlus = document.getElementsByClassName("numberPlus"),
    numberMinus = document.getElementsByClassName("numberMinus"),
    numberInput;

// input values are not strings or numbers, they are input
  function numIncrement(numberInput, increase){

    var myInputObject = document.getElementById(numberInput);

    if (increase) {

      myInputObject.value++;
      localStorage.setItem("" + myInputObject.getAttribute("name") + "",myInputObject.value);
      //console.log(localStorage.getItem("" + myInputObject.getAttribute("name") + ""));

    }else{

      myInputObject.value--;
      localStorage.setItem("" + myInputObject.getAttribute("name") + "",myInputObject.value);
      //console.log(localStorage.getItem("" + myInputObject.getAttribute("name") + ""));

    };

    if (myInputObject.value > 999) {
      myInputObject.value = 999;
    };
    if(myInputObject.value <= 0){
      myInputObject.value = 0;
    };
  };

//======================================================================////======================================================================//
//======================================================================////======================================================================//

var termsCheck;
var participantInput;
var packageObject;

function setscreen2(arg){
    let el = arg;
    packageObject = el;
    screen1.className = "";

    idToggle("screen-2","active");
    for (var i = 0; i < screenHeader.length; i++) {
      screenHeader[i].innerHTML = "";
    };
    for (var i = 0; i < screenFooter.length; i++) {
      screenFooter[i].innerHTML = "";
    };

    screenHeader[1].innerHTML += "<header>" + el.title + "</header>";
    adultPrice.innerHTML = "<span>" + el.adult_price + "</span>";
    youthPrice.innerHTML = "<span>" + el.youth_price + "</span>";
    childPrice.innerHTML = "<span>" + el.child_price + "</span>";
    lapChildPrice.innerHTML = "<span>" + el.lap_child_price + "</span>";

    transportationPrice.innerHTML = "<span>" + el.transportation_price + "</span>";

    adultPriceInput.setAttribute("name","" + el.adult_price_id + "");
    youthPriceInput.setAttribute("name","" + el.youth_price_id + "");
    childPriceInput.setAttribute("name","" + el.child_price_id + "");
    lapChildPriceInput.setAttribute("name","" + el.lap_child_id + "");

    transportationInput.setAttribute("name","" + el.package_transportation + "");

    var hasEarly = el.has_early_pickup;

    var transportationInputName;
    var earlyTransportationName;

    if(hasEarly === true){
      earlyTransportation.innerHTML += "<span>Need early transportation?</span>"
      earlyTransportationInput = document.createElement("input");
      earlyTransportationInput.setAttribute("type","checkbox");
      earlyTransportationInput.setAttribute("name","" + el.early_pickup_package + "");
      earlyTransportation.appendChild(earlyTransportationInput);

      var transportationInputName = transportationInput.getAttribute("name");
      var earlyTransportationName = earlyTransportation.getAttribute("name");

      if (hasEarly === true && !localStorage.getItem(earlyTransportationName)) {
        //console.log("JSON checkbox ",el.early_pickup_checked);
        earlyTransportationInput.checked = el.early_pickup_checked;
        earlyTransportationInput.value = el.early_pickup_checked;
      }else if(localStorage.getItem(earlyTransportationName)){
        //console.log("local storage checkbox ",el.early_pickup_checked);
        earlyTransportationInput.checked = JSON.parse(localStorage.getItem(earlyTransportationName));
        earlyTransportationInput.value = JSON.parse(localStorage.getItem(earlyTransportationName));
      }else{
        //console.log("blank checkbox ",el.early_pickup_checked);
        earlyTransportationInput.checked = false;
        earlyTransportationInput.value = false;
      };
      earlyTransportationInput.onclick = function(){
        if(earlyTransportationInput.checked === true){
          earlyTransportationInput.value = true;
          localStorage.setItem(earlyTransportationName,true);
        }else{
          earlyTransportationInput.value = false;
          localStorage.setItem(earlyTransportationName,false);
        };
      };
    }else{
      hasEarly = false;
    };

    var $adultInputName = adultPriceInput.getAttribute("name");
    var $youthInputName = youthPriceInput.getAttribute("name");
    var $childInputName = childPriceInput.getAttribute("name");
    var $lapChildInputName = lapChildPriceInput.getAttribute("name");

    // adultPriceInput.value = 0;
    // youthPriceInput.value = 0;
    // childPriceInput.value = 0;
    // lapChildPriceInput.value = 0;
    //
    // transportationInput.value = 0;
    // earlyTransportationInput.value = false;

    if(el.lap_child_quantity  > 0 && el.lap_child_quantity !== 0 && !localStorage.getItem("" + $lapChildInputName + "")){
      lapChildPriceInput.value = el.lap_child_quantity;
    }else if(localStorage.getItem("" + $lapChildInputName + "") ){
      lapChildPriceInput.value = localStorage.getItem("" + $lapChildInputName + "");
    }else{
      lapChildPriceInput.value = 0;
    };
    if(el.adult_price_quantity > 0 && el.adult_price_quantity !== 0 && !localStorage.getItem("" + $adultInputName + "")){
      adultPriceInput.value = el.adult_price_quantity;
    }else if(localStorage.getItem("" + $adultInputName + "") ){
      adultPriceInput.value = localStorage.getItem("" + $adultInputName + "");
    }else{
      adultPriceInput.value = 0;
    };

    if(el.youth_price_quantity.length > 0 && el.youth_price_quantity !== 0 && !localStorage.getItem("" + $youthInputName + "")){
      youthPriceInput.value = el.youth_price_quantity;
    }else if(localStorage.getItem("" + $youthInputName + "") ){
      youthPriceInput.value = localStorage.getItem("" + $youthInputName + "");
      //console.log(localStorage.getItem("" + $youthInputName + ""));
    }else{
      youthPriceInput.value = 0;
    };

    if(el.child_price_quantity  > 0 && el.child_price_quantity !== 0 && !localStorage.getItem("" + $childInputName + "")){
      childPriceInput.value = el.child_price_quantity;
    }else if(localStorage.getItem("" + $childInputName + "") ){
      childPriceInput.value = localStorage.getItem("" + $childInputName + "");
      //console.log(localStorage.getItem("" + $childInputName + ""));
    }else{
      childPriceInput.value = 0;
    };

    if(el.transportation_seats !== false && el.transportation_seats > 0 && el.transportation_seats !== 0 && !localStorage.getItem("" + transportationInputName + "")){
      transportationInput.value = el.transportation_seats;
    }else if(localStorage.getItem("" + transportationInputName + "") ){
      transportationInput.value = localStorage.getItem("" + transportationInputName + "");
    }else{
      transportationInputName.value = 0;
    };

//======================================================================////======================================================================//
//======================================================================////======================================================================//

    let participants = document.getElementById("participants");
    participantInput = document.createElement("input");
    participantInput.setAttribute("class","participant-input");
    participantInput.setAttribute("name",el.participant_input_name);
    participantInput.setAttribute("placeholder","participants names & ages");
    participants.appendChild(participantInput);

    if(el.participantNamesAges.length > 0 && el.participantNamesAges.length !== 0 && !localStorage.getItem("" + el.participant_input_name + "")){
      participantInput.setAttribute("value",el.participantNamesAges);
      participantInput.innerText = el.participantNamesAges;
    }else if(localStorage.getItem("" + el.participant_input_name + "")){
      participantInput.value = localStorage.getItem("" + el.participant_input_name + "");
      participantInput.innerText = localStorage.getItem("" + el.participant_input_name + "");
    }else{
      participantInput.value = '';
    };

    screenFooter[1].innerHTML += '<div id="terms-conditions">' + '<input type="checkbox" id="terms-check">' + '<p>by checking this I acknowledge I have read the <a href="privacy.html" target="_blank">privacy policy</a></p>' + '</div>'
    screenFooter[1].innerHTML += '<button type="button" id="screen2back" class="yellow-button">back</button>';
    screenFooter[1].innerHTML += '<button type="button" class="yellow-button" id="checkout" disabled/>checkout</a>';

    document.getElementById("screen2back").addEventListener("click",function(){
      localStorage.setItem("" + el.participant_input_name + "","" + participantInput.value + "");
      participants.innerHTML = "";
      earlyTransportation.innerHTML = "";
      setscreen1(el);
    });

    var $checkout = document.getElementById("checkout");

    document.getElementById("terms-check").addEventListener("change",function(){
      if(this.checked){
        $checkout.disabled = false;
      }else{
        $checkout.disabled = true;
      }
    })
  };

//======================================================================////======================================================================//
//======================================================================////======================================================================//

  function resetPurchaseUi(){

    idToggle("purchase-window","active");

    screen1.className = "";
    screen2.className = "";

    datePicker.setAttribute("name","");

    for (var i = 0; i < screenHeader.length; i++) {
      screenHeader[i].innerHTML = "";
    };
    for (var i = 0; i < screenFooter.length; i++) {
      screenFooter[i].innerHTML = "";
    };

    localStorage.setItem(packageObject.lap_child_id,lapChildPriceInput.value);
    localStorage.setItem(packageObject.adult_price_id,adultPriceInput.value);
    localStorage.setItem(packageObject.youth_price_id,youthPriceInput.value);
    localStorage.setItem(packageObject.child_price_id,childPriceInput.value);

    localStorage.setItem(packageObject.package_transportation,transportationInput.value);

    let earlyPickup = packageObject.has_early_pickup;

    if(earlyPickup === true){
      localStorage.setItem(packageObject.early_pickup_package,earlyTransportationInput.checked);
      earlyTransportation.innerHTML = "";
    }
    //console.log(localStorage.getItem,packageObject.package_transportation);

    var numberSpinner = document.getElementsByClassName("numberSpinnerInput");

    for (var i = 0; i < numberSpinner.length; i++) {
      numberSpinner[i].value = 0;
    };
    $("#dateInput").attr('value','');
    $("#datepicker").datepicker( "destroy" );

    if(participantInput !== undefined){
      localStorage.setItem("" + packageObject.participant_input_name + "","" + participantInput.value + "");
      //console.log(localStorage.getItem("" + packageObject.participant_input_name + ""));
      participants.innerHTML = "";
    };
  };

//======================================================================////======================================================================//
//======================================================================////======================================================================//

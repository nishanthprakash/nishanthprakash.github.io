// initialize ourselves when the page is
// finished loading
window.onload = initialize;

/** Our function that initializes when the page    
  is finished loading. */
function initialize() {   
	// initialize the DHTML History framework   	

	dhtmlHistory.initialize();      

	// add ourselves as a DHTML History listener   
	dhtmlHistory.addListener(handleHistoryChange);   

	// subscribe to mouse clicks on the menu   
	var menu = document.getElementById("ta");   

	if (typeof window.attachEvent != "undefined") {      
		// Internet Explorer      
		menu.attachEvent("onclick", handleMouseClick);   
	}   
	
	else { 
		// W3C standards      
		menu.addEventListener("click", handleMouseClick, false);   
	}   

	// determine what our initial location is   
	// by retrieving it from the browser's  
	// location after the hash  
	var currentLocation =  dhtmlHistory.getCurrentLocation();         

	// if there is no location then display   
	// the default, which is the inbox   
	if (currentLocation == "") {
		currentLocation = "section:ab";  
	}      

	// extract the section to display from   
	// the initial location    
	currentLocation = currentLocation.replace(/section\:/, "");
	// display this initial location   
	displayLocation(currentLocation, null);
}
	
/** Handles history change events. */
function handleHistoryChange(newLocation, historyData) {

	alert(newLocation);

   // if there is no location then display   
   // the default, which is the inbox   
	if (newLocation == "") {      
		newLocation = "section:ab";   
	}      
	
	// extract the section to display from   
	// the location change; newLocation will   
	// begin with the word "section:"   
	newLocation = newLocation.replace(/section\:/, "");      
	
	// update the browser to respond to this   
	// DHTML history change   
	displayLocation(newLocation, historyData);
}
	
/** Displays the given location in the   
 right-hand side content area. */
function displayLocation(newLocation, sectionData) {
	javascript:makeGetRequest(newLocation)
}

/** Responds to mouse clicks on the left-hand
    side menu area. */
function handleMouseClick(e) {  

	// normalize events   
	var evt;   
	
	if (typeof window.event != "undefined") // IE     
		evt = window.event;   
	else // W3C     
		evt = e;         
		
	// normalize event target   	
	var target;
	
	if (typeof evt.srcElement != "undefined")  // IE     
		target = evt.srcElement;   
	else // W3C      
		target = evt.target;         
	 
	// get the location the user clicked on    
	 var newLocation = target.id;   
	
	// Register a history event so this action   
	// gets recorded in the browser; Internet   
	// Explorer has a bug that prevents us   
	// from setting a location value if there   
	// are ANY HTML elements in the document that   
	// have the same ID already. For example,   
	// if we tell dhtmlHistory to add the location   
	// 'inbox' to our browser's history, and there   
	// is an element in the document with the ID   
	// 'inbox', then Internet Explorer will    
	// misbehave. We must accomodate this problem   
	// in IE by changing the location so it does   
	// not match a pre-existing HTML id   
	var modifiedLocation = "section:" + newLocation;   
	var historyData = "X";

	//not using history data      
	dhtmlHistory.add(modifiedLocation, historyData);      

	// display this location   
	displayLocation(newLocation, null);
}
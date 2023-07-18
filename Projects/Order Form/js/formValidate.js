/******f**********
    
    Assignment 6 Javascript
    Name: Hriday Bedi
    Date: 2020 April 1st
    Description: Order Form Validation

*****************/

const itemDescription = ["MacBook", "The Razer", "WD My Passport", "Nexus 7", "DD-45 Drums"];
const itemPrice = [1899.99, 79.99, 179.99, 249.99, 119.99];
const itemImage = ["mac.png", "mouse.png", "wdehd.png", "nexus.png", "drums.png"];
let numberOfItemsInCart = 0;
let orderTotal = 0;

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e)
{
	hideErrors();
	//Validating the number if items in the user's shopping cart.
	if (formHasErrors()){
		e.preventDefault();
		
		return false;
	}
	//return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e)
{
	// Confirm that the user wants to reset the form.
	if ( confirm('Clear order?') )
	{
		// Ensure all error fields are hidden
		hideErrors();
		
		// Set focus to the first text field on the page
		document.getElementById("qty1").focus();
		
		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();
	
	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;	
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors()
{
	let errorFlag = false;

	if (numberOfItemsInCart == 0) {
		window.alert("You have no items in your cart.");
		if (!errorFlag) {
				document.getElementById("qty1").focus();
				document.getElementById("qty1").select();
		}
		errorFlag = true;
	}

	let necessaryFields = ["fullname", "address", "city", "postal", "email", "cardname", "cardnumber"];

	for (let i = 0; i < necessaryFields.length; i++) {
		const individualField = document.getElementById(necessaryFields[i]);
		
		if (individualField.value == null || trim(individualField.value) == "") {
			
			document.getElementById(necessaryFields[i]+"_error").style.display = "block";
				
			errorFlag = true;
		}

	}
	//validating postal and email.
	//////////////////////////////////////////////////////////////////
	let regex = new RegExp(/[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d/);
	let postal = document.getElementById("postal").value;

	if(!regex.test(postal)){
		document.getElementById("postal_error").style.display = "block";

		if (!errorFlag) {
			document.getElementById("postal").focus();
			document.getElementById("postal").select();
			
		}
		errorFlag = true;
	}

	let regexTwo = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	let email = document.getElementById("email").value;

	if (!regexTwo.test(email)) {
		document.getElementById("email_error").style.display = "block";

		if (!errorFlag) {
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}
		errorFlag = true;
	}
	//////////////////////////////////////////////////////////////////


	//Validating the radio buttons. 
	///////////////////////////////////////////////////////////////////////////////////
	let cardType = ["visa", "amex", "mastercard"];

	let cardChk = false;
	
	for(let i = 0; i < cardType.length && !cardChk; i++){
		if(document.getElementById(cardType[i]).checked){
			cardChk = true;
			
		}
	}

	if(!cardChk){
		document.getElementById("cardtype_error").style.display = "block";

		if (!errorFlag) {
			document.getElementById("visa").focus();
			document.getElementById("visa").select();
		}

		errorFlag = true;
	}
	///////////////////////////////////////////////////////////////////////////////////

	//Card Info Validation
	//////////////////////////////////////////////////////////////////////////////////
	let select = document.getElementById("month");
	if (!(select.value >= 1 && select.value <= 12 )) {
		document.getElementById("month_error").style.display = "block";
		return true;
		
	}

	let Yearselect = document.getElementById("year");

	 if(select.value <= 4 && Yearselect.value == 2020){
		document.getElementById("expiry_error").style.display = "block";
		errorFlag = true;
	 }

	//Card Number Validation
	//////////////////////////////////////////////////////////////////////////////////
	let cardNumber = document.getElementById("cardnumber");
	let checkingFactor = 432765432;

	if(cardNumber.value.length < 10 && cardNumber.value.length > 1 ){
		//window.alert("size matters");
		document.getElementById("invalidcard_error").style.display = "block";

		if (!errorFlag) {
			document.getElementById("cardnumber").focus();
			document.getElementById("cardnumber").select();
		}

		errorFlag = true;
	}

	const arrayOfNumbers = Array.from(String(checkingFactor), Number);

	let cardNum = document.getElementById("cardnumber").value;
	const arrayOfDigits = Array.from(String(cardNum), Number);

	//numbers = checking factor
	//digits = user shit arrayOfDigits[0]
	
	let result = ((arrayOfNumbers[0] * arrayOfDigits[0]) + (arrayOfNumbers[1] * arrayOfDigits[1]) + 
	(arrayOfNumbers[2] * arrayOfDigits[2]) + (arrayOfNumbers[3] * arrayOfDigits[3]) + (arrayOfNumbers[4] * arrayOfDigits[4]) + 
	(arrayOfNumbers[5] * arrayOfDigits[5]) + (arrayOfNumbers[6] * arrayOfDigits[6]) + (arrayOfNumbers[7] * arrayOfDigits[7]) + 
	(arrayOfNumbers[8] * arrayOfDigits[8]));

	let addlogic = (11- (result%11));

	//console.log(result);
	//console.log(addlogic);
	//console.log(addlogic == arrayOfDigits[9]);
	//console.log(arrayOfNumbers[8]);
	/*
	if(!(addlogic == arrayOfDigits[9])){
		document.getElementById("invalidcard_error").style.display = "block";

		if (!errorFlag) {
			document.getElementById("cardnumber").focus();
			document.getElementById("cardnumber").select();
		}	
		errorFlag = true;
		
	}
	*/
	return errorFlag;
}

//checks if the field is empty or not
function formFieldEmpty(element){
	if(element.value == null || trim(field.value)==""){
		return true;
	}
	else
	return false;
}

/*
 * Adds an item to the cart and hides the quantity and add button for the product being ordered.
 *
 * param itemNumber The number used in the id of the quantity, item and remove button elements.
 */
function addItemToCart(itemNumber)
{
	// Get the value of the quantity field for the add button that was clicked 
	let quantityValue = trim(document.getElementById("qty" + itemNumber).value);

	// Determine if the quantity value is valid
	if ( !isNaN(quantityValue) && quantityValue != "" && quantityValue != null && quantityValue != 0 && !document.getElementById("cartItem" + itemNumber) )
	{
		// Hide the parent of the quantity field being evaluated
		document.getElementById("qty" + itemNumber).parentNode.style.visibility = "hidden";

		// Determine if there are no items in the car
		if ( numberOfItemsInCart == 0 )
		{
			// Hide the no items in cart list item 
			document.getElementById("noItems").style.display = "none";
		}

		// Create the image for the cart item
		let cartItemImage = document.createElement("img");
		cartItemImage.src = "images/" + itemImage[itemNumber - 1];
		cartItemImage.alt = itemDescription[itemNumber - 1];

		// Create the span element containing the item description
		let cartItemDescription = document.createElement("span");
		cartItemDescription.innerHTML = itemDescription[itemNumber - 1];

		// Create the span element containing the quanitity to order
		let cartItemQuanity = document.createElement("span");
		cartItemQuanity.innerHTML = quantityValue;

		// Calculate the subtotal of the item ordered
		let itemTotal = quantityValue * itemPrice[itemNumber - 1];

		// Create the span element containing the subtotal of the item ordered
		let cartItemTotal = document.createElement("span");
		cartItemTotal.innerHTML = formatCurrency(itemTotal);

		// Create the remove button for the cart item
		let cartItemRemoveButton = document.createElement("button");
		cartItemRemoveButton.setAttribute("id", "removeItem" + itemNumber);
		cartItemRemoveButton.setAttribute("type", "button");
		cartItemRemoveButton.innerHTML = "Remove";
		cartItemRemoveButton.addEventListener("click",
			// Annonymous function for the click event of a cart item remove button
			function()
			{
				// Removes the buttons grandparent (li) from the cart list
				this.parentNode.parentNode.removeChild(this.parentNode);

				// Deteremine the quantity field id for the item being removed from the cart by
				// getting the number at the end of the remove button's id
				let itemQuantityFieldId = "qty" + this.id.charAt(this.id.length - 1);

				// Get a reference to quanitity field of the item being removed form the cart
				let itemQuantityField = document.getElementById(itemQuantityFieldId);
				
				// Set the visibility of the quantity field's parent (div) to visible
				itemQuantityField.parentNode.style.visibility = "visible";

				// Initialize the quantity field value
				itemQuantityField.value = "";

				// Decrement the number of items in the cart
				numberOfItemsInCart--;

				// Decrement the order total
				orderTotal -= itemTotal;

				// Update the total purchase in the cart
				document.getElementById("cartTotal").innerHTML = formatCurrency(orderTotal);

				// Determine if there are no items in the car
				if ( numberOfItemsInCart == 0 )
				{
					// Show the no items in cart list item 
					document.getElementById("noItems").style.display = "block";
				}				
			}, 
			false
		);

		// Create a div used to clear the floats
		let cartClearDiv = document.createElement("div");
		cartClearDiv.setAttribute("class", "clear");

		// Create the paragraph which contains the cart item summary elements
		let cartItemParagraph = document.createElement("p");
		cartItemParagraph.appendChild(cartItemImage);
		cartItemParagraph.appendChild(cartItemDescription);
		cartItemParagraph.appendChild(document.createElement("br"));
		cartItemParagraph.appendChild(document.createTextNode("Quantity: "));
		cartItemParagraph.appendChild(cartItemQuanity);
		cartItemParagraph.appendChild(document.createElement("br"));
		cartItemParagraph.appendChild(document.createTextNode("Total: "));
		cartItemParagraph.appendChild(cartItemTotal);		

		// Create the cart list item and add the elements within it
		let cartItem = document.createElement("li");
		cartItem.setAttribute("id", "cartItem" + itemNumber);
		cartItem.appendChild(cartItemParagraph);
		cartItem.appendChild(cartItemRemoveButton);
		cartItem.appendChild(cartClearDiv);

		// Add the cart list item to the top of the list
		let cart = document.getElementById("cart");
		cart.insertBefore(cartItem, cart.childNodes[0]);

		// Increment the number of items in the cart
		numberOfItemsInCart++;

		// Increment the total purchase amount
		orderTotal += itemTotal;

		// Update the total puchase amount in the cart
		document.getElementById("cartTotal").innerHTML = formatCurrency(orderTotal);
	}		
}

/*
 * Hides all of the error elements.
 */
function hideErrors()
{
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for ( let i = 0; i < error.length; i++ )
	{
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the load event of the document.
 */
function load()
{
	hideErrors();
	//	Populate the year select with up to date values
	let year = document.getElementById("year");
	let currentDate = new Date();
	for(let i = 0; i < 7; i++){
		let newYearOption = document.createElement("option");
		newYearOption.value = currentDate.getFullYear() + i;
		newYearOption.innerHTML = currentDate.getFullYear() + i;
		year.appendChild(newYearOption);
	}
	
	//Adding event listeners for Submit button!
	document.getElementById("orderform").addEventListener("submit", validate, false);

	//Adding event listeners for Reset+ button!
	document.getElementById("orderform").addEventListener("reset", resetForm, false);

	//Adding Event Listeners for each button.
	//For macbook
	//document.getElementById("addMac").addEventListener("click", addItemToCart(), 1);

	document.getElementById("addMac").addEventListener("click", function(){
		addItemToCart(1);
	});

	//For Razer Mouse
	document.getElementById("addMouse").addEventListener("click", function(){
		addItemToCart(2);
	});

	//For HDD
	document.getElementById("addWD").addEventListener("click", function(){
		addItemToCart(3);
	});

	//For Nexus
	document.getElementById("addNexus").addEventListener("click", function(){
		addItemToCart(4);
	});
	//For Drums
	document.getElementById("addDrums").addEventListener("click", function(){
		addItemToCart(5);
	});
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);
//





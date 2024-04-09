// Get references to error message elements, form, checkbox, and email regex
let imageErrorMessage = document.getElementById("imageError");
let typeErrorMessage = document.getElementById("typeError");
let priceErrorMessage = document.getElementById("priceError"); 
let descriptionErrorMessage = document.getElementById("descriptionError"); 
let locationErrorMessage = document.getElementById("locationError"); 
let squreErrorMessage = document.getElementById("squreError"); 
let bedErrorMessage = document.getElementById("bedError"); 
let bathErrorMessage = document.getElementById("bathError"); 
let addPropertyHouse = document.getElementById("propertyHouseForm");




// Add event listener to form submission 
addPropertyHouse.addEventListener("submit", function(e){
    e.preventDefault(); // Prevent default form submission behavior
    // Reset error messages
    imageErrorMessage.innerText = "";
    typeErrorMessage.innerText = "";
    priceErrorMessage.innerText = "";
    descriptionErrorMessage.innerText = "";
    locationErrorMessage.innerText = "";
    squreErrorMessage.innerText = "";
    bedErrorMessage.innerText = "";
    bathErrorMessage.innerText = "";


    // Retrieve  values
    let type = document.getElementById("type").value;
    let price = document.getElementById("price").value;
    let description = document.getElementById("description").value;
    let location = document.getElementById("location").value;
    let squre = document.getElementById("squre").value;
    let bed = document.getElementById("bed").value;
    let bath = document.getElementById("bath").value;
 

    if (type === "" || price === "" || description === "" || location === "" || squre === "" || bed === "" || bath === "") {
      imageErrorMessage.innerText = "image is required";
      typeErrorMessage.innerText = "property type  is required";
      priceErrorMessage.innerText = "price is required";    
      descriptionErrorMessage.innerText = "Description is required";    
      locationErrorMessage.innerText = "location is required";    
      squreErrorMessage.innerText = "square is required";   
      bathErrorMessage.innerText = "bath is required";     
      bedErrorMessage.innerText = "bed is required";    
      return; // Exit function if any field is empty
  }


    // If all validations pass, log the input values
    console.log(type , price, description, location, squre, bath,bed);
});


// API
const houseApi = "https://propertyhub-mywm.onrender.com/houses";

// DOM elements
let houseContainer = document.getElementById("root")
const form = document.getElementById("propertyHouseForm" );
const editFormContainer = document.getElementById("editformcontainer");



// fetch all houses
const fetchData = () => {
    return fetch(houseApi)
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error fetching houses:", error);
      });
};
  



// creating the card for houses
  function createHouseCard(house) {
    return `
    <div class="property-item-container">
 
        <div class="property-item">
            <div class="property-image-container">
             <a class="btn" href="#HouseByIdmodal">
              <img  onClick="houseById(${house.id})" class="property-image" src=${house.img} alt="">
              </a>
            </div>
            <div class="property-info">
               <h3 class="type-label">${house.prototype}</h3>
                <h5 class="price">${house.price}</h5>
                <a class="title" href="#">${house.description}</a>
                <p class="location"><span class="icon-location">${house.location}</span></p>
            </div>
            <div class="property-details">
                <small class="detail-item"><div><i class="fa fa-ruler-combined text-primary me-2"></i></div><span>${house.sqft}</span></small>
                <small class="detail-item"><div><i class="fa fa-bed text-primary me-2"></i></div><span>${house.bed}</span></small>
                <small class="detail-item no-border"><div><i class="fa fa-bath text-primary me-2"></i></div><span>${house.bath}</span></small>
            </div>
            <div class="edit-delete-div">
                <div class="edit-delete">
                
               <div class="edit">
                  <a class="btn" href="#editHousemodal">
                     <i onClick="editDta(${house.id})" class="fa fa-solid fa-pen"></i>
                   </a>
                </div>
            
            
                    <div class="delete" ><i onClick="deleteHouse(${house.id})" class="fa fa-solid fa-trash"></i></div>
                </div>
            </div>
        </div>

    </div>
    `;
}


// function getting and mapping the data
async function paintHouses() {
  try {
      const houses = await fetchData();
      let cards = houses.map(house => createHouseCard(house)).join(" ");
      houseContainer.innerHTML = cards;
  } catch (error) {
      console.error("Error fetching houses:", error);
  }
}

paintHouses();




// getting houses by their ids
const houseById = async (id) => {
  const houseElement = document.getElementById("house-details");

  const fetchDataById = async () => {
    try {
      const res = await fetch(`${houseApi}/${id}`);
      return res.json();
    } catch (error) {
      console.error("Error fetching house data:", error);
    }
  };

  try {
    const house = await fetchDataById();

    // Display the fetched house data
    houseElement.innerHTML = `
      <h4 style="text-align: center">House Id : ${house.id}</h4> 
      <img style="width:500px; hight:500px; text-align: center;" src=${house.img} />
      <div class="property-details">
        <p style="font-size: 15px;" class="tagid detail-item" >Name: ${house.name}</p>
        <p style="font-size: 15px;" class="id detail-item">Price: ${house.price}</p>
        <p style="font-size: 15px;" class="id detail-item">Location: ${house.location}</p>
      </div>
      <p style="font-size: 15px; text-align: center; padding-top: 20px;padding-bottom: 20px" " class="description-id">Description: ${house.description}</p>

      <div class="property-details">
        <small class="detail-item"><div><i class="fa fa-ruler-combined text-primary me-2"></i></div><span>${house.sqft}</span></small>
        <small class="detail-item"><div><i class="fa fa-bed text-primary me-2"></i></div><span>${house.bed}</span></small>
        <small class="detail-item no-border"><div><i class="fa fa-bath text-primary me-2"></i></div><span>${house.bath}</span></small>
      </div>
      <!-- Add other house details here -->
    `;
  } catch (error) {
    console.error("Error fetching house data:", error);
  }
};




// house creating house
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const houseMessageDisplay = document.getElementById("displayMesageHouse");

  let image = document.getElementById("image").value.trim();
  let type = document.getElementById("type").value.trim();
  let price = document.getElementById("price").value.trim();
  let description = document.getElementById("description").value.trim();
  let sell = document.getElementById("rentingselling").value.trim();
  let location = document.getElementById("location").value.trim();
  let squre = document.getElementById("squre").value.trim();
  let bed = document.getElementById("bed").value.trim();
  let bath = document.getElementById("bath").value.trim();

  let imageErrorMessage = document.getElementById("imageError");
  let typeErrorMessage = document.getElementById("typeError");
  let priceErrorMessage = document.getElementById("priceError"); 
  let descriptionErrorMessage = document.getElementById("descriptionError"); 
  let sellErrorMessage = document.getElementById("sellingRentingError"); 
  let locationErrorMessage = document.getElementById("locationError"); 
  let squreErrorMessage = document.getElementById("squreError"); 
  let bedErrorMessage = document.getElementById("bedError"); 
  let bathErrorMessage = document.getElementById("bathError"); 

  imageErrorMessage.innerText = "";
  typeErrorMessage.innerText = "";
  priceErrorMessage.innerText = "";
  descriptionErrorMessage.innerText = "";
  sellErrorMessage.innerText = "";
  locationErrorMessage.innerText = "";
  squreErrorMessage.innerText = "";
  bedErrorMessage.innerText = "";
  bathErrorMessage.innerText = "";

  if (image === "" || type === "" || price === "" || description === "" || sell === "" || location === "" || squre === "" || bed === "" || bath === "") {
    imageErrorMessage.innerText = "Image is required";
    typeErrorMessage.innerText = "Property type is required";
    priceErrorMessage.innerText = "Price is required";    
    descriptionErrorMessage.innerText = "Description is required";   
    sellErrorMessage.innerText = "Selling | Renting is required";  
    locationErrorMessage.innerText = "Location is required";    
    squreErrorMessage.innerText = "Square footage is required";   
    bathErrorMessage.innerText = "Bath is required";     
    bedErrorMessage.innerText = "Bed is required";    
    return; // Exit function if any field is empty
  }

  let id = Math.floor(Math.random() * 100000);

  const data = {
    id: id, 
    img: image,
    prototype: type,
    price: price,
    description: description,
    sell: sell,
    location: location,
    sqft: squre,
    bed: bed,  
    bath: bath,
  };

  try {
    const response = await fetch(houseApi, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add house');
    }
  
    houseMessageDisplay.textContent = "House created Successfully";
    form.remove(); 
  
    paintHouses();
   
  } catch (error) {
    console.error('Error adding house:', error);
  }
  
});




// editing a house
const editDta = async (id) => {
  let createEditForm = document.createElement("form");
  const messageDisplay = document.getElementById("displayMesage");

  const fetchDataById = async () => {
    try {
      const res = await fetch(`${houseApi}/${id}`);
      return res.json();
    } catch (error) {
      console.error("Error fetching house data:", error);
    }
  };

  try {
    const house = await fetchDataById();

    createEditForm.innerHTML = `
    <form id="propertyHouseForm">
    <label for="">Image</label>
    <input type="text" id="image-edit" placeholder="image" class="form-field" value="${house.img}">
    <P id="imageError" style="color: red; margin-top: 0; margin-bottom: 10px;"></P>

    <label for="">Property Type</label>
    <select id="type-edit" class="form-field">
        <option value="">---select---</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="villa">Villa</option>
        <option value="building">Building</option>
    </select>
    <P id="typeError" style="color: red; margin-top: 0; margin-bottom: 10px;"></P>

    <label for="">Price</label>
    <input type="text" id="price-edit" placeholder="Price" class="form-field" value="${house.price}">
    <P id="priceError" style="color: red; margin-top: 0; margin-bottom: 10px;"></P>

    <label for="">Description</label>
    <input type="text" id="description-edit" placeholder="Description" class="form-field" value="${house.description}">
    <P id="descriptionError" style="color: red; margin-top: 0; margin-bottom: 10px;"></P>

    <label for="">Location</label>
    <input type="text" id="location-edit" placeholder="Location" class="form-field"value="${house.location}">
    <P id="locationError" style="color: red; margin-top: 0; margin-bottom: 10px;"></P>

    <label for="">Renting / Selling</label>
    <input type="text" id="renting-selling-edit" placeholder="selling / renting" class="form-field" value="${house.sell}">
    <P id="sellingRentingError" style="color: red; margin-top: 0; margin-bottom: 10px;"></P>

    <label for="">Square Foot</label>
    <input type="text" id="squre-edit" placeholder="Square Foot" class="form-field" value="${house.sqft}">
    <P id="squreError" style="color: red; margin-top: 0; margin-bottom: 10px;"></P>

    <label for="">Bed</label>
    <input type="text" id="bed-edit" placeholder="bed" class="form-field" value="${house.bed}">
    <P id="bedError" style="color: red; margin-top: 0; margin-bottom: 10px;"></P>

    <label for="">Bath</label>
    <input type="text" id="bath-edit" placeholder="Bath" class="form-field" value="${house.bath}">
    <P id="bathError" style="color: red; margin-top: 0; margin-bottom: 10px;"></P>
    <button type="submit" class="form-button">Edit</button>
  </form>
     `;

    editFormContainer.appendChild(createEditForm);

    createEditForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let image = document.getElementById("image-edit").value;
      let type = document.getElementById("type-edit").value;
      let price = document.getElementById("price-edit").value;
      let description = document.getElementById("description-edit").value;
      let sell = document.getElementById("renting-selling-edit").value;
      let location = document.getElementById("location-edit").value;
      let squre = document.getElementById("squre-edit").value;
      let bed = document.getElementById("bed-edit").value;
      let bath = document.getElementById("bath-edit").value;
  
      
      const newData = {
        img: image,
        prototype: type,
        price: price,
        description: description,
        sell:sell,
        location:location,
        sqft: squre,
        bed: bed,  
        bath: bath,
        };

      try {
        const response = await fetch(`${houseApi}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        });
        if (!response.ok) {
          throw new Error('Failed to update house data');
        }
        messageDisplay.textContent = "House Updated Successfully";
        createEditForm.remove();
       
          paintHouses()
    
      } catch (error) {
        console.error('Error updating house data:', error);
      }
    });
  } catch (error) {
    console.error("Error populating edit form:", error);
  }
};




// deleting houses
const deleteHouse = (id) => {
  fetch(`${houseApi}/${id}`, {
    method: "DELETE",
  })
  .then(() => {
    paintHouses()
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
}




document.addEventListener("DOMContentLoaded", () => { 
  paintHouses();

});









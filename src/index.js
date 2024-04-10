
// API
const houseApi = "http://localhost:3000/houses";

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



form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  let image = document.getElementById("image").value;
  let type = document.getElementById("type").value;
  let price = document.getElementById("price").value;
  let description = document.getElementById("description").value;
  let sell = document.getElementById("renting-selling").value;
  let location = document.getElementById("location").value;
  let squre = document.getElementById("squre").value;
  let bed = document.getElementById("bed").value;
  let bath = document.getElementById("bath").value;

  let id = Math.floor(Math.random() * 100000);

  const data = {
    id: id, 
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

    // Optionally handle success response here
    console.log('House added successfully');

  } catch (error) {
    console.error('Error adding house:', error);
  }
});




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












//     // Retrieve selected filter values
//     const propertyType = document.getElementById("propertyType").value;
//     const location = document.getElementById("location").value;
//     const price = document.getElementById("price").value;
//     const sellingRenting = document.getElementById("sellingRenting").value;

//     // Check if all filter values are set to '---select---'
//     if (propertyType === '---select---' && location === '---select---' && price === '---select---' && sellingRenting === '---select---') {
//         alert("You haven't chosen or filtered any house.");
//         return; // Exit the function without further processing
//     }

//     fetchData()
//     .then((houses) => {
//         // Filter houses based on selected values
//         const filteredHouses = houses.filter(house => {
//             return (house.prototype === propertyType) ||
//                    (house.location === location) ||
//                    (house.houseFor === sellingRenting) ||
//                    (parseFloat(house.price.replace('$', '').replace(',', '')) >= parseFloat(price)) 
//         });
//         console.log('filter',filteredHouses); // Check filtered houses

//         // Paint filtered houses
//         paintHouses(filteredHouses);
//     })
//     .catch((error) => {
//         console.error("Error fetching houses:", error);
//     });
// });



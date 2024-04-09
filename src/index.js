
// API
const houseApi = "https://propertyhub-mywm.onrender.com/houses";

// DOM elements
let houseContainer = document.getElementById("root")
let houseFilter = document.getElementById("filter-houses")

// fetch all houses
const fetchData = () => {
    return fetch(houseApi)
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error fetching houses:", error);
      });
  };
  

// card div for displaying houses 
function createHouseCard(house) {
    return `
    <div class="property-item-container">
        <div class="property-item">
            <div class="property-image-container">
               <img class="property-image" src=${house.img} alt="">
          
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
               <div class="edit"><i class="fa fa-solid fa-pen"></i></div>
               <div class="delete" ><i class="fa fa-solid fa-trash"></i></div>
            </div>
          </div>
        </div>
    </div>
    `;
}


// function for mapping the data
function paintHouses() {
    fetchData()
    .then((houses) => {
        let cards = houses.map(house => createHouseCard(house)).join(" ");
        houseContainer.innerHTML = cards;
      })
      .catch((error) => {
        console.error("Error fetching houses:", error);
      });
}
paintHouses();


houseFilter.addEventListener("click", function() {
    // Retrieve selected filter values
    const propertyType = document.getElementById("propertyType").value;
    const location = document.getElementById("location").value;
    const price = document.getElementById("price").value;
    const sellingRenting = document.getElementById("sellingRenting").value;

    // Check if all filter values are set to '---select---'
    if (propertyType === '---select---' && location === '---select---' && price === '---select---' && sellingRenting === '---select---') {
        alert("You haven't chosen or filtered any house.");
        return; // Exit the function without further processing
    }

    fetchData()
    .then((houses) => {
        // Filter houses based on selected values
        const filteredHouses = houses.filter(house => {
            return (house.prototype === propertyType) ||
                   (house.location === location) ||
                   (house.houseFor === sellingRenting) ||
                   (parseFloat(house.price.replace('$', '').replace(',', '')) >= parseFloat(price)) 
        });
        console.log('filter',filteredHouses); // Check filtered houses

        // Paint filtered houses
        paintHouses(filteredHouses);
    })
    .catch((error) => {
        console.error("Error fetching houses:", error);
    });
});



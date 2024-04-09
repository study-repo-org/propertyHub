// Define the houses array
let houses = [
    {
        prototype: "Villa",
        sell: "for sale",
        price: "$170,8978",
        img: "https://media.licdn.com/dms/image/D4D12AQGPy6n4XA3eiQ/article-cover_image-shrink_720_1280/0/1687039862345?e=2147483647&v=beta&t=reyO4Xm8PwuFc3KlLdSGCxgassaMBixCPJhtcWASBaM",
        description: "house in the small town",
        location: "New York", 
        sqft: "1000 Sqft",
        bed: "3 Bed",
        bath: "3 Bath"   
    },
    {
        prototype: "Apartment",
        sell: "for sale",
        price: "$1,378845",
        img: "https://corporatestays.com/wp-content/uploads/2022/02/The-Hazel-Amenities-Lounge-2.jpg",
        description: "Golden Urban House For Sell",
        location: "Las Vigas", 
        sqft: "12,000 Sqft",
        bed: "7 Bed",
        bath: "9 Bath" 
    },
    {
        prototype: "Apartment",
        sell: "for sale",
        price: "$1,0000",
        img: "https://corporatestays.com/wp-content/uploads/2022/02/The-Hazel-Amenities-4-e1633774291295.jpg",
        description: "community gated houses",
        location: "LA", 
        sqft: "5000 Sqft",
        bed: "3 Bed",
        bath: "2 Bath" 
    },
    {
        prototype: "Houses",
        sell: "for sale",
        price: "$20,54345",
        img: "https://assets-news.housing.com/news/wp-content/uploads/2022/03/31010142/Luxury-house-design-Top-10-tips-to-add-luxury-to-your-house-FEATURE-compressed.jpg",
        description: "modern house For Sell",
        location: "New York", 
        sqft: "1000 Sqft",
        bed: "1 Bed",
        bath: "1 Bath" 
    },
    {
        prototype: "Condominium",
        sell: "for sale",
        price: "$80,345",
        img: "https://t4.ftcdn.net/jpg/01/69/69/21/360_F_169692156_L1aGrmJaHsZxF1sWQGuRKn3mR60bBqhN.jpg",
        description: "century  house fully furnished",
        location: "Washington", 
        sqft: "15,000 Sqft",
        bed: "6 Bed",
        bath: "4 Bath"  
    },
    {
        prototype: "House",
        sell: "for sale",
        price: "$966,4345",
        img: "https://foyr.com/learn/wp-content/uploads/2019/03/Villa_Mistral-Singapore.jpg",
        description: "modern house with a pool",
        location: "New York", 
        sqft: "1000 Sqft",
        bed: "3 Bed",
        bath: "2 Bath" 
    },
];

// Define the createHouseCard function
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

// Define the paintDevelopers function
function paintDevelopers(houses) {
    let cards = houses.map(house => createHouseCard(house)).join(" ");
    document.getElementById("root").innerHTML = cards;
}

// Paint all houses initially
paintDevelopers(houses);

document.getElementById("filter-houses").addEventListener("click", function() {
    // Retrieve selected filter values
    const propertyType = document.getElementById("propertyType").value;
    const location = document.getElementById("location").value;
    const price = document.getElementById("price").value;


    // Check if all filter values are set to '---select---'
    if (propertyType === '---select---' && location === '---select---' && price === '---select---') {
        alert("You haven't chosen or filtered any house.");
        return; // Exit the function without further processing
    }

    // Filter houses based on selected values
    const filteredHouses = houses.filter(house => {
        return (house.prototype === propertyType) ||
               ( house.location === location) ||
               (parseFloat(house.price.replace('$', '').replace(',', '')) >= parseFloat(price)) 
    });

    console.log(filteredHouses); // Check filtered houses

    // Paint filtered houses
    paintDevelopers(filteredHouses);
});


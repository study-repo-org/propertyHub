
const contactUrl = "https://propertyhub-mywm.onrender.com/contact";

const contactForm = document.getElementById("submitForm" );

// Add event listener to form submission 
contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Get references to error message elements, form, checkbox, and email regex
    let nameErrorMessage = document.getElementById("nameError");
    let emailErrorMessage = document.getElementById("emailError"); 
    let subjectErrorMessage = document.getElementById("subjectError"); 
    let messageErrorMessage = document.getElementById("messageError"); 
    let contactForm = document.getElementById("submitForm");
    let checkIfClicked = document.getElementById("checkbox");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    // Reset error messages
    emailErrorMessage.innerText = "";
    nameErrorMessage.innerText = "";
    subjectErrorMessage.innerText = "";
    messageErrorMessage.innerText = "";


    // Retrieve  values
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;
    
    // Check if any field is empty
    if (email === "" || name === "" || subject === "" || message === "") {
        emailErrorMessage.innerText = "Email is required";
        nameErrorMessage.innerText = "Name is required";    
        subjectErrorMessage.innerText = "Subject is required";    
        messageErrorMessage.innerText = "Message is required";    
        return; // Exit function if any field is empty
    }

    // Validate email format
    if (!emailRegex.test(email)) {
        emailErrorMessage.innerText = "Invalid email format";
        return; // Exit function if email format is invalid
    }


    let id = Math.floor(Math.random() * 100000);

    const data = {
      id: id, 
      email: email,
      name:name,
      subject: subject,
      message: message
    };

    try {
        const response = await fetch(contactUrl, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      
        if (!response.ok) {
          throw new Error('Failed to add house');
        }
      console.log('sd');       
      } catch (error) {
        console.error('Error adding house:', error);
      } 

});

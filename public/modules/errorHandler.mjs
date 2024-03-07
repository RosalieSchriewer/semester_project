export function handleFetchError(error) {
    if (error instanceof TypeError && error.message.includes("NetworkError")) {
      
      console.error("The server seems to be down.");
      showErrorMessage("Sorry, the server seems to be down. Please try again later.");
    } else {
   
      console.error("Error:", error.message);
      showErrorMessage("An error occurred. Please try again.");
    }
  }
  
  function showErrorMessage(message) {
    
    alert(message);
  }
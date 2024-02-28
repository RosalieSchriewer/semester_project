

let lightingMode 

export function createLightModeButton(){
    let lightModeBtn = document.getElementById("lightModeBtn")
    const lightmode = localStorage.getItem("lightmode")
   
      if (lightmode ==="2"){
        const themeStylesheet = document.getElementById("themeStylesheet");
        lightModeBtn.textContent = "Lightmode"
        themeStylesheet.href = "/styles/dark.theme.css";
        
      }
    lightModeBtn.addEventListener("click", async function () {
      const themeStylesheet = document.getElementById("themeStylesheet");

      
  
      if (themeStylesheet.href.includes("dark")) {
        lightModeBtn.textContent = "Darkmode"
        themeStylesheet.href = "/styles/light-theme.css";
        lightingMode = 1
        console.log(lightingMode)
      
      } else {
        lightModeBtn.textContent = "Lightmode"
        themeStylesheet.href = "/styles/dark.theme.css";
        lightingMode = 2
        console.log(lightingMode)
      }
      try {
        // Assuming you have the user's token stored in the variable 'token'
        const token = localStorage.getItem("token");
  
        // Make a fetch request to the backend endpoint to update light mode
        const response = await fetch("/user/updateLightMode", {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lightmode: lightingMode }),
        });
  
        if (response.status === 200) {
          const data = await response.json();
          console.log("Light mode updated successfully:", data);
        } else if (response.status === 401) {
          localStorage.clear();
          alert("Login expired, please log in again");
          location.href = "login.html";
        } else {
          throw new Error("Server error: " + response.status);
        }
      } catch (error) {
        console.error("Error updating light mode:", error);
      }
    
    }); 
    
}

export function showNotification(message) {
    const notificationPopup = document.getElementById('notificationPopup');
    const notificationText = document.getElementById('notificationText');

    notificationText.textContent = message;

    notificationPopup.classList.remove('hidden');

    setTimeout(() => {
      notificationPopup.classList.add('hidden');
    }, 3000);
  }


let lightingMode 

export function createLightModeButton(){
    let lightModeBtn = document.getElementById("lightModeBtn")
    const lightmode = localStorage.getItem("lightmode")
    console.log(lightmode)
   
      if (lightmode ==="2"){
        const themeStylesheet = document.getElementById("themeStylesheet");
        lightModeBtn.textContent = "Lightmode"
        lightModeBtn.setAttribute("data-translate", "lightmode"); 
        themeStylesheet.href = "/styles/dark.theme.css";
        
      }
    lightModeBtn.addEventListener("click", async function () {
      const themeStylesheet = document.getElementById("themeStylesheet");

      
  
      if (themeStylesheet.href.includes("dark")) {
        lightModeBtn.textContent = "Darkmode"
        themeStylesheet.href = "/styles/light-theme.css";
        lightingMode = 1
        
       
      
      } else {
        lightModeBtn.textContent = "Lightmode"
        lightModeBtn.setAttribute("data-translate", "lightmode"); 
        themeStylesheet.href = "/styles/dark.theme.css";
        
        lightingMode = 2
        
      }
      const token = localStorage.getItem("token");
      if(token!=null){
      try {
     
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
         
          localStorage.removeItem("lightmode")
          console.log("bahjskd:"+data.lightmode)
          localStorage.setItem("lightmode",data.lightmode)
          console.log(localStorage)
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
    }
    
    }); 
    
    
}

export function showNotification(message) {
    const notificationPopup = document.getElementById('notificationPopup');
    const notificationText = document.getElementById('notificationText');

    notificationText.textContent = message

    notificationPopup.classList.remove('hidden');

    setTimeout(() => {
      notificationPopup.classList.add('hidden');
    }, 3000);
  }


 
 export function showNotificationWithLink(link) {
  const modal = document.createElement('div');
  modal.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: whitesmoke;border-radius: 8px; padding: 20px; border: 1px solid #ccc;">
          <p>Copy this link to share your avatar:</p>
          <input type="text" value="${link}" readonly id="shareLinkInput">
          <button id="copyButton">Copy to Clipboard</button>
          <button id="closeButton">Close</button>
      </div>
  `;

  document.body.appendChild(modal);

  const copyButton = document.getElementById('copyButton');
  const closeButton = document.getElementById('closeButton');

  copyButton.addEventListener('click', copyToClipboard);
  closeButton.addEventListener('click', closeModal);

  function copyToClipboard() {
    const input = document.getElementById('shareLinkInput');
    input.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
  }
  
  function closeModal() {
   
    document.body.removeChild(modal);
  }
  
}


  export function isSharedAvatar() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.has("token");
}
  
export function changeLanguage(){
  let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
  console.log (currentLanguage)
  updateUI()


async function loadTranslations(language) {
  const response = await fetch(`/translations/${language}.json`);
  return response.json();
}


document.getElementById('languageSwitchButton').addEventListener('click', function () {
  const dropdown = document.getElementById('languageDropdown');
  dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
});



const languageOptions = document.querySelectorAll('#languageDropdown a');
languageOptions.forEach(option => {
  option.addEventListener('click', function (event) {
    event.preventDefault();
   
    let selectedLanguage = this.getAttribute('data-language');
     localStorage.setItem( "selectedLanguage", selectedLanguage)
     setLanguage(selectedLanguage);
    document.getElementById('languageDropdown').style.display = 'none';
  });
});


function setLanguage(language) {


  if (language !== currentLanguage) {
    currentLanguage = language;
    updateUI();
  
}
}



function updateUI() {
  loadTranslations(currentLanguage).then(translations => {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      element.textContent = translations[key] || key;
      
    });
    let form = document.getElementById('createUserForm');
    
    if (form===null){
      let form = document.getElementById('loginForm')
      return form;
    }
   
    const submitButton = form.querySelector('input[type="submit"]');
    if (form && submitButton) {
      submitButton.value = translations['submit'] || 'Submit';
    }
  });
}
}
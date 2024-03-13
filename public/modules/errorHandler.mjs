 export let HTTPError = {
  Ok : 200,
  Unauthorized : 401
}

export function handleFetchError(error) {
  if (error instanceof TypeError && error.message.includes("NetworkError")) {
    console.error("The server seems to be down.");
    showErrorMessage(
      "Sorry, the server seems to be down. Please try again later."
    );
  } 
}

function showErrorMessage(message) {
  alert(message);
}

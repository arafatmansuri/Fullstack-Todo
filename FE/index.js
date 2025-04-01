// form button enabling when all the form elements have value
const formElement = document.querySelector("form");
const login_btn = document.querySelector("#Login-Button");
formElement.addEventListener("input", () => {
  var allFilled = true;
  let elements = formElement.elements;
  for (const element of elements) {
    if (element.type !== "submit" && element.type !== "button")
      if (element.value === "") {
        allFilled = false;
        break;
      }
  }
  login_btn.disabled = !allFilled;
});
formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(formElement);
  //sendin data to the server :
  try {
    await axios.post("http://127.0.0.1:3000/signin", formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const baseUrl = window.location.origin;
    const relativePath = "/FE/todo";
    const MainUrl = baseUrl + relativePath;
    window.location.href = MainUrl;
  } catch (err) {
    document.querySelector("#errbox").style.display = "block";
    document.querySelector("#errbox").textContent = err.response.data.message;
  }
});

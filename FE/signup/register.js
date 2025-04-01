// form button enabling when all the form elements have value
const formElement = document.querySelector("form");
const reg_btn = document.querySelector("#Register-Button");
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
  reg_btn.disabled = !allFilled;
});

document
  .getElementById("Register-Button")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    let username = document.getElementById("UserName-Register").value;
    let password = document.getElementById("Register-password").value;
    console.log(username);
    console.log(password);
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    console.log("Parsed result:", result);
    if (!response.ok) {
      document.querySelector("#errbox").style.display = "block";
      document.querySelector("#errbox").textContent = result.message;
    } else {
      const baseUrl = window.location.origin;
      const addUrl = "/FE/";
      window.location.href = baseUrl + addUrl;
    }
  });

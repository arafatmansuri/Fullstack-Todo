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
/*const password = document.querySelector("#Register-password");
const openEyeImg = document.querySelector("#openEye");
const BothImgs = document.querySelector(".EyeImg");
password.addEventListener("input", () => {
  if (!password.value == "") {
    openEyeImg.style.display = "inline-block";
  } else {
    openEyeImg.style.display = "none";
    BothImgs.id = "openEye";
    password.type = "password";
    BothImgs.src = "../resources/openEye.png";
  }
});
BothImgs.addEventListener("click", (e) => {
  if (password.type === "password") {
    password.type = "text";
    BothImgs.src = "../resources/closeEye.png";
    BothImgs.id = "closeEye";
  } else {
    BothImgs.id = "openEye";
    password.type = "password";
    BothImgs.src = "../resources/openEye.png";
  }
});
*/
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("Register-Button")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      let username = document.getElementById("UserName-Register").value;
      let password = document.getElementById("Register-password").value;
      const messageElement = document.getElementById("ask-login");
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
      } else console.log("Registration successful! Redirecting to login...");
    });
});

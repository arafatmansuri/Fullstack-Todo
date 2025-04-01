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
  // console.log(formElement.name.value);
});
formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(formElement);
  //     console.log(formData.get('name'));
  //     for (let [key,value] of formData.entries()) {
  //         console.log(key,value);
  // }
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
    console.log("Login success");
  } catch (err) {
    document.querySelector("#errbox").style.display = "block";
    document.querySelector("#errbox").textContent = err.response.data.message;
  }
  /*fetch("", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: JSON.stringify({ username, password }),
  }).then((response) => {
    if (response.ok) {
      const baseUrl = window.location.origin;
      const relativePath = "/chats-page";
      const MainUrl = baseUrl + relativePath;
      window.location.href = MainUrl;
    } else {
      const baseUrl = window.location.origin;
      const relativePath = "/chats-page";
      const MainUrl = baseUrl + relativePath;
      window.location.href = MainUrl;
    }
  });*/
});

//Password Display logic:
/*const password = document.querySelector("#login-password");
 const openEyeImg = document.querySelector("#openEye");
 const BothImgs = document.querySelector(".EyeImg");
password.addEventListener("input", () => {
  if (!password.value == "") {
    openEyeImg.style.display = "inline-block";
  } else {
    openEyeImg.style.display = "none";
    BothImgs.id = "openEye";
    password.type = "password";
    BothImgs.src = "./resources/openEye.png";
  }
});
BothImgs.addEventListener("click", (e) => {
  if (password.type === "password") {
    password.type = "text";
    BothImgs.src = "./resources/closeEye.png";
    BothImgs.id = "closeEye";
  } else {
    BothImgs.id = "openEye";
    password.type = "password";
    BothImgs.src = "./resources/openEye.png";
  }
});
*/

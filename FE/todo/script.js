let todoList = document.querySelector("#todo-list");
const li = document.querySelector("li");
document.addEventListener("DOMContentLoaded", async () => {
  const response = await axios
    .get("http://127.0.0.1:3000/getuser", {
      withCredentials: true,
    })
    .catch((err) => {
      const baseUrl = window.location.origin;
      const addUrl = "/FE";
      window.location.href = baseUrl + addUrl;
    });
  renderTasks();
  document.querySelector("h1").textContent = `${response.data.user.username}`;
});
const Input = document.querySelector("#todo-input");
const addTask = document.querySelector("#add-task-btn");
Input.addEventListener("keydown", () => {
  if (Input.value === "") {
    addTaskdisabled = true;
  } else {
    addTask.disabled = false;
  }
});
Input.focus();
addTask.addEventListener("click", async (e) => {
  const InputText = Input.value;
  const response = await axios
    .post(
      "http://127.0.0.1:3000/todo/add",
      { todo: InputText },
      {
        withCredentials: true,
      }
    )
    .catch((err) => {
      if (err.response.status >= 400) {
        const baseUrl = window.location.origin;
        const addUrl = "/FE";
        window.location.href = baseUrl + addUrl;
      }
    });
  Input.value = "";
  Input.focus();
});

async function renderTasks() {
  const response = await axios
    .get("http://127.0.0.1:3000/todo/get", {
      withCredentials: true,
    })
    .catch((err) => {
      const baseUrl = window.location.origin;
      const addUrl = "/FE";
      window.location.href = baseUrl + addUrl;
    });
  const tasks = response.data.tasks;
  tasks.map((Task) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const Img = document.createElement("img");
    Img.src = "../resources/uncheck.png";
    Img.classList.add("uncheck");
    span.textContent = Task.todo;
    button.textContent = "delete";
    li.setAttribute("data-id", Task.id);
    li.appendChild(Img);
    li.appendChild(span);
    li.appendChild(button);

    if (Task.status) {
      span.classList.add("completed");
      Img.src = "../resources/check.png";
      Img.classList.add("check");
    }
    todoList.appendChild(li);

    li.addEventListener("click", async (e) => {
      if (e.target.tagName === "BUTTON") return;
      let id = "";
      if (e.target.tagName === "LI") {
        id = e.target.getAttribute("data-id");
      } else {
        id = e.target.parentElement.getAttribute("data-id");
      }
      span.classList.toggle("completed");
      if (span.className.match("completed")) {
        Img.src = "../resources/check.png";
        Img.classList.replace("uncheck", "check");
        // Task.completed = true; Status API

        await axios
          .put(
            `http://127.0.0.1:3000/todo/status/${id}`,
            {},
            {
              withCredentials: true,
            }
          )
          .catch((err) => {
            const baseUrl = window.location.origin;
            const addUrl = "/FE";
            window.location.href = baseUrl + addUrl;
          });
      } else {
        Img.src = "../resources/uncheck.png";
        Img.classList.replace("check", "uncheck");
        await axios
          .put(
            `http://127.0.0.1:3000/todo/status/${id}`,
            {},
            {
              withCredentials: true,
            }
          )
          .catch((err) => {
            const baseUrl = window.location.origin;
            const addUrl = "/FE";
            window.location.href = baseUrl + addUrl;
          });
      }
    });
    li.querySelector("button").addEventListener("click", async (e) => {
      e.stopPropagation();
      const id = e.target.parentElement.getAttribute("data-id");
      await axios
        .delete(`http://127.0.0.1:3000/todo/delete/${id}`, {
          withCredentials: true,
        })
        .catch((err) => {
          const baseUrl = window.location.origin;
          const addUrl = "/FE";
          window.location.href = baseUrl + addUrl;
        });
    });
  });
}
document.querySelector("#logout").addEventListener("click", async () => {
  await axios
    .get("http://127.0.0.1:3000/logout", {
      withCredentials: true,
    })
    .catch((err) => {
      console.log(err);
    });
  const baseUrl = window.location.origin;
  const addUrl = "/FE";
  window.location.href = baseUrl + addUrl;
});

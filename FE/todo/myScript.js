let todoList = document.querySelector("#todo-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
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
  console.log(response);
  document.querySelector(
    "h1"
  ).textContent = `Todo List : ${response.data.user.username}`;
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
// tasks.forEach((task) => {
//   renderTasks(task);
// });
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
      console.log(err);
      if (err.response.status >= 400) {
        const baseUrl = window.location.origin;
        const addUrl = "/FE";
        window.location.href = baseUrl + addUrl;
      }
    });
  console.log(response);
  // tasks.push(NewTask);
  // StoreTask(tasks);
  Input.value = "";
  Input.focus();
  // renderTasks();
});

function StoreTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
async function renderTasks(Task) {
  const response = await axios
    .get("http://127.0.0.1:3000/todo/get", {
      withCredentials: true,
    })
    .catch((err) => {
      const baseUrl = window.location.origin;
      const addUrl = "/FE";
      window.location.href = baseUrl + addUrl;
    });
  console.log(response.data.tasks);
  // localStorage.setItem("ts", JSON.stringify(response.data.tasks));
  const tasks = response.data.tasks;
  tasks.map((Task) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");
    const Img = document.createElement("img");
    Img.src = "uncheck.png";
    Img.classList.add("uncheck");
    span.textContent = Task.todo;
    button.textContent = "delete";
    li.setAttribute("data-id", Task.id);
    li.appendChild(Img);
    li.appendChild(span);
    li.appendChild(button);

    if (Task.status) {
      span.classList.add("completed");
      Img.src = "check.png";
      Img.classList.add("check");
    }
    todoList.appendChild(li);

    li.addEventListener("click", async (e) => {
      console.log("LI clicked");
      if (e.target.tagName === "BUTTON") return;
      let id = "";
      if (e.target.tagName === "LI") {
        id = e.target.getAttribute("data-id");
      } else {
        id = e.target.parentElement.getAttribute("data-id");
      }
      span.classList.toggle("completed");
      console.log("clicked span");
      if (span.className.match("completed")) {
        Img.src = "check.png";
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
        // localStorage.setItem("ts", JSON.stringify(response));
        // console.log(response);
        // StoreTask();
      } else {
        Img.src = "uncheck.png";
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
        // StoreTask();
      }
    });
    li.querySelector("button").addEventListener("click", async (e) => {
      e.stopPropagation();
      const id = e.target.parentElement.getAttribute("data-id");
      console.log("Delete clicked");
      await axios
        .delete(`http://127.0.0.1:3000/todo/delete/${id}`, {
          withCredentials: true,
        })
        .catch((err) => {
          console.log(id);
          console.log(err);
          // const baseUrl = window.location.origin;
          // const addUrl = "/FE";
          // window.location.href = baseUrl + addUrl;
        });
    });
  });
}

// localStorage.clear();

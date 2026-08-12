const taskId = window.location.pathname.split("/")[3];
const titleBox = document.getElementById("taskTitle");
const deleteButton = document.getElementById("deleteButton");
const cancelButton = document.getElementById("cancelButton");
const messageBox = document.getElementById("messageBox");

let currentTask = null;
let currentUser = null;

async function getUser() {
    const response = await fetch("/api/accounts/user/");

    if (response.ok) {
        currentUser = await response.json();
    }
}

async function loadTask() {
    const response = await fetch(`/api/tasks/${taskId}/`);

    if (!response.ok) {
        showError("Task not found");
        return;
    }

    currentTask = await response.json();
    titleBox.innerText = currentTask.title;

    // ownership check
    if (currentTask.user !== currentUser.id) {
        deleteButton.disabled = true;
        showError(
            "You cannot delete this task because you are not the creator."
        );
    }
}

deleteButton.addEventListener("click", async () => {

    if (!currentTask)
        return;
    if (currentTask.user !== currentUser.id) {
        showError(
            "You cannot delete this task."
        );
        return;
    }

    const response = await fetch(`/api/tasks/${taskId}/`, {

        method: "DELETE",

        headers: {

            "X-CSRFToken":
                getCSRFToken()

        }
    }
    );

    if (response.ok) {

        messageBox.innerHTML =
            `
        <div class="success-message">
        Task deleted successfully!
        </div>
        `;

        setTimeout(() => {
            window.location.href = "/tasks/";
        }, 1500);
    } else {
        showError(
            "Delete failed. Please try again."
        );
    }
});

cancelButton.addEventListener("click", () => {

    window.location.href = "/tasks/";
});

function showError(message) {
    messageBox.innerHTML =
        `
    <div class="error-message">
    ${message}
    </div>
    `;
}

function getCSRFToken() {

    return document.cookie
        .split("; ")
        .find(row =>
            row.startsWith("csrftoken=")
        )
        ?.split("=")[1];
}

(async () => {
    await getUser();
    await loadTask();
})();
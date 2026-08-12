document.addEventListener("DOMContentLoaded", () => {
    // const form = document.getElementById("taskForm");
    const titleInput = document.getElementById("taskTitle");
    const descriptionInput = document.getElementById("taskDescription");
    const statusInput = document.getElementById("taskStatus");
    const editButton = document.getElementById("editTaskButton");
    const addButtonText = document.getElementById("addButtonText");
    const deleteButton = document.getElementById("deleteTaskButton");
    const formMessage = document.getElementById("formMessage");
    const titleError = document.getElementById("titleError");
    const descriptionError = document.getElementById("descriptionError");
    const characterCount = document.getElementById("characterCount");
    const taskId = window.location.pathname.split("/")[3];
    const statusBox = document.getElementById("status-box");

    // Load task data
    async function loadTask() {
        const response = await fetch(`/api/tasks/${taskId}/`);

        if (!response.ok) {
            alert("Cannot load task");
            return;
        }

        const task = await response.json();
        titleInput.value = task.title;
        descriptionInput.value = task.description;
        characterCount.textContent = `${task.description.length} / 400`;
        statusBox.textContent = task.status ? "Status: Task Done" : "Status: Task Not Done"
    }

    loadTask();

    // CHARACTER COUNT
    descriptionInput.addEventListener("input", () => {
        const length = descriptionInput.value.length;
        characterCount.textContent = `${length} / 400`;
    });

    // Delete
    deleteButton.addEventListener("click", () => {
        window.location.href = `/tasks/delete/${taskId}/`;
    });

    // FORM SUBMIT
    // form.addEventListener("submit", async (event) => {
    //     window.location.href = `/tasks/edit/${taskId}/`;
    // });

    // Edit button 
    editButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = `/tasks/edit/${taskId}/`;
    });

    function getCSRFToken() {
        const cookie =
            document.cookie
                .split("; ")
                .find(row =>
                    row.startsWith("csrftoken=")
                );

        if (!cookie) {
            return "";
        }

        return decodeURIComponent(
            cookie.split("=")[1]
        );
    }

    // function setLoadingState(isLoading) {
    // }

    function showFieldError(input, errorElement, message
    ) {
        input.classList.add("is-invalid");
        errorElement.textContent = message;
    }

    function clearErrors() {
        titleInput.classList.remove("is-invalid");
        descriptionInput.classList.remove("is-invalid");
        titleError.textContent = "";
        descriptionError.textContent = "";
        formMessage.className = "form-message d-none";
        formMessage.textContent = "";
    }

    function handleAPIError(response, data) {

        if (data && typeof data === "object") {
            if (data.title) {
                showFieldError(
                    titleInput,
                    titleError,
                    getAPIErrorText(data.title)
                );
            }

            if (data.description) {
                showFieldError(
                    descriptionInput,
                    descriptionError,
                    getAPIErrorText(data.description)
                );
            }

            if (
                data.detail &&
                !data.title &&
                !data.description
            ) {
                showMessage(data.detail, "error");
                return;
            }

            if (data.title || data.description) {

                showMessage(
                    "Please check the highlighted fields.",
                    "error"
                );
                return;
            }
        }

        if (response.status === 401) {
            showMessage(
                "You need to log in before creating a task.",
                "error"
            );
            return;
        }

        if (response.status === 403) {
            showMessage(
                "You do not have permission to create this task.",
                "error"
            );
            return;
        }

        showMessage(
            "Unable to create the task. Please try again.",
            "error"
        );
    }

    function getAPIErrorText(error) {
        if (Array.isArray(error)) {
            return error.join(" ");
        }
        return String(error);
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
    }
});
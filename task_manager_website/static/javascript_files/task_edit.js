document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("taskForm");
    const titleInput = document.getElementById("taskTitle");
    const descriptionInput = document.getElementById("taskDescription");
    const statusInput = document.getElementById("taskStatus");
    const addButton = document.getElementById("addTaskButton");
    const addButtonText = document.getElementById("addButtonText");
    const cancelButton = document.getElementById("cancelTaskButton");
    const formMessage = document.getElementById("formMessage");
    const titleError = document.getElementById("titleError");
    const descriptionError = document.getElementById("descriptionError");
    const characterCount = document.getElementById("characterCount");
    const taskId = window.location.pathname.split("/")[3];
    const loadingSpinner = document.getElementById("load-spinner");
    const addIcon = document.getElementById("editIcon");

    // Load task data
    async function loadTask() {

        console.log(taskId);
        const response = await fetch(`/api/tasks/${taskId}/`);

        if (!response.ok) {
            alert("Cannot load task");
            return;
        }

        const task = await response.json();
        titleInput.value = task.title;
        descriptionInput.value = task.description;
        statusInput.checked = task.status;
        characterCount.textContent = `${task.description.length} / 400`;
    }

    loadTask();

    // CHARACTER COUNT
    descriptionInput.addEventListener("input", () => {
        const length = descriptionInput.value.length;
        characterCount.textContent = `${length} / 400`;
    });

    // CANCEL
    cancelButton.addEventListener("click", () => {
        window.location.href =
            "/tasks/";
    });

    // FORM SUBMIT
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearErrors();

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const status = statusInput.checked;
        let isValid = true;

        if (!title) {
            showFieldError(
                titleInput,
                titleError,
                "Please enter a task title."
            );
            isValid = false;
        }

        if (!description) {
            showFieldError(
                descriptionInput,
                descriptionError,
                "Please enter a task description."
            );
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        setLoadingState(true);

        try {
            const response = await fetch(`/api/tasks/${taskId}/`, {
                method: "PATCH",

                credentials: "same-origin",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Accept":
                        "application/json",

                    "X-CSRFToken":
                        getCSRFToken()
                },

                body: JSON.stringify({
                    title: title,
                    description: description,
                    status: status
                })
            }
            );

            let data = null;
            try {
                data = await response.json();
            } catch (error) {
                data = null;
            }

            if (!response.ok) {
                handleAPIError(
                    response,
                    data
                );
                return;
            }

            showMessage(
                "Task created successfully.",
                "success"
            );

            setTimeout(() => {
                window.location.href = "/tasks/";
            }, 500);

        } catch (error) {
            console.error(
                "Create task error:",
                error
            );

            showMessage(
                "Something went wrong. Please try again.",
                "error"
            );
        } finally {
            setLoadingState(false);
        }
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

    function setLoadingState(isLoading) {
        if (isLoading) {
            addIcon.style.display = "none";
            loadingSpinner.style.display = "inline-block";
        } else {
            addIcon.style.display = "inline-block";
            loadingSpinner.style.display = "none";
        }
    }

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
                "No Permission. You can edit only your tasks",
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
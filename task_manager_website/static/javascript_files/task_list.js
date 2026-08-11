const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("taskSearch");
const myTasks = document.getElementById("myTasks");
const loading = document.getElementById("loadingState");
const empty = document.getElementById("emptyState");

let currentUser = null;

// Get logged in user
async function getCurrentUser() {
    const response = await fetch(
        "/api/accounts/user/"
    );

    if (response.ok) {
        currentUser = await response.json();
    }
}

// Load tasks from API
async function loadTasks() {
    loading.classList.remove("d-none");
    taskList.innerHTML = "";
    let url = "/api/tasks/";
    const search = searchInput.value.trim();

    if (search) {
        url += `search=${encodeURIComponent(search)}&`;
    }

    if (myTasks.checked) {
        url += "?mine=true";
    }

    const response = await fetch(url);
    const tasks = await response.json();
    renderTasks(tasks);
    loading.classList.add("d-none");
}

// Render task cards
function renderTasks(tasks) {
    if (tasks.length === 0) {
        empty.classList.remove("d-none");
        return;
    }

    empty.classList.add("d-none");
    tasks.forEach(task => {
        // console.log(task);
        console.log(currentUser);
        console.log(task.created_by);

        const canEdit = currentUser.username === task.created_by.username ? true : false
        console.log("can? " + canEdit);

        const updated = task.updated_at !== task.created_at;
        const card = document.createElement("article");
        card.className = `task-card ${task.status ? "done" : ""}`;

        card.onclick = () => {
            window.location.href =
                `/tasks/${task.id}/`;
        };

        card.innerHTML = `
            <h2 class="task-title">
                ${task.title}
            </h2>

            <p class="task-description">
                ${task.description}
            </p>

            <div class="task-meta">
                Created by: ${task.created_by.username}
                <br>
                Created:
                ${new Date(task.created_at)
                .toLocaleDateString()
            }
                ${updated
                ?
                `
                    <br>
                    Updated:
                    ${new Date(task.updated_at)
                    .toLocaleDateString()
                }
                    `
                :
                ""
            }
            </div>

            <label class="task-status">
                <input
                    class="status-checkbox"
                    type="checkbox"
                    ${task.status ? "checked" : ""}
                >

                <span class="status-text">
                    ${task.status ? "Done!" : "Not Done"}
                </span>
            </label>
            <div class="task-actions">

                ${canEdit ? `
                    <button
                        class="icon-btn edit-btn" title="Edit task">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" /></svg>
                    </button>`: ""}


                ${canEdit ? `
                    <button
                        class="icon-btn delete-btn" ${canEdit ? "" : "disabled"} title="Delete task">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                        fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg>
                    </button>`: ""}
            </div>`;

        taskList.appendChild(card);

        /*
            STATUS CHANGE
        */
        const checkbox = card.querySelector(".status-checkbox");


        const statusText = card.querySelector(".status-text");
        checkbox.addEventListener(
            "click",
            e => {
                e.stopPropagation();
            }
        );

        checkbox.addEventListener(
            "change",
            async function () {

                const newStatus = checkbox.checked;
                await updateTaskStatus(
                    task.id,
                    newStatus
                );

                task.status =
                    newStatus;
                // Change card style
                card.classList.toggle(
                    "done",
                    newStatus
                );
                // Change text

                statusText.textContent =
                    newStatus
                        ?
                        "Done!"
                        :
                        "Not Done";
            }
        );
    });
}

// Update status API
async function updateTaskStatus(
    id,
    status
) {
    await fetch(`/api/tasks/${id}/`, {

        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken()
        },

        body:
            JSON.stringify({
                status: status
            })
    }
    );
}

// Search debounce
searchInput.addEventListener(
    "input",
    () => {
        clearTimeout(
            window.timer
        );

        window.timer =
            setTimeout(
                loadTasks,
                400
            );
    }
);

// My tasks filter
myTasks.addEventListener(
    "change",
    loadTasks
);

// Start page
(async function () {
    await getCurrentUser();
    await loadTasks();
})();

// Django CSRF
function getCSRFToken() {
    return document.cookie
        .split("; ")
        .find(
            row =>
                row.startsWith(
                    "csrftoken="
                )
        )
        ?.split("=")[1];
}
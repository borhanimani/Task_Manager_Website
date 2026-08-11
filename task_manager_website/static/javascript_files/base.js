
async function loadCurrentUser() {

    try {
        const response = await fetch(
            "/api/accounts/user/",
            {
                method: "GET",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Not authenticated");
        }

        const user = await response.json();
        showUser(user);
    }

    catch (error) {
        showLogin();
    }
}


function showUser(user) {
    const area = document.getElementById("authArea");
    const firstLetter = user.username.charAt(0).toUpperCase();

    area.innerHTML = `
    <div class="dropdown">
        <button
            class="user-avatar"
            data-bs-toggle="dropdown"
            aria-expanded="false">

        ${firstLetter}
        </button>

        <ul class="dropdown-menu dropdown-menu-end">
            <li>
                <button
                    class="dropdown-item logout-btn"
                    onclick="logoutUser()">
                    Logout
                </button>
            </li>
        </ul>
    </div>`;
}


function showLogin() {
    const area = document.getElementById("authArea");

    area.innerHTML = `
    <a 
    href="/login/"
    class="btn btn-primary login-btn">
        Login
    </a>`;
}


async function logoutUser() {
    const csrf = getCookie("csrftoken");

    await fetch(
        "/api/accounts/logout/",
        {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "X-CSRFToken": csrf
            }
        }
    );

    window.location.reload();
}


function getCookie(name) {
    let cookieValue = null;
    document.cookie.split(";").forEach(cookie => {

        let [key, value] = cookie.trim().split("=");
        if (key === name) {
            cookieValue = value;
        }
    });

    return cookieValue;
}


document.addEventListener(
    "DOMContentLoaded",
    loadCurrentUser
);
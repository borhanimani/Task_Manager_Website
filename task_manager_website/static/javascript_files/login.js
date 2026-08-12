document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        async function (event) {
            event.preventDefault();

            const button = document.getElementById("loginButton");
            const errorBox = document.getElementById("loginError");
            button.disabled = true;
            button.innerText = "Logging in...";
            const csrfToken =
                document.querySelector(
                    "[name=csrfmiddlewaretoken]"
                ).value;

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response =
                    await fetch(
                        "/api/accounts/login/",
                        {
                            method: "POST",
                            credentials: "same-origin",
                            headers: {
                                "Content-Type":
                                    "application/json",
                                "X-CSRFToken":
                                    csrfToken
                            },

                            body: JSON.stringify({
                                username,
                                password
                            })
                        });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Invalid username or password"
                    );
                }

                window.location.href = "/tasks/";
            }

            catch (error) {
                errorBox.style.display = "block";
                errorBox.innerText =
                    error.message;
                button.disabled = false;
                button.innerText = "Login";
            }
        });
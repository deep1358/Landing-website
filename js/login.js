// main containers of login, registers, and forgot-password.
const registerContainer = document.getElementById("register");
const loginContainer = document.getElementById("login");
const forgotPasswordContainer = document.getElementById("forgot-password");

// All buttons
const loginBtn = document.querySelector("#register .container-header button");
const registerBtn = document.querySelector("#login .container-header button");
const backForgotPasswordBtn = document.querySelector(
    ".forgot-password-back-icon button"
);
const forgotBtn = document.querySelector(".form-field-forgot a");

// All forms
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const fPasswordForm = document.getElementById("forgot-password-form");

// Register form fields, and containers of them
const rFName = document.getElementById("register-name");
const rEmail = document.getElementById("register-email");
const rPassword = document.getElementById("register-password");
const rCPassword = document.getElementById("register-confirm-password");

const rFNameCont = document.getElementById("register-name-cont");
const rEmailCont = document.getElementById("register-email-cont");
const rPasswordCont = document.getElementById("register-password-cont");
const rCPasswordCont = document.getElementById(
    "register-confirm-password-cont"
);

// Login form fields, and containers of them
const lEmail = document.getElementById("login-email");
const lPassword = document.getElementById("login-password");

const lEmailCont = document.getElementById("login-email-cont");
const lPasswordCont = document.getElementById("login-password-cont");

// Forgot-password form fields, and containers of them
const fEmail = document.getElementById("forgot-password-email");
const fPassword = document.getElementById("forgot-password-password");
const fCPassword = document.getElementById("forgot-password-confirm-password");

const fEmailCont = document.getElementById("forgot-password-email-cont");
const fPasswordCont = document.getElementById("forgot-password-password-cont");
const fCPasswordCont = document.getElementById(
    "forgot-password-confirm-password-cont"
);

// Eye buttons
const rPasswordEye = document.querySelector(".eye-1");
const rCPasswordEye = document.querySelector(".eye-2");
const lPasswordEye = document.querySelector(".eye-3");
const fPasswordEye = document.querySelector(".eye-4");
const fCPasswordEye = document.querySelector(".eye-5");

// Error containers of all
const rErrorCont = document.querySelector("#register .container-error p");
const lErrorCont = document.querySelector("#login .container-error p");
const fErrorCont = document.querySelector(
    "#forgot-password .container-error p"
);

// Success containers of all
const rSuccessCont = document.querySelector("#register .container-success p");
const lSuccessCont = document.querySelector("#login .container-success p");
const fSuccessCont = document.querySelector(
    "#forgot-password .container-success p"
);

// Remember checkbox
const remBtn = document.getElementById("remember");

// Back button for going back into the history
const backBtn = document.querySelector(".register-login-back-icon");

// Errors for register
let rNameErr;
let rEmailErr;
let rPasswordErr;
let rCPasswordErr;

// Errors for login
let lEmailErr;
let lPasswordErr;

// Errors for forgot-password
let fEmailErr;
let fPasswordErr;
let fCPasswordErr;

// All buttons onclick event
backBtn.onclick = () => history.back();
loginBtn.onclick = () => {
    loginContainer.classList.add("active");
    registerContainer.classList.remove("active");
    forgotPasswordContainer.classList.remove("active");
};
registerBtn.onclick = () => {
    loginContainer.classList.remove("active");
    forgotPasswordContainer.classList.remove("active");
    registerContainer.classList.add("active");
};
forgotBtn.onclick = () => {
    loginContainer.classList.remove("active");
    registerContainer.classList.remove("active");
    forgotPasswordContainer.classList.add("active");
};
backForgotPasswordBtn.onclick = () => {
    loginContainer.classList.add("active");
    registerContainer.classList.remove("active");
    forgotPasswordContainer.classList.remove("active");
};

// Indexed DB Initialization
let db;

window.onload = () => {
    window.indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;
    window.IDBTransaction =
        window.IDBTransaction ||
        window.webkitIDBTransaction ||
        window.msIDBTransaction;
    window.IDBKeyRange =
        window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    if (!window.indexedDB) alert("Your Browser doesn't support Indexed DB");
    else {
        let request = indexedDB.open("user", 1);

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            let objectStore = db.createObjectStore("user", {
                keyPath: "Email",
            });
        };
        request.onsuccess = (s) => {
            db = s.target.result;
        };

        request.onerror = (err) => {
            console.log(err);
        };
    }
};

// All forms onsubmit event
registerForm.onsubmit = (e) => {
    e.preventDefault();
    let error = "";

    if (rNameErr) error = rNameErr;
    else if (rEmailErr) error = rEmailErr;
    else if (rPasswordErr) error = rPasswordErr;
    else if (rCPasswordErr) error = rCPasswordErr;

    if (error) {
        rErrorCont.innerText = error;
        rErrorCont.style.display = "block";

        rSuccessCont.innerText = "";
        rSuccessCont.style.display = "none";
    } else {
        rErrorCont.innerText = "";
        rErrorCont.style.display = "none";

        const user = {
            FullName: rFName.value,
            Email: rEmail.value,
            Password: rPassword.value,
        };

        // Storing user in Indexed DB and handling errors.
        const tx = db.transaction("user", "readwrite");
        const User = tx.objectStore("user");

        User.add(user);

        tx.oncomplete = () => {
            rSuccessCont.innerText = "User Signed Up successfully!";
            rSuccessCont.style.display = "block";

            rErrorCont.innerText = "";
            rErrorCont.style.display = "none";

            setTimeout(() => {
                window.location.href = "../index.html";
            }, 500);
        };
        tx.onerror = () => {
            rErrorCont.innerText = "Email is already in use.";
            rErrorCont.style.display = "block";

            rSuccessCont.innerText = "";
            rSuccessCont.style.display = "none";
        };
    }
};
loginForm.onsubmit = (e) => {
    e.preventDefault();
    let error = "";

    if (lEmailErr) error = lEmailErr;
    else if (lPasswordErr) error = lPasswordErr;

    if (error) {
        lErrorCont.innerText = error;
        lErrorCont.style.display = "block";

        lSuccessCont.innerText = "";
        lSuccessCont.style.display = "none";
    } else {
        // Checking user credentials in Indexed DB and handling errors.
        const tx = db.transaction("user", "readonly");
        const User = tx.objectStore("user");
        const Request = User.get(lEmail.value);

        Request.onerror = () => {
            lSuccessCont.innerText = "";
            lSuccessCont.style.display = "none";
            lErrorCont.innerText = "error while retrieving";
            lErrorCont.style.display = "block";
        };
        Request.onsuccess = (event) => {
            try {
                const password = event.target.result.Password;

                if (password === lPassword.value) {
                    lSuccessCont.innerText = "User Logged In successfully!";
                    lSuccessCont.style.display = "block";

                    // Storing user in session storage.
                    if (remBtn.checked)
                        sessionStorage.setItem(
                            "user",
                            JSON.stringify(event.target.result)
                        );

                    lErrorCont.innerText = "";
                    lErrorCont.style.display = "none";

                    setTimeout(() => {
                        window.location.href = "../index.html";
                    }, 500);
                } else {
                    lSuccessCont.innerText = "";
                    lSuccessCont.style.display = "none";

                    lErrorCont.innerText = "Invalid Password";
                    lErrorCont.style.display = "block";
                }
            } catch (Err) {
                lSuccessCont.innerText = "";
                lSuccessCont.style.display = "none";
                lErrorCont.innerText = "Email doesn't exist";
                lErrorCont.style.display = "block";
            }
        };
    }
};
fPasswordForm.onsubmit = (e) => {
    e.preventDefault();
    let error = "";

    if (fEmailErr) error = fEmailErr;
    else if (fPasswordErr) error = fPasswordErr;
    else if (fCPasswordErr) error = fCPasswordErr;

    if (error) {
        fErrorCont.innerText = error;
        fErrorCont.style.display = "block";

        fSuccessCont.innerText = "";
        fSuccessCont.style.display = "none";
    } else {
        // Changing user password in Indexed DB and handling errors.
        const tx = db.transaction("user", "readwrite");
        const User = tx.objectStore("user");
        const Request = User.get(fEmail.value);

        Request.onsuccess = (event) => {
            try {
                let data = event.target.result;
                data.Password = fPassword.value;

                let requestUpdate = User.put(data);
                requestUpdate.onsuccess = (success) => {
                    fSuccessCont.innerText = "Password changed successfully!";
                    fSuccessCont.style.display = "block";
                    fErrorCont.innerText = "";
                    fErrorCont.style.display = "none";
                    setTimeout(() => {
                        window.location.href = "../index.html";
                    }, 500);
                };
                requestUpdate.onerror = (err) => {
                    fSuccessCont.innerText = "";
                    fSuccessCont.style.display = "none";
                    fErrorCont.innerText = "Some Error occurred.";
                    fErrorCont.style.display = "block";
                };
            } catch (err) {
                fSuccessCont.innerText = "";
                fSuccessCont.style.display = "none";
                fErrorCont.innerText = "Email doesn't exist.";
                fErrorCont.style.display = "block";
            }
        };
    }
};

// All eyes close-open event
rPasswordEye.onclick = () => {
    if (rPassword.type === "password") {
        rPassword.type = "text";
        rPasswordEye.src = "../images/eye-open.png";
    } else if (rPassword.type === "text") {
        rPassword.type = "password";
        rPasswordEye.src = "../images/eye-close.png";
    }
};
lPasswordEye.onclick = () => {
    if (lPassword.type === "password") {
        lPassword.type = "text";
        lPasswordEye.src = "../images/eye-open.png";
    } else if (lPassword.type === "text") {
        lPassword.type = "password";
        lPasswordEye.src = "../images/eye-close.png";
    }
};
rCPasswordEye.onclick = () => {
    if (rCPassword.type === "password") {
        rCPassword.type = "text";
        rCPasswordEye.src = "../images/eye-open.png";
    } else if (rCPassword.type === "text") {
        rCPassword.type = "password";
        rCPasswordEye.src = "../images/eye-close.png";
    }
};
fPasswordEye.onclick = () => {
    if (fPassword.type === "password") {
        fPassword.type = "text";
        fPasswordEye.src = "../images/eye-open.png";
    } else if (fPassword.type === "text") {
        fPassword.type = "password";
        fPasswordEye.src = "../images/eye-close.png";
    }
};
fCPasswordEye.onclick = () => {
    if (fCPassword.type === "password") {
        fCPassword.type = "text";
        fCPasswordEye.src = "../images/eye-open.png";
    } else if (fCPassword.type === "text") {
        fCPassword.type = "password";
        fCPasswordEye.src = "../images/eye-close.png";
    }
};

// All input onkeyup event
rFName.onkeyup = () => {
    checkUserName(rFName.value);
};
rEmail.onkeyup = () => {
    checkEmail(rEmail.value);
};
rPassword.onkeyup = () => {
    checkPassword(rPassword.value);
    comparePassword(rPassword.value, rCPassword.value);
};
rCPassword.onkeyup = () => {
    comparePassword(rPassword.value, rCPassword.value);
};
lEmail.onkeyup = () => {
    checkLEmail(lEmail.value);
};
lPassword.onkeyup = () => {
    checkLPassword(lPassword.value);
};
fEmail.onkeyup = () => {
    checkFEmail(fEmail.value);
};
fPassword.onkeyup = () => {
    checkFPassword(fPassword.value);
    compareFPassword(fPassword.value, fCPassword.value);
};
fCPassword.onkeyup = () => {
    compareFPassword(fPassword.value, fCPassword.value);
};

// All password validation
const checkPassword = (input) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%()^&*])[a-zA-Z0-9!@#()$%^&*]{9,20}$/;
    if (regex.test(input)) {
        rPasswordCont.classList.add("correct");
        rPasswordErr = "";
    } else {
        rPasswordErr =
            "Password must contain at least 1 letter, 1 digit, and 1 special character.";
        rPasswordCont.classList.remove("correct");
    }
};
const checkLPassword = (input) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%()^&*])[a-zA-Z0-9!@#()$%^&*]{9,20}$/;
    if (regex.test(input)) {
        lPasswordCont.classList.add("correct");
        lPasswordErr = "";
    } else {
        lPasswordErr =
            "Password must contain at least 1 letter, 1 digit, and 1 special character.";
        lPasswordCont.classList.remove("correct");
    }
};
const checkFPassword = (input) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%()^&*])[a-zA-Z0-9!@#()$%^&*]{9,20}$/;
    if (regex.test(input)) {
        fPasswordCont.classList.add("correct");
        fPasswordErr = "";
    } else {
        fPasswordErr =
            "Password must contain at least 1 letter, 1 digit, and 1 special character.";
        fPasswordCont.classList.remove("correct");
    }
};

// Compare password validation
const comparePassword = (original, duplicate) => {
    if (original === duplicate) {
        rCPasswordCont.classList.add("correct");
        rCPasswordErr = "";
    } else {
        rCPasswordErr = "Password and Confirm passwords must be same.";
        rCPasswordCont.classList.remove("correct");
    }
};
const compareFPassword = (original, duplicate) => {
    if (original === duplicate) {
        fCPasswordCont.classList.add("correct");
        fCPasswordErr = "";
    } else {
        fCPasswordErr = "Password and Confirm passwords must be same.";
        fCPasswordCont.classList.remove("correct");
    }
};

// All email validation
const checkEmail = (input) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(input)) {
        rEmailCont.classList.add("correct");
        rEmailErr = "";
    } else {
        rEmailErr = "Invalid Email format.";
        rEmailCont.classList.remove("correct");
    }
};
const checkLEmail = (input) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(input)) {
        lEmailCont.classList.add("correct");
        lEmailErr = "";
    } else {
        lEmailErr = "Invalid Email format.";
        lEmailCont.classList.remove("correct");
    }
};
const checkFEmail = (input) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(input)) {
        fEmailCont.classList.add("correct");
        fEmailErr = "";
    } else {
        fEmailErr = "Invalid Email format.";
        fEmailCont.classList.remove("correct");
    }
};

// Username validation
const checkUserName = (input) => {
    const regex = /[a-zA-Z\s]{3,}\s[a-zA-Z\s]{3,}/;
    if (regex.test(input)) {
        rFNameCont.classList.add("correct");
        rNameErr = "";
    } else {
        rNameErr =
            "User Name format must contain 2 words, each must contain at least 3 characters.";
        rFNameCont.classList.remove("correct");
    }
};

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  //outline input with red

  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//check email is valid
const isValidEmail = (email) => {
  // regex for testing email configuration
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, "Email is not valid");
  }
};

const checkRequired = (inputArr) => {
  inputArr.forEach((el) => {
    if (el.value.trim() === "") {
      showError(el, `${getFieldName(el)} cannot be left blank`);
    } else {
      showSuccess(el);
    }
  });
};
//
const getFieldName = (input) => {
  if (input.id === "password2") {
    return "Password";
  }
  return input.id.charAt(0).toUpperCase() + input.id.slice(1); //remove first char, make it uppercase, join back to original string
};

const checkLength = (el, min, max) => {
  if (el.value.length < min) {
    showError(el, `${getFieldName(el)} must be at least ${min} characters`);
  } else if (el.value.length > max) {
    showError(el, `${getFieldName(el)} must be less than ${max} characters`);
  } else {
    showSuccess(el);
  }
};

const checkPasswords = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showError(pass2, "Passwords do not match");
  } else {
    showSuccess(pass2);
  }
};
// event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 6, 15);
  checkLength(password, 6, 25);
  isValidEmail(email);
  checkPasswords(password, password2);
});

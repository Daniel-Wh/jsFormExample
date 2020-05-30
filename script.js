// pull input from dom
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

/**
 * takes html element and error output, updates dom to reflect error message underneath element
 * @param {html element} input
 * @param {string} message
 */
function showError(input, message) {
  // move up to parent element then add error css class
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

/**
 * updates class name to reflect successfull input
 * @param {html element} input
 */
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

/**
 * test for correct email configuration (foo@bar.com) adjust dom pending check
 * @param {email Html element} email
 */
const isValidEmail = (email) => {
  // regex for testing email configuration
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, "Email is not valid");
  }
};
/**
 * checks for empty input
 * @param {html el array} inputArr
 */
const checkRequired = (inputArr) => {
  inputArr.forEach((el) => {
    if (el.value.trim() === "") {
      showError(el, `${getFieldName(el)} cannot be left blank`);
    } else {
      showSuccess(el);
    }
  });
};
/**
 * string formatting - returns element id as string with first char capitalized
 * @param {html element} input
 */
const getFieldName = (input) => {
  if (input.id === "password2") {
    return "Password";
  }
  return input.id.charAt(0).toUpperCase() + input.id.slice(1); //remove first char, make it uppercase, join back to original string
};

/**
 * checks length of html element input against min/max value
 * @param {html element} el
 * @param {number} min
 * @param {number} max
 */
const checkLength = (el, min, max) => {
  if (el.value.length < min) {
    showError(el, `${getFieldName(el)} must be at least ${min} characters`);
  } else if (el.value.length > max) {
    showError(el, `${getFieldName(el)} must be less than ${max} characters`);
  } else {
    showSuccess(el);
  }
};

/**
 * checks if password and password confirmation match
 * @param {html el} pass1
 * @param {html el} pass2
 */
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

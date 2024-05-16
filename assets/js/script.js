'use strict';

/**
 * navbar toggle
 */

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Check if the current user exists
if (currentUser) {
  // Get the user's name
  const userName = currentUser.username;

  // Update the user name element in the HTML
  const userNameElement = document.getElementById('user-name');
  userNameElement.textContent = `Welcome, ${userName}!`;
}


const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});
// Get the form element
const inquiryForm = document.querySelector('.tour-search-form');

// Add a submit event listener to the form
inquiryForm.addEventListener('submit', function(event) {
  // Prevent the default form submission
  event.preventDefault();

  // Display a confirmation message
  alert('Your request has been registered! We will get back to you soon.');
});











function showPopup(message, symbol) {
  const popupContainer = document.createElement('div');
  popupContainer.className = 'popup-container';
  popupContainer.style.backgroundColor = 'white'; 

  const popup = document.createElement('div');
  popup.className = 'popup';

  const symbolIcon = document.createElement('div');
  symbolIcon.className = 'symbol';
  symbolIcon.innerHTML = symbol;

  const popupText = document.createElement('div');
  popupText.className = 'popup-text';
  popupText.textContent = message;

  popup.appendChild(symbolIcon);
  popup.appendChild(popupText);
  popupContainer.appendChild(popup);
  document.body.appendChild(popupContainer);

  setTimeout(() => {
      popupContainer.remove();
  }, 3000);
}

function loginUser() {
  // Check if reCAPTCHA is filled
  // const recaptchaResponse = grecaptcha.getResponse();
  // if (!recaptchaResponse) {
  //     alert('Please fill the reCAPTCHA to login.');
  //     return false; // Prevent form submission
  // }

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username.trim() || !password.trim()) {
      showPopup('Please enter valid username and password.', '❌');
      return false; 
  }

  const registeredData = JSON.parse(localStorage.getItem('registeredData')) || [];

  const user = registeredData.find(entry => entry.username === username && entry.password === password);
 

  if (user) {
      showPopup('Login successful!', '✅');
      
      localStorage.setItem('currentUser', JSON.stringify(user));
  
      sessionStorage.setItem('isLoggedIn', 'true');
      
      setTimeout(() => {
          window.location.href = 'index.html';
      }, 3000);
  } else {
      showPopup('Login failed. Please check your credentials and try again.', '❌');
  }
  
}


function registerUser() {

  const name = document.getElementById('name').value;
  const mobile = document.getElementById('mobile').value;
  const email = document.getElementById('email').value;
  const age = document.getElementById('age').value;
  const regUsername = document.getElementById('regUsername').value;
  const regPasswordInput = document.getElementById('regPassword');
  const regPassword = regPasswordInput.value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const termsChecked = document.getElementById('terms').checked;

  const mobileRegex = /^[6-9]\d{9}$/; 
  const validMobile = mobileRegex.test(mobile);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const validEmail = emailRegex.test(email);

  if (!name || !validMobile || !validEmail || !age || !regUsername || !regPassword || !confirmPassword || !termsChecked) {
      showPopup('Please fill all details correctly.', '❌');
      return;
  }

  if (regPassword !== confirmPassword) {
      showPopup('Passwords do not match.', '❌');
      return;
  }

  const registeredData = JSON.parse(localStorage.getItem('registeredData')) || [];

  if (registeredData.some(entry => entry.username === regUsername)) {
      showPopup('Username is already taken. Please choose a different one.', '❌');
      return;
  }

  
  if (email !== verifiedEmail) {
      showPopup('Please verify your email before successful registration.', '❌');
      return;
  }
  localStorage.removeItem('tempUserDetails');

  const newUser = {
      name,
      mobile,
      email,
      age,
      username: regUsername,
      password: regPassword
  };

  registeredData.push(newUser);
  localStorage.setItem('registeredData', JSON.stringify(registeredData));

  showPopup('Registration successful! You can now log in.', '✅');
  setTimeout(() => {
      window.location.href = 'login.html';
  }, 3000);
}

function togglePasswordVisibility() {
  const regPasswordInput = document.getElementById('regPassword');
  regPasswordInput.type = regPasswordInput.type === 'password' ? 'text' : 'password';
}

function validateMobile() {
  const mobileInput = document.getElementById('mobile');
  const mobileLabel = document.getElementById('mobileLabel');
  const mobileRegex = /^[6-9]\d{9}$/;

  if (mobileRegex.test(mobileInput.value)) {
      mobileLabel.style.color = 'black'; 
  } else {
      mobileLabel.style.color = 'red'; 
  }
}

function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailLabel = document.getElementById('emailLabel');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(emailInput.value)) {
      emailLabel.style.color = 'black'; 
  } else {
      emailLabel.style.color = 'red'; 
  }
}

function validatePassword() {
  const passwordInput = document.getElementById('regPassword');
  const passwordLabel = document.getElementById('passwordLabel');
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (passwordRegex.test(passwordInput.value)) {
      passwordLabel.style.color = 'black'; 
  } else {
      passwordLabel.style.color = 'red'; 
  }
}

function togglePasswordVisibility(passwordFieldId) {
  const passwordField = document.getElementById(passwordFieldId);
  passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}

let verifiedEmail = ""; 

function SendOTP() {
  const email = document.getElementById("email");
  const otpverify = document.getElementsByClassName("email-verify")[0];

  let otp_code = Math.floor(Math.random() * 1000000);
  let emailbody = `<h1>Greetings from Ecospherehub. Your OTP is:</h1>${otp_code}<h2>Thanks for choosing us</h2><h2>Team Ecospherehub <br> support : ecospherehub@gmail.com</h2>`;

  Email.send({
      SecureToken: "91a228f6-639f-48fd-9083-f7c28af0b798",
      To: email.value,
      From: "Ecospherehub@gmail.com",
      Subject: "OTP FOR ECOSPHEREHUB REGISTRATION",
      Body: emailbody,
  }).then(message => {
      if (message === "OK") {
          alert("OTP sent to your email " + email.value);

          otpverify.style.display = "flex";
          let otp_inp = document.getElementById("otp-input");
          let otp_btn = document.getElementById("btn-verify-otp");

          otp_btn.addEventListener("click", () => {
              if (otp_inp.value == otp_code) {
                  alert("Email address verified...");
                  otpverify.style.display = "none";
                  verifiedEmail = email.value; 
                  email.value = verifiedEmail; 
                  otp_inp.value = "";

              } else {
                  alert("Invalid OTP");
              }
          });
      }
  });
}

let generatedOTP = "";
let timer = 55;
let interval;

// SWITCH
function showSignup(){
 document.getElementById("loginBox").classList.add("hidden");
 document.getElementById("signupBox").classList.remove("hidden");
}

function showLogin(){
 document.getElementById("signupBox").classList.add("hidden");
 document.getElementById("forgotBox").classList.add("hidden");
 document.getElementById("loginBox").classList.remove("hidden");
}

function showForgot(){
 document.getElementById("loginBox").classList.add("hidden");
 document.getElementById("forgotBox").classList.remove("hidden");
}

// SIGNUP
function signup(){
 let phone = document.getElementById("signupPhone").value;
 let pass = document.getElementById("signupPass").value;

 if(phone.length !== 10){
  alert("Enter valid phone ❌");
  return;
 }

 localStorage.setItem("phone", phone);
 localStorage.setItem("pass", pass);

 alert("Signup Success ✅");
 showLogin();
}

// LOGIN
function login(){
 let phone = document.getElementById("loginPhone").value;
 let pass = document.getElementById("loginPass").value;

 let savedPhone = localStorage.getItem("phone");
 let savedPass = localStorage.getItem("pass");

 if(phone === savedPhone && pass === savedPass){
  alert("Login Success 🎉");
 }else{
  alert("Wrong Details ❌");
 }
}

// SEND OTP
function sendOTP(){
 let phone = document.getElementById("forgotPhone").value;
 let savedPhone = localStorage.getItem("phone");

 if(phone !== savedPhone){
  alert("Phone not found ❌");
  return;
 }

 generatedOTP = Math.floor(1000 + Math.random() * 9000);
 alert("OTP: " + generatedOTP);

 document.getElementById("otpSection").classList.remove("hidden");

 startTimer();
}

// TIMER
function startTimer(){
 timer = 55;
 document.getElementById("timer").innerText = timer;

 interval = setInterval(()=>{
  timer--;
  document.getElementById("timer").innerText = timer;

  if(timer <= 0){
   clearInterval(interval);
   alert("OTP Expired ❌");
  }
 },1000);
}

// VERIFY OTP
function verifyOTP(){
 let otp = document.getElementById("otpInput").value;
 let newPass = document.getElementById("newPass").value;

 if(otp == generatedOTP){
  localStorage.setItem("pass", newPass);
  alert("Password Updated ✅");
  showLogin();
 }else{
  alert("Wrong OTP ❌");
 }
}
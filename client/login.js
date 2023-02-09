import { changeServices } from './index.mjs';

const reg_btn = document.querySelector("#clientRegBtn");
reg_btn.addEventListener("click", () => {
  const nameInput = document.querySelector("#clientRegName");
  const name = nameInput.value;
  nameInput.value = "";
  //   console.log(name);
  const passInput = document.querySelector("#clientRegPassword");
  const pass = passInput.value;
  passInput.value = "";
  const confirmPass = document.querySelector("#clientConfirmPassword");
  const confirmPassWord = confirmPass.value;
  confirmPass.value = "";

  if (pass === confirmPassWord) {
    // console.log(1)
    fetch("http://localhost:5000/register", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
        pass: pass,
      }),
    })
      .then((response) => response.json())
      .then((data) => registerOrNot(data["data"]));
  } else {
    alert("Passwords did not match. Enter again");
  }
});

function registerOrNot(data) {
  if (data == true) {
    alert("registered successfully");
  }
  location.reload();
}

const login_btn = document.querySelector("#loginPageBtn");
login_btn.addEventListener("click", () => {
  const nameInput = document.querySelector("#clientName");
  const name = nameInput.value;
  nameInput.value = "";
  //   console.log(name);
  const passInput = document.querySelector("#clientPassword");
  const pass = passInput.value;
  passInput.value = "";
    // console.log(1)
    fetch("http://localhost:5000/searchUserName/" + pass)
      .then((response) => response.json())
      .then((data) => AfterLogin(data["data"]));
     
});
function AfterLogin(data){
    // console.log('hi')
    if(data.length === 0){

        alert('please register');
        // location.reload();
    }
    else{
        // alert('login successfull');
        window.location.replace('http://localhost:5501/client/index.html');
        changeServices();
    }
}




const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const input = document.querySelectorAll('input');

const lemail = document.querySelector('#lemail');
const lpass = document.querySelector('#lpassword');

const signup = document.querySelector('#signup-form');
const login = document.querySelector('#login-form');

const fNerror = document.getElementById('firstNerror');
const lNerror = document.getElementById('lastNerror');
const emerror = document.getElementById('emailerror');
const pWerror = document.getElementById('passerror');

const lemerror = document.getElementById('lemailerror');
const lpWerror = document.getElementById('lpasserror');

const Emessage = document.querySelector('#espan');

const vname = /^[a-zA-Z]+$/;
const vemail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const vpass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

if(signup){
  signup.addEventListener('submit', function(e) {
    e.preventDefault();

    const firstnamevalue = firstname.value.trim();
    const lastnamevalue = lastname.value.trim();
    const emailvalue = email.value.trim();
    const passwordvalue = password.value.trim();

    if(firstnamevalue == ''){
      fNerror.textContent = 'Firstname is required.';
      fNerror.classList.add('error');
      firstname.style.border = '2px solid red';
    } else if(firstnamevalue.length < 2){
      fNerror.textContent = 'Firstname must be greater than or equal to 2 letters.';
      fNerror.classList.add('error');
      firstname.style.border = '2px solid red';
    } else if(!firstnamevalue.match(vname)){
      fNerror.textContent = 'Invalid Firstname.';
      fNerror.classList.add('error');
      firstname.style.border = '2px solid red';
    } else {
      var fv = firstnamevalue;
      fNerror.textContent = '';
      firstname.style.border = '2px solid green';
    }

    if(lastnamevalue == ''){
      lNerror.textContent = 'Lastname is required.';
      lNerror.classList.add('error');
      lastname.style.border = '2px solid red';
    } else if(lastnamevalue.length < 2){
      lNerror.textContent = 'Lastname must be greater than or equal to 2 letters.';
      lNerror.classList.add('error');
      lastname.style.border = '2px solid red';
    } else if(!lastnamevalue.match(vname)){
      lNerror.textContent = 'Invalid Lastname.';
      lNerror.classList.add('error');
      lastname.style.border = '2px solid red';
    } else {
      var lv = lastnamevalue;
      lNerror.textContent = '';
      lastname.style.border = '2px solid green';
    }

    if(emailvalue == ''){
      emerror.textContent = 'Email is required.';
      emerror.classList.add('error');
      email.style.border = '2px solid red';
    } else if(!emailvalue.match(vemail)){
      emerror.textContent = 'Invalid Email.';
      emerror.classList.add('error');
      email.style.border = '2px solid red';
    } else {
      var ev = emailvalue;
      emerror.textContent = '';
      email.style.border = '2px solid green';
    }

    if(passwordvalue == ''){
      pWerror.textContent = 'Password is required.';
      pWerror.classList.add('error');
      password.style.border = '2px solid red';
    } else if(!passwordvalue.match(vpass)){
      pWerror.textContent = 'Minimum length required is 8, at least one letter, \n one number, and one special character.';
      pWerror.classList.add('error');
      password.style.border = '2px solid red';
    } else {
      var pv = passwordvalue;
      pWerror.textContent = '';
      password.style.border = '2px solid green';
    }

    const user = {
      firstname: fv,
      lastname: lv,
      email: ev,
      password: pv,
    }
    if (firstnamevalue === '' && lastnamevalue === '' && emailvalue === '' && passwordvalue === '') {
        Emessage.innerText = 'All fields are required.';
        Emessage.classList.remove('success-message');
        Emessage.classList.add('error-message');
    } else if (user.firstname != null || user.lastname != null || user.email != null || user.password != null){
        Emessage.innerText = '';
        Emessage.classList.remove('success-message');
        Emessage.classList.remove('error-message');
    }

    if(user.firstname != null && user.lastname != null && user.email != null && user.password != null){
        Emessage.innerText = 'Account successfully created.';
        Emessage.classList.remove('error-message');
        Emessage.classList.add('success-message');

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
        const json = JSON.stringify(user);

        localStorage.setItem('user', json);

        window.location.href = 'login.html';

    }

  });
}

if(login){
  login.addEventListener('submit', function(e){
    e.preventDefault();

    const lemailvalue = lemail.value.trim();
    const lpassvalue = lpass.value.trim();

    if(lemailvalue == ''){
      lemerror.textContent = 'Email is required.';
      lemerror.classList.add('error');
      lemail.style.border = '2px solid red';
    } else if(!lemailvalue.match(vemail)){
      lemerror.textContent = 'Invalid Email.';
      lemerror.classList.add('error');
      lemail.style.border = '2px solid red';
    } else {
      lemerror.textContent = '';
      lemail.style.border = '2px solid green';
    }

    if(lpassvalue == ''){
      lpWerror.textContent = 'Password is required.';
      lpWerror.classList.add('error');
      lpass.style.border = '2px solid red';
    } else {
      lpWerror.textContent = '';
      lpass.style.border = '2px solid green';
    }

    if (lemailvalue === '' && lpassvalue === '') {
      Emessage.innerText = 'All fields are required.';
      Emessage.classList.remove('success-message');
      Emessage.classList.add('error-message');
    } else if(lemailvalue === '' || lpassvalue === '') {
      Emessage.innerText = '';
      Emessage.classList.remove('success-message');
      Emessage.classList.remove('error-message');
    }
    
    let user = localStorage.getItem('user');
    let key = JSON.parse(user);
    
    if(lemailvalue != '' && lpassvalue != '') {

      if(lemailvalue == key.email && lpassvalue == key.password){
          Emessage.innerText = 'Successfully Logged In.';
          Emessage.classList.remove('error-message');
          Emessage.classList.add('success-message');
          window.location.href = 'member.html';
          return false;
      }
    }
  });
}

function myFunction() {
	var x2 = document.getElementById("showPassword2");
  if (x2.checked){ 
    password.type = "text";
    lpass.type = "text";
  } else {
    password.type = "password";
    lpass.type = "password";
  }
}

function myFunction2() {
	var x2 = document.getElementById("showPassword");
  if (x2.checked){
    lpass.type = "text";
  } else {
    lpass.type = "password";
  }
}

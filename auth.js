const loginBox=document.getElementById('login-box');
const signupBox=document.getElementById('signup-box');
const message=document.getElementById('message');

function showMessage(text){
  message.textContent=text;
  message.classList.add('show');
}

document.getElementById('show-signup').addEventListener('click',()=>{
  loginBox.classList.remove('active');
  signupBox.classList.add('active');
  message.classList.remove('show');
});

document.getElementById('show-login').addEventListener('click',()=>{
  signupBox.classList.remove('active');
  loginBox.classList.add('active');
  message.classList.remove('show');
});

document.getElementById('signup-form').addEventListener('submit',(e)=>{
  e.preventDefault();
  showMessage('Account form submitted. Real account creation will be connected to the database in the next backend step.');
});

document.getElementById('login-form').addEventListener('submit',(e)=>{
  e.preventDefault();
  showMessage('Login form submitted. Secure authentication will be connected in the next backend step.');
});

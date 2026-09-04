const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const form = document.getElementById("authForm");
const modeTitle = document.getElementById("modeTitle");
const submitBtn = document.getElementById("submitBtn");
const switchText = document.getElementById("switchText");
const switchBtn = document.getElementById("switchBtn");
const nameField = document.getElementById("nameField");
const message = document.getElementById("message");

let isSignup = true;

function showMessage(text, type = "") {
  message.textContent = text;
  message.className = "message " + type;
}

function updateMode() {
  if (isSignup) {
    modeTitle.textContent = "Create your account";
    submitBtn.textContent = "Create Account";
    nameField.style.display = "block";
    switchText.textContent = "Already have an account?";
    switchBtn.textContent = "Login";
  } else {
    modeTitle.textContent = "Welcome back";
    submitBtn.textContent = "Login";
    nameField.style.display = "none";
    switchText.textContent = "Don't have an account?";
    switchBtn.textContent = "Create Account";
  }
  showMessage("");
}

switchBtn.addEventListener("click", () => {
  isSignup = !isSignup;
  updateMode();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  showMessage("Please wait...");

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const fullName = document.getElementById("fullName").value.trim();

  if (!email || !password) {
    showMessage("Email aur password enter karein.", "error");
    return;
  }

  if (isSignup) {
    if (!fullName) {
      showMessage("Apna naam enter karein.", "error");
      return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (error) {
      showMessage(error.message, "error");
      return;
    }

    if (data.session) {
      window.location.href = "index.html";
    } else {
      showMessage(
        "Account create ho gaya. Apni email check karke confirmation link par click karein, phir Login karein.",
        "success"
      );
    }
  } else {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      showMessage(error.message, "error");
      return;
    }

    if (data.session) {
      window.location.href = "index.html";
    }
  }
});

updateMode();

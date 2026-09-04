const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
let currentUser = null;

async function requireAuth() {
  const { data, error } = await supabaseClient.auth.getSession();
  if (error || !data.session) { window.location.href = "auth.html"; return null; }
  currentUser = data.session.user;
  return currentUser;
}

async function loadProfile() {
  const { data, error } = await supabaseClient.from("profiles").select("full_name, business_name").eq("id", currentUser.id).maybeSingle();
  if (error) { console.error(error); return; }
  const fullName = data?.full_name || currentUser.user_metadata?.full_name || "User";
  const businessName = data?.business_name || "";
  document.getElementById("userName").textContent = fullName;
  document.getElementById("userEmail").textContent = currentUser.email || "";
  document.getElementById("welcomeName").textContent = fullName.split(" ")[0];
  document.getElementById("avatar").textContent = fullName.charAt(0).toUpperCase();
  document.getElementById("profileName").value = fullName;
  document.getElementById("businessName").value = businessName;
  document.getElementById("businessText").textContent = businessName || "Set up your business profile to get started.";
}

async function loadAgents() {
  const grid = document.getElementById("agentGrid");
  const { data, error } = await supabaseClient.from("agents").select("id, name, description").order("id");
  if (error) { grid.innerHTML = `<p>Agents load nahi ho sake: ${escapeHtml(error.message)}</p>`; return; }
  grid.innerHTML = data.map(agent => `<div class="agent-card"><div class="agent-icon">AI</div><h3>${escapeHtml(agent.name)}</h3><p>${escapeHtml(agent.description || "AI assistant for your business.")}</p><button class="secondary" data-agent="${agent.id}">Select Agent</button></div>`).join("");
  grid.querySelectorAll("[data-agent]").forEach(button => button.addEventListener("click", () => selectAgent(button.dataset.agent)));
}

async function selectAgent(agentId) {
  const { error } = await supabaseClient.from("client_agents").upsert({ client_id: currentUser.id, agent_id: Number(agentId) }, { onConflict: "client_id,agent_id" });
  if (error) { alert("Agent select nahi ho saka: " + error.message); return; }
  alert("Agent successfully selected! ✅");
}

async function saveProfile(event) {
  event.preventDefault();
  const fullName = document.getElementById("profileName").value.trim();
  const businessName = document.getElementById("businessName").value.trim();
  const msg = document.getElementById("profileMessage");
  const { error } = await supabaseClient.from("profiles").update({ full_name: fullName, business_name: businessName }).eq("id", currentUser.id);
  if (error) { msg.textContent = error.message; msg.className = "message error"; return; }
  msg.textContent = "Profile saved successfully! ✅";
  msg.className = "message success";
  await loadProfile();
}

function setupNavigation() {
  const items = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".section");
  const title = document.getElementById("pageTitle");
  function showSection(name) {
    sections.forEach(s => s.classList.toggle("active", s.id === name));
    items.forEach(i => i.classList.toggle("active", i.dataset.section === name));
    const active = document.querySelector(`.nav-item[data-section="${name}"]`);
    title.textContent = active ? active.textContent : "Dashboard";
  }
  items.forEach(item => item.addEventListener("click", () => showSection(item.dataset.section)));
  document.querySelectorAll("[data-go]").forEach(button => button.addEventListener("click", () => showSection(button.dataset.go)));
}

function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c])); }

document.getElementById("logoutBtn").addEventListener("click", async () => { await supabaseClient.auth.signOut(); window.location.href = "auth.html"; });

(async function init() {
  const user = await requireAuth();
  if (!user) return;
  setupNavigation();
  document.getElementById("profileForm").addEventListener("submit", saveProfile);
  await loadProfile();
  await loadAgents();
})();

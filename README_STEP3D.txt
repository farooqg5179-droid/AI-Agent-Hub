AI Agent Hub - Step 3D

Purpose: Secure the dashboard with Supabase Auth and show the logged-in user's profile.

Files in this step:
- index.html
- app.js
- style.css

Keep these existing Step 3C files in the repository root:
- auth.html
- auth.css
- auth.js
- supabase-config.js

What this step does:
- Logged-out users are redirected to auth.html.
- Logged-in user's name and email appear in the dashboard.
- Business profile can be saved to public.profiles.
- AI Agents are loaded from Supabase.
- Selecting an agent creates a client_agents record for the logged-in user.
- Logout signs out from Supabase.

GitHub commit message:
Secure dashboard with Supabase Auth

Next step: Step 4 - real AI Agent setup and Knowledge Base storage.

# AI Agent Hub - Step 3C

This step connects the Login/Signup UI to Supabase Auth.

Files:
- auth.html
- auth.css
- auth.js
- supabase-config.js

Important:
- The Supabase URL and publishable key are client-side values.
- Never add a Supabase service_role/secret key to frontend files.
- RLS from Step 3B protects database access.

GitHub:
1. Upload/replace these files in the repository root.
2. Commit message: Connect Supabase Auth
3. GitHub Actions/Pages can then serve the updated frontend.

Testing:
- Open auth.html.
- Create an account with email, name and password.
- If email confirmation is enabled, confirm the email.
- Login with the same account.
- Successful login redirects to index.html.

Next step after testing:
Step 3D will protect the dashboard and show the logged-in user's business/profile data.

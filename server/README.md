# GitHub Contributors API Backend

This backend securely fetches and caches GitHub contributors for your website, using a personal access token for higher rate limits. It is designed to be used with a static frontend and a production web server like Nginx.

---

## How It Works

- **Flask API** fetches contributors from the GitHub API and caches the data, refreshing only after 3am each day.
- **Frontend JavaScript** fetches from `/api/contributors` and displays avatars, commit counts, and code stats.
- **GitHub token** is kept secret on the backend, never exposed to the browser.

---

## Local Development

1. **Install dependencies:**
   ```bash
   pip install flask flask-cors requests
   ```

2. **Set your GitHub token (in the same terminal):**
   ```powershell
   $env:GITHUB_TOKEN="your_token_here"
   python server/contributors_api.py
   ```
   - On Linux/macOS:
     ```bash
     export GITHUB_TOKEN=your_token_here
     python server/contributors_api.py
     ```

3. **Visit** [http://localhost:5000/api/contributors](http://localhost:5000/api/contributors) to see the API output.

4. **Frontend** should fetch from `http://localhost:5000/api/contributors`.

---

## Production Deployment with Nginx

1. **Run Flask with Gunicorn:**
   ```bash
   pip install gunicorn
   $env:GITHUB_TOKEN="your_token_here"
   gunicorn -w 4 -b 127.0.0.1:5000 server.contributors_api:app
   ```

2. **Nginx config example:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       root /path/to/your/html/root;
       index index.html;

       location / {
           try_files $uri $uri/ =404;
       }

       location /api/ {
           proxy_pass http://127.0.0.1:5000/api/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

3. **Restart Nginx and Gunicorn as needed.**

---

## Security Notes
- **Never expose your GitHub token in frontend code or public repos.**
- The token is only used on the backend.
- CORS is handled by Flask-CORS for local dev; in production, Nginx serves both frontend and backend on the same domain, so CORS is not an issue.

---

## Troubleshooting
- If you see `[DEBUG] Using token: NO`, make sure you set the environment variable in the same terminal before starting the server.
- If the API returns `[]`, GitHub may be processing stats; try again in a few minutes.
- Check browser console and network tab for errors if contributors do not display.

---

## Credits
- Backend: Python Flask, Flask-CORS, Requests
- Frontend: Vanilla JS
- Proxy: Nginx

---

For questions or help, contact the Cyber Security Club, Uttara University.

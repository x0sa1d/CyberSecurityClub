import os
import time
import requests
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

OWNER = "Cyber-Security-Club-Uttara-University"
REPO = "CyberSecurityClub"
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")  # Set this in your environment, do NOT hardcode

CACHE = None
CACHE_TIME = 0

# Helper to get next 3am timestamp after last fetch
def get_next_3am(last_fetch):
    last = time.localtime(last_fetch) if last_fetch else time.localtime()
    next3am = time.mktime((last.tm_year, last.tm_mon, last.tm_mday, 3, 0, 0, 0, 0, -1))
    if time.mktime(last) >= next3am:
        # Move to next day
        next3am += 86400
    return next3am

@app.route('/api/contributors')
def contributors():
    global CACHE, CACHE_TIME
    now = time.time()
    last_fetch = CACHE_TIME
    next3am = get_next_3am(last_fetch)
    if not CACHE or now >= next3am:
        url = f"https://api.github.com/repos/{OWNER}/{REPO}/stats/contributors"
        headers = {"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}
        print(f"[DEBUG] Using token: {'YES' if GITHUB_TOKEN else 'NO'}")
        retries = 6
        contributors = None
        while retries > 0:
            resp = requests.get(url, headers=headers)
            print(f"[DEBUG] GitHub API status: {resp.status_code}")
            if resp.status_code == 403:
                print(f"[DEBUG] Rate limit exceeded: {resp.text}")
            if resp.status_code == 202:
                print("[DEBUG] GitHub is processing stats, retrying...")
                time.sleep(2)
                retries -= 1
                continue
            if resp.status_code != 200:
                print(f"[DEBUG] GitHub API error: {resp.text}")
                break
            contributors = resp.json()
            break
        if contributors:
            CACHE = contributors
            CACHE_TIME = now
    return jsonify(CACHE or [])

if __name__ == '__main__':
    app.run(port=5000, debug=True)

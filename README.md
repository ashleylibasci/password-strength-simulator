# Password Strength Simulator

A client-side cybersecurity training tool for testing sample passwords safely.

## Files

- `index.html` — the main page
- `style.css` — visual styling and layout
- `script.js` — password strength logic and hacker simulation

## Deploy to GitHub Pages

### Option 1: Publish with a GitHub repository

1. Create a new repository on GitHub.
2. Clone it locally or upload the project files.
3. From the project folder, run:

```bash
git init
git add .
git commit -m "Launch Password Strength Simulator"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

4. In the GitHub repo, go to `Settings` > `Pages`.
5. Under `Source`, select the `main` branch and `/ (root)` folder.
6. Save. Your site will publish shortly at `https://<your-username>.github.io/<your-repo-name>/`.

### Option 2: Use GitHub Pages from the GitHub web UI

1. Create a new repository on GitHub.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md`.
3. Go to `Settings` > `Pages`.
4. Choose `main` branch and `/ (root)` folder.
5. Save and wait for your site URL.

## Notes

- This site is fully client-side with no backend.
- No passwords are stored or logged.
- The page works in any modern browser.

## Optional

If you want the site at the repository root domain, use the branch `main` and root folder.
If you want a custom domain, add a `CNAME` file and configure DNS after publishing.
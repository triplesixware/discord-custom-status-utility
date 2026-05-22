# Discord Animated Status Bot

Animated Discord status with growing and fading effect for **⛓️ TRIPLESIXWARE** text.

## Deploy on Railway

1. Fork or upload this repository to GitHub
2. Go to [Railway](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select this repository
5. Add environment variable:
   - `DISCORD_TOKEN` - your Discord token
   - `ANIMATION_SPEED` - (optional) speed in milliseconds, default is 500
6. Railway will automatically deploy the project

## How to get Discord token

1. Open Discord in browser (discord.com/app)
2. Press F12 (DevTools)
3. Go to **Application** tab → **Local Storage** → `https://discord.com`
4. Find the `token` key - copy its value (without quotes)

⚠️ **Important:** Never publish your token on GitHub!

## Local setup

```bash
npm install
# Create .env file with DISCORD_TOKEN=your_token
npm start
```

## How it works

Status animates every 0.5 seconds:
- **Growing**: ⛓️ T → TR → TRI → ... → TRIPLESIXWARE
- **Fading**: TRIPLESIXWARE → ... → TR → T
- **Repeats** infinitely

## Technologies

- Node.js
- Discord API (direct HTTPS requests)
- Works 24/7 on any hosting platform

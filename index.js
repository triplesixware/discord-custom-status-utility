import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const CHAIN_EMOJI = '⛓️';
const TARGET_TEXT = 'TRIPLESIXWARE';
const ANIMATION_SPEED = parseInt(process.env.ANIMATION_SPEED) || 800;

let currentIndex = 1;
let isGrowing = true;

function setCustomStatus(statusText) {
  return new Promise((resolve, reject) => {
    const payload = {
      custom_status: {
        text: statusText,
        emoji_name: null
      }
    };

    const data = JSON.stringify(payload);

    const options = {
      hostname: 'discord.com',
      port: 443,
      path: '/api/v9/users/@me/settings',
      method: 'PATCH',
      headers: {
        'Authorization': process.env.DISCORD_TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data, 'utf8')
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(responseData);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function updateStatus() {
  let displayText;

  if (isGrowing) {
    displayText = TARGET_TEXT.substring(0, currentIndex);
    currentIndex++;

    if (currentIndex > TARGET_TEXT.length) {
      isGrowing = false;
      currentIndex = TARGET_TEXT.length - 1;
    }
  } else {
    displayText = TARGET_TEXT.substring(0, currentIndex);
    currentIndex--;

    if (currentIndex < 1) {
      isGrowing = true;
      currentIndex = 1;
    }
  }

  const statusText = `${CHAIN_EMOJI} ${displayText}`;

  try {
    await setCustomStatus(statusText);
    console.log(`Статус обновлен: ${statusText}`);
  } catch (error) {
    console.error('Ошибка обновления статуса:', error.message);
  }
}

function startAnimation() {
  console.log('Запуск анимации статуса через Discord API...');
  updateStatus();
  setInterval(updateStatus, ANIMATION_SPEED);
}

startAnimation();

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
let gameId;

// this is my Top-Level function
async function createGame() {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'YOUR_GAME_NAME' }),
  });
  const data = await response.json();
  gameId = data.result;
}

async function getScores() {
  const response = await fetch(`${apiUrl}/${gameId}/scores`);
  const data = await response.json();
  return data.result;
}

async function submitScore(name, score) {
  const response = await fetch(`${apiUrl}/${gameId}/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: name, score }),
  });
  const data = await response.json();
  return data.result;
}

export { createGame, getScores, submitScore };

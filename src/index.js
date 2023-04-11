// eslint-disable-next-line no-unused-vars
import _ from 'lodash';

import './style.css';

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
let gameId;

const refreshButton = document.querySelector("button[type='reset']");
const submitForm = document.querySelector('form');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const tableBody = document.querySelector('tbody');

refreshButton.addEventListener('click', async () => {
  try {
    const response = await fetch(`${apiUrl}/${gameId}/scores`);
    const data = await response.json();
    tableBody.innerHTML = '';
    data.result.forEach((score) => {
      const row = document.createElement('tr');
      const name = document.createElement('th');
      name.setAttribute('scope', 'row');
      name.textContent = `${score.user}: ${score.score}`;
      row.appendChild(name);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.log(error);
  }
});

submitForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const score = scoreInput.value.trim();
  if (!name || !score) {
    alert('Please enter both name and score!');
    return;
  }
  try {
    const response = await fetch(`${apiUrl}/${gameId}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: name, score }),
    });
    const data = await response.json();
    alert(data.result);
    nameInput.value = '';
    scoreInput.value = '';
  } catch (error) {
    console.log(error);
  }
});

async function createGame() {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'YOUR_GAME_NAME' }),
    });
    const data = await response.json();
    gameId = data.result;
  } catch (error) {
    console.log(error);
  }
}

createGame();

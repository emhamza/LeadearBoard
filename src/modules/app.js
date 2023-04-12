import { createGame, getScores, submitScore } from './game.js';

const refreshButton = document.querySelector("button[type='reset']");
const submitForm = document.querySelector('form');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const tableBody = document.querySelector('tbody');
const messageContainer = document.getElementById('message-container');

refreshButton.addEventListener('click', async () => {
  const scores = await getScores();
  tableBody.innerHTML = '';
  scores.forEach((score) => {
    const row = document.createElement('tr');
    const name = document.createElement('th');
    name.setAttribute('scope', 'row');
    name.textContent = `${score.user}: ${score.score}`;
    row.appendChild(name);
    tableBody.appendChild(row);
  });
});

submitForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const score = scoreInput.value.trim();
  if (!name || !score) {
    messageContainer.textContent = 'Please enter both name and score!';
    return;
  }
  const result = await submitScore(name, score);
  messageContainer.textContent = result;
  nameInput.value = '';
  scoreInput.value = '';
});

createGame();

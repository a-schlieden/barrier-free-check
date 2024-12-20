
const bodyParser = require('body-parser');
/*  const axe = require('axe-core'); */
const puppeteer = require('puppeteer');
/* const express = require('express'); */




const app = express();
app.use(bodyParser.json());














axe.run(function (err, results) {
  console.log(results.violations);
  console.log(err)
});





/* ---------------------------------------- */



document.getElementById('accessibility-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const url = document.getElementById('url-input').value;

  const response = await fetch('/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });

  if (response.ok) {
    const results = await response.json();
    displayResults(results);
  } else {
    alert('Fehler bei der Analyse!');
  }
});

function displayResults(results) {
  const output = document.getElementById('output');
  output.innerHTML = '';

  results.violations.forEach(issue => {
    const div = document.createElement('div');
    div.innerHTML = `
          <strong>${issue.id}</strong>
          <p>${issue.description}</p>
          <p>Betroffene Elemente: ${issue.nodes.length}</p>
      `;
    output.appendChild(div);
  });

  document.getElementById('results').hidden = false;
}
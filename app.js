
const express = require('express');
const axios = require('axios');
const app = express();
const port = 9876; 

app.use(express.json());

let sN = [];

function calAvg(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

async function fN(numberId) {
  const endpoints = {
    'e': 'even',
    'p': 'primes',
    'f': 'fibo',
    'r': 'rand'
  };

  const endpoint = endpoints[numberId];
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTYyMDE0LCJpYXQiOjE3MTUxNjE3MTQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjZkMWNmMmNmLTFkOWUtNDVjMS04NGRhLTIyYmRmODgyZmU3OSIsInN1YiI6ImlzaGFyaXpoQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiNmQxY2YyY2YtMWQ5ZS00NWMxLTg0ZGEtMjJiZGY4ODJmZTc5IiwiY2xpZW50U2VjcmV0IjoiaFhkQm1VZnlCWk56d0N2ZSIsIm93bmVyTmFtZSI6IkhhcmlzaCBLdW1hciBQIiwib3duZXJFbWFpbCI6ImlzaGFyaXpoQGdtYWlsLmNvbSIsInJvbGxObyI6IjkyMjUyMTI0MzAxNCJ9.oJP-maBHlf85ANTlLRbO18pUEbJEWtYBEp0gtTNEBPI'; // Replace with your actual access token

  const response = await axios.get(`http://20.244.56.144/test/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.numbers;
}

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;
  const wSize = 10; 

  try {
    const fN = await fN(numberid);

    const uN = fN.filter(num => !storedNumbers.includes(num));

    sN = [...sN, ...uN];
    if (sN.length > wSize) {
      sN = sN.slice(-wSize);
    }

    const avg = calAvg(sN);

    const response = {
      windowPrevState: sN.slice(0, -uN.length),
      windowCurrState: sN,
      numbers: uN,
      avg: avg.toFixed(2),
    };
    res.json(response);
  } catch (error) {
    console.error('error', error.message);
    res.status(500).json({ error: 'error' });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

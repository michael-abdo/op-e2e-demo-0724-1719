const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes for specific pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/tools/calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'calculator.html'));
});

// Handle form submissions
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact form submission:', { name, email, message });
  res.json({ 
    success: true, 
    message: 'Thank you for your message! We will get back to you soon.' 
  });
});

app.post('/api/calculate', (req, res) => {
  const { 
    contractTitle = 'Test Contract',
    hourlyRate = 150,
    hoursPerWeek = 40,
    weeksPerYear = 52
  } = req.body;
  
  const grossPay = hourlyRate * hoursPerWeek * weeksPerYear;
  const federalTax = grossPay * 0.22;
  const stateTax = grossPay * 0.08;
  const socialSecurity = grossPay * 0.062;
  const medicare = grossPay * 0.0145;
  const totalTax = federalTax + stateTax + socialSecurity + medicare;
  const netPay = grossPay - totalTax;
  
  console.log('Calculator submission:', { 
    contractTitle, hourlyRate, hoursPerWeek, weeksPerYear,
    grossPay, netPay 
  });
  
  res.json({
    success: true,
    results: {
      contractTitle,
      grossPay: Math.round(grossPay),
      netPay: Math.round(netPay),
      totalTax: Math.round(totalTax),
      breakdown: {
        federalTax: Math.round(federalTax),
        stateTax: Math.round(stateTax),
        socialSecurity: Math.round(socialSecurity),
        medicare: Math.round(medicare)
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Demo app running on port ${PORT}`);
  console.log(`📱 Local: http://localhost:${PORT}`);
  if (process.env.PORT) {
    console.log(`🌐 Heroku: https://your-app-name.herokuapp.com`);
  }
});

module.exports = app;
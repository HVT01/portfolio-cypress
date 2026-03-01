const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('app/public'))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === '1234') {
    return res.json({ success: true })
  }
  res.status(401).json({ success: false })
})

app.listen(3000, '0.0.0.0', () => console.log('App running on port 3000'))
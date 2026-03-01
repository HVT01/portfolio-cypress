const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())

// ---------------------------------------------------
// Static Files (Frontend)
// ---------------------------------------------------
const staticPath = path.join(__dirname, 'public')
app.use(express.static(staticPath))
console.log(__dirname)
console.log(staticPath)
// ---------------------------------------------------
// API ROUTES
// ---------------------------------------------------

// Health endpoint (für CI / start-server-and-test)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body

  if (username === 'admin' && password === '1234') {
    return res.status(200).json({ success: true })
  }

  res.status(401).json({ success: false })
})

// ---------------------------------------------------
// SPA FALLBACK (GANZ AM ENDE!)
// ---------------------------------------------------
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})

// ---------------------------------------------------
// Server Start
// ---------------------------------------------------
const PORT = 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App running on port ${PORT}`)
})
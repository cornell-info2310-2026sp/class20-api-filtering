import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb';
const port = process.env.PORT || 8080
const app = express()
app.use(cors())
app.use(express.json())

// path to the public folder
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.locals.publicPath = path.join(__dirname, 'public')

// log every request to the console
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('>', req.method, req.path + (Object.keys(req.query).length > 0 ? `?${new URLSearchParams(req.query).toString()}` : ''))
  next()
})

// Delay every request by a few seconds (helps to demonstrate that data is coming from another source.)
app.use((req, res, next) => {
  // DO NOT REMOVE. DO NOT MODIFY.
  const delay = 1 * 1000
  setTimeout(() => {
    next()
  }, delay)
})

///////////////////////////////////////////

// ---> Change nothing above this line <---


// Connect to MongoDB
const client = new MongoClient(process.env.MONGODB_URI)
try {
  const conn = await client.connect()
  // Keep the database reference available for future routes.
  app.locals.db = conn.db('app')
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('failed to connect to mongodb:', error)
  process.exit(1)
}


// GET / or GET /index.html
app.get(['/', '/index.html'], (req, res) => {
  // serve the index.html file located in publicPath
  res.sendFile(path.join(app.locals.publicPath, 'index.html'))
})

// GET /styles/site.css
app.get('/styles/site.css', (req, res) => {
  // serve the file located in publicPath
  // res.sendFile(path.join(publicPath, "/styles/site.css"))
  res.sendFile(path.join(app.locals.publicPath, req.route.path))
})

// GET /api/produce
app.get('/api/produce', async (req, res) => {
  const documents = await app.locals.db.collection('produce')
    .find()
    .toArray();

  res.status(200).json(documents)
})

// GET /api/produce/:id
app.get('/api/produce/:id', async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const id = new ObjectId(req.params.id);
    const produce = await app.locals.db.collection('produce').findOne({ _id: id });

    if (produce) {
      res.status(200).json(produce);
    } else {
      res.status(404).send()
    }
  } else {
    res.status(404).send();
  }
});


///////////////////////////////////////////

// ---> Change nothing below this line <---

/* eslint-disable no-console, no-unused-vars */

// 404 - not found
app.use((req, res, next) => {
  res.status(404).json({ message: 'resource ' + req.url + ' not found' })
})

// 500 - Any server error
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send()
})

// start server on port
const server = app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}/`)
})
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`error: port ${port} is already in use!`, 'kill this server! (control + c)')
    process.exit(1)
  } else {
    console.error('server error:', error)
  }
})

const express = require("express")
const cors = require("cors")
const properties = require("./data/properties")
const propertyDetails = require("./data/propertyDetails")

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// GET /api/properties — list all
app.get("/api/properties", (req, res) => {
  res.json(properties)
})

// GET /api/properties/:id — get one (returns full detail with rooms)
app.get("/api/properties/:id", (req, res) => {
  const property = propertyDetails.find((p) => p.id === req.params.id)

  if (!property) {
    return res.status(404).json({ error: "Property not found" })
  }

  res.json(property)
})

// POST /api/properties — create new
app.post("/api/properties", (req, res) => {
  const { title, location, type, price, rating, image } = req.body

  if (!title || !location || !type || !price) {
    return res.status(400).json({ error: "title, location, type and price are required" })
  }

  const newProperty = {
    id: `prop-${Date.now()}`,
    title,
    location,
    type,
    price,
    rating: rating ?? 0,
    image: image ?? "",
  }

  properties.push(newProperty)
  res.status(201).json(newProperty)
})

// PUT /api/properties/:id — update
app.put("/api/properties/:id", (req, res) => {
  const index = properties.findIndex((p) => p.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ error: "Property not found" })
  }

  properties[index] = { ...properties[index], ...req.body, id: req.params.id }
  res.json(properties[index])
})

// DELETE /api/properties/:id — delete
app.delete("/api/properties/:id", (req, res) => {
  const index = properties.findIndex((p) => p.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ error: "Property not found" })
  }

  const deleted = properties.splice(index, 1)[0]
  res.json({ message: "Deleted successfully", property: deleted })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log(`  GET    http://localhost:${PORT}/api/properties`)
  console.log(`  GET    http://localhost:${PORT}/api/properties/:id`)
  console.log(`  POST   http://localhost:${PORT}/api/properties`)
  console.log(`  PUT    http://localhost:${PORT}/api/properties/:id`)
  console.log(`  DELETE http://localhost:${PORT}/api/properties/:id`)
})

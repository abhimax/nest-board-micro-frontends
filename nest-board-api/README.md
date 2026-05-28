# nest-board-api

A simple REST API for the nest-board property listing app. Built with Node.js and Express. Data is stored in memory — changes reset on restart.

## Requirements

- Node.js installed

## Setup

```bash
npm install
node server.js
```

Server runs at `http://localhost:3001`

---

## Endpoints

### Get all properties

```
GET /api/properties
```

Response: array of 12 properties.

---

### Get a single property

```
GET /api/properties/:id
```

Example: `GET /api/properties/prop-001`

**404** if the id does not exist.

---

### Create a property

```
POST /api/properties
Content-Type: application/json
```

**Required fields:** `title`, `location`, `type`, `price`  
**Optional fields:** `rating`, `image`

Request body:
```json
{
  "title": "My Place",
  "location": "Colombo 05, Sri Lanka",
  "type": "Apartment",
  "price": "12K",
  "rating": 4.2,
  "image": "https://example.com/image.jpg"
}
```

Response: the created property with a generated `id`.  
**400** if required fields are missing.

---

### Update a property

```
PUT /api/properties/:id
Content-Type: application/json
```

Send only the fields you want to change:
```json
{
  "price": "25K",
  "rating": 4.9
}
```

Response: the updated property.  
**404** if the id does not exist.

---

### Delete a property

```
DELETE /api/properties/:id
```

Example: `DELETE /api/properties/prop-001`

Response:
```json
{
  "message": "Deleted successfully",
  "property": { ... }
}
```

**404** if the id does not exist.

---

## Property shape

```json
{
  "id": "prop-001",
  "title": "Sunset Apartment",
  "location": "Ethul Kotte, Sri Lanka",
  "type": "Apartment",
  "price": "20K",
  "rating": 4.8,
  "image": "https://..."
}
```

## Property types

`Apartment` `House` `Villa` `Hotel`

## Note

Data lives in memory. Restarting the server resets all changes back to the original 12 properties.

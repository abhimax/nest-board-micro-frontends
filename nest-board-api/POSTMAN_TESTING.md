# Postman Testing Guide — nest-board-api

Base URL: `http://localhost:3001`

Make sure the server is running before testing:
```bash
npm start
```

---

## Setup in Postman

1. Open Postman
2. Click **New** → **Collection** → name it `nest-board-api`
3. For each request below: click **Add a request** inside the collection, fill in the method, URL, and body as shown

---

## 1. Get all properties

| Field  | Value |
|--------|-------|
| Method | `GET` |
| URL    | `http://localhost:3001/api/properties` |

No body needed. Hit **Send**.

**Expected response** — `200 OK`, array of 12 properties:
```json
[
  {
    "id": "prop-001",
    "title": "Sunset Apartment",
    "location": "Ethul Kotte, Sri Lanka",
    "type": "Apartment",
    "price": "20K",
    "rating": 4.8,
    "image": "https://..."
  },
  ...
]
```

---

## 2. Get a single property

| Field  | Value |
|--------|-------|
| Method | `GET` |
| URL    | `http://localhost:3001/api/properties/prop-001` |

No body needed. Hit **Send**.

**Expected response** — `200 OK`, full detail with rooms:
```json
{
  "id": "prop-001",
  "title": "Sunset Apartment",
  "address": "45 Temple Road, Ethul Kotte",
  "amenities": ["Apartment", "AC", "WiFi", "Parking"],
  "rating": 4.8,
  "seatsAvailable": 3,
  "minStay": "2 months",
  "startingPrice": "LKR 18K",
  "image": "https://...",
  "rooms": [
    { "id": "r1", "name": "Room A", "price": "20,000", "seatsTotal": 2, "seatsFree": 1, "hasAC": true },
    { "id": "r2", "name": "Room B", "price": "22,000", "seatsTotal": 2, "seatsFree": 1, "hasAC": true },
    { "id": "r3", "name": "Room C", "price": "18,000", "seatsTotal": 3, "seatsFree": 1, "hasAC": false }
  ]
}
```

**Test a 404** — use an id that doesn't exist:
```
GET http://localhost:3001/api/properties/prop-999
```
Expected: `404 Not Found`
```json
{ "error": "Property not found" }
```

---

## 3. Create a property (POST)

| Field        | Value |
|--------------|-------|
| Method       | `POST` |
| URL          | `http://localhost:3001/api/properties` |
| Body type    | `raw` → `JSON` |

In Postman: go to **Body** tab → select **raw** → choose **JSON** from the dropdown on the right.

**Request body:**
```json
{
  "title": "Lake View Residency",
  "location": "Beira Lake, Colombo 02, Sri Lanka",
  "type": "Apartment",
  "price": "19K",
  "rating": 4.3,
  "image": "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&h=500&fit=crop"
}
```

**Expected response** — `201 Created`:
```json
{
  "id": "prop-1717000000000",
  "title": "Lake View Residency",
  "location": "Beira Lake, Colombo 02, Sri Lanka",
  "type": "Apartment",
  "price": "19K",
  "rating": 4.3,
  "image": "https://..."
}
```

> The `id` is auto-generated from the current timestamp — yours will be different.

**Test a 400** — send a body with missing required fields:
```json
{
  "title": "Incomplete Property"
}
```
Expected: `400 Bad Request`
```json
{ "error": "title, location, type and price are required" }
```

---

## 4. Update a property (PUT)

| Field        | Value |
|--------------|-------|
| Method       | `PUT` |
| URL          | `http://localhost:3001/api/properties/prop-003` |
| Body type    | `raw` → `JSON` |

You only need to send the fields you want to change.

**Request body:**
```json
{
  "title": "Urban Nest Premium",
  "price": "26K",
  "rating": 4.9
}
```

**Expected response** — `200 OK`, the full updated property:
```json
{
  "id": "prop-003",
  "title": "Urban Nest Premium",
  "location": "Colombo 03, Sri Lanka",
  "type": "Apartment",
  "price": "26K",
  "rating": 4.9,
  "image": "https://..."
}
```

**Test a 404** — try to update a non-existent id:
```
PUT http://localhost:3001/api/properties/prop-999
```
Expected: `404 Not Found`
```json
{ "error": "Property not found" }
```

---

## 5. Delete a property (DELETE)

| Field  | Value |
|--------|-------|
| Method | `DELETE` |
| URL    | `http://localhost:3001/api/properties/prop-006` |

No body needed. Hit **Send**.

**Expected response** — `200 OK`:
```json
{
  "message": "Deleted successfully",
  "property": {
    "id": "prop-006",
    "title": "The Hideaway",
    "location": "Battaramulla, Sri Lanka",
    "type": "House",
    "price": "17K",
    "rating": 3.9,
    "image": "https://..."
  }
}
```

**Verify the delete** — immediately run:
```
GET http://localhost:3001/api/properties/prop-006
```
Expected: `404 Not Found`
```json
{ "error": "Property not found" }
```

**Test a 404** — try to delete the same id again:
```
DELETE http://localhost:3001/api/properties/prop-006
```
Expected: `404 Not Found`
```json
{ "error": "Property not found" }
```

---

## Quick reference

| # | Action          | Method   | URL                                      | Body required |
|---|-----------------|----------|------------------------------------------|---------------|
| 1 | List all        | `GET`    | `/api/properties`                        | No            |
| 2 | Get one         | `GET`    | `/api/properties/prop-001`               | No            |
| 3 | Create          | `POST`   | `/api/properties`                        | Yes (JSON)    |
| 4 | Update          | `PUT`    | `/api/properties/prop-003`               | Yes (JSON)    |
| 5 | Delete          | `DELETE` | `/api/properties/prop-006`               | No            |

---

## Notes

- Data is **in-memory** — restarting the server resets all changes back to the original 12 properties.
- Always set `Content-Type: application/json` in the **Headers** tab when sending a body (Postman sets this automatically when you pick `raw → JSON`).
- You can use **any** existing `prop-001` through `prop-012` id for GET, PUT, and DELETE tests.

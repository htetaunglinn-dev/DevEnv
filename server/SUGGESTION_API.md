# Suggestion API Documentation

## Base URL
```
http://localhost:8000/api/suggestions
```

## Authentication
Most endpoints require authentication via Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 1. Get All Suggestions
```http
GET /
```
**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category (feature, improvement, bug, other)
- `status` (optional): Filter by status (pending, in-review, approved, rejected, implemented)
- `priority` (optional): Filter by priority (low, medium, high, critical)
- `search` (optional): Search in title, description, and tags
- `sortBy` (optional): Sort field (votes, priority, createdAt)
- `sortOrder` (optional): Sort order (asc, desc)

**Response:**
```json
{
  "message": "Suggestions retrieved successfully",
  "suggestions": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### 2. Get Suggestion by ID
```http
GET /:id
```

### 3. Create New Suggestion
```http
POST /
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "title": "Suggestion title",
  "description": "Detailed description",
  "category": "feature",
  "priority": "medium",
  "tags": ["ui", "enhancement"]
}
```

### 4. Update Suggestion
```http
PUT /:id
```
**Headers:** `Authorization: Bearer <token>`

**Body:** (same as create, all fields optional)

### 5. Delete Suggestion
```http
DELETE /:id
```
**Headers:** `Authorization: Bearer <token>`

### 6. Vote on Suggestion
```http
POST /:id/vote
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "voteType": "upvote"
}
```

### 7. Remove Vote
```http
DELETE /:id/vote
```
**Headers:** `Authorization: Bearer <token>`

### 8. Add Comment
```http
POST /:id/comments
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "message": "This is a great suggestion!"
}
```

### 9. Get User's Suggestions
```http
GET /user/my-suggestions
```
**Headers:** `Authorization: Bearer <token>`

### 10. Get Statistics
```http
GET /stats
```

### 11. Admin Update (Admin Only)
```http
PATCH /:id/admin
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "status": "approved",
  "priority": "high",
  "assignedTo": "user_id"
}
```

## Example Usage

### Create a suggestion:
```bash
curl -X POST http://localhost:8000/api/suggestions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Add dark mode to the application",
    "description": "It would be great to have a dark mode option for better user experience during night time usage.",
    "category": "feature",
    "priority": "medium",
    "tags": ["ui", "accessibility", "theme"]
  }'
```

### Get suggestions with filters:
```bash
curl "http://localhost:8000/api/suggestions?category=feature&status=pending&page=1&limit=5"
```

### Vote on a suggestion:
```bash
curl -X POST http://localhost:8000/api/suggestions/SUGGESTION_ID/vote \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"voteType": "upvote"}'
```
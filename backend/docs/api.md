# Weather Widget API

## Endpoints

### `GET /widgets`

List all widgets

### `POST /widgets`

Create new widget

```json
{
  "location": "berlin|hamburg|paris|jakarta|tokyo|new_york|karlsruhe|pforzheim|korntal-muenchingen"
}
```

### `GET /widgets/:id/weather`

Get widget with live weather data

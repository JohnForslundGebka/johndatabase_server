# johndatabase_server

# Database Overview and Data Import

## Data Import

The `importArticles.js` script has been used to import all data from `industrial.json` into the local database.

---

## Database Representation

### `orders` Table

| Field        | Type      | Null | Key | Default | Extra          |
|--------------|-----------|------|-----|---------|----------------|
| `order_id`   | `char(36)`| NO   | MUL | NULL    |                |
| `product_id` | `int`     | NO   | MUL | NULL    |                |
| `quantity`   | `int`     | NO   |     | NULL    |                |
| `line_item_id` | `int`   | NO   | PRI | NULL    | auto_increment |

---

### `products` Table

| Field         | Type           | Null | Key | Default | Extra          |
|---------------|----------------|------|-----|---------|----------------|
| `id`          | `int`          | NO   | PRI | NULL    | auto_increment |
| `name`        | `varchar(255)` | NO   |     | NULL    |                |
| `articleNumber` | `varchar(50)` | NO   | UNI | NULL    |                |
| `price`       | `decimal(10,2)`| NO   |     | NULL    |                |
| `description` | `text`         | YES  |     | NULL    |                |

---

## Notes

- The `orders` table uses a UUID (`order_id`) for uniquely identifying orders and references the `products` table via `product_id`.
- The `products` table stores detailed information about each product, including name, article number, price, and description.
- The `line_item_id` in the `orders` table acts as a primary key for each individual line item, while `order_id` and `product_id` establish relationships between orders and products.

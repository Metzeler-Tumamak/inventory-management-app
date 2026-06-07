const { Client } = require("pg");
const SQL = `
CREATE TABLE IF NOT EXISTS categories(
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS products(
    id UUID PRIMARY KEY DEFAULT uuidv7(),
    name VARCHAR(100) UNIQUE NOT NULL,
    category_id UUID REFERENCES categories(id),
    available INTEGER NOT NULL,
    minimum INTEGER NOT NULL,
    maximum INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

INSERT INTO categories (name) VALUES
  ('Televisions'),
  ('Audio Systems'),
  ('Home Theater'),
  ('Cameras')
ON CONFLICT (name) DO NOTHING;

INSERT INTO products (name, category_id, available, minimum, maximum, price) VALUES
  ('Samsung 55" 4K QLED TV', (SELECT id FROM categories WHERE name = 'Televisions'), 20, 2, 50, 899.99),
  ('LG 65" OLED TV', (SELECT id FROM categories WHERE name = 'Televisions'), 15, 2, 40, 1499.99),
  ('Sony 43" Full HD TV', (SELECT id FROM categories WHERE name = 'Televisions'), 30, 3, 80, 499.99),
  ('Sonos Beam Soundbar', (SELECT id FROM categories WHERE name = 'Audio Systems'), 25, 3, 60, 399.99),
  ('Bose SoundLink Home Speaker', (SELECT id FROM categories WHERE name = 'Audio Systems'), 30, 5, 80, 299.99),
  ('JBL Bar 5.1 Surround Soundbar', (SELECT id FROM categories WHERE name = 'Home Theater'), 15, 2, 40, 549.99),
  ('Sony HT-A7000 Home Theater System', (SELECT id FROM categories WHERE name = 'Home Theater'), 10, 1, 25, 1299.99),
  ('Sony Alpha ZV-E10 Camera', (SELECT id FROM categories WHERE name = 'Cameras'), 20, 2, 50, 749.99),
  ('Canon EOS M50 Mark II', (SELECT id FROM categories WHERE name = 'Cameras'), 15, 2, 40, 699.99),
  ('Fujifilm X-T30 II', (SELECT id FROM categories WHERE name = 'Cameras'), 12, 2, 35, 899.99)
ON CONFLICT (name) DO NOTHING;
`;

async function main() {
  console.log("seeding");
  const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
  try {
    await client.connect();
    await client.query(SQL);
  } catch (err) {
    console.error(err.message);
  }
  await client.end();
  console.log("done");
}

main();

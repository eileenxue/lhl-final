DROP TABLE IF EXISTS appointments CASCADE;
CREATE TABLE "appointments" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
  "test_id" INTEGER REFERENCES tests(id) ON DELETE CASCADE,
  "is_proctor" BOOLEAN,
  "start_date" DATE
);
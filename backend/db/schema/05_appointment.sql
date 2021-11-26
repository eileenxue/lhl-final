DROP TABLE IF EXISTS appointments CASCADE;
CREATE TABLE "appointments" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "student_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
  "proctor_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
  "test_id" INTEGER REFERENCES tests(id) ON DELETE CASCADE,
  "start_date" DATE
);
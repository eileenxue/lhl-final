DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "appointment_id" INTEGER REFERENCES appointments(id) ON DELETE CASCADE,
  "student_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
  "timestamp" timestamp,
  "message" VARCHAR(255)
);
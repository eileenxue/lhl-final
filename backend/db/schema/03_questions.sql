DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "test_id" INTEGER REFERENCES tests(id) ON DELETE CASCADE,
  "question" VARCHAR(255),
  "answer1" VARCHAR(255),
  "answer2" VARCHAR(255),
  "answer3" VARCHAR(255),
  "answer4" VARCHAR(255)
);
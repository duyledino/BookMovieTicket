-- AlterTable
ALTER TABLE "film" ADD COLUMN     "adult" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "backdrop_path" TEXT NOT NULL DEFAULT 'Movies\frontend\vite-project\src\images\Film-photo-via-Canva-Pro.png',
ADD COLUMN     "overview" TEXT NOT NULL DEFAULT 'some overview',
ADD COLUMN     "poster_path" TEXT NOT NULL DEFAULT 'Movies\frontend\vite-project\src\images\Film-photo-via-Canva-Pro.png',
ADD COLUMN     "tagline" TEXT NOT NULL DEFAULT 'some tagline',
ADD COLUMN     "vote_average" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "genre" (
    "genres_id" TEXT NOT NULL,
    "genres_name" TEXT NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("genres_id")
);

-- CreateTable
CREATE TABLE "language" (
    "iso_639_1" TEXT NOT NULL,
    "english_name" TEXT NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("iso_639_1")
);

-- CreateTable
CREATE TABLE "language_film" (
    "iso_639_1" TEXT NOT NULL,
    "film_id" TEXT NOT NULL,

    CONSTRAINT "language_film_pkey" PRIMARY KEY ("iso_639_1","film_id")
);

-- CreateTable
CREATE TABLE "genres_film" (
    "film_id" TEXT NOT NULL,
    "genres_id" TEXT NOT NULL,

    CONSTRAINT "genres_film_pkey" PRIMARY KEY ("film_id","genres_id")
);

-- AddForeignKey
ALTER TABLE "language_film" ADD CONSTRAINT "language_film_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "film"("film_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "language_film" ADD CONSTRAINT "language_film_iso_639_1_fkey" FOREIGN KEY ("iso_639_1") REFERENCES "language"("iso_639_1") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "genres_film" ADD CONSTRAINT "genres_film_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "film"("film_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "genres_film" ADD CONSTRAINT "genres_film_genres_id_fkey" FOREIGN KEY ("genres_id") REFERENCES "genre"("genres_id") ON DELETE CASCADE ON UPDATE NO ACTION;

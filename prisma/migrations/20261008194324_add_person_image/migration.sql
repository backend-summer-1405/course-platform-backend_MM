-- CreateTable
CREATE TABLE "personImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "personId" TEXT NOT NULL,

    CONSTRAINT "personImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "personImage" ADD CONSTRAINT "personImage_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

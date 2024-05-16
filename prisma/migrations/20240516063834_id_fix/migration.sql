-- AlterTable
ALTER TABLE "trips" ALTER COLUMN "startDate" DROP DEFAULT,
ALTER COLUMN "endDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "userProfiles" ALTER COLUMN "id" SET DEFAULT 'dfsdre';

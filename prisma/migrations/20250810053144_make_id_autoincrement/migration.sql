-- AlterTable
CREATE SEQUENCE "public".contributions_history_id_seq;
ALTER TABLE "public"."contributions_history" ALTER COLUMN "id" SET DEFAULT nextval('"public".contributions_history_id_seq');
ALTER SEQUENCE "public".contributions_history_id_seq OWNED BY "public"."contributions_history"."id";

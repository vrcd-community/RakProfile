-- CreateTable
CREATE TABLE "public"."contributions_history" (
    "id" INTEGER NOT NULL,
    "resource_id" TEXT NOT NULL,
    "logto_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT,

    CONSTRAINT "contributions_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contributions_history_resource_id_idx" ON "public"."contributions_history"("resource_id");

-- CreateIndex
CREATE INDEX "contributions_history_logto_id_idx" ON "public"."contributions_history"("logto_id");

-- CreateIndex
CREATE INDEX "contributions_history_type_idx" ON "public"."contributions_history"("type");

-- CreateIndex
CREATE INDEX "contributions_history_date_idx" ON "public"."contributions_history"("date");

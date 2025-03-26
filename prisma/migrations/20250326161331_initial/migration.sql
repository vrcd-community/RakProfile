-- CreateTable
CREATE TABLE "bookstack_books" (
    "id" INTEGER NOT NULL,
    "slug" TEXT,
    "name" TEXT,
    "description" TEXT,
    "created_at" DATE,
    "updated_at" DATE,
    "owned_by" INTEGER,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "cover_url" TEXT,

    CONSTRAINT "bookstack_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookstack_pages" (
    "name" TEXT,
    "id" INTEGER NOT NULL,
    "slug" TEXT,
    "book_id" INTEGER,
    "chapter_id" INTEGER,
    "draft" BOOLEAN,
    "template" BOOLEAN,
    "created_at" DATE,
    "updated_at" DATE,
    "priority" INTEGER,
    "owned_by" INTEGER,
    "book_slug" TEXT,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "revision_count" INTEGER,
    "editor" TEXT,
    "chars" INTEGER,

    CONSTRAINT "bookstack_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "logto_id" TEXT NOT NULL,
    "avatar" TEXT,
    "name" TEXT,
    "custom_data" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("logto_id")
);

-- CreateTable
CREATE TABLE "user_link" (
    "logto_id" TEXT NOT NULL,
    "platform" TEXT,
    "platform_id" TEXT,

    CONSTRAINT "user_link_pkey" PRIMARY KEY ("logto_id")
);

-- CreateIndex
CREATE INDEX "bookstack_books_slug_idx" ON "bookstack_books"("slug");

-- CreateIndex
CREATE INDEX "bookstack_books_created_at_idx" ON "bookstack_books"("created_at");

-- CreateIndex
CREATE INDEX "bookstack_books_updated_at_idx" ON "bookstack_books"("updated_at");

-- CreateIndex
CREATE INDEX "bookstack_books_owned_by_idx" ON "bookstack_books"("owned_by");

-- CreateIndex
CREATE INDEX "bookstack_books_created_by_idx" ON "bookstack_books"("created_by");

-- CreateIndex
CREATE INDEX "bookstack_books_updated_by_idx" ON "bookstack_books"("updated_by");

-- CreateIndex
CREATE INDEX "bookstack_pages_slug_idx" ON "bookstack_pages"("slug");

-- CreateIndex
CREATE INDEX "bookstack_pages_created_at_idx" ON "bookstack_pages"("created_at");

-- CreateIndex
CREATE INDEX "bookstack_pages_updated_at_idx" ON "bookstack_pages"("updated_at");

-- CreateIndex
CREATE INDEX "bookstack_pages_owned_by_idx" ON "bookstack_pages"("owned_by");

-- CreateIndex
CREATE INDEX "bookstack_pages_created_by_idx" ON "bookstack_pages"("created_by");

-- CreateIndex
CREATE INDEX "bookstack_pages_updated_by_idx" ON "bookstack_pages"("updated_by");

-- CreateIndex
CREATE INDEX "user_logto_id_idx" ON "user"("logto_id");

-- CreateIndex
CREATE INDEX "user_link_logto_id_idx" ON "user_link"("logto_id");

-- CreateIndex
CREATE INDEX "user_link_platform_idx" ON "user_link"("platform");

-- CreateIndex
CREATE INDEX "user_link_platform_id_idx" ON "user_link"("platform_id");

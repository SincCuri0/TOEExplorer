-- CreateTable
CREATE TABLE "RolePermission" (
    "id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "canDeletePosts" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteComments" BOOLEAN NOT NULL DEFAULT false,
    "canBanUsers" BOOLEAN NOT NULL DEFAULT false,
    "canEditPosts" BOOLEAN NOT NULL DEFAULT false,
    "canPinPosts" BOOLEAN NOT NULL DEFAULT false,
    "canManageRoles" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RolePermission_role_key" ON "RolePermission"("role");

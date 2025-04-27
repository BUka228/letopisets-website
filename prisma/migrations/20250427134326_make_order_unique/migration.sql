/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Example` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Example_order_key" ON "Example"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_order_key" ON "Feature"("order");

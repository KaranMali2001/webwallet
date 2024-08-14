-- CreateTable
CREATE TABLE "User" (
    "hashed_mnemonics" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Wallet" (
    "wallet_address" TEXT NOT NULL,
    "User_Mnemonics" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_hashed_mnemonics_key" ON "User"("hashed_mnemonics");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_wallet_address_key" ON "Wallet"("wallet_address");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_User_Mnemonics_fkey" FOREIGN KEY ("User_Mnemonics") REFERENCES "User"("hashed_mnemonics") ON DELETE RESTRICT ON UPDATE CASCADE;

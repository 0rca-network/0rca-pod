"use client"

import { useState } from "react"
import { useWallet } from "@txnlab/use-wallet-react"
// import { Button } from "@/components/ui/button.tsx"
import ConnectWalletModal from "./connect-wallet-modal"

export function ConnectWalletButton() {
  const { activeAccount, wallets } = useWallet()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <button onClick={openModal} className="bg-[#63f2d2] hover:bg-[#3dd5b8] text-black mint-glow smooth-transition rounded-full px-3 md:px-6 text-sm">
        {activeAccount ? `${activeAccount.address.slice(0, 4)}...${activeAccount.address.slice(-4)}` : "Connect Wallet"}
      </button>

      <ConnectWalletModal wallets={wallets} isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}


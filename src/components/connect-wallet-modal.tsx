"use client"

import { type Wallet, useWallet } from "@txnlab/use-wallet-react"
import { toast } from "react-toastify"
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"

const ConnectWalletModal = ({
  wallets,
  isOpen,
  onClose,
}: {
  wallets: Wallet[]
  isOpen: boolean
  onClose: () => void
}) => {
  const { activeAccount } = useWallet()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const mainContent = document.querySelector('main') || document.querySelector('#__next') || document.querySelector('.app')
      if (mainContent) {
        mainContent.style.filter = 'blur(2px)'
        return () => {
          mainContent.style.filter = ''
        }
      }
    }
  }, [isOpen])

  if (!isOpen || !mounted) return null

  const handleWalletClick = async (wallet: Wallet) => {
    try {
      if (wallet.isConnected) {
        await wallet.setActive()
        toast.success("Wallet set as active")
      } else {
        await wallet.connect()
        toast.success("Wallet connected successfully")
      }
      onClose()
    } catch (error) {
      console.error(error)
      toast.error("Failed to connect wallet")
    }
  }

  const disconnectWallets = async () => {
    try {
      for (const wallet of wallets) {
        if (wallet.isConnected) {
          await wallet.disconnect()
        }
      }
      toast.success("Disconnected from all wallets")
      onClose()
    } catch (error) {
      console.error(error)
      toast.error("Failed to disconnect wallets")
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-black border border-neutral-700 rounded-lg shadow-xl w-96 p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center w-full mb-4">
          <h3 className="text-lg font-medium text-white">Connect to a wallet</h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-2 w-full">
          {wallets.map((wallet) => (
            <div
              onClick={() => handleWalletClick(wallet)}
              key={wallet.id}
              className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors w-full
                ${
                  wallet.isConnected
                    ? "bg-[#63f2d2] border border-[#63f2d2] hover:bg-[#3dd5b8]"
                    : "bg-neutral-800 border border-neutral-700 hover:bg-neutral-800"
                }`}
            >
              <span className="font-medium text-white">
                {wallet.metadata.name} {wallet.activeAccount && `[${wallet.activeAccount.address.slice(0, 3)}...${wallet.activeAccount.address.slice(-3)}]`}
                {wallet.isActive && ` (active)`}
              </span>
              <img
                src={wallet.metadata.icon || "/placeholder.svg?height=24&width=24"}
                alt={`${wallet.metadata.name} Icon`}
                className="h-6 w-6"
              />
            </div>
          ))}

          {activeAccount && (
            <div
              onClick={disconnectWallets}
              className="flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors bg-red-500 border border-red-500 hover:bg-red-600 mt-4 w-full"
            >
              <span className="font-medium text-white">
                Disconnect {activeAccount && `[${activeAccount.address.slice(0, 3)}...${activeAccount.address.slice(-3)}]`}
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-800 text-sm text-center text-neutral-400 w-full">
          <span>New to Algorand? </span>
          <a
            href="https://algorand.com/wallets"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#63f2d2] hover:text-[#3dd5b8]"
          >
            Learn more about wallets
          </a>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ConnectWalletModal
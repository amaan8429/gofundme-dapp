/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    ethereum?: any; // Using 'any' to be more permissive for debugging
  }
}

const networks = {
  polygon: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [""],
    blockExplorerUrls: ["https://amoy.polygonscan.com/"],
  },
};

export function Wallet() {
  const [address, setAddress] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const connectWallet = async () => {
    try {
      // Detailed logging for debugging
      console.log("Window ethereum object:", window.ethereum);

      if (!window.ethereum) {
        throw new Error(
          "No Ethereum wallet detected. Please install MetaMask."
        );
      }

      // Check for specific MetaMask methods
      if (typeof window.ethereum.request !== "function") {
        throw new Error(
          "Ethereum provider does not have a request method. Ensure MetaMask is properly installed and updated."
        );
      }

      // More verbose error catching for account request
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      } catch (requestError) {
        console.error("Account request error:", requestError);
        throw new Error(
          `Failed to request accounts: ${
            requestError instanceof Error
              ? requestError.message
              : "Unknown error"
          }`
        );
      }

      // Use a try-catch for provider creation
      let provider;
      try {
        provider = new ethers.BrowserProvider(window.ethereum);
      } catch (providerError) {
        console.error("Provider creation error:", providerError);
        throw new Error(
          `Failed to create provider: ${
            providerError instanceof Error
              ? providerError.message
              : "Unknown error"
          }`
        );
      }

      // Network validation
      const network = await provider.getNetwork();
      console.log("Current Network:", network);

      // Network switching with more detailed error handling
      if (Number(network.chainId) !== parseInt(networks.polygon.chainId, 16)) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networks.polygon],
          });
        } catch (switchError) {
          console.error("Network switch error:", switchError);
          throw new Error(
            `Failed to switch network: ${
              switchError instanceof Error
                ? switchError.message
                : "Unknown error"
            }`
          );
        }
      }

      // Get signer and address
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      setAddress(userAddress);
      setError(null);
    } catch (error) {
      console.error("Full Wallet Connection Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while connecting wallet"
      );
    }
  };

  return (
    <div>
      <Button onClick={connectWallet}>
        {address
          ? `Connected (${address.slice(0, 6)}...${address.slice(-4)})`
          : "Connect Wallet"}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

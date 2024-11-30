// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { ethers } from "ethers";
// import { Button } from "@/components/ui/button";

// declare global {
//   interface Window {
//     ethereum: unknown;
//   }
// }

// const networks = {
//   polygon: {
//     chainId: `0x${Number(80002).toString(16)}`,
//     chainName: "Polygon Amoy Testnet",
//     nativeCurrency: {
//       name: "MATIC",
//       symbol: "MATIC",
//       decimals: 18,
//     },
//     rpcUrls: ["https://rpc-amoy.polygon.technology/"],
//     blockExplorerUrls: ["https://amoy.polygonscan.com/"],
//   },
// };

// export function Wallet() {
//   const [address, setAddress] = React.useState("");
//   const connectWallet = async () => {
//     await (window.ethereum as ethers.Eip1193Provider).request({
//       method: "eth_requestAccounts",
//     });

//     const provider = new ethers.BrowserProvider(
//       window.ethereum as ethers.Eip1193Provider
//     );
//     const account = await provider.getSigner();
//     address = await account.getAddress();
//   };

//   return <Button onClick={connectWallet}>Connect Wallet</Button>;
// }

import React from "react";
import danaTiri from "../assets/tiri.jpeg";
import { ConnectButton } from "@xellar/kit";
import { truncateAddress } from "../utils/string";
import { useReadContract } from "wagmi";
import { Address, erc20Abi, formatUnits } from "viem";
import { IDRX_SEPOLIA } from "../constants";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 border-b bg-white">
      <div className="text-xl font-bold">
        <img src={danaTiri} className="w-52" />
      </div>
      <ConnectButton.Custom>
        {({ openConnectModal, isConnected, openProfileModal, account }) => {
          if (!isConnected) {
            return (
              <button className="bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer" onClick={openConnectModal}>
                Connect Wallet
              </button>
            );
          }

          return <ConnectedButton address={account?.address as Address} onClick={openProfileModal} />;
        }}
      </ConnectButton.Custom>
    </nav>
  );
};

const ConnectedButton: React.FC<{ address: Address; onClick: () => void }> = ({ address, onClick }) => {
  const { data } = useReadContract({
    address: IDRX_SEPOLIA,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address as Address],
    query: {
      enabled: !!address,
    },
  });

  const formatted = formatUnits(data ?? BigInt(0), 2);

  return (
    <button className="bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer" onClick={onClick}>
      {truncateAddress(address ?? "")} - {Number(formatted).toLocaleString()} IDRX
    </button>
  );
};

export default Navbar;

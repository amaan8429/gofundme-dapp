"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ethers } from "ethers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import Campaign from "@/artifacts/contracts/CampaignFactory.sol/Campaign.json";

interface CampaignDetails {
  owner: string;
  title: string;
  description: string;
  target: ethers.BigNumberish;
  deadline: ethers.BigNumberish;
  amountCollected: ethers.BigNumberish;
  category: string;
}

interface Donation {
  donator: string;
  amount: ethers.BigNumberish;
}

export default function CampaignPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<CampaignDetails | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchCampaignDetails();
  }, []);

  const fetchCampaignDetails = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        id as string,
        Campaign.abi,
        provider
      );

      const campaignDetails = await contract.getCampaign();
      const donationsList = await contract.getDonators();

      setCampaign({
        owner: campaignDetails[0],
        title: campaignDetails[1],
        description: campaignDetails[2],
        target: campaignDetails[3],
        deadline: campaignDetails[4],
        amountCollected: campaignDetails[5],
        category: campaignDetails[6],
      });

      setDonations(
        donationsList.map(
          ([donator, amount]: [string, ethers.BigNumberish]) => ({
            donator,
            amount,
          })
        )
      );
    } catch (error) {
      console.error("Failed to fetch campaign details:", error);
      toast.error("Failed to load campaign details");
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(id as string, Campaign.abi, signer);

      const tx = await contract.donate({ value: ethers.parseEther(amount) });
      await tx.wait();

      toast.success("Donation successful!");
      fetchCampaignDetails(); // Refresh campaign details
      setAmount("");
    } catch (error) {
      console.error("Donation failed:", error);
      toast.error("Donation failed");
    }
  };

  const handleWithdraw = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(id as string, Campaign.abi, signer);

      const tx = await contract.withdraw();
      await tx.wait();

      toast.success("Funds withdrawn successfully!");
      fetchCampaignDetails(); // Refresh campaign details
    } catch (error) {
      console.error("Withdrawal failed:", error);
      toast.error("Withdrawal failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (!campaign) {
    return <div className="text-center">Campaign not found</div>;
  }

  const progress =
    (BigInt(campaign.amountCollected) * BigInt(100)) / BigInt(campaign.target);

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{campaign.title}</CardTitle>
          <CardDescription>Category: {campaign.category}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{campaign.description}</p>
          <div>
            <Progress value={Number(progress)} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              {ethers.formatEther(campaign.amountCollected)} ETH raised of{" "}
              {ethers.formatEther(campaign.target)} ETH
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recent Donations</h3>
            <ul className="space-y-2">
              {donations.map((donation, index) => (
                <li key={index} className="text-sm">
                  {donation.donator.slice(0, 6)}...{donation.donator.slice(-4)}{" "}
                  - {ethers.formatEther(donation.amount)} ETH
                </li>
              ))}
            </ul>
          </div>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Amount in ETH"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button onClick={handleDonate}>Donate</Button>
          </div>
        </CardContent>
        <CardFooter>
          {campaign.owner.toLowerCase() ===
            window.ethereum.selectedAddress?.toLowerCase() && (
            <Button onClick={handleWithdraw} className="w-full">
              Withdraw Funds
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

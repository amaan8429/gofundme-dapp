"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
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
import CampaignFactory from "@/artifacts/contracts/CampaignFactory.sol/CampaignFactory.json";
import Campaign from "@/artifacts/contracts/CampaignFactory.sol/Campaign.json";

interface CampaignDetails {
  address: string;
  title: string;
  description: string;
  target: ethers.BigNumberish;
  deadline: ethers.BigNumberish;
  amountCollected: ethers.BigNumberish;
  category: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<CampaignDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const factoryContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS!,
        CampaignFactory.abi,
        provider
      );

      const campaignAddresses = await factoryContract.getDeployedCampaigns();
      const campaignDetails = await Promise.all(
        campaignAddresses.map(async (address: string) => {
          const campaign = new ethers.Contract(address, Campaign.abi, provider);
          const details = await campaign.getCampaign();

          // Validate that details are not null or undefined before using them
          const target = details[3] ? Number(details[3]) : 0;
          const amountCollected = details[5] ? Number(details[5]) : 0;

          return {
            address,
            title: details[1] || "No Title", // Fallback to "No Title" if title is empty
            description: details[2] || "No Description", // Fallback to "No Description"
            target,
            deadline: details[4] || 0, // Fallback to 0 if deadline is invalid
            amountCollected,
            category: details[6] || "Uncategorized", // Fallback to "Uncategorized"
          };
        })
      );

      setCampaigns(campaignDetails);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
      toast.error("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">All Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.address} className="flex flex-col">
            <CardHeader>
              <CardTitle>{campaign.title}</CardTitle>
              <CardDescription>Category: {campaign.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">
                {campaign.description.slice(0, 100)}...
              </p>
              <div>
                <Progress
                  value={
                    campaign.target !== 0
                      ? (Number(campaign.amountCollected) * 100) /
                        Number(campaign.target)
                      : 0 // Avoid division by zero if target is 0
                  }
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {ethers.formatEther(campaign.amountCollected)} ETH raised of{" "}
                  {ethers.formatEther(campaign.target)} ETH
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => router.push(`/campaign/${campaign.address}`)}
              >
                View Campaign
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {campaigns.length === 0 && (
        <p className="text-center text-muted-foreground">No campaigns found.</p>
      )}
    </div>
  );
}

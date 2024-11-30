"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import CampaignFactory from "@/artifacts/contracts/CampaignFactory.sol/CampaignFactory.json";

const NEXT_PUBLIC_ADDRESS = "0xfCB489834BB5cd0ac71e3312B37aAa8dF63eDddB";

export default function CreateCampaignPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    campaignTitle: "",
    story: "",
    requiredAmount: "",
    category: "education",
  });

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const formHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => {
    if (typeof e === "string") {
      // This is for the Select component
      setForm((prev) => ({ ...prev, category: e }));
    } else {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const startCampaign = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.campaignTitle === "") {
      toast.error("Title field is empty");
      return;
    }
    if (form.story === "") {
      toast.error("Story field is empty");
      return;
    }
    if (form.requiredAmount === "") {
      toast.error("Required amount field is empty");
      return;
    }

    setLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        NEXT_PUBLIC_ADDRESS!,
        CampaignFactory.abi,
        signer
      );
      console.log(contract);

      const campaignAmount = await ethers.parseEther(form.requiredAmount);
      const campaignData = await contract.createCampaign(
        form.campaignTitle,
        campaignAmount,
        form.category,
        form.story
      );

      await campaignData.wait();

      setAddress(campaignData.to);
      toast.success("Campaign started successfully!");
      router.push(`/campaign/${campaignData.to}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to start campaign");
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

  if (address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h1 className="text-2xl font-bold">Campaign Started Successfully!</h1>
        <p className="text-muted-foreground">{address}</p>
        <Button onClick={() => router.push(`/campaign/${address}`)}>
          Go To Campaign
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create a New Campaign</h1>
      <form onSubmit={startCampaign} className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-2">
          <Label htmlFor="campaignTitle">Campaign Title</Label>
          <Input
            id="campaignTitle"
            name="campaignTitle"
            value={form.campaignTitle}
            onChange={formHandler}
            placeholder="Enter campaign title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="story">Story</Label>
          <Textarea
            id="story"
            name="story"
            value={form.story}
            onChange={formHandler}
            placeholder="Describe your story"
            className="min-h-[160px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="requiredAmount">Required Amount</Label>
          <Input
            id="requiredAmount"
            name="requiredAmount"
            type="number"
            value={form.requiredAmount}
            onChange={formHandler}
            placeholder="Enter required amount"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            value={form.category}
            onValueChange={formHandler}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="animal">Animal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">
          Start Campaign
        </Button>
      </form>
    </div>
  );
}

import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Globe, DollarSign } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Empower Change, One Contribution at a Time
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Welcome to our Decentralized Fundraising Platform. Discover
            meaningful campaigns and make a difference directly through
            blockchain technology.
          </p>

          <div className="flex justify-center space-x-4 mb-16">
            <Button
              variant="default"
              size="lg"
              className="flex items-center space-x-2"
            >
              <Heart className="w-5 h-5" />
              <span>Explore Campaigns</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center space-x-2"
            >
              <DollarSign className="w-5 h-5" />
              <span>Start a Campaign</span>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Global Reach
              </h3>
              <p className="text-gray-600">
                Connect with causes worldwide, breaking geographical barriers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Transparent Funding
              </h3>
              <p className="text-gray-600">
                Every transaction is recorded on the blockchain, ensuring
                complete transparency.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Community Impact
              </h3>
              <p className="text-gray-600">
                Directly support causes that matter most to you and your
                community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

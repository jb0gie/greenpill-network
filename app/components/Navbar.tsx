"use client";

import { useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-[#001810]/60 backdrop-blur-md z-50 border-b border-[#00ff80]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[#00ff80] font-medium text-lg">Green pill</span>
                <div className="bg-[#00ff80]/10 p-2 rounded-xl">
                  🥒
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                <Button variant="ghost" className="text-[#80ffa0] hover:text-[#00ff80] hover:bg-[#00ff80]/10 rounded-lg px-4">Home</Button>
                <Button variant="ghost" className="text-[#80ffa0] hover:text-[#00ff80] hover:bg-[#00ff80]/10 rounded-lg px-4">About</Button>
                <Button variant="ghost" className="text-[#80ffa0] hover:text-[#00ff80] hover:bg-[#00ff80]/10 rounded-lg px-4">Network</Button>
                <Button variant="ghost" className="text-[#80ffa0] hover:text-[#00ff80] hover:bg-[#00ff80]/10 rounded-lg px-4">Contact</Button>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Button className="bg-[#00ff80] hover:bg-[#00ff80]/90 text-[#001810] font-medium rounded-full px-6">
              Get Started
            </Button>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#80ffa0] hover:text-[#00ff80] hover:bg-[#00ff80]/10 rounded-lg"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#001810]/95 backdrop-blur-md border-t border-[#00ff80]/10">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Button variant="ghost" className="w-full justify-start text-[#80ffa0] hover:text-[#00ff80] hover:bg-[#00ff80]/10 rounded-lg">
              Home
            </Button>
            <Button variant="ghost" className="w-full justify-start text-[#80ffa0] hover:text-[#00ff80] hover:bg-[#00ff80]/10 rounded-lg">
              About
            </Button>
            <Button variant="ghost" className="w-full justify-start text-[#80ffa0] hover:text-[#00ff80] hover:bg-[#00ff80]/10 rounded-lg">
              Network
            </Button>
            <Button variant="ghost" className="w-full justify-start text-[#80ffa0] hover:text-[#00ff80] hover:bg-[#00ff80]/10 rounded-lg">
              Contact
            </Button>
            <div className="pt-2">
              <Button className="w-full bg-[#00ff80] hover:bg-[#00ff80]/90 text-[#001810] font-medium rounded-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
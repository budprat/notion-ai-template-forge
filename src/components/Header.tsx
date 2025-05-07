
import React from "react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
            NotionTemplateForge
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Button variant="ghost">Templates</Button>
            </li>
            <li>
              <Button variant="ghost">How It Works</Button>
            </li>
            <li>
              <Button variant="ghost">About</Button>
            </li>
            <li>
              <Button variant="outline">Login</Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

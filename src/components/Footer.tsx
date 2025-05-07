
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">NotionTemplateForge</h3>
            <p className="text-muted-foreground">
              AI-powered Notion templates customized to your interests and style preferences.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">Templates</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">How It Works</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">Pricing</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">Blog</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">Tutorials</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} NotionTemplateForge. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

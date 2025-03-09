import React from "react";
import { Rocket, Database, Globe } from "lucide-react";

/**
 * Welcome Hero component using React and Lucide icons
 * This component displays a welcome message with icons and animations
 */
const WelcomeHero: React.FC = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-primary/10 rounded-full inline-flex">
          <Rocket className="h-12 w-12 text-primary" />
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-3">Welcome to Your Astro App</h1>
      <p className="text-lg mb-6">
        Powered by Astro, React, TailwindCSS, DaisyUI, and Cloudflare
      </p>

      <div className="flex justify-center gap-8 mb-8">
        <div className="text-center">
          <Globe className="h-8 w-8 mx-auto text-secondary" />
          <span className="text-sm mt-2 block">Cloudflare Pages</span>
        </div>
        <div className="text-center">
          <Database className="h-8 w-8 mx-auto text-accent" />
          <span className="text-sm mt-2 block">Cloudflare D1</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;

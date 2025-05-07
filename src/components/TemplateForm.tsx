
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateRequest, InterestCategory } from "@/types";

interface TemplateFormProps {
  onSubmit: (request: TemplateRequest) => void;
  isLoading: boolean;
}

const interestCategories: InterestCategory[] = [
  {
    name: "Productivity",
    examples: ["Task Management", "Goal Setting", "Habit Tracking", "Time Blocking"]
  },
  {
    name: "Personal",
    examples: ["Journal", "Reading List", "Travel Planning", "Recipe Collection"]
  },
  {
    name: "Work",
    examples: ["Project Management", "Meeting Notes", "Client Database", "Weekly Report"]
  },
  {
    name: "Education",
    examples: ["Study Notes", "Research", "Course Planning", "Literature Review"]
  },
  {
    name: "Creative",
    examples: ["Content Calendar", "Portfolio", "Story Planning", "Design System"]
  }
];

const templateStyles = [
  { id: "minimal", name: "Minimal", description: "Clean, distraction-free design with essential features" },
  { id: "professional", name: "Professional", description: "Business-ready layout with structured sections" },
  { id: "colorful", name: "Colorful", description: "Vibrant design with color-coded sections and emojis" },
  { id: "creative", name: "Creative", description: "Free-form layout with unique sections and prompts" },
  { id: "academic", name: "Academic", description: "Scholarly format with citation areas and research structure" }
];

const TemplateForm: React.FC<TemplateFormProps> = ({ onSubmit, isLoading }) => {
  const [activeTab, setActiveTab] = useState<string>("category");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedInterest, setSelectedInterest] = useState<string>("");
  const [customInterest, setCustomInterest] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>("minimal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const interest = activeTab === "custom" ? customInterest : selectedInterest;
    
    if (!interest) {
      alert("Please select or enter an interest");
      return;
    }
    
    onSubmit({
      interest: selectedInterest,
      style: selectedStyle,
      customInterest: activeTab === "custom" ? customInterest : undefined
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">What are you interested in creating?</h3>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="category">Choose Category</TabsTrigger>
              <TabsTrigger value="custom">Custom Interest</TabsTrigger>
            </TabsList>
            
            <TabsContent value="category" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {interestCategories.map((category) => (
                  <Card 
                    key={category.name}
                    className={`cursor-pointer transition ${
                      selectedCategory === category.name ? 'border-primary ring-1 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {category.examples.slice(0, 2).join(", ")}...
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {selectedCategory && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Select specific interest</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {interestCategories
                      .find(cat => cat.name === selectedCategory)
                      ?.examples.map(example => (
                        <Button
                          key={example}
                          type="button"
                          variant={selectedInterest === example ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setSelectedInterest(example)}
                        >
                          {example}
                        </Button>
                      ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="custom">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="custom-interest">Enter your interest</Label>
                  <Input
                    id="custom-interest"
                    placeholder="e.g., Fitness Workout Tracker, Travel Itinerary, Garden Planning..."
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Choose your template style</h3>
          
          <RadioGroup
            value={selectedStyle}
            onValueChange={setSelectedStyle}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {templateStyles.map((style) => (
              <div key={style.id} className="flex items-start space-x-2">
                <RadioGroupItem value={style.id} id={style.id} className="mt-1" />
                <Label htmlFor={style.id} className="cursor-pointer flex-1">
                  <div className="font-medium">{style.name}</div>
                  <div className="text-sm text-muted-foreground">{style.description}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Template"}
        </Button>
      </div>
    </form>
  );
};

export default TemplateForm;

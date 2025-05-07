
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TemplateForm from "@/components/TemplateForm";
import TemplateResult from "@/components/TemplateResult";
import { Button } from "@/components/ui/button";
import { generateTemplate } from "@/services/openai";
import { TemplateRequest, TemplateResult as TemplateResultType } from "@/types";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [templateResult, setTemplateResult] = useState<TemplateResultType | null>(null);

  const handleSubmit = async (request: TemplateRequest) => {
    setIsLoading(true);
    try {
      const result = await generateTemplate(request);
      setTemplateResult(result);
    } catch (error) {
      console.error("Error generating template:", error);
      // Error handling would go here
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTemplateResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {!templateResult ? (
          <>
            <section className="relative bg-gradient-to-b from-violet-50 to-white py-20">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Create beautiful{" "}
                  <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
                    Notion templates
                  </span>{" "}
                  with AI
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Generate customized templates for any interest in seconds using our AI-powered template forge.
                </p>
                <Button size="lg" className="mr-4">
                  See Examples
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </section>

            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold mb-8 text-center">
                    Generate Your Template
                  </h2>
                  <TemplateForm onSubmit={handleSubmit} isLoading={isLoading} />
                </div>
              </div>
            </section>

            <section className="py-16 bg-slate-50">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-bold mb-2">Choose your interest</h3>
                    <p className="text-muted-foreground">
                      Select from popular categories or specify your own custom interest.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-bold mb-2">Pick your style</h3>
                    <p className="text-muted-foreground">
                      Choose from minimal, professional, colorful, creative, or academic styles.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-bold mb-2">Get your template</h3>
                    <p className="text-muted-foreground">
                      Instantly receive your AI-generated template ready to use in Notion.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <TemplateResult result={templateResult} onReset={handleReset} />
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

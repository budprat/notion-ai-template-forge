
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Share } from "lucide-react";
import { TemplateResult as TemplateResultType } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface TemplateResultProps {
  result: TemplateResultType;
  onReset: () => void;
}

const TemplateResult: React.FC<TemplateResultProps> = ({ result, onReset }) => {
  const contentRef = useRef<HTMLPreElement>(null);
  const { toast } = useToast();
  
  const copyToClipboard = () => {
    if (contentRef.current) {
      navigator.clipboard.writeText(result.content)
        .then(() => {
          toast({
            title: "Copied to clipboard",
            description: "Template content has been copied to your clipboard",
          });
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast({
            title: "Failed to copy",
            description: "There was an error copying to clipboard",
            variant: "destructive",
          });
        });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.title.replace(/\s+/g, "-").toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Template</h2>
        <Button variant="outline" onClick={onReset}>
          Create Another
        </Button>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>{result.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{result.description}</p>
        </CardHeader>
        
        <Tabs defaultValue="preview" className="w-full">
          <div className="px-6">
            <TabsList className="mb-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="preview" className="p-0">
            <CardContent className="prose prose-slate max-w-none p-6 border-t">
              <div dangerouslySetInnerHTML={{ 
                __html: result.content
                  .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                  .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                  .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                  .replace(/^\- \[ \] (.+)$/gm, '<div class="flex items-start"><input type="checkbox" class="mt-1 mr-2" disabled /><span>$1</span></div>')
                  .replace(/^\- (.+)$/gm, '<li>$1</li>')
                  .replace(/\n\n/g, '<br />')
                  .replace(/\|(.+)\|/g, '<table><tr>$1</tr></table>')
                  .replace(/> (.+)/g, '<blockquote>$1</blockquote>')
              }} />
            </CardContent>
          </TabsContent>
          
          <TabsContent value="markdown" className="p-0">
            <CardContent className="p-6 border-t">
              <pre ref={contentRef} className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap text-sm">
                {result.content}
              </pre>
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-sm text-muted-foreground">
            Generated on {result.date}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TemplateResult;

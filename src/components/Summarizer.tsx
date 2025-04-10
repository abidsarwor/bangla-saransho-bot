
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CopyIcon, CopyCheckIcon, RefreshCwIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Summarizer: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const generateSummary = () => {
    if (!inputText.trim()) {
      toast({
        title: "Please write something",
        description: "Please paste an article to summarize.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // This is a mock summary generator
      // In a real app, you would call an actual AI API
      const mockSummary = generateMockSummary(inputText);
      setSummary(mockSummary);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockSummary = (text: string): string => {
    // Simple mock function that returns a predefined summary based on input length
    // In a real application, this would be replaced with an actual AI summarization API
    const words = text.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length < 10) {
      return "Not enough information. Please provide a more detailed article.";
    }
    
    if (text.toLowerCase().includes("artificial intelligence") || text.toLowerCase().includes("ai")) {
      return "This article discusses how artificial intelligence is being used in various sectors such as healthcare, education, and technology. It mentions that AI can help improve the quality of human life. However, it also notes several limitations and ethical challenges. In the future, this technology will continue to evolve and have an increasing impact on our daily lives.";
    }
    
    if (text.toLowerCase().includes("climate") || text.toLowerCase().includes("environment")) {
      return "This article discusses climate change. It states that effects such as global temperature rise, sea level rise, and extreme weather events are already visible. Scientists warn that without rapid action to address these changes, the situation will worsen. Reducing carbon emissions and focusing on sustainable development is crucial.";
    }
    
    return "This article discusses an important topic that is impacting society and the economy. The author analyzes the subject from various perspectives and offers some recommendations for addressing the problem. The article uses recent research and data to present arguments. Overall, it provides readers with a comprehensive understanding of the topic and encourages deeper thinking.";
  };

  const resetForm = () => {
    setInputText('');
    setSummary('');
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!summary) return;
    
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Summary copied to your clipboard.",
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Write or paste an article</h2>
          <Textarea 
            placeholder="Paste your article here..." 
            className="min-h-[300px]"
            value={inputText}
            onChange={handleInputChange}
          />
          <div className="flex gap-3">
            <Button 
              onClick={generateSummary} 
              className="flex-1" 
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? 
                <><RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait...</> : 
                'Generate Summary'}
            </Button>
            <Button 
              onClick={resetForm} 
              variant="outline" 
              disabled={isLoading || (!inputText && !summary)}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Summary</h2>
            {summary && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={copyToClipboard}
                className="text-muted-foreground hover:text-foreground"
              >
                {copied ? 
                  <><CopyCheckIcon className="h-4 w-4 mr-1" /> Copied</> : 
                  <><CopyIcon className="h-4 w-4 mr-1" /> Copy</>}
              </Button>
            )}
          </div>
          <Card className={`p-4 min-h-[300px] ${isLoading ? 'animate-pulse-slow' : ''}`}>
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Generating summary...</p>
              </div>
            ) : summary ? (
              <p className="leading-relaxed">{summary}</p>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center gap-2">
                <p className="text-muted-foreground">
                  Write or paste your article on the left, then click the Generate Summary button.
                </p>
                <p className="text-muted-foreground text-sm">
                  The summary will be displayed here
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <Separator className="my-8" />
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Usage Instructions:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Paste your article in the text box on the left.</li>
          <li>Click the "Generate Summary" button.</li>
          <li>View your summary on the right side.</li>
          <li>Use the "Copy" button to copy the summary if needed.</li>
        </ol>
      </div>
    </div>
  );
};

export default Summarizer;

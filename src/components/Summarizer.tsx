
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
        title: "কিছু লিখুন",
        description: "অনুগ্রহ করে সারাংশ করার জন্য একটি আর্টিকেল পেস্ট করুন।",
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
      return "পর্যাপ্ত তথ্য নেই। অনুগ্রহ করে আরও বিস্তারিত আর্টিকেল প্রদান করুন।";
    }
    
    if (text.toLowerCase().includes("artificial intelligence") || text.toLowerCase().includes("ai")) {
      return "এই আর্টিকেলে বলা হয়েছে যে কৃত্রিম বুদ্ধিমত্তা কীভাবে বিভিন্ন খাতে ব্যবহৃত হচ্ছে, যেমন স্বাস্থ্য, শিক্ষা ও প্রযুক্তি। এটি উল্লেখ করেছে যে, AI মানব জীবনের গুণগত মান বাড়াতে সাহায্য করতে পারে। তবে সেই সাথে এর বেশ কিছু সীমাবদ্ধতা এবং নৈতিক চ্যালেঞ্জও রয়েছে। ভবিষ্যতে এই প্রযুক্তিটি আরও উন্নত হবে এবং আমাদের দৈনন্দিন জীবনে আরও বেশি প্রভাব ফেলবে।";
    }
    
    if (text.toLowerCase().includes("climate") || text.toLowerCase().includes("environment")) {
      return "এই আর্টিকেলটি জলবায়ু পরিবর্তন নিয়ে আলোচনা করেছে। এতে বলা হয়েছে যে বিশ্বব্যাপী তাপমাত্রা বৃদ্ধি, সমুদ্রপৃষ্ঠের উচ্চতা বৃদ্ধি এবং চরম আবহাওয়া ঘটনার মতো প্রভাবগুলি ইতিমধ্যেই দৃশ্যমান। বিজ্ঞানীরা সতর্ক করেছেন যে এই পরিবর্তন মোকাবেলায় দ্রুত পদক্ষেপ না নিলে, পরিস্থিতি আরও খারাপ হবে। কার্বন নিঃসরণ কমানো এবং টেকসই উন্নয়নের দিকে মনোযোগ দেওয়া জরুরি।";
    }
    
    return "এই আর্টিকেলে একটি গুরুত্বপূর্ণ বিষয় নিয়ে আলোচনা করা হয়েছে, যা সমাজ ও অর্থনীতির উপর প্রভাব ফেলছে। লেখক বিভিন্ন দৃষ্টিকোণ থেকে বিষয়টি বিশ্লেষণ করেছেন এবং সমস্যার সমাধানের জন্য কিছু সুপারিশ দিয়েছেন। আর্টিকেলটিতে সাম্প্রতিক গবেষণা ও তথ্য ব্যবহার করে যুক্তি উপস্থাপন করা হয়েছে। সামগ্রিকভাবে, এটি পাঠককে বিষয়টি সম্পর্কে একটি সমগ্র ধারণা দেয় এবং আরও গভীর চিন্তার জন্য উৎসাহিত করে।";
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
        title: "কপি হয়েছে!",
        description: "সারাংশটি আপনার ক্লিপবোর্ডে কপি করা হয়েছে।",
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
          <h2 className="text-xl font-semibold">আর্টিকেল লিখুন বা পেস্ট করুন</h2>
          <Textarea 
            placeholder="এখানে আর্টিকেলটি পেস্ট করুন..." 
            className="min-h-[300px] font-bengali"
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
                <><RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" /> অপেক্ষা করুন...</> : 
                'সারাংশ তৈরি করুন'}
            </Button>
            <Button 
              onClick={resetForm} 
              variant="outline" 
              disabled={isLoading || (!inputText && !summary)}
            >
              রিসেট
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">সারাংশ</h2>
            {summary && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={copyToClipboard}
                className="text-muted-foreground hover:text-foreground"
              >
                {copied ? 
                  <><CopyCheckIcon className="h-4 w-4 mr-1" /> কপি করা হয়েছে</> : 
                  <><CopyIcon className="h-4 w-4 mr-1" /> কপি করুন</>}
              </Button>
            )}
          </div>
          <Card className={`p-4 min-h-[300px] ${isLoading ? 'animate-pulse-slow' : ''}`}>
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">সারাংশ তৈরি হচ্ছে...</p>
              </div>
            ) : summary ? (
              <p className="font-bengali leading-relaxed">{summary}</p>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center gap-2">
                <p className="text-muted-foreground">
                  আর্টিকেলটি বাম দিকে লিখুন বা পেস্ট করুন, তারপর সারাংশ তৈরি বাটনে ক্লিক করুন।
                </p>
                <p className="text-muted-foreground text-sm">
                  সারাংশটি এখানে প্রদর্শিত হবে
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <Separator className="my-8" />
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">ব্যবহার নির্দেশিকা:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>বাম দিকের টেক্সট বক্সে আপনার আর্টিকেলটি পেস্ট করুন।</li>
          <li>"সারাংশ তৈরি করুন" বাটনে ক্লিক করুন।</li>
          <li>আপনার সারাংশটি ডান পাশে দেখতে পাবেন।</li>
          <li>প্রয়োজনে "কপি করুন" বাটন ব্যবহার করে সারাংশটি কপি করুন।</li>
        </ol>
      </div>
    </div>
  );
};

export default Summarizer;

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Languages, 
  Globe,
  Plus,
  Settings,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  MessageSquare,
  Star,
  Save,
  RefreshCw
} from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const supportedLanguages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    enabled: true,
    primary: true,
    confidence: 98,
    responseQuality: 4.9,
    totalResponses: 1250,
    successRate: 97.8,
    avgResponseTime: "1.1s"
  },
  {
    code: "no",
    name: "Norwegian",
    nativeName: "Norsk",
    flag: "🇳🇴",
    enabled: true,
    primary: false,
    confidence: 95,
    responseQuality: 4.8,
    totalResponses: 890,
    successRate: 96.4,
    avgResponseTime: "1.2s"
  },
  {
    code: "sv",
    name: "Swedish",
    nativeName: "Svenska",
    flag: "🇸🇪",
    enabled: true,
    primary: false,
    confidence: 94,
    responseQuality: 4.7,
    totalResponses: 567,
    successRate: 95.8,
    avgResponseTime: "1.3s"
  },
  {
    code: "da",
    name: "Danish",
    nativeName: "Dansk",
    flag: "🇩🇰",
    enabled: true,
    primary: false,
    confidence: 93,
    responseQuality: 4.6,
    totalResponses: 234,
    successRate: 94.2,
    avgResponseTime: "1.4s"
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    enabled: false,
    primary: false,
    confidence: 92,
    responseQuality: 4.5,
    totalResponses: 45,
    successRate: 93.1,
    avgResponseTime: "1.5s"
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    enabled: false,
    primary: false,
    confidence: 91,
    responseQuality: 4.4,
    totalResponses: 23,
    successRate: 92.5,
    avgResponseTime: "1.6s"
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    enabled: false,
    primary: false,
    confidence: 90,
    responseQuality: 4.3,
    totalResponses: 12,
    successRate: 91.8,
    avgResponseTime: "1.7s"
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    enabled: false,
    primary: false,
    confidence: 89,
    responseQuality: 4.2,
    totalResponses: 8,
    successRate: 90.5,
    avgResponseTime: "1.8s"
  }
];

const languageCustomizations = [
  {
    language: "Norwegian",
    code: "no",
    customGreeting: "Hei {customerName},",
    customClosing: "Med vennlig hilsen,\nKundeservice",
    formalityLevel: "polite",
    culturalNotes: "Use formal 'De' for business communications, include Norwegian cultural context"
  },
  {
    language: "Swedish",
    code: "sv",
    customGreeting: "Hej {customerName},",
    customClosing: "Med vänliga hälsningar,\nKundtjänst",
    formalityLevel: "friendly",
    culturalNotes: "Swedish business culture is less formal, use 'du' for most communications"
  },
  {
    language: "Danish",
    code: "da",
    customGreeting: "Hej {customerName},",
    customClosing: "Venlig hilsen,\nKundeservice",
    formalityLevel: "balanced",
    culturalNotes: "Balance between formal and informal, adapt based on sender's tone"
  }
];

export function LanguageSettings() {
  const [autoDetection, setAutoDetection] = useState(true);
  const [fallbackLanguage, setFallbackLanguage] = useState("en");
  const [matchIncomingLanguage, setMatchIncomingLanguage] = useState(true);

  const enabledLanguages = supportedLanguages.filter(lang => lang.enabled);
  const totalResponses = supportedLanguages.reduce((sum, lang) => sum + lang.totalResponses, 0);
  const avgConfidence = supportedLanguages.reduce((sum, lang) => sum + lang.confidence, 0) / supportedLanguages.length;
  const avgQuality = supportedLanguages.reduce((sum, lang) => sum + lang.responseQuality, 0) / supportedLanguages.length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Language Settings</h1>
            <p className="text-muted-foreground">Configure multi-language AI responses and customizations</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Test Languages
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Languages</p>
                  <p className="text-2xl font-bold">{enabledLanguages.length}</p>
                </div>
                <Languages className="h-8 w-8 text-ai-blue" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Responses</p>
                  <p className="text-2xl font-bold">{totalResponses.toLocaleString()}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-ai-purple" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Confidence</p>
                  <p className="text-2xl font-bold">{avgConfidence.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-ai-green" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Quality</p>
                  <p className="text-2xl font-bold">{avgQuality.toFixed(1)}/5</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="languages" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="languages">Supported Languages</TabsTrigger>
            <TabsTrigger value="customizations">Language Customizations</TabsTrigger>
            <TabsTrigger value="settings">General Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="languages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Language Support Configuration</CardTitle>
                <CardDescription>Enable and configure AI language support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {supportedLanguages.map((language) => (
                    <div key={language.code} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{language.flag}</div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-lg">{language.name}</h3>
                              <span className="text-muted-foreground">({language.nativeName})</span>
                              {language.primary && (
                                <Badge className="bg-ai-blue">Primary</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {language.totalResponses.toLocaleString()} responses • {language.successRate}% success rate
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right text-sm">
                            <div className="font-medium">Quality: {language.responseQuality}/5</div>
                            <div className="text-muted-foreground">Avg: {language.avgResponseTime}</div>
                          </div>
                          <Switch 
                            checked={language.enabled}
                            disabled={language.primary}
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <Label className="text-sm font-medium">AI Confidence</Label>
                          <div className="mt-1">
                            <Progress value={language.confidence} className="h-2" />
                            <span className="text-xs text-muted-foreground">{language.confidence}%</span>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium">Response Quality</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-4 w-4 ${
                                    star <= Math.round(language.responseQuality) 
                                      ? 'text-yellow-500 fill-yellow-500' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {language.responseQuality}/5
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium">Performance</Label>
                          <div className="mt-1 text-sm">
                            <div className="text-green-600">{language.successRate}% success</div>
                            <div className="text-muted-foreground">{language.avgResponseTime} avg time</div>
                          </div>
                        </div>
                      </div>
                      
                      {language.enabled && (
                        <div className="mt-4 pt-4 border-t">
                          <Button variant="outline" size="sm" className="mr-2">
                            <Settings className="mr-1 h-3 w-3" />
                            Customize
                          </Button>
                          <Button variant="outline" size="sm">
                            Test Responses
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customizations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Language-Specific Customizations</CardTitle>
                <CardDescription>Customize AI responses for each language and culture</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {languageCustomizations.map((customization) => (
                    <div key={customization.code} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Globe className="h-5 w-5 text-ai-blue" />
                        <h3 className="font-semibold text-lg">{customization.language}</h3>
                        <Badge variant="outline">{customization.code}</Badge>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`greeting-${customization.code}`}>Custom Greeting</Label>
                            <Input 
                              id={`greeting-${customization.code}`}
                              defaultValue={customization.customGreeting}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`closing-${customization.code}`}>Custom Closing</Label>
                            <Textarea 
                              id={`closing-${customization.code}`}
                              defaultValue={customization.customClosing}
                              className="h-20"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`formality-${customization.code}`}>Formality Level</Label>
                            <select 
                              id={`formality-${customization.code}`}
                              className="w-full p-2 border rounded-md"
                              defaultValue={customization.formalityLevel}
                            >
                              <option value="formal">Formal</option>
                              <option value="polite">Polite</option>
                              <option value="balanced">Balanced</option>
                              <option value="friendly">Friendly</option>
                              <option value="casual">Casual</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`cultural-${customization.code}`}>Cultural Notes</Label>
                            <Textarea 
                              id={`cultural-${customization.code}`}
                              defaultValue={customization.culturalNotes}
                              className="h-32"
                              placeholder="Add cultural context and communication preferences..."
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Language-Specific Settings</Label>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Switch id={`gender-${customization.code}`} />
                                <label htmlFor={`gender-${customization.code}`} className="text-sm">
                                  Use gender-appropriate language
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch id={`business-${customization.code}`} defaultChecked />
                                <label htmlFor={`business-${customization.code}`} className="text-sm">
                                  Adapt to business context
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch id={`regional-${customization.code}`} />
                                <label htmlFor={`regional-${customization.code}`} className="text-sm">
                                  Use regional expressions
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Language Settings</CardTitle>
                <CardDescription>Configure global language detection and handling preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto-detect Language</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically detect the language of incoming emails
                      </p>
                    </div>
                    <Switch 
                      checked={autoDetection}
                      onCheckedChange={setAutoDetection}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Match Incoming Language</Label>
                      <p className="text-sm text-muted-foreground">
                        Always respond in the same language as the incoming email
                      </p>
                    </div>
                    <Switch 
                      checked={matchIncomingLanguage}
                      onCheckedChange={setMatchIncomingLanguage}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fallback-language">Fallback Language</Label>
                    <select 
                      id="fallback-language"
                      className="w-full max-w-sm p-2 border rounded-md"
                      value={fallbackLanguage}
                      onChange={(e) => setFallbackLanguage(e.target.value)}
                    >
                      {enabledLanguages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground">
                      Used when language detection fails or language is not supported
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confidence-threshold">Minimum Confidence Threshold</Label>
                    <Input 
                      id="confidence-threshold"
                      type="number"
                      min="0"
                      max="100"
                      defaultValue="85"
                      className="w-full max-w-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum confidence required for automatic language detection (0-100%)
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">Language Processing Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="preserve-formatting" defaultChecked />
                      <label htmlFor="preserve-formatting" className="text-sm">
                        Preserve original email formatting in responses
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="cultural-adaptation" defaultChecked />
                      <label htmlFor="cultural-adaptation" className="text-sm">
                        Adapt responses to cultural context
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="translate-attachments" />
                      <label htmlFor="translate-attachments" className="text-sm">
                        Provide translation notes for attachments
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="language-learning" defaultChecked />
                      <label htmlFor="language-learning" className="text-sm">
                        Continuously improve language models from feedback
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
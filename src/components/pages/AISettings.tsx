import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Brain, 
  Zap,
  Settings,
  Save,
  RefreshCw,
  TestTube,
  AlertCircle,
  CheckCircle,
  Globe,
  MessageSquare,
  Clock,
  Target,
  Sliders,
  Bot
} from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AISettings() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [autoReply, setAutoReply] = useState(true);
  const [responseLength, setResponseLength] = useState([2]);
  const [creativity, setCreativity] = useState([0.7]);
  const [confidence, setConfidence] = useState([0.8]);

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AI Settings</h1>
            <p className="text-muted-foreground">Configure your AI assistant behavior and response generation</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <TestTube className="mr-2 h-4 w-4" />
              Test AI
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>

        {/* AI Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-ai-blue to-ai-purple rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>AI Assistant Status</CardTitle>
                  <CardDescription>GPT-4 powered email automation</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Active
                </Badge>
                <Switch
                  checked={aiEnabled}
                  onCheckedChange={setAiEnabled}
                  id="ai-enabled"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-ai-blue">97.8%</div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-ai-purple">1.24s</div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-ai-green">4.85/5</div>
                <p className="text-sm text-muted-foreground">Satisfaction Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Configuration Tabs */}
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Basic Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic AI Settings</CardTitle>
                  <CardDescription>Core configuration for AI responses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Auto-Reply Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically send AI-generated responses
                      </p>
                    </div>
                    <Switch
                      checked={autoReply}
                      onCheckedChange={setAutoReply}
                      id="auto-reply"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Label className="text-base">Response Length</Label>
                    <p className="text-sm text-muted-foreground">
                      Control how detailed your AI responses should be
                    </p>
                    <div className="px-3">
                      <Slider
                        value={responseLength}
                        onValueChange={setResponseLength}
                        max={4}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Brief</span>
                        <span>Detailed</span>
                      </div>
                    </div>
                    <p className="text-sm">
                      Current: <span className="font-medium">
                        {responseLength[0] === 1 && "Very Brief"}
                        {responseLength[0] === 2 && "Brief"}
                        {responseLength[0] === 3 && "Detailed"}
                        {responseLength[0] === 4 && "Very Detailed"}
                      </span>
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Label className="text-base">AI Creativity</Label>
                    <p className="text-sm text-muted-foreground">
                      Balance between consistency and creative responses
                    </p>
                    <div className="px-3">
                      <Slider
                        value={creativity}
                        onValueChange={setCreativity}
                        max={1}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Conservative</span>
                        <span>Creative</span>
                      </div>
                    </div>
                    <p className="text-sm">
                      Current: <span className="font-medium">{(creativity[0] * 100).toFixed(0)}%</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Response Quality */}
              <Card>
                <CardHeader>
                  <CardTitle>Response Quality</CardTitle>
                  <CardDescription>Fine-tune response quality and confidence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-base">Confidence Threshold</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimum confidence level required to send automatic responses
                    </p>
                    <div className="px-3">
                      <Slider
                        value={confidence}
                        onValueChange={setConfidence}
                        max={1}
                        min={0.5}
                        step={0.05}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Low (50%)</span>
                        <span>High (100%)</span>
                      </div>
                    </div>
                    <p className="text-sm">
                      Current: <span className="font-medium">{(confidence[0] * 100).toFixed(0)}%</span>
                    </p>
                  </div>
                  
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Lower confidence may result in more automatic responses but potentially lower quality. 
                      Higher confidence ensures better quality but may require more manual intervention.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-green-600">High Confidence</div>
                      <div className="text-muted-foreground">Better quality responses</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-blue-600">Low Confidence</div>
                      <div className="text-muted-foreground">More automated responses</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Tone & Style */}
              <Card>
                <CardHeader>
                  <CardTitle>Tone & Style</CardTitle>
                  <CardDescription>Define your AI's communication style</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tone">Response Tone</Label>
                    <select id="tone" className="w-full p-2 border rounded-md">
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly</option>
                      <option value="casual">Casual</option>
                      <option value="formal">Formal</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="style">Writing Style</Label>
                    <select id="style" className="w-full p-2 border rounded-md">
                      <option value="concise">Concise</option>
                      <option value="detailed">Detailed</option>
                      <option value="conversational">Conversational</option>
                      <option value="technical">Technical</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signature">Email Signature</Label>
                    <Textarea
                      id="signature"
                      placeholder="Best regards,&#10;Customer Support Team&#10;Respondly"
                      className="h-20"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Brand Voice */}
              <Card>
                <CardHeader>
                  <CardTitle>Brand Voice</CardTitle>
                  <CardDescription>Customize AI responses to match your brand</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-info">Company Information</Label>
                    <Textarea
                      id="company-info"
                      placeholder="Brief description of your company, values, and key information the AI should know..."
                      className="h-24"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dos-donts">Do's and Don'ts</Label>
                    <Textarea
                      id="dos-donts"
                      placeholder="Specific guidelines for what the AI should or shouldn't do/say..."
                      className="h-20"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="brand-consistent" defaultChecked />
                    <Label htmlFor="brand-consistent" className="text-sm">
                      Enforce brand consistency in all responses
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="languages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Language Settings</CardTitle>
                <CardDescription>Configure multi-language support and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Supported Languages</h3>
                    <div className="space-y-3">
                      {[
                        { code: "en", name: "English", enabled: true, primary: true },
                        { code: "no", name: "Norwegian", enabled: true, primary: false },
                        { code: "sv", name: "Swedish", enabled: true, primary: false },
                        { code: "da", name: "Danish", enabled: false, primary: false },
                        { code: "de", name: "German", enabled: false, primary: false },
                        { code: "fr", name: "French", enabled: false, primary: false },
                      ].map((lang) => (
                        <div key={lang.code} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{lang.name}</span>
                            {lang.primary && <Badge variant="default">Primary</Badge>}
                          </div>
                          <Switch defaultChecked={lang.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Language Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-detect" defaultChecked />
                        <Label htmlFor="auto-detect" className="text-sm">
                          Auto-detect incoming email language
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="match-language" defaultChecked />
                        <Label htmlFor="match-language" className="text-sm">
                          Always respond in the same language as the incoming email
                        </Label>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fallback-lang">Fallback Language</Label>
                        <select id="fallback-lang" className="w-full p-2 border rounded-md">
                          <option value="en">English</option>
                          <option value="no">Norwegian</option>
                          <option value="sv">Swedish</option>
                        </select>
                        <p className="text-xs text-muted-foreground">
                          Used when language detection fails
                        </p>
                      </div>
                      
                      <Alert>
                        <Globe className="h-4 w-4" />
                        <AlertDescription>
                          AI responses are optimized for each language with native-level fluency 
                          and cultural context awareness.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Model Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Model Configuration</CardTitle>
                  <CardDescription>Advanced AI model settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">AI Model</Label>
                    <select id="model" className="w-full p-2 border rounded-md">
                      <option value="gpt-4">GPT-4 (Recommended)</option>
                      <option value="gpt-4-turbo">GPT-4 Turbo</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-tokens">Max Response Length (tokens)</Label>
                    <Input id="max-tokens" type="number" defaultValue="500" min="100" max="2000" />
                    <p className="text-xs text-muted-foreground">
                      Higher values allow longer responses but cost more
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input id="temperature" type="number" defaultValue="0.7" min="0" max="1" step="0.1" />
                    <p className="text-xs text-muted-foreground">
                      Controls randomness: 0 = deterministic, 1 = very creative
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Integration Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Integration & API</CardTitle>
                  <CardDescription>Advanced integration options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="webhook-enabled" />
                    <Label htmlFor="webhook-enabled" className="text-sm">
                      Enable webhook notifications
                    </Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input id="webhook-url" placeholder="https://your-app.com/webhook" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="api-access" />
                    <Label htmlFor="api-access" className="text-sm">
                      Enable API access
                    </Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>API Rate Limiting</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="100">100 requests/hour</option>
                      <option value="500">500 requests/hour</option>
                      <option value="1000">1000 requests/hour</option>
                      <option value="unlimited">Unlimited</option>
                    </select>
                  </div>
                  
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Changes to advanced settings may affect AI performance. 
                      Test thoroughly before applying to production.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Test AI Section */}
        <Card>
          <CardHeader>
            <CardTitle>Test AI Response</CardTitle>
            <CardDescription>Test your AI configuration with a sample email</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="test-email">Sample Email Content</Label>
                <Textarea
                  id="test-email"
                  className="h-32"
                  placeholder="Enter a sample email to test AI response generation..."
                />
              </div>
              <div className="space-y-2">
                <Label>AI Generated Response</Label>
                <div className="h-32 p-3 border rounded-md bg-muted/50 text-sm text-muted-foreground">
                  Click "Generate Test Response" to see AI output...
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button>
                <Bot className="mr-2 h-4 w-4" />
                Generate Test Response
              </Button>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Palette, 
  Upload,
  Download,
  Eye,
  Save,
  RefreshCw,
  Image,
  Type,
  Layout,
  Smartphone,
  Monitor,
  Mail,
  FileText,
  Zap,
  Copy,
  Check
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const colorPresets = [
  { name: "Ocean Blue", primary: "#14b8a6", secondary: "#0d9488", accent: "#059669" },
  { name: "Forest Green", primary: "#10b981", secondary: "#059669", accent: "#06d6a0" },
  { name: "Sunset Orange", primary: "#f59e0b", secondary: "#d97706", accent: "#fb923c" },
  { name: "Royal Purple", primary: "#16a34a", secondary: "#15803d", accent: "#4ade80" },
  { name: "Rose Pink", primary: "#ec4899", secondary: "#db2777", accent: "#f472b6" },
  { name: "Slate Gray", primary: "#64748b", secondary: "#475569", accent: "#94a3b8" }
];

const fontOptions = [
  { name: "Inter", category: "Sans-serif", preview: "Modern and clean" },
  { name: "Roboto", category: "Sans-serif", preview: "Google's material design" },
  { name: "Open Sans", category: "Sans-serif", preview: "Friendly and readable" },
  { name: "Nunito", category: "Sans-serif", preview: "Rounded and approachable" },
  { name: "Poppins", category: "Sans-serif", preview: "Geometric and friendly" },
  { name: "Montserrat", category: "Sans-serif", preview: "Urban and sophisticated" }
];

export function BrandingSettings() {
  const [selectedColors, setSelectedColors] = useState(colorPresets[0]);
  const [logoPreview, setLogoPreview] = useState("");
  const [faviconPreview, setFaviconPreview] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [copiedColor, setCopiedColor] = useState("");

  const handleColorPresetSelect = (preset: typeof colorPresets[0]) => {
    setSelectedColors(preset);
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(""), 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "logo" | "favicon") => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === "logo") {
          setLogoPreview(result);
        } else {
          setFaviconPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Branding Settings</h1>
            <p className="text-muted-foreground">Customize your brand appearance across all email communications</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
              <Eye className="mr-2 h-4 w-4" />
              {isPreviewMode ? "Exit Preview" : "Preview Changes"}
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="colors" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="logos">Logos & Icons</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="templates">Email Templates</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            {/* Color Scheme */}
            <Card>
              <CardHeader>
                <CardTitle>Color Scheme</CardTitle>
                <CardDescription>Choose colors that represent your brand</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Color Presets */}
                <div>
                  <Label className="text-base font-medium">Color Presets</Label>
                  <div className="grid gap-3 md:grid-cols-3 mt-3">
                    {colorPresets.map((preset, index) => (
                      <div 
                        key={index}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedColors.name === preset.name ? 'border-green-500 bg-green-50' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => handleColorPresetSelect(preset)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            <div 
                              className="w-6 h-6 rounded-full" 
                              style={{ backgroundColor: preset.primary }}
                            ></div>
                            <div 
                              className="w-6 h-6 rounded-full" 
                              style={{ backgroundColor: preset.secondary }}
                            ></div>
                            <div 
                              className="w-6 h-6 rounded-full" 
                              style={{ backgroundColor: preset.accent }}
                            ></div>
                          </div>
                          <span className="font-medium">{preset.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Colors */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Custom Colors</Label>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="color" 
                          value={selectedColors.primary}
                          className="w-12 h-10 border rounded cursor-pointer"
                          onChange={(e) => setSelectedColors({...selectedColors, primary: e.target.value})}
                        />
                        <Input value={selectedColors.primary} readOnly className="flex-1" />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(selectedColors.primary)}
                        >
                          {copiedColor === selectedColors.primary ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="color" 
                          value={selectedColors.secondary}
                          className="w-12 h-10 border rounded cursor-pointer"
                          onChange={(e) => setSelectedColors({...selectedColors, secondary: e.target.value})}
                        />
                        <Input value={selectedColors.secondary} readOnly className="flex-1" />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(selectedColors.secondary)}
                        >
                          {copiedColor === selectedColors.secondary ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Accent Color</Label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="color" 
                          value={selectedColors.accent}
                          className="w-12 h-10 border rounded cursor-pointer"
                          onChange={(e) => setSelectedColors({...selectedColors, accent: e.target.value})}
                        />
                        <Input value={selectedColors.accent} readOnly className="flex-1" />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(selectedColors.accent)}
                        >
                          {copiedColor === selectedColors.accent ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Color Preview */}
                <div className="p-4 border rounded-lg" style={{ backgroundColor: selectedColors.primary + '10' }}>
                  <h4 className="font-medium mb-3">Color Preview</h4>
                  <div className="flex items-center space-x-4">
                    <button 
                      className="px-4 py-2 rounded text-white font-medium"
                      style={{ backgroundColor: selectedColors.primary }}
                    >
                      Primary Button
                    </button>
                    <button 
                      className="px-4 py-2 rounded text-white font-medium"
                      style={{ backgroundColor: selectedColors.secondary }}
                    >
                      Secondary Button
                    </button>
                    <div 
                      className="px-3 py-1 rounded text-white text-sm"
                      style={{ backgroundColor: selectedColors.accent }}
                    >
                      Accent Badge
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logos" className="space-y-4">
            {/* Logo Upload */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Company Logo</CardTitle>
                  <CardDescription>Upload your company logo for email headers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    {logoPreview ? (
                      <div className="space-y-4">
                        <img src={logoPreview} alt="Logo preview" className="max-h-32 mx-auto" />
                        <p className="text-sm text-muted-foreground">Logo uploaded successfully</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Image className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "logo")}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <Alert>
                    <AlertDescription>
                      Recommended size: 200x60px. Formats: PNG, JPG, SVG (max 2MB)
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Favicon</CardTitle>
                  <CardDescription>Small icon that appears in browser tabs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    {faviconPreview ? (
                      <div className="space-y-4">
                        <img src={faviconPreview} alt="Favicon preview" className="w-16 h-16 mx-auto" />
                        <p className="text-sm text-muted-foreground">Favicon uploaded successfully</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-muted rounded-lg flex items-center justify-center">
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">Upload favicon</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "favicon")}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Favicon
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <Alert>
                    <AlertDescription>
                      Recommended size: 32x32px or 16x16px. Format: ICO, PNG (max 1MB)
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            {/* Typography Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Choose fonts that match your brand personality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Primary Font Family</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font, index) => (
                        <SelectItem key={index} value={font.name.toLowerCase()}>
                          <div className="flex items-center justify-between w-full">
                            <span style={{ fontFamily: font.name }}>{font.name}</span>
                            <span className="text-xs text-muted-foreground ml-4">{font.category}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Heading Font Size</Label>
                    <Select defaultValue="24">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18">18px - Small</SelectItem>
                        <SelectItem value="20">20px - Medium</SelectItem>
                        <SelectItem value="24">24px - Large</SelectItem>
                        <SelectItem value="28">28px - Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Body Font Size</Label>
                    <Select defaultValue="14">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12px - Small</SelectItem>
                        <SelectItem value="14">14px - Medium</SelectItem>
                        <SelectItem value="16">16px - Large</SelectItem>
                        <SelectItem value="18">18px - Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Font Preview */}
                <div className="p-4 border rounded-lg space-y-3">
                  <h4 className="font-medium">Typography Preview</h4>
                  <div style={{ fontFamily: 'Inter' }}>
                    <h2 className="text-2xl font-bold mb-2">This is a heading</h2>
                    <p className="text-base mb-4">
                      This is body text that would appear in your email communications. 
                      It should be easy to read and reflect your brand's personality.
                    </p>
                    <div className="flex items-center space-x-4">
                      <button 
                        className="px-4 py-2 rounded font-medium text-white"
                        style={{ backgroundColor: selectedColors.primary }}
                      >
                        Call to Action
                      </button>
                      <span className="text-sm text-muted-foreground">Small text for disclaimers</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            {/* Email Template Branding */}
            <Card>
              <CardHeader>
                <CardTitle>Email Template Branding</CardTitle>
                <CardDescription>Customize how your brand appears in email responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Tech Solutions AS" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline">Company Tagline</Label>
                  <Input id="tagline" placeholder="Your trusted AI-powered partner" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-signature">Default Email Signature</Label>
                  <Textarea 
                    id="email-signature" 
                    placeholder="Best regards,&#10;&#10;The Tech Solutions Team&#10;Email: support@techsolutions.no&#10;Phone: +47 123 45 678"
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footer-text">Email Footer Text</Label>
                  <Textarea 
                    id="footer-text" 
                    placeholder="© 2024 Tech Solutions AS. All rights reserved.&#10;This email was sent by our AI assistant."
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Include Company Logo in Emails</Label>
                    <p className="text-sm text-muted-foreground">Add your logo to the header of email responses</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Use Brand Colors in Emails</Label>
                    <p className="text-sm text-muted-foreground">Apply your brand colors to email templates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>Add social media links to your email signatures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input id="website" placeholder="https://techsolutions.no" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input id="linkedin" placeholder="https://linkedin.com/company/techsolutions" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter URL</Label>
                    <Input id="twitter" placeholder="https://twitter.com/techsolutions" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input id="facebook" placeholder="https://facebook.com/techsolutions" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            {/* Brand Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Brand Preview</CardTitle>
                <CardDescription>See how your branding will appear across different platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Preview */}
                <div className="space-y-4">
                  <h4 className="font-medium">Email Template Preview</h4>
                  <div className="border rounded-lg p-6 bg-white">
                    <div className="flex items-center space-x-4 mb-6" style={{ borderBottom: `2px solid ${selectedColors.primary}`, paddingBottom: '1rem' }}>
                      {logoPreview && <img src={logoPreview} alt="Logo" className="h-12" />}
                      <div>
                        <h3 className="font-bold text-lg">Tech Solutions AS</h3>
                        <p className="text-sm text-muted-foreground">Your trusted AI-powered partner</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="mb-4">Dear Customer,</p>
                      <p className="mb-4">
                        Thank you for contacting us. Our AI assistant has processed your inquiry and we're happy to help.
                      </p>
                      <button 
                        className="px-6 py-2 rounded text-white font-medium"
                        style={{ backgroundColor: selectedColors.primary }}
                      >
                        View Details
                      </button>
                    </div>
                    
                    <div className="border-t pt-4 text-sm text-muted-foreground">
                      <p>Best regards,</p>
                      <p className="font-medium">The Tech Solutions Team</p>
                      <p>Email: support@techsolutions.no | Phone: +47 123 45 678</p>
                      <p className="mt-2 text-xs">© 2024 Tech Solutions AS. All rights reserved.</p>
                    </div>
                  </div>
                </div>

                {/* Dashboard Preview */}
                <div className="space-y-4">
                  <h4 className="font-medium">Dashboard Preview</h4>
                  <div className="border rounded-lg p-4" style={{ backgroundColor: selectedColors.primary + '10' }}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold" style={{ color: selectedColors.primary }}>Dashboard</h3>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedColors.primary }}></div>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedColors.secondary }}></div>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedColors.accent }}></div>
                      </div>
                    </div>
                    <div className="grid gap-2 md:grid-cols-3">
                      <div className="p-3 bg-white rounded border-l-4" style={{ borderLeftColor: selectedColors.primary }}>
                        <p className="text-sm text-muted-foreground">Active Emails</p>
                        <p className="text-xl font-bold">1,247</p>
                      </div>
                      <div className="p-3 bg-white rounded border-l-4" style={{ borderLeftColor: selectedColors.secondary }}>
                        <p className="text-sm text-muted-foreground">Responses</p>
                        <p className="text-xl font-bold">892</p>
                      </div>
                      <div className="p-3 bg-white rounded border-l-4" style={{ borderLeftColor: selectedColors.accent }}>
                        <p className="text-sm text-muted-foreground">Satisfaction</p>
                        <p className="text-xl font-bold">4.8/5</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Preview */}
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Mobile Preview
                  </h4>
                  <div className="max-w-sm mx-auto border rounded-lg p-4 bg-white">
                    <div className="text-center mb-4">
                      {faviconPreview && <img src={faviconPreview} alt="Favicon" className="w-8 h-8 mx-auto mb-2" />}
                      <h4 className="font-bold" style={{ color: selectedColors.primary }}>Tech Solutions</h4>
                    </div>
                    <div className="space-y-2">
                      <button 
                        className="w-full py-2 rounded text-white font-medium"
                        style={{ backgroundColor: selectedColors.primary }}
                      >
                        Primary Action
                      </button>
                      <button 
                        className="w-full py-2 rounded text-white font-medium"
                        style={{ backgroundColor: selectedColors.secondary }}
                      >
                        Secondary Action
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
}
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Plus,
  Edit,
  Trash2,
  Copy,
  Search,
  Filter,
  Eye,
  Save,
  X,
  CheckCircle,
  Clock,
  Globe,
  Star,
  TrendingUp
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const templates = [
  {
    id: 1,
    name: "Welcome New Customer",
    category: "Onboarding",
    language: "English",
    usage: 156,
    lastUsed: "2 hours ago",
    status: "active",
    rating: 4.9,
    content: "Dear {{customerName}},\n\nWelcome to {{companyName}}! We're thrilled to have you join our community.\n\nYour account has been successfully created and you can now access all our services. If you have any questions, our support team is here to help.\n\nBest regards,\n{{senderName}}",
    variables: ["customerName", "companyName", "senderName"],
    tags: ["welcome", "onboarding", "customer"]
  },
  {
    id: 2,
    name: "Technical Support Response",
    category: "Support",
    language: "Norwegian",
    usage: 89,
    lastUsed: "1 hour ago",
    status: "active",
    rating: 4.7,
    content: "Hei {{customerName}},\n\nTakk for din henvendelse angående {{issueType}}.\n\nVi har mottatt din support-forespørsel og vårt tekniske team arbeider med å løse problemet. Du kan forvente en oppfølging innen {{responseTime}} timer.\n\nMed vennlig hilsen,\n{{supportAgent}}",
    variables: ["customerName", "issueType", "responseTime", "supportAgent"],
    tags: ["support", "technical", "norwegian"]
  },
  {
    id: 3,
    name: "Order Confirmation",
    category: "E-commerce",
    language: "English",
    usage: 234,
    lastUsed: "30 min ago",
    status: "active",
    rating: 4.8,
    content: "Hi {{customerName}},\n\nThank you for your order #{{orderNumber}}!\n\nOrder Details:\n- Total: {{orderTotal}}\n- Shipping: {{shippingMethod}}\n- Estimated delivery: {{deliveryDate}}\n\nYou'll receive a tracking number once your order ships.\n\nBest regards,\nSales Team",
    variables: ["customerName", "orderNumber", "orderTotal", "shippingMethod", "deliveryDate"],
    tags: ["order", "confirmation", "ecommerce"]
  },
  {
    id: 4,
    name: "Meeting Request Response",
    category: "Business",
    language: "Swedish",
    usage: 67,
    lastUsed: "3 hours ago",
    status: "draft",
    rating: 4.6,
    content: "Hej {{senderName}},\n\nTack för din förfrågan om ett möte.\n\nJag är tillgänglig {{availableDates}} och föreslår att vi träffas i {{duration}} minuter för att diskutera {{meetingTopic}}.\n\nLåt mig veta vilket datum som passar dig bäst.\n\nMed vänliga hälsningar,\n{{recipientName}}",
    variables: ["senderName", "availableDates", "duration", "meetingTopic", "recipientName"],
    tags: ["meeting", "business", "swedish"]
  },
  {
    id: 5,
    name: "Payment Reminder",
    category: "Billing",
    language: "English",
    usage: 45,
    lastUsed: "1 day ago",
    status: "active",
    rating: 4.4,
    content: "Dear {{customerName}},\n\nThis is a friendly reminder that your invoice #{{invoiceNumber}} for {{invoiceAmount}} is due on {{dueDate}}.\n\nYou can pay online at {{paymentLink}} or contact us if you have any questions.\n\nThank you for your business!\n\nAccounts Team",
    variables: ["customerName", "invoiceNumber", "invoiceAmount", "dueDate", "paymentLink"],
    tags: ["payment", "reminder", "billing"]
  }
];

const categories = ["All", "Onboarding", "Support", "E-commerce", "Business", "Billing"];
const languages = ["All", "English", "Norwegian", "Swedish", "Danish"];

export function EmailTemplates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<typeof templates[0] | null>(null);

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "All" || template.language === selectedLanguage;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesLanguage && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Email Templates</h1>
            <p className="text-muted-foreground">Create and manage AI-powered email templates</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Template</DialogTitle>
                <DialogDescription>
                  Create a new email template with variables and AI optimization
                </DialogDescription>
              </DialogHeader>
              {/* Template creation form would go here */}
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input id="template-name" placeholder="Enter template name..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template-category">Category</Label>
                    <select id="template-category" className="w-full p-2 border rounded-md">
                      <option>Onboarding</option>
                      <option>Support</option>
                      <option>E-commerce</option>
                      <option>Business</option>
                      <option>Billing</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-content">Template Content</Label>
                  <Textarea id="template-content" className="h-40" placeholder="Enter your template content with {{variables}}..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-tags">Tags (comma-separated)</Label>
                  <Input id="template-tags" placeholder="welcome, onboarding, customer" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button>Create Template</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Templates</p>
                  <p className="text-2xl font-bold">{templates.length}</p>
                </div>
                <FileText className="h-8 w-8 text-ai-blue" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Templates</p>
                  <p className="text-2xl font-bold">{templates.filter(t => t.status === "active").length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Usage</p>
                  <p className="text-2xl font-bold">{templates.reduce((sum, t) => sum + t.usage, 0)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-ai-purple" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">
                    {(templates.reduce((sum, t) => sum + t.rating, 0) / templates.length).toFixed(1)}
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.category}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(template.status)}>
                    {template.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Content Preview */}
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {template.content}
                    </p>
                  </div>
                  
                  {/* Variables */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Variables:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.map((variable, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Globe className="h-3 w-3" />
                        <span>{template.language}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{template.usage} uses</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{template.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Last used: {template.lastUsed}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{template.name}</DialogTitle>
                          <DialogDescription>
                            {template.category} • {template.language}
                          </DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="preview" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="variables">Variables & Usage</TabsTrigger>
                          </TabsList>
                          <TabsContent value="preview" className="space-y-4">
                            <div className="p-4 border rounded-lg bg-muted/50">
                              <pre className="whitespace-pre-wrap text-sm">{template.content}</pre>
                            </div>
                          </TabsContent>
                          <TabsContent value="variables" className="space-y-4">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Available Variables</h4>
                                <div className="grid gap-2">
                                  {template.variables.map((variable, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                                      <code className="text-sm">{`{{${variable}}}`}</code>
                                      <Button size="sm" variant="ghost">
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Usage Statistics</h4>
                                <div className="grid gap-2 md:grid-cols-2">
                                  <div className="p-3 border rounded">
                                    <p className="text-sm text-muted-foreground">Total Uses</p>
                                    <p className="text-xl font-bold">{template.usage}</p>
                                  </div>
                                  <div className="p-3 border rounded">
                                    <p className="text-sm text-muted-foreground">Average Rating</p>
                                    <p className="text-xl font-bold">{template.rating}/5.0</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="outline">
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="mr-1 h-3 w-3" />
                      Clone
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or create a new template.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Template
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
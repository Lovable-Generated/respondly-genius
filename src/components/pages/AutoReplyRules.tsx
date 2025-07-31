import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  Plus,
  Edit,
  Trash2,
  Copy,
  Search,
  Filter,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Target,
  AlertCircle
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const autoReplyRules = [
  {
    id: 1,
    name: "Technical Support Auto-Reply",
    description: "Automatically respond to technical support inquiries",
    status: "active",
    priority: 1,
    trigger: {
      type: "keywords",
      keywords: ["support", "help", "error", "bug", "issue", "problem"],
      fromDomains: ["*"],
      subjectContains: ["support", "help", "technical"]
    },
    conditions: {
      language: "any",
      timeRestriction: "business_hours",
      maxResponsesPerDay: 50
    },
    action: {
      template: "Technical Support Response",
      aiModel: "GPT-4",
      responseDelay: "immediate",
      ccTeam: true,
      escalationThreshold: 0.7
    },
    stats: {
      triggered: 234,
      successful: 228,
      failed: 6,
      avgSatisfaction: 4.8
    },
    lastTriggered: "2 minutes ago"
  },
  {
    id: 2,
    name: "Sales Inquiry Handler",
    description: "Handle product inquiries and demo requests",
    status: "active",
    priority: 2,
    trigger: {
      type: "keywords",
      keywords: ["demo", "price", "pricing", "product", "purchase", "buy"],
      fromDomains: ["*"],
      subjectContains: ["demo", "pricing", "product"]
    },
    conditions: {
      language: "any",
      timeRestriction: "always",
      maxResponsesPerDay: 100
    },
    action: {
      template: "Sales Inquiry Response",
      aiModel: "GPT-4",
      responseDelay: "immediate",
      ccTeam: true,
      escalationThreshold: 0.8
    },
    stats: {
      triggered: 156,
      successful: 152,
      failed: 4,
      avgSatisfaction: 4.6
    },
    lastTriggered: "15 minutes ago"
  },
  {
    id: 3,
    name: "Partnership Inquiries",
    description: "Handle partnership and collaboration requests",
    status: "inactive",
    priority: 3,
    trigger: {
      type: "keywords",
      keywords: ["partnership", "collaboration", "integrate", "api", "business"],
      fromDomains: ["*"],
      subjectContains: ["partnership", "collaboration"]
    },
    conditions: {
      language: "any",
      timeRestriction: "business_hours",
      maxResponsesPerDay: 20
    },
    action: {
      template: "Partnership Response",
      aiModel: "GPT-4",
      responseDelay: "30_minutes",
      ccTeam: false,
      escalationThreshold: 0.9
    },
    stats: {
      triggered: 45,
      successful: 43,
      failed: 2,
      avgSatisfaction: 4.4
    },
    lastTriggered: "2 hours ago"
  },
  {
    id: 4,
    name: "Order & Billing Support",
    description: "Handle order confirmations and billing questions",
    status: "active",
    priority: 4,
    trigger: {
      type: "keywords",
      keywords: ["order", "billing", "invoice", "payment", "receipt"],
      fromDomains: ["*"],
      subjectContains: ["order", "billing", "invoice"]
    },
    conditions: {
      language: "any",
      timeRestriction: "always",
      maxResponsesPerDay: 200
    },
    action: {
      template: "Billing Support Response",
      aiModel: "GPT-4",
      responseDelay: "immediate",
      ccTeam: false,
      escalationThreshold: 0.8
    },
    stats: {
      triggered: 89,
      successful: 87,
      failed: 2,
      avgSatisfaction: 4.9
    },
    lastTriggered: "1 hour ago"
  }
];

export function AutoReplyRules() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "inactive":
        return <XCircle className="h-4 w-4 text-gray-500" />;
      case "paused":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bot className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "bg-red-100 text-red-800";
      case 2:
        return "bg-orange-100 text-orange-800";
      case 3:
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const activeRules = autoReplyRules.filter(rule => rule.status === "active").length;
  const totalTriggers = autoReplyRules.reduce((sum, rule) => sum + rule.stats.triggered, 0);
  const totalSuccessful = autoReplyRules.reduce((sum, rule) => sum + rule.stats.successful, 0);
  const avgSuccessRate = totalTriggers > 0 ? (totalSuccessful / totalTriggers) * 100 : 0;

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Auto-Reply Rules</h1>
            <p className="text-muted-foreground">Configure intelligent rules for automatic email responses</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Auto-Reply Rule</DialogTitle>
                <DialogDescription>
                  Set up a new rule for automatic email responses
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="rule-name">Rule Name</Label>
                  <Input id="rule-name" placeholder="Technical Support Auto-Reply" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rule-description">Description</Label>
                  <Textarea id="rule-description" placeholder="Describe when this rule should trigger..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trigger-type">Trigger Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trigger type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="keywords">Keywords</SelectItem>
                        <SelectItem value="sender">Sender Domain</SelectItem>
                        <SelectItem value="subject">Subject Contains</SelectItem>
                        <SelectItem value="content">Content Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">High (1)</SelectItem>
                        <SelectItem value="2">Medium (2)</SelectItem>
                        <SelectItem value="3">Low (3)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input id="keywords" placeholder="support, help, error, bug, issue" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template">Response Template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Support Response</SelectItem>
                      <SelectItem value="sales">Sales Inquiry Response</SelectItem>
                      <SelectItem value="general">General Inquiry Response</SelectItem>
                      <SelectItem value="partnership">Partnership Response</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button>Create Rule</Button>
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
                  <p className="text-sm text-muted-foreground">Active Rules</p>
                  <p className="text-2xl font-bold">{activeRules}</p>
                </div>
                <Bot className="h-8 w-8 text-ai-blue" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Triggers</p>
                  <p className="text-2xl font-bold">{totalTriggers}</p>
                </div>
                <Zap className="h-8 w-8 text-ai-purple" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{avgSuccessRate.toFixed(1)}%</p>
                </div>
                <Target className="h-8 w-8 text-ai-green" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
                  <p className="text-2xl font-bold">
                    {(autoReplyRules.reduce((sum, rule) => sum + rule.stats.avgSatisfaction, 0) / autoReplyRules.length).toFixed(1)}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-yellow-500" />
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
                    placeholder="Search rules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="paused">Paused</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Rules List */}
        <div className="grid gap-4">
          {autoReplyRules.map((rule) => (
            <Card key={rule.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-lg">{rule.name}</CardTitle>
                      <Badge className={getStatusColor(rule.status)}>
                        {getStatusIcon(rule.status)}
                        <span className="ml-1 capitalize">{rule.status}</span>
                      </Badge>
                      <Badge className={getPriorityColor(rule.priority)}>
                        Priority {rule.priority}
                      </Badge>
                    </div>
                    <CardDescription>{rule.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked={rule.status === "active"} />
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Trigger Conditions */}
                  <div>
                    <h4 className="font-medium mb-2">Trigger Conditions</h4>
                    <div className="grid gap-2 md:grid-cols-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Keywords:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {rule.trigger.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Subject contains:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {rule.trigger.subjectContains.map((subject, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Configuration */}
                  <div>
                    <h4 className="font-medium mb-2">Action Configuration</h4>
                    <div className="grid gap-2 md:grid-cols-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Template:</span>
                        <p className="font-medium">{rule.action.template}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">AI Model:</span>
                        <p className="font-medium">{rule.action.aiModel}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Response Delay:</span>
                        <p className="font-medium capitalize">{rule.action.responseDelay.replace('_', ' ')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div>
                    <h4 className="font-medium mb-2">Performance Stats</h4>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-2xl font-bold text-ai-blue">{rule.stats.triggered}</div>
                        <div className="text-xs text-muted-foreground">Triggered</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{rule.stats.successful}</div>
                        <div className="text-xs text-muted-foreground">Successful</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{rule.stats.failed}</div>
                        <div className="text-xs text-muted-foreground">Failed</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">{rule.stats.avgSatisfaction}</div>
                        <div className="text-xs text-muted-foreground">Avg Rating</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Last triggered: {rule.lastTriggered}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rule Processing Order Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-ai-blue" />
              <span>Rule Processing Order</span>
            </CardTitle>
            <CardDescription>
              Rules are processed in priority order (1 = highest). The first matching rule will be executed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                • Rules with priority 1 are processed first
              </p>
              <p className="text-sm text-muted-foreground">
                • Only one rule can trigger per email
              </p>
              <p className="text-sm text-muted-foreground">
                • Inactive rules are skipped during processing
              </p>
              <p className="text-sm text-muted-foreground">
                • If no rules match, emails are handled manually or by default AI
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
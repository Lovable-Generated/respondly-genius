import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Key, 
  Plus,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
  Shield,
  AlertCircle,
  CheckCircle,
  Code,
  Activity
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";

const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "rsp_live_aBcDeFgHiJkLmNoPqRsTuVwXyZ123456789",
    keyPreview: "rsp_live_aBc...789",
    created: "2024-01-15",
    lastUsed: "2 minutes ago",
    permissions: ["read", "write", "admin"],
    status: "active",
    usageCount: 15420,
    rateLimit: "1000/hour",
    environment: "production"
  },
  {
    id: 2,
    name: "Development API Key",
    key: "rsp_test_123456aBcDeFgHiJkLmNoPqRsTuVwXyZ789",
    keyPreview: "rsp_test_123...789",
    created: "2024-01-10",
    lastUsed: "1 week ago",
    permissions: ["read"],
    status: "active",
    usageCount: 2340,
    rateLimit: "100/hour",
    environment: "development"
  },
  {
    id: 3,
    name: "Analytics Integration",
    key: "rsp_live_zYxWvUtSrQpOnMlKjIhGfEdCbA987654321",
    keyPreview: "rsp_live_zYx...321",
    created: "2024-01-05",
    lastUsed: "1 day ago",
    permissions: ["read"],
    status: "active",
    usageCount: 8760,
    rateLimit: "500/hour",
    environment: "production"
  },
  {
    id: 4,
    name: "Legacy Integration",
    key: "rsp_live_OldKeyForLegacySystemIntegration123",
    keyPreview: "rsp_live_Old...123",
    created: "2023-12-01",
    lastUsed: "Never",
    permissions: ["read", "write"],
    status: "inactive",
    usageCount: 0,
    rateLimit: "200/hour",
    environment: "production"
  }
];

const usageStats = [
  { period: "Last 24 hours", requests: 1240, errors: 3, successRate: 99.8 },
  { period: "Last 7 days", requests: 8960, errors: 23, successRate: 99.7 },
  { period: "Last 30 days", requests: 35420, errors: 98, successRate: 99.7 },
];

export function APIKeys() {
  const [visibleKeys, setVisibleKeys] = useState<Set<number>>(new Set());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const toggleKeyVisibility = (keyId: number) => {
    const newVisibleKeys = new Set(visibleKeys);
    if (newVisibleKeys.has(keyId)) {
      newVisibleKeys.delete(keyId);
    } else {
      newVisibleKeys.add(keyId);
    }
    setVisibleKeys(newVisibleKeys);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You would typically show a toast notification here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "revoked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case "production":
        return "bg-red-100 text-red-800";
      case "development":
        return "bg-blue-100 text-blue-800";
      case "staging":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const activeKeys = apiKeys.filter(key => key.status === "active").length;
  const totalRequests = apiKeys.reduce((sum, key) => sum + key.usageCount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">API Keys</h1>
            <p className="text-muted-foreground">Manage API keys for programmatic access to Respondly</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create API Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription>
                  Generate a new API key for accessing Respondly services
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="api-name">Key Name</Label>
                  <Input id="api-name" placeholder="Production API Key" />
                  <p className="text-xs text-muted-foreground">
                    Choose a descriptive name to identify this key
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="environment">Environment</Label>
                  <select id="environment" className="w-full p-2 border rounded-md">
                    <option value="production">Production</option>
                    <option value="development">Development</option>
                    <option value="staging">Staging</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="read-perm" defaultChecked />
                      <label htmlFor="read-perm" className="text-sm">Read access</label>
                      <p className="text-xs text-muted-foreground">View emails, analytics, and settings</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="write-perm" />
                      <label htmlFor="write-perm" className="text-sm">Write access</label>
                      <p className="text-xs text-muted-foreground">Send emails and modify templates</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="admin-perm" />
                      <label htmlFor="admin-perm" className="text-sm">Admin access</label>
                      <p className="text-xs text-muted-foreground">Manage team and billing settings</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate-limit">Rate Limit</Label>
                  <select id="rate-limit" className="w-full p-2 border rounded-md">
                    <option value="100">100 requests/hour</option>
                    <option value="500">500 requests/hour</option>
                    <option value="1000">1000 requests/hour</option>
                    <option value="5000">5000 requests/hour</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button>Generate Key</Button>
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
                  <p className="text-sm text-muted-foreground">Active Keys</p>
                  <p className="text-2xl font-bold">{activeKeys}</p>
                </div>
                <Key className="h-8 w-8 text-ai-blue" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                  <p className="text-2xl font-bold">{totalRequests.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-ai-purple" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">99.7%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Errors (24h)</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            API keys provide access to your account data. Keep them secure and never share them publicly. 
            Rotate keys regularly and revoke unused keys immediately.
          </AlertDescription>
        </Alert>

        {/* API Keys List */}
        <Card>
          <CardHeader>
            <CardTitle>Your API Keys</CardTitle>
            <CardDescription>Manage and monitor your API keys</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-ai-blue to-ai-purple rounded-lg flex items-center justify-center">
                        <Key className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{apiKey.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(apiKey.status)}>
                            {apiKey.status}
                          </Badge>
                          <Badge className={getEnvironmentColor(apiKey.environment)}>
                            {apiKey.environment}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked={apiKey.status === "active"} />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {visibleKeys.has(apiKey.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(apiKey.key)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <Label className="text-sm font-medium">API Key</Label>
                    <div className="mt-1 p-2 bg-muted rounded font-mono text-sm break-all">
                      {visibleKeys.has(apiKey.id) ? apiKey.key : apiKey.keyPreview}
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <p className="font-medium">{apiKey.created}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Used:</span>
                      <p className="font-medium">{apiKey.lastUsed}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Usage Count:</span>
                      <p className="font-medium">{apiKey.usageCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rate Limit:</span>
                      <p className="font-medium">{apiKey.rateLimit}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <span className="text-sm text-muted-foreground">Permissions:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {apiKey.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>API Usage Statistics</CardTitle>
            <CardDescription>Recent API usage across all your keys</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{stat.period}</h4>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-ai-blue">{stat.requests.toLocaleString()}</div>
                      <div className="text-muted-foreground">Requests</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-red-600">{stat.errors}</div>
                      <div className="text-muted-foreground">Errors</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600">{stat.successRate}%</div>
                      <div className="text-muted-foreground">Success Rate</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API Documentation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-5 w-5" />
              <span>API Documentation</span>
            </CardTitle>
            <CardDescription>
              Learn how to integrate with the Respondly API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Authentication</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Include your API key in the Authorization header:
                </p>
                <code className="block p-2 bg-muted rounded text-sm">
                  Authorization: Bearer your_api_key_here
                </code>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Base URL</h4>
                <code className="block p-2 bg-muted rounded text-sm">
                  https://api.respondly.ai/v1/
                </code>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Code className="mr-2 h-4 w-4" />
                  View Full Documentation
                </Button>
                <Button variant="outline">
                  Download SDKs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Plus,
  Settings,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Globe,
  Shield,
  Eye,
  EyeOff,
  Server,
  Key,
  Zap,
  Clock
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const emailAccounts = [
  {
    id: 1,
    email: "support@techsolutions.no",
    provider: "Gmail",
    status: "active",
    lastSync: "2 minutes ago",
    totalEmails: 1247,
    unreadEmails: 23,
    aiEnabled: true,
    autoReply: true,
    signature: "Best regards,\nTech Solutions Support Team",
    imapServer: "imap.gmail.com",
    smtpServer: "smtp.gmail.com",
    port: 993,
    ssl: true
  },
  {
    id: 2,
    email: "sales@techsolutions.no",
    provider: "Outlook",
    status: "active",
    lastSync: "5 minutes ago",
    totalEmails: 892,
    unreadEmails: 12,
    aiEnabled: true,
    autoReply: false,
    signature: "Best regards,\nSales Team\nTech Solutions AS",
    imapServer: "outlook.office365.com",
    smtpServer: "smtp.office365.com",
    port: 993,
    ssl: true
  },
  {
    id: 3,
    email: "info@techsolutions.no",
    provider: "Custom IMAP",
    status: "error",
    lastSync: "2 hours ago",
    totalEmails: 456,
    unreadEmails: 5,
    aiEnabled: false,
    autoReply: false,
    signature: "Tech Solutions AS\nContact us for more information",
    imapServer: "mail.techsolutions.no",
    smtpServer: "mail.techsolutions.no",
    port: 993,
    ssl: true
  }
];

const providerTemplates = {
  gmail: {
    imapServer: "imap.gmail.com",
    smtpServer: "smtp.gmail.com",
    port: 993,
    ssl: true
  },
  outlook: {
    imapServer: "outlook.office365.com",
    smtpServer: "smtp.office365.com",
    port: 993,
    ssl: true
  },
  yahoo: {
    imapServer: "imap.mail.yahoo.com",
    smtpServer: "smtp.mail.yahoo.com",
    port: 993,
    ssl: true
  }
};

export function EmailAccountsSettings() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "syncing":
        return <RefreshCw className="h-4 w-4 text-green-500 animate-spin" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "syncing":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleTestConnection = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Email Accounts</h1>
            <p className="text-muted-foreground">Manage your connected email accounts and server settings</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Email Account
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Email Account</DialogTitle>
                <DialogDescription>
                  Connect a new email account to enable AI-powered responses
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="quick" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="quick">Quick Setup</TabsTrigger>
                  <TabsTrigger value="manual">Manual Setup</TabsTrigger>
                </TabsList>
                <TabsContent value="quick" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your-email@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider">Email Provider</Label>
                    <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your email provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gmail">Gmail</SelectItem>
                        <SelectItem value="outlook">Outlook/Office 365</SelectItem>
                        <SelectItem value="yahoo">Yahoo Mail</SelectItem>
                        <SelectItem value="custom">Custom IMAP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password / App Password</Label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password" 
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      For Gmail and Outlook, use an App Password instead of your regular password for better security.
                    </AlertDescription>
                  </Alert>
                </TabsContent>
                <TabsContent value="manual" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="imap-server">IMAP Server</Label>
                      <Input id="imap-server" placeholder="imap.gmail.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imap-port">IMAP Port</Label>
                      <Input id="imap-port" type="number" placeholder="993" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-server">SMTP Server</Label>
                      <Input id="smtp-server" placeholder="smtp.gmail.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input id="smtp-port" type="number" placeholder="587" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ssl" defaultChecked />
                    <Label htmlFor="ssl">Use SSL/TLS encryption</Label>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleTestConnection} disabled={isConnecting}>
                  {isConnecting ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Zap className="mr-2 h-4 w-4" />
                  )}
                  Test & Add Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Connected Accounts</p>
                  <p className="text-2xl font-bold">{emailAccounts.length}</p>
                </div>
                <Mail className="h-8 w-8 text-ai-green" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Accounts</p>
                  <p className="text-2xl font-bold">{emailAccounts.filter(acc => acc.status === 'active').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Emails</p>
                  <p className="text-2xl font-bold">{emailAccounts.reduce((sum, acc) => sum + acc.totalEmails, 0)}</p>
                </div>
                <Globe className="h-8 w-8 text-ai-emerald" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread Emails</p>
                  <p className="text-2xl font-bold">{emailAccounts.reduce((sum, acc) => sum + acc.unreadEmails, 0)}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-ai-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email Accounts List */}
        <Card>
          <CardHeader>
            <CardTitle>Connected Email Accounts</CardTitle>
            <CardDescription>Manage your email accounts and their settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailAccounts.map((account) => (
                <div key={account.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-ai-green to-ai-emerald rounded-lg flex items-center justify-center text-white">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium">{account.email}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{account.provider}</span>
                          <span>•</span>
                          <span>Last sync: {account.lastSync}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(account.status)}>
                        {getStatusIcon(account.status)}
                        <span className="ml-1 capitalize">{account.status}</span>
                      </Badge>
                      <Switch defaultChecked={account.status === "active"} />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-4 text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">Total Emails:</span>
                      <p className="font-medium">{account.totalEmails.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Unread:</span>
                      <p className="font-medium">{account.unreadEmails}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">AI Responses:</span>
                      <p className="font-medium">{account.aiEnabled ? "Enabled" : "Disabled"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Auto-Reply:</span>
                      <p className="font-medium">{account.autoReply ? "On" : "Off"}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Server className="h-4 w-4" />
                        <span>{account.imapServer}:{account.port}</span>
                        {account.ssl && <Shield className="h-3 w-3 text-green-500" />}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="mr-1 h-3 w-3" />
                        Sync
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-1 h-3 w-3" />
                        Settings
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="mr-1 h-3 w-3" />
                        Remove
                      </Button>
                    </div>
                  </div>

                  {account.status === "error" && (
                    <Alert className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Connection failed. Please check your credentials and server settings.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Global Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Global Email Settings</CardTitle>
            <CardDescription>Settings that apply to all connected email accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automatic Email Sync</Label>
                <p className="text-sm text-muted-foreground">Automatically sync emails every few minutes</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Real-time Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified immediately when new emails arrive</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Sync Frequency</Label>
              <Select defaultValue="5">
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Every minute</SelectItem>
                  <SelectItem value="5">Every 5 minutes</SelectItem>
                  <SelectItem value="15">Every 15 minutes</SelectItem>
                  <SelectItem value="30">Every 30 minutes</SelectItem>
                  <SelectItem value="60">Every hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Email Retention Period</Label>
              <Select defaultValue="365">
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">6 months</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="0">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Archive Old Emails</Label>
                <p className="text-sm text-muted-foreground">Automatically archive emails older than retention period</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Connection Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle>Connection Troubleshooting</CardTitle>
            <CardDescription>Common issues and solutions for email account setup</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Gmail Setup</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Enable 2-factor authentication in your Google account</li>
                  <li>• Generate an App Password instead of using your regular password</li>
                  <li>• Use "imap.gmail.com" for IMAP and "smtp.gmail.com" for SMTP</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Outlook/Office 365 Setup</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use "outlook.office365.com" for both IMAP and SMTP</li>
                  <li>• Enable modern authentication in your Office 365 admin center</li>
                  <li>• Use port 993 for IMAP and 587 for SMTP</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Custom IMAP Troubleshooting</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Verify server addresses and port numbers with your email provider</li>
                  <li>• Ensure SSL/TLS is enabled for secure connections</li>
                  <li>• Check firewall settings to allow IMAP/SMTP connections</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
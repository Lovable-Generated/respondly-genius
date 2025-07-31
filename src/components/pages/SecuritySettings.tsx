import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  Key,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Trash2,
  Plus,
  Globe,
  Clock,
  User,
  FileText,
  Zap
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

const loginHistory = [
  {
    id: 1,
    timestamp: "2024-01-26 14:32:15",
    location: "Oslo, Norway",
    ipAddress: "192.168.1.100",
    device: "Chrome on Windows",
    status: "success"
  },
  {
    id: 2,
    timestamp: "2024-01-26 09:15:22",
    location: "Oslo, Norway",
    ipAddress: "192.168.1.100",
    device: "Safari on iPhone",
    status: "success"
  },
  {
    id: 3,
    timestamp: "2024-01-25 16:45:33",
    location: "Stockholm, Sweden",
    ipAddress: "81.224.45.123",
    status: "failed"
  },
  {
    id: 4,
    timestamp: "2024-01-25 11:20:45",
    location: "Oslo, Norway",
    ipAddress: "192.168.1.100",
    device: "Chrome on Windows",
    status: "success"
  }
];

const activeSessions = [
  {
    id: 1,
    device: "Chrome on Windows",
    location: "Oslo, Norway",
    ipAddress: "192.168.1.100",
    lastActive: "Active now",
    isCurrent: true
  },
  {
    id: 2,
    device: "Safari on iPhone",
    location: "Oslo, Norway",
    ipAddress: "192.168.1.101",
    lastActive: "2 hours ago",
    isCurrent: false
  },
  {
    id: 3,
    device: "Firefox on MacBook",
    location: "Bergen, Norway",
    ipAddress: "85.164.23.45",
    lastActive: "1 day ago",
    isCurrent: false
  }
];

const securityEvents = [
  {
    id: 1,
    type: "password_change",
    description: "Password changed successfully",
    timestamp: "2024-01-20 10:30:00",
    severity: "info"
  },
  {
    id: 2,
    type: "failed_login",
    description: "Failed login attempt from unknown location",
    timestamp: "2024-01-25 16:45:33",
    severity: "warning"
  },
  {
    id: 3,
    type: "2fa_enabled",
    description: "Two-factor authentication enabled",
    timestamp: "2024-01-15 14:22:10",
    severity: "success"
  },
  {
    id: 4,
    type: "api_key_created",
    description: "New API key created",
    timestamp: "2024-01-18 09:15:45",
    severity: "info"
  }
];

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Security Settings</h1>
            <p className="text-muted-foreground">Manage your account security and privacy settings</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Security Report
            </Button>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Status
            </Button>
          </div>
        </div>

        {/* Security Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Security Score</p>
                  <p className="text-2xl font-bold text-green-600">95/100</p>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">2FA Status</p>
                  <p className="text-2xl font-bold text-green-600">Enabled</p>
                </div>
                <Smartphone className="h-8 w-8 text-ai-blue" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                  <p className="text-2xl font-bold">{activeSessions.length}</p>
                </div>
                <Globe className="h-8 w-8 text-ai-purple" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p className="text-2xl font-bold">Today</p>
                </div>
                <Clock className="h-8 w-8 text-ai-green" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="authentication" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="authentication" className="space-y-4">
            {/* Password Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Password & Authentication</CardTitle>
                <CardDescription>Manage your login credentials and authentication methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Password</Label>
                    <p className="text-sm text-muted-foreground">Last changed 6 days ago</p>
                  </div>
                  <Dialog open={isPasswordChangeOpen} onOpenChange={setIsPasswordChangeOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Key className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>Enter your current password and choose a new one</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <div className="relative">
                            <Input 
                              id="current-password" 
                              type={showCurrentPassword ? "text" : "password"} 
                              placeholder="Enter current password" 
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <div className="relative">
                            <Input 
                              id="new-password" 
                              type={showNewPassword ? "text" : "password"} 
                              placeholder="Enter new password" 
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input 
                            id="confirm-password" 
                            type="password" 
                            placeholder="Confirm new password" 
                          />
                        </div>
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters.
                          </AlertDescription>
                        </Alert>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPasswordChangeOpen(false)}>Cancel</Button>
                        <Button>Update Password</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication (2FA)</Label>
                    <p className="text-sm text-muted-foreground">
                      {twoFactorEnabled ? "Enabled with authenticator app" : "Not enabled - recommended for security"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                    <Button variant="outline" size="sm">
                      {twoFactorEnabled ? "Manage" : "Setup"}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>BankID Integration</Label>
                    <p className="text-sm text-muted-foreground">Norwegian identity verification enabled</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backup Codes */}
            <Card>
              <CardHeader>
                <CardTitle>Backup Recovery Codes</CardTitle>
                <CardDescription>Use these codes if you lose access to your 2FA device</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Store these codes in a safe place. Each code can only be used once.
                    </AlertDescription>
                  </Alert>
                  <div className="grid gap-2 md:grid-cols-2 font-mono text-sm">
                    <div className="p-2 bg-muted rounded">1A2B-3C4D-5E6F</div>
                    <div className="p-2 bg-muted rounded">7G8H-9I0J-1K2L</div>
                    <div className="p-2 bg-muted rounded">3M4N-5O6P-7Q8R</div>
                    <div className="p-2 bg-muted rounded">9S0T-1U2V-3W4X</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Codes
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Generate New Codes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            {/* Active Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage devices and locations where you're signed in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-ai-blue to-ai-purple rounded-lg flex items-center justify-center text-white">
                          <Globe className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium">{session.device}</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>{session.location} • {session.ipAddress}</p>
                            <p>Last active: {session.lastActive}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {session.isCurrent && (
                          <Badge className="bg-green-100 text-green-800">Current Session</Badge>
                        )}
                        {!session.isCurrent && (
                          <Button variant="outline" size="sm">
                            <Trash2 className="mr-1 h-3 w-3" />
                            End Session
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    End All Other Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Login History */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Login Activity</CardTitle>
                <CardDescription>Recent sign-in attempts to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loginHistory.map((login) => (
                    <div key={login.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(login.status)}
                        <div>
                          <p className="font-medium text-sm">{login.timestamp}</p>
                          <p className="text-xs text-muted-foreground">
                            {login.location} • {login.ipAddress}
                            {login.device && ` • ${login.device}`}
                          </p>
                        </div>
                      </div>
                      <Badge className={login.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {login.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy Controls</CardTitle>
                <CardDescription>Control how your data is collected and used</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Activity Tracking</Label>
                    <p className="text-sm text-muted-foreground">Track usage patterns to improve service quality</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Error Reporting</Label>
                    <p className="text-sm text-muted-foreground">Send anonymous error reports to help us fix issues</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Communications</Label>
                    <p className="text-sm text-muted-foreground">Receive product updates and feature announcements</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Export</Label>
                    <p className="text-sm text-muted-foreground">Request a copy of all your personal data</p>
                  </div>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Request Export
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Account Deletion</Label>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <CardTitle>Data Retention Settings</CardTitle>
                <CardDescription>Control how long your data is stored</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Data Retention</Label>
                  <Select defaultValue="1year">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">30 days</SelectItem>
                      <SelectItem value="90days">90 days</SelectItem>
                      <SelectItem value="6months">6 months</SelectItem>
                      <SelectItem value="1year">1 year</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Activity Log Retention</Label>
                  <Select defaultValue="6months">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">30 days</SelectItem>
                      <SelectItem value="90days">90 days</SelectItem>
                      <SelectItem value="6months">6 months</SelectItem>
                      <SelectItem value="1year">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Analytics Data Retention</Label>
                  <Select defaultValue="2years">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6months">6 months</SelectItem>
                      <SelectItem value="1year">1 year</SelectItem>
                      <SelectItem value="2years">2 years</SelectItem>
                      <SelectItem value="5years">5 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            {/* Security Events Log */}
            <Card>
              <CardHeader>
                <CardTitle>Security Activity Log</CardTitle>
                <CardDescription>Recent security-related events for your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {securityEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <Shield className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{event.description}</p>
                          <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                        </div>
                      </div>
                      <Badge className={getSeverityColor(event.severity)}>
                        {event.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    View Full Activity Log
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            {/* Advanced Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Advanced Security</CardTitle>
                <CardDescription>Advanced security features for enhanced protection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Address Whitelist</Label>
                    <p className="text-sm text-muted-foreground">Only allow logins from specific IP addresses</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Automatically sign out after inactivity</p>
                  </div>
                  <Select defaultValue="24h">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="8h">8 hours</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified of all login attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Suspicious Activity Detection</Label>
                    <p className="text-sm text-muted-foreground">AI-powered threat detection</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Rate Limiting</Label>
                    <p className="text-sm text-muted-foreground">Limit API requests to prevent abuse</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Compliance & Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance & Certifications</CardTitle>
                <CardDescription>Security standards and certifications we comply with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Shield className="h-6 w-6 text-green-500" />
                      <h4 className="font-medium">GDPR Compliant</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Full compliance with EU General Data Protection Regulation
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Shield className="h-6 w-6 text-blue-500" />
                      <h4 className="font-medium">ISO 27001</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      International standard for information security management
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Lock className="h-6 w-6 text-purple-500" />
                      <h4 className="font-medium">SOC 2 Type II</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Audited security controls and operational effectiveness
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Zap className="h-6 w-6 text-orange-500" />
                      <h4 className="font-medium">Norwegian Data Act</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Compliant with Norwegian data protection laws
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
}
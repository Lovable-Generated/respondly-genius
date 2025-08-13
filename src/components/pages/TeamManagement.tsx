import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Plus,
  Mail,
  MoreHorizontal,
  Shield,
  Crown,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Settings
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@techstart.no",
    role: "Owner",
    department: "Management",
    status: "active",
    joinDate: "2023-01-15",
    lastActive: "2 minutes ago",
    permissions: ["all"],
    emailsHandled: 1250,
    avatar: "/avatars/john.jpg"
  },
  {
    id: 2,
    name: "Sarah Nielsen",
    email: "sarah@techstart.no",
    role: "Admin",
    department: "Customer Support",
    status: "active",
    joinDate: "2023-03-20",
    lastActive: "1 hour ago",
    permissions: ["manage_emails", "view_analytics", "manage_templates"],
    emailsHandled: 890,
    avatar: "/avatars/sarah.jpg"
  },
  {
    id: 3,
    name: "Erik Larsen",
    email: "erik@techstart.no",
    role: "Member",
    department: "Sales",
    status: "active",
    joinDate: "2023-06-10",
    lastActive: "3 hours ago",
    permissions: ["manage_emails", "view_analytics"],
    emailsHandled: 560,
    avatar: "/avatars/erik.jpg"
  },
  {
    id: 4,
    name: "Maria Svensson",
    email: "maria@techstart.no",
    role: "Member",
    department: "Marketing",
    status: "invited",
    joinDate: "2024-01-20",
    lastActive: "Never",
    permissions: ["manage_emails"],
    emailsHandled: 0,
    avatar: "/avatars/maria.jpg"
  },
  {
    id: 5,
    name: "Lars Hansen",
    email: "lars@techstart.no",
    role: "Member",
    department: "Customer Support",
    status: "inactive",
    joinDate: "2023-08-15",
    lastActive: "2 weeks ago",
    permissions: ["manage_emails", "view_analytics"],
    emailsHandled: 340,
    avatar: "/avatars/lars.jpg"
  }
];

const roles = [
  {
    name: "Owner",
    description: "Full access to all features and settings",
    permissions: ["All permissions"],
    color: "bg-emerald-100 text-emerald-800"
  },
  {
    name: "Admin",
    description: "Manage team, templates, and most settings",
    permissions: ["Manage team", "Manage templates", "View analytics", "Manage AI settings"],
    color: "bg-green-100 text-green-800"
  },
  {
    name: "Member",
    description: "Handle emails and view assigned analytics",
    permissions: ["Manage emails", "View basic analytics", "Use templates"],
    color: "bg-green-100 text-green-800"
  }
];

const invitePending = [
  {
    email: "newuser@company.com",
    role: "Member",
    invitedBy: "John Doe",
    invitedAt: "2024-01-25",
    expiresAt: "2024-02-01"
  },
  {
    email: "consultant@external.com",
    role: "Member",
    invitedBy: "Sarah Nielsen",
    invitedAt: "2024-01-23",
    expiresAt: "2024-01-30"
  }
];

export function TeamManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "All" || member.role === selectedRole;
    const matchesStatus = selectedStatus === "All" || member.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "inactive":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "invited":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Owner":
        return <Crown className="h-4 w-4 text-emerald-600" />;
      case "Admin":
        return <Shield className="h-4 w-4 text-green-600" />;
      case "Member":
        return <Users className="h-4 w-4 text-green-600" />;
      default:
        return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "invited":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">Manage your team members, roles, and permissions</p>
          </div>
          <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your team
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-email">Email Address</Label>
                  <Input id="invite-email" placeholder="colleague@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-role">Role</Label>
                  <select id="invite-role" className="w-full p-2 border rounded-md">
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-department">Department (Optional)</Label>
                  <Input id="invite-department" placeholder="Customer Support" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>Cancel</Button>
                <Button>Send Invitation</Button>
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
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold">{teamMembers.length}</p>
                </div>
                <Users className="h-8 w-8 text-ai-green" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                  <p className="text-2xl font-bold">{teamMembers.filter(m => m.status === "active").length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Invites</p>
                  <p className="text-2xl font-bold">{invitePending.length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Emails Handled</p>
                  <p className="text-2xl font-bold">{teamMembers.reduce((sum, m) => sum + m.emailsHandled, 0)}</p>
                </div>
                <Mail className="h-8 w-8 text-ai-emerald" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="members" className="space-y-4">
          <TabsList>
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="invites">Pending Invites</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search team members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select 
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                    >
                      <option value="All">All Roles</option>
                      <option value="Owner">Owner</option>
                      <option value="Admin">Admin</option>
                      <option value="Member">Member</option>
                    </select>
                    <select 
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                    >
                      <option value="All">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="invited">Invited</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Members List */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage your team members and their access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-gradient-to-br from-ai-green to-ai-emerald text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{member.name}</h3>
                            <Badge className={getStatusColor(member.status)}>
                              {getStatusIcon(member.status)}
                              <span className="ml-1">{member.status}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{member.department}</span>
                            <span>•</span>
                            <span>Joined {member.joinDate}</span>
                            <span>•</span>
                            <span>Last active: {member.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            {getRoleIcon(member.role)}
                            <span className="font-medium">{member.role}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {member.emailsHandled} emails handled
                          </p>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Permissions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>Understand different role capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {roles.map((role, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        {getRoleIcon(role.name)}
                        <div>
                          <h3 className="font-semibold text-lg">{role.name}</h3>
                          <Badge className={role.color}>
                            {teamMembers.filter(m => m.role === role.name).length} members
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Permissions:</p>
                        <ul className="text-sm space-y-1">
                          {role.permissions.map((permission, permIndex) => (
                            <li key={permIndex} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{permission}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invites" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Invitations</CardTitle>
                <CardDescription>Manage sent invitations and resend if needed</CardDescription>
              </CardHeader>
              <CardContent>
                {invitePending.length > 0 ? (
                  <div className="space-y-4">
                    {invitePending.map((invite, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{invite.email}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Role: {invite.role}</span>
                            <span>•</span>
                            <span>Invited by {invite.invitedBy}</span>
                            <span>•</span>
                            <span>Expires {invite.expiresAt}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Resend
                          </Button>
                          <Button size="sm" variant="outline">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No pending invitations</h3>
                    <p className="text-muted-foreground mb-4">
                      All team invitations have been accepted or expired.
                    </p>
                    <Button onClick={() => setIsInviteDialogOpen(true)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite New Member
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
}
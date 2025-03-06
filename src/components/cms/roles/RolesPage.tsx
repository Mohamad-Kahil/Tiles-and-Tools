import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Plus,
  Edit,
  Trash,
  MoreVertical,
  UserCog,
  Users,
  ShieldCheck,
  Lock,
  Eye,
  UserPlus,
} from "lucide-react";
import AddUserDialog from "./AddUserDialog";
import EditUserDialog from "./EditUserDialog";
import ChangeRoleDialog from "./ChangeRoleDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import AddRoleDialog from "./AddRoleDialog";
import EditRoleDialog from "./EditRoleDialog";
import PermissionsManager from "./PermissionsManager";

// Mock roles data
const mockRoles = [
  {
    id: "role1",
    name: "Administrator",
    description: "Full access to all system features",
    usersCount: 2,
    isSystem: true,
    permissions: {
      dashboard: ["view", "manage"],
      products: ["view", "create", "edit", "delete"],
      orders: ["view", "manage", "delete"],
      customers: ["view", "manage", "delete"],
      content: ["view", "create", "edit", "delete"],
      settings: ["view", "manage"],
      users: ["view", "create", "edit", "delete"],
    },
  },
  {
    id: "role2",
    name: "Manager",
    description: "Can manage most aspects except system settings",
    usersCount: 3,
    isSystem: true,
    permissions: {
      dashboard: ["view"],
      products: ["view", "create", "edit"],
      orders: ["view", "manage"],
      customers: ["view", "manage"],
      content: ["view", "create", "edit"],
      settings: ["view"],
      users: ["view"],
    },
  },
  {
    id: "role3",
    name: "Content Editor",
    description: "Can manage content and products",
    usersCount: 5,
    isSystem: false,
    permissions: {
      dashboard: ["view"],
      products: ["view", "create", "edit"],
      orders: ["view"],
      customers: ["view"],
      content: ["view", "create", "edit", "delete"],
      settings: [],
      users: [],
    },
  },
  {
    id: "role4",
    name: "Order Processor",
    description: "Can view and process orders",
    usersCount: 4,
    isSystem: false,
    permissions: {
      dashboard: ["view"],
      products: ["view"],
      orders: ["view", "manage"],
      customers: ["view"],
      content: [],
      settings: [],
      users: [],
    },
  },
  {
    id: "role5",
    name: "Customer Support",
    description: "Can view orders and customers to provide support",
    usersCount: 6,
    isSystem: false,
    permissions: {
      dashboard: ["view"],
      products: ["view"],
      orders: ["view"],
      customers: ["view", "manage"],
      content: ["view"],
      settings: [],
      users: [],
    },
  },
];

// Mock users data
const mockUsers = [
  {
    id: "user1",
    name: "Ahmed Mahmoud",
    email: "ahmed@decoregypt.com",
    role: "Administrator",
    lastActive: "2023-08-15T14:30:00Z",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
  },
  {
    id: "user2",
    name: "Fatima Ali",
    email: "fatima@decoregypt.com",
    role: "Administrator",
    lastActive: "2023-08-14T09:45:00Z",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
  },
  {
    id: "user3",
    name: "Mohamed Hassan",
    email: "mohamed@decoregypt.com",
    role: "Manager",
    lastActive: "2023-08-15T11:20:00Z",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
  },
  {
    id: "user4",
    name: "Laila Kamal",
    email: "laila@decoregypt.com",
    role: "Manager",
    lastActive: "2023-08-13T16:15:00Z",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laila",
  },
  {
    id: "user5",
    name: "Omar Farouk",
    email: "omar@decoregypt.com",
    role: "Manager",
    lastActive: "2023-08-12T10:30:00Z",
    status: "inactive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
  },
  {
    id: "user6",
    name: "Nour Ahmed",
    email: "nour@decoregypt.com",
    role: "Content Editor",
    lastActive: "2023-08-14T13:45:00Z",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour",
  },
  {
    id: "user7",
    name: "Khaled Ibrahim",
    email: "khaled@decoregypt.com",
    role: "Order Processor",
    lastActive: "2023-08-15T09:10:00Z",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled",
  },
  {
    id: "user8",
    name: "Amira Salah",
    email: "amira@decoregypt.com",
    role: "Customer Support",
    lastActive: "2023-08-14T15:20:00Z",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amira",
  },
];

const RolesPage = () => {
  const [activeTab, setActiveTab] = useState("roles");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);

  // Filter roles based on search term
  const filteredRoles = mockRoles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleViewPermissions = (role) => {
    setSelectedRole(role);
    setIsPermissionsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          User Roles & Permissions
        </h2>
        <div className="flex gap-2">
          {activeTab === "roles" && <AddRoleDialog />}
          {activeTab === "users" && <AddUserDialog />}
        </div>
      </div>

      <Tabs defaultValue="roles" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Roles</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={
                activeTab === "roles" ? "Search roles..." : "Search users..."
              }
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoles.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No roles found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRoles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">
                          {role.name}
                        </TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>{role.usersCount} users</TableCell>
                        <TableCell>
                          {role.isSystem ? (
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 text-blue-800"
                            >
                              System
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="bg-gray-100 text-gray-800"
                            >
                              Custom
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleViewPermissions(role)}
                              >
                                <Eye className="mr-2 h-4 w-4" /> View
                                Permissions
                              </DropdownMenuItem>
                              {!role.isSystem && (
                                <>
                                  <DropdownMenuItem>
                                    <EditRoleDialog role={role}>
                                      <div className="flex items-center w-full">
                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                        Role
                                      </div>
                                    </EditRoleDialog>
                                  </DropdownMenuItem>
                                  <ConfirmDeleteDialog
                                    title="Delete Role"
                                    description={`Are you sure you want to delete the ${role.name} role? This action cannot be undone and will affect all users with this role.`}
                                    onConfirm={() =>
                                      console.log(`Deleting role: ${role.id}`)
                                    }
                                  >
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onSelect={(e) => e.preventDefault()}
                                    >
                                      <Trash className="mr-2 h-4 w-4" /> Delete
                                      Role
                                    </DropdownMenuItem>
                                  </ConfirmDeleteDialog>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About User Roles</CardTitle>
              <CardDescription>
                Understanding role-based access control in your system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" /> System
                    Roles
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    System roles are predefined and cannot be deleted. They
                    provide essential access levels for your team members.
                  </p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      <span className="font-medium">Administrator:</span> Full
                      access to all features
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      <span className="font-medium">Manager:</span> Can manage
                      most aspects except system settings
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <UserCog className="h-4 w-4 text-primary" /> Custom Roles
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Create custom roles with specific permissions tailored to
                    your business needs and team structure.
                  </p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      Define granular permissions for each area of the system
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      Assign users to roles that match their responsibilities
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      Modify or delete custom roles as your team evolves
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full overflow-hidden bg-muted">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.lastActive).toLocaleDateString()}{" "}
                          {new Date(user.lastActive).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {user.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <EditUserDialog user={user}>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Edit className="mr-2 h-4 w-4" /> Edit User
                                </DropdownMenuItem>
                              </EditUserDialog>
                              <ChangeRoleDialog user={user}>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Lock className="mr-2 h-4 w-4" /> Change Role
                                </DropdownMenuItem>
                              </ChangeRoleDialog>
                              {user.status === "active" ? (
                                <DropdownMenuItem
                                  onClick={() =>
                                    console.log(`Deactivating user: ${user.id}`)
                                  }
                                >
                                  <Lock className="mr-2 h-4 w-4" /> Deactivate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() =>
                                    console.log(`Activating user: ${user.id}`)
                                  }
                                >
                                  <Lock className="mr-2 h-4 w-4" /> Activate
                                </DropdownMenuItem>
                              )}
                              <ConfirmDeleteDialog
                                title="Delete User"
                                description={`Are you sure you want to delete ${user.name}'s account? This action cannot be undone.`}
                                onConfirm={() =>
                                  console.log(`Deleting user: ${user.id}`)
                                }
                              >
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Trash className="mr-2 h-4 w-4" /> Delete User
                                </DropdownMenuItem>
                              </ConfirmDeleteDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Permissions Dialog */}
      <Dialog
        open={isPermissionsDialogOpen}
        onOpenChange={setIsPermissionsDialogOpen}
      >
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedRole?.name} Permissions</DialogTitle>
            <DialogDescription>
              View the detailed permissions for this role
            </DialogDescription>
          </DialogHeader>

          {selectedRole && (
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
              <PermissionsManager role={selectedRole} readOnly={true} />
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsPermissionsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RolesPage;

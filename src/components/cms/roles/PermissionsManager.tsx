import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  UserCog,
  Tag,
} from "lucide-react";

interface PermissionsManagerProps {
  role: {
    id: string;
    name: string;
    permissions: Record<string, string[]>;
  };
  onChange?: (permissions: Record<string, string[]>) => void;
  readOnly?: boolean;
}

const permissionModules = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    permissions: [
      { id: "view", name: "View Dashboard" },
      { id: "manage", name: "Manage Dashboard Widgets" },
    ],
  },
  {
    id: "products",
    name: "Products",
    icon: <Package className="h-5 w-5" />,
    permissions: [
      { id: "view", name: "View Products" },
      { id: "create", name: "Create Products" },
      { id: "edit", name: "Edit Products" },
      { id: "delete", name: "Delete Products" },
    ],
  },
  {
    id: "orders",
    name: "Orders",
    icon: <ShoppingCart className="h-5 w-5" />,
    permissions: [
      { id: "view", name: "View Orders" },
      { id: "manage", name: "Process Orders" },
      { id: "delete", name: "Delete Orders" },
    ],
  },
  {
    id: "customers",
    name: "Customers",
    icon: <Users className="h-5 w-5" />,
    permissions: [
      { id: "view", name: "View Customers" },
      { id: "manage", name: "Manage Customers" },
      { id: "delete", name: "Delete Customers" },
    ],
  },
  {
    id: "content",
    name: "Content",
    icon: <FileText className="h-5 w-5" />,
    permissions: [
      { id: "view", name: "View Content" },
      { id: "create", name: "Create Content" },
      { id: "edit", name: "Edit Content" },
      { id: "delete", name: "Delete Content" },
    ],
  },
  {
    id: "promotions",
    name: "Promotions",
    icon: <Tag className="h-5 w-5" />,
    permissions: [
      { id: "view", name: "View Promotions" },
      { id: "create", name: "Create Promotions" },
      { id: "edit", name: "Edit Promotions" },
      { id: "delete", name: "Delete Promotions" },
    ],
  },
  {
    id: "settings",
    name: "Settings",
    icon: <Settings className="h-5 w-5" />,
    permissions: [
      { id: "view", name: "View Settings" },
      { id: "manage", name: "Manage Settings" },
    ],
  },
  {
    id: "users",
    name: "Users & Roles",
    icon: <UserCog className="h-5 w-5" />,
    permissions: [
      { id: "view", name: "View Users" },
      { id: "create", name: "Create Users" },
      { id: "edit", name: "Edit Users" },
      { id: "delete", name: "Delete Users" },
    ],
  },
];

const PermissionsManager = ({
  role,
  onChange,
  readOnly = false,
}: PermissionsManagerProps) => {
  const handlePermissionChange = (
    moduleId: string,
    permissionId: string,
    checked: boolean,
  ) => {
    if (readOnly || !onChange) return;

    const currentPermissions = { ...role.permissions };
    const modulePermissions = [...(currentPermissions[moduleId] || [])];

    if (checked) {
      // Add permission if not already present
      if (!modulePermissions.includes(permissionId)) {
        modulePermissions.push(permissionId);
      }

      // If adding 'create', 'edit', or 'delete', ensure 'view' is also added
      if (permissionId !== "view" && !modulePermissions.includes("view")) {
        modulePermissions.push("view");
      }
    } else {
      // Remove permission
      const index = modulePermissions.indexOf(permissionId);
      if (index !== -1) {
        modulePermissions.splice(index, 1);
      }

      // If removing 'view', also remove all other permissions
      if (permissionId === "view") {
        // Clear all permissions for this module
        currentPermissions[moduleId] = [];
        onChange(currentPermissions);
        return;
      }
    }

    currentPermissions[moduleId] = modulePermissions;
    onChange(currentPermissions);
  };

  const handleSelectAllForModule = (moduleId: string, checked: boolean) => {
    if (readOnly || !onChange) return;

    const currentPermissions = { ...role.permissions };
    const moduleDefinition = permissionModules.find((m) => m.id === moduleId);

    if (!moduleDefinition) return;

    if (checked) {
      // Add all permissions for this module
      currentPermissions[moduleId] = moduleDefinition.permissions.map(
        (p) => p.id,
      );
    } else {
      // Remove all permissions for this module
      currentPermissions[moduleId] = [];
    }

    onChange(currentPermissions);
  };

  return (
    <div className="space-y-6">
      {permissionModules.map((module) => {
        const modulePermissions = role.permissions[module.id] || [];
        const allChecked = module.permissions.every((p) =>
          modulePermissions.includes(p.id),
        );
        const someChecked =
          !allChecked &&
          module.permissions.some((p) => modulePermissions.includes(p.id));

        return (
          <Card key={module.id} className="overflow-hidden">
            <div className="bg-muted/50 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  {module.icon}
                </div>
                <h3 className="font-medium text-lg">{module.name}</h3>
              </div>
              {!readOnly && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`select-all-${module.id}`}
                    checked={allChecked}
                    indeterminate={someChecked && !allChecked}
                    onCheckedChange={(checked) =>
                      handleSelectAllForModule(module.id, !!checked)
                    }
                  />
                  <Label
                    htmlFor={`select-all-${module.id}`}
                    className="text-sm font-medium"
                  >
                    Select All
                  </Label>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {module.permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`${module.id}-${permission.id}`}
                      checked={modulePermissions.includes(permission.id)}
                      disabled={readOnly}
                      onCheckedChange={(checked) =>
                        handlePermissionChange(
                          module.id,
                          permission.id,
                          !!checked,
                        )
                      }
                    />
                    <Label
                      htmlFor={`${module.id}-${permission.id}`}
                      className="text-sm font-medium"
                    >
                      {permission.name}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PermissionsManager;

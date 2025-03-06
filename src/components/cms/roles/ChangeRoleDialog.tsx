import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock, ShieldCheck } from "lucide-react";

const formSchema = z.object({
  role: z.string().min(1, { message: "Role is required" }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock roles for the dropdown
const availableRoles = [
  { id: "role1", name: "Administrator" },
  { id: "role2", name: "Manager" },
  { id: "role3", name: "Content Editor" },
  { id: "role4", name: "Order Processor" },
  { id: "role5", name: "Customer Support" },
];

interface ChangeRoleDialogProps {
  children?: React.ReactNode;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

const ChangeRoleDialog = ({ children, user }: ChangeRoleDialogProps) => {
  const [open, setOpen] = useState(false);

  // Find the role ID based on the role name
  const getRoleId = (roleName: string) => {
    const role = availableRoles.find((r) => r.name === roleName);
    return role ? role.id : "";
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: getRoleId(user.role),
    },
  });

  function onSubmit(values: FormValues) {
    // Get the role name for display purposes
    const roleName =
      availableRoles.find((r) => r.id === values.role)?.name || "";

    // In a real app, you would send this data to your backend
    console.log(
      `Changing role for ${user.name} from ${user.role} to ${roleName}`,
    );
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription>
            Update the role and permissions for {user.name}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-md mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Current role: <span className="font-medium">{user.role}</span>
              </div>
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableRoles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This will change what the user can access and modify in the
                    system
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Change Role</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRoleDialog;

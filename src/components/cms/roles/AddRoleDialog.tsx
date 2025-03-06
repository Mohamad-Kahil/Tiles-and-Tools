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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import PermissionsManager from "./PermissionsManager";

const formSchema = z.object({
  name: z.string().min(2, { message: "Role name is required" }),
  description: z.string().min(5, { message: "Description is required" }),
});

type FormValues = z.infer<typeof formSchema>;

const AddRoleDialog = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [roleData, setRoleData] = useState<FormValues | null>(null);
  const [permissions, setPermissions] = useState({
    dashboard: [],
    products: [],
    orders: [],
    customers: [],
    content: [],
    settings: [],
    users: [],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmitBasicInfo = (values: FormValues) => {
    setRoleData(values);
    setStep(2);
  };

  const handleCreateRole = () => {
    // In a real app, you would send the role data and permissions to your backend
    console.log("Creating role:", { ...roleData, permissions });
    setOpen(false);
    setStep(1);
    form.reset();
    setPermissions({
      dashboard: [],
      products: [],
      orders: [],
      customers: [],
      content: [],
      settings: [],
      users: [],
    });
  };

  const handleCancel = () => {
    setOpen(false);
    setStep(1);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Role
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Define the basic information for this role"
              : "Set permissions for this role"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitBasicInfo)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Store Manager" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for this role
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the responsibilities and access level of this role"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief description of what this role is for
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">Continue to Permissions</Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <PermissionsManager
                role={{ id: "new", name: roleData?.name || "", permissions }}
                onChange={setPermissions}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button type="button" onClick={handleCreateRole}>
                Create Role
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddRoleDialog;

import React from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Plus } from "lucide-react";

const formSchema = z.object({
  apiKey: z.string().min(1, { message: "API key is required" }),
  secretKey: z.string().min(1, { message: "Secret key is required" }),
  accountNumber: z.string().min(1, { message: "Account number is required" }),
  testMode: z.boolean(),
  defaultServiceLevel: z.string(),
  enableTracking: z.boolean(),
  markupPercentage: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface ConfigureCarrierDialogProps {
  children?: React.ReactNode;
  carrier: {
    name: string;
    logo: string;
    status: string;
  };
}

const ConfigureCarrierDialog = ({
  children,
  carrier,
}: ConfigureCarrierDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "API_KEY_PLACEHOLDER",
      secretKey: "SECRET_KEY_PLACEHOLDER",
      accountNumber: "ACC123456",
      testMode: false,
      defaultServiceLevel: "standard",
      enableTracking: true,
      markupPercentage: "10",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    // In a real application, you would send this data to your backend
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" /> Configure
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Configure {carrier.name}</DialogTitle>
          <DialogDescription>
            Manage your integration settings with {carrier.name}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="credentials" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="credentials">API Credentials</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>

              <TabsContent value="credentials" className="space-y-4 pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                    <img
                      src={carrier.logo}
                      alt={carrier.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{carrier.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Status:{" "}
                      <span className="text-green-600 font-medium">
                        Connected
                      </span>
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secretKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secret Key</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="testMode"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Test Mode</FormLabel>
                        <FormDescription>
                          Use the carrier's sandbox environment for testing
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="services" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="defaultServiceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Service Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="express">Express</SelectItem>
                          <SelectItem value="priority">Priority</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The default service level to use when calculating rates
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enableTracking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Enable Tracking</FormLabel>
                        <FormDescription>
                          Automatically fetch and display tracking information
                          to customers
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Available Services</h3>
                  <div className="space-y-2">
                    {[
                      {
                        id: "domestic",
                        name: "Domestic Shipping",
                        enabled: true,
                      },
                      {
                        id: "international",
                        name: "International Shipping",
                        enabled: false,
                      },
                      {
                        id: "express",
                        name: "Express Delivery",
                        enabled: true,
                      },
                      {
                        id: "sameday",
                        name: "Same Day Delivery",
                        enabled: false,
                      },
                      {
                        id: "scheduled",
                        name: "Scheduled Delivery",
                        enabled: true,
                      },
                    ].map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={service.id} checked={service.enabled} />
                        <label
                          htmlFor={service.id}
                          className="text-sm cursor-pointer"
                        >
                          {service.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="markupPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Markup Percentage</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Input {...field} className="w-20" />
                          <span className="ml-2 text-muted-foreground">%</span>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Add a percentage markup to the carrier's rates
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Pricing Rules</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">
                          Free Shipping Threshold
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Orders over EGP 2,000 qualify for free shipping
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">
                          Oversized Package Surcharge
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Add EGP 200 for packages over 20kg
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Remote Area Surcharge</div>
                        <div className="text-sm text-muted-foreground">
                          Add EGP 150 for remote areas
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Add Pricing Rule
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigureCarrierDialog;

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
import { Plus } from "lucide-react";

const formSchema = z.object({
  apiKey: z.string().min(1, { message: "API key is required" }),
  secretKey: z.string().min(1, { message: "Secret key is required" }),
  accountNumber: z.string().min(1, { message: "Account number is required" }),
  testMode: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface ConnectCarrierDialogProps {
  children?: React.ReactNode;
  carrier?: {
    name: string;
    logo: string;
  };
}

const ConnectCarrierDialog = ({
  children,
  carrier,
}: ConnectCarrierDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
      secretKey: "",
      accountNumber: "",
      testMode: true,
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    // In a real application, you would send this data to your backend
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Connect Carrier
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {carrier
              ? `Connect to ${carrier.name}`
              : "Connect Shipping Carrier"}
          </DialogTitle>
          <DialogDescription>
            Enter your API credentials to connect with the shipping carrier.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {carrier && (
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
                    Connect to enable real-time shipping rates and tracking
                  </p>
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your API key" {...field} />
                  </FormControl>
                  <FormDescription>
                    The API key provided by the carrier
                  </FormDescription>
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
                    <Input
                      type="password"
                      placeholder="Enter your secret key"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The secret key or password for authentication
                  </FormDescription>
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
                    <Input placeholder="Enter your account number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your account number with the carrier
                  </FormDescription>
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
                      Enable test mode to use the carrier's sandbox environment
                    </FormDescription>
                  </div>
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
              <Button type="submit">Connect</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectCarrierDialog;

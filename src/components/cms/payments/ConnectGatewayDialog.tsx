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
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Link2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const stripeFormSchema = z.object({
  publishableKey: z.string().min(1, { message: "Publishable key is required" }),
  secretKey: z.string().min(1, { message: "Secret key is required" }),
  webhookSecret: z.string().optional(),
  testMode: z.boolean().default(true),
});

const paypalFormSchema = z.object({
  clientId: z.string().min(1, { message: "Client ID is required" }),
  clientSecret: z.string().min(1, { message: "Client secret is required" }),
  testMode: z.boolean().default(true),
});

const fawryFormSchema = z.object({
  merchantCode: z.string().min(1, { message: "Merchant code is required" }),
  securityKey: z.string().min(1, { message: "Security key is required" }),
  testMode: z.boolean().default(true),
});

const acceptFormSchema = z.object({
  apiKey: z.string().min(1, { message: "API key is required" }),
  integrationId: z.string().min(1, { message: "Integration ID is required" }),
  iframeId: z.string().min(1, { message: "iFrame ID is required" }),
  testMode: z.boolean().default(true),
});

type StripeFormValues = z.infer<typeof stripeFormSchema>;
type PaypalFormValues = z.infer<typeof paypalFormSchema>;
type FawryFormValues = z.infer<typeof fawryFormSchema>;
type AcceptFormValues = z.infer<typeof acceptFormSchema>;

interface ConnectGatewayDialogProps {
  children?: React.ReactNode;
  gateway: {
    id: string;
    name: string;
    status: string;
    supportedMethods: string[];
    logo: string;
  };
}

const ConnectGatewayDialog = ({
  children,
  gateway,
}: ConnectGatewayDialogProps) => {
  const [open, setOpen] = useState(false);

  const stripeForm = useForm<StripeFormValues>({
    resolver: zodResolver(stripeFormSchema),
    defaultValues: {
      publishableKey: "",
      secretKey: "",
      webhookSecret: "",
      testMode: true,
    },
  });

  const paypalForm = useForm<PaypalFormValues>({
    resolver: zodResolver(paypalFormSchema),
    defaultValues: {
      clientId: "",
      clientSecret: "",
      testMode: true,
    },
  });

  const fawryForm = useForm<FawryFormValues>({
    resolver: zodResolver(fawryFormSchema),
    defaultValues: {
      merchantCode: "",
      securityKey: "",
      testMode: true,
    },
  });

  const acceptForm = useForm<AcceptFormValues>({
    resolver: zodResolver(acceptFormSchema),
    defaultValues: {
      apiKey: "",
      integrationId: "",
      iframeId: "",
      testMode: true,
    },
  });

  function onSubmitStripe(values: StripeFormValues) {
    console.log("Connecting Stripe:", values);
    setOpen(false);
  }

  function onSubmitPaypal(values: PaypalFormValues) {
    console.log("Connecting PayPal:", values);
    setOpen(false);
  }

  function onSubmitFawry(values: FawryFormValues) {
    console.log("Connecting Fawry:", values);
    setOpen(false);
  }

  function onSubmitAccept(values: AcceptFormValues) {
    console.log("Connecting Accept:", values);
    setOpen(false);
  }

  const renderForm = () => {
    switch (gateway.name) {
      case "Stripe":
        return (
          <Form {...stripeForm}>
            <form
              onSubmit={stripeForm.handleSubmit(onSubmitStripe)}
              className="space-y-6"
            >
              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Stripe Account Required</AlertTitle>
                <AlertDescription>
                  You need a Stripe account to get your API keys.
                  <a
                    href="https://dashboard.stripe.com/apikeys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    Go to Stripe Dashboard
                  </a>
                </AlertDescription>
              </Alert>

              <FormField
                control={stripeForm.control}
                name="publishableKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publishable Key</FormLabel>
                    <FormControl>
                      <Input placeholder="pk_test_..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Your Stripe publishable key (starts with pk_)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={stripeForm.control}
                name="secretKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secret Key</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="sk_test_..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your Stripe secret key (starts with sk_)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={stripeForm.control}
                name="webhookSecret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Webhook Secret (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="whsec_..." {...field} />
                    </FormControl>
                    <FormDescription>
                      For real-time payment notifications
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={stripeForm.control}
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
                        Use Stripe test environment (no real charges)
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
                <Button type="submit">Connect Stripe</Button>
              </DialogFooter>
            </form>
          </Form>
        );

      case "PayPal":
        return (
          <Form {...paypalForm}>
            <form
              onSubmit={paypalForm.handleSubmit(onSubmitPaypal)}
              className="space-y-6"
            >
              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>PayPal Developer Account Required</AlertTitle>
                <AlertDescription>
                  You need a PayPal Developer account to get your API
                  credentials.
                  <a
                    href="https://developer.paypal.com/dashboard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    Go to PayPal Developer Dashboard
                  </a>
                </AlertDescription>
              </Alert>

              <FormField
                control={paypalForm.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Your PayPal client ID from the developer dashboard
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={paypalForm.control}
                name="clientSecret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Secret</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your PayPal client secret from the developer dashboard
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={paypalForm.control}
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
                      <FormLabel>Sandbox Mode</FormLabel>
                      <FormDescription>
                        Use PayPal sandbox environment (no real charges)
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
                <Button type="submit">Connect PayPal</Button>
              </DialogFooter>
            </form>
          </Form>
        );

      case "Fawry":
        return (
          <Form {...fawryForm}>
            <form
              onSubmit={fawryForm.handleSubmit(onSubmitFawry)}
              className="space-y-6"
            >
              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Fawry Business Account Required</AlertTitle>
                <AlertDescription>
                  You need a Fawry business account to get your merchant
                  credentials.
                  <a
                    href="https://fawry.com/business/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    Contact Fawry Business
                  </a>
                </AlertDescription>
              </Alert>

              <FormField
                control={fawryForm.control}
                name="merchantCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Merchant Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Your Fawry merchant code</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={fawryForm.control}
                name="securityKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security Key</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>Your Fawry security key</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={fawryForm.control}
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
                        Use Fawry test environment (no real charges)
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
                <Button type="submit">Connect Fawry</Button>
              </DialogFooter>
            </form>
          </Form>
        );

      case "Accept":
        return (
          <Form {...acceptForm}>
            <form
              onSubmit={acceptForm.handleSubmit(onSubmitAccept)}
              className="space-y-6"
            >
              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Accept Account Required</AlertTitle>
                <AlertDescription>
                  You need an Accept account to get your API credentials.
                  <a
                    href="https://accept.paymobsolutions.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    Go to Accept Dashboard
                  </a>
                </AlertDescription>
              </Alert>

              <FormField
                control={acceptForm.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Key</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Your Accept API key</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={acceptForm.control}
                name="integrationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Integration ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Your Accept integration ID
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={acceptForm.control}
                name="iframeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>iFrame ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Your Accept iFrame ID for card payments
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={acceptForm.control}
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
                        Use Accept test environment (no real charges)
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
                <Button type="submit">Connect Accept</Button>
              </DialogFooter>
            </form>
          </Form>
        );

      default:
        return (
          <div className="py-8 text-center">
            <p>Configuration for {gateway.name} is not available yet.</p>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <img
              src={gateway.logo}
              alt={gateway.name}
              className="h-8 max-w-[120px] object-contain"
            />
            <DialogTitle>
              {gateway.status === "connected" ? "Configure" : "Connect"}{" "}
              {gateway.name}
            </DialogTitle>
          </div>
          <DialogDescription>
            {gateway.status === "connected"
              ? `Update your ${gateway.name} integration settings`
              : `Connect your ${gateway.name} account to start accepting payments`}
          </DialogDescription>
        </DialogHeader>

        {renderForm()}
      </DialogContent>
    </Dialog>
  );
};

export default ConnectGatewayDialog;

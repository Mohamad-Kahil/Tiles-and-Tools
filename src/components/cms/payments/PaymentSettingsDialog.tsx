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
import { Settings } from "lucide-react";

const generalFormSchema = z.object({
  currencyCode: z.string().min(3, { message: "Currency code is required" }),
  currencySymbol: z.string().min(1, { message: "Currency symbol is required" }),
  decimalPlaces: z.string().regex(/^\d+$/, { message: "Must be a number" }),
  showCurrencyCode: z.boolean().default(false),
  thousandsSeparator: z.string().min(1, { message: "Separator is required" }),
  decimalSeparator: z.string().min(1, { message: "Separator is required" }),
});

const securityFormSchema = z.object({
  enable3dSecure: z.boolean().default(true),
  enableFraudDetection: z.boolean().default(true),
  requireCvv: z.boolean().default(true),
  requireBillingAddress: z.boolean().default(true),
  allowGuestCheckout: z.boolean().default(true),
  ipBlacklist: z.string().optional(),
});

type GeneralFormValues = z.infer<typeof generalFormSchema>;
type SecurityFormValues = z.infer<typeof securityFormSchema>;

const PaymentSettingsDialog = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const generalForm = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      currencyCode: "EGP",
      currencySymbol: "£",
      decimalPlaces: "2",
      showCurrencyCode: false,
      thousandsSeparator: ",",
      decimalSeparator: ".",
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      enable3dSecure: true,
      enableFraudDetection: true,
      requireCvv: true,
      requireBillingAddress: true,
      allowGuestCheckout: true,
      ipBlacklist: "",
    },
  });

  function onSubmitGeneral(values: GeneralFormValues) {
    // In a real app, you would send this data to your backend
    console.log("Updating general payment settings:", values);
    setOpen(false);
  }

  function onSubmitSecurity(values: SecurityFormValues) {
    // In a real app, you would send this data to your backend
    console.log("Updating security payment settings:", values);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" /> Payment Settings
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Payment Settings</DialogTitle>
          <DialogDescription>
            Configure global payment settings for your store
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="general"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 py-4">
            <Form {...generalForm}>
              <form
                onSubmit={generalForm.handleSubmit(onSubmitGeneral)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={generalForm.control}
                    name="currencyCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency Code</FormLabel>
                        <FormControl>
                          <Input placeholder="EGP" {...field} />
                        </FormControl>
                        <FormDescription>
                          ISO currency code (e.g., EGP, USD)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="currencySymbol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency Symbol</FormLabel>
                        <FormControl>
                          <Input placeholder="£" {...field} />
                        </FormControl>
                        <FormDescription>
                          Symbol to display (e.g., £, $)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={generalForm.control}
                    name="decimalPlaces"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Decimal Places</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="4" {...field} />
                        </FormControl>
                        <FormDescription>
                          Number of decimal places to display
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="showCurrencyCode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-6">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Show Currency Code</FormLabel>
                          <FormDescription>
                            Display the currency code alongside the symbol
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={generalForm.control}
                    name="thousandsSeparator"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thousands Separator</FormLabel>
                        <FormControl>
                          <Input placeholder="," {...field} />
                        </FormControl>
                        <FormDescription>
                          Character to separate thousands (e.g., ,)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="decimalSeparator"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Decimal Separator</FormLabel>
                        <FormControl>
                          <Input placeholder="." {...field} />
                        </FormControl>
                        <FormDescription>
                          Character to separate decimals (e.g., .)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
          </TabsContent>

          <TabsContent value="security" className="space-y-6 py-4">
            <Form {...securityForm}>
              <form
                onSubmit={securityForm.handleSubmit(onSubmitSecurity)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={securityForm.control}
                    name="enable3dSecure"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Enable 3D Secure</FormLabel>
                          <FormDescription>
                            Add an extra layer of security for card payments
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="enableFraudDetection"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Enable Fraud Detection</FormLabel>
                          <FormDescription>
                            Automatically detect and block suspicious
                            transactions
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="requireCvv"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Require CVV</FormLabel>
                          <FormDescription>
                            Require customers to enter card verification value
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="requireBillingAddress"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Require Billing Address</FormLabel>
                          <FormDescription>
                            Require customers to enter billing address for
                            payments
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="allowGuestCheckout"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Allow Guest Checkout</FormLabel>
                          <FormDescription>
                            Allow customers to check out without creating an
                            account
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="ipBlacklist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IP Blacklist</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter IP addresses to block, one per line"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Block payments from specific IP addresses
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSettingsDialog;

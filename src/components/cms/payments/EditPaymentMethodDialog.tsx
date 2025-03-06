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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Method name is required" }),
  provider: z.string().min(1, { message: "Provider is required" }),
  processingFee: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  isDefault: z.boolean(),
  supportedCards: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditPaymentMethodDialogProps {
  children?: React.ReactNode;
  method: {
    id: string;
    name: string;
    provider: string;
    status: string;
    isDefault: boolean;
    supportedCards: string[];
    processingFee: string;
  };
}

const EditPaymentMethodDialog = ({
  children,
  method,
}: EditPaymentMethodDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: method.name,
      provider: method.provider,
      processingFee: method.processingFee,
      status: method.status as "active" | "inactive",
      isDefault: method.isDefault,
      supportedCards: method.supportedCards || [],
    },
  });

  function onSubmit(values: FormValues) {
    // In a real app, you would send this data to your backend
    console.log("Updating payment method:", { ...values, id: method.id });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Payment Method</DialogTitle>
          <DialogDescription>
            Update the payment method details
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    The name displayed to customers during checkout
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Stripe">Stripe</SelectItem>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                      <SelectItem value="Fawry">Fawry</SelectItem>
                      <SelectItem value="Accept">Accept</SelectItem>
                      <SelectItem value="Manual">Manual Processing</SelectItem>
                      <SelectItem value="Internal">
                        Internal (e.g., Cash on Delivery)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The payment service provider that processes this payment
                    method
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="processingFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Processing Fee</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    The fee charged for processing this payment method
                    (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Active methods are available during checkout
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supportedCards"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Supported Cards</FormLabel>
                      <FormDescription>
                        Select the card types this method accepts
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {["visa", "mastercard", "amex", "discover"].map(
                        (card) => (
                          <FormField
                            key={card}
                            control={form.control}
                            name="supportedCards"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={card}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(card)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              card,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== card,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {card.charAt(0).toUpperCase() +
                                      card.slice(1)}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ),
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={method.isDefault}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Set as default payment method</FormLabel>
                    <FormDescription>
                      {method.isDefault
                        ? "This is already the default payment method"
                        : "This will be pre-selected during checkout"}
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
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaymentMethodDialog;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CreditCard, Truck, Check, MapPin } from "lucide-react";

import { useCart } from "@/components/cart/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation, formatCurrency } from "@/lib/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Form schema
const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 digits" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  governorate: z.string().min(2, { message: "Governorate is required" }),
  postalCode: z.string().optional(),
  paymentMethod: z.enum(["credit-card", "cash-on-delivery", "fawry"]),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const { language, direction } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      governorate: "",
      postalCode: "",
      paymentMethod: "credit-card",
      notes: "",
    },
  });

  // Calculate shipping cost (free over 5000 EGP)
  const shippingCost = subtotal > 5000 ? 0 : 100;

  // Calculate total
  const total = subtotal + shippingCost;

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Order submitted:", { ...data, items, total });

    // Generate a random order ID
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    // Show success toast
    toast({
      title: getTranslation("orderConfirmedTitle", language),
      description: getTranslation("orderConfirmedDescription", language),
      variant: "default",
    });

    // Clear cart and redirect to confirmation page
    clearCart();
    navigate("/checkout/confirmation", { state: { orderId } });
  };

  // Egyptian governorates
  const governorates = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Qalyubia",
    "Sharqia",
    "Gharbia",
    "Menoufia",
    "Beheira",
    "Kafr El Sheikh",
    "Damietta",
    "Port Said",
    "Ismailia",
    "Suez",
    "Dakahlia",
    "Faiyum",
    "Beni Suef",
    "Minya",
    "Asyut",
    "Sohag",
    "Qena",
    "Luxor",
    "Aswan",
    "Red Sea",
    "New Valley",
    "Matrouh",
    "North Sinai",
    "South Sinai",
  ];

  return (
    <div className={`min-h-screen bg-background flex flex-col ${direction}`}>
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to="/cart" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              {getTranslation("backToCart", language)}
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {getTranslation("checkout", language)}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-muted rounded-lg">
            <h2 className="text-2xl font-medium mb-2">
              {getTranslation("emptyCart", language)}
            </h2>
            <p className="text-muted-foreground mb-6">
              {getTranslation("needItemsBeforeCheckout", language)}
            </p>
            <Button asChild>
              <Link to="/products">
                {getTranslation("browseProducts", language)}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Contact Information */}
                  <div className="bg-card rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-medium mb-4">
                      {getTranslation("contactInformation", language)}
                    </h2>
                    <Separator className="mb-6" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {getTranslation("firstName", language)}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {getTranslation("lastName", language)}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {getTranslation("emailAddress", language)}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="john.doe@example.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {getTranslation("phoneNumber", language)}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="01234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-card rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-medium mb-4">
                      {getTranslation("shippingAddress", language)}
                    </h2>
                    <Separator className="mb-6" />

                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {getTranslation("streetAddress", language)}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="123 Main St, Apt 4B"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {getTranslation("city", language)}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Cairo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="governorate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {getTranslation("governorate", language)}
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={getTranslation(
                                        "selectGovernorate",
                                        language,
                                      )}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {governorates.map((governorate) => (
                                    <SelectItem
                                      key={governorate}
                                      value={governorate}
                                    >
                                      {governorate}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {getTranslation("postalCodeOptional", language)}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="12345" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {getTranslation("orderNotesOptional", language)}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={getTranslation(
                                  "specialInstructions",
                                  language,
                                )}
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-card rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-medium mb-4">
                      {getTranslation("paymentMethod", language)}
                    </h2>
                    <Separator className="mb-6" />

                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-muted/50 cursor-pointer">
                                <RadioGroupItem
                                  value="credit-card"
                                  id="credit-card"
                                />
                                <Label
                                  htmlFor="credit-card"
                                  className="flex-1 cursor-pointer"
                                >
                                  <div className="flex items-center">
                                    <CreditCard className="mr-2 h-5 w-5 text-primary" />
                                    <span>
                                      {getTranslation(
                                        "creditDebitCard",
                                        language,
                                      )}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {getTranslation(
                                      "paySecurelyWithCard",
                                      language,
                                    )}
                                  </p>
                                </Label>
                                <div className="flex space-x-1">
                                  <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                                    alt="Mastercard"
                                    className="h-6 w-auto"
                                  />
                                  <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                                    alt="Visa"
                                    className="h-6 w-auto"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-muted/50 cursor-pointer">
                                <RadioGroupItem
                                  value="cash-on-delivery"
                                  id="cash-on-delivery"
                                />
                                <Label
                                  htmlFor="cash-on-delivery"
                                  className="flex-1 cursor-pointer"
                                >
                                  <div className="flex items-center">
                                    <Truck className="mr-2 h-5 w-5 text-primary" />
                                    <span>
                                      {getTranslation(
                                        "cashOnDelivery",
                                        language,
                                      )}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {getTranslation("payWhenReceive", language)}
                                  </p>
                                </Label>
                              </div>

                              <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-muted/50 cursor-pointer">
                                <RadioGroupItem value="fawry" id="fawry" />
                                <Label
                                  htmlFor="fawry"
                                  className="flex-1 cursor-pointer"
                                >
                                  <div className="flex items-center">
                                    <img
                                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Fawry_logo.svg/200px-Fawry_logo.svg.png"
                                      alt="Fawry"
                                      className="mr-2 h-5 w-auto"
                                    />
                                    <span>Fawry</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {getTranslation("payViaFawry", language)}
                                  </p>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="lg:hidden">
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? getTranslation("processing", language)
                        : getTranslation("placeOrder", language)}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-medium mb-4">
                  {getTranslation("orderSummary", language)}
                </h2>
                <Separator className="mb-4" />

                {/* Item count */}
                <div className="text-sm text-muted-foreground mb-4">
                  {items.length}{" "}
                  {items.length === 1
                    ? getTranslation("item", language)
                    : getTranslation("items", language)}{" "}
                  {getTranslation("inCart", language)}
                </div>

                {/* Item list */}
                <div className="max-h-64 overflow-auto mb-4 space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium line-clamp-1">
                          {item.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(item.price, language)} ×{" "}
                          {item.quantity}
                        </div>
                        <div className="text-sm font-medium">
                          {formatCurrency(item.price * item.quantity, language)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="mb-4" />

                {/* Price calculations */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {getTranslation("subtotal", language)}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(subtotal, language)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {getTranslation("shipping", language)}
                    </span>
                    <span className="font-medium">
                      {shippingCost === 0
                        ? getTranslation("free", language)
                        : formatCurrency(shippingCost, language)}
                    </span>
                  </div>

                  {subtotal < 5000 && (
                    <div className="text-xs text-muted-foreground">
                      {getTranslation("addMore", language)}{" "}
                      {formatCurrency(5000 - subtotal, language)}{" "}
                      {getTranslation("forFreeShipping", language)}
                    </div>
                  )}

                  <Separator className="my-2" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>{getTranslation("total", language)}</span>
                    <span className="text-primary">
                      {formatCurrency(total, language)}
                    </span>
                  </div>

                  {/* Place order button (desktop) */}
                  <div className="hidden lg:block mt-6">
                    <Button
                      onClick={form.handleSubmit(onSubmit)}
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? getTranslation("processing", language)
                        : getTranslation("placeOrder", language)}
                    </Button>
                  </div>

                  {/* Secure checkout notice */}
                  <div className="mt-4 text-xs text-muted-foreground flex items-center justify-center">
                    <Check className="h-3 w-3 mr-1" />{" "}
                    {getTranslation("secureCheckout", language)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;

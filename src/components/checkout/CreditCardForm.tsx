import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Calendar, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be at least 16 digits" })
    .max(19, { message: "Card number must be at most 19 digits" })
    .regex(/^[0-9\s-]+$/, { message: "Card number must contain only digits" }),
  cardholderName: z.string().min(3, { message: "Cardholder name is required" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
    message: "Expiry date must be in MM/YY format",
  }),
  cvv: z
    .string()
    .min(3, { message: "CVV must be at least 3 digits" })
    .max(4, { message: "CVV must be at most 4 digits" })
    .regex(/^[0-9]+$/, { message: "CVV must contain only digits" }),
});

type FormValues = z.infer<typeof formSchema>;

interface CreditCardFormProps {
  onSubmit: () => void;
  isSubmitting: boolean;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const [cardType, setCardType] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  // Format card number as user types
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date as user types
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  // Detect card type based on first digits
  const detectCardType = (number: string) => {
    const re = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover:
        /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
    };

    if (re.visa.test(number)) {
      return "visa";
    } else if (re.mastercard.test(number)) {
      return "mastercard";
    } else if (re.amex.test(number)) {
      return "amex";
    } else if (re.discover.test(number)) {
      return "discover";
    } else {
      return "";
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatCardNumber(value);
    form.setValue("cardNumber", formattedValue);
    setCardType(detectCardType(value.replace(/\s+/g, "")));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatExpiryDate(value);
    form.setValue("expiryDate", formattedValue);
  };

  const handleFormSubmit = (data: FormValues) => {
    console.log("Credit card data:", data);
    onSubmit();
  };

  return (
    <div className="bg-card rounded-lg shadow-sm p-6 mt-4">
      <h3 className="text-lg font-medium mb-4">Enter Card Details</h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="1234 5678 9012 3456"
                      {...field}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                      <CreditCard className="h-4 w-4 text-muted-foreground mr-1" />
                      {cardType && (
                        <img
                          src={`/card-icons/${cardType}.svg`}
                          alt={cardType}
                          className="h-6 w-auto"
                        />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardholderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cardholder Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="MM/YY"
                        {...field}
                        onChange={handleExpiryDateChange}
                        maxLength={5}
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="123"
                        {...field}
                        type="password"
                        maxLength={4}
                      />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-4 text-xs text-muted-foreground text-center">
        <p>Your payment information is secure and encrypted</p>
        <div className="flex justify-center items-center gap-2 mt-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png"
            alt="Stripe"
            className="h-4 w-auto"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Verified_by_Visa.svg/1280px-Verified_by_Visa.svg.png"
            alt="Verified by Visa"
            className="h-4 w-auto"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Mastercard_Securecode.svg/1280px-Mastercard_Securecode.svg.png"
            alt="Mastercard SecureCode"
            className="h-4 w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;

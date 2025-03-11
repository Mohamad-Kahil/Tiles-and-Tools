import React from "react";
import { CreditCard, Truck, AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { getTranslation } from "@/lib/i18n";

interface PaymentMethodsProps {
  language: string;
  field: any;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ language, field }) => {
  return (
    <FormItem className="space-y-3">
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="space-y-3"
        >
          {/* Credit/Debit Card */}
          <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="credit-card" id="credit-card" />
            <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
              <div className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-primary" />
                <span>{getTranslation("creditDebitCard", language)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {getTranslation("paySecurelyWithCard", language)}
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

          {/* Cash on Delivery */}
          <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
            <Label htmlFor="cash-on-delivery" className="flex-1 cursor-pointer">
              <div className="flex items-center">
                <Truck className="mr-2 h-5 w-5 text-primary" />
                <span>{getTranslation("cashOnDelivery", language)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {getTranslation("payWhenReceive", language)}
              </p>
            </Label>
          </div>

          {/* Fawry */}
          <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="fawry" id="fawry" />
            <Label htmlFor="fawry" className="flex-1 cursor-pointer">
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

          {/* Meeza */}
          <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="meeza" id="meeza" />
            <Label htmlFor="meeza" className="flex-1 cursor-pointer">
              <div className="flex items-center">
                <img
                  src="https://www.meezacard.com/wp-content/uploads/2021/03/meeza-logo.png"
                  alt="Meeza"
                  className="mr-2 h-5 w-auto"
                />
                <span>Meeza</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Pay with your Egyptian national payment card
              </p>
            </Label>
          </div>

          {/* Vodafone Cash */}
          <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="vodafone-cash" id="vodafone-cash" />
            <Label htmlFor="vodafone-cash" className="flex-1 cursor-pointer">
              <div className="flex items-center">
                <img
                  src="https://www.vodafone.com.eg/public/upload/images/logo.png"
                  alt="Vodafone Cash"
                  className="mr-2 h-5 w-auto"
                />
                <span>Vodafone Cash</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Pay using your Vodafone Cash wallet
              </p>
            </Label>
          </div>

          {/* Bank Transfer */}
          <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-muted/50 cursor-pointer">
            <RadioGroupItem value="bank-transfer" id="bank-transfer" />
            <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer">
              <div className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-primary" />
                <span>Bank Transfer</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Pay via bank transfer to our account (instructions will be sent
                by email)
              </p>
            </Label>
          </div>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default PaymentMethods;

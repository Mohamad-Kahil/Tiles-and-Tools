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
import { Edit } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Zone name is required" }),
  regions: z
    .array(z.string())
    .min(1, { message: "At least one region is required" }),
  status: z.enum(["active", "inactive"]),
});

type FormValues = z.infer<typeof formSchema>;

interface EditShippingZoneDialogProps {
  children?: React.ReactNode;
  zone: {
    name: string;
    regions: string[];
    status: string;
  };
}

const EditShippingZoneDialog = ({
  children,
  zone,
}: EditShippingZoneDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const egyptRegions = [
    "Cairo",
    "Giza",
    "Alexandria",
    "Luxor",
    "Aswan",
    "Hurghada",
    "Sharm El Sheikh",
    "Tanta",
    "Mansoura",
    "Zagazig",
    "Damanhur",
    "Minya",
    "Asyut",
    "Fayoum",
    "Port Said",
    "Suez",
    "Ismailia",
    "Beni Suef",
    "Sohag",
    "Qena",
    "Dahab",
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: zone.name,
      regions: zone.regions,
      status: zone.status.toLowerCase() as "active" | "inactive",
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
          <Button variant="ghost" size="sm">
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Shipping Zone</DialogTitle>
          <DialogDescription>
            Update the shipping zone details and regions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive name for this shipping zone
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Regions</FormLabel>
              <FormDescription>
                Select the regions that belong to this shipping zone
              </FormDescription>

              <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  {egyptRegions.map((region) => (
                    <FormField
                      key={region}
                      control={form.control}
                      name="regions"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={region}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(region)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, region])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== region,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {region}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
              <FormMessage>
                {form.formState.errors.regions?.message}
              </FormMessage>
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value === "active"}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? "active" : "inactive");
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Active</FormLabel>
                    <FormDescription>Enable this shipping zone</FormDescription>
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

export default EditShippingZoneDialog;

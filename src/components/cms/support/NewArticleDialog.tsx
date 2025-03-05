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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title is required" }),
  category: z.string().min(1, { message: "Please select a category" }),
  content: z.string().min(20, { message: "Content is required" }),
  excerpt: z.string().min(10, { message: "Excerpt is required" }),
  status: z.string().min(1, { message: "Please select a status" }),
  tags: z.string().optional(),
});

type NewArticleFormValues = z.infer<typeof formSchema>;

interface NewArticleDialogProps {
  children?: React.ReactNode;
}

const NewArticleDialog = ({ children }: NewArticleDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm<NewArticleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      excerpt: "",
      status: "draft",
      tags: "",
    },
  });

  function onSubmit(values: NewArticleFormValues) {
    console.log(values);
    // In a real application, you would send this data to your backend
    // and create a new knowledge base article
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Article
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Knowledge Base Article</DialogTitle>
          <DialogDescription>
            Add a new article to your knowledge base to help customers find
            answers to common questions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter article title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="orders_shipping">
                          Orders & Shipping
                        </SelectItem>
                        <SelectItem value="products">Products</SelectItem>
                        <SelectItem value="returns_refunds">
                          Returns & Refunds
                        </SelectItem>
                        <SelectItem value="account_billing">
                          Account & Billing
                        </SelectItem>
                        <SelectItem value="installation_services">
                          Installation & Services
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief summary of the article"
                      className="h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A short summary that will appear in search results and
                    article listings
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Full article content. HTML is supported."
                      className="min-h-[200px] font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can use HTML formatting for rich content
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="tag1, tag2, tag3" {...field} />
                  </FormControl>
                  <FormDescription>
                    Comma-separated tags to help with article categorization and
                    search
                  </FormDescription>
                  <FormMessage />
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
              <Button type="submit">Create Article</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewArticleDialog;

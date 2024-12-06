"use client";
import React, { useEffect, useMemo } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductFormInputs, productSchema } from "@/lib/type";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@radix-ui/react-select";

type Product = ProductFormInputs & {
  id: number;
  documentId: string;
  images: { url: string }[];
  categories: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
  }[];
};

type DialogBoxProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialData?: Partial<ProductFormInputs>;
  onSubmit: (data: ProductFormInputs) => Promise<void>;
};

function DialogBox({
  isOpen,
  onOpenChange,
  mode,
  initialData,
  onSubmit,
}: DialogBoxProps) {
  const defaultValues = useMemo(
    () => ({
      name: initialData?.name || "",
      price: initialData?.price || 0,
      description: initialData?.description || "",
      slug: initialData?.slug || "",
    }),
    [initialData]
  );

  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    // Reset form with new values when dialog opens or initialData changes
    form.reset(defaultValues);
  }, [isOpen, mode, initialData, form.reset, defaultValues]);

  const handleSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    await onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Fill in the details to add a new product"
              : "Modify the product details"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      className="min-h-[120px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter product price"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="product-slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {mode === "add" ? "Add Product" : "Update Product"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;

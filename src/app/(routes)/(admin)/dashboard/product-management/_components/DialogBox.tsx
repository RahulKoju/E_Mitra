"use client";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductFormInputs, productSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ImagePlusIcon, Loader2Icon } from "lucide-react";
import MultiSelect from "./MultiSelect";
import Image from "next/image";
import { useAuth } from "@/app/_context/AuthContext";
import { toast } from "sonner";

type DialogBoxProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialData?: Partial<ProductFormInputs> & {
    images?: { url: string }[];
  };
  onSubmit: (data: ProductFormInputs) => Promise<void>;
};

type Category = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
};

function DialogBox({
  isOpen,
  onOpenChange,
  mode,
  initialData,
  onSubmit,
}: DialogBoxProps) {
  const { jwt } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const getCategoryList = async () => {
    try {
      const res = await GlobalAPI.getCategory();
      setCategories(
        res.data.data.map((cat: any) => ({
          id: cat.id,
          documentId: cat.documentId,
          name: cat.name,
          slug: cat.slug,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const defaultValues = useMemo(
    () => ({
      name: initialData?.name || "",
      price: initialData?.price || 0,
      description: initialData?.description || "",
      slug: initialData?.slug || "",
      categories: initialData?.categories || [],
    }),
    [initialData]
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
    setIsSubmitting(false);
    setSelectedImages([]);
  }, [isOpen, mode, initialData, reset, defaultValues]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const validImages = fileArray.filter((file) => {
        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          toast.error("Image size should not exceed 2MB");
          return false;
        }
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error("Please upload only image files");
          return false;
        }
        return true;
      });

      // Limit to first image if multiple were uploaded
      setSelectedImages(validImages.slice(0, 1));
    }
  };

  const onSubmitHandler: SubmitHandler<ProductFormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const UploadedImageData = await GlobalAPI.uploadImage(
        selectedImages,
        jwt
      );
      const imageId = UploadedImageData[0].id;
      const submissionData = {
        ...data,
        images: { id: imageId },
      };
      await onSubmit(submissionData);
      // Reset form and close dialog on successful submission
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
    }
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

        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <Input
              placeholder="Enter product name"
              {...register("name")}
              disabled={isSubmitting}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <Textarea
              placeholder="Enter product description"
              className={`min-h-[150px] resize-y ${
                errors.description ? "border-red-500" : ""
              }`}
              {...register("description")}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium">Price</label>
              <Input
                type="number"
                step="0.01"
                placeholder="Enter product price"
                {...register("price", { valueAsNumber: true })}
                disabled={isSubmitting}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium">Slug</label>
              <Input
                placeholder="product-slug"
                {...register("slug")}
                disabled={isSubmitting}
                className={errors.slug ? "border-red-500" : ""}
              />
              {errors.slug && (
                <p className="text-sm text-red-500">{errors.slug.message}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Categories</label>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={categories.map((cat) => ({
                    value: cat.documentId,
                    label: cat.name,
                  }))}
                  value={field.value?.map((cat) => cat.documentId) || []}
                  onChange={(selectedValues) => {
                    const selectedCategories = selectedValues.map(
                      (value) =>
                        categories.find((cat) => cat.documentId === value)!
                    );
                    field.onChange(selectedCategories);
                  }}
                  placeholder="Select categories"
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.categories && (
              <p className="text-sm text-red-500">
                {errors.categories.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Images
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={isSubmitting}
                  className="hidden"
                  id="image-upload"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center cursor-pointer px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
                >
                  <ImagePlusIcon className="mr-2 h-5 w-5" />
                  Upload Images
                </label>
                <span className="text-sm text-gray-500">
                  (Max 2MB per image, single image only)
                </span>
              </div>
            </div>

            {/* Display uploaded or existing images */}
            {(selectedImages.length > 0 || initialData?.images) && (
              <div className="mt-4 flex mx-2">
                {selectedImages.length > 0 && (
                  <Image
                    src={URL.createObjectURL(selectedImages[0])}
                    alt="Uploaded product"
                    width={100}
                    height={100}
                    className="object-cover rounded"
                  />
                )}
                {initialData?.images && !selectedImages.length && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${initialData.images[0].url}`}
                    alt="Product preview"
                    width={100}
                    height={100}
                    className="object-cover rounded"
                  />
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "add" ? "Adding..." : "Updating..."}
                </>
              ) : mode === "add" ? (
                "Add Product"
              ) : (
                "Update Product"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;

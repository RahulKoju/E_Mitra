"use client";
import { useAuth } from "@/app/_context/AuthContext";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { Button } from "@/components/ui/button";
import { ProductFormInputs, productSchema } from "@/lib/type";
import { LoaderCircleIcon, PlusIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DialogBox from "./_components/DialogBox";
import ProductTable from "./_components/ProductTable";

type Category = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
};

type ProductImage = {
  id: number;
  url: string;
  documentId: string;
};

type Product = ProductFormInputs & {
  id: number;
  documentId: string;
  images: ProductImage[];
  categories: Category[];
};

type ProductPayload = {
  data: {
    name: string;
    price: number;
    description: string;
    slug: string;
    categories: string[];
    images?: { id: number }[];
  };
};

function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(
    undefined
  );
  const { isLoggedIn, user, jwt } = useAuth();

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const data = await GlobalAPI.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to load products. Please try again later.");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await GlobalAPI.deleteProduct(productId, jwt);
      toast.success("Product deleted successfully", {
        description: "The product has been removed from your inventory.",
      });
      await getAllProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
      toast.error("Failed to delete product", {
        description: "Please try again later.",
      });
    }
  };

  const handleEditProductInitiate = (product: Product) => {
    setDialogMode("edit");
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };

  const handleCreateProductInitiate = () => {
    setDialogMode("add");
    setCurrentProduct(undefined);
    setIsDialogOpen(true);
  };

  const handleSubmitProduct = async (
    data: ProductFormInputs
  ): Promise<void> => {
    try {
      const validatedData = productSchema.parse(data);
      if (dialogMode === "add") {
        const productDataPayload: ProductPayload = {
          data: {
            name: validatedData.name,
            price: validatedData.price,
            description: validatedData.description,
            slug:
              validatedData.slug ||
              validatedData.name.toLowerCase().replace(/\s+/g, "-"),
            categories:
              validatedData.categories?.map((cat) => cat.documentId) || [],
            images: validatedData.images
              ? [{ id: validatedData.images.id }]
              : undefined,
          },
        };

        await GlobalAPI.createProduct(productDataPayload, jwt);
        toast.success("Product Added", {
          description: `${data.name} has been added to your inventory.`,
        });
      } else {
        // For edit mode, ensure we have the documentId
        if (!currentProduct?.documentId) {
          throw new Error("No product selected for editing");
        }

        const updatedProductPayload = {
          data: {
            name: validatedData.name,
            price: validatedData.price,
            description: validatedData.description,
            slug: validatedData.slug || currentProduct?.slug,
            categories:
              validatedData.categories?.map((cat) => cat.documentId) || [],
            images: validatedData.images
              ? [{ id: validatedData.images.id }]
              : undefined,
          },
        };

        await GlobalAPI.updateProduct(
          currentProduct.documentId,
          updatedProductPayload,
          jwt
        );
        toast.success("Product Updated", {
          description: `${data.name} has been successfully updated.`,
        });
      }
      setIsDialogOpen(false);
      await getAllProducts();
    } catch (err) {
      console.error(
        dialogMode === "add"
          ? "Failed to add product:"
          : "Failed to update product:",
        err
      );
      toast.error(
        dialogMode === "add"
          ? "Failed to add product"
          : "Failed to update product",
        {
          description: "Please check your inputs and try again.",
        }
      );
      throw err;
    }
  };

  useEffect(() => {
    if (isLoggedIn && user?.admin) {
      getAllProducts();
    }
  }, [isLoggedIn, user?.admin]);

  if (!isLoggedIn || !user?.admin) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <XIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You must be an admin to view this page.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <LoaderCircleIcon className="animate-spin h-20 w-20 text-green-600 mx-auto mb-4" />
          <span className="text-2xl text-green-600 font-semibold">
            Loading Products...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-green-500 to-emerald-600">
          <h1 className="text-3xl font-bold text-white">Product Management</h1>
          <Button
            onClick={handleCreateProductInitiate}
            className="bg-white text-green-600 hover:bg-green-50"
          >
            <PlusIcon className="mr-2 h-5 w-5" /> Add New Product
          </Button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="bg-gray-100 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                No Products Found
              </h2>
              <p className="text-gray-500 mb-6">
                Your product inventory is empty. Click "Add New Product" to get
                started.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto px-6 py-4">
            <ProductTable
              products={products}
              handleDeleteProduct={handleDeleteProduct}
              handleEditProduct={handleEditProductInitiate}
            />
          </div>
        )}
      </div>

      {/* Reusable Product Dialog */}
      <DialogBox
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        initialData={
          dialogMode === "edit"
            ? {
                name: currentProduct?.name,
                price: currentProduct?.price,
                description: currentProduct?.description,
                slug: currentProduct?.slug,
                categories: currentProduct?.categories,
                images: currentProduct?.images,
              }
            : undefined
        }
        onSubmit={handleSubmitProduct}
      />
    </div>
  );
}

export default ProductManagement;

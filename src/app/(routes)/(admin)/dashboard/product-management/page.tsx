"use client";
import { useAuth } from "@/app/_context/AuthContext";
import {
  useAllProducts,
  useProductManagement,
} from "@/app/_utils/tanstackQuery";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/type";
import { LoaderCircleIcon, PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DialogBox from "./_components/DialogBox";
import { columns } from "./_components/product-columns";
import { DataTable } from "./_components/DataTable";

function ProductManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(
    undefined
  );
  const { isLoggedIn, user, jwt } = useAuth();
  const { deleteProduct } = useProductManagement();
  const { data: products = [], isLoading } = useAllProducts();

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct.mutateAsync({ productId, jwt });
      toast.success("Product deleted successfully", {
        description: "The product has been removed from your inventory.",
      });
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
            <DataTable
              columns={columns}
              data={products}
              onDelete={handleDeleteProduct}
              onEdit={handleEditProductInitiate}
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
        onSuccess={() => {
          // React Query will automatically handle the refetch
        }}
        productId={currentProduct?.documentId}
      />
    </div>
  );
}

export default ProductManagement;

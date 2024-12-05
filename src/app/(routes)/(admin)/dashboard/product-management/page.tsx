"use client";
import { useAuth } from "@/app/_context/AuthContext";
import GlobalAPI from "@/app/_utils/GlobalAPI";

import { Button } from "@/components/ui/button";

import { ProductFormInputs, productSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon, PlusIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import ProductTable from "./_components/ProductTable";

type Category = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
};

type ProductImage = {
  url: string;
};

type Product = ProductFormInputs & {
  id: number;
  documentId: string;
  images: ProductImage[];
  categories: Category[];
};

function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isLoggedIn, user, jwt } = useAuth();

  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      slug: "",
    },
  });

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
      getAllProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
      toast.error("Failed to delete product", {
        description: "Please try again later.",
      });
    }
  };
  const handleUpdateProduct = async (data: Product) => {
    try {
      await GlobalAPI.updateProduct(data, jwt);
      toast.success("Product Updated", {
        description: `${data.name} has been successfully updated.`,
      });
      getAllProducts();
    } catch (err) {
      console.error("Failed to update product:", err);
      toast.error("Failed to update product", {
        description: "Please try again later.",
      });
    }
  };
  const handleCreateProduct = async (data: Product) => {
    try {
      await GlobalAPI.createProduct(data, jwt);
      toast.success("Product Added", {
        description: `${data.name} has been added to your inventory.`,
      });
      getAllProducts();
    } catch (err) {
      console.error("Failed to add product:", err);
      toast.error("Failed to add product", {
        description: "Please try again later.",
      });
    }
  };

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    try {
      form.reset();
      getAllProducts();
    } catch (err) {
      console.error("Failed to save product:", err);
      toast.error("Failed to save product", {
        description: "Please check your inputs and try again.",
      });
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
          <Button className="bg-white text-green-600 hover:bg-green-50">
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
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductManagement;

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import { ProductFormInputs } from "@/lib/type";

type Category = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
};

type ProductImage = {
  id: number;
  documentId: string;
  url: string;
};

type Product = ProductFormInputs & {
  id: number;
  documentId: string;
  images: ProductImage[];
  categories: Category[];
};

type ProductTableProp = {
  products: Product[];
  handleDeleteProduct: (documentId: string) => void;
  handleEditProduct: (product: Product) => void;
};

function ProductTable({
  products,
  handleDeleteProduct,
  handleEditProduct,
}: ProductTableProp) {
  return (
    <div>
      <Table className="w-full border-spacing-0 border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-gray-700 py-4">Name</TableHead>
            <TableHead className="font-bold text-gray-700 py-4 hidden sm:table-cell">
              Description
            </TableHead>
            <TableHead className="font-bold text-gray-700 py-4">
              Price
            </TableHead>
            <TableHead className="font-bold text-gray-700 py-4 hidden sm:table-cell">
              Slug
            </TableHead>
            <TableHead className="font-bold text-gray-700 py-4">
              Category
            </TableHead>
            <TableHead className="font-bold text-gray-700 py-4 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="max-w-[200px] truncate text-gray-600">
                  {product.description}
                </div>
              </TableCell>
              <TableCell className="text-green-600">
                Rs. {product.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-gray-500 hidden sm:table-cell">
                {product.slug}
              </TableCell>
              <TableCell className="text-gray-500">
                <div className="flex flex-wrap gap-1">
                  {product.categories.map((category) => (
                    <span
                      key={category.id}
                      className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => handleEditProduct(product)}
                    variant="outline"
                    size="icon"
                    className="hover:bg-green-50 hover:text-green-600"
                  >
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the product "
                          {product.name}". This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            handleDeleteProduct(product.documentId)
                          }
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProductTable;

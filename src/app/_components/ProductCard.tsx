import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { CartData, Product } from "@/lib/type";
import Link from "next/link";
import ProductItemDetail from "./ProductItemDetail";

interface ProductCardProps {
  product: Product;
  onAddToCart: (data: CartData, jwt: string) => void;
  isPending: boolean;
  setDialogIsOpen: (isOpen: boolean) => void;
}

const ProductCard = ({
  product,
  onAddToCart,
  isPending,
  setDialogIsOpen,
}: ProductCardProps) => {
  return (
    <Dialog onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <button
          aria-label={`View details for ${product.name}`}
          className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200 w-full text-left"
        >
          <div className="flex items-center space-x-4">
            {product.images ? (
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images[0].url}`}
                alt={product.name}
                className="h-12 w-12 object-cover rounded"
              />
            ) : (
              <Skeleton className="h-12 w-12 rounded" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{product.name}</h3>
                <span className="text-green-600 font-medium">
                  Rs.{product.price}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {product.categories.map((category) => (
                  <Link
                    href={`/category/${category.slug}`}
                    key={category.id}
                    className="text-xs bg-green-50 text-green-700 px-3 py-1 
                    rounded-full border border-green-100
                    hover:bg-green-100 transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {product.description?.substring(0, 60)}...
              </p>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            <ProductItemDetail
              product={product}
              isPending={isPending}
              onAddToCart={onAddToCart}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCard;

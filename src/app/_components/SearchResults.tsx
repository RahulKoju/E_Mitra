import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CartData, Product } from "@/lib/type";
import ProductCard from "./ProductCard";

interface SearchResultsProps {
  results: Product[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  searchQuery: string;
  onAddToCart: (data: CartData, jwt: string) => void;
  isPending: boolean;
}

const SearchResults = ({
  results,
  isLoading,
  isError,
  error,
  searchQuery,
  onAddToCart,
  isPending,
}: SearchResultsProps) => {
  return (
    <Card className="absolute w-full mt-2 z-50 max-h-96 overflow-y-auto shadow-lg">
      <CardContent className="p-2">
        {isLoading && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error instanceof Error
                ? error.message
                : "Failed to fetch results"}
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && results.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No products found matching "{searchQuery}"
          </div>
        )}

        {!isLoading &&
          results.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              isPending={isPending}
            />
          ))}
      </CardContent>
    </Card>
  );
};

export default SearchResults;

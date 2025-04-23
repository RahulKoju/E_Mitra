"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Minus,
  Plus,
  CheckCircle,
  Truck,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";
import { useAllProducts } from "@/app/_utils/tanstackQuery";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const { data: products, error, isLoading } = useAllProducts();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  // Find the product based on slug
  useEffect(() => {
    if (products && products.length > 0) {
      // For demo purposes, we'll use the first product as "Momo RN"
      // In a real app, you would filter by slug: products.find(p => p.slug === slug)
      const momoProduct = {
        ...products[0],
        name: "Momo",
        description:
          "Delicious traditional Nepali dumplings filled with seasoned meat or vegetables, steamed to perfection. Our Momo comes with special spicy dipping sauce.",
        price: 150,
        images: [
          { url: "/1.jpeg", alt: "Momo Front View" },
          { url: "/2.jpg", alt: "Momo Side View" },
          { url: "/3.jpeg", alt: "Momo Packaging" },
        ],
        categories: [{ name: "Food" }, { name: "Asian Cuisine" }],
        availability: "In Stock",
        rating: 4.8,
        reviews: 124,
        nutritionInfo: {
          calories: 320,
          protein: "18g",
          carbs: "42g",
          fat: "12g",
        },
        variants: ["Chicken", "Vegetable", "Buff", "Pork"],
      };

      setProduct(momoProduct);
    }
  }, [products, slug]);

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    // Reset the added to cart notification after 3 seconds
    setTimeout(() => setAddedToCart(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-green-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>
            Sorry, we couldn't load the product information. Please try again
            later.
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Product not found. Please check the product URL and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-sm">
        <Link
          href="/products"
          className="flex items-center text-gray-600 hover:text-green-600"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link
          href="/products/category/food"
          className="text-gray-600 hover:text-green-600"
        >
          Food
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-green-600 font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg overflow-hidden relative aspect-square">
            <img
              src={product.images[selectedImage].url}
              alt={product.images[selectedImage].alt}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`bg-gray-100 rounded cursor-pointer overflow-hidden border-2 Rs. {
                  selectedImage === index
                    ? "border-green-500"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative h-24">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 Rs. {
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Heart className="h-6 w-6 text-gray-500 hover:text-red-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Share2 className="h-6 w-6 text-gray-500 hover:text-green-500" />
              </button>
            </div>
          </div>

          <div className="mt-6">
            <span className="text-3xl font-bold text-green-600">
              Rs. {product.price.toFixed(2)}
            </span>
            <span className="ml-2 text-gray-500 line-through">
              Rs. {(product.price * 1.2).toFixed(2)}
            </span>
            <span className="ml-2 text-white bg-green-600 px-2 py-1 rounded text-sm">
              Save 20%
            </span>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Variant</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    className={`py-2 px-4 border rounded-md Rs. {
                      index === 0
                        ? "border-green-600 bg-green-50 text-green-600"
                        : "border-gray-300 hover:border-green-600"
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Quantity</h3>
              <div className="flex items-center mt-2">
                <button
                  className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-5 w-5 text-gray-600" />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-16 text-center border-t border-b border-gray-300 py-2"
                />
                <button
                  className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
                  onClick={() => handleQuantityChange("increase")}
                >
                  <Plus className="h-5 w-5 text-gray-600" />
                </button>
                <span className="ml-4 text-gray-600">
                  {product.availability === "In Stock" ? (
                    <span className="text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <button className="flex-1 bg-white border border-green-600 text-green-600 hover:bg-green-50 py-3 px-6 rounded-md font-medium">
                Buy Now
              </button>
            </div>

            {addedToCart && (
              <div className="bg-green-100 text-green-700 p-3 rounded-md flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Added to cart successfully!
              </div>
            )}
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Truck className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h4 className="font-medium">Free Delivery</h4>
                  <p className="text-sm text-gray-600">Orders over Rs. 50</p>
                </div>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h4 className="font-medium">Quality Guarantee</h4>
                  <p className="text-sm text-gray-600">Fresh ingredients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nutrition Information */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Nutrition Information
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(product.nutritionInfo).map(([key, value]) => (
              <div
                key={key}
                className="text-center p-4 bg-white rounded-md shadow-sm"
              >
                <h3 className="text-gray-500 capitalize">{key}</h3>
                <p className="text-xl font-bold text-gray-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* You may also like section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <Link
              href={`/products/related-item-Rs. {item}`}
              key={item}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-100 aspect-square relative">
                <img
                  src="/api/placeholder/300/300"
                  alt="Related product"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">
                  Related Food Item {item}
                </h3>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 Rs. {
                          i < 4
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(42)</span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold text-green-600">
                    Rs. {(10 + item).toFixed(2)}
                  </span>
                  <button
                    className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Add to cart logic here
                    }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

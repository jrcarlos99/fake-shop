import React, { useState, useEffect } from "react";
import type { Product } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CameraCapture from "./components/CamCapture";

const API_URL = "https://fakestoreapi.com/products";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Carregando catálogo...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Catálogo de Produtos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col h-full hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex-grow p-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4 rounded-md"
              />
              <CardTitle className="text-lg line-clamp-2">
                {product.title}
              </CardTitle>
              <CardDescription className="line-clamp-3 mt-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-semibold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">Ver Detalhes</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <CameraCapture />
    </div>
  );
};

export default ProductList;

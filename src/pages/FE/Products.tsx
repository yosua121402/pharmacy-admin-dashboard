
import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

const Products = () => {
  // Mock products data
  const products = [
    { id: 1, name: "Paracetamol", price: "$5.99", category: "Pain Relief", image: "placeholder.svg" },
    { id: 2, name: "Vitamin C", price: "$12.99", category: "Vitamins", image: "placeholder.svg" },
    { id: 3, name: "Ibuprofen", price: "$7.49", category: "Pain Relief", image: "placeholder.svg" },
    { id: 4, name: "Allergy Relief", price: "$15.99", category: "Allergy", image: "placeholder.svg" },
    { id: 5, name: "Multivitamin", price: "$19.99", category: "Vitamins", image: "placeholder.svg" },
    { id: 6, name: "Cold & Flu Relief", price: "$9.99", category: "Cold & Flu", image: "placeholder.svg" },
    { id: 7, name: "Antiseptic Cream", price: "$6.99", category: "First Aid", image: "placeholder.svg" },
    { id: 8, name: "Digestive Health", price: "$14.99", category: "Digestive", image: "placeholder.svg" },
  ];

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Browse our selection of medicines and healthcare products</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 w-full"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square relative bg-slate-50">
                <img 
                  src={`/${product.image}`} 
                  alt={product.name} 
                  className="object-cover w-full h-full p-4"
                />
              </div>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-pharma-600 font-medium">{product.price}</span>
                  <Button size="sm" variant="outline">Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default Products;

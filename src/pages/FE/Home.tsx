
import React from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '@/components/layout/UserLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pill, ArrowRight, ThumbsUp, Clock, Tag } from 'lucide-react';

const Home = () => {
  return (
    <UserLayout>
      {/* Hero Section */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Your Health, Our <span className="text-pharma-600">Priority</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              PharmaCare offers a wide range of medicines and healthcare products with expert advice to help you stay healthy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden bg-gradient-to-r from-pharma-50 to-blue-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(49,130,255,0.2),transparent_70%)]" />
            <Pill className="h-24 w-24 text-pharma-500" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose PharmaCare?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Quality Products",
              description: "We source our medications from reputable manufacturers to ensure quality and effectiveness.",
              icon: <ThumbsUp className="h-10 w-10 text-pharma-500" />
            },
            {
              title: "Fast Delivery",
              description: "Get your medications delivered to your doorstep within hours of placing your order.",
              icon: <Clock className="h-10 w-10 text-pharma-500" />
            },
            {
              title: "Best Prices",
              description: "We offer competitive prices and regular discounts to make healthcare more affordable.",
              icon: <Tag className="h-10 w-10 text-pharma-500" />
            }
          ].map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-pharma-50 p-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Button variant="outline" asChild>
            <Link to="/products">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Paracetamol", price: "$5.99", image: "placeholder.svg" },
            { name: "Vitamin C", price: "$12.99", image: "placeholder.svg" },
            { name: "Ibuprofen", price: "$7.49", image: "placeholder.svg" },
            { name: "Allergy Relief", price: "$15.99", image: "placeholder.svg" }
          ].map((product, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square relative bg-slate-50">
                <img 
                  src={`/${product.image}`} 
                  alt={product.name} 
                  className="object-cover w-full h-full p-4"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-pharma-600 font-medium">{product.price}</span>
                  <Button size="sm" variant="outline">Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <Card className="bg-gradient-to-r from-pharma-500 to-pharma-600 text-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Need healthcare advice?</h2>
                <p className="text-white/90">
                  Our pharmacists are available to help you with your healthcare needs.
                  Contact us today to speak with our experts.
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">Contact Our Pharmacists</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </UserLayout>
  );
};

export default Home;

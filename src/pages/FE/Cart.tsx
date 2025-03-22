
import React from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '@/components/layout/UserLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';

const Cart = () => {
  // Mock cart items
  const cartItems = [
    { id: 1, name: "Paracetamol", price: 5.99, quantity: 2, image: "placeholder.svg" },
    { id: 3, name: "Ibuprofen", price: 7.49, quantity: 1, image: "placeholder.svg" },
    { id: 5, name: "Multivitamin", price: 19.99, quantity: 1, image: "placeholder.svg" },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  return (
    <UserLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
          <p className="text-muted-foreground">Review and checkout your items</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart Items ({cartItems.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 py-3">
                        <div className="h-24 w-24 rounded bg-slate-50 p-2">
                          <img 
                            src={`/${item.image}`} 
                            alt={item.name} 
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="text-pharma-600 font-medium">${item.price.toFixed(2)}</div>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 rounded-r-none"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input 
                                type="number" 
                                value={item.quantity} 
                                className="h-8 w-12 rounded-none text-center" 
                                min="1"
                                readOnly
                              />
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8 rounded-l-none"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Button variant="ghost" size="sm" className="text-red-500 h-8">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline" asChild>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                  <Button variant="destructive" size="sm">
                    Clear Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Proceed to Checkout</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="text-center p-8">
            <div className="flex flex-col items-center gap-4">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">Your cart is empty</h2>
              <p className="text-muted-foreground">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </UserLayout>
  );
};

export default Cart;

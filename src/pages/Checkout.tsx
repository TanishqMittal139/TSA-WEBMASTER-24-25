
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin, CreditCard, ArrowLeft, Truck, Store } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { useCart } from '@/context/CartContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  phone: z.string().min(10, { message: 'Valid phone number is required' }),
  orderType: z.enum(['delivery', 'pickup']),
  address: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  cardNumber: z.string().min(16, { message: 'Valid card number is required' }),
  cardName: z.string().min(2, { message: 'Cardholder name is required' }),
  expDate: z.string().min(5, { message: 'Valid expiry date is required' }),
  cvv: z.string().min(3, { message: 'Valid CVV is required' }),
}).refine((data) => {
  if (data.orderType === 'delivery') {
    return !!data.address && !!data.city && !!data.zipCode;
  }
  return true;
}, {
  message: "Address information is required for delivery",
  path: ["address"],
});

const Checkout = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // If cart is empty, redirect to cart page
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      orderType: 'delivery',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
      cardName: '',
      expDate: '',
      cvv: '',
    },
  });
  
  const orderType = form.watch('orderType');
  
  // Calculate order totals
  const subtotal = items.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + (price * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.0825; // 8.25% tax
  const deliveryFee = orderType === 'delivery' ? 3.99 : 0;
  const total = subtotal + tax + deliveryFee;
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate random order number
    const orderNumber = `TH${Math.floor(100000 + Math.random() * 900000)}`;
    
    toast({
      title: "Order Placed Successfully",
      description: "Your payment has been processed.",
    });
    
    setIsSubmitting(false);
    
    // Prepare detailed address
    let fullAddress = '';
    if (values.orderType === 'delivery') {
      fullAddress = `${values.address}, ${values.city}, ${values.zipCode}`;
    }
    
    // Navigate to confirmation with order details
    navigate('/checkout-confirmation', {
      state: {
        orderDetails: {
          orderNumber,
          orderType: values.orderType === 'delivery' ? 'Delivery' : 'Pickup',
          address: fullAddress,
          items,
          subtotal: formatPrice(subtotal),
          tax: formatPrice(tax),
          deliveryFee: formatPrice(deliveryFee),
          total: formatPrice(total),
        }
      }
    });
  };
  
  if (items.length === 0) {
    return null; // We'll redirect to cart page
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/cart')}
            className="mb-6 flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Cart
          </Button>
          
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl shadow-md p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="(555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="you@example.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
                      
                      <FormField
                        control={form.control}
                        name="orderType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-3"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="delivery" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer flex items-center">
                                    <Truck className="mr-2 h-4 w-4" />
                                    Delivery (+$3.99)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="pickup" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer flex items-center">
                                    <Store className="mr-2 h-4 w-4" />
                                    Pickup (Free)
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {orderType === 'delivery' && (
                        <div className="mt-4 space-y-4">
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="123 Main St" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Anytown" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ZIP Code</FormLabel>
                                  <FormControl>
                                    <Input placeholder="12345" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input placeholder="1234 5678 9012 3456" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cardholder Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date (MM/YY)</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Processing Payment..."
                      ) : (
                        <>Place Order: {formatPrice(total)}</>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
            
            <div>
              <div className="bg-card rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0 mr-3">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">{item.price}</p>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>{formatPrice(deliveryFee)}</span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;

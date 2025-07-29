import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CheckoutProgress } from '@/components/CheckoutProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Package, Truck, Mail, Download, ArrowRight } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  // Mock order data - in a real app, this would come from the order context or API
  const orderData = {
    orderNumber: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    orderDate: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    total: 299.99,
    items: [
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        price: 99.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      },
      {
        id: '2',
        name: 'Smart Watch Series 8',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert('Receipt download functionality would be implemented here');
  };

  const handleTrackOrder = () => {
    // In a real app, this would navigate to order tracking page
    alert('Order tracking functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} onCategoryFilter={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Shopping Cart', href: '/cart' },
              { label: 'Checkout', href: '/checkout' },
              { label: 'Order Confirmation' }
            ]}
          />

          <CheckoutProgress currentStep="confirmation" />

          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Details</span>
                <Badge variant="secondary" className="text-sm">
                  {orderData.orderNumber}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">Order Date</p>
                  <p className="font-semibold">{orderData.orderDate}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Order Total</p>
                  <p className="font-semibold">${orderData.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Estimated Delivery</p>
                  <p className="font-semibold">{orderData.estimatedDelivery}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-semibold">Items Ordered</h3>
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <div className="text-sm text-muted-foreground">
                  <p>{orderData.shippingAddress.name}</p>
                  <p>{orderData.shippingAddress.address}</p>
                  <p>
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Confirmation Email</h4>
                  <p className="text-sm text-muted-foreground">
                    We've sent a confirmation email with your order details to your registered email address.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Order Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Your order is being prepared for shipment. You'll receive an update once it's dispatched.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Shipping & Delivery</h4>
                  <p className="text-sm text-muted-foreground">
                    Your order will be delivered by {orderData.estimatedDelivery}. Track your package for real-time updates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button
              onClick={handleTrackOrder}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Track Order
            </Button>
            
            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </Button>
            
            <Button
              onClick={() => navigate('/products')}
              className="flex items-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Support Information */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have any questions about your order, our customer support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                  <Button variant="outline" size="sm">
                    View FAQ
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;

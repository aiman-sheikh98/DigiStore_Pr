
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Package, Truck, X, FileText, Clock, Calendar, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface Order {
  id: string;
  total_amount: number;
  status: string;
  tracking_number: string | null;
  created_at: string;
}

interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

export function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchOrders();
      subscribeToOrderUpdates();
    }
  }, [user]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return;
    }

    setOrders(data);
  };

  const fetchOrderItems = async (orderId: string) => {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);

    if (error) {
      console.error('Error fetching order items:', error);
      return;
    }

    setOrderItems(prev => ({ ...prev, [orderId]: data }));
  };

  const cancelOrder = async (orderId: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId);

    if (error) {
      console.error('Error cancelling order:', error);
      toast({
        title: "Error",
        description: "There was a problem cancelling your order.",
        variant: "destructive",
      });
      return;
    }

    // Update local state
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    ));

    toast({
      title: "Order Cancelled",
      description: "Your order has been cancelled successfully.",
    });
  };

  const subscribeToOrderUpdates = () => {
    const channel = supabase
      .channel('order-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user?.id}`,
        },
        (payload) => {
          console.log('Order update received:', payload);
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleOrderDetails = async (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
      if (!orderItems[orderId]) {
        await fetchOrderItems(orderId);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><div className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Date</div></TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead><div className="flex items-center gap-1"><Clock className="h-4 w-4" /> Status</div></TableHead>
                <TableHead><div className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> Total</div></TableHead>
                <TableHead><div className="flex items-center gap-1"><Truck className="h-4 w-4" /> Tracking</div></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    You have no orders yet
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <TableRow>
                      <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>${order.total_amount}</TableCell>
                      <TableCell>
                        {order.tracking_number ? (
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            {order.tracking_number}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Not available</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleOrderDetails(order.id)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                          </Button>
                          
                          {(order.status === 'booked') && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => cancelOrder(order.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedOrder === order.id && orderItems[order.id] && (
                      <TableRow>
                        <TableCell colSpan={6} className="bg-muted/50">
                          <div className="p-4">
                            <h4 className="font-medium mb-2">Order Items</h4>
                            <div className="space-y-2">
                              {orderItems[order.id].map((item) => (
                                <div key={item.product_id} className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <Package className="h-4 w-4" />
                                    <span>Product ID: {item.product_id}</span>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <span>Qty: {item.quantity}</span>
                                    <span>${item.price}</span>
                                  </div>
                                </div>
                              ))}
                              
                              {order.status === 'cancelled' && (
                                <div className="mt-4 bg-red-50 p-3 rounded-md">
                                  <p className="text-red-700 text-sm">This order has been cancelled.</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

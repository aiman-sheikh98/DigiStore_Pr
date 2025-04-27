
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Package, Truck } from 'lucide-react';

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
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Order History</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Tracking</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <>
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                    </Button>
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
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

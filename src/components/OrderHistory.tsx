
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Calendar, Clock, DollarSign, Truck } from 'lucide-react';
import { Order, OrderItem } from '@/types/order';
import { OrderRow } from '@/components/OrderRow';
import { fetchOrders, fetchOrderItems, cancelOrder, subscribeToOrderUpdates } from '@/services/orderService';

export function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadOrders();
      const unsubscribe = subscribeToOrderUpdates(user.id, loadOrders);
      return unsubscribe;
    }
  }, [user]);

  const loadOrders = async () => {
    const data = await fetchOrders();
    setOrders(data);
  };

  const handleFetchOrderItems = async (orderId: string) => {
    const items = await fetchOrderItems(orderId);
    setOrderItems(prev => ({ ...prev, [orderId]: items }));
  };

  const handleCancelOrder = async (orderId: string) => {
    const success = await cancelOrder(orderId);
    
    if (success) {
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      ));

      toast({
        title: "Order Cancelled",
        description: "Your order has been cancelled successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: "There was a problem cancelling your order.",
        variant: "destructive",
      });
    }
  };

  const toggleOrderDetails = async (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
      if (!orderItems[orderId]) {
        await handleFetchOrderItems(orderId);
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
                  <OrderRow
                    key={order.id}
                    order={order}
                    expanded={expandedOrder === order.id}
                    orderItems={orderItems[order.id]}
                    onToggleExpand={() => toggleOrderDetails(order.id)}
                    onOrderCancel={handleCancelOrder}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

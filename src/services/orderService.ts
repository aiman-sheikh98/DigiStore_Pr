
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderItem } from '@/types/order';

export async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return data || [];
}

export async function fetchOrderItems(orderId: string): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);

  if (error) {
    console.error('Error fetching order items:', error);
    return [];
  }

  return data || [];
}

export async function cancelOrder(orderId: string): Promise<boolean> {
  const { error } = await supabase
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('id', orderId);

  if (error) {
    console.error('Error cancelling order:', error);
    return false;
  }

  return true;
}

export function subscribeToOrderUpdates(userId: string, onUpdate: () => void) {
  const channel = supabase
    .channel('order-updates')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'orders',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        console.log('Order update received:', payload);
        onUpdate();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

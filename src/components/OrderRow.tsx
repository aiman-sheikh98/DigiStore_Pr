
import React, { useState } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Truck, X } from 'lucide-react';
import { getStatusColor } from '@/utils/orderUtils';
import { Order, OrderItem } from '@/types/order';
import { OrderItems } from '@/components/OrderItems';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface OrderRowProps {
  order: Order;
  expanded: boolean;
  orderItems: OrderItem[] | undefined;
  onToggleExpand: () => void;
  onOrderCancel: (orderId: string) => void;
}

export function OrderRow({ 
  order, 
  expanded, 
  orderItems, 
  onToggleExpand, 
  onOrderCancel 
}: OrderRowProps) {
  const { toast } = useToast();

  return (
    <React.Fragment>
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
              onClick={onToggleExpand}
            >
              <FileText className="h-4 w-4 mr-1" />
              {expanded ? 'Hide Details' : 'View Details'}
            </Button>
            
            {(order.status === 'booked') && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onOrderCancel(order.id)}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
      {expanded && orderItems && (
        <TableRow>
          <TableCell colSpan={6} className="bg-muted/50">
            <OrderItems 
              items={orderItems} 
              isOrderCancelled={order.status === 'cancelled'} 
            />
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

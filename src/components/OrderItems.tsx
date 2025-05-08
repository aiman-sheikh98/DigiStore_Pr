
import React from 'react';
import { Package } from 'lucide-react';
import { OrderItem } from '@/types/order';

interface OrderItemsProps {
  items: OrderItem[];
  isOrderCancelled: boolean;
}

export function OrderItems({ items, isOrderCancelled }: OrderItemsProps) {
  return (
    <div className="p-4">
      <h4 className="font-medium mb-2">Order Items</h4>
      <div className="space-y-2">
        {items.map((item) => (
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
        
        {isOrderCancelled && (
          <div className="mt-4 bg-red-50 p-3 rounded-md">
            <p className="text-red-700 text-sm">This order has been cancelled.</p>
          </div>
        )}
      </div>
    </div>
  );
}

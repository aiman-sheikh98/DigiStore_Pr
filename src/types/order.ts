
export interface Order {
  id: string;
  total_amount: number;
  status: string;
  tracking_number: string | null;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

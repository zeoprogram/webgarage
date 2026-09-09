export interface RootResponse {
  message: string;
}

export interface OrderItemCreate {
  name: string;
  quantity: number;
  unit_price: number;
}

export type OrderCategory = "motor" | "mobil" | "helm";

export type ServiceMode = "workshop" | "home_service";

export interface OrderCreate {
  customer_name: string;
  customer_phone: string;
  category: OrderCategory;
  vehicle_variant: string;
  service_mode: ServiceMode;
  scheduled_date: string;
  scheduled_time: string;
  items: OrderItemCreate[];
  notes: string;
}

export interface OrderResponse {
  order_code: string;
  created_at: string;
  total: number;
  whatsapp_message: string;
}

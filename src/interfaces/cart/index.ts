interface iCartDetail {
  id: string;
  name: string;
  thumb: string;
  sku: string;
  parentSku?: string;
  isBox: boolean;
  quantity: number;
  total: number;
  subtotal: number;
  totalDiscounted?: number;
  subtotalDiscounted?: number;
  boxTotal?: number;
  boxSubtotal?: number;
  boxTotalDiscounted?: number;
  boxSubtotalDiscounted?: number;
};

interface iCart {
  storeId: number;
  total: number;
  subtotal: number;
  totalDiscounted?: number;
  subtotalDiscounted?: number;
  details: iCartDetail[];
};
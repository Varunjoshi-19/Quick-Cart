// components/OrderCard.tsx

import { Card, CardHeader, CardContent } from "../comp/components/ui/card";

export default function OrderCard({ order }: { order: any }) {


  return (
    <Card className="max-w-5xl mx-auto p-4 rounded-2xl shadow-sm border border-gray-50">
      <CardHeader className="text-xl font-semibold text-blue-500">
        Order Summary
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-6 text-sm text-white-700">
          <Field label="Order ID" value={order.orderId} />
          <Field label="Payment ID" value={order.paymentId} />
          <Field label="Products" value={order.products} />
          <Field label="Name" value={order.name} />
          <Field label="Quantity" value={order.quantity} />
          <Field label="Address" value={order.address} />
          <Field label="Total Amount" value={order.totalAmount} />
          <Field label="Order Status" value={order.orderStatus} />
          <Field label="Date" value={order.date} />
        </div>
      </CardContent>
    </Card>
  )
}

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-[150px]">
      <div className="text-gray-400 font-medium">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  )
}

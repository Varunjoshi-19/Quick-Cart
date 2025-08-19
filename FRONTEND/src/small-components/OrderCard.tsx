
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
          <Field label="Products" value={order.productName} />
          <Field label="Name" value={order.userName} />
          <Field label="Address" value={order.address.address} />
          <Field label="Total Amount" value={order.totalAmount} />
          <Field label="Order Status" value={`Pending`} />
          <Field label="Date" value={`${new Date(order.createdAt).getDate()}-${new Date(order.createdAt).getMonth().toString().padStart(2, "0")}-${new Date(order.createdAt).getFullYear()}`} />
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

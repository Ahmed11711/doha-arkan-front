import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Define the TypeScript interface for the table rows
interface Product {
  id: number;
  name: string;
  variants: string;
  category: string;
  price: string;
  image: string;
  status: "Delivered" | "Pending" | "Canceled";
}

// 🔹 جدول فاضي بدون بيانات
const tableData: Product[] = [];

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800">All Transactions</h3>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800">
            <svg
              className="stroke-current fill-white"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800">
            See all
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-y border-gray-100">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-xs"
              >
                Products
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-xs"
              >
                Category
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-xs"
              >
                Price
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-xs"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100">
            {tableData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-6 text-center text-gray-500 text-sm"
                >
                  No recent orders found
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                        <img
                          src={product.image}
                          className="h-[50px] w-[50px]"
                          alt={product.name}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {product.name}
                        </p>
                        <span className="text-gray-500 text-xs">
                          {product.variants}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-sm">
                    {product.price}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-sm">
                    {product.category}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-sm">
                    <Badge
                      size="sm"
                      color={
                        product.status === "Delivered"
                          ? "success"
                          : product.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

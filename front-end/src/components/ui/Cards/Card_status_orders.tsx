import Legend from "../text/Legend";
import P from "../text/P";
import Span from "../text/Span";

export default function Card_status_orders() {
  return (
    <div className="w-full py-6 border-b border-gray-200 my-3">

      <div className="grid grid-cols-4 w-full">

        {/* Total Orders */}
        <div className="px-6 border-r border-gray-200">
          <div className="mb-1">
            <Legend>Total Orders</Legend>
            <div className="flex items-center gap-2">
              <P>2,40,120</P>
              <span className="text-green-600 text-xl">—</span>
            </div>
          </div>
          <Span>Total Orders last 365 days</Span>
        </div>

        {/* New Orders */}
        <div className="px-6 border-r border-gray-200">
          <div className="mb-1">
            <Legend>New Orders</Legend>
            <div className="flex items-center gap-2">
              <P>1,70,190</P>
              <span className="text-yellow-500 text-xl">—</span>
            </div>
          </div>
          <Span>New Orders last 365 days</Span>
        </div>

        {/* Completed Orders */}
        <div className="px-6 border-r border-gray-200">
          <div className="mb-1">
            <Legend>Completed Orders</Legend>
            <div className="flex items-center gap-2">
              <P>1,40,530</P>
              <span className="text-green-600 text-xl">—</span>
            </div>
          </div>
          <Span>Completed Orders last 365 days</Span>
        </div>

        {/* Cancelled Orders */}
        <div className="px-6">
          <div className="mb-1">
            <Legend>Cancelled Orders</Legend>
            <div className="flex items-center gap-2">
              <P>99,349</P>
              <span className="text-red-500 text-xl">—</span>
            </div>
          </div>
          <Span>Cancelled Orders last 365 days</Span>
        </div>

      </div>

    </div>
  );
}

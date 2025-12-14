import { useNotifications } from "@/hooks/useNotifications";
import type { User } from "@/types/index";
import { BellDotIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";

type NotificationProps = {
  id: User["_id"];
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Notification({ id, open, setOpen }: NotificationProps) {
  const { notifications } = useNotifications(id);

  useEffect(() => {
    if (!notifications) return;

    if (notifications.length > 0) {
        const newest = notifications[0];
        toast.info(`${newest.title}: ${newest.message}`);
    }
}, [notifications]);

  if (notifications)
    return (
      <div className="relative">
        <button
          className="relative text-sm text-gray-700 hover:text-purple-600 mt-3"
          onClick={() => setOpen(!open)}
        >
          <BellDotIcon size={20} />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg border border-gray-200 rounded-md py-2 z-50 overflow-y-scroll max-h-80">
            {notifications!.length === 0 ? (
              <p className="text-center text-gray-500 py-4 text-sm">
                No notifications
              </p>
            ) : (
              notifications!.map((n) => (
                <div
                  key={n.orderId}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-none"
                >
                  <p className="font-semibold text-gray-800">{n.title}</p>
                  <p className="text-sm text-gray-600">{n.message}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
}

import React, { useContext } from "react";
import { UserInfoContext } from "../contexts/userInfo";
import { toast } from "react-toastify";

const AdminOrderRecords = () => {
    const { users, updateUser } = useContext(UserInfoContext);

    return (
        <section className="w-full overflow-scroll scrollbar-hide flex flex-col gap-5">
            <h2 className="font-bold text-lg md:text-2xl">Order Records</h2>
            <table className="border-collapse w-full text-center">
                <thead>
                    <tr className="font-bold w-full bg-black/5">
                        <th className="border border-black/15 px-2 py-1">Item Image</th>
                        <th className="border border-black/15 px-2 py-1">Order ID</th>
                        <th className="border border-black/15 px-2 py-1">Item ID</th>
                        <th className="border border-black/15 px-2 py-1">Item Name</th>
                        <th className="border border-black/15 px-2 py-1">Category</th>
                        <th className="border border-black/15 px-2 py-1">Qty</th>
                        <th className="border border-black/15 px-2 py-1">Price</th>
                        <th className="border border-black/15 px-2 py-1">User Email</th>
                        <th className="border border-black/15 px-2 py-1">Process</th>
                        <th className="border border-black/15 px-2 py-1">Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) =>
                        user.ordersData?.orders
                            ? user.ordersData.orders.map((order, idx) =>
                                order.status === "processing" ? (
                                    <tr key={`${user.id}-${idx}`}>

                                        <td className="border border-black/15 px-2 py-1 text-center">
                                            <img
                                                className="inline-block w-12 h-12 md:w-20 md:h-20 object-cover rounded-full"
                                                src={order.item.image}
                                                alt={order.item.name}
                                            />
                                        </td>
                                        <td className="border font-semibold border-black/15 px-2 py-1">
                                            {order.id}
                                        </td>
                                        <td className="border font-semibold border-black/15 px-2 py-1">
                                            {order.item.id}
                                        </td>
                                        <td className="border border-black/15 px-2 py-1">
                                            {order.item.name}
                                        </td>
                                        <td className="border border-black/15 px-2 py-1">
                                            {order.item.category}
                                        </td>
                                        <td className="border border-black/15 px-2 py-1">
                                            x{order.quantity}
                                        </td>
                                        <td className="border border-black/15 px-2 py-1">
                                            ${order.totalPrice}
                                        </td>
                                        <td className="border border-black/15 px-2 py-1">
                                            {user.email}
                                        </td>
                                        <td className="border border-black/15 px-2 py-1">
                                            <span
                                                onClick={() => {
                                                    // build new orders array immutably
                                                    const updatedOrders = user.ordersData.orders.map(
                                                        (o) =>
                                                            o.item.id === order.item.id && o.id == order.id
                                                                ? { ...o, status: "processed" }
                                                                : o
                                                    );

                                                    // update whole user object
                                                    const updatedUser = {
                                                        ...user,
                                                        ordersData: { ...user.ordersData, orders: updatedOrders },
                                                    };

                                                    updateUser(updatedUser);
                                                    toast.success(
                                                        <span>
                                                            Order <span className="font-bold text-green-600">{order.item.name}</span> processed
                                                        </span>
                                                    );
                                                }}
                                                className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-2 py-1 rounded-md"
                                            >
                                                Process
                                            </span>
                                        </td>
                                        <td className="border border-black/15 px-2 py-1">
                                            <span
                                                onClick={() => {
                                                    // build new orders array immutably
                                                    const updatedOrders = user.ordersData.orders.map(
                                                        (o) =>
                                                            o.item.id === order.item.id && o.id == order.id
                                                                ? { ...o, status: "cancelled" }
                                                                : o
                                                    );

                                                    // update whole user object
                                                    const updatedUser = {
                                                        ...user,
                                                        ordersData: { ...user.ordersData, orders: updatedOrders },
                                                    };

                                                    updateUser(updatedUser);
                                                    toast.success(
                                                        <span>
                                                            Order <span className="font-bold text-red-600">{order.item.name}</span> cancelled
                                                        </span>
                                                    );
                                                }}
                                                className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-2 py-1 rounded-md">
                                                Cancel
                                            </span>
                                        </td>
                                    </tr>
                                ) : null
                            )
                            : null
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default AdminOrderRecords;

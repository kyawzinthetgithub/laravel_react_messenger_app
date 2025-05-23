import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
    EllipsisVerticalIcon,
    LockClosedIcon,
    LockOpenIcon,
    ShieldCheckIcon,
    UserIcon,
} from "@heroicons/react/24/solid";

export default function UserOptionsDropDown({ conversation }) {
    const changeUserRole = () => {
        console.log("Change User Role");
        if (!conversation.is_user) {
            return;
        }
        axios
            .post(route("user.ChangeRole", conversation.id))
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onBlockUser = () => {
        console.log("Block User");
        if (!conversation.is_user) {
            return;
        }
        axios
            .post(route("user.blockUnblock", conversation.id))
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <div>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/40">
                            <EllipsisVerticalIcon className="w-5 h-5" />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg z-50">
                            <div className="p-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={onBlockUser}
                                            className={`${
                                                active
                                                    ? "bg-black/30 text-white"
                                                    : "text-gray-100"
                                            } group flex w-full items-center rounded-md p-2 text-sm`}
                                        >
                                            {conversation.blocked_at && (
                                                <>
                                                    <LockOpenIcon className="w-4 h-4 mr-2" />
                                                    Unblock User
                                                </>
                                            )}
                                            {!conversation.blocked_at && (
                                                <>
                                                    <LockClosedIcon className="w-4 h-4 mr-2" />
                                                    Block User
                                                </>
                                            )}
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="p-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={changeUserRole}
                                            className={`${
                                                active
                                                    ? "bg-black/30 text-white"
                                                    : "text-gray-100"
                                            } group flex w-full items-center rounded-md p-2 text-sm`}
                                        >
                                            {conversation.is_admin && (
                                                <>
                                                    <UserIcon className="w-4 h-4 mr-2" />
                                                    Make Regular User
                                                </>
                                            )}
                                            {!conversation.is_admin && (
                                                <>
                                                    <ShieldCheckIcon className="w-4 h-4 mr-2" />
                                                    Make Admin
                                                </>
                                            )}
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </>
    );
}

import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import TextInput from "@/Components/TextInput";
import ConversationItem from "@/Components/App/ConversationItem";

const ChatLayout = ({ children }) => {
    const page = usePage();
    const user = page.props.auth.user;

    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;

    const [onlineUsers, setOnlineUsers] = useState({}); //set online users

    const isUserOnline = (userId) => onlineUsers[userId];

    const onSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setLocalConversations(
            conversations.filter((conversation) => {
                return conversation.name.toLowerCase().includes(search);
            })
        );
    };

    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);

    useEffect(() => {
    if (localConversations.length > 0) {
        setSortedConversations(
            [...localConversations].sort((a, b) => {
                if (a.blocked_at && b.blocked_at) {
                    return a.blocked_at > b.blocked_at ? 1 : -1;
                } else if (a.blocked_at) {
                    return 1;
                } else if (b.blocked_at) {
                    return -1;
                }

                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localeCompare(
                        a.last_message_date
                    );
                } else if (a.last_message_date) {
                    return -1;
                } else if (b.last_message_date) {
                    return 1;
                } else {
                    return 0;
                }
            })
        );
    }
}, [localConversations]);

    useEffect(() => {
        setLocalConversations(conversations);
    }, [conversations]); //set local conversations

    useEffect(() => {
        Echo.join("online")
            .here((users) => {
                const onlineUserObj = Object.fromEntries(
                    users.map((user) => [user.id, user])
                );
                setOnlineUsers((prevOnlineUsers) => ({
                    ...prevOnlineUsers,
                    ...onlineUserObj,
                }));
            })
            .joining((user) => {
console.log('joining');
                setOnlineUsers((prevOnlineUsers) => {
                    const newOnlineUsers = { ...prevOnlineUsers };
                    newOnlineUsers[user.id] = user;
                    return newOnlineUsers;
                });
            })
            .leaving((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const newOnlineUsers = { ...prevOnlineUsers };
                    delete newOnlineUsers[user.id];
                    return newOnlineUsers;
                });
            })
            .error((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <div className="flex-1 w-full flex overflow-hidden">
                {/* for sidebar */}
                <div
                    className={`transition-all w-full sm:w-[220px] md:w-[330px] bg-slate-800 flex flex-col overflow-hidden ${
                        selectedConversation ? "-ml-[100%] sm:ml-0" : ""
                    }`}
                >
                    <div className="flex justify-between items-center py-2 px-3 text-xl font-medium">
                        {/* header */}
                        My Conversations
                        <div
                            className="tooltip tooltip-left"
                            data-tip="Create New Group"
                        >
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-200"
                            >
                                <PencilSquareIcon className="w-4 h-4 ml-2 inline-block" />
                            </button>
                        </div>
                    </div>
                    <div className="p-3">
                        <TextInput
                            onKeyUp={onSearch}
                            className="w-full"
                            placeholder="Filter users and groups"
                        />
                    </div>
                    <div className="flex-1 overflow-auto">
                        {sortedConversations &&
                        sortedConversations.length > 0 ? (
                            sortedConversations.map((conversation) => (
                                <ConversationItem
                                    key={`${
                                        conversation.is_group
                                            ? "group_"
                                            : "user_"
                                    }${conversation.id}`}
                                    conversation={conversation}
                                    online={!!isUserOnline(conversation.id)}
                                    selectedConversation={selectedConversation}
                                />
                            ))
                        ) : (
                            <div className="text-gray-400 text-center mt-4">
                                No conversations available.
                            </div>
                        )}
                    </div>
                </div>
                {/* for chat */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>
            </div>
        </>
    );
};

export default ChatLayout;

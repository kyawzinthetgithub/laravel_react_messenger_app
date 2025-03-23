import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const ChatLayout = ({ children }) => {
    const page = usePage();
    const user = page.props.auth.user;

    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;

    const [onlineUsers,setOnlineUsers] = useState({}); //set online users

    const isUserOnline = (userId) => onlineUsers[userId];
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);

    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a, b) => {
                if(a.blocked_at && b.blocked_at){
                    return a.blocked_at > b.blocked_at ? 1 : -1;
                }else if(a.blocked_at){
                    return 1;
                }
                else if(b.blocked_at){
                    return -1;
                }

                if(a.last_message_date && b.last_message_date){
                    return b.last_message_date.localCompare(a.last_message_date);
                }
                else if(a.last_message_date){
                    return -1;
                }
                else if(b.last_message_date){
                    return 1;
                }
                else{
                    return 0;
                }
            })
        );
    },[]);

    useEffect(() => {
        setLocalConversations(conversations);
    }
    ,[conversations]); //set local conversations

    useEffect(() => {
        Echo.join("online")
            .here((users) => {
                const onlineUserObj = Object.fromEntries(users.map((user) => [user.id, user]));
                setOnlineUsers((prevOnlineUsers) => ({ ...prevOnlineUsers, ...onlineUserObj }));
            })
            .joining((user) => {
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
    },[]);

    return (
        <>
            ChatLayout Component
            <div>{children}</div>
        </>
    );
};

export default ChatLayout;

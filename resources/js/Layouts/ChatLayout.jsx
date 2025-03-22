import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

const ChatLayout = ({ children }) => {
    const page = usePage();
    const user = page.props.auth.user;
    return (
        <>
            ChatLayout Component
            <div>{children}</div>
        </>
    );
};

export default ChatLayout;

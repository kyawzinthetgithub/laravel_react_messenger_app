import { UsersIcon } from "@heroicons/react/24/solid";

const GroupAvatar = () => {
    return (
        <>
            <div className={"avatar avatar-placeholder"}>
                <div
                    className={`bg-gray-400 text-gray-800 rounded-full w-8 felx items-center justify-center`}
                >
                    <div className="text-xl">
                        <UsersIcon className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupAvatar;

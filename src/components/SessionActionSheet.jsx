import {
    Pencil,
    Pin,
    Trash2
}
from "lucide-react"

import BottomSheet
from "./BottomSheet"

export default function SessionActionSheet({

    open,

    session,

    onClose,

    onRename,

    onTogglePin,

    onDelete

}) {

    if (!session) {

        return null

    }

    return (

        <BottomSheet

            open={open}

            onClose={onClose}

        >

            <div
                className="
                    text-center
                    mb-6
                "
            >

                <h2
                    className="
                        text-lg
                        font-semibold
                        text-white
                        truncate
                    "
                >

                    {session.title}

                </h2>

            </div>

            <button

                onClick={() => {

                    onRename(
                        session
                    )

                    onClose()

                }}

                className="
                    w-full

                    flex
                    items-center
                    gap-4
                    dark:text-white
                    px-2
                    py-2

                    rounded-xl

                    hover:bg-slate-800

                    transition
                "

            >

                <Pencil size={18} />

                Rename

            </button>

            <button

                onClick={async () => {

                    await onTogglePin(
                        session.session_id
                    )

                    onClose()

                }}

                className="
                    w-full

                    flex
                    items-center
                    gap-4

                    px-2
                    py-2
                    dark:text-white
                    rounded-xl

                    hover:bg-slate-800

                    transition
                "

            >

                <Pin size={18} />

                {

                    session.is_pinned

                        ? "Unpin Chat"

                        : "Pin Chat"

                }

            </button>

            <button

                onClick={() => {

                    onDelete(
                        session
                    )

                    onClose()

                }}

                className="
                    w-full

                    flex
                    items-center
                    gap-4

                    px-2
                    py-2
                   
                    rounded-xl

                    text-red-400

                    hover:bg-red-500/10

                    transition
                ">

                <Trash2 size={18} />

                Delete Chat

            </button>

        </BottomSheet>

    )

}
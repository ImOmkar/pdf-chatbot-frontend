import {
    useEffect,
    useState
}
from "react"

import BottomSheet
from "./BottomSheet"

export default function RenameSessionSheet({

    open,

    session,

    onClose,

    onSave

}) {

    const [
        title,
        setTitle
    ] = useState("")

    useEffect(() => {

        if (session) {

            setTitle(
                session.title
            )

        }

    }, [session])

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
                    space-y-5
                    p-2
                "
            >

                <div>

                    <h2
                        className="
                            text-xl
                            font-semibold
                            text-white
                        "
                    >

                        Rename Chat

                    </h2>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-slate-400
                        "
                    >

                        Give your conversation a meaningful title.

                    </p>

                </div>

                <input

                    value={title}

                    onChange={(e) =>

                        setTitle(
                            e.target.value
                        )

                    }

                    className="
                        w-full

                        rounded-xl

                        bg-slate-800

                        border
                        border-slate-700

                        px-4
                        py-3

                        text-white

                        outline-none

                        focus:border-blue-500
                    "

                />

                <div
                    className="
                        flex
                        gap-3
                        text-white
                    "
                >

                    <button

                        onClick={onClose}

                        className="
                            flex-1

                            rounded-xl

                            bg-slate-800

                            py-3

                            hover:bg-slate-700
                        "

                    >

                        Cancel

                    </button>

                    <button

                        onClick={() =>

                            onSave(
                                title
                            )

                        }

                        className="
                            flex-1

                            rounded-xl

                            bg-blue-600

                            py-3

                            hover:bg-blue-500
                        "

                    >

                        Save

                    </button>

                </div>

            </div>

        </BottomSheet>

    )

}
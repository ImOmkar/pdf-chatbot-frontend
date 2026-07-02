import {
    useEffect,
    useState
}
from "react"

export default function RenameSessionModal({

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

    if (!open) {

        return null

    }

    return (

        <div
            className="
                hidden
                lg:flex

                fixed
                inset-0

                items-center
                justify-center

                z-50

                bg-black/60
                backdrop-blur-sm
            "
        >

            <div
                className="
                    w-full
                    max-w-md

                    mx-4

                    rounded-2xl

                    bg-slate-900

                    border
                    border-slate-800

                    p-6
                "
            >

                <h2
                    className="
                        text-xl
                        font-semibold
                        text-white

                        mb-5
                    "
                >

                    Rename Chat

                </h2>

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
                        justify-end
                        gap-3
                        text-white
                        mt-6
                    "
                >

                    <button

                        onClick={onClose}

                        className="
                            px-4
                            py-2

                            rounded-xl

                            bg-slate-800

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
                            px-4
                            py-2

                            rounded-xl

                            bg-blue-600

                            hover:bg-blue-500
                        "

                    >

                        Save

                    </button>

                </div>

            </div>

        </div>

    )

}
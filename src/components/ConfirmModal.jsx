import {
    AlertTriangle
}
from "lucide-react"
import {
    useRef,
    useEffect
}
from "react"

export default function ConfirmModal({

    open,

    title,

    message,

    confirmText = "Confirm",

    cancelText = "Cancel",

    onConfirm,

    onCancel,

    danger = false

}) {

    useEffect(
        () => {

            if (!open) {

                return

            }

            const handler =
                (e) => {

                    if (
                        e.key === "Escape"
                    ) {

                        onCancel()

                    }

                }

            document.addEventListener(
                "keydown",
                handler
            )

            return () => {

                document.removeEventListener(
                    "keydown",
                    handler
                )

            }

        },
        [
            open,
            onCancel
        ]
    )

    useEffect(() => {

        if (!open) {

            return

        }

        document.body.style.overflow = "hidden"

        return () => {

            document.body.style.overflow = "auto"

        }

    }, [open])

    if (!open) {

        return null

    }

    return (

        <div
            onClick={onCancel}
            className="
                fixed
                inset-0
                bg-black/60
                backdrop-blur-sm

                flex
                items-center
                justify-center

                z-[100]
            "
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="
                    w-[92%]
                    max-w-lg

                    bg-slate-900

                    border
                    border-slate-700

                    rounded-3xl

                    shadow-2xl

                    p-7

                    animate-in
                    fade-in
                    zoom-in-95

                    duration-200
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <div
                        className="
                            h-14
                            w-14

                            shrink-0

                            rounded-2xl

                            bg-red-500/15

                            border
                            border-red-500/20

                            flex
                            items-center
                            justify-center
                        ">

                        <AlertTriangle
                            size={24}
                            className="
                                text-red-400
                            "
                        />

                    </div>

                    <div className="
                            min-w-0
                        ">

                        <h2
                            className="
                                text-xl
                                font-semibold
                                text-white
                                leading-none
                            "
                        >
                            {title}
                        </h2>

                        <p
                            className="
                                text-sm
                                text-slate-500
                                mt-1
                            "
                        >
                            Please confirm your action.
                        </p>

                    </div>

                </div>

                <p
                    className="
                        mt-6

                        text-sm

                        text-slate-300

                        leading-7

                        whitespace-pre-line

                        break-words
                    "
                >
                    {message}
                </p>

                <div
                    className="
                        flex

                        justify-end

                        gap-3

                        mt-8

                        pt-6

                        border-t
                        border-slate-800
                    "
                >

                    <button

                        onClick={onCancel}

                        className="
                            h-11

                            px-5

                            rounded-xl

                            bg-slate-800

                            hover:bg-slate-700

                            text-white

                            transition-all
                        "
                    >

                        {cancelText}

                    </button>

                    <button

                        onClick={onConfirm}

                        className={`
                            h-11

                            px-5

                            rounded-xl

                            font-medium

                            text-white

                            transition-all

                            ${
                                danger

                                ? `
                                    bg-red-600
                                    hover:bg-red-700
                                `

                                : `
                                    bg-blue-600
                                    hover:bg-blue-700
                                `
                            }
                        `}
                    >

                        {confirmText}

                    </button>

                </div>

            </div>

        </div>

    )

}
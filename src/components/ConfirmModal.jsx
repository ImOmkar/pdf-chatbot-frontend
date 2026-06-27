import {
    AlertTriangle
}
from "lucide-react"

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

    if (!open) {

        return null

    }

    return (

        <div
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
                className="
                    w-full
                    max-w-md

                    bg-slate-900

                    border
                    border-slate-700

                    rounded-2xl

                    shadow-2xl

                    p-6
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
                            h-12
                            w-12

                            rounded-full

                            bg-red-500/20

                            flex
                            items-center
                            justify-center
                        "
                    >

                        <AlertTriangle
                            className="
                                text-red-400
                            "
                        />

                    </div>

                    <div>

                        <h2
                            className="
                                text-lg
                                font-semibold
                                text-white
                            "
                        >
                            {title}
                        </h2>

                    </div>

                </div>

                <p
                    className="
                        mt-5

                        text-sm
                        text-slate-400

                        leading-6
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
                    "
                >

                    <button

                        onClick={onCancel}

                        className="
                            px-5
                            py-2

                            rounded-xl

                            bg-slate-800

                            hover:bg-slate-700

                            text-white

                            transition
                        "
                    >

                        {cancelText}

                    </button>

                    <button

                        onClick={onConfirm}

                        className={`
                            px-5
                            py-2

                            rounded-xl

                            text-white

                            transition

                            ${
                                danger
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-blue-600 hover:bg-blue-700"
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
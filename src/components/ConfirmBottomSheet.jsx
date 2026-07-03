import BottomSheet from "./BottomSheet"

export default function ConfirmBottomSheet({

    open,

    title,

    message,

    confirmText,

    danger,

    onCancel,

    onConfirm

}) {

    return (

        <BottomSheet

            open={open}

            onClose={onCancel}

        >

            <div className="space-y-6">

                <div>

                    <h2
                        className="
                            text-xl
                            font-semibold
                            text-white
                        "
                    >
                        {title}
                    </h2>

                    <p
                        className="
                            mt-2
                            text-sm
                            text-slate-400
                            whitespace-pre-line
                        "
                    >
                        {message}
                    </p>

                </div>

                <div
                    className="
                        flex
                        gap-3
                    "
                >

                    <button

                        onClick={onCancel}

                        className="
                            flex-1

                            rounded-xl

                            bg-slate-800

                            py-3

                            text-white

                            hover:bg-slate-700
                        "
                    >

                        Cancel

                    </button>

                    <button

                        onClick={onConfirm}

                        className={`
                            flex-1

                            rounded-xl

                            py-3

                            text-white

                            transition

                            ${
                                danger

                                    ? "bg-red-600 hover:bg-red-500"

                                    : "bg-blue-600 hover:bg-blue-500"
                            }
                        `}
                    >

                        {confirmText}

                    </button>

                </div>

            </div>

        </BottomSheet>

    )

}
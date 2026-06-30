import {
    Send,
    Square
}
from "lucide-react"

export default function MessageInput({
    input,
    setInput,
    onSend,
    onStop,
    loading,
}) {

    return (

        <div
            className="
                px-6
                pb-6
            "
        >

            <div
                className="
                    max-w-5xl
                    mx-auto

                    flex
                    items-center
                    gap-3

                   bg-slate-900
                    border
                    border-slate-800

                    focus-within:border-blue-500
                    focus-within:ring-1
                    focus-within:ring-blue-500

                    rounded-2xl

                    px-4
                    py-3

                    shadow-lg
                "
            >

                <input
                    value={input}

                    onChange={(e) =>
                        setInput(
                            e.target.value
                        )
                    }

                    onKeyDown={(e) => {

                        if (
                            e.key === "Enter"
                            &&
                            !loading
                        ) {

                            onSend()

                        }

                    }}

                    placeholder="Ask anything about your documents..."

                    className="
                        flex-1

                        bg-transparent

                        text-white
                        placeholder:text-slate-500

                        outline-none
                    "
                />

                {/* <button

                    disabled={loading}

                    onClick={onSend}

                    className={`
                        h-10
                        w-10

                        flex
                        items-center
                        justify-center

                        rounded-xl

                        transition-all

                        ${
                            loading
                            ? `
                                bg-slate-700
                                cursor-not-allowed
                            `
                            : `
                                bg-blue-600
                                hover:bg-blue-500
                            `
                        }
                    `}
                >

                    {
                        loading
                        ? <div
                            className="
                                animate-spin
                                h-4
                                w-4
                                border-2
                                border-white
                                border-t-transparent
                                rounded-full
                            "
                            />
                        : <Send size={18} />
                    }

                </button> */}

                <button
                    onClick={
                        loading
                            ? onStop
                            : onSend
                    }

                    className={`
                        h-10
                        w-10

                        flex
                        items-center
                        justify-center

                        rounded-xl

                        transition-all

                        ${
                            loading

                            ? `
                                bg-red-600
                                hover:bg-red-500
                            `

                            : `
                                bg-blue-600
                                hover:bg-blue-500
                            `
                        }
                    `}
                >

                    {

                        loading

                        ? (

                            <Square

                                size={16}

                                fill="white"

                            />

                        )

                        : (

                            <Send

                                size={18}

                            />

                        )

                    }

                </button>

            </div>

        </div>
    )
}
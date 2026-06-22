export default function MessageInput() {

    return (

        <div
            className="
                flex
                gap-3
            "
        >

            <input
                placeholder="Ask a question..."
                className="
                    flex-1
                    bg-slate-900
                    text-white
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                "
            />

            <div className="flex items-center">
                <button
                    className="
                        bg-blue-600
                        hover:bg-blue-700
                        px-6
                        rounded-xl
                        text-white
                    "
                >
                    Send
                </button>

                <button
                    className="
                        mt-2
                        w-full
                        border
                        border-slate-700
                        text-slate-300
                        rounded-lg
                        py-2
                    "
                >
                    Upload PDF
                </button>
            </div>

        </div>
    )
}
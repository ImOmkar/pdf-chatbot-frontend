export default function Sidebar() {

    const sessions = [
        "Loan Discussion",
        "Employee Details",
        "Company Policy"
    ]

    return (

        <div
            className="
                w-72
                bg-slate-900
                border-r
                border-slate-800
                flex
                flex-col
            "
        >

            <div
                className="
                    p-4
                    border-b
                    border-slate-800
                "
            >
                <h1
                    className="
                        text-xl
                        font-bold
                        text-white
                    "
                >
                    PDF ChatBot
                </h1>
            </div>

            <div className="p-4">

                <button
                    className="
                        w-full
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        rounded-lg
                        py-2
                    "
                >
                    + New Chat
                </button>

            </div>

            <div
                className="
                    flex-1
                    overflow-y-auto
                    px-4
                "
            >

                {
                    sessions.map(
                        (
                            session,
                            index
                        ) => (
                            <div
                                key={index}
                                className="
                                    p-3
                                    rounded-lg
                                    cursor-pointer
                                    text-slate-300
                                    hover:bg-slate-800
                                    mb-2
                                "
                            >
                                {session}
                            </div>
                        )
                    )
                }

            </div>

        </div>
    )
}
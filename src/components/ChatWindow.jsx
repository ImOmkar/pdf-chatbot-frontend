import Message from "./Message"

export default function ChatWindow({
    messages
}) {

    if (
        messages.length === 0
    ) {

        return (

            <div
                className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    text-slate-400
                "
            >
                Select a conversation
            </div>

        )
    }

    return (

        <div
            className="
                flex-1
                overflow-y-auto
                p-6
            "
        >
            <div
                className="
                    border-b
                    border-slate-800
                    p-4
                    mb-4
                "
            >

                <h2
                    className="
                        text-white
                        font-semibold
                    "
                >
                    Loan Discussion
                </h2>

            </div>

            <div
                className="
                    max-w-4xl
                    mx-auto
                "
            >

                {
                    messages.map(
                        (
                            message,
                            index
                        ) => (

                            <Message
                                key={index}
                                role={
                                    message.role === "human"
                                        ? "user"
                                        : "assistant"
                                }
                                content={
                                    message.content
                                }
                            />

                        )
                    )
                }

            </div>

        </div>
    )
}
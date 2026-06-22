import Message from "./Message"

export default function ChatWindow() {

    const messages = [

        {
            role: "user",
            content:
                "Who approved the loan?"
        },

        {
            role: "assistant",
            content:
                "Branch Manager Neha Kulkarni"
        },

        {
            role: "user",
            content:
                "What was the loan amount?"
        },

        {
            role: "assistant",
            content:
                "INR 25,00,000"
        }
    ]

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
                                    message.role
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
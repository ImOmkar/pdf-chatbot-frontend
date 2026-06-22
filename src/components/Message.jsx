export default function Message({
    role,
    content
}) {

    const isUser =
        role === "user"

    return (

        <div
            className={`
                flex
                mb-4
                ${
                    isUser
                    ? "justify-end"
                    : "justify-start"
                }
            `}
        >

            <div
                className={`
                    max-w-2xl
                    px-4
                    py-3
                    rounded-2xl
                    text-white
                    ${
                        isUser
                        ? "bg-blue-600"
                        : "bg-slate-800"
                    }
                `}
            >
                {content}
            </div>

        </div>
    )
}
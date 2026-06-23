import ReactMarkdown
from "react-markdown"

import {
    Prism as SyntaxHighlighter
}
from "react-syntax-highlighter"

import {
    oneDark
}
from "react-syntax-highlighter/dist/esm/styles/prism"

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
                items-start
                gap-3

                ${
                    isUser
                    ? "justify-end"
                    : "justify-start"
                }
            `}
        >

            {
                !isUser && (

                    <div
                        className="
                            w-8
                            h-8
                            rounded-full
                            bg-slate-700
                            flex
                            items-center
                            justify-center
                            shrink-0
                        "
                    >
                        🤖
                    </div>

                )
            }

            <div
                className={`
                    max-w-[80%]
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

                <ReactMarkdown
                    components={{
                        code({
                            inline,
                            className,
                            children,
                            ...props
                        }) {

                            const match =
                                /language-(\w+)/
                                .exec(className || "")

                            return !inline && match
                                ? (
                                    <SyntaxHighlighter
                                        style={oneDark}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {
                                            String(children)
                                            .replace(/\n$/, "")
                                        }
                                    </SyntaxHighlighter>
                                )
                                : (
                                    <code
                                        className="
                                            bg-slate-900
                                            px-1
                                            rounded
                                        "
                                    >
                                        {children}
                                    </code>
                                )
                        }
                    }}
                >
                    {content}
                </ReactMarkdown>

            </div>

            {
                isUser && (

                    <div
                        className="
                            w-8
                            h-8
                            rounded-full
                            bg-blue-600
                            flex
                            items-center
                            justify-center
                            shrink-0
                        "
                    >
                        👤
                    </div>

                )
            }

        </div>

    )
}
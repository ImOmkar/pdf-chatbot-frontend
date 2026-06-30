import {
    useState
}
from "react"
import ReactMarkdown
from "react-markdown"
import {
    Send,
    BookOpen,
    FileText,
    Copy, 
    Check,
    RotateCcw
}
from "lucide-react"
import {
    Prism as SyntaxHighlighter
}
from "react-syntax-highlighter"

import toast
from "react-hot-toast"

import {
    oneDark
}
from "react-syntax-highlighter/dist/esm/styles/prism"

export default function Message({
    id,
    role,
    content,
    suggestions,
    sources,
    completed = true,
    onRegenerate,

}) {

    console.log("suggestions", suggestions)

    const [copied, setCopied] = useState(false)

    const isUser =
        role === "user"


    console.log(sources)


    const handleCopy =
    async () => {

        try {

            await navigator.clipboard.writeText(
                content
            )

            setCopied(
                true
            )

            toast.success(
                "Copied to clipboard."
            )

            setTimeout(
                () =>
                    setCopied(
                        false
                    ),
                2000
            )

        }

        catch {

            toast.error(
                "Couldn't copy."
            )

        }

    }
        

    return (

        <div
            className={`
                group
                flex
                mb-4
                gap-2
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
                    relative
                    max-w-[80%]
                    px-5
                    py-4
   
                    rounded-2xl
                    text-white

                    ${
                        isUser
                        ? "bg-blue-600"
                        : "bg-slate-800"
                    }
                `}>

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

                {
                    role === "assistant"
                    &&

                    sources?.length > 0 && (

                        <div
                            className="
                                mt-5

                                border-t
                                border-slate-700

                                pt-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2

                                    text-xs
                                    uppercase

                                    tracking-wider

                                    text-slate-400

                                    mb-3
                                "
                            >

                                <BookOpen
                                    size={14}
                                />

                                Sources

                            </div>

                            <div
                                className="
                                    flex
                                    flex-wrap
                                    gap-3
                                "
                            >

                                {
                                    sources.map(

                                        (
                                            source,
                                            index
                                        ) => (

                                            <div

                                                key={index}

                                                className="
                                                    bg-slate-900

                                                    border
                                                    border-slate-700

                                                    rounded-xl

                                                    px-3
                                                    py-2

                                                    min-w-[180px]
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2

                                                        text-white
                                                        text-sm
                                                    "
                                                >

                                                    <FileText
                                                        size={15}
                                                    />

                                                    {
                                                        source.document
                                                    }

                                                </div>

                                                <div
                                                    className="
                                                        mt-1

                                                        text-xs

                                                        text-slate-400
                                                    "
                                                >

                                                    Page {source.page}

                                                </div>

                                            </div>

                                        )

                                    )
                                }

                            </div>

                        </div>

                    )
                }

                {
                    !isUser && (

                        <div
                            className="
                                
                                top-2
                                right-3
                                
                                flex
                                justify-end
                                items-center
                                gap-1
                                my-2
                                opacity-0
                                group-hover:opacity-100

                                transition-all
                            ">

                            <button

                                onClick={handleCopy}

                                title="Copy"

                                className="
                                    h-8
                                    w-8

                                    rounded-lg

                                    flex
                                    items-center
                                    justify-center

                                    text-slate-400

                                    hover:text-white
                                    hover:bg-slate-700

                                    transition-all
                                "
                            >

                                {
                                    copied

                                    ? <Check size={16}/>

                                    : <Copy size={16}/>
                                }

                            </button>

                            {
                                completed && (

                                    <button

                                        onClick={onRegenerate}

                                        title="Regenerate"

                                        className="
                                            h-8
                                            w-8

                                            rounded-lg

                                            flex
                                            items-center
                                            justify-center

                                            text-slate-400

                                            hover:text-white
                                            hover:bg-slate-700

                                            transition-all
                                        "
                                    >

                                        <RotateCcw
                                            size={16}
                                        />

                                    </button>

                                )
                            }

                        </div>

                    )
                }

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
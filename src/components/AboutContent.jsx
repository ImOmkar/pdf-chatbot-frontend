import {
    
    // Linkedin,
    Sparkles,
    CheckCircle2,

    
}
from "lucide-react"

export default function AboutContent() {

    return (

        <div
            className="
                space-y-6
                px-1
            "
        >

            {/* Header */}

            <div
                className="
                    text-center
                "
            >

                <div
                    className="
                        inline-flex

                        items-center
                        justify-center

                        h-16
                        w-16

                        rounded-2xl

                        bg-blue-500/10

                        mb-4
                    "
                >

                    <Sparkles

                        className="
                            text-blue-400
                        "

                        size={30}

                    />

                </div>

                <h2
                    className="
                        text-2xl
                        font-bold

                        text-white
                    "
                >

                    DocMind AI

                </h2>

                <p
                    className="
                        mt-2

                        text-slate-400
                    "
                >

                    AI-powered document assistant for chatting with one or multiple PDFs.

                </p>

            </div>

            {/* Tech */}

            <div>

                <h3
                    className="
                        mb-3

                        font-semibold

                        text-white
                    "
                >

                    Tech Stack

                </h3>

                <div
                    className="
                        flex
                        flex-wrap
                        gap-2
                    "
                >

                    {

                        [

                            "React",

                            "FastAPI",

                            "LangChain",

                            "Gemini",

                            "ChromaDB",

                            "SQLAlchemy",

                            "SQLite"

                        ].map(

                            tech => (

                                <span

                                    key={tech}

                                    className="
                                        rounded-full

                                        bg-slate-800

                                        px-3
                                        py-1

                                        text-sm

                                        text-slate-300
                                    "

                                >

                                    {tech}

                                </span>

                            )

                        )

                    }

                </div>

            </div>

            {/* Features */}

            <div>

                <h3
                    className="
                        mb-3

                        font-semibold

                        text-white
                    "
                >

                    Features

                </h3>

                <div
                    className="
                        space-y-2
                    "
                >

                    {

                        [

                            "Streaming Chat",

                            "Multi-document Chat",

                            "PDF Summaries",

                            "Source Citations",

                            "Suggested Questions",

                            "Drag & Drop Upload",

                            "Session Management"

                        ].map(

                            feature => (

                                <div

                                    key={feature}

                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "

                                >

                                    <CheckCircle2

                                        size={16}

                                        className="
                                            text-emerald-400
                                        "
                                    />

                                    <span
                                        className="
                                            text-slate-300
                                        "
                                    >

                                        {feature}

                                    </span>

                                </div>

                            )

                        )

                    }

                </div>

            </div>

            {/* Footer */}

            <div
                className="
                    border-t
                    border-slate-800

                    pt-5

                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <p
                        className="
                            text-sm
                            text-slate-500
                        "
                    >

                        Built by

                    </p>

                    <p
                        className="
                            text-white
                            font-medium
                        "
                    >

                        Omkar Parab

                    </p>

                </div>

                <div
                    className="
                        flex
                        gap-2
                    "
                >

                    <a
                        href="https://github.com/ImOmkar"

                        target="_blank"

                        rel="noopener noreferrer"

                        className="
                            rounded-lg
                            p-2
                            hover:bg-slate-800
                            transition
                        "
                    >

                        <svg xmlns="http://www.w3.org/2000/svg"  className="w-5 h-5 dark:text-white"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>

                    </a>

                    <a
                        href="https://www.linkedin.com/in/omkar-parab-02182415b/"

                        target="_blank"

                        rel="noopener noreferrer"

                        className="
                            rounded-lg
                            p-2
                            hover:bg-slate-800
                            transition
                        "
                    >

                        <svg xmlns="http://www.w3.org/2000/svg"  className="w-5 h-5 dark:text-white"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" /></svg>
                    </a>

                    <a
                        href="https://drive.google.com/drive/folders/14oidiEV-brj8g5srm8Wx76dxGeF_XRJw?usp=sharing"

                        target="_blank"

                        rel="noopener noreferrer"

                        className="
                            rounded-lg
                            p-2
                            hover:bg-slate-800
                            transition
                        ">

                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 dark:text-white"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" /><path d="M11 12.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" /><path d="M13 11l1.5 6l1.5 -6" /></svg>
                    </a>

                </div>

            </div>

            <p
                className="
                    text-center

                    text-xs

                    text-slate-500
                "
            >

                Version 1.0.0

            </p>

        </div>

    )

}
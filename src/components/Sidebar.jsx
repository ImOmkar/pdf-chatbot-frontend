
import {
    getSessionMessages,
    createSession
}
from "../services/api"

export default function Sidebar({
    sessions,
    selectedSession,
    setSelectedSession,
    setMessages,
    loadSessions
}) {

    const handleNewChat =
        async () => {

            try {

                const response =
                    await createSession()

                const session = {

                    session_id:
                        response.data.session_id,

                    title:
                        "New Chat"
                }

                setSelectedSession(
                    session
                )

                setMessages([])

                await loadSessions()

            }
            catch(error) {

                console.log(error)

            }

        }

    const loadMessages =
        async (session) => {

            try {

                const response =
                    await getSessionMessages(
                        session.session_id
                    )

                setSelectedSession(
                    session
                )

                setMessages(
                    response.data.messages
                )

            }
            catch(error) {

                console.log(error)

            }
        }

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
                    onClick={handleNewChat}
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
                    (session) => (

                        <div
                            key={
                                session.session_id
                            }

                            onClick={
                                () =>
                                loadMessages(
                                    session
                                )
                            }

                            className={`
                                p-3
                                rounded-lg
                                cursor-pointer
                                mb-2

                                ${
                                    selectedSession?.session_id
                                    === session.session_id
                                    ? "bg-slate-700 text-white"
                                    : "hover:bg-slate-800 text-slate-300"
                                }
                            `}
                        >
                            {session.title}
                        </div>

                    )
                )
            }

            </div>

        </div>
    )
}
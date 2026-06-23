import { useState } from "react"

import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"
import MessageInput from "../components/MessageInput"
import {
    sendMessage
} from "../services/api"

export default function ChatPage() {

    const [
        selectedSession,
        setSelectedSession
    ] = useState(null)

    const [
        messages,
        setMessages
    ] = useState([])

    
    const [input, setInput] = useState("")

    const handleSend =
        async () => {

            if (
                !input.trim()
            ) {
                return
            }

            if (
                !selectedSession
            ) {
                alert(
                    "Select a session"
                )
                return
            }

            try {

                const userMessage = {
                    role: "human",
                    content: input
                }

                setMessages(
                    prev => [
                        ...prev,
                        userMessage
                    ]
                )

                const question =
                    input

                setInput("")

                const response =
                    await sendMessage(
                        {
                            session_id:
                                selectedSession.session_id,

                            question
                        }
                    )

                const aiMessage = {
                    role: "ai",
                    content:
                        response.data.answer
                }

                setMessages(
                    prev => [
                        ...prev,
                        aiMessage
                    ]
                )

            }
            catch(error) {

                console.log(error)

            }
        }

    return (

        <div
            className="
                h-screen
                flex
                bg-slate-950
            "
        >

            <Sidebar
                selectedSession={
                    selectedSession
                }
                setSelectedSession={
                    setSelectedSession
                }
                setMessages={
                    setMessages
                }
            />

            <div
                className="
                    flex-1
                    flex
                    flex-col
                "
            >

                <ChatWindow
                    messages={messages}
                />

                <MessageInput 
                    input={input}
                    setInput={setInput}
                    onSend={handleSend}
                />

            </div>

        </div>
    )
}
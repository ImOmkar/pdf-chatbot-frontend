import {
    MoreHorizontal,
    Pencil,
    Trash2,
    ChevronRight
}
from "lucide-react"

export default function SessionItem({

    session,

    selectedSession,

    loadMessages,

    editingSession,

    editedTitle,

    setEditedTitle,

    setEditingSession,

    handleRename,

    openMenu,

    setOpenMenu,

    setConfirmModal,

    handleDelete

}) {

    return (

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
                rounded-xl
                cursor-pointer
                mb-2
                transition-all

                ${
                    selectedSession?.session_id === session.session_id
                        ? `
                            bg-blue-600/20
                            border
                            border-blue-500/30
                            text-white
                        `
                        : `
                            hover:bg-slate-800
                            text-slate-300
                        `
                }
            `}>
                
            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >

                {
                    editingSession ===
                    session.session_id

                    ? (

                        <input

                            autoFocus

                            value={
                                editedTitle
                            }

                            onChange={
                                (e) =>
                                setEditedTitle(
                                    e.target.value
                                )
                            }

                            onBlur={
                                () =>
                                handleRename(
                                    session.session_id
                                )
                            }

                            onKeyDown={
                                (e) => {

                                    if (
                                        e.key === "Enter"
                                    ) {

                                        handleRename(
                                            session.session_id
                                        )

                                    }

                                }
                            }

                            className="
                                bg-slate-800
                                text-white
                                px-2
                                py-1
                                rounded
                                w-full
                            "
                        />

                    )

                    : (

                        <span
                            onDoubleClick={
                                () => {

                                    setEditingSession(
                                        session.session_id
                                    )

                                    setEditedTitle(
                                        session.title
                                    )

                                }
                            }

                            className="
                                text-sm
                                truncate
                                max-w-[180px]
                            "
                        >
                            {session.title}
                        </span>

                    )
                }

                <div                                     
                    className="
                        relative
                    "
                >

                    <MoreHorizontal

                        size={18}

                        onClick={
                            (e) => {

                                e.stopPropagation()

                                setOpenMenu(

                                    openMenu === session.session_id
                                        ? null
                                        : session.session_id

                                )

                            }
                        }

                        className="
                            cursor-pointer
                            text-slate-500
                            hover:text-white
                        "
                    />

                    {
                        openMenu === session.session_id && (

                            <div
                                className="
                                    absolute

                                    right-0
                                    top-8

                                    w-48

                                    bg-slate-900

                                    border
                                    border-slate-700

                                    rounded-2xl

                                    shadow-2xl

                                    overflow-hidden

                                    animate-in
                                    fade-in
                                    zoom-in-95

                                    z-50
                                ">

                                <button

                                    onClick={
                                        (e) => {

                                            e.stopPropagation()

                                            setEditingSession(
                                                session.session_id
                                            )

                                            setEditedTitle(
                                                session.title
                                            )

                                            setOpenMenu(
                                                null
                                            )

                                        }
                                    }

                                    className="
                                        w-full

                                        flex
                                        items-center
                                        justify-between

                                        px-4
                                        py-3

                                        text-sm

                                        text-slate-300

                                        hover:bg-slate-800
                                        hover:text-white

                                        transition-all
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        <Pencil
                                            size={16}
                                        />

                                        <span>
                                            Rename
                                        </span>

                                    </div>

                                    <ChevronRight
                                        size={15}
                                    />

                                </button>

                                <button

                                    onClick={
                                        (e) => {

                                            e.stopPropagation()

                                            setOpenMenu(
                                                null
                                            )

                                            setConfirmModal({

                                                open: true,

                                                title: "Delete Session",

                                                message: `Are you sure you want to delete "${session.title}"?\n\nThis action cannot be undone.`,

                                                confirmText: "Delete",

                                                danger: true,

                                                onConfirm: async () => {

                                                    await handleDelete(
                                                        session.session_id
                                                    )

                                                }

                                            })

                                        }
                                    }

                                    className="
                                        w-full

                                        flex
                                        items-center
                                        justify-between

                                        px-4
                                        py-3

                                        text-sm

                                        text-red-400

                                        hover:bg-red-500/10

                                        transition-all
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        <Trash2
                                            size={16}
                                        />

                                        <span>
                                            Delete
                                        </span>

                                    </div>

                                    <ChevronRight
                                        size={15}
                                    />

                                </button>

                            </div>

                        )
                    }

                </div>

            </div>

        </div>
    )

}
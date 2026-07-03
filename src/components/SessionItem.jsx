import {
    MoreHorizontal,
    Pencil,
    Trash2,
    ChevronRight,
    Pin
}
from "lucide-react"

import BottomSheet
from "./BottomSheet"
import { useState } from "react"

export default function SessionItem({

    session,
    selectedSession,
    loadMessages,
    editingSession,
    editedTitle,
    setEditedTitle,
    setEditingSession,
    // handleRename,
    openMenu,
    setOpenMenu,
    setConfirmModal,
    // handleDelete,
    onTogglePin,
    setSessionActionSheet,
    setRenameModal,

    setSessionContextMenu   

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
                ">

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
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2

                                    min-w-0
                                "
                            >

                                {
                                    session.is_pinned && (

                                        <Pin

                                            size={14}

                                            className="
                                                text-yellow-400

                                                shrink-0
                                            "

                                        />

                                    )
                                }

                                <span
                                    className="
                                        truncate
                                    ">

                                    {session.title}

                                </span>

                            </div>
                        </span>

                    )
                }

                <div                                     
                    className="
                        relative
                    ">

                    <MoreHorizontal

                        size={18}

                        onClick={(e) => {

                            e.stopPropagation()

                            if (
                                window.innerWidth < 1024
                            ) {

                                setSessionActionSheet({

                                    open: true,

                                    session

                                })

                                return

                            }

                            // setOpenMenu(

                            //     openMenu === session.session_id

                            //         ? null

                            //         : session.session_id

                            // )

                            const rect =
                                e.currentTarget.getBoundingClientRect()

                            setSessionContextMenu({

                                open: true,

                                session,

                                rect

                            })

                        }}

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

                                    onClick={(e) => {

                                        e.stopPropagation()

                                        setRenameModal({

                                            open: true,

                                            session

                                        })

                                        setOpenMenu(
                                            null
                                        )

                                    }}

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

                                    onClick={async (e) => {

                                        e.stopPropagation()

                                        await onTogglePin(
                                            session.session_id
                                        )

                                        setOpenMenu(
                                            null
                                        )

                                    }}

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

                                        <Pin size={16} />

                                        <span>

                                            {
                                                session.is_pinned

                                                    ? "Unpin Chat"

                                                    : "Pin Chat"

                                            }

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
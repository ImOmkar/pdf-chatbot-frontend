
import AboutContent
from "./AboutContent"
import Modal from "./Modal"

export default function AboutDialog({

    open,

    onClose

}) {

    return (

        <Modal

            open={open}

            onClose={onClose}

        >

            <div
                className="
                    max-w-xl
                    w-full
                "
            >

                <AboutContent />

            </div>

        </Modal>

    )

}
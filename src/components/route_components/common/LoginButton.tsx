import LoginForm from "@/components/ui/LoginForm";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react"

function LoginButton({ afterLogin }: { afterLogin: () => void }) {

    const [dialogClose, setDialogClose] = useState(false);

    function closeDialog() {
        setDialogClose(true)
    }

    return (
        <Dialog>
            <DialogTrigger className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px]">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Login
                </span>
            </DialogTrigger>
            {
                !dialogClose ? (
                    <DialogContent className=" bg-transparen">
                        <LoginForm afterLogin={afterLogin} closeDialog={closeDialog} />
                    </DialogContent>
                ) : (
                        <div/>
                )
            }

        </Dialog>

    )
}

export default LoginButton
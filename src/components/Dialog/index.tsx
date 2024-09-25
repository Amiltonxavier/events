import { X } from "lucide-react";
import { ReactNode } from "react";

interface DialogProps {
    onClose: () => void;
    children: ReactNode
}

export function Dialog({ onClose, children }: DialogProps) {
    return (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-screen px-4'>
                <div aria-hidden="true" className='fixed inset-0 bg-black opacity-50'>
                </div>
                <div className='relative bg-white animate-slide-down rounded-lg w-full max-w-xl p-6'>
                    <div className="space-y-2">
                        <button type="button" onClick={onClose} className="block ml-auto">
                            <X className="size-6 text-stone-700" />
                        </button>
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
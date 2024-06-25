import { ComponentProps } from "react"

type LayoutProps = ComponentProps<'main'> & {
    children: React.ReactNode
}

export function Layout({children}: LayoutProps) {
  return (
    <main className='w-full min-h-screen bg-gray-200 text-zinc-800'>
        <div className="w-full flex flex-col gap-4">
            {children}
        </div>
    </main>
  )
}

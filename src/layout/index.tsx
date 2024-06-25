
import { ComponentProps, ReactNode } from "react"

type LayoutProps = ComponentProps<'main'> & {
  children: ReactNode
  sectionButton: ReactNode;
}

export function Layout({ children, sectionButton }: LayoutProps) {

  return (
    <main className='w-full min-h-screen bg-gray-200 text-zinc-800'>
      <section className="w-full h-56 max-h-64 bg-orange-400 px-8">
        <div className="flex justify-between w-full items-center pt-5">
          <h1 className="text-4xl font-bold text-white block">Events</h1>
          <div className="w-full flex sm:flex-row justify-end">
            {sectionButton}
          </div>
        </div>
      </section>
      <div className="w-full flex flex-col gap-8">   
        {children}
      </div>
    </main>
  )
}

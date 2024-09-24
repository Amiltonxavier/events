
import type { ComponentProps, ReactNode } from "react"
import { Link } from "react-router-dom"

type Metrics = {
  title: string,
  total: number | string
}

type LayoutProps = ComponentProps<'main'> & {
  children: ReactNode
  sectionButton?: ReactNode;
  metrics: Metrics[]
}

export function Layout({ children, sectionButton, metrics }: LayoutProps) {

  return (
    <main className='w-full min-h-screen bg-gray-200 text-zinc-800'>
      <section className="w-full h-full sm:h-64 bg-[#41414C] px-8">
        <div className="pt-5 pb-4 border-b border-zinc-600">
          <div className="sm:flex space-y-3 justify-between items-center">
            <h1 className="text-4xl font-bold text-white block">
              <Link to={"/"}>
                Events.io
              </Link>
            </h1>
            <div className="flex items-center gap-2">
              <span className="flex flex-wrap flex-col">
                <h5 className="font-semibold sm:font-bold text-white text-lg sm:text-xl">John Due</h5>
                <span className="text-zinc-300">View profile</span>
              </span>
              <img className="ring-2 ring-blue-500 size-14 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
          </div>
        </div>
        <div className="sm:flex gap-4 items-center justify-between mt-5 w-full transition-all ease-in-out duration-150">
          <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-4">
            {
              metrics?.map((metric) => (
                <div key={metric.title} className="flex flex-col gap-1 max-h-14 max-w-full">
                  <h4 className="font-bold leading-relaxed sm:leading-6 text-[#FCFDFF] text-lg sm:text-2xl text-left">{metric.total}</h4>
                  <p className="text-base font-normal text-[#BFBFCC] text-left">{metric.title}</p>
                </div>
              ))
            }
          </div>
          <div className="sm:flex-1 sm:flex sm:flex-row justify-end">
            {sectionButton}
          </div>
        </div>

      </section>
      <div className="w-full flex flex-col gap-8 px-2 sm:px-16">
        {children}
      </div>
    </main>
  )
}

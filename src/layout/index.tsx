
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
    <main className='w-full min-h-screen bg-gray-200 text-zinc-800 animate-fadeIn'>
      <section className="w-full h-72 sm:h-64 max-h-96 bg-[#41414C] px-8">
        <div className="pt-5 pb-4 border-b border-zinc-600">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-white block">
              <Link to={"/"}>
                Events.io
              </Link>
            </h1>
            <div className="flex items-center gap-2">
              <span className="flex flex-col">
                <h5 className="font-bold text-white text-xl">John Due</h5>
                <span className="text-zinc-300">View profile</span>
              </span>
              <span className="">
                <img className="ring-2 ring-blue-500 size-14 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-5 w-full">
          <div className="grid grid-cols-3 gap-6 mt-4">
            {
              metrics?.map((metric, index) => (
                <div key={index} className="flex flex-col gap-1 max-h-14 max-w-full">
                  <h4 className="font-bold leading-6 text-[#FCFDFF] text-2xl text-left">{metric.total}</h4>
                  <p className="text-base font-normal text-[#BFBFCC] text-left">{metric.title}</p>
                </div>
              ))
            }
          </div>
          <div className="flex-1 flex sm:flex-row justify-end">
            {sectionButton}
          </div>
        </div>

      </section>
      <div className="w-full flex flex-col gap-8 px-8">
        {children}
      </div>
    </main>
  )
}

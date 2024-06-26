
import { ComponentProps, ReactNode } from "react"

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
      <section className="w-full h-56 max-h-64 bg-[#41414C] px-8">
        <div className="pt-5 pb-4 border-b border-zinc-600">
          <h1 className="text-4xl font-bold text-white block">Events.io</h1>
        </div>
        <div className="flex justify-between mt-5 w-full">
        <div className="grid grid-cols-3 max-w-xl gap-4 mt-4">
          {
            metrics?.map((metric, index) => (
              <div key={index} className="flex flex-col gap-1 max-h-14">
                <h4 className="font-bold leading-6 text-[#FCFDFF] text-2xl text-left">{metric.total}</h4>
                <p className="text-base font-normal text-[#BFBFCC] text-left">{metric.title}</p>
              </div>
            ))
          }
        </div>
        <div className="w-full flex sm:flex-row justify-end">
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


import { useState, type ComponentProps, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { DialogCreatUser } from "../components/Dialog/user/Create"
import { useUser } from "../context/user"
import { User } from "lucide-react"

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
  const { user } = useUser()
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  function openUserDialog() {
    setIsUserDialogOpen(true)
  }

  function closeUserDialog() {
    setIsUserDialogOpen(false)
  }
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
              <span className="flex flex-wrap flex-col items-end">
                <h5 className="font-semibold sm:font-bold text-white text-lg sm:text-xl">
                  {user?.fullname ?? 'John Due'}
                </h5>
                <button type="button" onClick={openUserDialog} className="text-zinc-300">View profile</button>
              </span>
              {
                user?.url ? <img className="ring-2 ring-blue-500 size-14 rounded-full"
                  src={user?.url} alt="" /> : <User className="size-20 rounded-full p-4 text-stone-50 bg-zinc-300" />
              }

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
      {isUserDialogOpen && <DialogCreatUser onClose={closeUserDialog} />}
    </main>
  )
}

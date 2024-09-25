import * as Input from "../components/form/Input";
import { Root } from "../components/form/Root";
import { Label } from "../components/form/Label";
import { Button } from "../components/form/Button";
import loginImg from "../assets/login.svg"
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <main className="min-h-screen bg-white max-w-[1600px] mx-auto">
            <div className="grid md:grid-cols-3">
                <section className="w-full min-h-screen shadow-md">
                    <div className="flex flex-col shadow-xl justify-between p-16 md:p-8 h-full">
                        <p className="flex gap-2 text-xl text-zinc-700 font-medium leading-snug font-mono items-center ">
                            <img src="/public/favicon.png" alt="" />
                            <span>Eventos</span>
                        </p>
                        <div className="flex flex-1 flex-col items-center gap-8 justify-center h-full">
                            <header className="w-full">
                                <h2 className="text-left text-2xl text-stone-900 tracking-tight font-bold leading-8 ">
                                    Sign with only
                                </h2>
                                <p className="text-sm text-zinc-400">Please enter your name to continue explore app</p>
                            </header>

                            <form className="space-y-6 w-full">
                                <Root className="">
                                    <Label>Full name</Label>
                                    <Input.Wrapper>
                                        <Input.Control
                                            type="text"
                                            /* {...register('title')} */
                                            placeholder="What's your full name"
                                            className="focus-within:ring-2 ring-blue-500 placeholder:italic"
                                        />
                                    </Input.Wrapper>
                                    {/*  {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>} */}
                                </Root>
                                <div className="mt-4">
                                    <Button>
                                        Sign in
                                    </Button>
                                </div>

                            </form>
                        </div>

                        <footer className="border-t border-zinc-100 w-full">

                            <p className="pt-3 text-center text-zinc-400">
                                © 2024 <Link to="/login" className="underline hover:text-blue-300">Events</Link>
                                All Rights Reserved.
                            </p>

                        </footer>
                    </div>

                </section>
                <aside className="hidden p-2 md:block sm:col-span-2 overflow-hidden max-h-full bg-gray-dark/5">
                    <div className="flex justify-center items-center h-full">
                        <img src={loginImg} alt="" />
                    </div>

                </aside>
            </div>
        </main>
    )
}

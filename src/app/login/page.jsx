import { auth, signIn, signOut } from "../../auth"
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default async function SignIn() {

  const session = await auth()
  console.log(session)
  const user = session?.user
  
  if (user) {
    redirect("/tracker");
  }
  

  return (
    <div className="text-center flex justify-center items-center h-screen">
      <div>
        <div className="mb-8">
          <h1 className="font-bold font-sans text-lg">◗◗◗</h1>
        </div>
        <div className="mb-20">
          <h1 className="text-4xl font-bold">Join the Wave</h1>
        </div>
        <div>
          <form action={async () => {'use server'; await signIn("google", { redirectTo: "/tracker" })}}>
            <button className="flex items-center bg-white py-4 px-8 rounded-4xl hover:bg-gray-200"><FcGoogle className="text-2xl mr-8"/> <span className="text-black text-xl font-medium cursor-pointer">Sign in with google</span></button>
          </form>
        </div>
      </div>
      
    </div>
  )
}

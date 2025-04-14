import { useAuth0 } from "@auth0/auth0-react"

function LogOut() {
    const { logout } = useAuth0();
  return (
    <header className="bg-[#3366CC] text-white p-6 shadow-md w-full h-[80px]">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Big Task</h1>
          <h2 className='tex-2xl text-red-600' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log out</h2>
        </div>
      </header>
  )
}

export default LogOut

import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {

    const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center items-center">
      <header className="bg-[#3366CC] text-white p-6 shadow-md w-full">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Big Task</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 py-20 flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold text-[#333333] mb-8">Welcome to Big Task</h2>
        <div className="flex space-x-6">
          <button className="bg-[#33A1DE] hover:bg-[#29B6F6] text-white text-lg px-8 py-4 rounded-2xl shadow-md" onClick={() => loginWithRedirect()}>
            Log In
          </button>
          <button className="bg-[#3366CC] hover:bg-[#254A99] text-white text-lg px-8 py-4 rounded-2xl shadow-md" onClick={() => loginWithRedirect({authorizationParams:{screen_hint: 'signup'}})}>
            Sign Up
          </button>
        </div>
      </main>

      <footer id="contact" className="bg-[#3366CC] text-white py-6 w-full"></footer>
    </div>
  );
};

export default LandingPage;

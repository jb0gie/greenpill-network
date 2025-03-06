import Scene from "./components/Scene";
import Scene2 from "./components/Scene2";
import Scene3 from "./components/Scene3";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#001810] to-[#003020]">
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center z-10 px-4 lg:px-8">
          <div className="w-full lg:w-1/2">
            <Scene />
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8 mt-8 lg:mt-0">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#40ff90] to-[#00ff80] tracking-tight">
              Green pill Network
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 bg-[#00ff80] hover:bg-[#00ff80]/90 text-[#001810] font-medium rounded-full">
                Join the Network
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 text-[#00ff80] border-[#00ff80]/30 hover:bg-[#00ff80]/10 rounded-full">
                Learn More
              </Button>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#80ffa0]/90 max-w-xl mx-auto lg:mx-0 font-light">
              Building a sustainable future through global collaboration and innovation
            </p>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-8 bg-gradient-to-b from-[#002015]/80 to-[#001810]/80 backdrop-blur-md rounded-2xl shadow-lg border border-[#00ff80]/10 hover:border-[#00ff80]/20 transition-all duration-300">
            <div className="bg-[#00ff80]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#00ff80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-[#40ff90] group-hover:text-[#00ff80] transition-colors">Global Impact</h3>
            <p className="text-[#80ffa0]/80 leading-relaxed">
              Connect with changemakers worldwide and amplify your environmental initiatives.
            </p>
          </div>
          <div className="group p-8 bg-gradient-to-b from-[#002015]/80 to-[#001810]/80 backdrop-blur-md rounded-2xl shadow-lg border border-[#00ff80]/10 hover:border-[#00ff80]/20 transition-all duration-300">
            <div className="bg-[#00ff80]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#00ff80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-[#40ff90] group-hover:text-[#00ff80] transition-colors">Innovation Hub</h3>
            <p className="text-[#80ffa0]/80 leading-relaxed">
              Access cutting-edge sustainable technologies and solutions.
            </p>
          </div>
          <div className="group p-8 bg-gradient-to-b from-[#002015]/80 to-[#001810]/80 backdrop-blur-md rounded-2xl shadow-lg border border-[#00ff80]/10 hover:border-[#00ff80]/20 transition-all duration-300">
            <div className="bg-[#00ff80]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#00ff80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-[#40ff90] group-hover:text-[#00ff80] transition-colors">Community Driven</h3>
            <p className="text-[#80ffa0]/80 leading-relaxed">
              Join a passionate community dedicated to environmental preservation.
            </p>
          </div>
        </div>
      </section>

      <div className="relative flex flex-col items-center justify-center">
        <div className="inset-0 flex items-center justify-center z-10">
          <div className="text-center space-y-8 px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#40ff90] to-[#00ff80] tracking-tight">
              We're building a CoordiNation across Nations & Cultures.
            </h1>
            <Scene2 />
            <p className="text-xl md:text-2xl text-[#80ffa0]/90 max-w-l mx-auto font-light">
              CoordiNation <code>(noun):</code> a network-society that exports regenerative digital infrastructure to the world.
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center py-24">
        <div className="inset-0 flex items-center justify-center z-10">
          <div className="text-center space-y-8 px-4 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#40ff90] to-[#00ff80] tracking-tight">
              Join the Movement
            </h2>
            <Scene3 />
            <p className="text-xl md:text-2xl text-[#80ffa0]/90 max-w-l mx-auto font-light">
              Be part of the global network driving sustainable innovation and change.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
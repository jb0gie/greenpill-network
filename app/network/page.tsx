export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-[#001810] text-[#80ffa0] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#00ff80] mb-6">Our Network</h1>
          <p className="text-lg mb-12 max-w-3xl mx-auto">
            Join a growing community of environmental innovators, activists, and change-makers
            working together to create positive impact.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Network Members */}
            <div className="bg-[#00ff80]/5 p-6 rounded-xl border border-[#00ff80]/10">
              <div className="text-3xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-[#00ff80] mb-2">Innovators</h3>
              <p>Connect with tech pioneers building sustainable solutions</p>
            </div>

            <div className="bg-[#00ff80]/5 p-6 rounded-xl border border-[#00ff80]/10">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-[#00ff80] mb-2">Organizations</h3>
              <p>Partner with leading environmental organizations</p>
            </div>

            <div className="bg-[#00ff80]/5 p-6 rounded-xl border border-[#00ff80]/10">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-[#00ff80] mb-2">Community</h3>
              <p>Join local and global environmental initiatives</p>
            </div>

            <div className="bg-[#00ff80]/5 p-6 rounded-xl border border-[#00ff80]/10">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-[#00ff80] mb-2">Resources</h3>
              <p>Access tools and knowledge to amplify your impact</p>
            </div>

            <div className="bg-[#00ff80]/5 p-6 rounded-xl border border-[#00ff80]/10">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-[#00ff80] mb-2">Global Impact</h3>
              <p>Be part of worldwide environmental solutions</p>
            </div>

            <div className="bg-[#00ff80]/5 p-6 rounded-xl border border-[#00ff80]/10">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-[#00ff80] mb-2">Projects</h3>
              <p>Discover and contribute to ongoing initiatives</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
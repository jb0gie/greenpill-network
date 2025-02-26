export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#001810] text-[#80ffa0] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#00ff80] mb-6">About Green Pill Network</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-8">
              We are building a sustainable future through technology and community action.
              Our network connects environmentally conscious individuals and organizations
              to create meaningful impact.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-[#00ff80]/5 p-6 rounded-xl border border-[#00ff80]/10">
                <h3 className="text-xl font-semibold text-[#00ff80] mb-4">Our Mission</h3>
                <p>To accelerate the transition to a sustainable and regenerative future through collective action.</p>
              </div>
              
              <div className="bg-[#00ff80]/5 p-6 rounded-xl border border-[#00ff80]/10">
                <h3 className="text-xl font-semibold text-[#00ff80] mb-4">Our Vision</h3>
                <p>A world where technology and nature work in harmony to create prosperity for all.</p>
              </div>
              
              <div className="bg-[#00ff80]/5 p-6 rounded-xl border border-[#00ff80]/10">
                <h3 className="text-xl font-semibold text-[#00ff80] mb-4">Our Values</h3>
                <p>Sustainability, innovation, collaboration, and transparency guide everything we do.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
export function ReplitStatus() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-sm text-white">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">ElizaOS Agent on Replit</h3>
            <p className="text-purple-100 mb-4">Your Vale Finance agents are running on Replit with full Sei testnet integration</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-purple-200">Runtime Status</p>
                <p className="font-semibold">Active & Monitoring</p>
              </div>
              <div>
                <p className="text-purple-200">Sei Network</p>
                <p className="font-semibold">Testnet (atlantic-2)</p>
              </div>
              <div>
                <p className="text-purple-200">Agent Framework</p>
                <p className="font-semibold">ElizaOS v2.1.0</p>
              </div>
              <div>
                <p className="text-purple-200">Deployment</p>
                <p className="font-semibold">Replit Cloud</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <i className="fas fa-cloud text-2xl"></i>
            </div>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <i className="fas fa-external-link-alt mr-2"></i>View on Replit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

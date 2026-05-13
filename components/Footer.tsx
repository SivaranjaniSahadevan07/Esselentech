const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div>
            <h2 className="text-2xl font-black tracking-tighter text-red-600">PORTFOLIO</h2>
            <p className="text-gray-500 mt-2 max-w-xs">Building beautiful digital experiences through modern technology and creative design.</p>
          </div>
          
          <div className="flex space-x-12">
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Explore</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-red-600 transition-colors">Design</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Photography</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">UI/UX</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="/admin" className="hover:text-red-600 transition-colors">Admin</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-50 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} Portfolio Showcase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

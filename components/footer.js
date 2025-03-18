const Footer = () => {
  return (
    <footer className="bg-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-gray-800 mb-3">About Welth</h3>
            <p className="text-gray-600">
              Your one-stop platform for managing personal finances and investments.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-gray-800 mb-3">Quick Links</h3>
            <ul className="flex justify-center space-x-4">
              <li><a href="/" className="text-gray-600 hover:text-blue-600">Home</a></li>
              <li><a href="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a></li>
            </ul>
          </div>
          
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          © {new Date().getFullYear()} Welth. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

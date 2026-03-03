import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="text-center md:text-left md:col-span-2">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                welth
              </span>
            </div>
            <p className="text-gray-500 max-w-sm mx-auto md:mx-0 leading-relaxed text-sm">
              Your elite platform for managing personal finances, tracking
              investments, and optimizing your money with artificial
              intelligence.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-bold text-gray-900 mb-4 text-sm tracking-wider uppercase">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                >
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="font-bold text-gray-900 mb-4 text-sm tracking-wider uppercase">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div>© {new Date().getFullYear()} Welth AI. All rights reserved.</div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

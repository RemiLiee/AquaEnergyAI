import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AE</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AquaEnergy AI</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Hjem
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/savings" className="text-gray-700 hover:text-primary-600 transition-colors">
              Besparelser
            </Link>
            <Link href="/#products" className="text-gray-700 hover:text-primary-600 transition-colors">
              Produkter
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              Kontakt
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}


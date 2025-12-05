'use client';

interface ProductPackageCardProps {
  name: string;
  sensors: string[];
  price: string;
  subscription: string;
  installTime: string;
  highlighted?: boolean;
}

export default function ProductPackageCard({ 
  name, 
  sensors, 
  price, 
  subscription, 
  installTime,
  highlighted 
}: ProductPackageCardProps) {
  const handleOrder = () => {
    // Scroll to contact section smoothly
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
      highlighted ? 'border-primary-500' : 'border-gray-200'
    }`}>
      {highlighted && (
        <div className="bg-primary-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
          Anbefalt
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{name}</h3>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Inkluderer:</h4>
        <ul className="space-y-2">
          {sensors.map((sensor, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">{sensor}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-6 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-gray-600">Engangspris:</span>
            <span className="text-2xl font-bold text-primary-600">{price}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-gray-600">Abonnement:</span>
            <span className="text-lg font-semibold text-gray-900">{subscription}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-gray-600">Installasjonstid:</span>
            <span className="text-sm font-medium text-gray-700">{installTime}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleOrder}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
          highlighted 
            ? 'bg-primary-600 text-white hover:bg-primary-700' 
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Bestill
      </button>
    </div>
  );
}

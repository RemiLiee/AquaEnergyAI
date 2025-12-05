interface ProductCardProps {
  name: string;
  description: string;
  features: string[];
  price?: string;
  highlighted?: boolean;
}

export default function ProductCard({ name, description, features, price, highlighted }: ProductCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 border-2 ${highlighted ? 'border-primary-500' : 'border-gray-200'} transition-all hover:shadow-xl`}>
      {highlighted && (
        <div className="bg-primary-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
          Populær
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{name}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      {price && (
        <div className="text-3xl font-bold text-primary-600 mb-6">{price}</div>
      )}
      <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
        highlighted 
          ? 'bg-primary-600 text-white hover:bg-primary-700' 
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}>
        Les mer
      </button>
    </div>
  );
}


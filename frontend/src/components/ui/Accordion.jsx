import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-4 px-6 hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-left font-semibold text-gray-900">{title}</h3>
        <ChevronDown
          size={20}
          className={`text-green-500 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 pt-0 text-gray-600 leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
}

export function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <div className="bg-gray-100 rounded-xl shadow-sm border border-gray-100">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
}

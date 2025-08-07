import React from 'react';

function SuggestionBox({ suggestion }) {
  if (!suggestion) return null;

  return (
    <div className="bg-green-100 text-green-900 rounded-lg p-4 text-center shadow-inner">
      💡 <span className="font-medium">Suggestion:</span> {suggestion}
    </div>
  );
}

export default SuggestionBox;

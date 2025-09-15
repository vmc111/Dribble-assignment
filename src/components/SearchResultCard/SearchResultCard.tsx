import React from 'react';

interface SearchResultCardProps {
  title: string;
  description: string;
  category: string;
  image?: string;
  tags?: string[];
  author?: string;
  date?: string;
  likes?: number;
  views?: number;
  className?: string;
  onClick?: () => void;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  title,
  description,
  category,
  image,
  tags = [],
  author,
  date,
  likes,
  views,
  className = "",
  onClick
}) => {
  return (
    <div
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${className}`}
      onClick={onClick}
    >
      {/* Image Section */}
      {image && (
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
              {category}
            </span>
          </div>
          {likes && (
            <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium text-gray-700">{likes}</span>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            {author && (
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span>{author}</span>
              </div>
            )}
            {date && <span>{date}</span>}
          </div>
          {views && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{views}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;

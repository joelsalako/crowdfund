export const Button = ({ children, onClick, className, ...rest }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

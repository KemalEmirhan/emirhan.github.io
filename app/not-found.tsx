import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-gray-900 mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-700 mb-6'>
          Page Not Found
        </h2>
        <p className='text-lg text-gray-600 mb-8'>
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          href='/'
          className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200'
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

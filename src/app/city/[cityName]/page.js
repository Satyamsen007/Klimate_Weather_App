'use client';

import dynamic from 'next/dynamic';

const CityPage = dynamic(
  () => import('@/pages/CityPage'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
);

const Page = ({ params }) => {
  const decodedCityName = decodeURIComponent(params.cityName);

  return (
    <div className='min-h-screen container mx-auto px-4 py-8'>
      <CityPage cityName={decodedCityName} />
    </div>
  );
}

export default Page;
'use client';

import CityPage from '@/pages/CityPage';

const Page = ({ params }) => {
  // Decode the city name from the URL
  const decodedCityName = decodeURIComponent(params.cityName);

  return (
    <div className='min-h-screen container mx-auto px-4 py-8'>
      <CityPage cityName={decodedCityName} />
    </div>
  );
}

export default Page;
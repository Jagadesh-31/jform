import { Link} from 'react-router-dom';
import { useRef,useContext } from 'react';

import { authContext } from '../contexts/authContext.jsx';


export function FormsContainer({ data }) {
  let scrollRef = useRef(null);

  const scroll = x => {
    let scrollX = scrollRef.current.scrollLeft;
    scrollRef.current.scrollTo({ left: scrollX + x, behavior: 'smooth' });
  };


  const formTypes = [...new Set(data.map(f => f.type || 'Trending'))];

  return (
    <div className='bg-[#0D0F12] w-full p-4 flex flex-col gap-6'>
      {formTypes.map(type => (
        <div key={type}>
          <div className='title text-white text-md md:text-xl font-bold pb-2'>{type}</div>

          <div className='flex items-center'>
            <span
              className='leftArrow hidden md:block text-3xl text-white font-bold pr-2 cursor-pointer active:text-[#4242FA]'
              onClick={() => scroll(-200)}
            >
              {'<'}
            </span>

            <div
              ref={scrollRef}
              style={{ scrollbarWidth: 'none', overflowX: 'auto' }}
              className='flex gap-4 overflow-y-hidden scroll-smooth'
            >
              {data
                .filter(form => (form.type || 'Trending') === type)
                .map((form, idx) => (
                  <FormCard key={idx} form={form} />
                ))}
            </div>

            <span
              className='rightArrow hidden md:block text-3xl text-white font-bold pl-2 cursor-pointer active:text-[#4242FA]'
              onClick={() => scroll(200)}
            >
              {'>'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}


export function FormCard({ form }) {
  
  const { user } = useContext(authContext);
  console.log(user.role)
  return (
    <div className='cardContainer cursor-pointer flex flex-col items-center'>
      <div className='imageContainer overflow-hidden rounded-xl h-[180px] w-[150px] md:h-[250px] md:w-[230px] border-[#636363] border-2 hover:border-white'>
        <Link to={user.role=='client'?`/form/${form._id}`:`/admin/form/${form._id}`}>
          <img
            src={form.image}
            alt={form.title}
            draggable='false'
            className='transition duration-500 ease-in-out hover:scale-105 w-full h-full object-cover'
          />
        </Link>
      </div>
      <div className='text-white text-left mt-2 font-medium text-sm md:text-base'>
        {form.title}
      </div>
    </div>
  );
}

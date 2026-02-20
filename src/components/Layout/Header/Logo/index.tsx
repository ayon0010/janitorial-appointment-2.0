import Link from 'next/link';
import Image from 'next/image';
import janitorialLogo from '../../../../../public/images/logo/Janitorial-appointment-logo.avif'

const Logo: React.FC = () => {
  return (
    <Link href="/" className='flex items-center gap-3'>
      <div className='shrink-0 relative'>
        <Image
          src={janitorialLogo}
          alt="Janitorial Appointments Icon"
          width={48}
          height={48}
          className="object-contain"
          unoptimized
        />
      </div>
      <span className='text-2xl sm:text-3xl font-bold text-white dark:text-white'>
        Janitorial Appointments
      </span>
    </Link>
  );
};

export default Logo;

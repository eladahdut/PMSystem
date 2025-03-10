import PatientForm from '@/components/forms/PatientForm';
import PasskeyModal from '@/components/PasskeyModal';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home(props: SearchParamProps) {
  const searchParams = await props.searchParams;
  const isAdmin = (await searchParams.admin) === 'true';

  return (
    <div className='flex h-screen max-h-screen'>
      {isAdmin && <PasskeyModal />}
      <section className='remove-scrollbar container'>
        <div className='sub-container max-w-[860] flex-1 flex-col py-10'>
          <Image
            src='/assets/icons/logo-full.svg'
            alt='patient'
            className='mb-12 h-10 w-fit'
            width={1000}
            height={1000}
          />
          <PatientForm />
          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='justify-items-end text-dark-600 xl:text-left'>
              © 2024 CarePulse
            </p>
            <Link href='/?admin=true' className='text-green-500'>
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src='/assets/images/onboarding-img.png'
        alt='patient'
        height={1000}
        width={1000}
        className='side-img max-w-[50%]'
      />
    </div>
  );
}

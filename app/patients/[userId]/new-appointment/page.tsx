import AppointmentForm from '@/components/forms/AppointmentForm';
import PatientForm from '@/components/forms/PatientForm';
import { getPatient } from '@/lib/actions/patient.actions';
import Image from 'next/image';

const NewAppointment = async (props: SearchParamProps) => {
  const params = await props.params;

  const {
    userId
  } = params;

  const patient = await getPatient(userId);
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[860px] flex-1 justify-between'>
          <Image
            src='/assets/icons/logo-full.svg'
            alt='patient'
            className='mb-12 h-10 w-fit'
            width={1000}
            height={1000}
          />
          <AppointmentForm
            type='create'
            userId={userId}
            patientId={patient.$id}
          />
          <p className='copyright mt-10 py-12'>© 2024 CarePulse</p>
        </div>
      </section>

      <Image
        src='/assets/images/appointment-img.png'
        alt='appointment'
        height={1000}
        width={1000}
        className='side-img max-w-[390px] bg-bottom'
      />
    </div>
  );
};

export default NewAppointment;

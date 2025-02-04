'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SubmitButton from '@/components/ui/SubmitButton';
import { Form } from '@/components/ui/form';
import CustomFormField from '../ui/CustomFormField';
import { useState } from 'react';
import { PatientFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/patient.actions';
import { FormFieldType } from './PatientForm';
import { Doctors } from '@/constants';
import { SelectItem } from '../ui/select';
import Image from 'next/image';

const AppointmentForm = ({
  userId,
  patientId,
  type,
}: {
  userId: string;
  patientId: string;
  type: 'create' | 'cancel' | 'schedule';
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      primaryPhysician: '',
      schedule: new Date(),
      reason: '',
      notes: '',
      cancellationReason: '',
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
  }

  let buttonLabel;

  switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel appointment';
      break;
    case 'create':
      buttonLabel = 'Create appointment';
      break;
    case 'schedule':
      buttonLabel = 'Schedule appointment';
      break;

    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>New Appointment</h1>
          <p className='text-dark-700'>
            Request a new appointment in 10 seconds
          </p>
        </section>

        {type !== 'cancel' && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name='primaryPhysician'
              label='Doctor'
              placeholder='Select a doctor'
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className='flex cursor-pointer items-center gap-2'>
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={32}
                      height={32}
                      className='rounded-full'
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name='schedule'
              label='Expected appointment date'
              showTimeSelect
              dateFormat='MM/dd/yyyy - h:mm aa'
            />
            <div className='flex flex-col gap-6 xl:flex-row'>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='reason'
                label='Reason for appointment'
                placeholder='Enter reason for appointment'
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='notes'
                label='Notes'
                placeholder='Enter notes'
              />
            </div>
          </>
        )}
        {type === 'cancel' && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='cancellationReason'
            label='Reason for cancellation'
            placeholder='Enter reason for cancellation'
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;

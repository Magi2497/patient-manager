import { useForm } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'

export default function PatientForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const registerPatients = () => {
    console.log('nuevo paciente')
  }
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Patient Tracking</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Add patients and {''}
        <span className="text-indigo-600 font-bold">Manage them</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatients)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Patient
          </label>
          <input
            id="name"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Patient's Name"
            {...register('name', {
              required: 'The name of the patient is required',
              maxLength: {
                value: 15,
                message: '15 characters maximum',
              },
            })}
          />

          {['name', 'maxLength'].map(field =>
            errors[field] ? (
              <ErrorMessage key={field}>
                {errors[field]?.message?.toString()}
              </ErrorMessage>
            ) : null,
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="owner" className="text-sm uppercase font-bold">
            Owner
          </label>
          <input
            id="owner"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Owner's Name"
            {...register('owner', {
              required: 'The name of the owner is required',
            })}
          />

          {errors.owner && (
            <ErrorMessage>{errors.owner?.message?.toString()}</ErrorMessage>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3 border border-gray-100"
            type="email"
            placeholder="Registration Email"
            {...register('email', {
              required: 'The email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email no valid',
              },
            })}
          />

          {errors.email && (
            <ErrorMessage>{errors.email?.message?.toString()}</ErrorMessage>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Admission Date
          </label>
          <input
            id="date"
            className="w-full p-3 border border-gray-100"
            type="date"
            {...register('date', {
              required: 'Admission date is required',
            })}
          />

          {errors.date && (
            <ErrorMessage>{errors.date?.message?.toString()}</ErrorMessage>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Symptoms
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3 border border-gray-100"
            placeholder="Patient's Symptoms"
            {...register('symptoms', {
              required: 'Symptoms are required',
            })}
          />

          {errors.symptoms && (
            <ErrorMessage>{errors.symptoms?.message?.toString()}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Save Patient"
        />
      </form>
    </div>
  )
}

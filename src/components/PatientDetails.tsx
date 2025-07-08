import { usePatientStore } from '../store'
import type { Patient } from '../types'
import PatientDetailItem from './PatientDetailItem'
import { toast } from 'react-toastify'

type PatientDetailsProps = {
  patient: Patient
}

export default function PatientDetails({ patient }: PatientDetailsProps) {
  const { getPatientById, deletePatient } = usePatientStore()

  const handleClick = () => {
    deletePatient(patient.id)
    toast.error('Patient deleted successfully')
  }
  return (
    <>
      <div className=" mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
        <PatientDetailItem label="ID" data={patient.id} />
        <PatientDetailItem label="Name" data={patient.name} />
        <PatientDetailItem label="Owner" data={patient.owner} />
        <PatientDetailItem label="Email" data={patient.email} />
        <PatientDetailItem
          label="Admission Date"
          data={patient.date.toString()}
        />
        <PatientDetailItem label="Symptoms" data={patient.symptoms} />

        <div className="flex justify-between lg:flex-row gap-3 mt-10">
          <button
            type="button"
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
            onClick={() => getPatientById(patient.id)}
          >
            Edit
          </button>
          <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
            onClick={handleClick}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

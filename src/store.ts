import { create } from 'zustand'
import { v4 as idGenerator } from 'uuid'
import type { DraftPatient, Patient } from './types'

type PatientState = {
  patients: Patient[]
  addPatient: (data: DraftPatient) => void
  deletePatient: (id: Patient['id']) => void
}

// function to mutate the type draftPatient to Patient generating a random id
const createPatient = (patient: DraftPatient): Patient => {
  return { ...patient, id: idGenerator() }
}

export const usePatientStore = create<PatientState>(set => ({
  //  list of patients
  patients: [
    {
      id: '234432',
      name: 'pedro',
      owner: 'juan',
      email: 'magi@gmail.com',
      date: new Date('2025-07-01'),
      symptoms: 'esta aburrido',
    },
  ],

  //  function to add patients in the array
  addPatient: data => {
    const newPatient = createPatient(data)
    set(state => ({
      patients: [...state.patients, newPatient],
    }))
  },

  deletePatient: id => {
    set(state => ({
      patients: state.patients.filter(patient => patient.id !== id),
    }))
  },
}))

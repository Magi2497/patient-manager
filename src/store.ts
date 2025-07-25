import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { v4 as idGenerator } from 'uuid'
import type { DraftPatient, Patient } from './types'

type PatientState = {
  patients: Patient[]
  activeId: Patient['id']
  addPatient: (data: DraftPatient) => void
  deletePatient: (id: Patient['id']) => void
  getPatientById: (id: Patient['id']) => void
  updatePatient: (data: DraftPatient) => void
}

// function to mutate the type draftPatient to Patient generating a random id
const createPatient = (patient: DraftPatient): Patient => {
  return { ...patient, id: idGenerator() }
}

export const usePatientStore = create<PatientState>()(
  devtools(
    persist(
      set => ({
        //  List of states
        patients: [],
        activeId: '',

        //  function to add patients in the array
        addPatient: data => {
          const newPatient = createPatient(data)
          set(state => ({
            patients: [...state.patients, newPatient],
          }))
        },

        // function to delet pacients
        deletePatient: id => {
          set(state => ({
            patients: state.patients.filter(patient => patient.id !== id),
          }))
        },

        // function to get the id of a patient
        getPatientById: id => {
          set(() => ({
            activeId: id,
          }))
        },

        updatePatient: data => {
          set(state => ({
            patients: state.patients.map(patient =>
              patient.id === state.activeId
                ? { id: patient.id, ...data }
                : patient,
            ),
            activeId: '',
          }))
        },
      }),
      {
        name: 'patient-storage',
      },
    ),
  ),
)

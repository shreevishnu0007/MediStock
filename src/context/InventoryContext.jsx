
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  medicines as initialMedicines,
  batches as initialBatches,
  transactions as initialTransactions,
} from '../data/dummyData'

const InventoryContext = createContext(null)

// Load data from localStorage
const loadData = (key, initialData) => {
  try {
    const savedData = localStorage.getItem(key)

    if (savedData) {
      const parsedData = JSON.parse(savedData)

      if (Array.isArray(parsedData)) {
        return parsedData
      }
    }
  } catch (error) {
    console.error('Error loading data:', error)
  }

  return initialData
}

export const InventoryProvider = ({ children }) => {

  const [medicines, setMedicines] = useState(() =>
    loadData('medistock_medicines', initialMedicines)
  )
 
  const [batches, setBatches] = useState(() =>
    loadData('medistock_batches', initialBatches)
  )

  const [transactions, setTransactions] = useState(() =>
  loadData('medistock_transactions', initialTransactions)
)



  // Save medicines whenever they change
  useEffect(() => {
    localStorage.setItem(
      'medistock_medicines',
      JSON.stringify(medicines)
    )
  }, [medicines])

  // Save batches whenever they change
  useEffect(() => {
    localStorage.setItem(
      'medistock_batches',
      JSON.stringify(batches)
    )
  }, [batches])

  // Save transactions whenever they change
  useEffect(() => {
    localStorage.setItem(
      'medistock_transactions',
      JSON.stringify(transactions)
    )
  }, [transactions])

  const addMedicine = (medicine) => {
    setMedicines((previous) => [
      ...previous,
      { ...medicine, id: Date.now() },
    ])
  }

  const updateMedicine = (id, updatedMedicine) => {
    setMedicines((previous) =>
      previous.map((medicine) =>
        medicine.id === id
          ? { ...medicine, ...updatedMedicine }
          : medicine
      )
    )
  }

  const deleteMedicine = (id) => {
    setMedicines((previous) =>
      previous.filter((medicine) => medicine.id !== id)
    )

    setBatches((previous) =>
      previous.filter((batch) => batch.medicineId !== id)
    )
  }

  const addBatch = (batch) => {
    setBatches((previous) => [
      ...previous,
      { ...batch, id: Date.now() },
    ])
  }

  const value = {
  medicines,
  batches,
  transactions,
  setTransactions,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  addBatch,
  setBatches,
}

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  )
}

export const useInventory = () => {
  const context = useContext(InventoryContext)

  if (!context) {
    throw new Error(
      'useInventory must be used inside InventoryProvider'
    )
  }

  return context
}

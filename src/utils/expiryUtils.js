
import { differenceInCalendarDays, startOfDay } from 'date-fns'

// Calculate how many days remain until a batch expires
export const getDaysUntilExpiry = (expiryDate) => {
  const today = startOfDay(new Date())
  const expiry = startOfDay(new Date(`${expiryDate}T00:00:00`))

  return differenceInCalendarDays(expiry, today)
}

// Identify the expiry status of a batch
export const getExpiryStatus = (expiryDate) => {
  const daysLeft = getDaysUntilExpiry(expiryDate)

  if (daysLeft < 0) {
    return 'Expired'
  }

  if (daysLeft <= 30) {
    return 'Expiring Soon'
  }

  return 'Valid'
}

// Get a display-friendly expiry message
export const getExpiryMessage = (expiryDate) => {
  const daysLeft = getDaysUntilExpiry(expiryDate)

  if (daysLeft < 0) {
    return `Expired ${Math.abs(daysLeft)} days ago`
  }

  if (daysLeft === 0) {
    return 'Expires today'
  }

  return `${daysLeft} days remaining`
}

export const getInventorySummary = (medicines, batches) => {
  const totalMedicines = medicines.length

  const usableBatches = batches.filter(
    (batch) => getExpiryStatus(batch.expiryDate) !== 'Expired'
  )

  const totalUsableStock = usableBatches.reduce(
    (total, batch) => total + batch.quantity,
    0
  )

  const expiredBatches = batches.filter(
    (batch) => getExpiryStatus(batch.expiryDate) === 'Expired'
  )

  const expiringSoonBatches = batches.filter(
    (batch) => getExpiryStatus(batch.expiryDate) === 'Expiring Soon'
  )

  const lowStockMedicines = medicines.filter((medicine) => {
    const medicineStock = usableBatches
      .filter((batch) => batch.medicineId === medicine.id)
      .reduce((total, batch) => total + batch.quantity, 0)

    return medicineStock < medicine.minStock
  })

  return {
    totalMedicines,
    totalUsableStock,
    lowStockCount: lowStockMedicines.length,
    expiringSoonCount: expiringSoonBatches.length,
    expiredCount: expiredBatches.length,
  }
}
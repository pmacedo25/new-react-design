import { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { getDayOff } from 'services/productApi'
import type { AppDispatch } from 'stores'
import { DayOff } from 'models/types'
import { RootState } from 'stores'
import { getDateFormatted } from 'utils/utils'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export const useCheckNextBusinessDay = (): DayOff => {
  const [, setDayOff] = useState<DayOff>({
    weekday: null,
    date: '',
    nextBusinessDayIsDayOff: '',
    specialDayOffOnTuesday: false,
    nextDeliveryDay: '',
    nextDeliveryDayWeekday: -1,
  })

  useEffect(() => {
    const fetchDayOff = async () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)

      while (tomorrow.getDay() == 0 || tomorrow.getDay() == 6) {
        tomorrow.setDate(tomorrow.getDate() + 1)
      }

      const isDayOff = await getDayOff(getDateFormatted(tomorrow))

      if (isDayOff.length > 0) {
        const deliveryDay = new Date(tomorrow)
        deliveryDay.setDate(deliveryDay.getDate() + 1)
        while (deliveryDay.getDay() == 0 || deliveryDay.getDay() == 6) {
          deliveryDay.setDate(deliveryDay.getDate() + 1)
        }

        return {
          weekday: tomorrow.getDay(),
          date: getDateFormatted(tomorrow),
          nextBusinessDayIsDayOff: getDateFormatted(tomorrow),
          specialDayOffOnTuesday: false,
          nextDeliveryDay: getDateFormatted(deliveryDay),
          nextDeliveryDayWeekday: deliveryDay.getDay(),
        }
      } else {
        if (tomorrow.getDay() == 1) {
          const deliveryDay = new Date(tomorrow)
          tomorrow.setDate(tomorrow.getDate() + 1)
          const tuesdayIsDayOff = await getDayOff(getDateFormatted(tomorrow))

          if (tuesdayIsDayOff.length > 0) {
            deliveryDay.setDate(deliveryDay.getDate() + 1)
            while (deliveryDay.getDay() == 0 || deliveryDay.getDay() == 6) {
              deliveryDay.setDate(deliveryDay.getDate() + 1)
            }

            return {
              weekday: tomorrow.getDay(),
              date: getDateFormatted(tomorrow),
              nextBusinessDayIsDayOff: getDateFormatted(tomorrow),
              specialDayOffOnTuesday: true,
              nextDeliveryDay: getDateFormatted(deliveryDay),
              nextDeliveryDayWeekday: deliveryDay.getDay(),
            }
          } else {
            return {
              weekday: tomorrow.getDay(),
              date: getDateFormatted(tomorrow),
              nextBusinessDayIsDayOff: '',
              specialDayOffOnTuesday: false,
              nextDeliveryDay: getDateFormatted(deliveryDay),
              nextDeliveryDayWeekday: deliveryDay.getDay(),
            }
          }
        } else {
          const deliveryDay = new Date(tomorrow)
          while (deliveryDay.getDay() == 0 || deliveryDay.getDay() == 6) {
            deliveryDay.setDate(deliveryDay.getDate() + 1)
          }

          return {
            weekday: tomorrow.getDay(),
            date: getDateFormatted(tomorrow),
            nextBusinessDayIsDayOff: '',
            specialDayOffOnTuesday: false,
            nextDeliveryDay: getDateFormatted(deliveryDay),
            nextDeliveryDayWeekday: deliveryDay.getDay(),
          }
        }
      }
    }

    fetchDayOff().then((data) => setDayOff(data))
  }, [])

  return {
    // Nao nulo para garantir q o popup vai aparecer
    weekday: 5,
    date: '2022-02-25',
    nextBusinessDayIsDayOff: '',
    specialDayOffOnTuesday: false,
    nextDeliveryDay: '2022-02-25',
    nextDeliveryDayWeekday: 5,
  }
}

import { useEffect, useState } from 'react'
import { BlueprintContent } from 'models/blueprint'
import { getBlueprintContent } from 'services/blueprintService'

interface UseBlueprintResult {
  data: BlueprintContent | null
  isLoading: boolean
}

export const useBlueprint = (): UseBlueprintResult => {
  const [data, setData] = useState<BlueprintContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    const run = async () => {
      const response = await getBlueprintContent()
      if (active) {
        setData(response)
        setIsLoading(false)
      }
    }

    void run()

    return () => {
      active = false
    }
  }, [])

  return { data, isLoading }
}

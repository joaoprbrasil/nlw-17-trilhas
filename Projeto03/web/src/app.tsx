import { Dialog } from './assets/components/ui/dialog'
import { CreateGoal } from './assets/components/ui/create-goal'
import { Summary } from './assets/components/ui/summary'
import { useEffect, useState } from 'react'
import { EmptyGoals } from './assets/components/ui/empty-goals'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'

export function App() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
  })

  return (
    <Dialog>
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}

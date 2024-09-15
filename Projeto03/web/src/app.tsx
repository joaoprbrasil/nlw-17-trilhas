import { Dialog } from './assets/components/ui/dialog'
import { CreateGoal } from './assets/components/ui/create-goal'
import { Summary } from './assets/components/ui/summary'
// import { EmptyGoals } from './assets/components/ui/empty-goals'

export function App() {
  return (
    <Dialog>
      {/*<EmptyGoals /> */}

      <Summary/>

      <CreateGoal />
    </Dialog>
  )
}

import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './button'
import { DialogTrigger } from './dialog'
import { InOrbitIcon } from './in-orbit-icon'
import { Progress, ProgressIndicator } from './progress-bar'
import { Separator } from './separator'
import { OutlineButton } from './outline-button'

export function Summary() {
  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">5 a 10 de Agosto</span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: '50%' }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">9</span> de{' '}
            <span className="text-zinc-100">15</span> metas nessa semana.
          </span>
          <span>50%</span>
        </div>

        <Separator />

        <div className="flex flex-wrap gap-3">
          <OutlineButton>
            <Plus className="size-4 text-zinc-600" />
            Meditar
          </OutlineButton>
          <OutlineButton>
            <Plus className="size-4 text-zinc-600" />
            Ler 2horas
          </OutlineButton>
          <OutlineButton>
            <Plus className="size-4 text-zinc-600" />
            Praticar exercícios
          </OutlineButton>
          <OutlineButton>
            <Plus className="size-4 text-zinc-600" />
            Estudar Assembly
          </OutlineButton>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Domingo{' '}
            <span className="text-zinc-400 text-xs">(10 de agosto)</span>
          </h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Acordar cedo</span>" às{' '}
                <span className="text-zinc-100">08:13h</span>
              </span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Segunda{' '}
            <span className="text-zinc-400 text-xs">(11 de agosto)</span>
          </h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "
                <span className="text-zinc-100">Estudar Assembly</span>" às{' '}
                <span className="text-zinc-100">04:00h</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

import { Calendar, CheckSquare, Zap, TrendingUp } from 'lucide-react';
import { mockKPI, mockTasks, mockProjects } from '../data/mockdata';

export default function Home() {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const stats = [
    {
      icon: CheckSquare,
      label: 'Tarefas Concluídas',
      value: mockKPI.tasks_completed,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      label: 'Tempo de Foco',
      value: `${mockKPI.focus_time}min`,
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: TrendingUp,
      label: 'Score de Produtividade',
      value: mockKPI.productivity_score,
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Calendar,
      label: 'Projetos Ativos',
      value: mockProjects.filter((p) => p.status === 'Ativo').length,
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-12 text-flex">
        <h1 className="mb-4 text-5xl font-bold text-transparent bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400 bg-clip-text">
          Bem-vindo ao Atlas
        </h1>
        <p className="text-xl text-slate-400">{currentDate}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 transition-transform border bg-gradient-to-br from-white/10 to-white/5 border-white/10 rounded-2xl hover:scale-105"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}
            >
              <stat.icon size={24} className="text-white" />
            </div>
            <p className="mb-2 text-sm text-slate-400">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="p-8 border bg-gradient-to-br from-white/10 to-white/5 border-white/10 rounded-2xl">
          <h2 className="mb-6 text-2xl font-bold text-white">Próximas Tarefas</h2>
          <div className="space-y-4">
            {mockTasks.slice(0, 3).map((task) => (
              <div
                key={task.id}
                className="p-4 transition-all border rounded-xl bg-white/5 border-white/10 hover:border-violet-500/30"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 font-medium text-white">{task.name}</h3>
                    <p className="text-sm text-slate-400">Prioridade: {task.priority}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === 'Pendente'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 border bg-gradient-to-br from-white/10 to-white/5 border-white/10 rounded-2xl">
          <h2 className="mb-6 text-2xl font-bold text-white">Progresso de Projetos</h2>
          <div className="space-y-6">
            {mockProjects.map((project) => (
              <div key={project.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="font-medium text-white">{project.name}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-400">
                    {project.progress}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full transition-all rounded-full"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: project.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 text-center border bg-gradient-to-r from-violet-500/20 to-pink-500/20 border-violet-500/30 rounded-2xl">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Continue seu ótimo trabalho!
        </h2>
        <p className="mb-6 text-slate-300">
          Você está no caminho certo para alcançar suas metas de produtividade.
        </p>
        <a href="/dashboard" className="inline-block px-6 py-3 font-medium text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 shadow-violet-500/30">
          Ver Dashboard Completo
        </a>
      </div>
        </div>
      );
    }

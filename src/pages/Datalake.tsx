import { Database, FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockProjects, mockTasks, mockPomodoroSessions, mockKPI } from '../data/mockdata';

export default function Datalake() {
  const allData = {
    projects: mockProjects,
    tasks: mockTasks,
    pomodoros: mockPomodoroSessions,
    kpis: mockKPI,
  };

  const dataStats = [
    {
      icon: Database,
      label: 'Total de Projetos',
      value: mockProjects.length,
      color: 'blue',
    },
    {
      icon: FileText,
      label: 'Total de Tarefas',
      value: mockTasks.length,
      color: 'green',
    },
    {
      icon: Clock,
      label: 'Sessões Pomodoro',
      value: mockPomodoroSessions.length,
      color: 'violet',
    },
    {
      icon: CheckCircle2,
      label: 'Registros KPI',
      value: 1,
      color: 'pink',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Datalake</h1>
        <p className="text-slate-400">Repositório central de dados e análises</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dataStats.map((stat, index) => (
          <div
            key={index}
            className=" bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 border border-${stat.color}-500/30 flex items-center justify-center mb-4`}
            >
              <stat.icon size={24} className={`text-${stat.color}-400`} />
            </div>
            <p className="text-sm text-slate-400 mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className=" bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Projetos</h2>
          <div className="space-y-3">
            {mockProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-white font-medium">{project.name}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      project.status === 'active'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-slate-400">ID</p>
                    <p className="text-white font-mono">{project.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Progresso</p>
                    <p className="text-white font-mono">{project.progress}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className=" bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Tarefas</h2>
          <div className="space-y-3">
            {mockTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-white font-medium flex-1">{task.name}</span>
                  {task.status === 'pending' &&
                    task.due_date &&
                    new Date(task.due_date) < new Date() && (
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0 ml-2" />
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Prioridade</p>
                    <p className="text-white font-mono">{task.priority}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Status</p>
                    <p className="text-white font-mono">{task.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className=" bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Sessões Pomodoro</h2>
          <div className="space-y-3">
            {mockPomodoroSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${
                      session.completed
                        ? 'bg-green-500/20 border border-green-500/30'
                        : 'bg-slate-500/20 border border-slate-500/30'
                    } flex items-center justify-center`}
                  >
                    <Clock
                      size={20}
                      className={session.completed ? 'text-green-400' : 'text-slate-400'}
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">Sessão #{session.id}</p>
                    <p className="text-sm text-slate-400">
                      {new Date(session.created_date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{session.duration_minutes}min</p>
                  <p className="text-xs text-slate-400">
                    {session.completed ? 'Completo' : 'Incompleto'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className=" bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">KPIs de Performance</h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300">Score de Produtividade</span>
                <span className="text-2xl font-bold text-white">
                  {mockKPI.productivity_score}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500"
                  style={{ width: `${mockKPI.productivity_score}%` }}
                />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300">Tempo de Foco</span>
                <span className="text-2xl font-bold text-white">{mockKPI.focus_time}min</span>
              </div>
              <p className="text-sm text-slate-400">Tempo total focado hoje</p>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300">Tarefas Completadas</span>
                <span className="text-2xl font-bold text-white">
                  {mockKPI.tasks_completed}
                </span>
              </div>
              <p className="text-sm text-slate-400">Total de tarefas concluídas</p>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Dados Brutos (JSON)</h2>
        <div className="bg-slate-950/50 rounded-xl p-4 border border-white/10 overflow-auto max-h-96">
          <pre className="text-sm text-slate-300 font-mono">
            {JSON.stringify(allData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}


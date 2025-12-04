import { Zap, Plus, Target, Clock, TrendingUp } from 'lucide-react';
import { mockProjects, mockTasks, mockPomodoroSessions, mockKPI } from '../data/mockdata';

export default function Dashboard() {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  const activeProjects = mockProjects.filter((p) => p.status === 'active').length;
  const todayTasks = mockTasks.filter((t) => t.status === 'pending').length;
  const overdueTasks = mockTasks.filter(
    (t) => t.due_date && new Date(t.due_date) < new Date() && t.status === 'pending'
  ).length;
  const completedPomodoros = mockPomodoroSessions.filter((s) => s.completed).length;

  const kpiCards = [
    { label: 'Projetos Ativos', value: activeProjects, color: 'text-white' },
    { label: 'Tarefas Hoje', value: todayTasks, color: 'text-white' },
    { label: 'Atrasadas', value: overdueTasks, color: 'text-red-400' },
    { label: 'Pomodoros', value: completedPomodoros, color: 'text-green-400' },
    { label: 'Tempo Foco', value: `${mockKPI.focus_time}min`, color: 'text-violet-400' },
    { label: 'Score', value: mockKPI.productivity_score, color: 'text-violet-400' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-slate-400">{currentDate}</p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium hover:from-violet-500 hover:to-violet-400 transition-all shadow-lg shadow-violet-500/30">
            <Zap size={20} />
            Iniciar Foco
          </button>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
            <Plus size={20} />
            Nova Tarefa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {kpiCards.map((card, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all"
          >
            <p className="text-sm text-slate-400 mb-2">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-violet-500/20 border border-violet-500/30">
              <Target size={24} className="text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Tarefas de Hoje</h2>
              <p className="text-sm text-slate-400">{todayTasks} tarefas agendadas</p>
            </div>
          </div>

          <div className="space-y-4">
            {mockTasks.slice(0, 2).map((task) => (
              <div
                key={task.id}
                className="p-5 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all"
              >
                <h3 className="text-white font-medium mb-2">{task.name}</h3>
                <p className="text-sm text-slate-400">
                  Prioridade: <span className="text-violet-400">{task.priority}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-violet-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock size={20} className="text-violet-400" />
            <h2 className="text-lg font-bold text-white">Foco de Hoje</h2>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-400">Pomodoros</p>
              <p className="text-sm font-medium text-violet-400">
                {completedPomodoros}/8
              </p>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all"
                style={{ width: `${(completedPomodoros / 8) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-slate-400 mb-2">Tempo em foco</p>
            <p className="text-4xl font-bold text-white">{mockKPI.focus_time}min</p>
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={20} className="text-green-400" />
              <p className="text-sm font-medium text-white">Performance</p>
            </div>
            <p className="text-5xl font-bold text-white mb-2">{mockKPI.productivity_score}</p>
            <p className="text-sm text-slate-400">Score de Produtividade</p>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Projetos Ativos</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-xl backdrop-blur-lg bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-white/10 hover:border-violet-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <h3 className="text-white font-medium">{project.name}</h3>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">Progresso</span>
                <span className="font-medium" style={{ color: project.color }}>
                  {project.progress}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
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
  );
}

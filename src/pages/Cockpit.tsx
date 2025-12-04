import { Activity, Clock, Target, Flame, Award, Calendar } from 'lucide-react';
import { mockKPI, mockPomodoroSessions, mockTasks, mockProjects } from '../data/mockdata';

export default function Cockpit() {
  const completedTasks = mockTasks.filter((t) => t.status === 'completed').length;
  const totalTasks = mockTasks.length;
  const taskCompletionRate = Math.round((completedTasks / totalTasks) * 100);

  const metrics = [
    {
      icon: Activity,
      label: 'Score de Produtividade',
      value: mockKPI.productivity_score,
      trend: '+12%',
      color: 'violet',
    },
    {
      icon: Clock,
      label: 'Tempo de Foco Hoje',
      value: `${mockKPI.focus_time}min`,
      trend: '+8min',
      color: 'blue',
    },
    {
      icon: Target,
      label: 'Taxa de Conclusão',
      value: `${taskCompletionRate}%`,
      trend: '+5%',
      color: 'green',
    },
    {
      icon: Flame,
      label: 'Sequência Atual',
      value: '7 dias',
      trend: 'Mantendo!',
      color: 'orange',
    },
  ];

  const weekData = [
    { day: 'Seg', focus: 60, tasks: 4 },
    { day: 'Ter', focus: 45, tasks: 3 },
    { day: 'Qua', focus: 90, tasks: 6 },
    { day: 'Qui', focus: 75, tasks: 5 },
    { day: 'Sex', focus: 30, tasks: 2 },
    { day: 'Sáb', focus: 0, tasks: 0 },
    { day: 'Dom', focus: 0, tasks: 0 },
  ];

  const maxFocus = Math.max(...weekData.map((d) => d.focus));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Cockpit de Controle</h1>
        <p className="text-slate-400">Visão geral de suas métricas e performance</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-${metric.color}-500/20 border border-${metric.color}-500/30`}
              >
                <metric.icon size={24} className={`text-${metric.color}-400`} />
              </div>
              <span className="px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">
                {metric.trend}
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-1">{metric.label}</p>
            <p className="text-3xl font-bold text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Foco Semanal</h2>
            <Calendar size={20} className="text-slate-400" />
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {weekData.map((day, index) => (
              <div key={index} className="flex flex-col items-center flex-1 gap-2">
                <div className="w-full flex flex-col items-center gap-1 flex-1 justify-end">
                  <span className="text-xs text-slate-400 mb-1">
                    {day.focus > 0 ? `${day.focus}m` : ''}
                  </span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-violet-500 to-pink-500 transition-all hover:opacity-80"
                    style={{
                      height: day.focus > 0 ? `${(day.focus / maxFocus) * 100}%` : '4px',
                      minHeight: day.focus > 0 ? '20px' : '4px',
                    }}
                  />
                </div>
                <span className="text-xs text-slate-400 font-medium">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-violet-500/20 border border-violet-500/30">
              <Award size={24} className="text-violet-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Conquistas Recentes</h2>
              <p className="text-sm text-slate-400">Continue assim!</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🔥</div>
                <div>
                  <p className="text-white font-medium">Sequência de 7 dias</p>
                  <p className="text-sm text-slate-400">Continue mantendo o ritmo</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🎯</div>
                <div>
                  <p className="text-white font-medium">Meta de Tarefas Atingida</p>
                  <p className="text-sm text-slate-400">
                    {mockKPI.tasks_completed} tarefas completadas
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
              <div className="flex items-center gap-3">
                <div className="text-3xl">⚡</div>
                <div>
                  <p className="text-white font-medium">Foco Máximo</p>
                  <p className="text-sm text-slate-400">
                    {mockPomodoroSessions.length} sessões completas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Distribuição de Tempo</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: project.color }}
                >
                  {project.progress}%
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{project.name}</h3>
                  <p className="text-sm text-slate-400">{project.status}</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
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

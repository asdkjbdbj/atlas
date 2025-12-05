import { FolderKanban, TrendingUp, Clock, Plus, MoreVertical } from 'lucide-react';
import { mockProjects } from '../data/mockdata';

export default function Projects() {
  const activeProjects = mockProjects.filter((p) => p.status === 'active');
  const completedProjects = mockProjects.filter((p) => p.status === 'completed');
  const totalProgress =
    mockProjects.reduce((sum, p) => sum + p.progress, 0) / mockProjects.length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Projetos</h1>
          <p className="text-slate-400">Gerencie e acompanhe seus projetos</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium hover:from-violet-500 hover:to-violet-400 transition-all shadow-lg shadow-violet-500/30">
          <Plus size={20} />
          Novo Projeto
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className=" bg-gradient-to-br from-violet-500/20 to-pink-500/20 border border-violet-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-violet-500/30">
              <FolderKanban size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-violet-200">Total de Projetos</p>
              <p className="text-3xl font-bold text-white">{mockProjects.length}</p>
            </div>
          </div>
        </div>

        <div className=" bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-green-500/30">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-green-200">Projetos Ativos</p>
              <p className="text-3xl font-bold text-white">{activeProjects.length}</p>
            </div>
          </div>
        </div>

        <div className=" bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-blue-500/30">
              <Clock size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-200">Progresso Médio</p>
              <p className="text-3xl font-bold text-white">{Math.round(totalProgress)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Projetos Ativos</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className=" bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-white/10 rounded-xl p-6 hover:border-violet-500/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: project.color }}
                  >
                    <FolderKanban size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{project.name}</h3>
                    <p className="text-sm text-slate-400 capitalize">{project.status}</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
                  <MoreVertical size={20} className="text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Progresso Geral</span>
                    <span className="text-sm font-bold text-white">{project.progress}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor: project.color,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Última atualização</p>
                    <p className="text-sm text-white font-medium">
                      {project.updated_date
                        ? new Date(project.updated_date).toLocaleDateString('pt-BR')
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Status</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${
                        project.status === 'active'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : project.status === 'completed'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                <button
                  className="w-full py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all"
                  style={{
                    borderColor: `${project.color}30`,
                    color: project.color,
                  }}
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {completedProjects.length > 0 && (
        <div className=" bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Projetos Concluídos</h2>
          <div className="grid lg:grid-cols-3 gap-4">
            {completedProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: project.color }}
                  >
                    <FolderKanban size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{project.name}</h3>
                    <p className="text-sm text-green-400">100% Concluído</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className=" bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Pronto para começar?</h2>
        <p className="text-slate-300 mb-6">
          Crie um novo projeto e comece a organizar suas tarefas agora mesmo.
        </p>
        <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium hover:from-violet-500 hover:to-violet-400 transition-all shadow-lg shadow-violet-500/30">
          Criar Primeiro Projeto
        </button>
      </div>
    </div>
  );
}


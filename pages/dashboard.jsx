import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Plus, 
  TrendingUp, 
  Target,
  Clock,
  Zap,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, isToday, isTomorrow, isPast, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";

import TimelineView from "../components/dashboard/TimelineView";
import QuickStats from "../components/dashboard/QuickStats";
import FloatingAssistant from "../components/dashboard/FloatingAssistant";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list('-updated_date'),
    initialData: [],
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => base44.entities.Task.list('-scheduled_date'),
    initialData: [],
  });

  const { data: todayKPI } = useQuery({
    queryKey: ['kpi', format(new Date(), 'yyyy-MM-dd')],
    queryFn: () => base44.entities.KPI.filter({ 
      date: format(new Date(), 'yyyy-MM-dd') 
    }),
    select: (data) => data[0] || null,
  });

  const { data: pomodoroSessions = [] } = useQuery({
    queryKey: ['pomodoro-sessions'],
    queryFn: () => base44.entities.PomodoroSession.list('-created_date', 10),
    initialData: [],
  });

  const activeProjects = projects.filter(p => p.status === 'active');
  const todayTasks = tasks.filter(task => {
    if (!task.scheduled_date) return false;
    return isToday(new Date(task.scheduled_date));
  });
  const overdueTasks = tasks.filter(task => {
    if (!task.due_date || task.status === 'completed') return false;
    return isPast(new Date(task.due_date)) && !isToday(new Date(task.due_date));
  });

  const completedToday = pomodoroSessions.filter(s => 
    s.completed && isToday(new Date(s.created_date))
  ).length;

  const focusTimeToday = pomodoroSessions
    .filter(s => s.completed && isToday(new Date(s.created_date)))
    .reduce((sum, s) => sum + (s.duration_minutes || 0), 0);

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                Bem-vindo de volta
              </h1>
              <p className="text-slate-400 text-lg">
                {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link to={createPageUrl("Pomodoro")}>
                <Button className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25">
                  <Zap className="w-4 h-4" />
                  Iniciar Foco
                </Button>
              </Link>
              <Link to={createPageUrl("Projects")}>
                <Button variant="outline" className="gap-2 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10">
                  <Plus className="w-4 h-4" />
                  Nova Tarefa
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats 
          activeProjects={activeProjects.length}
          todayTasks={todayTasks.length}
          overdueTasks={overdueTasks.length}
          completedPomodoros={completedToday}
          focusTime={focusTimeToday}
          productivityScore={todayKPI?.productivity_score || 0}
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Timeline - Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-indigo-500/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Timeline Inteligente</h2>
                    <p className="text-sm text-slate-400">Tarefas priorizadas e otimizadas</p>
                  </div>
                </div>
              </div>

              <TimelineView tasks={tasks} projects={projects} />
            </div>

            {/* Projects Overview */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-indigo-500/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Projetos Ativos</h3>
                <Link to={createPageUrl("Projects")}>
                  <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">
                    Ver todos
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              {activeProjects.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-slate-400 mb-4">Nenhum projeto ativo ainda</p>
                  <Link to={createPageUrl("Projects")}>
                    <Button variant="outline" size="sm" className="border-indigo-500/30 text-indigo-300">
                      Criar primeiro projeto
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeProjects.slice(0, 3).map(project => (
                    <div
                      key={project.id}
                      className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: project.color || '#6366f1' }}
                          />
                          <h4 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                            {project.name}
                          </h4>
                        </div>
                        <span className="text-xs text-slate-400">
                          {project.progress || 0}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                          style={{ width: `${project.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Side Column - Insights & Quick Actions */}
          <div className="space-y-6">
            {/* Today Focus */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white">Foco de Hoje</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">Pomodoros</span>
                    <span className="text-indigo-400 font-semibold">{completedToday}/8</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${(completedToday / 8) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-indigo-500/20">
                  <p className="text-sm text-slate-400 mb-1">Tempo em foco</p>
                  <p className="text-2xl font-bold text-white">{focusTimeToday}min</p>
                </div>
              </div>
            </div>

            {/* Performance Card */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-indigo-500/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h3 className="font-bold text-white">Performance</h3>
              </div>
              
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-slate-800"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${((todayKPI?.productivity_score || 0) / 100) * 351.86} 351.86`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {todayKPI?.productivity_score || 0}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-400">Score de Produtividade</p>
              </div>

              <Link to={createPageUrl("Analytics")} className="mt-4 block">
                <Button variant="outline" className="w-full border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10">
                  Ver detalhes
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Assistant */}
      <FloatingAssistant tasks={tasks} projects={projects} />
    </div>
  );
}
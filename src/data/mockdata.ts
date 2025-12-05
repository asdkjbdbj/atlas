// Interfaces
export interface Project {
  id: number;
  name: string;
  status: 'Ativo' | 'Inativo' | 'Concluído';
  color: string;
  progress: number;
  updated_date?: string;
}

export interface Task {
  id: number;
  name: string;
  priority: string;
  status: 'Pendente' | 'Concluído' | 'Em andamento';
  scheduled_date?: string;
  due_date?: string;
}

export interface priorityLevels {
  Alta: string;
  Media: string;
  Baixa: string;
}

export interface PomodoroSession {
  id: number;
  completed: boolean;
  created_date: string;
  duration_minutes?: number;
}

export interface KPI {
  id?: string;
  date?: string;
  productivity_score: number;
  focus_time: number;
  tasks_completed: number;
}

// Mock Data
export const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Atlas - Noésis',
    status: 'Ativo',
    progress: 65,
    color: '#6366f1',
    updated_date: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Estudos de React',
    status: 'Ativo',
    progress: 40,
    color: '#8b5cf6',
    updated_date: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Projeto Pessoal',
    status: 'Ativo',
    progress: 80,
    color: '#ec4899',
    updated_date: new Date().toISOString(),
  },
];

export const mockTasks: Task[] = [
  {
    id: 1,
    name: 'Revisar código no dashboard',
    status: 'Pendente',
    scheduled_date: new Date().toISOString(),
    due_date: new Date().toISOString(),
    priority: 'Alta',
  },
  {
    id: 2,
    name: 'Estudar React Query',
    status: 'Pendente',
    scheduled_date: new Date().toISOString(),
    due_date: new Date(Date.now() + 86400000).toISOString(), // amanhã
    priority: 'Media',
  },
  {
    id: 3,
    name: 'Atualizar documentação',
    status: 'Pendente',
    scheduled_date: new Date(Date.now() - 86400000).toISOString(), // ontem (atrasada)
    due_date: new Date(Date.now() - 86400000).toISOString(),
    priority: 'Baixa',
  },
];

export const mockPomodoroSessions: PomodoroSession[] = [
  {
    id: 1,
    completed: true,
    created_date: new Date().toISOString(),
    duration_minutes: 25,
  },
  {
    id: 2,
    completed: true,
    created_date: new Date().toISOString(),
    duration_minutes: 25,
  },
  {
    id: 3,
    completed: true,
    created_date: new Date().toISOString(),
    duration_minutes: 25,
  },
];

export const mockKPI: KPI = {
  id: '1',
  date: new Date().toISOString(),
  productivity_score: 75,
  focus_time: 75, // minutos de foco hoje
  tasks_completed: 5,
};

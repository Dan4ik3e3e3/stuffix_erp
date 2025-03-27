export interface DashboardMetrics {
  clients: number;
  projects: number;
  messages: number;
  tasks: number;
}

export interface ActivityData {
  date: string;
  visits: number;
  messages: number;
  tasks: number;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  activityData: ActivityData[];
} 
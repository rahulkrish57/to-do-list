export interface ListItem {
  _id: string;
  name: string;
  status: boolean;
  cAt: Date;
  uAt: Date;
}
export interface ListData {
  totalPages: number;
  lists: ListItem[];
}

export interface Task {
  _id: string;
  name: string;
  status: boolean;
}

export interface NewTask {
  name: string;
  status: boolean;
}

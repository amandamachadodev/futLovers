export type Team = {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export type Player = {
  [x: string]: any;
  id: number;
  name: string;
  age: number;
  team_id: number; //remover duplicado
  created_at: Date;
  updated_at: Date;
  team: {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
  }
}

export type PlayerUpdate = {
  name: string;
  age: number;
  team_id: number;
  team: string;
}

//remote
export type TeamProps = {
  teams: {
    id: number;
    name: string;
    updated_at: Date;
    created_at: Date;
  }[];
}

export type PlayerProps = {
  players: {
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
  }[]
}


export type PlayerUpdate = {
  name: string;
  age: number;
  team_id: number;
}
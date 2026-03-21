export class CreateTodoDTO {
  title!: string;
  description!: string;
  completed!: boolean;
}

export class UpdateTodoDTO {
  id?: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

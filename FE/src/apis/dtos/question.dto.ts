export interface Comment {
  commentId: number;
  teamId: number;
  writer: string;
  accessRight: "edit" | "read_only";
  time: string;
  content: string;
  answers: Answer[];
}

export interface Answer {
  commentId: number;
  writer: string;
  accessRight: "edit" | "read_only";
  time: string;
  content: string;
}

export class QuestionListDto {
  public comments: Comment[];
  constructor(data) {
    this.comments = data.comments;
  }
}

export class AnnouncementDto {
  public readonly id: number;
  public readonly title: string;
  public readonly body: string;
  public readonly announcedAt: number;
  public readonly deadline: number;
  public readonly createdDate: number;

  constructor(data: {
    id: number;
    title: string;
    body: string;
    announcedAt: number;
    deadline: number;
    createdDate: number;
  }) {
    this.id = data?.id;
    this.title = data?.title;
    this.body = data?.body;
    this.announcedAt = data?.announcedAt;
    this.deadline = data?.deadline;
    this.createdDate = data?.createdDate;
  }
}

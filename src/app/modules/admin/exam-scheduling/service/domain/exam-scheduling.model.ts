export class ExamSearchModel {
  examLevel: string;
  session: string;
  year: string;
  subjectCode:string
}

export class ExamModel {
  examId: 0;
  examLevel: string;
  examSet: string;
  id: 0;
  session: string;
  subjectCode: string;
  subjectId: 0;
  subjectName: string;
  year: string
}

export class ScheduleModel    {
  id: number;
  examDate: Date | string;
  examStartsAt: Date;
  examEndsAt: Date;
  quizPwd: string;
}












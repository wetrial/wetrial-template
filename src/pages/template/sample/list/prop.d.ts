export type IGitHubIssue = {
  id: number;
  url: string;
  title: string;
  labels: {
    label: string;
    color: string;
  }[];
  status: string;
  comments: number;
  content: string;
  assigner: string;
  createdTime: number;
  closeTime?: number;
  progress: number;
  money: number;
};

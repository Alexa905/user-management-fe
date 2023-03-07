import { Team } from './Team';

export enum UserRoleType {
  FULLSTACK = 'fullstack',
  FRONTEND = 'frontend',
  BACKEND = 'backend',
}

export enum UserStatus {
  FULL_TIME = 'full time',
  CONTRACTOR = 'contractor',
  TEMPORARY_UNAVAILABLE = 'temporary unavailable',
}

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  status: UserStatus;
  role: UserRoleType;
  email: string;
  teamId: Team['id'];
  teamName?: Team['name'];
  isSpeaker?: boolean;
}

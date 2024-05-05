export interface UserDetailForUpdate {
  userId: number;
  customerId: number;
  email: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  password: string;
}

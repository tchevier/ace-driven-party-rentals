export interface UserModel {
    id: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email: string;
    userName?: string;
    hashedPassword: string;
    provider: 'google' | 'credentials' | undefined;
  }
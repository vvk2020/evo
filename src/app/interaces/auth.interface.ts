/* Интерфейсы аутентификации / авторизации */

type Role = 'admin' | 'user';

export interface Account {
  id: string; // "fb80c837-a44f-4e43-ac01-fcdc8a117200",
  role: Role; //"admin",
  firstName: string; //"Petr",
  lastName?: string; // 'Petrov';
  middleName?: string; // 'Petrovich';
  avatar?: string; // 'https://avatars.githubusercontent.com/u/47239541';
  username?: string; // 'admin';
  jwtToken: string; // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiODBjODM3LWE0NGYtNGU0My1hYzAxLWZjZGM4YTExNzIwMCIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3NDYwOTg4MTUsImV4cCI6MTc0NjEwMjQxNX0.g4YxA98cwySzvv7tJrxXvOwwuVl-Lfs1FE_oXel51qA';
  expiresIn?: number; // Срок жизни токена
}
export interface User {
  username: string;
  password: string;
}

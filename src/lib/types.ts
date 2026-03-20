export type Employee = {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  avatar_url: string | null;
};

export interface dicebearOptions {
  scale?: number;
  style?: string;
}

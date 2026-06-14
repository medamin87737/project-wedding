export interface RSVP {
  id: string;
  nom: string;
  prenom: string;
  telephone: string | null;
  nombre_places: number;
  confirme: boolean;
  message: string | null;
  created_at: string;
}

export interface RSVPStats {
  total_invites: number;
  total_places: number;
  confirmes: number;
  places_confirmees: number;
}

export interface RSVPFormData {
  prenom: string;
  nom: string;
  telephone: string;
  nombre_places: number;
  message: string;
}

-- Table principale des invités (idempotent — safe à relancer)
CREATE TABLE IF NOT EXISTS rsvp (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  telephone VARCHAR(20),
  nombre_places INTEGER NOT NULL DEFAULT 1 CHECK (nombre_places >= 1 AND nombre_places <= 10),
  confirme BOOLEAN DEFAULT true,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vue pour le dashboard admin
DROP VIEW IF EXISTS rsvp_stats;
CREATE VIEW rsvp_stats AS
SELECT
  COUNT(*) AS total_invites,
  SUM(nombre_places) AS total_places,
  COUNT(CASE WHEN confirme = true THEN 1 END) AS confirmes,
  SUM(CASE WHEN confirme = true THEN nombre_places ELSE 0 END) AS places_confirmees
FROM rsvp;

-- Politique RLS (Row Level Security)
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tout le monde peut insérer" ON rsvp;
CREATE POLICY "Tout le monde peut insérer" ON rsvp
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin peut lire" ON rsvp;
CREATE POLICY "Admin peut lire" ON rsvp
  FOR SELECT USING (true);

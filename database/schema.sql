CREATE TABLE IF NOT EXISTS public.content (
  content_key VARCHAR(64) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public can read portfolio content" ON public.content;
CREATE POLICY "public can read portfolio content" ON public.content
  FOR SELECT TO anon, authenticated
  USING (true);

-- Replace this UUID with the admin user ID shown in InsForge Auth before running this migration.
DROP POLICY IF EXISTS "admin can insert portfolio content" ON public.content;
CREATE POLICY "admin can insert portfolio content" ON public.content
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = 'b1ffe08c-919f-41e5-859c-c576b1bb45af'::uuid);

DROP POLICY IF EXISTS "admin can update portfolio content" ON public.content;
CREATE POLICY "admin can update portfolio content" ON public.content
  FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = 'b1ffe08c-919f-41e5-859c-c576b1bb45af'::uuid)
  WITH CHECK ((SELECT auth.uid()) = 'b1ffe08c-919f-41e5-859c-c576b1bb45af'::uuid);

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.content TO anon, authenticated;
GRANT INSERT, UPDATE ON public.content TO authenticated;

CREATE OR REPLACE FUNCTION public.set_content_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS content_updated_at ON public.content;
CREATE TRIGGER content_updated_at
  BEFORE UPDATE ON public.content
  FOR EACH ROW
  EXECUTE FUNCTION public.set_content_updated_at();

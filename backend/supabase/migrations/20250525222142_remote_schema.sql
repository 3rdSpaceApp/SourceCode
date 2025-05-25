drop trigger if exists "enforce_match_cap" on "public"."matches";

alter table "public"."user_waitlist" enable row level security;

CREATE TRIGGER enforce_match_cap BEFORE INSERT ON public.matches FOR EACH ROW EXECUTE FUNCTION check_match_cap();
ALTER TABLE "public"."matches" DISABLE TRIGGER "enforce_match_cap";



alter table "public"."user_waitlist" drop constraint "user_waitlist_user_id_fkey";

alter table "public"."user_waitlist" add constraint "user_waitlist_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."user_waitlist" validate constraint "user_waitlist_user_id_fkey";



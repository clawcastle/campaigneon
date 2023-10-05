CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL,
    display_name text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL,
    password_hash bytea NOT NULL,
    password_salt bytea NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public.campaigns
(
    id uuid NOT NULL,
    title text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL,
    created_by uuid NOT NULL,
    CONSTRAINT campaigns_pkey PRIMARY KEY (id),
    CONSTRAINT created_by_fk FOREIGN KEY (created_by) REFERENCES public.users (id)
)

CREATE TABLE IF NOT EXISTS public.campaign_members
(
    campaign_id uuid NOT NULL,
    user_id uuid NOT NULL,
    is_dm boolean NOT NULL
    CONSTRAINT campaign_members_pkey PRIMARY KEY (campaign_id, user_id),
    CONSTRAINT campaign_id_fk FOREIGN KEY (campaign_id) REFERENCES public.campaigns (id),
    CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES public.users (id)
)
CREATE TABLE IF NOT EXISTS public.campaigns
(
    id uuid NOT NULL,
    title text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL,
    created_by text NOT NULL,
    CONSTRAINT campaigns_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.campaign_members
(
    campaign_id uuid NOT NULL,
    user_id text NOT NULL,
    is_dm boolean NOT NULL,
    CONSTRAINT campaign_members_pkey PRIMARY KEY (campaign_id, user_id),
    CONSTRAINT campaign_id_fk FOREIGN KEY (campaign_id) REFERENCES public.campaigns (id)
);

CREATE TABLE IF NOT EXISTS public.categories
(
    id uuid NOT NULL,
    campaign_id uuid NOT NULL,
    title text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    parent_id uuid,
    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT campaign_id_fk FOREIGN KEY (campaign_id) REFERENCES public.campaigns (id)
);
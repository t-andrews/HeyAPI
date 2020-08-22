--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

-- Started on 2020-08-21 23:00:34

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 2862 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16424)
-- Name: basho; Type: TABLE; Schema: public; Owner: sumoApiUser
--

CREATE TABLE public.basho (
    id integer NOT NULL,
    basho_location character varying(255) NOT NULL,
    start_date time without time zone NOT NULL,
    end_date time without time zone NOT NULL,
    winner_id integer,
    name character varying DEFAULT 8
);


ALTER TABLE public.basho OWNER TO "sumoApiUser";

--
-- TOC entry 209 (class 1259 OID 16422)
-- Name: basho_id_seq; Type: SEQUENCE; Schema: public; Owner: sumoApiUser
--

CREATE SEQUENCE public.basho_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.basho_id_seq OWNER TO "sumoApiUser";

--
-- TOC entry 2863 (class 0 OID 0)
-- Dependencies: 209
-- Name: basho_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sumoApiUser
--

ALTER SEQUENCE public.basho_id_seq OWNED BY public.basho.id;


--
-- TOC entry 206 (class 1259 OID 16408)
-- Name: bout; Type: TABLE; Schema: public; Owner: sumoApiUser
--

CREATE TABLE public.bout (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    basho_day smallint NOT NULL,
    winning_method character varying(32) NOT NULL,
    duration integer NOT NULL,
    winner_id integer,
    "order" smallint
);


ALTER TABLE public.bout OWNER TO "sumoApiUser";

--
-- TOC entry 205 (class 1259 OID 16406)
-- Name: bout_id_seq; Type: SEQUENCE; Schema: public; Owner: sumoApiUser
--

CREATE SEQUENCE public.bout_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bout_id_seq OWNER TO "sumoApiUser";

--
-- TOC entry 2864 (class 0 OID 0)
-- Dependencies: 205
-- Name: bout_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sumoApiUser
--

ALTER SEQUENCE public.bout_id_seq OWNED BY public.bout.id;


--
-- TOC entry 208 (class 1259 OID 16416)
-- Name: heya; Type: TABLE; Schema: public; Owner: sumoApiUser
--

CREATE TABLE public.heya (
    id integer NOT NULL,
    heya_name character varying(32) NOT NULL,
    creation_date timestamp without time zone NOT NULL,
    heya_location character varying(255) NOT NULL,
    ichimon character varying(32) NOT NULL
);


ALTER TABLE public.heya OWNER TO "sumoApiUser";

--
-- TOC entry 207 (class 1259 OID 16414)
-- Name: heya_id_seq; Type: SEQUENCE; Schema: public; Owner: sumoApiUser
--

CREATE SEQUENCE public.heya_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.heya_id_seq OWNER TO "sumoApiUser";

--
-- TOC entry 2865 (class 0 OID 0)
-- Dependencies: 207
-- Name: heya_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sumoApiUser
--

ALTER SEQUENCE public.heya_id_seq OWNED BY public.heya.id;


--
-- TOC entry 212 (class 1259 OID 16452)
-- Name: rank; Type: TABLE; Schema: public; Owner: sumoApiUser
--

CREATE TABLE public.rank (
    id integer NOT NULL,
    division character varying(32) NOT NULL,
    makuuchi_rank character varying(32),
    region character varying(8),
    "position" smallint,
    start_date timestamp without time zone NOT NULL,
    end_date time without time zone
);


ALTER TABLE public.rank OWNER TO "sumoApiUser";

--
-- TOC entry 211 (class 1259 OID 16450)
-- Name: rank_id_seq; Type: SEQUENCE; Schema: public; Owner: sumoApiUser
--

CREATE SEQUENCE public.rank_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rank_id_seq OWNER TO "sumoApiUser";

--
-- TOC entry 2866 (class 0 OID 0)
-- Dependencies: 211
-- Name: rank_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sumoApiUser
--

ALTER SEQUENCE public.rank_id_seq OWNED BY public.rank.id;


--
-- TOC entry 204 (class 1259 OID 16400)
-- Name: rikishi; Type: TABLE; Schema: public; Owner: sumoApiUser
--

CREATE TABLE public.rikishi (
    id integer NOT NULL,
    rikishi_name character varying(255) NOT NULL,
    birth_date timestamp without time zone NOT NULL,
    rank_id integer,
    heya_id integer
);


ALTER TABLE public.rikishi OWNER TO "sumoApiUser";

--
-- TOC entry 203 (class 1259 OID 16398)
-- Name: rikishi_id_seq; Type: SEQUENCE; Schema: public; Owner: sumoApiUser
--

CREATE SEQUENCE public.rikishi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rikishi_id_seq OWNER TO "sumoApiUser";

--
-- TOC entry 2867 (class 0 OID 0)
-- Dependencies: 203
-- Name: rikishi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sumoApiUser
--

ALTER SEQUENCE public.rikishi_id_seq OWNED BY public.rikishi.id;


--
-- TOC entry 2716 (class 2604 OID 16427)
-- Name: basho id; Type: DEFAULT; Schema: public; Owner: sumoApiUser
--

ALTER TABLE ONLY public.basho ALTER COLUMN id SET DEFAULT nextval('public.basho_id_seq'::regclass);


--
-- TOC entry 2714 (class 2604 OID 16411)
-- Name: bout id; Type: DEFAULT; Schema: public; Owner: sumoApiUser
--

ALTER TABLE ONLY public.bout ALTER COLUMN id SET DEFAULT nextval('public.bout_id_seq'::regclass);


--
-- TOC entry 2715 (class 2604 OID 16419)
-- Name: heya id; Type: DEFAULT; Schema: public; Owner: sumoApiUser
--

ALTER TABLE ONLY public.heya ALTER COLUMN id SET DEFAULT nextval('public.heya_id_seq'::regclass);


--
-- TOC entry 2718 (class 2604 OID 16455)
-- Name: rank id; Type: DEFAULT; Schema: public; Owner: sumoApiUser
--

ALTER TABLE ONLY public.rank ALTER COLUMN id SET DEFAULT nextval('public.rank_id_seq'::regclass);


--
-- TOC entry 2713 (class 2604 OID 16403)
-- Name: rikishi id; Type: DEFAULT; Schema: public; Owner: sumoApiUser
--

ALTER TABLE ONLY public.rikishi ALTER COLUMN id SET DEFAULT nextval('public.rikishi_id_seq'::regclass);


--
-- TOC entry 2722 (class 2606 OID 16413)
-- Name: bout bout_pkey; Type: CONSTRAINT; Schema: public; Owner: sumoApiUser
--

ALTER TABLE ONLY public.bout
    ADD CONSTRAINT bout_pkey PRIMARY KEY (id);


--
-- TOC entry 2724 (class 2606 OID 16421)
-- Name: heya heya_pkey; Type: CONSTRAINT; Schema: public; Owner: sumoApiUser
--

ALTER TABLE ONLY public.heya
    ADD CONSTRAINT heya_pkey PRIMARY KEY (id);


--
-- TOC entry 2726 (class 2606 OID 16457)
-- Name: rank rank_pkey; Type: CONSTRAINT; Schema: public; Owner: sumoApiUser
--

ALTER TABLE ONLY public.rank
    ADD CONSTRAINT rank_pkey PRIMARY KEY (id);


--
-- TOC entry 2720 (class 2606 OID 16405)
-- Name: rikishi rikishi_pkey; Type: CONSTRAINT; Schema: public; Owner: sumoApiUser
--

ALTER TABLE ONLY public.rikishi
    ADD CONSTRAINT rikishi_pkey PRIMARY KEY (id);


--
-- TOC entry 2728 (class 2606 OID 16463)
-- Name: rikishi heya; Type: FK CONSTRAINT; Schema: public; Owner: sumoApiUser
--

ALTER TABLE ONLY public.rikishi
    ADD CONSTRAINT heya FOREIGN KEY (heya_id) REFERENCES public.heya(id) NOT VALID;


--
-- TOC entry 2727 (class 2606 OID 16458)
-- Name: rikishi rank; Type: FK CONSTRAINT; Schema: public; Owner: sumoApiUser
--

ALTER TABLE ONLY public.rikishi
    ADD CONSTRAINT rank FOREIGN KEY (rank_id) REFERENCES public.rank(id) NOT VALID;


--
-- TOC entry 2730 (class 2606 OID 16428)
-- Name: basho winner; Type: FK CONSTRAINT; Schema: public; Owner: sumoApiUser
--

ALTER TABLE ONLY public.basho
    ADD CONSTRAINT winner FOREIGN KEY (winner_id) REFERENCES public.rikishi(id);


--
-- TOC entry 2729 (class 2606 OID 16445)
-- Name: bout winner; Type: FK CONSTRAINT; Schema: public; Owner: sumoApiUser
--

ALTER TABLE ONLY public.bout
    ADD CONSTRAINT winner FOREIGN KEY (winner_id) REFERENCES public.rikishi(id) NOT VALID;


-- Completed on 2020-08-21 23:00:34

--
-- PostgreSQL database dump complete
--


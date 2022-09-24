--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

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

ALTER TABLE IF EXISTS ONLY banker.transactions DROP CONSTRAINT IF EXISTS "FK_transactions__users";
ALTER TABLE IF EXISTS ONLY banker.transactions DROP CONSTRAINT IF EXISTS "FK_transactions__categories";
ALTER TABLE IF EXISTS ONLY banker.keywords DROP CONSTRAINT IF EXISTS "FK_keywords__categories";
ALTER TABLE IF EXISTS ONLY banker.categories DROP CONSTRAINT IF EXISTS "FK_categories__users";
ALTER TABLE IF EXISTS ONLY public.databasechangeloglock DROP CONSTRAINT IF EXISTS databasechangeloglock_pkey;
ALTER TABLE IF EXISTS ONLY banker.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY banker.users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE IF EXISTS ONLY banker.transactions DROP CONSTRAINT IF EXISTS transactions_reference_key;
ALTER TABLE IF EXISTS ONLY banker.transactions DROP CONSTRAINT IF EXISTS transactions_pkey;
ALTER TABLE IF EXISTS ONLY banker.keywords DROP CONSTRAINT IF EXISTS keywords_pkey;
ALTER TABLE IF EXISTS ONLY banker.categories DROP CONSTRAINT IF EXISTS categories_pkey;
DROP TABLE IF EXISTS public.databasechangeloglock;
DROP TABLE IF EXISTS public.databasechangelog;
DROP TABLE IF EXISTS banker.users;
DROP TABLE IF EXISTS banker.transactions;
DROP TABLE IF EXISTS banker.keywords;
DROP TABLE IF EXISTS banker.categories;
DROP TYPE IF EXISTS banker.transaction_status;
DROP EXTENSION IF EXISTS "uuid-ossp";
DROP SCHEMA IF EXISTS banker;
--
-- Name: banker; Type: SCHEMA; Schema: -; Owner: banker-user
--

CREATE SCHEMA banker;


ALTER SCHEMA banker OWNER TO "banker-user";

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: transaction_status; Type: TYPE; Schema: banker; Owner: banker-user
--

CREATE TYPE banker.transaction_status AS ENUM (
    'DONE',
    'DISCARDED',
    'SKIPPED'
);


ALTER TYPE banker.transaction_status OWNER TO "banker-user";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: banker; Owner: banker-user
--

CREATE TABLE banker.categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(200) NOT NULL,
    icon character varying(200) NOT NULL,
    color character varying(200) NOT NULL,
    user_fk uuid NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE banker.categories OWNER TO "banker-user";

--
-- Name: keywords; Type: TABLE; Schema: banker; Owner: banker-user
--

CREATE TABLE banker.keywords (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(200) NOT NULL,
    category_fk uuid NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE banker.keywords OWNER TO "banker-user";

--
-- Name: transactions; Type: TABLE; Schema: banker; Owner: banker-user
--

CREATE TABLE banker.transactions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    reference text NOT NULL,
    amount numeric NOT NULL,
    description character varying(5000) NOT NULL,
    currency character varying(3) NOT NULL,
    date timestamp without time zone NOT NULL,
    user_fk uuid NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    status banker.transaction_status NOT NULL,
    category_fk uuid,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE banker.transactions OWNER TO "banker-user";

--
-- Name: users; Type: TABLE; Schema: banker; Owner: banker-user
--

CREATE TABLE banker.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying(200) NOT NULL,
    last_name character varying(200) NOT NULL,
    password character varying(500) NOT NULL,
    email character varying(300) NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    currency character varying(3) DEFAULT 'HRK'::character varying NOT NULL
);


ALTER TABLE banker.users OWNER TO "banker-user";

--
-- Name: databasechangelog; Type: TABLE; Schema: public; Owner: banker-user
--

CREATE TABLE public.databasechangelog (
    id character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    filename character varying(255) NOT NULL,
    dateexecuted timestamp without time zone NOT NULL,
    orderexecuted integer NOT NULL,
    exectype character varying(10) NOT NULL,
    md5sum character varying(35),
    description character varying(255),
    comments character varying(255),
    tag character varying(255),
    liquibase character varying(20),
    contexts character varying(255),
    labels character varying(255),
    deployment_id character varying(10)
);


ALTER TABLE public.databasechangelog OWNER TO "banker-user";

--
-- Name: databasechangeloglock; Type: TABLE; Schema: public; Owner: banker-user
--

CREATE TABLE public.databasechangeloglock (
    id integer NOT NULL,
    locked boolean NOT NULL,
    lockgranted timestamp without time zone,
    lockedby character varying(255)
);


ALTER TABLE public.databasechangeloglock OWNER TO "banker-user";

--
-- Data for Name: categories; Type: TABLE DATA; Schema: banker; Owner: banker-user
--

COPY banker.categories (id, name, icon, color, user_fk, is_deleted, created_at) FROM stdin;
f817c82a-9d68-44f2-8d6c-4ad8d8655305	wef	IconCar	orange	5620c83c-3b66-40f3-a39a-75fd72dbd161	t	2022-06-17 21:28:24.666555
2d60f7b9-413a-4660-8671-f4ccb0f3d755	test	IconCar	blue	5620c83c-3b66-40f3-a39a-75fd72dbd161	t	2022-06-17 21:28:24.666555
972fcd3d-a29b-4b9c-b965-dce6c7ddb774	Bars	IconCoffee	blue	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	2022-06-17 21:28:24.666555
a6e0d1b4-0363-484e-aa8f-e006851aa91d	Loans	IconBuildingBank	gray	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	2022-06-17 21:28:24.666555
e73616ca-7c4e-4105-808e-f9ffef14e515	Rent	IconHome	green	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	2022-06-17 21:28:24.666555
0d69125c-d5c4-4fa2-b722-722714bb894d	Restaurants	IconPizza	orange	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	2022-06-17 21:28:24.666555
4487ee24-7867-4dec-beb5-08d3e6e3ba79	Subscriptions	IconRotateClockwise	red	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	2022-06-17 21:28:24.666555
d7e723e3-566f-41f6-b5ee-9fc11378bd13	Transport	IconCar	dark	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	2022-06-17 21:28:24.666555
a24f655e-6508-409c-a580-4e4a28895f64	Utilities	IconBolt	yellow	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	2022-06-17 21:28:24.666555
f9280f8a-49ed-40ad-8fba-208382c36613	Groceries	IconShoppingCart	pink	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	2022-06-17 21:28:24.666555
5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	Bank Fees	IconCoin	cyan	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	2022-06-17 21:28:24.666555
00515f3e-9df1-495b-8c74-a19ff094edae	Clothes 	IconShirt	lime	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	2022-06-17 21:28:24.666555
778a317e-d02c-44c0-9e3d-8c6ff156064d	Withdrawals	IconCash	pink	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	2022-06-17 21:28:24.666555
157e4bf2-c34c-470f-9a17-3e4421562f33	Restaurants	IconPizza	orange	8e231b08-5cf7-46d7-9910-07e7343fa013	f	2022-06-19 17:23:46.542409
ed28486a-c1b8-426d-932a-71835daefad4	Groceries	IconShoppingCart	red	8e231b08-5cf7-46d7-9910-07e7343fa013	f	2022-06-19 17:24:16.788967
cf96ec31-c4a5-46d3-8d0b-1d67fd9f841c	Tech	IconCoin	gray	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	2022-06-19 17:29:53.824021
\.


--
-- Data for Name: keywords; Type: TABLE DATA; Schema: banker; Owner: banker-user
--

COPY banker.keywords (id, name, category_fk, is_deleted, created_at) FROM stdin;
f37ec2bb-6816-4ecb-a8d2-15ff750632a6	wef	f817c82a-9d68-44f2-8d6c-4ad8d8655305	f	2022-06-17 21:28:24.666555
0f07f0c6-0f6c-4046-9bba-5b35d796b5c8	naknada za kreditni transfer	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	f	2022-06-19 07:09:38.270343
b15d108a-093c-436a-97be-3706518dfb9f	naknada za podizanje	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	f	2022-06-19 07:09:38.270343
3f4ec804-6e8c-4ca9-afe9-513d56c66e63	c & a	00515f3e-9df1-495b-8c74-a19ff094edae	f	2022-06-19 07:09:42.479915
9748b5b4-5fa1-44dc-aee2-4ec5f57f9615	podizanje gotovog novca	778a317e-d02c-44c0-9e3d-8c6ff156064d	f	2022-06-19 07:35:38.850575
8231cbb1-c7e6-4ec0-9803-c8ad2a7ec7f9	glovo	157e4bf2-c34c-470f-9a17-3e4421562f33	f	2022-06-19 17:23:46.542409
03f70e88-91d3-49f1-8dae-a547b50fafc0	wolt	157e4bf2-c34c-470f-9a17-3e4421562f33	f	2022-06-19 17:23:46.542409
6141ec14-012c-44d1-a268-945791d8b28c	tisak	ed28486a-c1b8-426d-932a-71835daefad4	f	2022-06-19 17:24:16.788967
0adba42b-dcb1-4a93-a271-d09ba623081d	hgspot	cf96ec31-c4a5-46d3-8d0b-1d67fd9f841c	f	2022-06-19 17:29:53.824021
f06bd59c-694e-4c7b-b252-8aa15c7f7b1f	avant gastro	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	f	2022-06-18 09:22:56.151007
f8296c58-1a21-4436-bb00-468fe43bc7b0	jadranka	e73616ca-7c4e-4105-808e-f9ffef14e515	f	2022-06-18 09:23:16.510113
60800917-896c-419e-a4ac-50f6a50217f8	ali kebaba	0d69125c-d5c4-4fa2-b722-722714bb894d	f	2022-06-18 09:23:20.645988
5d927bf5-adda-4231-8f36-f7f4ad83ad50	batak	0d69125c-d5c4-4fa2-b722-722714bb894d	f	2022-06-18 09:23:20.645988
b5686ae7-e663-4de2-89f6-4db289ef777a	burger king	0d69125c-d5c4-4fa2-b722-722714bb894d	f	2022-06-18 09:23:20.645988
59566f7f-26a8-45af-932e-0839c1624fd3	foodie	0d69125c-d5c4-4fa2-b722-722714bb894d	f	2022-06-18 09:23:20.645988
fd574c93-c81e-481d-90a2-3b6adbff09be	glovo	0d69125c-d5c4-4fa2-b722-722714bb894d	f	2022-06-18 09:23:20.645988
ca4be03d-a0be-4b24-928b-931715fba00a	kfc	0d69125c-d5c4-4fa2-b722-722714bb894d	f	2022-06-18 09:23:20.645988
65da0c8b-9c87-406a-a4ce-60ef95f92176	mcdonalds	0d69125c-d5c4-4fa2-b722-722714bb894d	f	2022-06-18 09:23:20.645988
561aa398-428a-4768-8651-0493c6f5af4e	mlinar	0d69125c-d5c4-4fa2-b722-722714bb894d	f	2022-06-18 09:23:20.645988
36c10f5b-1aa6-4065-8320-94b5ef566ab5	pasta fasta	0d69125c-d5c4-4fa2-b722-722714bb894d	f	2022-06-18 09:23:20.645988
71548548-ea98-411b-be6c-30fc9e88a8ba	wolt	0d69125c-d5c4-4fa2-b722-722714bb894d	f	2022-06-18 09:23:20.645988
2542ea69-e202-44c3-bf5f-b897a71b4315	glovo prime	4487ee24-7867-4dec-beb5-08d3e6e3ba79	f	2022-06-18 09:23:26.027292
94e22142-8d47-4c22-ae6c-9ca64e45053d	hbo max	4487ee24-7867-4dec-beb5-08d3e6e3ba79	f	2022-06-18 09:23:26.027292
2b289e23-878c-4539-93ea-c6db7bb82cf3	netflix	4487ee24-7867-4dec-beb5-08d3e6e3ba79	f	2022-06-18 09:23:26.027292
5f44df6f-eaef-47e6-892d-7c3679c3d2e6	youtube music	4487ee24-7867-4dec-beb5-08d3e6e3ba79	f	2022-06-18 09:23:26.027292
3daec801-28b3-4764-b40c-c13205c57336	bolt	d7e723e3-566f-41f6-b5ee-9fc11378bd13	f	2022-06-18 09:23:36.505255
924971fb-ce0a-45e8-bc62-50f2ace3ba7c	cazmatrans	d7e723e3-566f-41f6-b5ee-9fc11378bd13	f	2022-06-18 09:23:36.505255
9557e32e-fb2f-4aa9-87c7-f242c1756a57	hz	d7e723e3-566f-41f6-b5ee-9fc11378bd13	f	2022-06-18 09:23:36.505255
4d846791-140a-4e30-9d87-281e257a421c	uber	d7e723e3-566f-41f6-b5ee-9fc11378bd13	f	2022-06-18 09:23:36.505255
38a353ae-c7fe-41aa-9980-3a7b67a9aa5e	a1 hrvatska	a24f655e-6508-409c-a580-4e4a28895f64	f	2022-06-18 09:23:43.109225
442fe21f-6684-4fa3-8da2-a575c2ae0757	elektra	a24f655e-6508-409c-a580-4e4a28895f64	f	2022-06-18 09:23:43.109225
e7a7e718-f369-42ac-9940-3466f6a8aad0	hrvatski telekom	a24f655e-6508-409c-a580-4e4a28895f64	f	2022-06-18 09:23:43.109225
9fc734c4-0efb-47c9-90f3-b9bb7ac5e95f	toplinarstvo	a24f655e-6508-409c-a580-4e4a28895f64	f	2022-06-18 09:23:43.109225
ff5d568f-b31b-48bf-a179-057962f323bc	zagrebački holding	a24f655e-6508-409c-a580-4e4a28895f64	f	2022-06-18 09:23:43.109225
42ffb76f-7f24-49e1-97e8-304318834ade	coco zagreb	f9280f8a-49ed-40ad-8fba-208382c36613	f	2022-06-18 09:24:57.296415
4af22964-7344-4834-a028-ecafb1090f3a	ina zagreb	f9280f8a-49ed-40ad-8fba-208382c36613	f	2022-06-18 09:24:57.296415
0dc4d40d-6619-4268-a2e8-79721045b004	inovine	f9280f8a-49ed-40ad-8fba-208382c36613	f	2022-06-18 09:24:57.296415
44213aee-4d5f-4c8f-a120-05dd84e090a7	kaufland	f9280f8a-49ed-40ad-8fba-208382c36613	f	2022-06-18 09:24:57.296415
88aff883-b1e7-4db4-b412-228466d0b135	konzum	f9280f8a-49ed-40ad-8fba-208382c36613	f	2022-06-18 09:24:57.296415
4517c9e0-295a-4f36-a9d7-9c76b09f678e	spar	f9280f8a-49ed-40ad-8fba-208382c36613	f	2022-06-18 09:24:57.296415
6439f014-6438-453a-8ee0-a603477b6315	tisak	f9280f8a-49ed-40ad-8fba-208382c36613	f	2022-06-18 09:24:57.296415
34214285-3f30-49f6-9483-1f0e15986849	tobacco	f9280f8a-49ed-40ad-8fba-208382c36613	f	2022-06-18 09:24:57.296415
da3be835-9549-4411-939a-82d174b7b06d	lidl	f9280f8a-49ed-40ad-8fba-208382c36613	f	2022-06-18 09:24:57.296415
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: banker; Owner: banker-user
--

COPY banker.transactions (id, reference, amount, description, currency, date, user_fk, is_deleted, status, category_fk, created_at) FROM stdin;
6efe1ab8-e21e-4aa2-b73d-f828e1f262e8	B160220010332218	126.9000000000000	Kupovina hz putnicki prijevoz zagreb hr domagoj vuković 	HRK	2021-12-31 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
b64f6a37-dc6a-4d43-9401-54433095aea7	B160220020046323	30.70000000000000	Kupovina bolt.eu/c/2201021023 tallinn ee domagoj vuković 	HRK	2022-01-01 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
4dd274fb-ca7b-4895-b5b4-922fecd3b5c0	B160220020068338	62	Kupovina glovo 02jan zalng6esd barcelona es domagoj vuković 	HRK	2022-01-01 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
e34134b4-2dc6-44ba-aa94-878dbc4711bc	B160220030206533	56	Kupovina glovo 03jan zaqcgjvle barcelona es domagoj vuković 	HRK	2022-01-02 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
f7108d09-dec7-4ab9-80ca-bb170fd78b0d	B160220040017988	59.99000000000000	Kupovina google *youtube music g.co/helppay# gb domagoj vuković 	HRK	2022-01-03 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
37021714-8817-4098-a68d-165b1f43dd5c	B160220040295455	90	Kupovina pbz9tobacco zagreb hr domagoj vuković 	HRK	2022-01-03 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
bd4e0b20-3202-42c0-ba9b-5460857a4a92	B160220050274240	69	Kupovina glovo 05jan zazllg8d9 barcelona es domagoj vuković 	HRK	2022-01-04 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
0a53ef3f-f2d2-45bd-b9ab-4152a0570a91	B160220060144976	53	Kupovina glovo 06jan zalp5apsw barcelona es domagoj vuković 	HRK	2022-01-05 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
e163242b-1587-4314-89dc-9e654a6413d5	B160220070217699	125	Kupovina hgspot grupa d.o.o. zagreb hr domagoj vuković 	HRK	2022-01-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
f4d5bb21-0b74-42d4-9645-77ac55bce908	B160220070227105	207.6600000000000	Kupovina spar87062 zagreb hr domagoj vuković 	HRK	2022-01-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
fffd817e-50e1-4b9e-b30c-8dce39d2a509	B160220070441946	62	Kupovina glovo 07jan zaly1bdw1 barcelona es domagoj vuković 	HRK	2022-01-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
7fd0f47f-c89c-4b98-92a5-f96e59c922fe	B160220070442959	61	Kupovina glovo 07jan zasgpjetg barcelona es domagoj vuković 	HRK	2022-01-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
ec5cab90-7c67-4ae6-851c-85db936a108e	B160220080315951	33	Kupovina glovo 08jan zakxwv1pn barcelona es domagoj vuković 	HRK	2022-01-07 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
a2228022-5a5e-40a1-95eb-7783dd7911f7	B160220090187080	54	Kupovina glovo 09jan zaw21pl1s barcelona es domagoj vuković 	HRK	2022-01-08 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
88a9026f-52d5-42b9-bec1-3907d5093780	B160220100006648	68	Kupovina ina zagreb dugave isto zagreb hr domagoj vuković 	HRK	2022-01-09 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
26806ee5-ca5e-4ed7-8f88-c814f44bfe97	B160220100007012	19.99000000000000	Kupovina glovo glovo prime barcelona es domagoj vuković 	HRK	2022-01-09 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
8f7b9a80-9845-4d2a-861d-6516a8fb23e0	B160220100146907	28.20000000000000	Kupovina spar8702 zagreb hr domagoj vuković 	HRK	2022-01-09 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
f509d3aa-c325-40f8-8f69-8b77dd940bb9	B160220110046854	10	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-01-10 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
9903a0a3-1278-42fd-a013-6cffd11b5137	B160220110119806	27.41000000000000	Kupovina spar8702 zagreb hr domagoj vuković 	HRK	2022-01-10 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
e130114c-bd33-4247-97a3-a4f56cc660be	B160220110345517	62	Kupovina glovo 11jan zajcmbkul barcelona es domagoj vuković 	HRK	2022-01-10 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
a01de95a-162d-4dc1-a6e1-d32317ecde91	B160220120254299	78	Kupovina glovo 12jan za1zt51cp barcelona es domagoj vuković 	HRK	2022-01-11 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
966f1c34-fa1a-4466-b4c2-197e8651bcb0	B160220120298417	72	Kupovina pbz9tobacco zagreb hr domagoj vuković 	HRK	2022-01-11 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
2516d69c-03e0-4d1f-ade3-21b4b54206ad	B160220130069095	53.50000000000000	Kupovina bolt.eu/c/2201130955 tallinn ee domagoj vuković 	HRK	2022-01-12 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
8413bf43-a2d1-48fd-8b72-09ce3847a58f	B160220130116542	37.12000000000000	Kupovina spar8702 zagreb hr domagoj vuković 	HRK	2022-01-12 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
dddec763-fbc8-48ef-b2f9-24d13cb4172a	B160220130357388	68.90000000000001	Kupovina pbz9tobacco zagreb hr domagoj vuković 	HRK	2022-01-12 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
9567bae8-0b3a-471a-9143-c44282e4041c	B160220130373379	60	Kupovina wolt zagreb hr domagoj vuković 	HRK	2022-01-12 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
2e43a2e6-ad59-46ea-97c4-4e6fd7698629	B160220140119450	54	Kupovina pbztmcdonalds zagreb hr domagoj vuković 	HRK	2022-01-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
154b02ae-e8c2-4108-975e-4b661daee272	B160220140137921	7	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-01-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
b1c6aaca-f46b-4320-a4af-87d9c53f5651	B160220140398604	64	Kupovina glovo 14jan zagxjrxpu barcelona es domagoj vuković 	HRK	2022-01-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
a63cb15b-12b1-4bfd-bba7-21908e626b33	B160220150325155	73	Kupovina glovo 15jan zarlguudj barcelona es domagoj vuković 	HRK	2022-01-14 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
855a289d-aa96-488f-ae21-ba04aa35c6c5	B160220160135644	296.5800000000000	Kupovina spar87062 zagreb hr domagoj vuković 	HRK	2022-01-15 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
3b30e91b-4c15-4dd5-a1fb-526db76d0fec	B160220170348953	274.6600000000000	Kupovina kinguin.net internet hk domagoj vuković usd 40,38 	HRK	2022-01-16 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
8dc37e2b-0707-4bc5-b243-bb66fd9f942c	B160220170397439	42	Kupovina glovo 17jan zaacbqvc1 barcelona es domagoj vuković 	HRK	2022-01-16 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
a90e49c6-730b-49ab-ad05-feee8d29a6c5	B160220180074888	68	Kupovina pbz9tobacco zagreb hr domagoj vuković 	HRK	2022-01-17 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
7864055f-aae0-49f5-8c39-ce4a8044bbe1	B160220180263725	80.40000000000001	Kupovina gradska ljekarna zagrebzagreb hr domagoj vuković 	HRK	2022-01-17 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
e6faeb47-b893-40d5-94f5-c9488bdd7b77	B160220180317111	73	Kupovina glovo 18jan zaq11lhbd barcelona es domagoj vuković 	HRK	2022-01-17 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
a93d87ec-badb-4058-98a1-37735b6e436e	B160220190189926	100	Kupovina glovo 19jan zan1lanel barcelona es domagoj vuković 	HRK	2022-01-18 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
b928b119-0984-49d2-8d4a-2e44fada763c	B160220200353840	45.57000000000000	Kupovina hbo europe s.r.o prague cz domagoj vuković eur 5,99 	HRK	2022-01-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
e679c77d-3948-4427-b5a5-ae18a87cc96c	B160220200363945	103	Kupovina wolt zagreb hr domagoj vuković 	HRK	2022-01-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
cc33ba5a-c630-451d-83a4-1d42c18b4e3d	B160220220003883	71.98999999999999	Kupovina ina zagreb dugave isto zagreb hr domagoj vuković 	HRK	2022-01-21 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
51f8fef1-dd26-43ad-95ea-6fc75e36ab2f	B160220220244290	65	Kupovina glovo 22jan zatnkxwxp barcelona es domagoj vuković 	HRK	2022-01-21 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
22c754fc-3f34-427f-8c29-9dd0652b0c6c	B160220230131645	66	Kupovina wolt zagreb hr domagoj vuković 	HRK	2022-01-22 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
17187d3c-6483-43c3-a9e7-2086a7ec0f3e	B160220230220388	89.70000000000000	Kupovina pbz9tobacco zagreb hr domagoj vuković 	HRK	2022-01-22 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
8eb0871a-8ead-4d66-ad1c-5769f6839681	B160220240223269	71	Kupovina glovo 24jan za11xzp8w barcelona es domagoj vuković 	HRK	2022-01-23 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
b3eda8bb-4406-4058-8468-4bbc58d9f70f	B160220250134012	40.50000000000000	Kupovina gradska ljekarna zagrebzagreb hr domagoj vuković 	HRK	2022-01-24 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
bcf6dcf7-0077-4042-a7a2-481e4e36da69	B160220250138120	154.6200000000000	Kupovina spar87062 zagreb hr domagoj vuković 	HRK	2022-01-24 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
d8cb6a31-9c41-41c5-b819-4808d7c56e1c	B160220260036223	68	Kupovina pbz9tobacco zagreb hr domagoj vuković 	HRK	2022-01-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
071ae490-6d35-4c98-973b-2a89887e36c7	B160220260044283	64.80000000000000	Kupovina bolt.eu/c/2201260908 tallinn ee domagoj vuković 	HRK	2022-01-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
c3a5030d-5b55-41f1-9051-e3ce1fd77814	B160220260101534	31.20000000000000	Kupovina foodie zagreb hr domagoj vuković 	HRK	2022-01-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
5d0befcb-5ee6-4f12-85f7-51f16ecb4a68	B160220260110000	7	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-01-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
666c2e75-e762-4df0-af0c-be3496e556d9	B160220260129900	18	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-01-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
c7125618-c180-4c93-ac77-8cefe4e34401	B160220260290612	18	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-01-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
bfd3a59c-ac57-4c88-9d3e-d8f8284defd6	B160220260340626	70	Kupovina pbztmcdonalds zagreb hr domagoj vuković 	HRK	2022-01-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
7a648d25-468f-4496-9117-34dbd0961595	B160220260348377	55.20000000000000	Kupovina bolt.eu/c/2201262147 tallinn ee domagoj vuković 	HRK	2022-01-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
98284a8e-fd36-4da2-bca6-1d517111ce50	B160220270048120	48.40000000000000	Kupovina bolt.eu/c/2201270913 tallinn ee domagoj vuković 	HRK	2022-01-26 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
affd952b-a976-4cc5-b3e9-00c6181657bd	B160220270101207	42.23000000000000	Kupovina spar8702 zagreb hr domagoj vuković 	HRK	2022-01-26 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
3609de66-6561-4855-bfb5-07c7d8a12b57	B160220270253690	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-01-26 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
560e5308-9988-4bb1-8a95-0c873c6b38e7	B160220270273331	54.90000000000000	Kupovina ubr* pending.uber.com amsterdam nl domagoj vuković 	HRK	2022-01-26 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
7f9238d8-aafe-46c4-9841-fd40bb797404	B160220270303996	65	Kupovina wolt zagreb hr domagoj vuković 	HRK	2022-01-26 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
68bcfc42-7d9c-4de9-90dd-cc099ab573ae	B160220280112699	39.20000000000000	Kupovina foodie zagreb hr domagoj vuković 	HRK	2022-01-27 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
ce7df6cf-786b-45c1-b4a0-e10dd5eae66d	B160220280124937	41.99000000000000	Kupovina pbztinovine zagreb hr domagoj vuković 	HRK	2022-01-27 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
98488e85-0cce-48db-8ed8-e18f4611f339	B160220280296830	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-01-27 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
4802e856-816f-496b-b51a-7d4927106b60	B160220290232117	34.90000000000000	Kupovina bolt.eu/c/2201291449 tallinn ee domagoj vuković 	HRK	2022-01-28 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
46d880ce-3302-48d0-a0e4-9875637be10f	B160220290283204	29.10000000000000	Kupovina bolt.eu/c/2201291706 tallinn ee domagoj vuković 	HRK	2022-01-28 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
0bc98d6d-368c-4d1c-bbb5-5902ae37a2f5	B160220290290804	14	Naknada za podizanje got. novca - deb. kart. na bankomatu - bankomat dr. pružatelja u rh b160220290290803 	HRK	2022-01-28 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
74e1fff3-9b8f-4bb9-85c1-3f0e5b217755	B160220310093922	22.45000000000000	Kupovina spar8702 zagreb hr domagoj vuković 	HRK	2022-01-30 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
61511438-3fef-471c-be2d-1ab44cf92a4b	B160220310119144	15	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-01-30 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
202dbc4f-1c84-4754-9657-7975993fee3d	B160220320090521	22	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-01-31 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
7e43ddf5-2de9-4a17-bc61-3419f915aa12	B160220320139183	74	Kupovina glovo 01feb zaqqcmmtl barcelona es domagoj vuković 	HRK	2022-01-31 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
d70d28af-d067-48b9-9c64-b832e876c431	B160220320177637	136	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-01-31 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
37f395df-96d9-400e-96bc-07463bf2ebc2	B160220320335479	67	Kupovina glovo 01feb za41mv1te barcelona es domagoj vuković 	HRK	2022-01-31 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
589dfecc-9aa9-4387-8fa9-cd389c86bfe9	B160220330180771	75	Kupovina glovo 02feb za9lsclqb barcelona es domagoj vuković 	HRK	2022-02-01 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
90fdaa3f-8777-4450-a99d-c0180c5e803d	B160220340107528	55	Kupovina pbztmcdonalds zagreb hr domagoj vuković 	HRK	2022-02-02 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
1bd5945f-90e3-4a96-a5b4-05fdbeda98d9	B160220350002863	68	Kupovina ina zagreb dugave isto zagreb hr domagoj vuković 	HRK	2022-02-03 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
2f8d802b-3330-4cc0-9428-6da313951256	B160220350022721	59.99000000000000	Kupovina google *youtube music g.co/helppay# gb domagoj vuković 	HRK	2022-02-03 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
86a59c55-f9e0-4e09-852d-ea7465394154	B160220350118314	19.56000000000000	Kupovina spar8702 zagreb hr domagoj vuković 	HRK	2022-02-03 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
f3803ea6-094a-4830-b1b1-a1ff99690dd4	B160220350356812	54	Kupovina glovo 04feb za1uep9dy barcelona es domagoj vuković 	HRK	2022-02-03 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
83bfb83d-7ff4-4a5f-8f60-cf59b3debc05	B160220360151332	43	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-02-04 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
3e74bb09-928d-47c4-9333-72c6c49f2ebc	B160220360290728	65	Kupovina glovo 05feb za1qvtwxs barcelona es domagoj vuković 	HRK	2022-02-04 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
774642e3-ce6b-4df3-8c62-fcf223c600d5	B160220370205969	41.98000000000000	Kupovina ina zagreb dugave isto zagreb hr domagoj vuković 	HRK	2022-02-05 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
c39f212d-f171-49cc-92e8-7292c175a63c	B160220380105365	55	Kupovina pbztmcdonalds zagreb hr domagoj vuković 	HRK	2022-02-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
22b3e5d4-3084-4e63-80a1-aae1ed00d145	B160220380118077	3.500000000000000	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-02-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
6cad08d1-71d5-4df4-9426-9f3fa88c1492	B160220290290803	200	Podizanje gotovog novca - debitnom karticom na bankomatu - bankomat drugih pružatelja u rhbarcev trg 16 zagreb hr domagoj vuković 	HRK	2022-01-28 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-06-17 21:28:24.666555
8b6909db-737b-49a2-9e10-b420ebf73dbb	M160220380037603	1750	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) jadranka marković hr9423600003116214470 hr00 02-22 najamnina 02-22 	HRK	2022-02-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	e73616ca-7c4e-4105-808e-f9ffef14e515	2022-06-17 21:28:24.666555
c9cfdde9-d460-4656-90a7-e2b790f3d226	B160220380385129	63	Kupovina glovo 07feb zalsq48us barcelona es domagoj vuković 	HRK	2022-02-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
720291aa-5fe0-4ec5-9596-0116868be30b	B160220390039372	117.8000000000000	Kupovina bolt.eu/c/2202080827 tallinn ee domagoj vuković 	HRK	2022-02-07 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
c5d17f06-24a0-422d-856b-ddc57c727207	B160220390122637	1000	Podizanje gotovog novca - debitnom karticom na bankomatu banke jankomir 33 zagreb domagoj vuković 	HRK	2022-02-07 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-06-17 21:28:24.666555
8421b8ad-03a9-47d4-b7aa-3bcfe7ab867f	B160220390127541	42.32000000000000	Kupovina spar8702 zagreb hr domagoj vuković 	HRK	2022-02-07 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
b7eea536-da40-4359-a1fd-157d395b9787	B160220390174874	10	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-02-07 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
12487b1c-2e94-44cd-bca0-4ee60f1e3cda	B160220390402112	11.50000000000000	Naknada za podizanje got. novca - deb. kart. na bankomatu - bankomat dr. pružatelja u rh b160220390402111 	HRK	2022-02-07 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
c20676ae-e223-42b1-9892-f3c48a49a783	B160220390406378	61	Kupovina glovo 08feb zalgvtxnl barcelona es domagoj vuković 	HRK	2022-02-07 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
0ba03772-ccf4-4a52-9ed1-a97849281d29	B160220400142792	15	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-02-08 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
e5dd549d-1fa0-4dc5-9442-551d22a4aa50	B160220400324096	30	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-02-08 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
5fb77b7e-dd85-4091-a91b-b496d7cab49e	B160220400405238	61	Kupovina glovo 09feb zaylhukwd barcelona es domagoj vuković 	HRK	2022-02-08 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
1bd59df3-fc0b-4554-9f3b-f0756d37a7bf	B160220410002924	19.99000000000000	Kupovina glovo glovo prime barcelona es domagoj vuković 	HRK	2022-02-09 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
5d01cd95-8cc1-4059-bfb2-549f8aab32a7	B160220410060917	55.45000000000000	Kupovina uber * pending amsterdam nl domagoj vuković 	HRK	2022-02-09 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
d376f32d-bc22-4815-8c48-402220a1c573	B160220410122438	48.20000000000000	Kupovina bolt.eu/c/2202090938 tallinn ee domagoj vuković 	HRK	2022-02-09 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
edce395a-c8be-45f0-a3b1-1e2d35ac759d	B160220410219393	23.55000000000000	Kupovina spar8702 zagreb hr domagoj vuković 	HRK	2022-02-09 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
4c60afb7-6519-4698-9a4c-96b5ba962a3b	B160220410409346	112	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-02-09 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
f24dbbed-47a1-4385-9908-4829aed77354	B160220390402111	100	Podizanje gotovog novca - debitnom karticom na bankomatu - bankomat drugih pružatelja u rhbarcev trg 16 zagreb hr domagoj vuković 	HRK	2022-02-07 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-06-17 21:28:24.666555
37864c67-0d3c-4be1-9a6d-062287aae072	B160220410461114	64.50000000000000	Kupovina glovo 10feb zahpjmssn barcelona es domagoj vuković 	HRK	2022-02-09 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
c800b747-400e-4195-9e98-1eb03216359b	B160220410463560	48.40000000000000	Kupovina bolt.eu/c/2202102125 tallinn ee domagoj vuković 	HRK	2022-02-09 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
f9239d79-d02f-4ec6-ac15-5a3fe2bbaa53	B160220420333889	75	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-02-10 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
a43dcaeb-de4b-401d-ba87-34b11fead22d	B160220420362466	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-02-10 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
648a0532-c96b-4e26-8cfa-e3ed2e21cc38	B160220420441535	45	Kupovina glovo 11feb zat5huhk7 barcelona es domagoj vuković 	HRK	2022-02-10 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
378e31d0-fdb1-47e0-a938-5a94a6affcde	B160220420459668	14	Naknada za podizanje got. novca - deb. kart. na bankomatu - bankomat dr. pružatelja u rh b160220420459667 	HRK	2022-02-10 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
259e65f9-7f00-4dc4-8c72-64f373d12a3a	B160220430328245	64.50000000000000	Kupovina glovo 12feb zaxqeqrln barcelona es domagoj vuković 	HRK	2022-02-11 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
a4da5b17-b997-447a-93e4-d3b3e28b96f7	B160220440094076	66	Kupovina glovo 13feb za7vzzfad barcelona es domagoj vuković 	HRK	2022-02-12 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
1cc2e5a8-6f38-4956-93f6-b2fcfa7667fa	B160220440249220	61	Kupovina glovo 13feb zap1t8yll barcelona es domagoj vuković 	HRK	2022-02-12 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
a0238bc9-8a61-4b1b-b855-730c6440a6c0	B160220450082718	58.90000000000000	Kupovina bolt.eu/c/2202141005 tallinn ee domagoj vuković 	HRK	2022-02-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
25d71e6f-6759-4bfb-815a-c08978eb8061	B160220450147787	11	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-02-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
cd912778-4c09-4182-89c6-7e0b3ec0cd53	B160220450238864	47.93000000000000	Kupovina spar8702 zagreb hr domagoj vuković 	HRK	2022-02-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
3f94d627-fb94-49db-91b0-d6f8d87de212	B160220450239880	68	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-02-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
841a005c-36dd-43b4-99ff-4242cb11856d	B160220450446545	57	Kupovina glovo 14feb zat7hbe3u barcelona es domagoj vuković 	HRK	2022-02-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
491a01f0-4d32-4be5-89f8-5aa626dd84eb	B160220460044407	11	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-02-14 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
610891c9-e9e1-4c16-87b6-364681cd793f	B160220460146702	11	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-02-14 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
299528f7-1a27-4a0b-b5eb-8fb171469f32	B160220460371416	73	Kupovina glovo 15feb za5gnlygt barcelona es domagoj vuković 	HRK	2022-02-14 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
8ff6ca48-2d45-49ea-9e53-9e55cbb38cac	B160220470120035	39.20000000000000	Kupovina foodie zagreb hr domagoj vuković 	HRK	2022-02-15 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
e89d7fde-1a60-42b8-9338-6efc5e821235	B160220470126409	18	Kupovina pbztmcdonalds zagreb hr domagoj vuković 	HRK	2022-02-15 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
ee47429f-5560-4675-82c6-d38697f53066	B160220480328116	55	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-02-16 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
ca8b49b0-c550-4de0-81ac-8807dd87512a	B160220480328359	55	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-02-16 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
8bf772cd-6c79-45b9-8175-fdaec3c5a5f9	B160220420459667	200	Podizanje gotovog novca - debitnom karticom na bankomatu - bankomat drugih pružatelja u rhbarcev trg 16 zagreb hr domagoj vuković 	HRK	2022-02-10 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-06-17 21:28:24.666555
7c6ba391-acb8-4bbc-8781-bf9751c0d5d0	B160220490120083	62	Kupovina burger king z centar zagreb hr domagoj vuković 	HRK	2022-02-17 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
2ed18fdd-03ff-4a00-901f-0b3a57fc966b	B160220490278665	71.50000000000000	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-02-17 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
791ab114-e27d-4a9f-b31f-322e44fd79f7	B160220490399429	64.50000000000000	Kupovina glovo 18feb zas4hbamh barcelona es domagoj vuković 	HRK	2022-02-17 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
fc6c6148-7a66-4f8a-b866-a70a03c61982	B160220500139972	209.2700000000000	Kupovina spar87062 zagreb hr domagoj vuković 	HRK	2022-02-18 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
1ca9baae-6508-4072-a5a6-763c3214832b	B160220510070795	45.63000000000000	Kupovina hbo europe s.r.o prague cz domagoj vuković eur 5,99 	HRK	2022-02-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
2d481d35-2c84-48bb-ab21-a0469d4fe60d	B160220510126307	23.40000000000000	Kupovina bolt operations oue tallinn ee domagoj vuković 	HRK	2022-02-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
c393602e-0cde-47bb-a826-c82020aca1e1	B160220510136264	30.60000000000000	Kupovina bolt operations oue tallinn ee domagoj vuković 	HRK	2022-02-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
0390e2c1-0cdd-4b82-a294-62749a9c01bf	B160220510169715	38	Kupovina bolt operations oue tallinn ee domagoj vuković 	HRK	2022-02-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
d587f0ef-da47-44bc-abe0-d0fe98e078f4	B160220520311288	62	Kupovina burger king z centar zagreb hr domagoj vuković 	HRK	2022-02-20 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
dfcb8ceb-2adc-4af2-9591-e712987521ea	B160220550391637	43	Kupovina glovo 24feb zat3nydxl barcelona es domagoj vuković 	HRK	2022-02-23 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
09f32b72-e568-4458-88d0-fbb8f8af162e	B160220560284353	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-02-24 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
85237816-6662-4a06-bbd2-348711c4e0c6	B160220560350384	110	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-02-24 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
af996bed-ab80-40d0-8e99-c6b2bb98e441	B160220570195155	14	Naknada za podizanje got. novca - deb. kart. na bankomatu - bankomat dr. pružatelja u rh b160220570195154 	HRK	2022-02-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
94421ed3-2e28-4ac8-90a5-f07bc1bb4c9f	B160220570200195	122.1000000000000	Kupovina spar87062 zagreb hr domagoj vuković 	HRK	2022-02-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
ebf15a36-8dc1-4415-ae71-fe03ed69d9aa	B160220630024208	59.99000000000000	Kupovina google *youtube music g.co/helppay# gb domagoj vuković 	HRK	2022-03-03 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
ec39eac9-e090-4123-92c9-ae5669fab175	B160220630206650	10	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-03 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
32313b3c-920c-4e71-ae62-f8511183d2f9	B160220630271374	23	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-03 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
0fdc432e-74bc-4e22-976f-46016df1ca53	B160220650179745	75.90000000000001	Kupovina bolt.eu/c/2203061612 tallinn ee domagoj vuković 	HRK	2022-03-05 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
b231b5ce-9eb8-402b-9ea3-ca649629ef82	B160220650195015	74.40000000000001	Kupovina bolt.eu/c/2203061711 tallinn ee domagoj vuković 	HRK	2022-03-05 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
ebc7a9d9-5fde-46e3-91a1-ec35809ad82b	B160220660389494	297.9700000000000	Kupovina spar87062 zagreb hr domagoj vuković 	HRK	2022-03-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
f8bf0b72-9ef9-4f83-a04f-0ddd02040cb0	B160220670219344	144.5000000000000	Kupovina spar87062 zagreb hr domagoj vuković 	HRK	2022-03-07 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
7f8ab88b-e08a-44be-9c3e-5e4e90bd0ad6	B160220680149550	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-08 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
71e4b175-440b-4d69-b0a9-1cb8294cc00e	B160220690003299	19.99000000000000	Kupovina glovo glovo prime barcelona es domagoj vuković 	HRK	2022-03-09 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
7f93188c-5732-4335-8506-e9d201662852	B160220690496362	85.20000000000000	Kupovina cazmatrans internet pr cazma hr domagoj vuković 	HRK	2022-03-09 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
1e416e22-c001-4043-966d-add6df78a3dd	B160220720205875	63	Kupovina glovo 13mar zan41wjhg barcelona es domagoj vuković 	HRK	2022-03-12 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
7aa80d48-5697-496c-a347-2a0575e12d3c	B160220730059982	15	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
a7dbd2fb-2777-4237-8a6a-50286f15a063	B160220730260999	34	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
9fae6c0a-81bc-4de1-9a1f-95feff50719c	B160220730324897	22.70000000000000	Kupovina bolt.eu/c/2203141716 tallinn ee domagoj vuković 	HRK	2022-03-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
6a08aa14-11b3-476e-a573-793d2219e680	B160220730338103	26	Kupovina bolt.eu/c/2203141738 tallinn ee domagoj vuković 	HRK	2022-03-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
43ed6396-5f5e-4932-96ef-abc62f3da6ee	M160220760008037	1750	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) jadranka marković hr9423600003116214470 hr00 03-22 najamnina 03-22 	HRK	2022-03-16 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	e73616ca-7c4e-4105-808e-f9ffef14e515	2022-06-17 21:28:24.666555
36232c6f-0682-4fdb-b92d-03bd8b6d3a58	B160220760151556	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-16 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
979d622c-409b-4bb4-8efc-4ee8c0894e50	B160220760209051	18	Kupovina bolt.eu/c/2203171349 tallinn ee domagoj vuković 	HRK	2022-03-16 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
967283cc-6965-4fb5-8ea8-4c740dfcbd9d	B160220760233210	18	Kupovina bolt.eu/c/2203171437 tallinn ee domagoj vuković 	HRK	2022-03-16 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
837d8ded-6268-4abc-9a2e-60bccb4d4bc0	B160220770046426	25	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-17 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
1a5621b9-d99c-4395-bdc0-7642db427838	B160220780003484	170.4000000000000	Kupovina cazmatrans internet pr cazma hr domagoj vuković 	HRK	2022-03-18 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
f45c3feb-d021-4281-bc92-3fc8941a7711	B160220780171532	36.20000000000000	Kupovina bolt.eu/c/2203191148 tallinn ee domagoj vuković 	HRK	2022-03-18 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
786e988b-b8cb-495b-9446-bd8c4baf8af2	B160220780423373	185	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-18 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
ab7c05f2-b728-494b-8a29-18f07485838a	B160220570195154	200	Podizanje gotovog novca - debitnom karticom na bankomatu - bankomat drugih pružatelja u rhbarcev trg 16 zagreb hr domagoj vuković 	HRK	2022-02-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-06-17 21:28:24.666555
dcf784ee-06c9-4cd7-a480-e7dbb7c28594	B160220790004643	35.69000000000000	Kupovina hbo max prague cz domagoj vuković eur 4,66 	HRK	2022-03-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
ec9baab8-e08b-436f-8f07-17adb03ffb2d	B160220790211491	30.90000000000000	Kupovina bolt.eu/c/2203201754 tallinn ee domagoj vuković 	HRK	2022-03-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
051d05e8-340b-4d6f-9366-215e2ddde58c	M160220800099162	40	Kreditni transfer nac. u kunama on-line bankarstvom (mobilne aplikacije) - izipay dean bozic hr6623600003247283605 hrana i piće 	HRK	2022-03-20 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
908f45ed-b652-4cd8-a324-f958c5cd9371	M160220810091913	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m160220810091909 	HRK	2022-03-21 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
84d9d6c5-7211-4c19-8e69-896eca32e24e	M160220810091946	2.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m160220810091942 	HRK	2022-03-21 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
26201136-ac5d-4fde-a00a-89f051b1c79a	M160220810091979	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m160220810091971 	HRK	2022-03-21 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
bf567e30-2c0e-4af7-9d1c-a4578ad57e34	M160220810092054	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m160220810092045 	HRK	2022-03-21 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
1517e824-5b45-4204-be55-6e34582f855e	B160220810396785	152.8800000000000	Kupovina novoresume aps +4528264787 dk domagoj vuković eur 19,99 	HRK	2022-03-21 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
2068afae-7446-4f8f-909d-179776f4207a	B160220820260706	130.5000000000000	Kupovina glovo 23mar zay1nql1x barcelona es domagoj vuković 	HRK	2022-03-22 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
c350195d-bc8e-48f1-8a34-a8d099f4a85a	B160220830169019	1	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-23 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
89cec269-fd63-48f7-82f1-b6a4df45d505	B160220830169090	700	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-23 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
6223ff5b-3176-41da-a71a-e0b59fe8b613	B160220840431192	25	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-24 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
4a9293e9-fa34-49ee-90b4-74ebe914dc39	B160220850337210	27	Kupovina bolt.eu/c/2203261804 tallinn ee domagoj vuković 	HRK	2022-03-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
7855d1d5-da21-40cd-bfb3-0f138efaaef5	B160220850379555	42.40000000000000	Kupovina bolt.eu/c/2203261946 tallinn ee domagoj vuković 	HRK	2022-03-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
18c2020e-fc64-4cae-8914-2dddaf9f5bd2	B160220870139867	16	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
fcf14823-2404-4696-b837-ac435ac420a8	B160220870431367	19.20000000000000	Kupovina bolt.eu/o/2203282003 tallinn ee domagoj vuković 	HRK	2022-03-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
19625951-f260-4875-a9bf-64fe24996a5b	B160220880280970	62.90000000000000	Kupovina bolt.eu/o/2203291548 tallinn ee domagoj vuković 	HRK	2022-03-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
f50d2434-d4b0-4b59-bf2c-e8c8cede1c47	B160220900363764	92.30000000000000	Kupovina cazmatrans internet pr cazma hr domagoj vuković 	HRK	2022-03-30 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
1388d0d1-b78b-4cff-92ae-ea3cecd2bcfa	B160220910316424	34	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-31 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
255e18ff-a1ae-4e5a-adc6-045ebc48b7e5	B160220910327116	60	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-03-31 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
2699005b-d2d5-48fc-b299-db38d0f6fa76	B160220920375863	154.8000000000000	Kupovina cinestar avenue mall zagreb-novi z hr domagoj vuković 	HRK	2022-04-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
1c09a76e-cac4-4cd2-8a3e-800a9aa79ed2	B160220930242741	92.30000000000000	Kupovina cazmatrans internet pr cazma hr domagoj vuković 	HRK	2022-04-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
d9ac4e2a-7387-49c5-9245-a162efba108f	B160220970427742	71	Kupovina glovo 07apr zawxnuhns barcelona es domagoj vuković 	HRK	2022-04-06 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
798e6bd5-d13f-43d7-a2a5-8793ab0546ad	B160220980522073	700	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
9538da0f-b20d-40da-b552-8850b233061e	B160220990312002	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
b7707b45-4e37-473a-b221-b59f9fefb0ba	B160220990393587	70	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
59dd2a82-c884-4bfc-a99c-4525877f82fc	B160220990423766	650	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
57f3acda-c331-48a5-a997-705fb98b829c	B160221000005572	19.99000000000000	Kupovina glovo glovo prime barcelona es domagoj vuković 	HRK	2022-04-09 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
7df9ba27-cb95-476d-9ff1-984da266139d	B160221000237979	76.50000000000000	Kupovina glovo 10apr zavw4t1q4 barcelona es domagoj vuković 	HRK	2022-04-09 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
77fa807f-c75d-4c20-8e2e-7ffe7f62a28d	B160221000310057	360	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-09 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
d957ab29-db07-4e7a-9a9e-1951b8745ce7	B160221020148685	18	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
2326b971-7e12-4908-a969-952fd04b1c59	B160221020355516	40	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
f14b1a19-70d2-45d6-9154-f8e6369dca92	M160221020118777	80	Kreditni transfer nac. u kunama on-line bankarstvom (mobilne aplikacije) - izipay filip lukacevic hr2423600003241870015 hrana i piće 	HRK	2022-04-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
0ef61fee-e5c9-4cdc-9b51-dfd80c57ae1f	B160221020435412	31.60000000000000	Kupovina bolt.eu/o/2204121745 tallinn ee domagoj vuković 	HRK	2022-04-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
06daf7fc-0aa7-47c3-b745-000ea078c77e	B160221030344445	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
e53ac5c2-72ab-4b0b-bdca-800be5050cc3	B160221040070387	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
fa30f629-626f-4d82-bcaf-72316a13af13	B160221040070843	25	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
57253cb5-855e-4e7e-8892-43cd6331c0c6	B160221040514344	203	Kupovina hz putnicki prijevoz zagreb hr domagoj vuković 	HRK	2022-04-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
c4bc6f34-4688-421e-bf9d-3e0dd2666d11	B160221050184806	34	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
887e58b0-0f54-4cca-a0a6-ba771504b4b6	B160221050326923	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
a39c3ff0-c770-4569-86c5-ffcf51046edb	B160221050389812	23	Kupovina bolt.eu/o/2204151406 tallinn ee domagoj vuković 	HRK	2022-04-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
72fc7ac0-0c7b-4f45-85bb-9266f4b95bf3	B160221060285746	73.45999999999999	Kupovina pbzttrgkrk milanovac hr domagoj vuković 	HRK	2022-04-15 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
2ce28589-9d4b-4410-b052-9f3d36828408	B160221080044802	73	Kupovina pbztmcdonaldskiosk zagreb hr domagoj vuković 	HRK	2022-04-17 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
d8ed2092-f061-4510-b3ea-2e0b638c9752	B160221080060384	26.50000000000000	Kupovina bolt.eu/o/2204180912 tallinn ee domagoj vuković 	HRK	2022-04-17 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
07fec37b-7bce-4c50-bc5a-4bc5fb946ab0	B160221080179167	138.2700000000000	Kupovina jnmejzj2i4i kinguin.net hk domagoj vuković usd 19,11 	HRK	2022-04-17 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
a0523681-8f65-4469-8bd3-0ac39c34d24b	B160221080182163	69.50000000000000	Kupovina glovo 18apr zag5aqkdj barcelona es domagoj vuković 	HRK	2022-04-17 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
9a4665b7-c803-4639-b368-4cb6151c4d74	B160221090133155	15	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-18 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
dacefb10-f28d-4b8f-aa86-147931b3d70a	B160221090332341	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-18 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
cee2d30b-8d2b-449b-80e8-2c22aab045d5	B160221100003067	35.62000000000000	Kupovina hbo max prague cz domagoj vuković eur 4,66 	HRK	2022-04-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
a331c01a-1afa-49a5-a7c6-08b240db8417	B160221100130797	74	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-04-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
c6e4613a-d62d-49a0-8a5e-66721efff98f	B160221100241794	98.67000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-04-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
b15bdeb5-58e5-4397-a6f0-bc784ce8f7c7	B160221110122317	39.66000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-04-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
fa2b1253-f08c-41ed-9ef7-b475b72c57f9	M160220810091909	316.6700000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) zagrebački holding d.o.o. hr2823600001500114760 hr01 04869192-770484464-0 naknade i usluge za 022022 	HRK	2022-03-21 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
387e999d-5c0b-4268-9bae-bf05893a3a27	M160220810091971	194.7600000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) hep - toplinarstvo d.o.o. hr3823600001500033197 hr01 30120150118-0222-1 potrošnja topl. en. za 02/2022. 	HRK	2022-03-21 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
de91a93f-22ca-4618-b554-15b3095d4cb6	M160220810092045	179	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) a1 hrvatska d.o.o. hr2323600001102643867 otlc hr04 255890362-202202 racun 0000673964032022 	HRK	2022-03-21 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
379be2be-6664-4add-b936-8d69816ffc4b	M160220810091942	55.09000000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) hep elektra d.o.o. dp ele hr9223400091510077598 elec hr01 2200092977-220220-6 racun za:01022022-28022022 	HRK	2022-03-22 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
fb684bc7-953e-42ca-95ce-5f6d168f4096	B160221110232766	12	Kupovina mlinar pekarska indust zagreb hr domagoj vuković 	HRK	2022-04-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
e3b64eea-a25b-4236-acbe-7ed38aaf3324	B160221110391816	76	Kupovina glovo 21apr za21kdbtf barcelona es domagoj vuković 	HRK	2022-04-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
d7d99ed7-dfca-4dc9-a40f-8ed652f8cabc	B160221120120551	17.98000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-04-21 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
f7e7e8c3-7586-4d71-8c67-5f5fe34a2d45	B160221120121693	34	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-04-21 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
4d361e2d-0100-4edd-ac9b-2638cc2f37ed	B160221120316045	58.50000000000000	Kupovina glovo 22apr zaeqtqabs barcelona es domagoj vuković 	HRK	2022-04-21 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
b0353fd6-3a64-4fc0-8e19-311fea5ab999	B160221130131201	105	Kupovina glovo 23apr zamkqfbwl barcelona es domagoj vuković 	HRK	2022-04-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
6765c414-f329-411d-8e4a-e166ace4a35c	B160221260156168	34	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-05-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
537dfc1a-bd7a-452b-9494-777a1acdebd3	B160221260401966	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
c5b97513-9707-4144-aaf2-543dab94498b	B160221130415933	19	Naknada za podizanje got. novca - deb. kart. na bankomatu - bankomat dr. pružatelja u rh b160221130415932 	HRK	2022-04-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
71c0f5a4-a642-4198-8bd3-f424ccb2a7ad	B160221130419686	39.80000000000000	Kupovina bolt.eu/o/2204231934 tallinn ee domagoj vuković 	HRK	2022-04-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
ce78f00c-9289-4a1b-8c02-fc6586c625d8	B160221140007551	68.90000000000001	Kupovina bolt.eu/o/2204232354 tallinn ee domagoj vuković 	HRK	2022-04-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
6b793e50-3caf-4933-886e-5209e9ad23da	B160221140246367	123	Kupovina glovo 24apr zarafkrwt barcelona es domagoj vuković 	HRK	2022-04-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
f454b6a8-c6ef-4794-9892-c283b69dd4c5	B160221150137640	25	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
1bc09e00-a973-48bd-8ae7-9fd7c725dc8d	B160221150366631	34	Kupovina tobacco zagreb hr domagoj vuković 	HRK	2022-04-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
b266299a-1ce7-4eef-adc2-9ca7488fce72	B160221150367870	55	Kupovina mlinar pekarska indust zagreb hr domagoj vuković 	HRK	2022-04-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
373be119-4f18-43f9-9f4e-7e34b2193c0c	B160221160112186	17.98000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-04-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
26bf6a91-d73b-49da-8ac0-08eb8f3f4f14	B160221160227468	42.87000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-04-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
4a916d73-1735-4d64-8b45-8e6c88b69683	B160221160228466	34	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-04-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
a1ef5048-99fe-4992-b279-c54590e627fe	B160221160323257	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
74f03c7a-0b1c-4afb-9904-0aede2ca1ce9	B160221160378261	58	Kupovina glovo 26apr zaut18twf barcelona es domagoj vuković 	HRK	2022-04-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
96c2b366-e42c-4f87-8410-bb7ed3a0f474	B160221170110199	30	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
d2f33180-3f1e-49f5-a5c1-58c115064a54	B160221170206303	38.29000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-04-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
7711f91e-3abf-41fb-951a-7da8a4c9b9a0	B160221170409613	78	Kupovina glovo 27apr zav18lfeq barcelona es domagoj vuković 	HRK	2022-04-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
d7fdfb6a-c49a-4915-a448-19eb90ae870e	B160221180197289	77	Kupovina glovo 28apr zapqhrf5q barcelona es domagoj vuković 	HRK	2022-04-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
2652f320-eb74-4f2b-b40a-11cd9536a92e	B160221180329967	22	Kupovina bolt.eu/o/2204281535 tallinn ee domagoj vuković 	HRK	2022-04-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
748733b3-c206-4f53-a25d-4ed925bfcbe4	P16022118383N913	5	Kreditni transfer nacionalni u eurima u poslovnici domagoj vuković hr4823600003250759924 prijenos eur 0,66 tečaj zaba 28.04.2022 tečaj zaba 28.04.2022 1 eur= 7.610000 hrk 	HRK	2022-04-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
1c14417c-ea78-4967-9356-c2c9d93e052b	B160221180364362	62.52000000000000	Kupovina konzum p-0214 zagreb hr domagoj vuković 	HRK	2022-04-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
78d6189b-5889-4e5d-82c6-fbb5a03a57f6	B160221130415932	400	Podizanje gotovog novca - debitnom karticom na bankomatu - bankomat drugih pružatelja u rhbarcev trg 16 zagreb hr domagoj vuković 	HRK	2022-04-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-06-17 21:28:24.666555
5bcf6fe5-e0b1-4787-98a3-f88e28a75a72	B160221180365941	34	Kupovina pbztinovine758 zagreb hr domagoj vuković 	HRK	2022-04-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
b2a5bf63-9771-46dc-9706-7664a9328bca	B160221190115436	19.26000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-04-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
078859ee-4380-46e2-8e66-bc52220fdf32	B160221190116339	34	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-04-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
632cbb8b-2ed5-4892-abce-bb3deb292f20	B160221190154041	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
18d6a644-578d-445d-b6d2-ad3a14863181	B160221190154244	22	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
90911ae7-933b-48be-b325-58849fdc9bf0	B160221190223114	112.9400000000000	Kupovina c & a 851 city center ozagreb hr domagoj vuković 	HRK	2022-04-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	00515f3e-9df1-495b-8c74-a19ff094edae	2022-06-17 21:28:24.666555
27d7e8d8-9cfd-4a94-aeac-a915f7eb212b	B160221190255272	10	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
2e4076a8-8d5a-4f61-919f-32b8f901a099	B160221190400031	34	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-04-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
f764a2f2-6707-4048-b1e1-9f4e9c508f94	B160221200435546	78	Kupovina glovo 30apr za1c1lvxe barcelona es domagoj vuković 	HRK	2022-04-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
3630133a-7ab8-4799-9ce0-cda137c43083	B160221210125423	78	Kupovina glovo 01may zaalcrflu barcelona es domagoj vuković 	HRK	2022-04-30 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
f2492872-d9fa-4673-a3ad-9dda458af426	B160221220111711	19.06000000000000	Kupovina spar8702 zagreb hr domagoj vuković 	HRK	2022-05-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
f1de12c1-ce69-4614-a4e1-32854a4bc5e9	B160221220325058	11	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
8ea60ff4-77e0-4524-8387-98f8fbc3a0d6	B160221220330355	58.50000000000000	Kupovina glovo 02may zap5j82lv barcelona es domagoj vuković 	HRK	2022-05-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
5b358f42-8536-4028-9193-9f02629f1c1d	B160221230215064	86	Kupovina glovo 03may zarcwcv1y barcelona es domagoj vuković 	HRK	2022-05-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
731b51da-eb77-496a-adda-1651762382aa	B160221240117825	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
85513550-6e42-4d49-be79-5ba0417018d2	B160221240158384	105	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
9a782851-8313-4c87-aff0-8224670320cc	B160221240158499	105	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
aa8bac11-3ce5-48ab-b79c-5022bb72ed76	B160221250137092	23.88000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-04 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
36f25305-8ce5-4398-9f7f-afc88da60078	B160221250338438	102	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-05-04 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
7de872e9-475a-4065-aafc-454884ce5ec4	B160221250379385	53	Kupovina glovo 05may zauj1fx3w barcelona es domagoj vuković 	HRK	2022-05-04 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
e9f8d1d4-fce6-4727-aaf6-215247909caf	B160221270188244	35	Kupovina glovo 05may zauj1fx3w barcelona es 	HRK	2022-05-04 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
20ee34e4-afbb-462e-9f2e-97d980276cb9	M160221260010216	1750	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) jadranka marković hr9423600003116214470 hr00 05-22 najamnina 05-22 	HRK	2022-05-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	e73616ca-7c4e-4105-808e-f9ffef14e515	2022-06-17 21:28:24.666555
2cec8380-60c2-41ef-8803-2424b5465581	B160221260065971	11	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
eed2fe35-0972-4e44-8f5b-018af80cbcc1	B160221260154927	23.86000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
d467b091-b7f4-451e-bbd2-78c2fbc787a2	B160221260396019	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
23f1b49e-600f-4dfb-b0a5-186d8a779a59	B160221260402910	1	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
b1bb37e2-7e68-478e-9cdf-6794c1d77dea	B160221260424565	72	Kupovina glovo 06may zangqbqm3 barcelona es domagoj vuković 	HRK	2022-05-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
b79a1bb3-51be-4af7-a55b-75138a4bf8b1	B160221270297709	83	Kupovina glovo 07may zaq18ahua barcelona es domagoj vuković 	HRK	2022-05-06 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
c68dea7c-45ae-43e8-9ba7-27eaf05d2e48	B160221270484343	14	Naknada za podizanje got. novca - deb. kart. na bankomatu - bankomat dr. pružatelja u rh b160221270484342 	HRK	2022-05-06 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
9e01bd13-0d25-4414-8dc5-9e1c6ac17a27	B160221280115865	424.7500000000000	Kupovina spar87062 zagreb hr domagoj vuković 	HRK	2022-05-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
88e2a443-8297-44f3-8aa5-a752c86d32a3	B160221280290727	69	Kupovina pbztmcdonaldskiosk zagreb-slobos hr domagoj vuković 	HRK	2022-05-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
85a0e6b1-31c2-47b6-9f9f-22b2f5adff38	B160221290124445	20.17000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
f613de2c-dd31-4d46-8982-1ac4e3977c2d	B160221290253110	10	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
4ca980d7-4c9e-4e3a-a0ae-df18340a650b	B160221290308926	34	Kupovina tobacco zagreb hr domagoj vuković 	HRK	2022-05-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
d2f6e575-18d5-40db-b549-98cc4a98eefe	B160221290387349	350	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
404980da-11a4-4721-8367-ba5bae5c7d02	B160221300006140	19.99000000000000	Kupovina glovo glovo prime barcelona es domagoj vuković 	HRK	2022-05-09 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
516e476b-5952-46f3-bf7e-14aad8bf9f52	B160221300142277	53.84000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-09 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
b984cff2-8d7f-4c4b-bded-51b8ce3e154c	B160221300143356	68	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-05-09 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
958067bc-b0a8-4aa9-800a-6c4994df3c62	B160221300269880	15	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-09 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
33ddf3e3-1c0d-4117-b2b3-5509ad0630f1	B160221310039832	15.20000000000000	Kupovina bolt.eu/o/2205110608 tallinn ee domagoj vuković 	HRK	2022-05-10 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
b2c90ebe-7aa0-46d9-ad6e-7976d7d0e37f	B160221320162110	53	Kupovina pbztmcdonalds zagreb hr domagoj vuković 	HRK	2022-05-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
abe1c417-e78e-4eff-8c0f-3327339669e0	B160221320177978	34	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-05-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
52a5fb58-07f3-4e05-ba99-8c6ee0635f1a	B160221320193464	21	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-05-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
2c823a98-5f88-46d6-b7bb-25359174abc3	B160221320411582	56	Kupovina glovo 12may zam1pjqux barcelona es domagoj vuković 	HRK	2022-05-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
2b1731c8-df35-4c7a-8ac5-785275903e57	B160221330162324	21.14000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
113b6c50-6e83-48ba-9f4d-8847275a48f9	B160221330180927	34	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-05-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
6bd8906d-b226-48c9-a687-c92514d6e874	B160221330383766	78	Kupovina glovo 13may zazpn2qe6 barcelona es domagoj vuković 	HRK	2022-05-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
734bf0ae-aa7d-47cc-ae38-5da8a28e7a30	B160221340086211	30.87000000000000	Kupovina ubr* pending.uber.com amsterdam nl domagoj vuković 	HRK	2022-05-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
436a7e74-7931-4646-94fc-d879da2759db	B160221340481722	14	Naknada za podizanje got. novca - deb. kart. na bankomatu - bankomat dr. pružatelja u rh b160221340481721 	HRK	2022-05-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
a7de420e-3b65-420c-9918-47a6cbdc2dda	B160221340495807	58.80000000000000	Kupovina bolt.eu/o/2205141853 tallinn ee domagoj vuković 	HRK	2022-05-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
f256033f-ef62-4c25-b40c-b79279bde29b	B160221350007219	79.98000000000000	Kupovina ubr* pending.uber.com amsterdam nl domagoj vuković 	HRK	2022-05-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
1f0edae5-9179-49b9-90c2-4d803fceebf0	B160221350229518	38.50000000000000	Kupovina glovo 15may zaxcu1u5y barcelona es domagoj vuković 	HRK	2022-05-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
89d61d92-4d65-4cf0-a228-a52ac640897b	B160221350365216	11.50000000000000	Naknada za podizanje got. novca - deb. kart. na bankomatu - bankomat dr. pružatelja u rh b160221350365215 	HRK	2022-05-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
e602810a-9514-4427-b6fb-3d02782894a1	B160221360144295	21.74000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-15 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
229abc0b-2e13-40c8-a27b-2adc42b78540	B160221360360675	46.50000000000000	Kupovina burger king z centar zagreb hr domagoj vuković 	HRK	2022-05-15 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
8b2164e2-49f7-4460-9c4b-3c3984089dea	B160221370134862	21.02000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-16 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
52e5aff1-2c77-4cd3-882b-d92dff69d667	B160221370263178	22	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-05-16 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
e9fcc14c-104c-4c8f-8f13-587c799551f3	B160221370283101	34	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-16 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
fb3cffc8-78ad-4a44-8175-7f1209cfd530	B160221370379577	88	Kupovina burger king z centar zagreb hr domagoj vuković 	HRK	2022-05-16 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
be2db2b1-e28e-4307-8eab-87e74587f229	B160221380182212	100	Kupovina glovo 18may zann3jhdz barcelona es domagoj vuković 	HRK	2022-05-17 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
3f70aaba-136a-440f-a263-9d14745b1646	B160221390093893	14	Naknada za podizanje got. novca - deb. kart. na bankomatu - bankomat dr. pružatelja u rh b160221390093892 	HRK	2022-05-18 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
78a30661-7e83-473d-bf5b-9655dc05ad75	B160221390101329	246.4600000000000	Kupovina spar87062 zagreb hr domagoj vuković 	HRK	2022-05-18 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
000803e9-f748-4dd4-b8c4-15d03d2f14b9	B160221400009269	35.50000000000000	Kupovina hbo max prague cz domagoj vuković eur 4,66 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
a4f3ad2e-453b-4619-ba9a-d3a778fb6c97	B160221400144240	17.46000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
112b1e95-0597-433c-bbff-28d6df726d1e	B160221400145118	34	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
b7227c98-4305-4b64-8afe-452ef9064c9c	M160221400058661	2.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m160221400058655 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
8844750c-47fa-4e25-92c2-ac44335a5ea8	B160221400323183	210	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
4bee06ff-3526-4a3c-8195-03a0ce002e62	B160221400336366	31	Kupovina google payment ie ltd gdublin ie domagoj vuković 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
4fbbc4ae-0ab2-4220-9567-205ab9a50ce8	M160221400107610	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m160221400107605 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
36c4de6b-335b-4286-91c9-c69da4c20bc5	B160221490073216	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
38a14a17-677f-4105-92b6-490f89377293	M160221400107625	2.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m160221400107621 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
0debcb84-18b6-4de9-8bf0-ac26092be970	M160221400107646	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m160221400107640 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
ca0d06d5-8e26-4828-9c06-cb71d8e9bdb7	M160221400107751	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m160221400107748 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
73b0f4b4-f1c8-4e3e-94e6-1cff94a78fdf	M160221400107783	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m160221400107781 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
2adc9527-dcc4-4794-9c19-644a3d078018	B160221410249117	61.30000000000000	Kupovina bolt.eu/o/2205211118 tallinn ee domagoj vuković 	HRK	2022-05-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
3058cc79-41c9-4569-9b4a-8950f2bb4d31	B160221270484342	200	Podizanje gotovog novca - debitnom karticom na bankomatu - bankomat drugih pružatelja u rhbarcev trg 16 zagreb hr domagoj vuković 	HRK	2022-05-06 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-06-17 21:28:24.666555
128a4736-7683-4bec-ba08-7cc9d898cbce	B160221340481721	200	Podizanje gotovog novca - debitnom karticom na bankomatu - bankomat drugih pružatelja u rhbarcev trg 16 zagreb hr domagoj vuković 	HRK	2022-05-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-06-17 21:28:24.666555
148cf385-dbf6-40b6-a3da-c30bc8073cc4	B160221350365215	100	Podizanje gotovog novca - debitnom karticom na bankomatu - bankomat drugih pružatelja u rhbarcev trg 16 zagreb hr domagoj vuković 	HRK	2022-05-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-06-17 21:28:24.666555
7abdb728-8ad2-41e5-b5d6-7d5659a4799d	B160221390093892	200	Podizanje gotovog novca - debitnom karticom na bankomatu - bankomat drugih pružatelja u rhbarcev trg 16 zagreb hr domagoj vuković 	HRK	2022-05-18 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-06-17 21:28:24.666555
a8c3939f-727d-40d2-89a0-72c0a4f62e20	M160221400058655	420	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) državni proračun republike hrvatske hr1210010051863000160 hr65 7005-434-68834815068 za putovnicu 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
36c52b8b-d647-43e9-9c54-e804268a5c61	M160221400107605	124.6300000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) hep - toplinarstvo d.o.o. hr3823600001500033197 hr01 30120150118-0422-4 potrošnja topl. en. za 04/2022. 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
1e5a361b-7862-4120-ad5b-d5002fbd8afe	M160221400107640	264.2300000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) zagrebački holding d.o.o. hr2823600001500114760 hr01 04869192-782750844-3 naknade i usluge za 042022 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
18b7363a-d98e-4bbc-b579-d19ed55b6b85	M160221400107748	802.7400000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) hrvatski telekom d.d. hr6023600001500200999 hr01 829279282000-220501-7 račun za usluge u mobilnoj ht mreži 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
083aa8f1-d669-44b9-af44-59cf30896032	M160221400107781	179.2400000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) a1 hrvatska d.o.o. hr2323600001102643867 otlc hr04 255890362-202204 racun 0000885998052022 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
289aaa9b-ded4-4a8e-8e9b-82955f0c333a	B160221410294668	546.9000000000000	Kupovina batak tkalciceva zagreb hr domagoj vuković 	HRK	2022-05-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
223959b2-2de1-4363-9b94-cdee4863789b	B160221410312449	67.30000000000000	Kupovina bolt.eu/o/2205211326 tallinn ee domagoj vuković 	HRK	2022-05-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
a0f8bd54-aed1-4012-9bf4-49d9128bd41e	M160221400107621	93.73999999999999	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) hep elektra d.o.o. dp ele hr9223400091510077598 elec hr01 2200092977-220420-9 racun za:01042022-30042022 	HRK	2022-05-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
5060d040-a3b2-4f79-a43a-a76ed36e393f	B160221430117916	39.70000000000000	Kupovina bolt.eu/o/2205230857 tallinn ee domagoj vuković 	HRK	2022-05-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
b4b7b4cc-a15a-4605-a4b5-93284b0c7ffd	B160221430140384	55.70000000000000	Kupovina bolt.eu/o/2205230935 tallinn ee domagoj vuković 	HRK	2022-05-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
74e5af75-5865-4e46-b12a-6424079cc0d3	B160221430176834	28	Kupovina pbztmcdonalds zagreb hr domagoj vuković 	HRK	2022-05-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
1e3d6ef6-6e9c-434a-ac36-7438e13163ae	B160221430187548	8	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-05-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
872d9ae7-7919-4fdd-bdbe-806b5303dae2	B160221430197449	45.46000000000000	Kupovina ubr* pending.uber.com amsterdam nl domagoj vuković 	HRK	2022-05-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
8932c8cc-3e33-4276-b13f-babe5848faa6	B160221430212066	56.60000000000000	Kupovina bolt.eu/o/2205231148 tallinn ee domagoj vuković 	HRK	2022-05-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
43205fb7-990e-4fa8-a8e3-1936cef1d37c	B160221430249616	62.30000000000000	Kupovina bolt.eu/o/2205231303 tallinn ee domagoj vuković 	HRK	2022-05-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
33cdec6c-d1b8-4eed-a246-bf9b0e9e61b0	B160221430301217	200	Podizanje gotovog novca - debitnom karticom na bankomatu banke ljubljanska av 2b zagreb domagoj vuković 	HRK	2022-05-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-06-17 21:28:24.666555
6cff660b-b885-47ce-9e36-f57b52009963	B160221430316797	75.90000000000001	Kupovina bolt.eu/o/2205231506 tallinn ee domagoj vuković 	HRK	2022-05-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
d97d3c47-2d11-464b-8ddf-1d27eead169c	B160221440131641	11.99000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
8844872c-755c-4bf7-8640-3bb985fabf67	B160221450062112	52.80000000000000	Kupovina bolt.eu/o/2205250703 tallinn ee domagoj vuković 	HRK	2022-05-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
b26ff007-75a0-4d78-9cb4-70c75544d4f7	B160221450099559	66.59999999999999	Kupovina bolt.eu/o/2205250813 tallinn ee domagoj vuković 	HRK	2022-05-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
ebc6093c-3ef0-4fc0-9375-c1e87dba5ae6	B160221450138611	21.06000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
40e2e365-59d4-4787-9dc2-ebeea9d720ac	B160221450368496	91	Kupovina burger king z centar zagreb hr domagoj vuković 	HRK	2022-05-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
79e5c667-4094-4201-a5d6-2e330e8c2695	B160221460077901	100	Podizanje gotovog novca - debitnom karticom na bankomatu banke ljubljanska av 2b zagreb domagoj vuković 	HRK	2022-05-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-06-17 21:28:24.666555
eb956f53-59a7-408b-a2c8-ac8966ac5084	B160221460133694	21.06000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
f785df69-4664-48b5-baaa-3628ac9da1f7	B160221460431395	58	Kupovina glovo 26may zammf2fdp barcelona es domagoj vuković 	HRK	2022-05-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
13eb0f9c-e410-4e36-a15a-c7220cfc5d91	B160221470262738	227.3800000000000	Kupovina c & a 851 city center ozagreb hr domagoj vuković 	HRK	2022-05-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	00515f3e-9df1-495b-8c74-a19ff094edae	2022-06-17 21:28:24.666555
02756377-1476-47c5-9fb6-a3ef0955387a	B160221470266332	21.40000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
4d78c0f4-a331-4ec0-884d-36c997a2ed48	B160221470467541	34	Kupovina tisak p-2941 velika gorica hr domagoj vuković 	HRK	2022-05-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
2000a76c-e95c-456b-a814-a4197244fa52	B160221480000065	58	Kupovina pbztmcdonalds split hr domagoj vuković 	HRK	2022-05-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
8d084e5d-b04f-4a42-bd83-5c5a637676b1	B160221490083998	34	Kupovina tisak p-1250 split hr domagoj vuković 	HRK	2022-05-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
769964f1-7490-4d07-9c1b-7791b4066801	B160221490148842	225	Kupovina pbztlukoilbp vrpolje (perk hr domagoj vuković 	HRK	2022-05-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
34347bcd-17e8-4181-aa11-e7e7f1ec6f2d	B160221490156516	36.98000000000000	Kupovina pbztlukoilbp vrpolje (perk hr domagoj vuković 	HRK	2022-05-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
36cd193d-7f5a-42ad-a13e-029762029615	B160221490228482	60	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
0f102af3-8614-4a3d-ae35-ceeae8249bba	B160221490228626	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
d25ae43c-7d65-4457-8a8d-aca3810e2181	B160221500115791	81	Kupovina glovo 30may za8wn2rax barcelona es domagoj vuković 	HRK	2022-05-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
03f85470-280d-42df-b860-358c6d420f90	B160221510128466	43.89000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-30 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
1bc3c31b-f0d6-4c71-b29c-f16a79abf53c	B160221510350689	34	Kupovina tobacco zagreb hr domagoj vuković 	HRK	2022-05-30 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
07f30293-3c42-4506-a740-142023643eab	B160221510352069	81	Kupovina burger king z centar zagreb hr domagoj vuković 	HRK	2022-05-30 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
ccdd7430-e772-49e8-b20c-eef6345ef22a	B160221520053500	10	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-31 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
1d2e1bdd-01c8-4d49-94a6-3916b1d44894	B160221520126194	22.34000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-05-31 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
662710ad-d94e-4624-832e-ba0aed26448f	B160221520153475	12	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-31 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
547c454c-bfe2-43bb-b84a-eb578cb60b82	B160221520336866	350	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-31 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
f3ea187e-c05c-4df3-ad6e-d5402228c30d	B160221520337226	34	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-05-31 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
1bc5cf8c-b0f1-492f-8a8c-5aff478099e5	M160221520069765	1750	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) jadranka marković hr9423600003116214470 hr00 06-22 najamnina 06-22 	HRK	2022-05-31 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	e73616ca-7c4e-4105-808e-f9ffef14e515	2022-06-17 21:28:24.666555
8926ccdb-f031-4bde-b33b-93e4c11ab723	B160221520343952	56	Kupovina glovo 01jun zamhndduk barcelona es domagoj vuković 	HRK	2022-05-31 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
deb51b77-b7ba-4152-a19c-f653efcb56b3	M160221530010064	3616.690000000000	Kreditni transfer nacionalni u valuti različitoj od eura on-line bankarstvom (m-zaba) domagoj vuković hr4823600003250759924 prijenos na vlastiti račun usd 500,00 tečaj zaba 02.06.2022 tečaj zaba 02.06.2022 1 usd= 7.233378 hrk 	HRK	2022-06-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a6e0d1b4-0363-484e-aa8f-e006851aa91d	2022-06-17 21:28:24.666555
94756634-f6f3-413a-9c2d-e574766cd682	B160221530126630	98	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-06-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
096980ef-8b85-444d-87c2-d5f43c28f55b	B160221530206936	27	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
08da02cd-f1d3-48a7-ba63-c7591ca4da2a	B160221530327667	47	Kupovina tobacco zagreb hr domagoj vuković 	HRK	2022-06-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
b1de1b47-9b4c-41a0-b137-43cd4244e3f3	B160221530333876	18	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
3d97a802-5d76-4df3-83ab-e7194ce5548f	B160221530355830	73.40000000000001	Kupovina bolt.eu/o/2206021613 tallinn ee domagoj vuković 	HRK	2022-06-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
2dbb8f5d-c2b4-4ab5-8385-c5bd891f6632	B160221530455332	59	Kupovina glovo 02jun zadl4vjwn barcelona es domagoj vuković 	HRK	2022-06-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
819d0e92-5011-42ec-b9e2-41efe5d197e5	B160221540136610	100	Kupovina glovo 03jun za9nyp2jj barcelona es domagoj vuković 	HRK	2022-06-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
3a4014e6-b905-45f7-8ae3-0f4025f42bbb	B160221540256485	50.46000000000000	Kupovina ubr* pending.uber.com amsterdam nl domagoj vuković 	HRK	2022-06-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
4671af04-52b2-4aca-95d5-b3e5b763e6ca	B160221540267902	45.30000000000000	Kupovina bolt.eu/o/2206031252 tallinn ee domagoj vuković 	HRK	2022-06-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
326b4642-2bec-4dfd-bebb-4c99386d9212	B160221540355230	70	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
23027956-f1e6-4a0e-a306-e8624f653275	B160221540359991	35	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
019aa416-24f3-4e99-a15c-852a146aa699	B160221540363600	25	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
60c72606-71e8-42cb-9431-17986c4dc8b7	B160221540437878	107.5000000000000	Kupovina wolt zagreb hr domagoj vuković 	HRK	2022-06-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
55c0552c-500f-4de4-a91b-c0a0438e524f	B160221550260765	378.3700000000000	Kupovina pbztsparsmarketp62 zagreb hr domagoj vuković 	HRK	2022-06-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
c1f1366d-82e4-4ab4-9a7f-cb8429cbac35	B160221550262575	14	Naknada za podizanje got. novca - deb. kart. na bankomatu - bankomat dr. pružatelja u rh b160221550262573 	HRK	2022-06-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
6271c31b-7964-43bb-8de5-ea0c7190354d	B160221550262573	200	Podizanje gotovog novca - debitnom karticom na bankomatu - bankomat drugih pružatelja u rhbarcev trg bb zagreb hr domagoj vuković 	HRK	2022-06-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-06-17 21:28:24.666555
3df5f9c8-bb05-41a7-bde5-3e13b812307f	M162220040058198	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-01-03 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
b1e46140-22f8-4822-a6bc-77591df06e6f	M162220070050971	150	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-01-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
46bf3016-e012-47d8-b79b-51689f8c76ba	M162220070079365	1750	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) jadranka marković hr9423600003116214470 hr00 01-22 najamnina 01-22 	HRK	2022-01-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	e73616ca-7c4e-4105-808e-f9ffef14e515	2022-06-17 21:28:24.666555
9dc58f0e-aab7-4940-a9dd-2e10b7e1309e	M162220070079770	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m162220070079767 	HRK	2022-01-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
f5e86e17-b139-4b12-a122-7bd9711ffadd	B162220090080410	16	Kupovina google payment irelandldublin ie domagoj vuković 	HRK	2022-01-08 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-17 21:28:24.666555
1665f2b4-7771-45e0-9def-fed91be96b9e	M162220090036822	200	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-01-08 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
2346ea58-efd4-43b7-ba81-cb0a3c0c0d13	73A29548-757C-8AB7-CC60-6B47DA417F51	7.450000000000000	PBZTMCDONALDS ZAGREB HR	EUR	2022-04-11 09:17:56	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
4ccf9821-f2b2-4423-b973-dfecf2ad0549	M162220110114953	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-01-10 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
938c9e7f-ebb5-4102-aebd-a2056e742b5c	M162220140155598	400	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-01-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
435750fe-7d03-43c1-bcf6-e5b8dbef7b1c	M162220160031411	300	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-01-15 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
a9eed91f-0cd4-4a92-bb41-4d9ca8911c50	M162220170191045	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-01-16 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
580f16cc-7cd5-44df-b84f-6a8548b59dae	M162220210034694	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m162220210034689 	HRK	2022-01-20 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
c23eb1fc-cccd-4c34-9b69-c2c5f074b19e	M162220210035308	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m162220210035217 	HRK	2022-01-20 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
c0a688ab-c1c3-4c02-a241-cf212bebfb09	M162220210035495	2.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m162220210035486 	HRK	2022-01-20 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
6ff72abf-eda6-42da-9134-e4e97a416771	M162220210102898	300	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-01-20 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
de5d4e85-1cb8-46e2-8e87-3c31b7904f4a	M162220240069050	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-01-23 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
b25f5ba2-e5db-4fc0-a3ff-995bbc18e71b	M162220260079267	239	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-01-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
9afadbd2-1c81-45df-9e16-d3a0ab66b7dd	M162220280023705	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-01-27 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
db463307-d429-48ca-beb6-ff6645d1f9c9	M162220290021287	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m162220290021285 	HRK	2022-01-28 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
7c965e6f-2121-48c2-8a21-7fe86e5e39ea	M162220320041975	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-01-31 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
32a4c1ce-0887-4f5e-93f2-7d3053a4bcd6	M162220360030000	100	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-02-04 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
1094053d-dfaf-4fdd-99de-6c62521cd72a	M162220380029182	200	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-02-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
52747154-4d94-4e4f-943f-d96c0de06249	M162220390125096	2000	Kreditni transfer nac. u kunama on-line bankarstvom (mobilne aplikacije) - izipay dean bozic hr6623600003247283605 džeparac 	HRK	2022-02-07 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
abfd7f9e-946f-44be-906d-736e02faeb97	M162220400083045	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-02-08 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
ce93ea41-94ea-469d-8f55-a93ff8e856e9	M162220420090394	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-02-10 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
8a8d6eee-8165-4eca-9b3a-d7be13bd775d	M162220450010129	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-02-13 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
43955809-aab5-4685-bd4c-5d422bd5b9e0	M162220490036588	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-02-17 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
c6d99e22-c72b-4c78-b9f3-b3ca1a1e3cb8	M162220510016788	2.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m162220510016786 	HRK	2022-02-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
bee5d7cf-0653-4bfb-aa00-f3ceceb7d609	M162220510016813	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m162220510016809 	HRK	2022-02-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
351b24bf-ce61-4de5-b550-909e43d8b24a	M162220510016828	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m162220510016827 	HRK	2022-02-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
d61f8088-a617-431c-84dc-69b4c77ce3e3	M162220510016900	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m162220510016894 	HRK	2022-02-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
b271d318-d839-4c1f-bef7-9b13da409267	M162220510024611	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-02-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
32530253-ef11-451e-9e43-40fcb1bcbf4b	M162220570022606	200	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-02-25 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
5058f1d6-a27a-498b-b601-bb6b48cc3c6a	M162220640022794	950	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-03-04 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
803d7731-4738-465d-bf22-613cb752aa69	P162220760001174	92.81000000000000	Naknada za kreditni transfer u inozemstvo u valuti razl. od eura u poslovnici -opcija sha 2223190215/00001 	HRK	2022-03-16 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
cf82e0f3-3e7b-4326-9482-e5fbe3530212	M162220820090130	1100	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-03-22 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
5c00af59-c000-44b1-8b7c-27171f140b70	M162220980117831	1750	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) jadranka marković hr9423600003116214470 hr00 04-22 najamnina 04-22 	HRK	2022-04-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	e73616ca-7c4e-4105-808e-f9ffef14e515	2022-06-17 21:28:24.666555
f95d5d36-fc9e-4ca2-bbbb-df024f0e7580	M162220980117880	3000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-04-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
0d2062ec-bbf6-46c8-bef5-fc847b1ed504	M162221140035741	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m162221140035737 	HRK	2022-04-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
156f2262-a937-4228-967c-8164ad5e1d9c	M162221140035993	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m162221140035991 	HRK	2022-04-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
98918bbd-bb0f-491d-8895-932a5f271258	A910C935-CD80-7E76-9B1D-02BB94063D2D	1.190000000000000	PBZTINA SLAVONSKI BROHR	EUR	2022-04-10 13:11:23	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
1eba2148-d209-469e-9499-9ee313074b45	M162221140036156	2.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m162221140036154 	HRK	2022-04-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
f2f6c504-6a3e-47e8-85dc-3e6c387dab3a	M162221140036220	1.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m162221140036217 	HRK	2022-04-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-06-17 21:28:24.666555
626b705b-b0a8-4e43-8ef2-7b400f8f7b1a	M162221140047024	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-04-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
aa2bdf08-b9d3-4e33-8de9-741c416b055b	M162221180039307	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-04-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
e5cde71c-43d3-4a5c-be51-ce48948c4b32	M162221180084541	3694.810000000000	Kreditni transfer nacionalni u valuti različitoj od eura on-line bankarstvom (m-zaba) domagoj vuković hr4823600003250759924 prijenos na vlastiti račun usd 500,00 tečaj zaba 28.04.2022 tečaj zaba 28.04.2022 1 usd= 7.389611 hrk 	HRK	2022-04-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a6e0d1b4-0363-484e-aa8f-e006851aa91d	2022-06-17 21:28:24.666555
77426de2-f2f1-4e2a-84d2-c048f4d5f436	M162221200041077	300	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-04-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
c0825203-0a7e-4023-bb1a-6e537dc30b19	M162221240031322	500	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-05-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
3189f6fd-e840-40d2-9943-204675a49630	M162221400109629	4217.760000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) domagoj vuković hr9623600003247128641 prijenos na vlastiti račun 	HRK	2022-05-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DISCARDED	\N	2022-06-17 21:28:24.666555
686c46f4-db6f-4b5d-b12b-6749442c00a0	M162220070079767	249.3400000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) zagrebački holding d.o.o. hr2823600001500114760 hr01 04869192-750642799-6 naknade i usluge za 11/2021 	HRK	2022-01-06 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
60e0a83b-c7cf-4d39-9f17-7360becc7791	M162220210034689	179.1900000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) a1 hrvatska d.o.o. hr2323600001102643867 otlc hr04 255890362-202112 racun 0000700499012022 	HRK	2022-01-20 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
ab9a5f5c-ffcc-422e-85cf-1c7202c638cb	M162220210035217	242.5100000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) zagrebački holding d.o.o. hr2823600001500114760 hr01 04869192-756798677-4 naknade i usluge za 12/2021 	HRK	2022-01-20 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
717c6755-c30d-4742-a1ae-75d8c54ca193	M162220210035486	55.09000000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) hep elektra d.o.o. dp ele hr9223400091510077598 elec hr01 2200092977-211220-7 racun za:01122021-31122021 	HRK	2022-01-20 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
464bab1a-7f69-49bf-8610-4906ff1f4123	M162220290021285	259.6400000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) hep - toplinarstvo d.o.o. hr3823600001500033197 hr01 30120150118-1221-9 potrošnja topl. en. za 12/2021. 	HRK	2022-01-28 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
e7e8bff5-082b-4675-8ed8-70e4869bcab8	M162220510016809	288.8700000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) zagrebački holding d.o.o. hr2823600001500114760 hr01 04869192-763153746-7 naknade i usluge za 01/2022 	HRK	2022-02-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
a34ce8d3-4d4a-4dc3-b77b-4180e6447e5f	M162220510016827	316.3600000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) hep - toplinarstvo d.o.o. hr3823600001500033197 hr01 30120150118-0122-5 potrošnja topl. en. za 01/2022. 	HRK	2022-02-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
f3bc1cec-d675-4ec5-8f27-bb1e9af47044	M162220510016894	179	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) a1 hrvatska d.o.o. hr2323600001102643867 otlc hr04 255890362-202201 racun 0000851860022022 	HRK	2022-02-19 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
7bc23045-2c3e-4862-9f3e-3934d334ede9	M162220510016786	69.36000000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) hep elektra d.o.o. dp ele hr9223400091510077598 elec hr01 2200092977-220120-0 racun za:01012022-31012022 	HRK	2022-02-20 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
0012e97f-948d-4455-bcf7-6561f3e5b95c	2223190215/00001	9281.100000000000	Kreditni transfer u inozemstvo u valuti različitoj od eura u poslovnici dubravko ciglar 003043295016977 povrat pozajmice cad 1.663,00 	HRK	2022-03-16 23:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
9d8bc88b-044e-42ed-8d63-208aa3dfd64b	M162221140035737	179.1900000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) a1 hrvatska d.o.o. hr2323600001102643867 otlc hr04 255890362-202203 racun 0000894781042022 	HRK	2022-04-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
deb6e413-b451-4c66-ab04-8e12c140e191	M162221140035991	263.8400000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) zagrebački holding d.o.o. hr2823600001500114760 hr01 04869192-776407259-7 naknade i usluge za 032022 	HRK	2022-04-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
288331eb-80e0-4e07-aba1-fcdc00efae2e	M162221140036217	198	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) hep - toplinarstvo d.o.o. hr3823600001500033197 hr01 30120150118-0322-8 potrošnja topl. en. za 03/2022. 	HRK	2022-04-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
09743d20-d4ee-497f-b908-35cf55546152	M162221140036154	86.73999999999999	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) hep elektra d.o.o. dp ele hr9223400091510077598 elec hr01 2200092977-220320-2 racun za:01032022-31032022 	HRK	2022-04-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-06-17 21:28:24.666555
79c0a8aa-8760-4f6a-885e-f8d90ff07f43	1155D22D-05B3-6942-074B-2F8D031D27D3	9.230000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-05-04 15:19:19	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
a3637b71-0eb6-4924-8bcf-1c3fed55eb02	541B80F4-5817-0D00-18C2-F4E09CC3D90A	4.780000000000000	PBZTINA VIROVITICA HR	EUR	2022-04-18 05:21:05	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
787a2256-3b72-4acd-94cd-a055e2ce1bd6	BE4DF16C-E3DA-5DC0-0BDC-59840E95B3CB	2.390000000000000	PBZTINTERSPAR ZAGREB HR	EUR	2022-04-15 09:15:22	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
83596187-2c27-4221-b0c3-8c4714badab3	478A0B16-22EA-15BD-0B08-3992AE38D074	8.650000000000000	PBZTMCDONALDS ZAGREB HR	EUR	2022-04-14 15:33:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
a0125929-44ca-45e8-8b4b-403acfe27edc	17739288-9103-6276-6B23-CB15606DCC79	14.51000000000000	SD CCOE WEST ZAGREB HR	EUR	2022-04-14 15:27:52	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
ba75bacf-2b50-4c1e-b0a9-742a0f108571	0E79F625-7102-43D0-6D2F-6526EAA6B145	3.060000000000000	COCO ZAGREB HR	EUR	2022-04-14 13:21:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
a9f89848-885b-4982-9cac-16ac18adabcf	8F63FCCB-820A-2828-98FB-2C99569365EF	2.390000000000000	PBZTINTERSPAR ZAGREB HR	EUR	2022-04-14 08:55:04	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
d05a5d7d-4125-4e7b-958e-f62ec4092704	07123A7A-9ECA-39AE-08FC-E5285C64880E	4.530000000000000	COCO ZAGREB HR	EUR	2022-04-14 08:47:05	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
311fcfb6-36fc-4eaa-89c7-a176dbc61001	3F806512-46E3-D932-1C25-0FE319C4C733	4.520000000000000	COCO ZAGREB HR	EUR	2022-04-13 09:28:32	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
d4b161da-8e3c-47cc-9160-84a556ae7fc0	6B9E07B8-6296-D6C4-1CB4-F914DEC6024C	2.390000000000000	PBZTINTERSPAR ZAGREB HR	EUR	2022-04-13 09:21:25	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
18f1aa65-29a8-48ee-bc7c-431ce0b2e96f	FFBE0F53-E6A9-5748-2ED0-6C99CF68FF74	9.039999999999999	PBZTLUKOILBP ZAGREB HR	EUR	2022-04-11 16:18:50	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
21d754e9-5dff-47fb-b5e5-285cc1634d42	95A511E5-4525-B005-BA1A-A5195F68FE3D	0.6600000000000000	COCO ZAGREB HR	EUR	2022-04-11 09:42:19	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
0418fd51-06ec-4832-9ca0-38f58442466e	DA988073-655C-107E-BBF8-3758846B4DF9	4.120000000000000	PBZTINA SLAVONSKI BROHR	EUR	2022-04-10 13:07:37	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
2b84e71f-e00d-44e8-8549-83edb80ae4a8	A67BDB32-7CBC-B59D-7A2B-46CD16B6F705	7.040000000000000	PBZTMCDONALDS ZAGREB HR	EUR	2022-04-08 09:23:13	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
12fa3863-4aa3-4bb3-8b18-babb0cb5d669	902BE851-F26E-B4FC-B3CA-A74B0A5C8204	13.03000000000000	COCO ZAGREB HR	EUR	2022-04-07 15:51:14	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
26210887-d9db-4495-929c-bec8a7de013f	4612C604-28BF-4837-43AC-67AF32205E1F	9.570000000000000	Avant Gastro Zagreb HR	EUR	2022-04-07 10:21:58	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
55ef824e-7087-4e31-85e9-68d77dec7649	FCFF0784-E951-A211-D23B-1931357E500B	9	PBZTINTERSPAR ZAGREB HR	EUR	2022-04-07 09:10:22	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
96d9c8d1-b0e5-48cc-8373-b1b146fda623	BA9FF2D6-D679-D329-8D4F-1F83A5233763	13.37000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-04-07 05:48:51	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
1b200c82-2b5f-4dd1-9aec-c4d1abdee5c3	4E0813D2-FBCE-3E08-27A9-C2126000654F	14.30000000000000	UBER *TRIP Amsterdam NL	EUR	2022-04-07 04:46:12	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
69e1a889-ee6d-42bc-ad59-508562618a31	F4AE857E-9CAC-4F49-3DC5-EB025152D41E	14.28000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-04-07 04:23:26	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
f080dd4c-5ab6-4fb9-a201-d3e7652c204a	C2D572D6-7C69-E710-41BB-9EADAF311C85	4.260000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-04-06 18:00:29	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
7d08b03b-152e-4c24-8080-5160e5b35821	DFF6B528-C9FB-F107-2E7B-A338E6715FE3	4.520000000000000	TISAK P-0002 ZAGREB HR	EUR	2022-04-06 17:26:58	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
dfc8a834-7801-4671-aaf4-b59d30d16e51	40C94250-4CFC-3E32-A459-D0FAC214D36E	11.17000000000000	BIG FIVE ZAGREB HR	EUR	2022-04-06 17:05:25	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
80378b8f-5549-48dd-8ded-c4259d53aef2	0786771E-BDA0-3A03-5B2F-0A7CE8AE2EDF	4.530000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-04-06 16:08:25	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
d3d16228-1f5f-4b3b-bc17-d4c682de3da7	145C001B-6206-2016-458E-D3DAFAB9EE0F	11.71000000000000	Glovo 05APR ZAKTGR6VQ Barcelona ES	EUR	2022-04-05 13:21:02	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
90dd9198-3db5-4f0b-995d-572c93ae0e7f	107011AC-55F6-39F1-394B-DF463044028D	8.220000000000001	PBZTMCDONALDS ZAGREB HR	EUR	2022-04-04 09:09:55	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
2a08d1fa-06f0-4840-8c2a-43d81dda545e	3C8A1BEE-6E2C-A6B3-A5AC-C22DFDD7B27B	58.76000000000000	PBZTSPARSMARKETP62 ZAGREB HR	EUR	2022-04-03 10:42:50	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
6a7831c2-5650-4724-bf25-38420205e6c5	CB592755-BC50-A9DA-2619-1F6F861BC671	1.630000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-04-02 21:44:08	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
87f528fe-ca6d-444b-a282-1f14f7e5cfa9	38FD85DB-0578-0A06-47E9-655684C5C93C	9.279999999999999	PBZ7CINESTARNZG ZAGREB HR	EUR	2022-04-02 18:42:46	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
dc0718f2-86d4-4fc8-9ca9-6cb178718b73	21F2DBCA-0003-63FF-4531-BA3FD88DD616	1.510000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-04-02 17:55:09	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
edbc8ddf-81b3-42b0-a74d-cae72fda2256	BD71C25B-845E-7656-5E4F-405979C21D99	3.240000000000000	PBZTINTERSPAR ZAGREB HR	EUR	2022-04-01 09:08:25	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
c6401645-d2f4-4480-aae2-cf4e2be06128	2217AFC6-44A1-F8BD-7AB5-DC3D7B064B90	7.730000000000000	PBZTINTERSPAR ZAGREB HR	EUR	2022-03-31 12:32:25	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
c3a5af94-b67d-43a9-aa1b-054dc99343cf	31FE5700-D412-3531-6538-EA75C5B5F717	9.060000000000000	TOBACCO ZAGREB HR	EUR	2022-03-31 08:41:42	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
b4c557d1-8c8f-4a9e-b820-714cce750e20	6CE504CB-3A96-7D9B-77E3-6B0D9AFAF905	3.640000000000000	PBZTINTERSPAR ZAGREB HR	EUR	2022-03-30 13:51:15	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
36e1020a-9486-43cb-8200-37dbe9c147f7	47823F73-B4A8-D2C9-40D9-4C0431BAE030	7.340000000000000	DOUGLAS ZAGREB HR	EUR	2022-03-30 13:46:21	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
e0f0a435-4dfc-476e-b771-79762710e8a9	7561B205-5262-03CD-2FBA-711EEA297CBE	5.480000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-03-30 08:37:29	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
191fd2e8-5f3a-4baf-b197-789bd54434be	BD0AE41A-461A-97E0-E31A-13F6C34CF743	15.75000000000000	Glovo 29MAR ZAQZJJ2TY Barcelona ES	EUR	2022-03-29 18:19:34	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
a15368fd-b011-49f1-9517-ac1342f47fd6	E2CD556C-E28D-BA30-A01E-C34134CDBA09	3.520000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-03-29 16:58:03	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
2b222310-ee74-4749-8b6a-d601deb51e97	30251A7A-C953-4932-8B86-D03F2044652E	3.960000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-03-29 15:24:05	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
b3d75ce9-0e4b-4f1b-9e98-f209bbbddeb8	A8EA816F-3B3D-30CD-F434-65796AEC0F69	6.090000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-03-29 14:19:34	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
45c2169f-e3bd-47ba-9842-2ec2442fb0c0	F0803392-A22C-8F24-062D-FD9D6FCCE332	2.840000000000000	PBZTINTERSPAR ZAGREB HR	EUR	2022-03-29 10:03:36	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
e3de855a-debd-4c24-8626-0e8878284e7e	38039E0E-0878-5674-7FBA-DD8022DBB28D	25.69000000000000	PBZ7CINESTARNZG ZAGREB HR	EUR	2022-03-28 20:09:04	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
e6e246d3-27fa-4c0e-b359-2f2f999e85de	906134D7-E335-AA02-5A37-3FD29A73BA7F	9	COCO ZAGREB HR	EUR	2022-03-28 14:06:29	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
ae36c8cf-e7c1-4d68-9a88-43c37dff183c	D3A91CD0-CD1C-EEE6-7107-E8A59D16E660	2.630000000000000	PBZTINTERSPAR ZAGREB HR	EUR	2022-03-28 14:04:57	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
82862e68-11e7-4f08-b378-90956c7eca56	E073B95E-46CC-220F-6270-1DEFE7F70046	51.45000000000000	PBZTSPARSMARKETP62 ZAGREB HR	EUR	2022-03-27 14:47:44	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
64b33130-29cf-406a-bc37-a3558ed94071	9AB59619-F22A-A3E0-1926-C6DD290C5418	18.01000000000000	NOKTURNO DOO ZAGREB HR	EUR	2022-03-26 17:48:13	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
a003b3c3-a96f-4b78-b3d0-60deb485b49a	24816D6A-B9C9-A2F1-9D21-7C0CD0D146D6	5.170000000000000	Glovo 25MAR ZAXMAVCXN Barcelona ES	EUR	2022-03-25 18:31:52	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
e42dd35e-5065-42da-9766-e6d45f2b35e0	299F08C9-5DA9-42AE-E456-626EE2139B62	0.9300000000000000	COCO ZAGREB HR	EUR	2022-03-25 10:42:05	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
b6d40de1-6f0e-4307-a0f0-e7159a829fab	D32E6D18-66F9-FFC0-7B14-8E713C8D2686	6.490000000000000	ALI KEBABA CCOW ZAGREB HR	EUR	2022-03-25 10:15:03	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
f81f5b3c-efe3-4523-bf04-1b88fe9cfa46	D496749C-D90A-2D93-9B5A-6A158BED1551	5.440000000000000	COCO ZAGREB HR	EUR	2022-03-24 11:03:02	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
437d8198-7cc7-40e2-8be9-6b0acf669a21	7ED9E284-D229-E889-9398-44DA937F596B	7.160000000000000	PBZTMCDONALDS ZAGREB HR	EUR	2022-03-24 10:40:33	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
3069556a-c271-4df3-a86a-d662e0b92c38	B44D4B14-1011-14C8-2E9B-5243D097C3EF	11.14000000000000	Glovo 22MAR ZABPJDJDR Barcelona ES	EUR	2022-03-22 15:15:16	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
f2d30db3-2c4a-4659-8a40-ae96fc649802	74A75018-08F2-52B3-92AC-B74F425D7129	3.430000000000000	PBZTINTERSPAR ZAGREB HR	EUR	2022-03-22 10:18:23	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
3f2f27d9-489d-4054-9c8f-19f9ae023cba	62BFBCE4-EB0E-BDF8-8A46-31B4D70B8A40	4.990000000000000	GRADSKA LJEKARNA ZAGREB OZAGREB HR	EUR	2022-03-21 18:44:54	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
bc8c424a-4704-4953-bedb-4abb4bae8ba6	D71E2196-90F9-D235-4E2C-C31C33D5C920	9.150000000000000	PBZTMCDONALDS ZAGREB HR	EUR	2022-03-21 11:17:21	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
0472c042-3b05-4545-a94c-aa091f184aec	C85ACAC1-B36C-D43F-6B61-8AF0D3CDE30C	5.390000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-03-21 07:46:36	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
a0f4c982-6abc-4b0b-a3db-1391a2483e30	CDDC810E-4294-A024-649E-0AD8ED8C1DA7	17.24000000000000	Glovo 20MAR ZAZRY5NQY Barcelona ES	EUR	2022-03-20 19:35:09	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
d656ab12-3810-453d-bd5f-ad4eaf99bd98	054D0046-17D8-70BC-0F48-AD65305B3DEE	23.21000000000000	Glovo 18MAR ZA1UDLYSM Barcelona ES	EUR	2022-03-18 22:12:28	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
8ea2d33b-c791-45ee-a4c1-07b5a8392e81	3DE263D4-9404-B157-8144-8966D68288A2	13.35000000000000	Glovo 17MAR ZAWRMNYBU Barcelona ES	EUR	2022-03-17 18:24:24	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
86f298c3-a232-4cad-91b7-ad78e14d176f	12CD6665-D297-757D-EE16-2BF7CCB735EC	5.440000000000000	COCO ZAGREB HR	EUR	2022-03-17 10:34:34	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
ce16dcd3-17ef-4a55-9c24-d316906aef57	BACDB9BB-6DD5-2986-5B5F-F498BA0077E9	5.580000000000000	PASTA FASTA ZAGREB HR	EUR	2022-03-17 10:08:45	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
7b006b14-65b3-4d97-a389-e2dd0b9c4874	E0C15C13-4E31-8898-39A5-EF1245406890	5.430000000000000	COCO ZAGREB HR	EUR	2022-03-16 10:45:43	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
6b4b867a-b45d-49a4-822d-467486a0989f	C94B536C-09E0-F447-5149-6479DCAFAEF4	7.160000000000000	PBZTMCDONALDS ZAGREB HR	EUR	2022-03-16 10:13:21	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
d1dd9b6e-75b3-4ffa-9808-496f713158f7	11744E61-34A1-173F-21B2-B0F103269899	37.44000000000000	Kaufland HR 4430 Zagreb HR	EUR	2022-03-15 20:48:15	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
28ea6a6f-1dda-45ea-8fae-c0d053bb1cee	ED2C4FCE-B6C1-4EBA-4AD9-DA650822D899	2.330000000000000	PBZTINTERSPAR ZAGREB HR	EUR	2022-03-14 10:08:16	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
b7f4f270-ea7e-4ec5-9f30-f34c05564120	0ACEF6EB-C265-F431-6865-8DD66A0F1396	12.07000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-03-14 07:19:37	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
5b05549b-6835-44fa-98e7-0ce631f0ae9c	3B75EE91-FB32-BF24-EE8D-EDFBB8E8265B	31.09000000000000	PBZTSPARSMARKETP62 ZAGREB HR	EUR	2022-03-13 16:02:31	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
eab9efad-2f11-47d0-909b-14f8b4371294	B69F9F1B-38D3-6D97-460B-835791B7F88A	1.990000000000000	PBZTMCDONALDS ZAGREB HR	EUR	2022-03-12 21:55:53	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
c231be33-ff58-438c-8101-d11246302bae	197A7FB4-29C6-6FAC-0CCD-5F7A1838A904	2.120000000000000	PBZ7CINESTARNZG ZAGREB HR	EUR	2022-03-12 21:53:27	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
1e6943d0-65a0-4e9b-949c-dbcd8f384aa9	41FB3BDC-BC09-2D85-91C1-EC72C4D9FE5C	27.30000000000000	PBZ7CINESTARNZG ZAGREB HR	EUR	2022-03-12 20:01:10	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
fe9f5c9f-a56a-4f09-9b1b-8db6e0772fad	D15A7FA5-E258-4F98-B361-EC8067C91D58	1.470000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-03-12 19:44:40	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
ffb6f0b0-6d91-4d4c-b69b-cb0a1b8541ca	C9126BDA-77F2-905E-1FA9-BEDC932C4DFB	5.470000000000000	MLINAR PEKARSKA INDUST ZAGREB HR	EUR	2022-03-11 16:47:48	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
dd110449-7467-470d-9b87-8b629febbbff	70B48CC9-6F43-8660-E0FE-07502B9AA962	11.40000000000000	Avant Gastro Zagreb HR	EUR	2022-03-11 16:29:17	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
f40f93b0-053d-4798-90fc-85ded3f85051	BCE4455F-D36B-1F58-2F5E-95ECF6A485BE	5.570000000000000	PASTA FASTA ZAGREB HR	EUR	2022-03-11 10:31:35	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
eaaf6209-f873-48a7-b256-814174fa4073	5E9318E3-48FB-BEEE-4734-9F3479FFB764	23.70000000000000	PBZ7CINESTARNZG ZAGREB HR	EUR	2022-03-10 19:16:32	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
59ef4cad-11bc-4cdf-acba-26a1d4efc2db	8D99159E-9EC5-222B-E433-2F5D13A2FA72	9.560000000000000	PBZTMCDONALDS ZAGREB HR	EUR	2022-03-10 18:58:40	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
82701962-b069-4b38-8ecc-41607e4678ea	62D7AF64-8211-E000-B6CF-E1A5CFE2C02A	1.450000000000000	UBR* PENDING.UBER.COM Amsterdam NL	EUR	2022-03-10 18:35:48	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
32ef0050-c11a-481d-ae2f-080255d52445	28D9D4FC-395D-AA51-A947-D84497A46F68	5.440000000000000	COCO ZAGREB HR	EUR	2022-03-09 10:44:29	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
31a3f6de-2bc6-44f1-a644-b1b11752ee1b	9E1F9BE7-86A9-2BA6-52FF-D1FB17BC6153	5.200000000000000	FOODIE ZAGREB HR	EUR	2022-03-09 10:23:08	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
8ddd7dac-c4fe-4af2-aed7-a122f21f3888	ADAA7E5B-6BE2-458D-7EB7-0DE0E44EB696	5.440000000000000	COCO ZAGREB HR	EUR	2022-03-07 10:37:02	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
c65b0c12-9a35-4bc5-b80d-3a4feba82970	9A47EBD7-A981-6E86-08E0-EFA2A81095F2	6.640000000000000	KFC CCOW ZAGREB HR	EUR	2022-03-07 10:12:46	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
c7cd800f-9b37-43ef-a9a7-5d4f99fe04e4	976AFE2F-06B2-2E3E-9724-EF675C4BFF97	10.88000000000000	Glovo 06MAR ZAMJSXYFJ Barcelona ES	EUR	2022-03-06 16:57:54	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
229e3703-857e-42ed-b795-1a92387a9c49	5F1426F4-1C2E-FBB3-2FE5-F317F3423D3E	18.61000000000000	Glovo 06MAR ZA39LJ6FP Barcelona ES	EUR	2022-03-06 14:11:34	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
2737ce0c-4175-4962-bf51-29cd60a5b2c1	3B360692-FF8D-DAEC-6C59-C1DBC3578D1A	40.80000000000000	KONZUM P-0186 Zagreb HR	EUR	2022-03-05 12:19:06	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
c335cdb6-3823-4bd2-bd43-e20937e04d24	BB41B5B3-E750-C64C-3668-BE7A1749A57F	8.609999999999999	Wolt Zagreb HR	EUR	2022-03-04 17:48:50	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
b766f349-b22f-451e-bd24-29034f780b2b	48D3220E-7B60-5252-7163-CE7D2AF724BF	9.150000000000000	PBZTMCDONALDS ZAGREB HR	EUR	2022-03-04 10:07:40	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
694033bb-df18-4a0e-b31d-58196b52f367	12120988-624C-1F65-8ADB-547A73B92C31	7.980000000000000	Glovo 03MAR ZAQ3G4SWH Barcelona ES	EUR	2022-03-03 18:40:05	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
9a1942c6-94c2-47ca-aa61-8b7ef9b928e5	54392C36-1D00-9053-BF59-A7DA652EB7B3	7.710000000000000	COCO ZAGREB HR	EUR	2022-03-03 14:35:11	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
9bc23782-f288-46e3-b60c-6f4afb394bbe	DE452C76-D9ED-7C10-EFA7-B0EB47C62C55	1.930000000000000	COCO ZAGREB HR	EUR	2022-03-03 10:42:08	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
7aa33ebb-30bc-4e36-b57b-87c85f87ed5c	97D0FA8A-E081-C996-2A12-AB341EB9D379	5.990000000000000	PASTA FASTA ZAGREB HR	EUR	2022-03-03 10:21:22	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
fe640d02-73f2-42b7-97f1-6fa0ca05cc16	96B56099-DD65-6B2B-4517-B0E173300882	3.880000000000000	MLINAR PEKARSKA INDUST ZAGREB HR	EUR	2022-03-02 16:29:34	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
e6a9ac6f-2409-404e-8f18-ebac39cfba60	75A9E853-97E8-3C1C-D013-1B257C623FDA	0.9300000000000000	COCO ZAGREB HR	EUR	2022-03-02 10:28:47	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
e1518b0c-2a06-499f-a20f-266fa47efa49	5E045F73-7C74-1946-8FB7-F977D94978F6	5.960000000000000	PASTA FASTA ZAGREB HR	EUR	2022-03-02 10:06:49	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
6ed4398f-b8e7-4366-aef0-809baecc8b51	97AC2E8B-FA2C-2F2E-BACD-F920FB515556	4.420000000000000	MLINAR PEKARSKA INDUST ZAGREB HR	EUR	2022-03-01 17:02:46	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
a301b70b-3fe6-46f8-94ef-d0bac90356e4	D8169A41-3775-BCBA-64B4-3C7527E74856	5.610000000000000	TOBACCO ZAGREB HR	EUR	2022-03-01 10:11:24	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
93e7eb50-be48-4b9e-86ff-87ad1b4a98af	77648F1E-3436-7D08-8349-B6267DB48D73	4.190000000000000	MLINAR PEKARSKA INDUST ZAGREB HR	EUR	2022-03-01 09:46:33	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
35e19229-7946-4179-b876-1142ca03a295	5B943547-77AC-FC97-0C54-40C27408CEA9	3.670000000000000	MLINAR PEKARSKA INDUST ZAGREB HR	EUR	2022-02-28 16:47:12	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
d67cddda-164b-4629-9014-e8c2463e078f	4D31FCCA-FA32-52FD-28DB-4A4A75609A4F	0.9300000000000000	COCO ZAGREB HR	EUR	2022-02-28 10:37:53	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
87e7325c-cc74-439c-8803-3380506bb984	3C98E759-CFB4-DFF1-9C14-4C434ACE81E1	7.200000000000000	PBZTMCDONALDS ZAGREB HR	EUR	2022-02-28 10:12:30	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
ec1072b7-d1b6-4d99-a274-87a9765d0969	E81B9D64-6ABB-BFCF-58EB-40A235CF69BD	5.800000000000000	KINGUIN.NET INTERNET HK	EUR	2022-02-26 21:13:08	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-06-17 21:28:24.666555
d7802b3b-3329-4da5-92a5-4e8ca188de8b	312FB35B-B60E-E6A0-75D8-CBE40193831A	0.9300000000000000	COCO ZAGREB HR	EUR	2022-02-25 10:44:20	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
f990cb08-751b-43dd-94f3-fbd684dd789f	4F8E5046-6CA1-FEEC-E781-8D51F11DB888	7.310000000000000	PBZTMCDONALDS ZAGREB HR	EUR	2022-02-25 10:15:06	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
074e9999-174e-4656-8c39-ab933b5c4148	4BD11A68-1946-40FF-FD61-B40E0A03F5BF	7.180000000000000	PBZTMCDONALDS ZAGREB HR	EUR	2022-02-24 11:29:28	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
f8bd2808-34fa-4fd8-a78f-e0ba53986b1c	0EE47448-0C67-30AB-182E-C5E05E0E900F	5.670000000000000	Glovo 23FEB ZA5EBR3ZP Barcelona ES	EUR	2022-02-23 20:55:43	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
69db93b8-4590-4cb0-88a6-184d6c1e91c5	62869653-6EB8-C963-B2FA-F831DDBDA8E9	5.440000000000000	FOODIE ZAGREB HR	EUR	2022-02-23 10:28:42	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
2b8d6bc1-b586-4461-a0f5-9bced023c357	7444EF09-DB05-0832-7461-9D630148F518	8.789999999999999	Glovo 22FEB ZAEECJZMV Barcelona ES	EUR	2022-02-22 18:36:37	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
e507f96c-0bd7-4527-a3fe-8016777f4ae3	F3DC7E59-8C2C-3033-BBB3-5252741C1CB4	13.72000000000000	Avant Gastro Zagreb HR	EUR	2022-02-22 10:48:44	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
46c1ae60-d8c9-42cf-a873-3b3111a319c4	1AD0A436-1AAD-0448-B2B0-F6A77AD510C1	5.460000000000000	COCO ZAGREB HR	EUR	2022-02-22 10:25:24	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
a308bb09-a1e9-41e7-aa1a-8516122083db	A08A46CF-EFB0-6B25-4BD2-24FD0B748FFC	4.150000000000000	FOODIE ZAGREB HR	EUR	2022-02-22 10:06:25	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
46ee7c99-fbba-459c-b3ca-12e4a33b1971	682640BC-FB92-9E18-EBE0-441F8F7C2EB0	5.450000000000000	COCO ZAGREB HR	EUR	2022-02-21 10:39:31	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
6569ade1-de72-42d9-a11c-c38d045e18f3	4784861A-3ADC-7338-CCF3-4C389CE20EF4	7.050000000000000	PBZTMCDONALDS ZAGREB HR	EUR	2022-02-21 10:11:23	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
9b65759f-bc5a-4809-ab95-bedfc72ae26d	B160221570076139	109.9000000000000	Kupovina bolt.eu/o/2206060743 tallinn ee domagoj vuković 	HRK	2022-06-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-17 21:28:24.666555
c8d7fa20-e667-4148-84f8-8f73aa443f1b	B160221570121049	19.16000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-06-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
664d8fb8-07dd-4fd8-8a55-e8e57625f8eb	B160221570346140	55	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-06-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
471aca81-e444-46bb-afed-5ac3191b41fc	B160221580171872	879	Kupovina anitini cevapi d.o.o. zagreb hr domagoj vuković 	HRK	2022-06-06 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
e8603802-2bdb-4e58-88e3-1ae0d7453953	B160221580336416	34	Kupovina tobacco zagreb hr domagoj vuković 	HRK	2022-06-06 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-17 21:28:24.666555
1c2c815a-5d6c-4105-81e1-0061bf4980b2	B160221590465347	76	Kupovina glovo 08jun zaztxqnmw barcelona es domagoj vuković 	HRK	2022-06-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-17 21:28:24.666555
aff018a9-ceea-43da-b688-528fd4b585ca	B160221600199232	16	Kupovina google payment ie ltd gdublin ie domagoj vuković 	HRK	2022-06-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-17 21:28:24.666555
d9a136ab-95f9-4561-8e41-c2876bfae0b8	B160221680176100	78	Kupovina glovo 17jun za1m8y8k5 barcelona es domagoj vuković 	HRK	2022-06-16 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-18 09:23:58.181809
f91bf24c-82ac-4d3e-94a1-769c41667b0b	B160221670325341	68	Kupovina tisak p-2942 velika gorica hr domagoj vuković 	HRK	2022-06-15 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-18 09:24:00.108284
3cb22613-16f6-49c0-90a4-2023a7649664	B160221670283665	42.60000000000000	Kupovina minibar frankfurt de domagoj vuković eur 5,60 	HRK	2022-06-15 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-18 09:24:03.62766
593d800c-8a6b-40cf-bdab-cdd3edcbc07e	B160221670273032	120	Kupovina goethe bar frankfurt de domagoj vuković eur 59,00 	HRK	2022-06-15 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-18 09:24:11.574153
e490cff6-b251-4d26-bd5d-7469d9cd9327	B160221670197330	109.5500000000000	Kupovina fish&chips flughafen b schoenefeld de domagoj vuković eur 14,40 	HRK	2022-06-15 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-18 09:24:13.795717
f83972b1-c80a-4205-b6d4-f29b8517fa44	B160221670166467	71.06000000000000	Kupovina rewe markt gmbh-zw schoenefeld de domagoj vuković eur 9,34 	HRK	2022-06-15 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-18 09:24:18.233528
57dba6e4-683b-45fe-a215-1ac9a9a3caf0	B160221680091583	27.84000000000000	Kupovina tier de ride eur 3,66 	HRK	2022-06-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-18 09:24:21.218419
83f189d0-5e64-48d3-bc0b-38843d530338	B160221660263740	100.2700000000000	Kupovina lidl dienstleistung berlin de domagoj vuković eur 13,18 	HRK	2022-06-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-18 09:24:26.516527
5c368268-4d20-4f16-93b1-af812c48e87a	B160221660204413	50	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-18 09:24:31.304053
4e8f58e3-0f06-4626-81c5-d58f7ff16161	B160221660004228	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-18 09:24:33.972873
4ca16d36-b19c-4389-b8d7-04a41087553d	B160221680091685	42.30000000000000	Kupovina tier de ride eur 5,56 	HRK	2022-06-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-18 09:24:36.895602
cb8bad1a-6d2e-4d8d-980e-cbb11c7231b5	B160221660073012	16.28000000000000	Kupovina tier de ride eur 2,14 	HRK	2022-06-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-18 09:24:38.454614
6f09c8f2-4820-48ae-935e-61e464c7ccdb	B160221650414232	25.41000000000000	Kupovina lidl dienstleistung berlin de domagoj vuković eur 3,34 	HRK	2022-06-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-18 09:25:02.621451
c5f168e5-df77-499a-8af8-9e42cffd3404	B160221650258772	47.17000000000000	Kupovina sumup *stephan marczakberlin de domagoj vuković eur 6,20 	HRK	2022-06-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-18 09:25:09.76231
323a59cb-dc68-4b47-be46-c05f0dc659be	B160221650236511	79.88000000000000	Kupovina tier de 6-1520000 berlin de domagoj vuković eur 10,50 	HRK	2022-06-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-18 09:25:12.357392
d744ba6d-8917-43a7-9bcb-8b14dc6cc953	B160221650155767	56.75000000000000	Kupovina tier de 6-1507227 berlin de domagoj vuković eur 7,46 	HRK	2022-06-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-18 09:25:14.824333
d1b6940e-e012-488e-b229-250ef2057287	B160221650002113	150	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-18 09:25:36.832988
4926bd50-4002-4b7e-abce-e1da4d11be91	B160221660072943	37.96000000000000	Kupovina tier de ride eur 4,99 	HRK	2022-06-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-18 09:25:38.855234
34f58b8a-b7a4-4a0d-b1ac-d300d4e0b8f6	B160221640381607	91.29000000000001	Kupovina 2303 quickers koeln koeln de domagoj vuković eur 12,00 	HRK	2022-06-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-18 09:25:54.356172
b3f7d41d-97e0-4cb5-a8d7-1816c3e9e9f9	B160221640239766	24	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-06-18 09:26:01.166776
8710d3c4-c2db-4dbe-9659-066c593ed772	B160221640203395	84.98999999999999	Kupovina tisak p-2941 velika gorica hr domagoj vuković 	HRK	2022-06-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-18 09:26:02.654955
ad1bbea3-f5a2-41e0-ad99-9e235b581311	B160221640081447	71.40000000000001	Kupovina bolt.eu/o/2206130738 tallinn ee domagoj vuković 	HRK	2022-06-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-18 09:26:03.560641
d12ec83b-9f8c-4bd7-8d68-1904e1d97129	B160221630203243	78	Kupovina glovo 12jun zal3hk1aa barcelona es domagoj vuković 	HRK	2022-06-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-18 09:26:04.414007
8b25dd81-0aa4-43b5-b62a-e0e86c38833b	B160221620435202	80.93000000000001	Kupovina pbztsparsmarketp62 zagreb hr domagoj vuković 	HRK	2022-06-10 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-18 09:26:05.623523
bc94e90c-04ca-41d5-908c-d452255ac416	B160221620427288	90	Kupovina burger bar mrav zagreb hr domagoj vuković 	HRK	2022-06-10 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-18 09:26:16.035709
5f522e14-5839-418b-94ba-6ef90c5a3ba2	B160221610498795	24.50000000000000	Kupovina wolt zagreb hr domagoj vuković 	HRK	2022-06-09 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-18 09:26:17.261671
a218f1f1-b16c-482f-82ef-ef5e2bbe7bbf	B160221610088116	88.50000000000000	Kupovina wolt zagreb hr domagoj vuković 	HRK	2022-06-09 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-06-18 09:26:18.156015
77336964-8442-4908-a4ee-b16d5ee6f44c	B160221610009350	19.99000000000000	Kupovina glovo glovo prime barcelona es domagoj vuković 	HRK	2022-06-09 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-06-18 09:26:22.439934
efcae805-2da8-4300-9ed2-d184207c805b	B160221600162456	25	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-18 09:26:27.524674
8537e5fc-f5d8-407c-870a-5b8b5fb520df	B160221600149999	37	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-06-18 09:26:29.391282
96ce456c-d5d5-4849-a3e3-44854f678b40	B160221600054218	66.64000000000000	Kupovina ubr* pending.uber.com amsterdam nl domagoj vuković 	HRK	2022-06-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-06-18 09:26:30.360601
bff24def-4cd0-481d-a2a0-a74febb56696	B160221570366692	39	Kupovina hgspot grupa zagreb hr domagoj vuković 	HRK	2022-06-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	cf96ec31-c4a5-46d3-8d0b-1d67fd9f841c	2022-06-17 21:28:24.666555
f76a9b51-bb48-46e3-b344-012d7d77561a	B160221550251773	149	Kupovina hgspot grupa d.o.o. zagreb hr domagoj vuković 	HRK	2022-06-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	cf96ec31-c4a5-46d3-8d0b-1d67fd9f841c	2022-06-17 21:28:24.666555
5e99a617-29ca-4e07-9aae-d29024ccd717	B160222660436669	62.99000000000000	Kupovina glovo 23sep zalp1fvw4 barcelona es domagoj vuković 	HRK	2022-09-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:52:32.581762
a542dea0-c9d6-4f78-aef7-e8612073e5a0	B160222660329204	18	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:52:41.725031
ac3306ec-00b3-4f97-bf0e-0ee6dbb4cbca	B160222660160807	5	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 10:53:19.465403
f624b925-06f8-4e8f-9f35-a832026b2016	B160222660152254	43	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-09-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:53:21.564137
59990c03-3588-4abb-ae0d-cd8da0dabcf9	B160222660140588	39.20000000000000	Kupovina pasta fasta zagreb hr domagoj vuković 	HRK	2022-09-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:53:28.224863
ed652243-0f55-454f-88e0-a096a76e0915	B160222650149713	35	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-09-21 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:53:32.900816
b6564b30-00cd-44e1-8176-c0a53af68107	B160222650148832	20.54000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-09-21 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:53:34.19759
2e43413e-1519-4b01-88ab-c7d2aa9f7dbe	B160222640464845	331.0300000000000	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-09-24 10:55:14.137232
82820da4-d895-4d79-969c-568cc424f6e2	B160222640464765	253.7000000000000	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-09-24 10:55:26.615881
d2c81436-4f45-453b-a074-c19bd1bf3431	B160222640381725	60	Kupovina wolt zagreb hr domagoj vuković 	HRK	2022-09-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:55:27.591893
1b777238-00ae-4c99-abae-cd4f3ffa3080	B160222640161605	14	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:55:31.152245
f094c31c-a8cc-41e9-a781-6094adbe9687	B160222640063895	49.20000000000000	Kupovina bolt.eu/o/2209210712 tallinn ee domagoj vuković 	HRK	2022-09-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 10:55:32.440934
158294a7-7a2a-489e-a831-d43da94c9cc4	B160222640044253	35	Kupovina nada trgovina d.o.o. zagreb hr domagoj vuković 	HRK	2022-09-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:55:40.650105
b0b2e145-2a2a-4fef-b188-7baeaf4aef7f	B160222630381504	285.2900000000000	Kupovina pbztsparsmarketp62 zagreb hr domagoj vuković 	HRK	2022-09-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:55:54.97553
db188c4c-5a9a-4141-bae5-78b471bf2609	B160222630359409	18	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:55:57.502061
5f12753d-bd81-4c9e-b262-f6e508828044	B160222630358086	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:55:59.468201
521df774-873b-4f11-b9f9-50f547d45762	B160222630139218	50	Kupovina dominos pizza croatia zagreb hr domagoj vuković 	HRK	2022-09-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:56:09.684878
8c603a2a-0575-427c-bbfa-db69331af129	B160222620400069	84	Kupovina kfc arena zagreb hr domagoj vuković 	HRK	2022-09-18 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:56:12.382994
b0cd5375-2192-421c-b72a-252a97cd93f1	B160222620127666	23.70000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-09-18 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:56:13.741009
f75882b5-fc8b-4d66-aac3-83cac4b7beff	B160222610308089	36.47000000000000	Kupovina ubr* pending.uber.com amsterdam nl domagoj vuković 	HRK	2022-09-17 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 10:56:15.238285
86c4284f-edf9-4c7b-91bd-c335f9361572	B160222610254114	44.99000000000000	Kupovina pbztina virovitica hr domagoj vuković 	HRK	2022-09-17 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:56:24.328667
e82e9711-e6c7-4bb2-a418-9e47e7ebd85f	B160222600112468	99	Kupovina anoval - telekomunikac virovitica hr domagoj vuković 	HRK	2022-09-16 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	cf96ec31-c4a5-46d3-8d0b-1d67fd9f841c	2022-09-24 10:56:39.003864
8de56e04-af24-4898-83c8-0dfd85b4a712	B160222600093399	74.98999999999999	Kupovina kaufland pm 2930 virovitica hr domagoj vuković 	HRK	2022-09-16 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:56:40.245065
c02bdc05-1337-4ccf-981e-5f1c14e60f3e	B160222600019043	47.68000000000000	Kupovina ubr* pending.uber.com amsterdam nl domagoj vuković 	HRK	2022-09-16 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 10:56:41.124296
56684de0-224f-4d2f-ae19-36a6d7670ce3	B160222590409363	139	Kupovina hz putnicki prijevoz zagreb hr domagoj vuković 	HRK	2022-09-15 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 10:56:42.817122
b1ac50a0-9177-4eab-9731-e9a5d8e3e0dc	B160222590303097	20	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-09-15 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:56:52.272714
3c14c8f2-a91e-43be-bbba-0af31626415e	B160222590161756	40.98000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-09-15 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:57:11.43677
e7dc551b-7daa-451c-ac62-c286c5be04dc	B160222590150573	56	Kupovina pbztmcdonalds zagreb hr domagoj vuković 	HRK	2022-09-15 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:57:12.112602
76a982ec-43cc-468c-9dd4-86610f742c88	B160222580365170	17	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:57:14.279883
7deeebd7-fc66-40fb-82a6-478f9c25a1c7	B160222580176005	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:57:15.907708
0699f469-a00a-4066-b164-d69f8e1156a1	B160222580158850	44.99000000000000	Kupovina pbztinovine zagreb hr domagoj vuković 	HRK	2022-09-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:58:05.107597
f390d0c7-5e3d-4ddf-aec7-00fc901d4698	B160222580147885	39.20000000000000	Kupovina foodie zagreb hr domagoj vuković 	HRK	2022-09-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:58:14.316936
ab64e885-bb36-43f9-b264-41d3343da7e7	B160222570302693	84.53000000000000	Kupovina name-cheap.com* pjo9zx +13233752822 azus domagoj vuković usd 10,88 	HRK	2022-09-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 10:58:25.022541
47ebaa91-6120-47b3-aa59-9e2eb091a872	B160222560381955	62.99000000000000	Kupovina glovo 13sep zaxcxmthu barcelona es domagoj vuković 	HRK	2022-09-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:58:36.288907
31f52031-21c1-429d-89ac-b80692b71141	B160222560350573	16	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:58:38.322368
04ba4df4-68da-434b-8264-7e3218e44560	B160222560168729	15	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:58:39.994738
1f9ffa1f-44f2-4b53-a99e-f195a203a227	B160222560140617	47.50000000000000	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-09-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:58:41.796536
f466eff2-c262-460e-9db2-1e01266fa973	B160222560139746	74.28000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-09-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:58:42.890923
b06d4578-ea43-4b69-9a7b-7f45601a037e	B160222550366705	75	Kupovina glovo 12sep zabt1j5mx barcelona es domagoj vuković 	HRK	2022-09-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:58:43.862453
3c63d696-8f82-408f-a878-2b57fcb20801	B160222550329778	18	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:58:46.745091
0f094210-d95b-4c8b-b62e-d1137695096d	B160222550185110	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:58:48.515094
f82c1b44-bcae-4482-bd46-0de86db96f6d	B160222550160543	40.98000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-09-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:58:50.558542
e53ce302-a34a-488c-9820-3bad96303aca	B160222550149270	39.20000000000000	Kupovina pasta fasta zagreb hr domagoj vuković 	HRK	2022-09-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:58:51.228093
98ee5741-f3aa-4628-a82a-59f7ea9a9de4	B160222540271239	62.99000000000000	Kupovina glovo 11sep za8xlssvk barcelona es domagoj vuković 	HRK	2022-09-10 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:58:52.015192
0b55453d-ce3a-490d-aff5-db72d2715c77	B160222530140727	390.4800000000000	Kupovina pbztsparsmarketp62 zagreb hr domagoj vuković 	HRK	2022-09-09 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:58:52.879515
7397621b-0da6-4097-9358-276ed04b3956	B160222520356398	15	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:59:09.752098
240818ac-354d-4e03-b7cd-145d421fd4ea	B160222520233774	16	Kupovina google payment ie ltd gdublin ie domagoj vuković 	HRK	2022-09-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-09-24 10:59:16.563072
5ff67cef-1a25-4a15-9ab2-f3cab98b28d1	B160222520174172	21.94000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-09-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:59:21.153961
77d533f0-ac01-4ddc-bce6-6953401fd287	B160222520057205	44	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-09-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:59:21.902938
862e48f3-9df4-4750-b2dd-ee1c62ef51c8	B160222520029707	360	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 10:59:24.998516
d5ea669c-7b14-4ea2-b823-79e03280e2fa	B160222510392202	57	Kupovina glovo 08sep zarucxjak barcelona es domagoj vuković 	HRK	2022-09-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:59:33.40722
586778e3-ddb4-47c7-9efe-bc56e81a65b5	B160222510186209	80	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-09-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:59:34.329582
c575762c-dcf4-48fc-ae70-4a4685df75fa	B160222510153745	43	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-09-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:59:35.890911
d64b0a13-f71a-4563-8003-7dbf8b3fb704	B160222510151631	20.38000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-09-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:59:44.793624
c1e856c5-a658-42ac-a486-bca5730b4748	B160222500161543	20	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-09-06 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 10:59:53.033571
c882fe10-cf69-4ecb-bd60-823005bede04	B160222500138141	51.50000000000000	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-09-06 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 10:59:54.396724
2d637869-3f02-4aaa-95b8-864cb596ed2e	B160222500127615	39.20000000000000	Kupovina pasta fasta zagreb hr domagoj vuković 	HRK	2022-09-06 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:59:57.823682
916bd52c-bb75-4130-8b63-5fa717079da0	B160222500056846	69.90000000000001	Kupovina ubr* pending.uber.com amsterdam nl domagoj vuković 	HRK	2022-09-06 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 10:59:58.626007
c0d575be-5528-4625-967e-d8f1d07863ab	B160222490348754	69	Kupovina wolt zagreb hr domagoj vuković 	HRK	2022-09-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 10:59:59.304975
afb2146a-4a9e-4d84-a722-6f0ec845aab9	B160222490159287	43	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-09-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:00:02.586407
323ea898-f162-48fc-8a75-bf1d31903e63	B160222490147256	39.20000000000000	Kupovina pasta fasta zagreb hr domagoj vuković 	HRK	2022-09-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:00:03.320523
1cc60444-20ce-4714-9d1c-4994c30d16fc	B160222480124923	43	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-09-04 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:00:04.869566
06c57d2c-bfb2-42f7-85a4-a82ff7ff42bc	B160222480117508	40.80000000000000	Kupovina foodie zagreb hr domagoj vuković 	HRK	2022-09-04 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:00:05.704638
43513936-80a9-428e-9699-4c869634be57	B160222470116785	229.5100000000000	Kupovina pbztsparsmarketp62 zagreb hr domagoj vuković 	HRK	2022-09-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:00:06.920504
53216f49-909a-4ba8-b776-bba938396d11	B160222460406293	228.0100000000000	Kupovina steam purchase 425-952-2985 de domagoj vuković eur 29,99 	HRK	2022-09-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 11:00:11.632596
52bd2ee2-1819-4c8d-b143-756a81ae3320	M160222460028554	3370.450000000000	Kreditni transfer nacionalni u valuti različitoj od eura on-line bankarstvom (m-zaba) domagoj vuković hr4823600003250759924 prijenos na vlastiti račun usd 436,00 tečaj zaba 03.09.2022 tečaj zaba 03.09.2022 1 usd= 7.730400 hrk 	HRK	2022-09-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a6e0d1b4-0363-484e-aa8f-e006851aa91d	2022-09-24 11:00:18.441824
e76c2ce2-6535-41f0-b613-f041bba5c853	M160222460028458	500	Kreditni transfer nacionalni u valuti različitoj od eura on-line bankarstvom (m-zaba) domagoj vuković hr4823600003250759924 prijenos na vlastiti račun usd 64,68 tečaj zaba 03.09.2022 tečaj zaba 03.09.2022 1 usd= 7.730400 hrk 	HRK	2022-09-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a6e0d1b4-0363-484e-aa8f-e006851aa91d	2022-09-24 11:00:24.191325
5d21cac9-8687-4110-8a6a-f817d3071e72	B160222460315950	405.8600000000000	Kupovina digitalocean.com +16468274366 nyus domagoj vuković usd 52,24 	HRK	2022-09-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 11:00:27.392752
b1e8f82c-9a6d-4965-bf05-88467092e1ca	B160222450422801	84	Kupovina glovo 02sep za2p1ze3l barcelona es domagoj vuković 	HRK	2022-09-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:00:28.698605
fc3ba4d9-bef5-4c4e-b837-347cc8264969	B160222450272011	15	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:00:31.199897
bbdf2d26-f86a-43bd-b1bb-a33320a7dad9	B160222450157397	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-09-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:00:32.998184
9245db69-6e61-4165-9313-940b0e7ebae0	B160222450142111	43	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-09-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:00:45.465735
0d9eeedc-66df-4805-a9b1-537feacae0bb	B160222450129313	39.20000000000000	Kupovina pasta fasta zagreb hr domagoj vuković 	HRK	2022-09-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:00:46.333311
6e83678d-7713-422f-88dd-f7e78930a559	M160222440086323	1750	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) jadranka marković hr9423600003116214470 hr00 09-22 najamnina 09-22 	HRK	2022-08-31 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	e73616ca-7c4e-4105-808e-f9ffef14e515	2022-09-24 11:00:48.327272
9ce0669f-f8b4-46d2-9c8b-d3aa336a2caf	B160222440130232	44.99000000000000	Kupovina pbztinovine zagreb hr domagoj vuković 	HRK	2022-08-31 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:00:50.782715
e9de35db-4c2c-40b5-86af-d9e08f5a8fa1	B160222440114845	63	Kupovina pbztmcdonalds zagreb hr domagoj vuković 	HRK	2022-08-31 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:00:51.623841
b06b631f-b7f7-47db-a6dc-211592b5f21e	B160222430328534	94	Kupovina glovo 31aug zagcb1u1w barcelona es domagoj vuković 	HRK	2022-08-30 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:00:53.958899
e196d000-eae0-4716-b1c6-9c2bdca4c996	B160222420378067	234.5100000000000	Kupovina pbztsparsmarketp62 zagreb hr domagoj vuković 	HRK	2022-08-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:00:54.836853
de0e4c66-228a-4178-88be-39081db35af6	B160222420140400	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-08-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:00:56.649069
868c0b8b-d867-4f2c-822b-c1e972b91bc8	B160222420123884	43	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-08-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:00:57.447745
4240ca4d-7374-4a52-83fb-a32fe48d4979	B160222420113247	39.20000000000000	Kupovina foodie zagreb hr domagoj vuković 	HRK	2022-08-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:00:58.338129
49eefae5-36ba-467f-8958-63b48bb6f811	B160222420111869	45	Kupovina ali kebaba ccow zagreb hr domagoj vuković 	HRK	2022-08-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:00:59.410243
5411787d-1711-4b40-941a-ec8a0c7b473d	B160222410293123	53	Kupovina burger king z centar zagreb hr domagoj vuković 	HRK	2022-08-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:01:00.423988
01f8139c-1d4a-4c23-ac9e-7ebbf5f4757c	B160222410292218	35	Kupovina tobacco zagreb hr domagoj vuković 	HRK	2022-08-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:01:01.270181
6272b33a-d36f-4595-aee0-57d4dc7263c6	B160222410147981	99	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-08-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:01:02.048408
f13c132f-f206-412d-8abd-745a99136720	B160222410115244	40.80000000000000	Kupovina foodie zagreb hr domagoj vuković 	HRK	2022-08-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:01:03.679627
7f688039-6f30-4e9c-b55a-6456bd4ba58a	B160222410104069	54.90000000000000	Kupovina bolt.eu/o/2208290853 tallinn ee domagoj vuković 	HRK	2022-08-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:01:04.541422
c1896723-b93f-49b1-8330-361f4d212430	B160222410015846	35	Kupovina pbztina virovitica hr domagoj vuković 	HRK	2022-08-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:01:08.226882
acf06048-9c3b-4ffd-821e-dde56bf96cdb	B160222390400992	120	Kupovina revolut**5414* dublin ie domagoj vuković 	HRK	2022-08-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 11:01:26.907776
2f80bf93-797b-4477-b557-8e473fc3aebf	B160222390345518	64	Kupovina tisak p-2158 virovitica hr domagoj vuković 	HRK	2022-08-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:01:29.667603
8a639f4c-6e4a-44b4-97aa-1e8baab7180d	B160222390123077	317	Kupovina anoval - telekomunikac virovitica hr domagoj vuković 	HRK	2022-08-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	cf96ec31-c4a5-46d3-8d0b-1d67fd9f841c	2022-09-24 11:01:33.602418
ad082722-8bb9-4457-ae06-97b5de0fa590	B160222390112758	74.98999999999999	Kupovina kaufland pm 2930 virovitica hr domagoj vuković 	HRK	2022-08-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:01:34.513685
4138890e-0b3d-4662-9f1f-4beec4405662	B160222380298025	43.40000000000000	Kupovina bolt.eu/o/2208261409 tallinn ee domagoj vuković 	HRK	2022-08-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:01:36.323321
45d8e454-35b1-469c-a712-776a5337f538	B160222380272035	56.30000000000000	Kupovina bolt.eu/o/2208261320 tallinn ee domagoj vuković 	HRK	2022-08-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:01:36.937147
07fa2aa6-4491-4c8c-b511-16ff66fb1307	B160222380181179	12	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-08-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:01:38.792906
056da401-3d2a-44ce-a9f5-70b45946413a	B160222380068706	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-08-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:01:45.08677
6e2a0cdd-e428-45ca-a3d3-8957bff35cf8	B160222380017639	203	Kupovina hz putnicki prijevoz zagreb hr domagoj vuković 	HRK	2022-08-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:01:47.051591
c53dbc6f-7415-4f1c-8ebb-20bfd2970959	B160222370361909	73.50000000000000	Kupovina bolt.eu/o/2208251607 tallinn ee domagoj vuković 	HRK	2022-08-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:01:47.839598
c388aeb7-dd57-4197-afca-9b3ec3ce6964	B160222370313444	82	Kupovina burger king z centar zagreb hr domagoj vuković 	HRK	2022-08-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:01:48.890067
8876686d-823d-48ab-a22c-9b8275c1a8ee	B160222370311287	35	Kupovina tobacco zagreb hr domagoj vuković 	HRK	2022-08-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:01:49.64198
9fc62513-d14d-4e0b-ac5b-e7e34da871ea	B160222370145336	12	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-08-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:01:51.63285
2604e23e-3b28-489a-ad09-28f61d6b65bc	B160222360408944	160.4900000000000	Kupovina pbztsparsmarketp62 zagreb hr domagoj vuković 	HRK	2022-08-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:01:52.552404
f266c93c-e2aa-46c3-947e-e06eae403235	B160222360333376	48.30000000000000	Kupovina bolt.eu/o/2208241601 tallinn ee domagoj vuković 	HRK	2022-08-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:01:53.28493
5c80c054-639e-43a2-91ef-23e769ce26b6	B160222360147329	42	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-08-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:01:54.027321
0ce19716-bb87-4449-b139-0907dee19b54	B160222360144281	35	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-08-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:01:59.636988
884ab7ff-ff9b-4568-92f6-5d814f972994	B160222360118037	50.40000000000000	Kupovina foodie zagreb hr domagoj vuković 	HRK	2022-08-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:02:00.636978
8fb8c4bd-71b0-4f03-93d0-c14ea569bcc4	B160222350340052	35	Kupovina tobacco zagreb hr domagoj vuković 	HRK	2022-08-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:02:17.773729
2a893b48-a32c-4cde-81df-bca8f2d0c094	B160222350313409	30.89000000000000	Kupovina mlinar pekarska indust zagreb hr domagoj vuković 	HRK	2022-08-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:02:19.152842
21341d84-1516-4567-a1b0-e534406e884f	B160222340332582	20	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-08-21 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:02:25.552473
1940cc6d-367c-46eb-9453-02e2d8d3e7e5	B160222340240800	5	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-08-21 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:02:31.518
b9909c05-1408-4846-99eb-6c1361df8b2b	B160222340143530	21.95000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-08-21 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:02:32.349294
a90de914-fd15-44f7-85f8-0340dfee3e28	B160222330277564	75	Kupovina glovo 21aug zay8mlhvp barcelona es domagoj vuković 	HRK	2022-08-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:02:33.504936
83776259-9364-4314-b853-6c8d79e1e193	B160222330154641	98.20999999999999	Kupovina ubr* pending.uber.com amsterdam nl domagoj vuković 	HRK	2022-08-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:02:34.491175
4e0bba5f-8e57-46df-9c89-f0530832c2aa	B160222330154257	69.98999999999999	Kupovina tisak p-2941 velika gorica hr domagoj vuković 	HRK	2022-08-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:02:35.541228
ee811411-4a6e-4867-b902-b7a6bac8def1	B160222320473540	507.4000000000000	Kupovina air can* aircanada.commbca domagoj vuković cad 85,20 	HRK	2022-08-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:02:40.104408
803d952c-37cb-4972-9323-3f90d7331774	B160222320464119	130.0100000000000	Kupovina macs conv. stores - 22 sherwood parkabca domagoj vuković cad 21,83 	HRK	2022-08-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:02:47.553519
d1c96124-b536-4022-9894-e96ad10ca9f5	B160222310006444	486.7600000000000	Kupovina boston pizza # 195 sherwood parkabca domagoj vuković cad 82,06 	HRK	2022-08-18 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:02:51.604729
6ca153f7-c74c-40be-8230-de3c64f9668c	B160222290409955	128.9900000000000	Kupovina tim hortons #3524 sherwood parkabca domagoj vuković cad 21,71 	HRK	2022-08-16 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:02:56.801558
28d6c278-d89e-4538-81fd-c9685342d87d	B160222290004909	284.2400000000000	Kupovina chianti cafe & restauraedmonton abca domagoj vuković cad 47,84 	HRK	2022-08-16 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:02:59.857434
bd8b6455-f994-48c8-81f9-34c1eb9e93c9	B160222270201714	236.8600000000000	Kupovina macs conv. stores - 22 sherwood parkabca domagoj vuković cad 39,98 	HRK	2022-08-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:03:02.865819
31213b44-5dc7-4389-abab-65434495417b	B160222270025439	166.3000000000000	Kupovina mcdonald\\'s #20919 qps sherwood parkabca domagoj vuković cad 28,07 	HRK	2022-08-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:03:10.765386
0ef1e975-ba6e-4ff2-808f-97161038eef2	B160222250034999	129.3300000000000	Kupovina macs conv. stores - 22 sherwood parkabca domagoj vuković cad 21,83 	HRK	2022-08-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:03:14.034703
d6cb39cc-d1ce-46cd-9687-edaf0b1dbce8	B160222240005776	25	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-08-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:03:19.985633
b72f7685-bafa-4519-a89b-5eedba6c95b1	B160222230444137	65.13000000000000	Kupovina tim hortons #3524 sherwood parkabca domagoj vuković cad 11,09 	HRK	2022-08-10 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:03:24.485853
b584713e-4a14-4163-bbb5-b8ad0d55ec15	B160222230440301	67.66000000000000	Kupovina walmart store #1123 sherwood parkabca domagoj vuković cad 11,52 	HRK	2022-08-10 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:03:28.624467
0c1a6a7d-ccc4-4c18-b69c-13c96dc0bf02	B160222230014639	190.9900000000000	Kupovina wendy\\'s restaurant #68 sherwood parkabca domagoj vuković cad 32,52 	HRK	2022-08-10 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:03:31.299159
70f1fdb6-02d1-4e2e-a8c2-2357e0829c5e	B160222230001084	128.2100000000000	Kupovina macs conv. stores - 22 sherwood parkabca domagoj vuković cad 21,83 	HRK	2022-08-10 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:03:35.305748
3c4c41fc-3485-4446-879b-f55e8548fa24	B160222220004294	19.99000000000000	Kupovina glovo glovo prime barcelona es domagoj vuković 	HRK	2022-08-09 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:03:36.578197
6190a5f1-6400-438b-b3f6-a14a75007ad9	B160222210211429	16	Kupovina google payment irelandldublin ie domagoj vuković 	HRK	2022-08-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-09-24 11:03:39.579165
9262e937-fb73-4520-86d3-51e91af52bf1	B160222200478245	750.0900000000000	Kupovina best buy #33 edmonton abca domagoj vuković cad 125,99 	HRK	2022-08-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	cf96ec31-c4a5-46d3-8d0b-1d67fd9f841c	2022-09-24 11:03:43.915385
d951d78c-90f1-46f3-82ed-7738e2face29	B160222200012740	190.0400000000000	Kupovina macs conv. stores - 22 sherwood parkabca domagoj vuković cad 31,92 	HRK	2022-08-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:04:04.814966
21c54e62-f596-426c-b86c-ea7adbfcf0ef	M160222150060768	3789.250000000000	Kreditni transfer nacionalni u valuti različitoj od eura on-line bankarstvom (m-zaba) domagoj vuković hr4823600003250759924 prijenos na vlastiti račun usd 500,00 tečaj zaba 03.08.2022 tečaj zaba 03.08.2022 1 usd= 7.578497 hrk 	HRK	2022-08-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a6e0d1b4-0363-484e-aa8f-e006851aa91d	2022-09-24 11:04:11.727145
3633a561-60aa-4e9a-93f0-7273e9cf8aa9	B160222150343630	371.3000000000000	Kupovina digitalocean.com +16468274366 nyus domagoj vuković usd 48,75 	HRK	2022-08-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 11:04:13.845928
ef0f4311-aed3-446f-a6d2-272184bce37f	B160222150005455	2369.510000000000	Kupovina real cdn wholesale #67 edmonton abca domagoj vuković cad 400,00 	HRK	2022-08-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:04:19.295912
c625e4b3-47a3-4f8c-8c69-1bbbd8d6b829	M160222140076781	1750	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) jadranka marković hr9423600003116214470 hr00 08-22 najamnina 08-22 	HRK	2022-08-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	e73616ca-7c4e-4105-808e-f9ffef14e515	2022-09-24 11:04:21.208134
174f86bd-5217-4935-b47a-5585d6a15d63	B160222090388831	643.0800000000000	Kupovina walmart store #1148 edmonton abca domagoj vuković cad 108,02 	HRK	2022-07-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:04:23.544265
5c6d3547-a664-4948-994a-ff9c9764bd52	B160222090002516	374.6400000000000	Kupovina dys 03 074 sher broadm sherwood parkabca domagoj vuković cad 62,93 	HRK	2022-07-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:04:33.054344
cbf9b780-f94d-4cb9-b531-858f270f23e0	B160222070398294	66.94000000000000	Kupovina tim hortons #1645 edmonton abca domagoj vuković cad 11,34 	HRK	2022-07-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:04:36.97814
716c5bb6-3c9b-4b8b-bfd3-6137e07b5911	B160222070363544	193.4000000000000	Kupovina mr. barber downtown edmonton abca domagoj vuković cad 32,76 	HRK	2022-07-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 11:04:44.932296
b2203113-8597-45ea-afc8-5d5782ff2ca9	B160222060364927	92.51000000000001	Kupovina tim hortons #1645 edmonton abca domagoj vuković cad 15,58 	HRK	2022-07-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:04:47.296954
3f849931-cc11-4616-82d9-def96eba3de3	B160222050237205	91.14000000000000	Kupovina tim hortons #3524 sherwood parkabca domagoj vuković cad 15,35 	HRK	2022-07-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:04:50.374256
02f76094-f392-4934-a2e1-598923850d28	B160222040400201	51.95000000000000	Kupovina tim hortons #1645 edmonton abca domagoj vuković cad 8,75 	HRK	2022-07-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:04:53.732952
585444c7-5bc3-460e-aa9b-93830e350920	B160222020004785	152.0900000000000	Kupovina novoresume aps +4528264787 dk domagoj vuković usd 19,99 	HRK	2022-07-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 11:04:57.229981
93e2f7cc-cdc0-40ca-9231-aa4c802debfc	B160221980300154	853.9700000000000	Kupovina best buy #33 edmonton abca domagoj vuković cad 144,35 	HRK	2022-07-16 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	cf96ec31-c4a5-46d3-8d0b-1d67fd9f841c	2022-09-24 11:05:02.926774
c868ca68-439e-43c8-8778-7160b37462df	B160221980298566	434.8200000000000	Kupovina nexwave video games edmonton abca domagoj vuković cad 73,50 	HRK	2022-07-16 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 11:05:08.126992
b52c4c67-517b-4840-985c-fa6b1f245d44	B160221970035930	57.74000000000000	Kupovina lagardere fil. 218 frankfurt de domagoj vuković eur 7,60 	HRK	2022-07-15 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:05:15.442583
522b0af7-8d31-49e4-bd6f-b409e9a987a7	B160221960325738	98.09000000000000	Kupovina lidl dienstleistung eschborn de domagoj vuković eur 12,91 	HRK	2022-07-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:05:18.12766
3d32d514-8997-4be5-bce6-d0c5148ea50d	B160221960020232	41.28000000000000	Kupovina immigration canada onl ottawa onca domagoj vuković cad 7,00 	HRK	2022-07-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 11:05:21.305069
32ac65f1-56c9-4e18-839e-01514b80103e	B160221960015666	545	Kupovina pbztcroatiaair zagreb-zracna hr domagoj vuković 	HRK	2022-07-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:05:35.236717
f2eb386e-75a9-43f4-bc0e-a8d928d57c2c	B160221960008515	109.9000000000000	Kupovina bolt.eu/o/2207150343 tallinn ee domagoj vuković 	HRK	2022-07-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:05:36.253473
1e9b013e-3e0e-4904-9978-674e613d8510	M160221950096331	81.83000000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) hep elektra d.o.o. dp ele hr9223400091510077598 elec hr01 2200092977-220620-1 racun za:01062022-30062022 	HRK	2022-07-14 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-09-24 11:05:37.758659
5e426938-31d8-42c4-a7f4-0886b297ac72	B160221950454730	340	Kupovina nada trgovina d.o.o. zagreb hr domagoj vuković 	HRK	2022-07-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:06:09.430545
0b03f888-ecfa-4f18-b00f-d8ff169df2de	B160221950322767	97.95000000000000	Kupovina gradska ljekarna zagrebzagreb hr domagoj vuković 	HRK	2022-07-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 11:06:14.884341
3b3f3e5f-e4f5-4ac9-ac59-f3c8210fb7aa	B160221950321785	91.90000000000001	Kupovina pbz7dmp28 zagreb hr domagoj vuković 	HRK	2022-07-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 11:06:26.085681
80303871-ca48-471a-a545-4e5b44840790	M160221950096337	2.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m160221950096331 	HRK	2022-07-13 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-09-24 11:06:27.959573
a80c6bd2-e71b-4250-8d63-88f0e22ae142	B160221940415804	129.8600000000000	Kupovina pbztsparsmarketp62 zagreb hr domagoj vuković 	HRK	2022-07-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:06:28.801251
2665a602-4b27-4a45-865a-2467454a1cc2	B160221940180810	75	Kupovina glovo 13jul zalfawtta barcelona es domagoj vuković 	HRK	2022-07-12 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:06:29.643816
2769dca0-eee2-4824-82a1-8b24bfabd240	B160221930333790	200	Podizanje gotovog novca - debitnom karticom na bankomatu banke barcev trg 16 zagreb domagoj vuković 	HRK	2022-07-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-09-24 11:06:32.331312
1b408c84-91ec-4c31-950c-be323287a025	B160221930033557	21.60000000000000	Kupovina ubr* pending.uber.com amsterdam nl domagoj vuković 	HRK	2022-07-11 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:06:33.145219
eca43e72-a81f-455d-aa2f-b685d4f5500f	B160221920358320	20	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-07-10 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:06:39.908368
25e488e4-455c-4a15-8c20-dccadf230b0a	B160221920357113	25	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-07-10 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:06:42.005825
79c5b6b7-bcb9-4dd4-9aec-e0123626797f	B160221910006680	19.99000000000000	Kupovina glovo glovo prime barcelona es domagoj vuković 	HRK	2022-07-09 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:06:42.923688
d6ada871-6a23-42f7-8234-f48b04283ae4	B160221900412812	45.46000000000000	Kupovina pbztplodine virovitica hr domagoj vuković 	HRK	2022-07-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:06:50.248681
dc0ac18d-c1db-4ea3-9e90-13681f07fdb5	B160221900330338	37.40000000000000	Kupovina bolt.eu/o/2207091412 tallinn ee domagoj vuković 	HRK	2022-07-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:06:52.19946
c5fc8753-74e1-4ccf-9d00-2adb239dad35	B160221900228132	16	Kupovina google payment irelandldublin ie domagoj vuković 	HRK	2022-07-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-09-24 11:06:56.772191
a2632331-ab54-4b15-bde0-510fedc1791f	B160221900168512	75	Kupovina glovo glovo prime barcelona es domagoj vuković 	HRK	2022-07-08 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:06:59.672166
82413f9b-1baa-4db6-931d-a0c3749db7fa	B160221890480632	143.6900000000000	Kupovina pbztsparsmarketp62 zagreb hr domagoj vuković 	HRK	2022-07-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:07:01.587222
941835e2-5bf6-4538-8d9f-43705e48296e	B160221890161167	61.20000000000000	Kupovina glovo 08jul zakqh7x1e barcelona es domagoj vuković 	HRK	2022-07-07 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:07:02.75829
e083c96a-71a2-4e81-b718-7b6a857e9520	B160221880147596	30	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-07-06 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:07:04.804419
7cc5aba4-2d8a-4238-bd74-d6f6570fa10c	B160221880136501	34	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-07-06 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:07:07.717765
cb02917c-fee0-4ab0-856f-c0cde475f4fb	B160221880093078	72.90000000000001	Kupovina bolt.eu/o/2207070813 tallinn ee domagoj vuković 	HRK	2022-07-06 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:07:12.382641
ba89dd44-c284-4487-bdba-12c650867b83	B160221870428342	80	Kupovina glovo 06jul za1skklg5 barcelona es domagoj vuković 	HRK	2022-07-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:07:13.478012
d518c78c-8de8-40c8-81d6-5fbd594e0012	B160221870413557	80.59999999999999	Kupovina hz putnicki prijevoz zagreb hr domagoj vuković 	HRK	2022-07-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:07:14.490163
f1304285-b831-4af0-bfb8-d6eac03e4bf1	M160221870057828	2262.660000000000	Kreditni transfer nacionalni u valuti različitoj od eura on-line bankarstvom (m-zaba) domagoj vuković hr4823600003250759924 prijenos na vlastiti račun usd 300,00 tečaj zaba 06.07.2022 tečaj zaba 06.07.2022 1 usd= 7.542210 hrk 	HRK	2022-07-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 11:07:35.386317
ddce8399-09c4-4756-ae92-c6b47cfeb8b8	M160221870057763	3771.110000000000	Kreditni transfer nacionalni u valuti različitoj od eura on-line bankarstvom (m-zaba) domagoj vuković hr4823600003250759924 prijenos na vlastiti račun usd 500,00 tečaj zaba 06.07.2022 tečaj zaba 06.07.2022 1 usd= 7.542210 hrk 	HRK	2022-07-05 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a6e0d1b4-0363-484e-aa8f-e006851aa91d	2022-09-24 11:07:39.293904
c3e3eb1e-6d2b-40d5-a5a0-9fa52102b18a	B160221860409330	179.5800000000000	Kupovina pbztsparsmarketp62 zagreb hr domagoj vuković 	HRK	2022-07-04 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:07:47.186951
d5771557-6395-4346-afbc-bdbc473f8aca	B160221860325438	105	Kupovina glovo 05jul zaeerbyyx barcelona es domagoj vuković 	HRK	2022-07-04 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:07:48.101939
adab2d97-8f99-4fb8-a813-a280d81f65a5	B160221860168339	20	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-07-04 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:07:54.22929
22c01ea0-3f51-46f8-a2e3-bc1d7f4199f7	B160221860130702	42	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-07-04 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:07:55.621093
b690e1d5-26d1-4088-8690-16e79cfb241f	B160221860119614	49	Kupovina pasta fasta zagreb hr domagoj vuković 	HRK	2022-07-04 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:07:56.366611
38220112-c04d-438a-93e9-aa49a233e80e	B160221860035102	11	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-07-04 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:07:58.33735
c574a5f7-b7cf-41de-9e99-9632142b1e60	B160221850342342	77	Kupovina glovo 04jul zarhud1t1 barcelona es domagoj vuković 	HRK	2022-07-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:07:59.140509
bd937368-cd84-4643-bfa6-98207ad87a5a	B160221850329326	34	Kupovina pbztlukoilbp zagreb hr domagoj vuković 	HRK	2022-07-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:08:02.727994
f4bdb5b6-6b75-4108-92b6-1a6295f44df5	B160221850299071	361	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-07-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:08:08.734637
ad877e06-8b2c-4177-ae5a-76eb4b438806	M160221850035323	20	Kreditni transfer nac. u kunama on-line bankarstvom (mobilne aplikacije) - izipay filip lukacevic hr2423600003241870015 hrana i piće 	HRK	2022-07-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:08:13.627396
1069d2b4-b104-4558-a969-eca7901c1231	B160221850139480	49	Kupovina pasta fasta zagreb hr domagoj vuković 	HRK	2022-07-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:08:14.389701
8e4ac160-0d38-4179-af57-d7af89bca15b	B160221850077327	79.70000000000000	Kupovina bolt.eu/o/2207040730 tallinn ee domagoj vuković 	HRK	2022-07-03 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:08:15.174772
35970b4b-9c01-40fb-88da-88cead8700ab	B160221840231051	57	Kupovina glovo 03jul zahclyz9w barcelona es domagoj vuković 	HRK	2022-07-02 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:08:17.169372
bb39b43d-73ea-44da-a62f-9223de12107a	B160221830302781	68.62000000000000	Kupovina name-cheap.com* stcwth +13233752822 azus domagoj vuković usd 9,16 	HRK	2022-07-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	SKIPPED	\N	2022-09-24 11:08:21.735255
cfda3efe-983f-468f-89c3-9712e6e56619	B160221830255080	200	Podizanje gotovog novca - debitnom karticom na bankomatu banke barcev trg 16 zagreb domagoj vuković 	HRK	2022-07-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	778a317e-d02c-44c0-9e3d-8c6ff156064d	2022-09-24 11:08:23.861357
3862f37f-ecd9-4644-bc5a-75ea4b8939da	M160221830020949	1750	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) jadranka marković hr9423600003116214470 hr00 07-22 najamnina 07-22 	HRK	2022-07-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	e73616ca-7c4e-4105-808e-f9ffef14e515	2022-09-24 11:08:24.883496
77dc7498-cb92-4b7e-a22e-d2d6ca3631f8	B160221830145785	78	Kupovina glovo 02jul zaf7fx19r barcelona es domagoj vuković 	HRK	2022-07-01 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:08:26.680356
b0c75abf-8911-4b72-9e11-d894fdb14034	B160221820265430	34	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-30 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:08:29.641334
0a4240df-b15d-4bbc-ae98-62618734390d	B160221810327559	52.10000000000000	Kupovina bolt.eu/o/2206301536 tallinn ee domagoj vuković 	HRK	2022-06-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:08:42.509565
c1a918cc-49c0-4c8e-8c8a-51dce9869763	B160221810313798	68	Kupovina tobacco zagreb hr domagoj vuković 	HRK	2022-06-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:08:43.193943
83c12679-1caa-4ac4-afeb-eef925f86e51	B160221810184083	40	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:08:47.748213
3978cd32-2b3f-480a-95de-2daffe7eede5	B160221810181568	20	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-06-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:08:54.150976
76513a11-8c3d-4d12-a136-933178bb05cf	B160221810123149	76	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:09:01.644387
814dea75-a7af-491c-8e2d-dbf1ec2d1ecc	B160221810071607	69.50000000000000	Kupovina bolt.eu/o/2206300723 tallinn ee domagoj vuković 	HRK	2022-06-29 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:09:02.3041
f56103e1-4fc6-42bd-bd03-d8a59d071023	B160221800431055	48	Kupovina nada trgovina d.o.o. zagreb hr domagoj vuković 	HRK	2022-06-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:09:06.318715
f6988205-65e4-400d-8657-1c77a5861bfb	B160221800300783	8	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-06-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:09:07.061991
096a6e0d-d477-45f0-bb2f-b49067d83def	B160221800168457	28	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-06-28 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:09:07.970522
e10a09de-bc8b-47cf-9b03-f6ae61caa386	B160221790287416	27	Kupovina mlinar pekarska indust zagreb hr domagoj vuković 	HRK	2022-06-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:09:09.069156
0c27263f-29ea-42fc-b173-b8e506c49be9	B160221790217210	10	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-27 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:09:11.430908
c49ba9fb-7aeb-40d3-9798-2492f8383aa8	B160221780408072	34	Kupovina nada trgovina d.o.o. zagreb hr domagoj vuković 	HRK	2022-06-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:09:13.801394
0930cf68-fa3f-4fa8-bf6b-696f57b707cd	B160221780138587	34	Kupovina coco zagreb hr domagoj vuković 	HRK	2022-06-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:09:15.086336
e20c7b46-18d9-4017-a275-ef609cc18770	B160221780137734	25.02000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-06-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:09:15.927672
8f810b41-75b9-4fe0-9fd6-dc6b9a4076ea	B160221780055561	70.20000000000000	Kupovina ubr* pending.uber.com amsterdam nl domagoj vuković 	HRK	2022-06-26 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:09:16.677422
87c4e946-aa11-46e1-a093-77b348d0e741	B160221770183865	78	Kupovina glovo 26jun za9mxsruz barcelona es domagoj vuković 	HRK	2022-06-25 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:09:17.627904
bc372e34-49d0-4c84-a094-817e5264aae9	B160221760433830	11142.14000000000	Kupovina air canada vancouver intflca domagoj vuković cad 1.951,34 	HRK	2022-06-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:09:22.526898
1bd87f13-02f6-4d90-93a7-212092a6f2d5	B160221760361119	81	Kupovina glovo 25jun zayd7hcex barcelona es domagoj vuković 	HRK	2022-06-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:09:23.559284
bdc8c953-f5de-4348-812c-9a1d7bdd1e71	B160221760168387	57	Kupovina glovo 25jun za1mxly8a barcelona es domagoj vuković 	HRK	2022-06-24 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:09:24.661373
bc7f2086-e8af-44fe-b6e5-62ab59eb308b	B160221750323851	67	Kupovina pbztmcdonalds zagreb hr domagoj vuković 	HRK	2022-06-23 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:09:25.548615
9d6ec1f5-5983-4852-b273-7958ce4a7560	B160221740178501	20	Kupovina avant gastro zagreb hr domagoj vuković 	HRK	2022-06-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:09:31.456695
3057ce5d-d82c-431a-a232-eb5f0baeb1ea	B160221740152779	20.82000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-06-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:09:32.311621
fec9fac9-4b8e-4d07-8d9c-aa0926dc88b4	M160221730072395	43.36000000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) hep elektra d.o.o. dp ele hr9223400091510077598 elec hr01 2200092977-220520-5 racun za:01052022-31052022 	HRK	2022-06-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-09-24 11:09:34.075234
485627cb-11a9-4cf8-abdd-b69b1ee1e966	M160221730072365	50.83000000000000	Kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) brunata d.o.o. hr2124840081103388745 othr hr00 26286-029722 26286/vp01v0001/221 	HRK	2022-06-22 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	a24f655e-6508-409c-a580-4e4a28895f64	2022-09-24 11:10:00.938906
2a3d4c87-6293-4cad-9b5f-e55db7bacbdd	M160221730072398	2.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m160221730072395 	HRK	2022-06-21 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-09-24 11:10:02.049589
0d6aa298-4f10-4207-ba65-b0374445038c	M160221730072368	2.250000000000000	Naknada za kreditni transfer nacionalni u kunama on-line bankarstvom (m-zaba) m160221730072365 	HRK	2022-06-21 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	5471b4e7-47bd-4a9f-b00e-900a88d7b9e0	2022-09-24 11:10:04.501944
593219b0-53e2-4a98-ae96-fc163bfe3d2d	B160221730160498	80	Kupovina glovo 22jun zarpywubu barcelona es domagoj vuković 	HRK	2022-06-21 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:10:05.705841
3376f8a2-2f10-4626-b682-4a82a48a6af5	B160221720492598	57	Kupovina glovo 21jun zauuq7klm barcelona es domagoj vuković 	HRK	2022-06-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:10:06.549367
65f09732-c739-4917-b393-7cf7513486b6	B160221720348377	75	Kupovina tobacco zagreb hr domagoj vuković 	HRK	2022-06-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:10:07.431307
a4ab204a-09c2-4a78-9052-7bbc405827f6	B160221720140845	23.10000000000000	Kupovina pbztinterspar zagreb hr domagoj vuković 	HRK	2022-06-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	f9280f8a-49ed-40ad-8fba-208382c36613	2022-09-24 11:10:08.312555
5b6f3580-8408-4db8-8b6f-3efeafed5b6d	B160221720044361	53.62000000000000	Kupovina ubr* pending.uber.com amsterdam nl domagoj vuković 	HRK	2022-06-20 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	d7e723e3-566f-41f6-b5ee-9fc11378bd13	2022-09-24 11:10:09.161298
4228d700-4794-4d9f-87b9-3e3fa9b33ee3	B160221710384090	20	Kupovina keks pay zagreb hr domagoj vuković 	HRK	2022-06-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	972fcd3d-a29b-4b9c-b965-dce6c7ddb774	2022-09-24 11:10:11.447939
79d8c2c4-0483-4500-a287-17f20e2678e4	B160221710004728	35.45000000000000	Kupovina hbo max prague cz domagoj vuković eur 4,66 	HRK	2022-06-19 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	4487ee24-7867-4dec-beb5-08d3e6e3ba79	2022-09-24 11:10:13.310167
86bee0f9-fd55-4f3f-8fec-c23742eb9be8	B160221700293540	59	Kupovina glovo 19jun zakpd11vf barcelona es domagoj vuković 	HRK	2022-06-18 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:10:14.081522
adf5b17b-22e6-461f-804a-f03f2ee09509	B160221700127973	78	Kupovina glovo 19jun zaqj1vn6d barcelona es domagoj vuković 	HRK	2022-06-18 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:10:14.891345
5c21f495-3aa8-42d7-b4e2-4cf229a870dc	B160221690474622	75	Kupovina glovo 18jun za1sypcec barcelona es domagoj vuković 	HRK	2022-06-17 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:10:15.728338
dc5370b6-c01d-4316-b08a-38cbd2e70de2	B160221690225179	90.50000000000000	Kupovina wolt zagreb hr domagoj vuković 	HRK	2022-06-17 22:00:00	5620c83c-3b66-40f3-a39a-75fd72dbd161	f	DONE	0d69125c-d5c4-4fa2-b722-722714bb894d	2022-09-24 11:10:16.500165
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: banker; Owner: banker-user
--

COPY banker.users (id, first_name, last_name, password, email, is_deleted, created_at, currency) FROM stdin;
8e231b08-5cf7-46d7-9910-07e7343fa013	Test	User	$2a$04$4glLmb.j3a4uTW8rJQajYOumR0AthqFxUEL6HWIXsAav.icqhdrNy	test@gmail.com	f	2022-06-19 17:22:49.087945	HRK
5620c83c-3b66-40f3-a39a-75fd72dbd161	Domagoj	Vukovic	$2a$04$4glLmb.j3a4uTW8rJQajYOumR0AthqFxUEL6HWIXsAav.icqhdrNy	off.vukovic@gmail.com	f	2022-06-17 21:28:24.666555	HRK
\.


--
-- Data for Name: databasechangelog; Type: TABLE DATA; Schema: public; Owner: banker-user
--

COPY public.databasechangelog (id, author, filename, dateexecuted, orderexecuted, exectype, md5sum, description, comments, tag, liquibase, contexts, labels, deployment_id) FROM stdin;
1652023990	off.vukovic@gmail.com	1652023990-setup.migration.json	2022-06-08 17:50:28.991503	1	EXECUTED	8:9306d3eef4466251e179fe2f3bb2dc79	sql; sql	Database setup	\N	4.10.0	\N	\N	4710628786
1652023995	off.vukovic@gmail.com	1652023995-create-users-table.migration.json	2022-06-08 17:50:29.117933	2	EXECUTED	8:ac2e6787a64277a89567bc3da7f3a18c	createTable tableName=users	Create users table	\N	4.10.0	\N	\N	4710628786
1652611881	off.vukovic@gmail.com	1652611881-create-categories-table.migration.json	2022-06-08 17:51:25.663912	3	EXECUTED	8:acf36490c83a6cad2526e13c7a01436f	createTable tableName=categories; addForeignKeyConstraint baseTableName=categories, constraintName=FK_categories__users, referencedTableName=users	Create categories table	\N	4.10.0	\N	\N	4710685446
1652641653	off.vukovic@gmail.com	1652641653-create-keywords-table.migration.json	2022-06-08 17:51:25.706819	4	EXECUTED	8:6d87cfaafeed984f7fadba5a83ccc982	createTable tableName=keywords; addForeignKeyConstraint baseTableName=keywords, constraintName=FK_keywords__categories, referencedTableName=categories	Create keywords table	\N	4.10.0	\N	\N	4710685446
1652861781	off.vukovic@gmail.com	1652861781-create-transactions-table.migration.json	2022-06-08 17:51:25.848449	5	EXECUTED	8:63597e1a5608b69c9961be771b801e49	sql; createTable tableName=transactions; addForeignKeyConstraint baseTableName=transactions, constraintName=FK_transactions__users, referencedTableName=users; addForeignKeyConstraint baseTableName=transactions, constraintName=FK_transactions__cate...	Create transactions table	\N	4.10.0	\N	\N	4710685446
1655501134	off.vukovic@gmail.com	1655501134-add-created-at-columns.migration.json	2022-06-17 21:28:24.702089	6	EXECUTED	8:ba1f19c27f081243b079a7eff44692dd	addColumn tableName=users; addColumn tableName=categories; addColumn tableName=keywords; addColumn tableName=transactions	Add created at columns	\N	4.10.0	\N	\N	5501304414
1655574120	off.vukovic@gmail.com	1655574120-add-user-currency.migration.json	2022-06-19 07:20:29.230994	7	EXECUTED	8:0eea78f60a57dea87b70ef328427639f	addColumn tableName=users	Add user currency	\N	4.11.0	\N	\N	5623228946
\.


--
-- Data for Name: databasechangeloglock; Type: TABLE DATA; Schema: public; Owner: banker-user
--

COPY public.databasechangeloglock (id, locked, lockgranted, lockedby) FROM stdin;
1	f	\N	\N
\.


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: banker; Owner: banker-user
--

ALTER TABLE ONLY banker.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: keywords keywords_pkey; Type: CONSTRAINT; Schema: banker; Owner: banker-user
--

ALTER TABLE ONLY banker.keywords
    ADD CONSTRAINT keywords_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: banker; Owner: banker-user
--

ALTER TABLE ONLY banker.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_reference_key; Type: CONSTRAINT; Schema: banker; Owner: banker-user
--

ALTER TABLE ONLY banker.transactions
    ADD CONSTRAINT transactions_reference_key UNIQUE (reference);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: banker; Owner: banker-user
--

ALTER TABLE ONLY banker.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: banker; Owner: banker-user
--

ALTER TABLE ONLY banker.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: databasechangeloglock databasechangeloglock_pkey; Type: CONSTRAINT; Schema: public; Owner: banker-user
--

ALTER TABLE ONLY public.databasechangeloglock
    ADD CONSTRAINT databasechangeloglock_pkey PRIMARY KEY (id);


--
-- Name: categories FK_categories__users; Type: FK CONSTRAINT; Schema: banker; Owner: banker-user
--

ALTER TABLE ONLY banker.categories
    ADD CONSTRAINT "FK_categories__users" FOREIGN KEY (user_fk) REFERENCES banker.users(id) ON UPDATE RESTRICT ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;


--
-- Name: keywords FK_keywords__categories; Type: FK CONSTRAINT; Schema: banker; Owner: banker-user
--

ALTER TABLE ONLY banker.keywords
    ADD CONSTRAINT "FK_keywords__categories" FOREIGN KEY (category_fk) REFERENCES banker.categories(id) ON UPDATE RESTRICT ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;


--
-- Name: transactions FK_transactions__categories; Type: FK CONSTRAINT; Schema: banker; Owner: banker-user
--

ALTER TABLE ONLY banker.transactions
    ADD CONSTRAINT "FK_transactions__categories" FOREIGN KEY (category_fk) REFERENCES banker.categories(id) ON UPDATE RESTRICT ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;


--
-- Name: transactions FK_transactions__users; Type: FK CONSTRAINT; Schema: banker; Owner: banker-user
--

ALTER TABLE ONLY banker.transactions
    ADD CONSTRAINT "FK_transactions__users" FOREIGN KEY (user_fk) REFERENCES banker.users(id) ON UPDATE RESTRICT ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--


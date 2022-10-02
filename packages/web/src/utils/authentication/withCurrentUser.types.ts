import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { ExtraAppProps } from "../apollo";

export type AppComponentType = NextComponentType<AppContext, AppInitialProps, AppProps & ExtraAppProps>

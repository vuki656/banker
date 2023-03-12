import express from "express";
import http from 'http';

export const expressApp = express()
export const httpServer = http.createServer(expressApp)

import axios, { AxiosResponse } from 'axios';
import { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export type CreateNoteTodo = {
  title: string;
  content: string;
  tag: Note['tag'];
};

export const fetchNotes = async (search: string, page: number): Promise<FetchNotesResponse> => {
  const params: FetchNotesParams = {
    page,
    perPage: 12,
    search: search || undefined,
  };
  const response: AxiosResponse<FetchNotesResponse> = await axiosInstance.get('/notes', { params });

  const notes = response.data.notes || [];
  const totalPages = response.data.totalPages;
  return {
    notes, 
    totalPages: totalPages > 0 ? totalPages : 1,
  };
};

export const createNote = async (note: CreateNoteTodo): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.post('/notes', note);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.delete(`/notes/${id}`);
  return response.data;
};

import type { Registro } from '../types/registro';

const API_BASE_URL = 'http://localhost:8080/api/registros';

export const registroService = {

    async obtenerTodos(): Promise<Registro[]> {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Error al obtener los registros');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener registros:', error);
      throw error;
    }
  },

  async obtenerPorId(id: number): Promise<Registro> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Registro no encontrado');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener registro:', error);
      throw error;
    }
  },

  async crear(registro: Omit<Registro, 'id'>): Promise<Registro> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registro),
      });
      if (!response.ok) {
        throw new Error('Error al crear el registro');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al crear registro:', error);
      throw error;
    }
  },

  async actualizar(id: number, registro: Omit<Registro, 'id'>): Promise<Registro> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registro),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el registro');
      }
      return await response.json();
    } catch (error) {
      console.error('Error al actualizar registro:', error);
      throw error;
    }
  },

  async eliminar(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el registro');
      }
    } catch (error) {
      console.error('Error al eliminar registro:', error);
      throw error;
    }
  },
};

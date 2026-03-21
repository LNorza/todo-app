declare global {
  namespace Express {
    interface Response {
      success: (data?: unknown, message?: string, status?: number) => void;
    }
  }
}

export {};

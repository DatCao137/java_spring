import { toast } from 'react-toastify';
import { HttpStatusCode } from 'axios';

class ErrorManager {
    private static instance: ErrorManager;
    private errors: Record<string, string> = {};

    private constructor() { }

    static getInstance(): ErrorManager {
        if (!ErrorManager.instance) {
            ErrorManager.instance = new ErrorManager();
        }
        return ErrorManager.instance;
    }

    showErrors(data: { code: number; message: string; errors?: Record<string, string> }): void {
        // Clear previous errors
        this.clearAllErrors();
        // Validation errors
        if (data.code === HttpStatusCode.UnprocessableEntity && data.errors) {
            this.errors = { ...this.errors, ...data.errors };
        } else {
            var mes = data.message ? "(" + data.message + ")" : "";
            this.errors['general'] = "サーバーへの問い合わせに失敗しました。" + mes;
        }

        // Display all errors    
        const combinedMessage = Object.values(this.errors).join('<br>');

        toast.error(
            <div dangerouslySetInnerHTML={{ __html: combinedMessage }} />
        );
    }

    private clearAllErrors(): void {
        this.errors = {};
    }

    getError(field: string): string | null {
        return this.errors[field] || null;
    }

    clearError(field: string): void {
        delete this.errors[field];
    }

    hasErrors(): boolean {
        return Object.keys(this.errors).length > 0;
    }

    getAllErrors(): Record<string, string> {
        return this.errors;
    }

    getErrors(data: { code: number; message: string; errors?: Record<string, string> }): Record<string, string> | undefined {
        return data.errors;
    }
}

export default ErrorManager.getInstance();
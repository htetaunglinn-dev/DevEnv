import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
export declare const getAllSuggestions: (req: Request, res: Response) => Promise<void>;
export declare const getSuggestionById: (req: Request, res: Response) => Promise<void>;
export declare const createSuggestion: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const updateSuggestion: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const deleteSuggestion: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const voteSuggestion: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const removeVote: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const addComment: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const getUserSuggestions: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const getSuggestionStats: (req: Request, res: Response) => Promise<void>;
export declare const adminUpdateSuggestion: (req: AuthenticatedRequest, res: Response) => Promise<void>;
//# sourceMappingURL=suggestionController.d.ts.map
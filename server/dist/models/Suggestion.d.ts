import mongoose, { Document } from "mongoose";
export interface ISuggestion extends Document {
    _id: string;
    title: string;
    description: string;
    category: "feature" | "improvement" | "bug" | "other";
    priority: "low" | "medium" | "high" | "critical";
    status: "pending" | "in-review" | "approved" | "rejected" | "implemented";
    submittedBy: mongoose.Types.ObjectId;
    assignedTo?: mongoose.Types.ObjectId;
    votes: {
        upvotes: mongoose.Types.ObjectId[];
        downvotes: mongoose.Types.ObjectId[];
    };
    comments: {
        user: mongoose.Types.ObjectId;
        message: string;
        createdAt: Date;
    }[];
    tags: string[];
    attachments?: string[];
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ISuggestion, {}, {}, {}, mongoose.Document<unknown, {}, ISuggestion, {}> & ISuggestion & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Suggestion.d.ts.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const suggestionSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["feature", "improvement", "bug", "other"],
        default: "other",
    },
    priority: {
        type: String,
        required: [true, "Priority is required"],
        enum: ["low", "medium", "high", "critical"],
        default: "medium",
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ["pending", "in-review", "approved", "rejected", "implemented"],
        default: "pending",
    },
    submittedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Submitted by user is required"],
    },
    assignedTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    votes: {
        upvotes: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
            }],
        downvotes: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
            }],
    },
    comments: [{
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            message: {
                type: String,
                required: true,
                trim: true,
                maxlength: [500, "Comment cannot exceed 500 characters"],
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }],
    tags: [{
            type: String,
            trim: true,
            lowercase: true,
            maxlength: [30, "Tag cannot exceed 30 characters"],
        }],
    attachments: [{
            type: String,
            trim: true,
        }],
}, {
    timestamps: true,
});
// Index for better query performance
suggestionSchema.index({ submittedBy: 1, createdAt: -1 });
suggestionSchema.index({ status: 1, priority: -1 });
suggestionSchema.index({ category: 1, createdAt: -1 });
suggestionSchema.index({ tags: 1 });
// Virtual for vote count
suggestionSchema.virtual("voteCount").get(function () {
    return this.votes.upvotes.length - this.votes.downvotes.length;
});
// Virtual for total votes
suggestionSchema.virtual("totalVotes").get(function () {
    return this.votes.upvotes.length + this.votes.downvotes.length;
});
// Ensure virtual fields are serialized
suggestionSchema.set("toJSON", { virtuals: true });
suggestionSchema.set("toObject", { virtuals: true });
exports.default = mongoose_1.default.model("Suggestion", suggestionSchema);
//# sourceMappingURL=Suggestion.js.map
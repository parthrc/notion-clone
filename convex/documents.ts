import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createNewDocument = mutation({
  args: { parentDocumentId: v.optional(v.id("documents")) },

  handler: async (ctx, args) => {
    // Current user infor from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;

    // Query to create new document
    const document = await ctx.db.insert("documents", {
      title: "Untitled",
      userId,
      isArchived: false,
      isPublished: false,
      parentDocument: args.parentDocumentId,
    });

    return document;
  },
});

export const getAllDocuments = query({
  handler: async (ctx) => {
    // Current user infor from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

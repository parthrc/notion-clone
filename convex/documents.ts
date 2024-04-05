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

export const updateDocument = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Current user infor from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;

    //Get id from arguments
    const { id, ...rest } = args;

    //Check if doc exist
    const existingDoc = await ctx.db.get(id);
    // If doc does not exist
    if (!existingDoc) {
      throw new Error("Not found");
    }
    // If user does not own the doc
    if (existingDoc.userId !== userId) {
      throw new Error("Not authorized");
    }

    const updatedDocument = await ctx.db.patch(id, { ...rest });

    return updatedDocument;
  },
});

export const getDocById = query({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    // Current user infor from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;

    //Check if doc exist
    const existingDoc = await ctx.db.get(args.id);
    // If doc does not exist
    if (!existingDoc) {
      throw new Error("Not found");
    }
    // If user does not own the doc
    if (existingDoc.userId !== userId) {
      throw new Error("Not authorized");
    }
    return existingDoc;
  },
});

export const deleteDocument = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    // Current user infor from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;

    //Check if doc exist
    const existingDoc = await ctx.db.get(args.id);
    // If doc does not exist
    if (!existingDoc) {
      throw new Error("Not found");
    }
    // If user does not own the doc
    if (existingDoc.userId !== userId) {
      throw new Error("Not authorized");
    }

    const document = ctx.db.delete(args.id);
    return document;
  },
});
